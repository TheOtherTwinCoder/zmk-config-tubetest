"use client";

import { useMasteryStore } from "@/store/mastery";
import { dag, conceptsForLevel } from "@physicsquest/dag";

const STRAND_COLORS: Record<string, string> = {
  mechanics:   "bg-blue-500",
  thermal:     "bg-orange-500",
  waves_optics:"bg-purple-500",
  em:          "bg-yellow-500",
  fluids:      "bg-cyan-500",
  energy:      "bg-green-500",
  modern:      "bg-pink-500",
  astronomy:   "bg-indigo-400",
  math_tools:  "bg-gray-500",
  meta:        "bg-teal-500",
};

function MasteryBar({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const color =
    pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-yellow-500" : "bg-red-400";
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`${color} h-2 rounded-full transition-all duration-500`}
        style={{ width: `${pct}%` }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${pct}% mastery`}
      />
    </div>
  );
}

export function MasteryGraph() {
  const getAllMastery = useMasteryStore((s) => s.getAllMastery);
  const mastery = getAllMastery();

  const levels = Array.from({ length: 10 }, (_, i) => i + 1);

  const totalConcepts = dag.nodes.length;
  const masteredConcepts = dag.nodes.filter(
    (n) => (mastery[n.id] ?? 0) >= 0.8
  ).length;
  const overallPct = Math.round((masteredConcepts / totalConcepts) * 100);

  return (
    <div className="space-y-6">
      {/* Overall */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Overall Mastery</h3>
          <span className="text-2xl font-black text-indigo-600">{overallPct}%</span>
        </div>
        <MasteryBar score={overallPct / 100} />
        <p className="text-xs text-gray-500 mt-2">
          {masteredConcepts} of {totalConcepts} concepts at ≥80% retention
        </p>
      </div>

      {/* Per-level breakdown */}
      {levels.map((level) => {
        const concepts = conceptsForLevel(dag, level);
        if (concepts.length === 0) return null;
        const avg =
          concepts.reduce((sum, n) => sum + (mastery[n.id] ?? 0), 0) /
          concepts.length;

        return (
          <div key={level} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="font-bold text-gray-900">Level {level}</span>
                <span className="ml-2 text-xs text-gray-400">{concepts.length} concepts</span>
              </div>
              <span className="font-bold text-gray-700">{Math.round(avg * 100)}%</span>
            </div>
            <MasteryBar score={avg} />

            {/* Per-concept list */}
            <div className="mt-3 space-y-1.5">
              {concepts.map((n) => {
                const score = mastery[n.id] ?? 0;
                const pct = Math.round(score * 100);
                return (
                  <div key={n.id} className="flex items-center gap-2 group">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${STRAND_COLORS[n.strand] ?? "bg-gray-400"}`}
                      title={n.strand}
                    />
                    <span className="text-xs text-gray-600 flex-1 truncate group-hover:text-gray-900">
                      {n.label}
                    </span>
                    <span className="text-xs font-mono text-gray-400 w-8 text-right">
                      {pct > 0 ? `${pct}%` : "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Strands</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(STRAND_COLORS).map(([strand, color]) => (
            <span key={strand} className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className={`w-2 h-2 rounded-full ${color}`} />
              {strand.replace("_", " ")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
