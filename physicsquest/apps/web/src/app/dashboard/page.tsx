import { MasteryGraph } from "@/components/dashboard/MasteryGraph";
import Link from "next/link";

export const metadata = {
  title: "My Mastery Map — PhysicsQuest",
  description: "See your mastery across all 70 physics concepts, broken down by level and strand.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 shadow-sm">
        <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-bold text-sm">
          ← Home
        </Link>
        <div className="flex-1" />
        <span className="text-sm font-bold text-gray-700">📊 Mastery Map</span>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Your Mastery Map</h1>
          <p className="text-gray-600">
            Every concept you've reviewed via retrieval cards is tracked here using
            the FSRS spaced-repetition algorithm. Scores reflect current retention —
            they decay naturally so you'll be reminded before you forget.
          </p>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <Link
            href="/learn/why-do-magnets-stick"
            className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow text-sm font-medium text-gray-700"
          >
            🧲 <span>Level 2: Magnets</span>
          </Link>
          <Link
            href="/learn/projectile-motion"
            className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow text-sm font-medium text-gray-700"
          >
            🚀 <span>Level 8: Projectiles</span>
          </Link>
        </div>

        {/* Due-card reminder */}
        <DueCardBanner />

        {/* Main mastery graph */}
        <MasteryGraph />

        {/* Teacher / parent note */}
        <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-2xl p-5 text-sm text-indigo-700">
          <p className="font-bold mb-1">👩‍🏫 For teachers & parents</p>
          <p>
            This dashboard shows real-time concept mastery derived from the learner's
            retrieval-practice responses. A score ≥ 80% means the concept is stable in
            long-term memory. Scores below 50% indicate a concept worth revisiting soon.
          </p>
          <p className="mt-2 text-xs text-indigo-500">
            Mastery is stored locally in this browser. Sign-in with Supabase sync coming in Phase 2.
          </p>
        </div>
      </div>
    </div>
  );
}

// Server component wrapper — DueCardBanner is client
function DueCardBanner() {
  return <DueCardBannerClient />;
}

// Inline client component so the page itself stays a Server Component
import { DueCardBannerClient } from "@/components/dashboard/DueCardBanner";
