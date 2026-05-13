"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface TutorPanelProps {
  conceptId: string;
  conceptLabel: string;
  lessonTitle: string;
  learnerLevel: number;
}

export function TutorPanel({ conceptId, conceptLabel, lessonTitle, learnerLevel }: TutorPanelProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || streaming) return;
    setInput("");

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setStreaming(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conceptId,
          conceptLabel,
          lessonTitle,
          learnerLevel,
          learnerAge: levelToAge(learnerLevel),
          history: messages,
          message: text,
        }),
      });

      if (!res.body) throw new Error("No stream body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const payload = line.slice(6);
            if (payload === "[DONE]") continue;
            try {
              const { text } = JSON.parse(payload) as { text: string };
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (!last || last.role !== "assistant") return prev;
                return [...prev.slice(0, -1), { ...last, content: last.content + text }];
              });
            } catch {
              // skip malformed
            }
          }
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: "Hmm, I had trouble connecting. Try again?" },
      ]);
    } finally {
      setStreaming(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI tutor"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-indigo-600 text-white font-bold px-5 py-3 rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-colors"
      >
        🤖 <span className="hidden sm:inline">Ask the tutor</span>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            className="fixed bottom-0 right-0 z-50 flex flex-col w-full sm:w-96 h-[70vh] sm:h-[600px] sm:bottom-6 sm:right-6 sm:rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-indigo-600 text-white">
              <div>
                <p className="font-bold text-sm">🤖 PhysicsQuest Tutor</p>
                <p className="text-xs text-indigo-200 truncate">{conceptLabel}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close tutor"
                className="hover:bg-indigo-700 rounded-lg p-1 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 text-sm mt-8">
                  <p className="text-3xl mb-3">💡</p>
                  <p>Ask me anything about <strong>{conceptLabel}</strong>!</p>
                  <p className="mt-2 text-xs text-gray-400">I won't give you the answer directly — I'll ask you one great question first.</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                    }`}
                  >
                    {msg.content || (streaming && i === messages.length - 1 ? (
                      <span className="animate-pulse">Thinking…</span>
                    ) : "")}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-100 p-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask a question…"
                disabled={streaming}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:bg-gray-50"
                aria-label="Your question"
              />
              <button
                onClick={sendMessage}
                disabled={streaming || !input.trim()}
                className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 disabled:opacity-40 transition-colors"
                aria-label="Send"
              >
                ↑
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function levelToAge(level: number): number {
  const ages = [5, 6, 7, 8, 9, 10, 12, 14, 16, 17];
  return ages[Math.min(level - 1, ages.length - 1)] ?? 14;
}
