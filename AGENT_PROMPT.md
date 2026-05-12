# Agent Prompt: "PhysicsQuest" — A Lifelong Physics Learning App for Kids (Ages 5 → Grade 12)

> Paste this entire prompt into a fresh Claude Code / Cowork session. It is self-contained: the receiving agent has no memory of the parent conversation.

---

## 1. Mission

Design, plan, and (in subsequent phases) build an educational application called **PhysicsQuest** that takes a child from **age 5 to the end of grade 12** along a continuous, gamified physics-learning journey. By the end, the learner should:

1. Have a near-complete conceptual + mathematical grasp of school-level physics.
2. Think like a physicist — observe, hypothesize, model, test, refine.
3. Be able to look at a real-world problem and translate it into a physics-based solution.
4. *Enjoy* the subject — curiosity, wonder, and persistence are first-class outcomes.

Treat "fun" and "rigor" as co-equal constraints. Neither can be sacrificed for the other.

---

## 2. Research Phase (do this BEFORE proposing the curriculum)

Before drafting chapters or code, gather and synthesize evidence from:

- **National curricula**: NGSS (US), UK National Curriculum (KS1–KS5), CBSE/ICSE (India), IB MYP/DP Physics, Singapore MOE, Finnish core curriculum, Australian ACARA.
- **Cognitive-development research**: Piaget's stages, Vygotsky's ZPD, dual-coding theory, Rosenshine's Principles of Instruction, cognitive-load theory (Sweller), retrieval practice (Roediger & Karpicke), spaced repetition (Ebbinghaus / SuperMemo / Anki research), Bloom's taxonomy, productive failure (Kapur).
- **Physics-education research (PER)**: Hestenes' Force Concept Inventory, Mazur's peer instruction, Etkina's ISLE method, Hake's interactive engagement studies, McDermott's *Physics by Inquiry*.
- **Free / open content**:
  - PhET Interactive Simulations (Colorado) — pedagogy + simulation library
  - OpenStax College Physics / High School Physics (free CC-BY textbooks)
  - CK-12 FlexBooks
  - MIT OpenCourseWare 8.01 / 8.02
  - Feynman Lectures on Physics (free online edition)
  - NCERT physics textbooks (free PDFs)
  - Khan Academy physics scope & sequence
  - Minute Physics, Veritasium, 3Blue1Brown (for narrative style)
- **Gamification research**: Octalysis framework (Yu-kai Chou), self-determination theory (Deci & Ryan — autonomy/competence/relatedness), flow theory (Csikszentmihalyi), studies on Duolingo / Prodigy / DragonBox / Kerbal Space Program EDU.

**Deliverable for this phase:** a 1–2 page synthesis ("Research Brief") naming the specific frameworks you'll lean on and *why*, with citations.

---

## 3. Curriculum Structure — Skeleton to Refine

Refine the level boundaries against research, but start from this skeleton. Each level must define: **age range, prerequisite level, big ideas, chapters, learning outcomes, assessment style, recommended weekly time.**

| Level | Age | Grade | Theme | Cognitive Mode |
|-------|-----|-------|-------|----------------|
| 1 | 5–6 | K | **Wonder & Senses** — push/pull, hot/cold, light/dark, loud/soft, float/sink, fast/slow | Pre-operational — sensory play, no numbers |
| 2 | 6–7 | 1 | **Everyday Forces** — gravity (things fall), magnets, simple motion, weather, shadows | Concrete observation, drawings |
| 3 | 7–8 | 2 | **Materials & Energy** — states of matter, heat/cold transfer, sound vibrations, basic circuits with batteries & bulbs | Sorting, simple cause–effect |
| 4 | 8–9 | 3 | **Machines & Motion** — six simple machines, friction, gravity vs. air, energy stored vs. moving | Beginning quantitative ("more", "less", measurement) |
| 5 | 9–10 | 4 | **Patterns of Nature** — wave basics (water, sound, light), reflection, magnetism + electricity link, energy conservation (qualitative) | Graphs, units, ratios |
| 6 | 10–11 | 5 | **Measuring the World** — speed, distance, time; mass vs. weight; pressure; temperature scales; series vs. parallel circuits | Algebra-readiness, simple equations |
| 7 | 11–13 | 6–7 | **Newtonian Foundations** — F=ma intuitively, momentum (collisions), work & power, density & buoyancy, optics (lenses, prisms), sound (pitch/frequency) | Symbolic algebra, vectors as arrows |
| 8 | 13–15 | 8–9 | **Classical Physics I** — kinematics (1D/2D), Newton's laws (full), energy & momentum conservation, simple harmonic motion intro, Ohm's law, wave equation, intro to fields | Trigonometry, vectors, algebraic manipulation |
| 9 | 15–17 | 10–11 | **Classical Physics II + Modern Intro** — rotational dynamics, fluids, thermodynamics, EM induction, AC circuits, geometric + wave optics, special relativity intro, photoelectric effect, atomic models | Pre-calculus, problem decomposition |
| 10 | 17–18 | 12 | **Pre-University Physics** — calculus-based mechanics, Maxwell's equations (integral form), quantum intro, nuclear physics, semiconductor basics, modern applications | Calculus, multi-step modeling, board/competition prep |

For each level, the agent must produce:
- **3–6 chapters** (each chapter = 4–10 lessons)
- **One "Big Question"** per chapter (e.g., L4: *"Why does a heavy slide feel easier than a light one when there are wheels?"*)
- **One "Build / Investigate" project** per chapter (physical or simulated)
- **A boss-challenge** at end of level that requires combining prior chapters

---

## 4. Pedagogical Non-Negotiables

1. **Concept before formula.** No equation introduced until the learner has wrestled with the phenomenon.
2. **Phenomenon → Question → Model → Test → Refine.** Every lesson follows this arc (Etkina's ISLE).
3. **Spaced retrieval.** Every concept reappears at expanding intervals (1d, 3d, 7d, 21d…).
4. **Productive failure.** Let learners attempt before teaching the canonical solution.
5. **Multiple representations.** Each idea shown as: real video → animation → diagram → graph → equation → words. Learners must translate between them.
6. **Critical thinking prompts.** Every lesson has at least one "What would change if…?" / "Predict before you simulate" / "Find the flaw in this reasoning" question.
7. **Real-world translation.** Every level ends with a "Design a solution" prompt for a real problem (e.g., L5: design a shadow-clock for your school; L8: estimate the safe following distance for a school bus).
8. **No dead-ends.** If a learner fails, the system diagnoses *which* sub-concept is weak and routes back, not forward.
9. **Calm UI for the young, dense UI for the older.** Visual design must scale with age (big buttons, mascots at L1–3 → sleek dashboards at L9–10).
10. **Accessibility.** Dyslexia-friendly fonts, screen-reader support, color-blind palettes, captions on all video.

---

## 5. Application Surface

- **Web app first** (works on Chromebook — many schools), then PWA, then native wrappers.
- **Offline-capable** for the K–5 levels (intermittent connectivity is common).
- **Parent / teacher dashboard** showing concept mastery (not just XP).
- **AI tutor** (Claude API) that:
  - Never gives the answer first; uses Socratic questioning.
  - Adapts language complexity to the learner's level.
  - Logs misconceptions for the teacher dashboard.
- **Simulation sandbox** per topic — drag-and-drop physics playground (Matter.js for 2D, Three.js + Rapier/Cannon for 3D).
- **Story spine.** A light narrative arc (e.g., "Repair the broken universe one law at a time") binds the levels so a 6-year-old and a 16-year-old feel they're in the same world.

---

## 6. Recommended Tech Stack (justify or override)

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Frontend | **Next.js 15 (App Router) + React 19 + TypeScript** | SSR for SEO/landing, ISR for content pages, RSC for tutor streaming. |
| Styling | **Tailwind CSS + shadcn/ui** | Fast iteration, age-themed design tokens. |
| 2D physics | **Matter.js** (or Rapier 2D via WASM) | Mature, deterministic, good for L1–7. |
| 3D physics | **Three.js + React Three Fiber + Rapier 3D** | For L7+ orbits, collisions, EM fields. |
| Animation | **Framer Motion + Lottie** | Micro-interactions, mascot animations. |
| State | **Zustand** (client) + **TanStack Query** (server) | Lightweight, no Redux ceremony. |
| Backend | **Next.js API routes + tRPC** OR **FastAPI** if Python ML is needed | Type-safe end-to-end. |
| DB | **Postgres (Supabase or Neon)** + **Drizzle ORM** | Free tier, row-level security for kid data. |
| Auth | **Clerk** or **Supabase Auth** with COPPA/GDPR-K mode | Parent-gated signup for under-13. |
| AI Tutor | **Claude API (Sonnet 4.6 for tutoring, Haiku 4.5 for hint-streams)** with prompt caching | Cost-controlled, high quality. |
| Spaced repetition | **FSRS (Free Spaced Repetition Scheduler)** | Modern successor to SM-2, open source. |
| Analytics | **PostHog** (self-host option) | Privacy-respecting, free tier. |
| Hosting | **Vercel** (frontend) + **Supabase** (db/auth) | Zero-ops to start. |
| Content authoring | **MDX + Contentlayer** for lessons | Lets writers add interactive components inline. |
| Testing | **Vitest + Playwright** | Unit + E2E. |
| Mobile (Phase 4) | **Expo / React Native** sharing UI primitives | Reuse 70%+ of web. |

---

## 7. Cowork / Claude Code Workflow

The user is building with Cowork + Claude Code. Recommend this split:

- **Cowork agents for parallel research & content**: spawn separate agents for (a) curriculum-per-level drafting, (b) simulation prototypes, (c) assessment-item writing. Each writes to its own folder, then a reviewer agent merges.
- **Claude Code for code + integration**: main repo work, refactors, test runs, deploys.
- **Skills to install**:
  - `pdf` skill (for ingesting NCERT / OpenStax PDFs into the content pipeline)
  - `pptx` / `docx` skills (for exporting teacher lesson plans)
  - `xlsx` skill (for the curriculum-mapping spreadsheet — concept × level × chapter × prerequisite)
  - `claude-api` skill (for the AI-tutor service)
  - `schedule` skill (for nightly content-quality eval runs)
- **Memory hygiene**: store user (= product owner) preferences, the level glossary, and the canonical concept-dependency DAG as long-lived memory files.
- **MCP servers worth adding**: PostHog MCP (analytics queries), Supabase MCP (db introspection), a Linear/GitHub MCP for issue tracking.

---

## 8. Development Plan (Phases & Milestones)

> Treat these as milestones, not calendar promises. Each phase ends with a working artifact the product owner can click.

**Phase 0 — Foundations (Week 0–2)**
- Research Brief (§2).
- Concept-dependency DAG (every physics concept as a node, prereq edges) — single source of truth.
- Curriculum spreadsheet (10 levels × chapters × lessons × outcomes × assessments).
- Brand & art direction (mascot family aging with the learner; design tokens per level).
- Tech-stack ADR (architecture decision record) confirming or overriding §6.

**Phase 1 — Vertical Slice (Week 3–8)**
- One full lesson at L2 (e.g., "Why do magnets stick?") AND one at L8 (e.g., "Projectile motion") — proves the system works across age extremes.
- Lesson player, simulation embed, Socratic tutor, spaced-repetition card, mastery tracking, parent view.
- Playtest with 5 kids per age band; iterate.

**Phase 2 — Levels 1–3 Content + Polish (Week 9–18)**
- 100% of K–Grade 2 content.
- Offline mode, accessibility audit (WCAG 2.2 AA), COPPA compliance review.
- Soft launch to a friends-and-family cohort (n ≈ 50 kids).

**Phase 3 — Levels 4–7 (Week 19–32)**
- Middle-school content.
- Teacher dashboard, classroom mode, assignment flows.
- First paid pilot with 1–2 schools.

**Phase 4 — Levels 8–10 + Mobile (Week 33–48)**
- High-school content with calculus track.
- Native apps (Expo).
- Olympiad / competition prep add-on.

**Phase 5 — Adaptive & Community (Week 49+)**
- Open-ended sandbox quests (learners propose their own investigations).
- Peer-review mode (older learners mentor younger).
- Continuous A/B testing of lesson variants against learning gains.

Each phase ends with: **(a) demo video, (b) learning-gain metric vs. control, (c) retention metric, (d) cost-per-active-learner report.**

---

## 9. Success Metrics (define before building)

- **Conceptual gain** — pre/post FCI-style tests per level (target ≥ 0.4 normalized gain, per Hake).
- **Retention** — % of learners returning at 7d / 30d / 90d.
- **Time-on-task vs. mastery** — flat or improving (avoid grind).
- **Misconception decay** — % of known misconceptions still held after the corresponding lesson + 30 days.
- **Real-world transfer** — performance on novel application problems at end-of-level.
- **Joy** — self-reported "Would you tell a friend?" + qualitative parent/teacher interviews.

---

## 10. What to Deliver in Your First Reply

Do **not** start coding. In the first reply, produce:

1. The **Research Brief** (§2).
2. A **revised curriculum table** (§3) with chapters, big questions, and projects filled in for all 10 levels — cite which curriculum / PER source each chapter draws from.
3. The **concept-dependency DAG** in a machine-readable format (JSON or Mermaid) — every node tagged with its earliest-introduction level.
4. A **tech-stack ADR** either ratifying §6 or proposing changes with justification.
5. A **Phase-0 → Phase-1 task breakdown** with concrete tickets (title + 1-sentence scope + acceptance criteria).
6. A list of **open questions** for the product owner that, once answered, unblock Phase 1.

Format the reply as Markdown with clear section headers. Keep prose tight; favor tables and lists.

---

## 11. Guardrails

- **Child safety first.** No user-to-user chat without moderation; no PII collection beyond what COPPA/GDPR-K permits; parent consent flow before any AI tutor interaction logs are stored.
- **Citation discipline.** Any claim about pedagogy or curriculum must cite a source.
- **No hallucinated standards.** If you're unsure whether a topic belongs to NGSS K-2 vs. 3-5, say so and flag for human review rather than guessing.
- **Cost discipline.** Pick the cheapest model that meets the bar for each task (Haiku for hints, Sonnet for tutoring, Opus only for content authoring review).
- **License hygiene.** When ingesting OpenStax / NCERT / Feynman content, respect each license (CC-BY, CC-BY-NC, copyrighted with permission, etc.) and track attribution per asset.

---

*End of prompt. Begin with §10, Deliverable 1.*
