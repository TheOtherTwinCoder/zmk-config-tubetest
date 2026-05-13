import { PredictBox } from "@/components/lesson/PredictBox";
import { RetrievalCard } from "@/components/lesson/RetrievalCard";
import { TutorPanel } from "@/components/tutor/TutorPanel";
import { ProjectileSim } from "@/components/sim/ProjectileSim";
import Link from "next/link";

export const metadata = {
  title: "Projectile Motion — PhysicsQuest Level 8",
  description: "Master 2D projectile motion: derive the range equation and predict where the ball lands before it flies.",
};

export default function ProjectileLesson() {
  return (
    <div className="min-h-screen bg-studio-bg tier-studio text-studio-text">
      {/* Nav */}
      <nav className="sticky top-0 z-30 bg-gray-900/90 backdrop-blur border-b border-gray-800 px-4 py-3 flex items-center gap-3">
        <Link href="/" className="text-blue-400 hover:text-blue-300 font-bold text-sm">
          ← Home
        </Link>
        <div className="flex-1" />
        <span className="text-xs bg-blue-900/50 text-blue-300 font-bold px-3 py-1 rounded-full border border-blue-700">
          Level 8 · Grade 8–9 · Studio
        </span>
      </nav>

      <article className="max-w-2xl mx-auto px-4 py-10 prose prose-invert prose-lg">
        {/* Header */}
        <div className="not-prose mb-8">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-2">
            <span>🚀</span> Chapter 8.2 — Kinematics 2D
          </div>
          <h1 className="text-4xl font-black text-white leading-tight mb-3">
            Projectile Motion
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            A ball thrown at an angle follows a curved path called a
            <em> parabola</em>. The key insight: horizontal and vertical motion
            are completely independent of each other.
          </p>
        </div>

        {/* Prerequisites check */}
        <div className="not-prose flex gap-2 flex-wrap mb-6">
          {["Kinematics 1D", "Vectors (2D)", "Newton's 2nd Law"].map((p) => (
            <span key={p} className="text-xs bg-green-900/40 text-green-400 border border-green-700 px-3 py-1 rounded-full font-medium">
              ✓ {p}
            </span>
          ))}
        </div>

        {/* Phase 1 — Observe */}
        <div className="not-prose bg-blue-950 border border-blue-800 rounded-2xl p-5 mb-6">
          <p className="font-bold text-blue-200 text-lg mb-1">🔭 Observe first</p>
          <p className="text-blue-300 text-sm">
            Set the speed to <strong>20 m/s</strong> and the angle to <strong>45°</strong>.
            Watch the full trajectory. Then try 30° and 60°. What do you notice about
            the shape of the path? Does it matter how fast it goes horizontally vs vertically?
          </p>
        </div>

        <ProjectileSim />

        {/* Phase 2 — Predict */}
        <div className="not-prose">
          <PredictBox
            question="At what angle do you think the projectile travels the farthest horizontal distance? Make a prediction, then test it in the simulator."
            hint="Think about: at 0° the ball goes straight sideways (no height, crashes immediately). At 90° it goes straight up. Somewhere in between is the sweet spot."
          />
        </div>

        {/* Phase 3 — Model building */}
        <h2>Breaking the motion in two</h2>
        <p>
          The secret to projectile motion is the <strong>independence principle</strong>:
          horizontal and vertical motions happen simultaneously but completely
          independently of each other. Gravity only affects the vertical component.
        </p>

        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4">
            <p className="font-bold text-blue-300 mb-2">↔ Horizontal (x)</p>
            <p className="text-gray-300 text-sm mb-3">No force → constant velocity</p>
            <div className="bg-gray-900 rounded-xl p-3 font-mono text-sm text-green-400">
              vₓ = v·cos θ<br />
              x = vₓ · t
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4">
            <p className="font-bold text-orange-300 mb-2">↕ Vertical (y)</p>
            <p className="text-gray-300 text-sm mb-3">Gravity pulls down at 9.8 m/s²</p>
            <div className="bg-gray-900 rounded-xl p-3 font-mono text-sm text-green-400">
              vy = v·sin θ<br />
              y = vy·t − ½g·t²
            </div>
          </div>
        </div>

        <h2>Deriving the range equation</h2>
        <p>
          How far does it travel? We need the time of flight first. The ball lands
          when <code>y = 0</code> again:
        </p>

        <div className="not-prose bg-gray-800 border border-gray-700 rounded-2xl p-5 my-4 font-mono text-sm text-green-300 space-y-2">
          <p className="text-gray-400 not-prose">Set y = 0:</p>
          <p>0 = v·sin θ · t − ½g·t²</p>
          <p>0 = t(v·sin θ − ½g·t)</p>
          <p className="text-gray-400">Ignoring t = 0 (launch), solve for t:</p>
          <p className="text-yellow-300">t = 2v·sin θ / g</p>
          <p className="text-gray-400 mt-3">Substitute into x = vₓ·t:</p>
          <p>x = v·cos θ · (2v·sin θ / g)</p>
          <p className="text-white font-bold text-base mt-2 border-t border-gray-600 pt-2">
            R = v²·sin(2θ) / g
          </p>
        </div>

        <div className="not-prose bg-amber-900/30 border border-amber-700 rounded-2xl p-4 my-4">
          <p className="font-bold text-amber-300">💡 Key insight</p>
          <p className="text-amber-200 text-sm mt-1">
            The range R = v²·sin(2θ)/g is maximised when sin(2θ) = 1, i.e. when 2θ = 90°
            → <strong>θ = 45°</strong>. Was your prediction correct?
          </p>
        </div>

        <h2>Complementary angles</h2>
        <p>
          Notice that sin(2θ) = sin(180° − 2θ). This means <strong>two angles
          that add to 90° give the same range</strong>. A 30° launch and a 60°
          launch land in the same spot — test it in the simulator!
        </p>

        <div className="not-prose bg-gray-800 border border-gray-700 rounded-2xl p-4 my-4">
          <p className="font-bold text-white mb-2">🧪 Verification challenge</p>
          <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
            <li>Set speed = 25 m/s, angle = 30°. Note the range.</li>
            <li>Reset. Set speed = 25 m/s, angle = 60°. Note the range.</li>
            <li>They should match. Does the simulator confirm the equation?</li>
            <li>Now change gravity to 3.7 m/s² (Mars). How far does it go?</li>
          </ol>
        </div>

        <h2>Real-world applications</h2>
        <p>
          Projectile motion governs sport (basketball arc, penalty kick),
          military ballistics, asteroid impacts, and the orbit of the ISS
          (which is essentially a projectile moving so fast it keeps missing
          the Earth as it falls).
        </p>

        <div className="not-prose bg-gray-800 border border-gray-700 rounded-2xl p-5 my-6">
          <p className="font-bold text-white text-lg mb-2">🌍 Real-world translation</p>
          <p className="text-gray-300 mb-3">
            <strong>Design challenge:</strong> A firefighter needs to direct water
            from a hose at 20 m/s to hit a window 15 m away and 8 m above street level.
            What angle should they hold the hose? (There may be two solutions.)
            Calculate first, then verify in the simulator.
          </p>
          <p className="text-gray-500 text-xs">
            Hint: You need to solve for θ when both x = 15 m and y = 8 m simultaneously.
          </p>
        </div>

        {/* Retrieval */}
        <h2 className="mt-10">Check your understanding</h2>

        <RetrievalCard
          conceptId="kinematics_2d"
          question="A ball is launched at 30 m/s at 45°. What is its horizontal velocity component throughout the flight?"
          answer="vₓ = 30 · cos 45° ≈ 21.2 m/s. This stays constant throughout — no horizontal force acts on the projectile (ignoring air resistance)."
        />

        <RetrievalCard
          conceptId="kinematics_2d"
          question="At the highest point of a projectile's path, what is the vertical velocity?"
          answer="Zero. The ball has decelerated from its initial vy to 0 — that's the peak. Then gravity accelerates it back downward. Horizontal velocity is unchanged."
        />

        <RetrievalCard
          conceptId="kinematics_2d"
          question="Two balls are launched at the same speed — one at 25°, one at 65°. Which goes farther?"
          answer="They travel the same range! 25° + 65° = 90° — these are complementary angles, and R = v²·sin(2θ)/g gives identical values because sin(50°) = sin(130°)."
        />

        <RetrievalCard
          conceptId="kinematics_1d"
          question="What is the time of flight for a projectile launched at 20 m/s and 30°?"
          answer="t = 2v·sinθ / g = 2 × 20 × sin30° / 9.8 = 2 × 20 × 0.5 / 9.8 ≈ 2.04 s"
        />

        {/* Next */}
        <div className="not-prose flex justify-between items-center mt-12 pt-8 border-t border-gray-800">
          <Link href="/learn/why-do-magnets-stick" className="text-sm text-gray-500 hover:text-gray-300 font-medium">
            ← L2: Why do magnets stick?
          </Link>
          <Link href="/dashboard" className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-5 py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm">
            View my mastery 📊
          </Link>
        </div>
      </article>

      <TutorPanel
        conceptId="kinematics_2d"
        conceptLabel="Projectile motion (2D kinematics)"
        lessonTitle="Projectile Motion"
        learnerLevel={8}
      />
    </div>
  );
}
