/**
 * Minimal FSRS-4 (Free Spaced Repetition Scheduler) implementation.
 * Reference: Jarrett Ye, "A Stochastic Shortest Path Algorithm for Optimizing
 * Spaced Repetition Scheduling", 2022. https://github.com/open-spaced-repetition/fsrs4anki
 *
 * Grades: 1=Again 2=Hard 3=Good 4=Easy
 */

export const GRADE = { AGAIN: 1, HARD: 2, GOOD: 3, EASY: 4 } as const;
export type Grade = (typeof GRADE)[keyof typeof GRADE];

export interface FSRSCard {
  conceptId: string;
  /** Stability (days) — how long until retention drops to 0.9 */
  stability: number;
  /** Difficulty 1–10 */
  difficulty: number;
  /** Elapsed days since last review */
  elapsedDays: number;
  /** Scheduled days until next review */
  scheduledDays: number;
  /** Repetition count */
  reps: number;
  /** Number of lapses (Again grades) */
  lapses: number;
  /** Card state */
  state: "new" | "learning" | "review" | "relearning";
  /** ISO timestamp of last review */
  lastReview: string | null;
  /** ISO timestamp when next review is due */
  due: string;
}

// FSRS-4 default weights (w vector from the paper)
const W = [
  0.4072, 1.1829, 3.1262, 15.4722, 7.2102, 0.5316, 1.0651, 0.0589,
  1.5330, 0.1544, 1.0063, 1.9395, 0.1100, 0.2900, 2.2700, 0.2500,
  2.9898,
];

const DESIRED_RETENTION = 0.9;

function initDifficulty(grade: Grade): number {
  return Math.min(10, Math.max(1, W[4]! - (W[5]! * (grade - 3))));
}

function initStability(grade: Grade): number {
  return Math.max(0.1, W[grade - 1]!);
}

function nextDifficulty(d: number, grade: Grade): number {
  const delta = W[6]! * (grade - 3);
  return Math.min(10, Math.max(1, d - delta));
}

function shortTermStability(s: number, grade: Grade): number {
  return s * Math.exp(W[8]! * (grade - 3 + W[9]!));
}

function longTermStability(d: number, s: number, r: number, grade: Grade): number {
  const hardPenalty = grade === GRADE.HARD ? W[15]! : 1;
  const easyBonus = grade === GRADE.EASY ? W[16]! : 1;
  return (
    s *
    Math.exp(W[8]!) *
    (11 - d) *
    Math.pow(s, -W[9]!) *
    (Math.exp((1 - r) * W[10]!) - 1) *
    hardPenalty *
    easyBonus
  );
}

function interval(stability: number): number {
  return Math.max(1, Math.round((stability / Math.log(DESIRED_RETENTION)) * Math.log(0.9)));
}

function retrievability(stability: number, elapsedDays: number): number {
  return Math.pow(1 + elapsedDays / (9 * stability), -1);
}

export function newCard(conceptId: string): FSRSCard {
  return {
    conceptId,
    stability: 0,
    difficulty: 5,
    elapsedDays: 0,
    scheduledDays: 0,
    reps: 0,
    lapses: 0,
    state: "new",
    lastReview: null,
    due: new Date().toISOString(),
  };
}

export function reviewCard(card: FSRSCard, grade: Grade, now = new Date()): FSRSCard {
  const elapsed = card.lastReview
    ? Math.max(0, (now.getTime() - new Date(card.lastReview).getTime()) / 86400000)
    : 0;

  let newStability: number;
  let newDifficulty: number;
  let newReps = card.reps + 1;
  let newLapses = card.lapses;
  let newState: FSRSCard["state"];

  if (card.state === "new") {
    newStability = initStability(grade);
    newDifficulty = initDifficulty(grade);
    newState = grade === GRADE.AGAIN ? "learning" : "review";
  } else if (card.state === "learning" || card.state === "relearning") {
    newStability = shortTermStability(Math.max(card.stability, 0.1), grade);
    newDifficulty = nextDifficulty(card.difficulty, grade);
    newState = grade === GRADE.AGAIN ? card.state : "review";
  } else {
    // review state
    const r = retrievability(card.stability, elapsed);
    if (grade === GRADE.AGAIN) {
      newStability = W[11]! * Math.pow(card.difficulty, -W[12]!) *
        (Math.pow(card.stability + 1, W[13]!) - 1) * Math.exp((1 - r) * W[14]!);
      newDifficulty = nextDifficulty(card.difficulty, grade);
      newLapses += 1;
      newState = "relearning";
    } else {
      newStability = longTermStability(card.difficulty, card.stability, r, grade);
      newDifficulty = nextDifficulty(card.difficulty, grade);
      newState = "review";
    }
  }

  const scheduledDays = newState === "review" ? interval(newStability) : grade === GRADE.AGAIN ? 0 : 1;
  const dueDate = new Date(now.getTime() + scheduledDays * 86400000);

  return {
    conceptId: card.conceptId,
    stability: Math.max(0.1, newStability),
    difficulty: Math.min(10, Math.max(1, newDifficulty)),
    elapsedDays: elapsed,
    scheduledDays,
    reps: newReps,
    lapses: newLapses,
    state: newState,
    lastReview: now.toISOString(),
    due: dueDate.toISOString(),
  };
}

export function isDue(card: FSRSCard, now = new Date()): boolean {
  return now >= new Date(card.due);
}

/** Mastery score 0–1 derived from current retrievability */
export function masteryScore(card: FSRSCard, now = new Date()): number {
  if (card.state === "new") return 0;
  const elapsed = card.lastReview
    ? Math.max(0, (now.getTime() - new Date(card.lastReview).getTime()) / 86400000)
    : 0;
  return Math.max(0, Math.min(1, retrievability(card.stability, elapsed)));
}
