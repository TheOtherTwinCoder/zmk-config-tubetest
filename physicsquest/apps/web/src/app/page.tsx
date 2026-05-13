import Link from "next/link";

const LEVELS = [
  { n: 1, label: "Wonder & Senses", age: "Age 5–6", tier: "wonderland", emoji: "🌟", color: "from-orange-400 to-yellow-400" },
  { n: 2, label: "Everyday Forces", age: "Age 6–7", tier: "wonderland", emoji: "🧲", color: "from-pink-400 to-orange-400" },
  { n: 3, label: "Materials & Energy", age: "Age 7–8", tier: "wonderland", emoji: "⚡", color: "from-yellow-400 to-green-400" },
  { n: 4, label: "Machines & Motion", age: "Age 8–9", tier: "lab", emoji: "⚙️", color: "from-blue-400 to-indigo-400" },
  { n: 5, label: "Patterns of Nature", age: "Age 9–10", tier: "lab", emoji: "🌊", color: "from-indigo-400 to-purple-400" },
  { n: 6, label: "Measuring the World", age: "Age 10–11", tier: "lab", emoji: "📐", color: "from-purple-400 to-blue-400" },
  { n: 7, label: "Newtonian Foundations", age: "Age 11–13", tier: "lab", emoji: "🍎", color: "from-green-500 to-teal-500" },
  { n: 8, label: "Classical Physics I", age: "Grade 8–9", tier: "studio", emoji: "🚀", color: "from-blue-500 to-cyan-500" },
  { n: 9, label: "Classical Physics II + Modern", age: "Grade 10–11", tier: "studio", emoji: "⚛️", color: "from-violet-500 to-purple-600" },
  { n: 10, label: "Pre-University Physics", age: "Grade 12", tier: "studio", emoji: "🎓", color: "from-emerald-500 to-teal-600" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Hero */}
      <section className="relative px-6 py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/60 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto">
          <div className="text-7xl mb-6 animate-float inline-block">⚛️</div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-4 leading-tight">
            Physics<span className="text-indigo-600">Quest</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            From wonder to mastery — a physics journey built for ages 5 through Grade 12.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/learn/why-do-magnets-stick"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-indigo-700 transition-colors text-lg shadow-lg shadow-indigo-200"
            >
              🧲 Try Level 2: Magnets
            </Link>
            <Link
              href="/learn/projectile-motion"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 font-bold px-8 py-4 rounded-2xl border-2 border-indigo-200 hover:border-indigo-400 transition-colors text-lg"
            >
              🚀 Try Level 8: Projectiles
            </Link>
          </div>
        </div>
      </section>

      {/* Level Map */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Your Learning Map</h2>
        <p className="text-center text-gray-600 mb-12">10 levels. 70 concepts. One unbroken thread of understanding.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {LEVELS.map((level) => (
            <div
              key={level.n}
              className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden p-5"
            >
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${level.color}`} />
              <div className="text-3xl mb-2">{level.emoji}</div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Level {level.n} · {level.age}
              </div>
              <div className="font-bold text-gray-800 text-sm leading-snug">{level.label}</div>
              <div className="mt-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium capitalize">
                  {level.tier}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How PhysicsQuest teaches</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "🔭",
                title: "Phenomenon First",
                desc: "Every concept starts with a real or simulated observation. The equation comes last.",
              },
              {
                icon: "🤔",
                title: "Predict Before You Test",
                desc: "Write your guess before the simulation runs. Being wrong is where learning lives.",
              },
              {
                icon: "🤖",
                title: "Socratic AI Tutor",
                desc: "Ask anything. The tutor never gives the answer first — it asks one perfect question back.",
              },
              {
                icon: "🔁",
                title: "Spaced Repetition",
                desc: "Concepts come back at exactly the right moment — before you forget, not after.",
              },
              {
                icon: "🗺️",
                title: "Mastery Map",
                desc: "See every concept as a node in a graph. Watch your mastery light up path by path.",
              },
              {
                icon: "🏆",
                title: "Boss Challenges",
                desc: "Each level ends with a real-world design problem that requires combining everything.",
              },
            ].map((f) => (
              <div key={f.title} className="flex gap-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl flex-shrink-0">{f.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-400">
        <p>PhysicsQuest · Built with evidence-based pedagogy · NGSS · CBSE · IB aligned</p>
      </footer>
    </main>
  );
}
