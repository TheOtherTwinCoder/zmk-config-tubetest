# Open Questions for Product Owner

These block or shape Phase 1. Numbered for easy reference. Decisions should be written back into this file with a date.

---

## A. Strategy & scope

**Q1. Who is the primary buyer?**
Parents (B2C), schools (B2B), governments (B2G), or all? This drives pricing, dashboard depth, language priorities, and content tone.
- Implication: B2B requires a teacher dashboard from Phase 2; B2C can defer.

**Q2. Geographic launch order?**
US first, India first (large English-speaking school market), UK, or simultaneous?
- Implication: changes curriculum-alignment priority (NGSS vs CBSE vs UK-NC), data residency, payment rails.

**Q3. Pricing model?**
Free + freemium, school-license-only, donation-supported (PhET model), or paid premium with a free tier?
- Implication: shapes feature-flag strategy and the Olympiad/competition add-on positioning.

**Q4. Olympiad / competition prep track — separate product or Level 10 extension?**
A separate track justifies harder content and Opus 4.7 tutor cost; an extension keeps the brand unified.

**Q5. How important is mobile-native at launch?**
Web-first with PWA may cover 80% of cases. Native (Expo) adds 2–3 months to Phase 4.

---

## B. Pedagogy

**Q6. Standards alignment — single or multi?**
Should the *same* lesson map to NGSS + CBSE + UK-NC simultaneously, or do we ship region-specific lesson variants?

**Q7. Language support priority?**
English-only at launch is fastest. If we localize from day one, candidate languages (Spanish, Hindi, Mandarin, Arabic) in what order? Content schema can be localization-ready regardless.

**Q8. Teacher mode in Phase 1?**
Phase 1 vertical slice currently includes only a parent view (PQ-108). Add a thin teacher classroom-creation flow now, or defer?

**Q9. Use of generative AI in lessons themselves (not just tutor)?**
E.g., AI-generated worked examples per student. Stronger personalization, harder QA. Pedagogically defensible only with the misconception-tag pipeline in place.

**Q10. Special-needs differentiation?**
Dyslexia-friendly fonts and color-blind palettes are non-negotiable. Beyond that — separate ADHD or autism-friendly tracks?

---

## C. Compliance & data

**Q11. India data residency under DPDP Act 2023?**
If learners are in India, do we need a Supabase ap-south-1 instance from the start? This affects ADR-001.

**Q12. AI tutor transcript retention for under-13?**
Default = do not retain. Should we offer parental opt-in for retention (improves personalization), or hard-disable?

**Q13. School-procured accounts (under-13) — does the school's consent stand in for parental consent?**
US: yes under COPPA via school-authorized data agreements. EU: depends on member state. India: unclear.

**Q14. Content licensing — what's our public stance?**
Will PhysicsQuest's own curriculum + DAG be CC-BY (encourages community contributions, helps schools trust us), or proprietary?

---

## D. Engineering

**Q15. Offline mode — depth?**
- (a) Service-worker PWA caching last 5 lessons (cheap),
- (b) Full local-first with sync (RxDB / Yjs / ElectricSQL — expensive),
- (c) None until Phase 3.
Recommended default: (a) in Phase 2.

**Q16. Sim authoring — code-only or visual?**
Phase 1: code-only (developers write each sim). Phase 3+: should we build a visual scene editor for non-engineer content authors?

**Q17. Eval pipeline — Phase 0 or Phase 3?**
The Python FastAPI eval service in ADR-001 is currently deferred to Phase 3. If we want rigorous learning-gain reporting from the start, pull it into Phase 0.

**Q18. Open-source posture?**
Will any of: `packages/dag`, `packages/sim`, `packages/fsrs`, the concept inventories — ship as open source? Affects community goodwill and contribution flywheel.

---

## E. Team & process

**Q19. Who writes the lessons?**
- (a) In-house educators on payroll,
- (b) Contracted teachers per chapter,
- (c) Community contributors moderated by us,
- (d) AI-drafted + human-edited.
Likely a mix; priority order matters for hiring.

**Q20. How is content quality measured?**
A rubric scoring (clarity, pedagogy, misconception coverage, joy, scientific accuracy) by a panel of 3 reviewers per lesson. Need to recruit the panel.

**Q21. Cowork plugin shape?**
Should we build a PhysicsQuest cowork plugin that bundles the relevant skills (`xlsx`, `claude-api`, `schedule`, plus a custom `lesson-author` skill) for contributors?

**Q22. Cadence and ceremony?**
Weekly demo, fortnightly sprint, async by default? Confirm so Phase 1 scheduling is realistic.

---

## Priority for first product-owner reply

The Phase-1 schedule cannot start until at least these are decided:

1. **Q1** (buyer) — 1 line.
2. **Q2** (geography) — 1 line.
3. **Q4** (Olympiad track placement) — 1 line.
4. **Q6** (standards alignment strategy) — 1 paragraph.
5. **Q11** (India data residency) — yes / no / not-applicable.
6. **Q14** (curriculum license) — CC-BY or proprietary.
7. **Q15** (offline depth) — (a) / (b) / (c).
8. **Q19** (lesson authors) — top 2 choices.

Everything else can be deferred to Phase-1 mid-checkpoint.
