"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PredictBoxProps {
  question: string;
  hint?: string;
  onPredicted?: (text: string) => void;
}

export function PredictBox({ question, hint, onPredicted }: PredictBoxProps) {
  const [prediction, setPrediction] = useState("");
  const [locked, setLocked] = useState(false);

  function handleLock() {
    if (!prediction.trim()) return;
    setLocked(true);
    onPredicted?.(prediction);
  }

  return (
    <div className="my-6 rounded-2xl border-2 border-amber-200 bg-amber-50 p-5">
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🔮</span>
        <div className="flex-1">
          <p className="font-bold text-amber-900 mb-1">Predict first!</p>
          <p className="text-amber-800 mb-3">{question}</p>
          {hint && !locked && (
            <p className="text-amber-600 text-sm italic mb-3">{hint}</p>
          )}
          {!locked ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={prediction}
                onChange={(e) => setPrediction(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLock()}
                placeholder="Write your prediction..."
                className="flex-1 rounded-xl border border-amber-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                aria-label="Your prediction"
              />
              <button
                onClick={handleLock}
                disabled={!prediction.trim()}
                className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-xl text-sm hover:bg-amber-600 disabled:opacity-40 transition-colors"
              >
                Lock in ✓
              </button>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-amber-800 font-medium"
              >
                <span>✅ Your prediction:</span>
                <span className="italic">"{prediction}"</span>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
