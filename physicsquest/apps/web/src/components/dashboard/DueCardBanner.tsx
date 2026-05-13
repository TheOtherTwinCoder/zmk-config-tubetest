"use client";

import { useMasteryStore } from "@/store/mastery";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function DueCardBannerClient() {
  const getDueCards = useMasteryStore((s) => s.getDueCards);
  const dueCards = getDueCards();

  if (dueCards.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-4"
      >
        <div>
          <p className="font-bold text-amber-900">
            🔔 {dueCards.length} concept{dueCards.length > 1 ? "s" : ""} due for review
          </p>
          <p className="text-amber-700 text-sm mt-0.5">
            Visit the relevant lesson and use the retrieval cards to refresh your memory.
          </p>
        </div>
        <Link
          href="/learn/why-do-magnets-stick"
          className="flex-shrink-0 px-4 py-2 bg-amber-500 text-white font-bold rounded-xl text-sm hover:bg-amber-600 transition-colors"
        >
          Review now
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
