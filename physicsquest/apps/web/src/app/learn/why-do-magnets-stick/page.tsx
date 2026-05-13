import { PredictBox } from "@/components/lesson/PredictBox";
import { RetrievalCard } from "@/components/lesson/RetrievalCard";
import { TutorPanel } from "@/components/tutor/TutorPanel";
import { MagnetSim } from "@/components/sim/MagnetSim";
import Link from "next/link";

export const metadata = {
  title: "Why do magnets stick? — PhysicsQuest Level 2",
  description: "Discover why magnets attract and repel through hands-on simulation and Socratic exploration.",
};

export default function MagnetLesson() {
  return (
    <div className="min-h-screen bg-wonderland-bg tier-wonderland">
      {/* Nav */}
      <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-orange-100 px-4 py-3 flex items-center gap-3">
        <Link href="/" className="text-orange-500 hover:text-orange-700 font-bold text-sm">
          ← Home
        </Link>
        <div className="flex-1" />
        <span className="text-xs bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-full">
          Level 2 · Age 6–7 · Wonderland
        </span>
      </nav>

      <article className="max-w-2xl mx-auto px-4 py-10 prose prose-lg prose-gray">
        {/* Header */}
        <div className="not-prose mb-8">
          <div className="flex items-center gap-2 text-orange-500 font-bold text-sm mb-2">
            <span>🧲</span> Chapter 2.1 — Everyday Forces
          </div>
          <h1 className="text-4xl font-black text-gray-900 leading-tight mb-3">
            Why do magnets stick?
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            You've probably played with magnets before — two sides snap together,
            and two sides push away. But <em>why?</em> Let's find out.
          </p>
        </div>

        {/* Phase 1 — Observe */}
        <div className="not-prose bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
          <p className="font-bold text-amber-900 text-lg mb-1">🔭 First, observe</p>
          <p className="text-amber-800">
            Look at the simulator below. Two magnets are sitting next to each other.
            The arrows show the <strong>magnetic field</strong> — the invisible force
            spreading out from every magnet. Watch what happens to the arrows when
            you drag the magnets closer together.
          </p>
        </div>

        <MagnetSim />

        {/* Phase 2 — Predict */}
        <PredictBox
          question="If you flip one magnet around so both red ends face each other, what will happen? Will they attract (pull together) or repel (push away)?"
          hint="Look at the arrows between them right now. What direction are they pointing?"
        />

        {/* Phase 3 — Explanation */}
        <h2>What's actually happening?</h2>
        <p>
          Every magnet has two ends called <strong>poles</strong> — a
          <span className="text-red-600 font-bold"> North pole (N)</span> and a
          <span className="text-blue-600 font-bold"> South pole (S)</span>.
        </p>

        <div className="not-prose grid grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
            <div className="text-3xl mb-2">🤝</div>
            <p className="font-bold text-green-800">Opposites attract</p>
            <p className="text-green-700 text-sm mt-1">N + S pull together</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
            <div className="text-3xl mb-2">🙅</div>
            <p className="font-bold text-red-800">Same poles repel</p>
            <p className="text-red-700 text-sm mt-1">N + N push away · S + S push away</p>
          </div>
        </div>

        <p>
          But why do poles exist at all? Inside every magnet, trillions of tiny
          electrons are all spinning in the <strong>same direction</strong>.
          That creates a push and pull — an invisible force field that reaches
          through the air without touching anything.
        </p>

        <div className="not-prose bg-indigo-50 border border-indigo-100 rounded-2xl p-5 my-6">
          <p className="font-bold text-indigo-900 mb-1">🔬 Try it in the simulator</p>
          <ol className="text-indigo-800 space-y-1 text-sm list-decimal list-inside">
            <li>Click <strong>"Make same"</strong> — both magnets become N-N. Watch the field lines run away from each other.</li>
            <li>Click <strong>"Make opposite"</strong> — now N-S. Watch the lines link up and pull the magnets together.</li>
            <li>Drag one magnet very close to the other. What changes?</li>
          </ol>
        </div>

        <h2>Not everything sticks</h2>
        <p>
          Magnets only attract materials with iron, nickel, or cobalt in them.
          Wood, plastic, glass, and copper feel <em>nothing</em>. Why? Those
          materials have electrons spinning in <strong>random</strong> directions
          — they cancel out, leaving no net magnetic effect.
        </p>

        <div className="not-prose bg-yellow-50 border border-yellow-200 rounded-2xl p-4 my-4">
          <p className="font-bold text-yellow-900">🤔 Think about it</p>
          <p className="text-yellow-800 text-sm mt-1">
            A fridge magnet sticks to the fridge door but not to the fridge's plastic handle.
            What does that tell you about what the door and handle are made of?
          </p>
        </div>

        <h2>The invisible field</h2>
        <p>
          The arrows in the simulator show the magnetic <strong>field</strong>.
          A field is a region of space where a force acts — even with nothing
          in between. This is one of the most mind-bending ideas in physics:
          forces can act at a distance, through empty space.
        </p>
        <p>
          Earth itself is a giant magnet! Its iron core creates a field that
          wraps around the whole planet — which is exactly why a compass needle
          always points north.
        </p>

        {/* Phase 4 — Retrieval cards */}
        <h2 className="mt-10">Check your understanding</h2>

        <RetrievalCard
          conceptId="magnets_attract_repel"
          question="What happens when two North poles face each other?"
          answer="They repel — push each other away. Same poles always repel; opposite poles attract. This is called the law of magnetic poles."
        />

        <RetrievalCard
          conceptId="magnets_attract_repel"
          question="A magnet doesn't stick to an aluminium can. What does that tell you about aluminium?"
          answer="Aluminium is not a magnetic material — it contains no iron, nickel, or cobalt. Its electrons don't align to produce a net magnetic field."
        />

        <RetrievalCard
          conceptId="earth_magnetic"
          question="Why does a compass needle point north?"
          answer="Earth's iron core acts like a giant magnet with a South magnetic pole near the geographic North Pole. The compass's North pole is attracted to that, so it swings north."
        />

        {/* Phase 5 — Real world */}
        <div className="not-prose bg-teal-50 border border-teal-200 rounded-2xl p-5 my-8">
          <p className="font-bold text-teal-900 text-lg mb-2">🌍 Real-world translation</p>
          <p className="text-teal-800 mb-3">
            <strong>Design challenge:</strong> You've been asked to sort recycling at
            a factory. You have a conveyor belt that carries a mixed pile of aluminium cans
            and steel cans. How could you use magnets to separate them automatically?
            Sketch your idea and explain it to the tutor.
          </p>
          <p className="text-teal-700 text-xs">
            (Source: This kind of magnetic separator is used in real recycling plants worldwide.)
          </p>
        </div>

        {/* Next lesson */}
        <div className="not-prose flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
          >
            ← All levels
          </Link>
          <Link
            href="/learn/projectile-motion"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-5 py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm"
          >
            Try Level 8: Projectile Motion 🚀
          </Link>
        </div>
      </article>

      <TutorPanel
        conceptId="magnets_attract_repel"
        conceptLabel="Magnets: attraction and repulsion"
        lessonTitle="Why do magnets stick?"
        learnerLevel={2}
      />
    </div>
  );
}
