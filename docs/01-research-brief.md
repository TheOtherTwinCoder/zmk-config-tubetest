# Research Brief — PhysicsQuest

## Purpose
Identify the curricula, cognitive-development theories, physics-education-research (PER) results, and open content libraries that PhysicsQuest will lean on, with explicit justification for each choice.

---

## 1. Curriculum frameworks adopted

| Source | Role in PhysicsQuest | Why |
|---|---|---|
| **NGSS** (Next Generation Science Standards, US, 2013) | Backbone for K–8 "big ideas" and crosscutting concepts (cause/effect, systems, energy, structure/function). | NGSS is the most rigorously peer-reviewed K-12 science framework in English; its three-dimensional model (DCIs + Practices + Crosscutting) maps cleanly onto our Phenomenon → Question → Model → Test → Refine arc. |
| **UK National Curriculum, KS1–KS5** (DfE, 2014, A-level 2017 reform) | Cross-check for K–10 sequence; primary source for grade-11/12 boundaries (AS/A2). | Stronger than NGSS at the secondary level; explicit content lists make gap-checks easy. |
| **CBSE / NCERT physics** (India, classes 6–12) | Primary source for grade 8–12 mathematical rigor and problem sets. | Free PDF textbooks (CC-aligned for educational reuse), strong algebra/calculus integration, large item bank from board exams. |
| **IB MYP Sciences + DP Physics** | Inquiry-based assessment design; "command terms" (state, describe, explain, derive) inform our rubric language. | Internationally portable; assessment vocabulary is precise. |
| **Singapore MOE Lower-Sec + O/A-Level Physics** | Sequencing of waves / electricity / kinematics. | Singapore consistently tops TIMSS; their sequence is empirically tested. |
| **Finnish Core Curriculum (POPS 2014)** | Phenomenon-based learning ethos; integration across subjects. | Aligns with our "Big Question" framing. |
| **Australian Curriculum: Science (ACARA v9)** | Cross-check for early-years sensory-physics framing. | Strong on inquiry skills at F-2 level. |

**Conflicts noted:** NGSS defers explicit "force = mass × acceleration" to grades 6–8; CBSE introduces it in class 8 (~age 13); IB MYP in year 3 (~age 13–14). PhysicsQuest will follow the cognitive-readiness boundary (Level 7, age 11–13) and front-load *vector intuition* in Levels 5–6.

---

## 2. Cognitive-development & learning-science foundations

| Theory / finding | Source | How it shapes PhysicsQuest |
|---|---|---|
| Stages of cognitive development | Piaget (1936) — *Origins of Intelligence in Children*; updated by Carey, Spelke | Levels 1–3 stay concrete/sensory; symbolic algebra deferred to Level 7. |
| Zone of Proximal Development | Vygotsky (1978) — *Mind in Society* | Adaptive difficulty: every task sits just above current mastery; AI tutor scaffolds, does not solve. |
| Cognitive Load Theory | Sweller, van Merriënboer, Paas (1998, 2019 review) | Lesson UI strips extraneous load; worked examples precede problem solving (worked-example effect). |
| Dual-coding theory | Paivio (1971); Mayer's multimedia principles (2009) | Every concept paired: visual + verbal, never one alone; no decorative imagery. |
| Rosenshine's Principles of Instruction | Rosenshine (2012) — *American Educator* | Daily review, small steps, frequent low-stakes checks, modeling, scaffolds for difficult tasks — all baked into the lesson player. |
| Retrieval practice | Roediger & Karpicke (2006); Karpicke & Blunt (2011) | Every lesson ends with a low-stakes recall quiz before any new content. |
| Spaced repetition | Ebbinghaus (1885); Cepeda et al. (2008) meta-analysis | FSRS scheduler (modern, open-source) used for concept cards. |
| Productive failure | Kapur (2008, 2016) | Learners attempt before instruction in 60–70% of lessons; canonical solution follows. |
| Interleaving | Rohrer & Taylor (2007) | Mixed practice across chapters within a level; not blocked by topic. |
| Bloom's revised taxonomy | Anderson & Krathwohl (2001) | Each level's assessment must hit Remember → Understand → Apply → Analyze → Evaluate → Create progression. |
| Growth-mindset framing | Dweck (2006), with Yeager replication caveats (2019) | Feedback praises *process*, not ability; mistakes are explicitly framed as data. |

---

## 3. Physics-education research (PER) we will operationalize

| Result | Source | Application |
|---|---|---|
| **Force Concept Inventory (FCI)** | Hestenes, Wells, Swackhamer (1992); Hake (1998) — interactive engagement → 0.48 normalized gain vs 0.23 traditional | Used as the gold-standard pre/post for Levels 7–9. Variant items adapted for younger levels. |
| **Investigative Science Learning Environment (ISLE)** | Etkina & Van Heuvelen (2007) | Every lesson follows ISLE's "observe → find pattern → propose explanation → test → apply" loop. |
| **Peer instruction + ConcepTests** | Mazur (1997) — *Peer Instruction* | "Predict before you simulate" prompts before every interactive; classroom mode supports clicker-style voting. |
| **Common misconceptions catalog** | Driver, Squires, Rushworth, Wood-Robinson (1994) — *Making Sense of Secondary Science*; AAAS Project 2061 misconception probes | Built into the tutor: misconceptions are tracked as named entities, not just "wrong answer". |
| **Modeling Instruction** | Hestenes, Wells, Jackson (Arizona State, 1990s–present) | Treats physics as model-building; PhysicsQuest's "build a model" projects are direct ports. |
| **Tutorials in Introductory Physics** | McDermott & Shaffer (Washington, 2002) | Inspiration for Level 8–10 conceptual-question sequences. |
| **Representation translation skill is itself learned** | Kohl & Finkelstein (2006) | Multi-representation drills (graph ↔ equation ↔ diagram ↔ words) appear from Level 5 upward. |
| **Productive struggle improves transfer** | Kapur & Bielaczyc (2012) | Boss-challenges deliberately require novel combination, not template-matching. |
| **Simulation use only helps when paired with guided inquiry** | Adams, Reid, LeMaster, McKagan, Perkins, Wieman (PhET studies, 2008) | No "free play" without a structured Big Question; sandboxes always have a goal card. |

---

## 4. Open content libraries we will ingest

| Library | License | Use |
|---|---|---|
| **PhET Interactive Simulations** (Colorado) | CC-BY (sims), CC-BY-NC for some teacher materials | Primary L1–L9 simulation source; supplement with our own where pedagogy demands. |
| **OpenStax College Physics** + **High School Physics** | CC-BY 4.0 | Source text for L8–L10; we paraphrase and rewrite for age-appropriate voice, retain attribution. |
| **CK-12 FlexBooks** | CC-BY-NC | Cross-reference and item-bank source. |
| **NCERT physics textbooks (classes 6–12)** | NCERT permits educational reuse with attribution | Problem sets and Indian-curriculum alignment. |
| **MIT OpenCourseWare 8.01 / 8.02** (Lewin, Walter Lewin lectures with caveats; current OCW versions) | CC-BY-NC-SA | Reference depth for Level 10 instructors; not shown directly to learners. |
| **Feynman Lectures on Physics** (Caltech, free online edition) | Copyright Caltech, free reading only — *not* redistributable | Inspiration for narrative voice; quoted only under fair use. |
| **Khan Academy** | Proprietary | Used for scope-and-sequence benchmarking, not content ingestion. |
| **Physics Classroom (Tom Henderson)** | Proprietary | Reference for misconception lists. |
| **AAPT ComPADRE** | Mixed | Vetted simulation and lab repository. |

**License engineering:** every ingested asset carries `license`, `source_url`, `attribution_text`, and `redistributable: bool` fields in the content database.

---

## 5. Gamification & engagement framework

| Source | Use |
|---|---|
| Self-Determination Theory — Deci & Ryan (1985, 2000) | Three needs: **autonomy** (learner picks investigation path), **competence** (visible mastery map), **relatedness** (mentor/mentee mode in Phase 5). |
| Flow — Csikszentmihalyi (1990) | Difficulty auto-tuned to keep success rate in the 70–85% band. |
| Octalysis — Yu-kai Chou (2015) | Audit each feature against the 8 core drives; we prioritize *Epic Meaning*, *Development & Accomplishment*, *Empowerment of Creativity*, and *Curiosity*. Avoid loss-aversion / scarcity dark patterns. |
| Duolingo retention research (public engineering blog, 2019–) | Streaks yes; *streak loss anxiety* no — soft-revival mechanics for under-13 users. |
| DragonBox (Algebra) evaluation — Dolonen & Kluge (2014) | Validates that game-first math can hit standards-based outcomes; informs our L1–L5 design. |
| Kerbal Space Program EDU + research on game-based physics learning (Miller et al.) | Validates open-ended sandbox engagement for older learners. |

---

## 6. Synthesis — design commitments

1. **Phenomenon-first, equation-late.** Every concept is introduced through a real or simulated phenomenon; symbolic representation appears only after the learner can describe the phenomenon in their own words and predict variations.
2. **Mastery as a graph, not a line.** Progress is measured against the concept-dependency DAG (see `03-concept-dag.json`), not a linear lesson counter.
3. **Adaptive routing.** Every assessment item is tagged with the concept nodes it tests; failure routes the learner to the weakest upstream node.
4. **Three age-tiered UIs.** L1–3 "Wonderland" (mascot-led, voice-first, no reading required), L4–7 "Lab" (illustrated, light text, sandbox-prominent), L8–10 "Studio" (clean, dense, calculator/notebook integrated).
5. **Open by default.** Curriculum, DAG, and assessment item-bank schemas published under CC-BY so educators can fork.
6. **Evidence loop in production.** Pre/post FCI-style measurement is a first-class product feature, not a research afterthought — every level ships with its own validated instrument.

---

## 7. Risks & unknowns flagged early

- **FCI for young children does not exist.** We will need to design and validate our own concept inventories for L1–L6 (consult AAAS Project 2061 probes for K-12 misconceptions as starting point).
- **COPPA & GDPR-K constrain AI tutor logging for under-13.** Need legal review before storing tutor transcripts.
- **Translation cost.** True global reach requires localization beyond English (Spanish, Hindi, Mandarin, Arabic) — defer to Phase 4 but design content schema for it from day one.
- **Hardware floor.** R3F + Rapier in a browser comfortably runs on a 2019 Chromebook; we must lock the simulation budget early and stress-test.
- **Teacher buy-in.** Schools adopt only if the product reduces, not adds, teacher load. Teacher dashboard is not optional; it must be present from Phase 2.

---

## 8. Citations (key papers)

- Hestenes, D., Wells, M., & Swackhamer, G. (1992). Force Concept Inventory. *The Physics Teacher*, 30(3), 141–158.
- Hake, R. R. (1998). Interactive-engagement vs. traditional methods. *American Journal of Physics*, 66(1), 64–74.
- Mazur, E. (1997). *Peer Instruction: A User's Manual*. Prentice Hall.
- Etkina, E., & Van Heuvelen, A. (2007). Investigative Science Learning Environment. In *Research-Based Reform of University Physics*, AAPT.
- Rosenshine, B. (2012). Principles of Instruction. *American Educator*, 36(1), 12–19.
- Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning. *Psychological Science*, 17(3), 249–255.
- Sweller, J., van Merriënboer, J., & Paas, F. (1998, updated 2019). Cognitive architecture and instructional design. *Educational Psychology Review*.
- Kapur, M. (2008). Productive failure. *Cognition and Instruction*, 26(3), 379–424.
- Adams, W. K., et al. (2008). A study of educational simulations Part I & II. *Journal of Interactive Learning Research*.
- Driver, R., Squires, A., Rushworth, P., & Wood-Robinson, V. (1994). *Making Sense of Secondary Science*. Routledge.
- NGSS Lead States (2013). *Next Generation Science Standards*. National Academies Press.
- Mayer, R. E. (2009). *Multimedia Learning* (2nd ed.). Cambridge University Press.

*(Full bibliography maintained in `docs/refs.bib` once Phase 0 starts.)*
