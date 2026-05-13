"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMasteryStore } from "@/store/mastery";

interface RetrievalCardProps {
  question: string;
  answer: string;
  conceptId: string;
}

const GRADES = [
  { value: 1 as const, label: "Again", color: "bg-red-100 text-red-700 hover:bg-red-200" },
  { value: 2 as const, label: "Hard", color: "bg-orange-100 text-orange-700 hover:bg-orange-200" },
  { value: 3 as const, label: "Good", color: "bg-green-100 text-green-700 hover:bg-green-200" },
  { value: 4 as const, label: "Easy", color: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
];

export function RetrievalCard({ question, answer, conceptId }: RetrievalCardProps) {
  const [revealed, setRevealed] = useState(false);
  const [graded, setGraded] = useState(false);
  const review = useMasteryStore((s) => s.review);

  function handleGrade(grade: 1 | 2 | 3 | 4) {
    review(conceptId, grade);
    setGraded(true);
  }

  return (
    <div className="my-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="bg-indigo-50 border-b border-indigo-100 px-5 py-3 flex items-center gap-2">
        <span>🃏</span>
        <span className="font-semibold text-indigo-800 text-sm">Retrieval Practice</span>
      </div>
      <div className="p-5">
        <p className="font-medium text-gray-800 mb-4">{question}</p>

        {!revealed && !graded && (
          <button
            onClick={() => setRevealed(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors"
          >
            Show answer
          </button>
        )}

        <AnimatePresence>
          {revealed && !graded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="border-t border-gray-100 pt-4 mt-4"
            >
              <p className="text-gray-700 mb-4">{answer}</p>
              <p className="text-sm text-gray-500 mb-3">How well did you remember?</p>
              <div className="flex gap-2 flex-wrap">
                {GRADES.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => handleGrade(g.value)}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-colors ${g.color}`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {graded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-green-700 font-medium text-sm"
            >
              ✅ Scheduled for next review — your mastery is being tracked!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
