"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type FSRSCard,
  newCard,
  reviewCard,
  masteryScore,
  isDue,
} from "@physicsquest/fsrs";

interface MasteryStore {
  cards: Record<string, FSRSCard>;
  review: (conceptId: string, grade: 1 | 2 | 3 | 4) => void;
  getMastery: (conceptId: string) => number;
  getDueCards: () => FSRSCard[];
  getAllMastery: () => Record<string, number>;
}

export const useMasteryStore = create<MasteryStore>()(
  persist(
    (set, get) => ({
      cards: {},

      review(conceptId, grade) {
        set((state) => {
          const existing = state.cards[conceptId];
          const card = existing ?? newCard(conceptId);
          return {
            cards: {
              ...state.cards,
              [conceptId]: reviewCard(card, grade),
            },
          };
        });
      },

      getMastery(conceptId) {
        const card = get().cards[conceptId];
        if (!card) return 0;
        return masteryScore(card);
      },

      getDueCards() {
        return Object.values(get().cards).filter((c) => isDue(c));
      },

      getAllMastery() {
        const result: Record<string, number> = {};
        for (const [id, card] of Object.entries(get().cards)) {
          result[id] = masteryScore(card);
        }
        return result;
      },
    }),
    { name: "pq-mastery" }
  )
);
