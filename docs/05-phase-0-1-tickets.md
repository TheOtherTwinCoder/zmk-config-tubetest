# Phase 0 → Phase 1 Ticket Breakdown

Format per ticket:
- **Title** — imperative, ≤ 60 chars.
- **Scope** — one sentence.
- **Acceptance** — verifiable bullets.
- **Owner** — `eng`, `content`, `design`, `research`, `legal` (placeholders).
- **Depends on** — ticket IDs.

---

## Phase 0 — Foundations (target: weeks 0–2)

### PQ-001 · Ratify ADR-001
- **Scope:** Product owner reviews `04-tech-stack-adr.md`, answers M1/M2/M3 questions, signs off.
- **Acceptance:** ADR status flips to *Accepted*; any overrides captured.
- **Owner:** product owner
- **Depends on:** —

### PQ-002 · Resolve top 3 open questions
- **Scope:** Answers in `06-open-questions.md` for data residency, Olympiad track scope, offline strategy.
- **Acceptance:** Each question annotated with decision + date.
- **Owner:** product owner + legal
- **Depends on:** —

### PQ-003 · Monorepo scaffold
- **Scope:** Initialize pnpm + Turborepo with `apps/web`, `packages/ui`, `packages/sim`, `packages/content`, `packages/dag`, `packages/fsrs`, `packages/tutor`. Empty but buildable.
- **Acceptance:** `pnpm build && pnpm test` green; CI runs on PR.
- **Owner:** eng
- **Depends on:** PQ-001

### PQ-004 · Concept-DAG package
- **Scope:** Port `03-concept-dag.json` into `packages/dag` with TS types, graph helpers (`getPrereqs(id)`, `getDependents(id)`, `topologicalOrder()`, `weakestAncestor(masteryMap)`), and unit tests.
- **Acceptance:** 100% test coverage; lint passes; `dag.validate()` rejects cycles.
- **Owner:** eng
- **Depends on:** PQ-003

### PQ-005 · Curriculum spreadsheet (xlsx)
- **Scope:** Export `02-curriculum.md` to a normalized xlsx (sheets: Levels, Chapters, Lessons, Outcomes, Assessments, ConceptMap). Use `xlsx` skill.
- **Acceptance:** Spreadsheet validates against schema; every lesson maps to ≥1 DAG node; every DAG node has ≥1 lesson.
- **Owner:** content
- **Depends on:** PQ-004

### PQ-006 · Brand + age-tier design tokens
- **Scope:** Define 3 visual tiers (Wonderland L1-3, Lab L4-7, Studio L8-10). Mascot family sketches. Tailwind theme tokens per tier.
- **Acceptance:** Figma file + `packages/ui/src/themes/{wonderland,lab,studio}.ts` shipped; Storybook shows hello-world button in 3 tiers.
- **Owner:** design
- **Depends on:** PQ-003

### PQ-007 · COPPA/GDPR-K legal review (Phase 0 cut)
- **Scope:** Counsel reviews data flows for under-13 cohort. Output: signed checklist + redlines.
- **Acceptance:** Written go/no-go on tutor-transcript retention, third-party DPAs (Anthropic, Supabase, Vercel, PostHog).
- **Owner:** legal
- **Depends on:** —

### PQ-008 · Performance budget harness
- **Scope:** Lighthouse CI + bundle-size budget; Playwright FPS probe on a sample sim page; runs in CI.
- **Acceptance:** PR is blocked if any budget regresses ≥ 5%.
- **Owner:** eng
- **Depends on:** PQ-003

### PQ-009 · Content schema + MDX components
- **Scope:** Define MDX frontmatter (level, chapter, conceptIds[], misconceptions[], assessmentRefs[], license, source). Build inline components: `<Sim/>`, `<Predict/>`, `<Reveal/>`, `<RetrievalCard/>`, `<Misconception/>`.
- **Acceptance:** Schema documented; Storybook stories for each component; content lint rejects bad frontmatter.
- **Owner:** eng + content
- **Depends on:** PQ-004, PQ-006

### PQ-010 · Research Brief sign-off & references
- **Scope:** Convert `01-research-brief.md` citations into `docs/refs.bib`; one academic reviewer verifies claims.
- **Acceptance:** All citations have DOI/URL; one reviewer signature.
- **Owner:** research
- **Depends on:** —

---

## Phase 1 — Vertical Slice (target: weeks 3–8)

**Goal:** one full lesson at **L2 (age 6–7) — "Why do magnets stick?"** and one at **L8 (grade 8-9) — "Projectile motion"**, end-to-end working, behind a feature flag.

### PQ-101 · Lesson player skeleton
- **Scope:** Route `/learn/[lessonSlug]` renders MDX, threads through age-tier theme, supports the 5 inline components.
- **Acceptance:** Both target lessons render; keyboard + screen-reader navigable; passes Lighthouse a11y 95+.
- **Owner:** eng
- **Depends on:** PQ-009, PQ-006

### PQ-102 · Sim package: magnet-field 2D scene
- **Scope:** Rapier 2D + R3F scene of a bar magnet + draggable iron filings. Predict-then-reveal field lines.
- **Acceptance:** ≥ 50 fps with 100 filings on Chromebook floor; deterministic across reloads.
- **Owner:** eng
- **Depends on:** PQ-003, PQ-008

### PQ-103 · Sim package: projectile-motion 2D scene
- **Scope:** Adjustable launch v, angle; trace path; toggle gravity/air-resistance. Predict landing before launch.
- **Acceptance:** Matches `x = v cosθ t`, `y = v sinθ t − ½ g t²` within 0.5%; "predict-first" gate works.
- **Owner:** eng
- **Depends on:** PQ-102 (reuses scene primitives)

### PQ-104 · Authoring: write the two lessons
- **Scope:** Magnet lesson (L2) + Projectile lesson (L8) in MDX, including 6 retrieval cards each, 3 misconceptions each, 1 boss problem.
- **Acceptance:** Lessons pass content lint; reviewed by a teacher.
- **Owner:** content
- **Depends on:** PQ-101, PQ-102, PQ-103

### PQ-105 · AI tutor v1 (Socratic, streaming)
- **Scope:** Server Action calling Claude (Haiku for hints, Sonnet on escalation). System prompt enforces: never give the answer first; ask one diagnostic question; identify which DAG node is weak; log misconception tag.
- **Acceptance:** Streaming first-token < 1 s P50; offline eval set (20 student transcripts) shows ≥ 80% Socratic compliance (rubric-scored).
- **Owner:** eng + content
- **Depends on:** PQ-004, PQ-007

### PQ-106 · Mastery store + FSRS scheduler
- **Scope:** `mastery(user_id, concept_id, level, last_review, next_due, fsrs_state)` table. Server Actions to record reviews and surface due cards.
- **Acceptance:** Unit tests for FSRS edge cases; round-trip via Server Action measured < 100 ms P95.
- **Owner:** eng
- **Depends on:** PQ-003, PQ-004

### PQ-107 · Auth + parent-gated signup
- **Scope:** Supabase Auth with two flows: standard (13+) and parent-gated (<13). Parental-consent email link required before learner can use tutor.
- **Acceptance:** Tested with 5 dummy accounts each flow; consent revocation works; legal checklist green.
- **Owner:** eng + legal
- **Depends on:** PQ-007

### PQ-108 · Parent / teacher mastery view
- **Scope:** Read-only dashboard showing per-learner mastery vs DAG: weakest 5 nodes, recent activity, time-on-task.
- **Acceptance:** Renders for a seeded learner; ≥ 95 a11y; mobile-friendly.
- **Owner:** eng + design
- **Depends on:** PQ-106

### PQ-109 · Pre/post concept inventory (slice)
- **Scope:** 12-item inventory for the L2 magnet lesson and a 15-item FCI-derived inventory for the L8 projectile lesson. Pre and post administered automatically.
- **Acceptance:** Items reviewed by 1 teacher + 1 PER-trained reviewer; results stored for analysis.
- **Owner:** research + content
- **Depends on:** PQ-101, PQ-104

### PQ-110 · Playtest cohort (5 + 5 kids)
- **Scope:** 5 learners aged 6–7 and 5 aged 13–15. Observed sessions; recorded misconceptions; post-session interview.
- **Acceptance:** Written playtest report; top 10 issues filed as P2 tickets; learning gain reported.
- **Owner:** research
- **Depends on:** PQ-104, PQ-105, PQ-109

### PQ-111 · Iteration on playtest findings
- **Scope:** Address P0/P1 issues from PQ-110.
- **Acceptance:** Re-playtest with 3+ kids per band shows resolution.
- **Owner:** all
- **Depends on:** PQ-110

### PQ-112 · Phase-1 demo + decision review
- **Scope:** 10-minute video demo, learning-gain metric vs. baseline, cost-per-learner extrapolation, go/no-go for Phase 2.
- **Acceptance:** Decision documented in `docs/decisions/phase-1-review.md`.
- **Owner:** product owner
- **Depends on:** PQ-111

---

## Definition of Done (applies to every ticket)
- TypeScript strict mode, no `any`.
- Tests written before merge; coverage tracked.
- A11y: WCAG 2.2 AA; manual screen-reader pass on user-facing changes.
- Storybook story for any new UI component.
- CHANGELOG entry; ADR if architectural impact.
- Performance budget unaffected (PQ-008 gates this).
