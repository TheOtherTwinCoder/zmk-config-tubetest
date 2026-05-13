import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@physicsquest/tutor";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const {
    conceptId,
    conceptLabel,
    lessonTitle,
    learnerLevel,
    learnerAge,
    history,
    message,
    misconceptions = [],
    weakAncestors = [],
  } = (await req.json()) as {
    conceptId: string;
    conceptLabel: string;
    lessonTitle: string;
    learnerLevel: number;
    learnerAge: number;
    history: { role: "user" | "assistant"; content: string }[];
    message: string;
    misconceptions?: string[];
    weakAncestors?: string[];
  };

  const systemPrompt = buildSystemPrompt({
    conceptId,
    conceptLabel,
    lessonTitle,
    learnerLevel,
    learnerAge,
    misconceptions,
    weakAncestors,
  });

  const messages: Anthropic.MessageParam[] = [
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user" as const, content: message },
  ];

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const anthropicStream = await client.messages.stream({
          model: "claude-sonnet-4-6",
          max_tokens: 512,
          system: [
            {
              type: "text",
              text: systemPrompt,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages,
        });

        for await (const event of anthropicStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            const data = JSON.stringify({ text: event.delta.text });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
