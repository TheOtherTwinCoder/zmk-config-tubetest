import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, HINT_SYSTEM_PROMPT, type TutorContext } from "./prompts.js";

export interface TutorMessage {
  role: "user" | "assistant";
  content: string;
}

export interface StreamChunk {
  type: "text" | "misconception" | "done";
  text?: string;
  misconception?: { id: string; label: string };
}

const TUTOR_MODEL = "claude-sonnet-4-6"; // full Socratic tutor
const HINT_MODEL = "claude-haiku-4-5-20251001"; // fast, cheap hints

const MISCONCEPTION_RE = /<!-- MISCONCEPTION:({[^}]+}) -->/;

export class PhysicsQuestTutor {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  /** Streaming Socratic tutor turn. Yields StreamChunk events. */
  async *chat(
    ctx: TutorContext,
    history: TutorMessage[],
    userMessage: string
  ): AsyncGenerator<StreamChunk> {
    const systemPrompt = buildSystemPrompt(ctx);

    const messages: Anthropic.MessageParam[] = [
      ...history.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: userMessage },
    ];

    const stream = await this.client.messages.stream({
      model: TUTOR_MODEL,
      max_tokens: 512,
      system: [
        {
          type: "text",
          text: systemPrompt,
          cache_control: { type: "ephemeral" }, // prompt caching — system prompt is stable
        },
      ],
      messages,
    });

    let buffer = "";

    for await (const event of stream) {
      if (
        event.type === "content_block_delta" &&
        event.delta.type === "text_delta"
      ) {
        buffer += event.delta.text;
        // Yield visible text (strip misconception tag from stream)
        const visible = buffer.replace(MISCONCEPTION_RE, "");
        yield { type: "text", text: event.delta.text };
      }
    }

    // Check for misconception tag in completed buffer
    const match = MISCONCEPTION_RE.exec(buffer);
    if (match?.[1]) {
      try {
        const misconception = JSON.parse(match[1]) as { id: string; label: string };
        yield { type: "misconception", misconception };
      } catch {
        // malformed tag — ignore
      }
    }

    yield { type: "done" };
  }

  /** Single-shot hint (no streaming needed — it's ≤ 30 words). */
  async hint(concept: string, stuckDescription: string): Promise<string> {
    const msg = await this.client.messages.create({
      model: HINT_MODEL,
      max_tokens: 80,
      system: HINT_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Concept: ${concept}\nLearner stuck on: ${stuckDescription}`,
        },
      ],
    });
    const block = msg.content[0];
    return block?.type === "text" ? block.text : "";
  }
}
