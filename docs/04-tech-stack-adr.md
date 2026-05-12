# ADR-001: PhysicsQuest Tech Stack

**Status:** Proposed
**Date:** 2026-05-12
**Decision owner:** product owner (Mohnish) — to ratify before Phase 1.

## Context

PhysicsQuest is a web-first educational application serving learners aged 5–18, eventually classroom-deployed. It must:

- Run on low-spec Chromebooks (common in schools) and modern phones.
- Support 2D and 3D physics simulations in-browser at 60 fps.
- Stream a Socratic AI tutor with sub-second first-token latency.
- Persist mastery state per concept, per learner, with offline tolerance for the youngest cohorts.
- Comply with COPPA (US), GDPR-K (EU), and DPDP Act 2023 (India).
- Be authored continuously by a small content team (engineers + educators) without engineer involvement for routine lesson edits.

The AGENT_PROMPT proposed a stack; this ADR ratifies it with three modifications.

## Decision

### Adopted from AGENT_PROMPT (no change)

| Layer | Choice |
|---|---|
| Frontend framework | **Next.js 15 (App Router) + React 19 + TypeScript** |
| Styling | **Tailwind CSS + shadcn/ui** |
| 3D physics | **Three.js + React Three Fiber + Rapier 3D (WASM)** |
| Animation | **Framer Motion** (+ Lottie for mascot loops) |
| State | **Zustand** (client UI) + **TanStack Query** (server cache) |
| DB | **Postgres on Supabase** + **Drizzle ORM** |
| AI Tutor | **Anthropic Claude API**: Sonnet 4.6 (tutor), Haiku 4.5 (hints) with prompt caching |
| Spaced repetition | **FSRS v4** (open source) |
| Analytics | **PostHog** (cloud free tier → self-hosted at scale) |
| Hosting | **Vercel** (web) + **Supabase** (DB/Auth/Storage) |
| Testing | **Vitest** (unit) + **Playwright** (E2E) + **Storybook** (component) |
| Mobile (Phase 4) | **Expo + React Native** sharing UI primitives |
| Content authoring | **MDX + Contentlayer** with custom React components |

### Modifications

**M1 — 2D physics: standardize on Rapier 2D (not Matter.js).**
*Reason:* Rapier (Rust → WASM) is deterministic, ~3× faster than Matter.js, and shares an API with the 3D engine — one mental model for content authors. Matter.js stays as a fallback only if Rapier WASM blows the bundle budget on Chromebooks (test in Phase 0).

**M2 — Auth: Supabase Auth (not Clerk).**
*Reason:* Clerk's per-MAU pricing punishes a free-tier-heavy K-12 model. Supabase Auth + row-level security covers our needs, keeps auth + DB in one vendor, and parent-gating can be implemented via a `parental_consent` table.

**M3 — Backend boundary: Next.js Route Handlers + Server Actions, no tRPC layer.**
*Reason:* React 19 Server Actions cover end-to-end type safety natively now; adding tRPC is overhead. Reserve a separate FastAPI service only for the eval/research pipeline (computing learning gains, FCI scoring) where Python's stats ecosystem helps.

### Architecture sketch

```
[ Browser ]
   │  React Server Components + Server Actions
   ▼
[ Next.js on Vercel ]
   ├── /lesson/*       → MDX + Contentlayer (static at build)
   ├── /sim/*          → React Three Fiber + Rapier (client)
   ├── /tutor/*        → Server Action → Claude API (streaming)
   ├── /mastery/*      → Server Action → Postgres (Drizzle)
   └── /eval/*         → calls Python FastAPI service
                ▼
        [ Supabase ]
         Postgres  +  Auth  +  Storage (assets)
                ▼
        [ FastAPI eval service (Fly.io) ]   ← only Phase 3+
```

### Repo layout

```
physicsquest/
├── apps/
│   ├── web/              # Next.js app
│   ├── mobile/           # Expo (Phase 4)
│   └── eval/             # FastAPI eval service (Phase 3+)
├── packages/
│   ├── ui/               # shadcn-based components, age-tier themes
│   ├── sim/              # R3F + Rapier scene primitives
│   ├── content/          # MDX lessons + assessment items
│   ├── dag/              # concept-DAG TS exports + helpers
│   ├── fsrs/             # FSRS wrapper + Postgres bindings
│   └── tutor/            # Claude API client, prompts, eval
├── docs/                 # specs, ADRs, briefs
└── tooling/              # scripts, CI, content linters
```

Monorepo with **pnpm workspaces + Turborepo**.

### Performance budget (Chromebook floor: Intel Celeron N4020, 4 GB RAM)

- Initial JS ≤ 250 KB gz on lesson pages.
- Time to interactive ≤ 3.5 s on 4G.
- Simulation steady state ≥ 50 fps for ≤ 100 rigid bodies.
- AI tutor first-token ≤ 1.0 s P50, ≤ 2.5 s P95.

### COPPA / GDPR-K compliance plan

- Under-13 accounts require verifiable parental consent (email + delayed-confirmation flow).
- AI tutor transcripts for under-13 are *not* stored beyond the active session unless the parent opts in.
- No third-party trackers on any page accessible without auth.
- PostHog runs in PII-stripped mode for under-13 cohorts.
- DPA signed with Supabase, Vercel, Anthropic before any kid data flows.

### Cost envelope (target, per active learner per month, Phase 2 scale ≈ 1000 MAU)

| Item | Estimate |
|---|---|
| Hosting (Vercel + Supabase free → Pro) | $0.05 |
| Claude API (tutor avg 8 turns/week, ~80% Haiku) | $0.40 |
| PostHog | $0.02 |
| Storage (Supabase Storage, 50 MB/user content) | $0.01 |
| **Total** | **≈ $0.50 / MAU** |

At 10k MAU, budget headroom for tutor escalations to Sonnet on harder topics. Olympiad track may use Opus 4.7 selectively at +$0.10/MAU.

## Rejected alternatives

- **Flutter for everything:** rules out R3F/Rapier WASM physics; rebuilding both engines in Dart is unjustified.
- **Unity WebGL:** load size and Chromebook performance fail the budget.
- **Custom physics engines:** unnecessary; Rapier is best-in-class and free.
- **Auth0:** more expensive than Clerk and Supabase.
- **MongoDB:** structured curriculum + mastery data is relational. Postgres wins.

## Consequences

**Positive**
- Single language (TypeScript) across web/mobile/sim layers.
- Vendor count kept small: Vercel, Supabase, Anthropic, PostHog.
- Content team can ship lessons without engineer help (MDX + DAG references).

**Negative**
- Vercel + Supabase free tiers will be outgrown by mid-Phase 3; price step is known and acceptable.
- Rapier WASM adds ~400 KB to sim pages — must lazy-load.
- Server Actions are still maturing; we depend on Next.js 15+ stability.

## Open questions

See `06-open-questions.md`. Top 3 that block this ADR:
1. India deployment: does DPDP Act require in-region data residency? May force Supabase region split.
2. Olympiad / competition track: separate product surface or extension of Level 10?
3. Offline mode in Phase 2: do we ship a PWA shell, or a full local-first model (RxDB / Yjs)?
