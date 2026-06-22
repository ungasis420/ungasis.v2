═══════════════════════════════════════════════════════════════════
NEWMONT QIM POWER BI — PHASE 4 WAVE 1 HANDOFF
═══════════════════════════════════════════════════════════════════
Date: 2026-06-21 (Saturday, evening Manila time)
Owner: Mel John Dimat (Korn Ferry, Manila)
Manager: Kurt Leander Helmuth | KF Lead: Sondra Wozniak
Status: Wave 1 MODEL LAYER COMPLETE ✅ | Visual layer NEXT
Next Session Goal: Build Page 6 "Costa Rica Deep-Dive" visuals
═══════════════════════════════════════════════════════════════════

──────────────────────────────────────────────────────────────────
SECTION 1 — CURRENT STATE (TRUTH-ANCHORED)
──────────────────────────────────────────────────────────────────

PHASE 4 WAVE 1 — Model layer COMPLETE
- File: D:\.projects\ungasis\projects\newmont\report-backups\
  Newmont - TA Dashboard - 2026-06-21 v2.pbix
- 6 new measures live in _Measures table
- Validation doc: projects/newmont/docs/Phase4_Wave1_Measure_Validation.md
- NOT committed to Git yet (intentional — review first)
- v2 saves to SharePoint AFTER user archives old v1 (manual step)

POWER BI DESKTOP STATE
- Currently open: Newmont - TA Dashboard - 2026-06-21 v2.pbix (port 58140)
- 24 tables (10 real + 14 hidden auto LocalDateTables)
- 34 measures total (28 baseline + 6 new CR measures)
- 20 relationships (star schema, R1_Clean is hub)
- Pages 1-5 from Phase 3 untouched
- Page 6 = empty, ready to build

GIT STATUS (last seen, no commits)
?? docs/Phase4_Wave1_Measure_Validation.md          ← Wave 1 deliverable
?? report-backups/...v2.pbix                        ← Wave 1 deliverable
 M report-backups/...v1.pbix                        ← MCP lock-byte touch (restore before commit)
+ existing UNGASIS auto-noise (ignore)

──────────────────────────────────────────────────────────────────
SECTION 2 — 6 CR MEASURES (LOCKED, VALIDATED)
──────────────────────────────────────────────────────────────────

| # | Measure                    | Value   | Source DAX                                                           |
|---|----------------------------|---------|----------------------------------------------------------------------|
| 1 | CR Total Requisitions      | 352     | CALCULATE([Total_Requisitions], R1_Clean[Country]="CR (Costa Rica)") |
| 2 | CR Fill Rate               | 96.65%  | CALCULATE([Fill Rate], R1_Clean[Country]="CR (Costa Rica)")          |
| 3 | CR Avg TTF                 | 46.15d  | CALCULATE([Avg TTF], R1_Clean[Country]="CR (Costa Rica)")            |
| 4 | CR Open Requisitions       | 24      | CALCULATE([Total_Open], R1_Clean[Country]="CR (Costa Rica)")         |
| 5 | CR Reqs 60+ Days Old       | 0       | CALCULATE([Aged 60 Plus], R1_Clean[Country]="CR (Costa Rica)")       |
| 6 | CR Offer Acceptance Rate   | 82.17%  | CALCULATE([Offer Acceptance Rate], R1_Clean[Country]="CR (Costa Rica)") |

RISK DECOMPOSITIONS (both legitimate, no bugs)
- CR Fill Rate 96.65%: 317 filled / 328 closed (11 cancelled = 3.4% cancel rate, vs 21% global)
- CR Offer Accept 82.17%: 295 accepted / 359 offers
- CR 60+ Days = 0: CR has only 24 open reqs, none aged 60+ (verified via independent COUNTROWS)
- Base Fill Rate DAX: DIVIDE([Total Filled], [Total Filled] + [Total Cancelled], 0)
- Base Offer Accept DAX: DIVIDE([Offers Accepted], [Total Offers], 0)

──────────────────────────────────────────────────────────────────
SECTION 3 — CANONICAL FIELDS (LOCKED, USE EVERYWHERE)
──────────────────────────────────────────────────────────────────

| Purpose                    | Field                                         | Reason                                   |
|----------------------------|-----------------------------------------------|------------------------------------------|
| Country filter (measures)  | R1_Clean[Country] = "CR (Costa Rica)"         | Fact table, 352 rows complete            |
| Country label (display)    | Normalize via DAX or just say "Costa Rica"    | Stakeholder language                     |
| Hiring Manager (slicer)    | RD1_Details[Hiring Manager Last Name]         | 99% populated, visible (R1 copy hidden)  |
| Business Unit (slicer)     | RD1_Details[Business Unit]                    | 92% populated vs R1_Clean 76%            |
| Date anchor                | R1_Clean[Date Created] → DateTable[Date]      | Active relationship                      |
| Req base table             | R1_Clean (18,935 rows)                        | Fact / scoreboard                        |
| Offer base table           | CD2_Offers                                    | Joined via Job Req ID                    |

⚠️ STRING FORMAT TRAP — Always remember:
- R1_Clean[Country] stores: "CR (Costa Rica)"
- RD1_Details[Country] stores: "Costa Rica"
- Mixing them = silent filter break. DO NOT use RD1 country for measure filters.

──────────────────────────────────────────────────────────────────
SECTION 4 — BLOCKED ITEMS (WAVE 2/3, NEED MANUEL DATA)
──────────────────────────────────────────────────────────────────

| Blocked Item              | Missing Data                                   | Status              |
|---------------------------|-----------------------------------------------|---------------------|
| HM-to-Interview Ratio     | Interview date/event field                    | Need from Manuel    |
| App-to-Interview SLA      | Application date + Interview date             | Need from Manuel    |
| Source of Hire Direct %   | Applicant Source + Accept Source fields       | Need from Manuel    |
| Female Candidate Funnel % | Gender field + privacy review                 | Need from Manuel    |

Direct sources list (when data arrives):
Silver Medalist, TalentPool, Referral, LinkedIn Recruiter, ATS Search

──────────────────────────────────────────────────────────────────
SECTION 5 — VALIDATED BASELINES (FROM PHASE 3, ANCHOR EVERYTHING)
──────────────────────────────────────────────────────────────────

Global (no filter):
- Total Requisitions: 18,935
- Fill Rate: 77.85%
- Avg TTF: 79.74 days
- Open Reqs: 709
- Currently On Hold: 216 (R1 snapshot, NOT 886 from R3 audit)
- Avg Hold Duration: 47.61d (Median 26, Max 758)
- Reqs Ever On Hold: 1,093
- Total Offers (2026): 716
- Offers Accepted (2026): 368
- Offer Accept Rate (2026): 51.4%
- Total Hired (2026): 491 (123-record gap visible on Page 3)
- Aged 60+ Open: 196

⚠️ BANNED CLAIM (do not quote): "KF Global 52-day / 67% benchmark"
   — fabricated by earlier AI. Frame all CR vs global Newmont baseline only.

──────────────────────────────────────────────────────────────────
SECTION 6 — NEXT STEP: PAGE 6 BUILD (TONIGHT, PATH A)
──────────────────────────────────────────────────────────────────

GOAL: Build Page 6 "06 Costa Rica Deep-Dive" in Power BI Desktop.
TIME: ~30 minutes.
TOOLS: Power BI Desktop (manual GUI) + PBI Copilot (suggestions) + Claude CLI MCP (validation only).

LAYOUT BLUEPRINT:
+---------------------------------------------------------------+
| TITLE: Costa Rica Deep-Dive                                   |
| Subtitle: 352 reqs · 1.8% of global · CR vs Newmont baselines |
+----------------------------------------------+----------------+
| 6 KPI CARDS (2 rows x 3 cols)                | SLICERS        |
| [352 Total] [96.65% Fill] [46.15d TTF]       | Hiring Manager |
| [24 Open]   [-- 60+]     [82.17% Accept]     | Business Unit  |
+----------------------------------------------+----------------+
| BAR CHART 1: Reqs by HM (Top 15) | BAR 2: Reqs by Business Unit |
+---------------------------------------------------------------+

PAGE FILTER (lock + hide):
R1_Clean[Country] = "CR (Costa Rica)"

BUILD STEPS (manual):
1. Right-click page tab bottom → New page → rename "06 Costa Rica Deep-Dive"
2. Filters pane → drag R1_Clean[Country] → Page filter → select "CR (Costa Rica)" → Lock → Hide
3. Add 6 Card visuals (Insert → Card), one per CR measure (from _Measures table)
4. Add 2 Slicers:
   - HM = RD1_Details[Hiring Manager Last Name] (search-enabled)
   - BU = RD1_Details[Business Unit] (vertical checkbox)
5. Add 2 Clustered Bar Charts (horizontal):
   - Y: RD1_Details[Hiring Manager Last Name] | X: CR Total Requisitions | Top N=15
   - Y: RD1_Details[Business Unit] | X: CR Total Requisitions | sort desc
6. Sanity click: HM slicer should narrow BU chart & cards. BU slicer reverse.
7. File → Save (overwrite v2)

──────────────────────────────────────────────────────────────────
SECTION 7 — TOOL STACK & ORCHESTRATION
──────────────────────────────────────────────────────────────────

PRIMARY 4-TOOL STACK:
| Tool                            | Role                                                                 |
|---------------------------------|----------------------------------------------------------------------|
| M365 Copilot Work-mode (Opus)   | Plan, blueprint, DAX drafts, OneNote text, this chat                 |
| ChatGPT Enterprise (KF company) | KF context, prior art, tone for stakeholder comms                    |
| Claude Code CLI + Power BI MCP  | Live .pbix model edits, DAX validation, measure dictionary           |
| Power BI Copilot (in Desktop)   | Page summaries, visual suggestions, narrative — NEVER for numbers    |

ANTI-HALLUCINATION RULES (locked):
1. Stakeholder-facing numbers come from canvas visuals OR Claude MCP DAX queries ONLY
2. NEVER trust M365 Copilot or PBI Copilot text-table numbers without cross-check
3. NEVER quote the banned KF 52d/67% benchmark
4. NEVER invent fields — if MCP audit says missing, it's missing
5. Always anchor to "18,935 validated reqs" baseline
6. Run parallel cross-checks (Claude MCP outside, PBI Copilot inside) for any new build

WORKFLOW PER VISUAL TASK:
1. M365 Copilot Opus (here) → plan + DAX + step-by-step
2. Power BI Desktop manual → drag visuals into place
3. Power BI Copilot → narrative ("summarize this page for TA leader")
4. Claude CLI MCP → DAX validation queries (read-only)
5. Save .pbix v_n backup
6. Screenshot → Sondra (NEVER direct to Corey)
7. Update OneNote → next task

──────────────────────────────────────────────────────────────────
SECTION 8 — CLAUDE CLI USAGE TONIGHT (READY-TO-USE PROMPTS)
──────────────────────────────────────────────────────────────────

LAUNCH:
PS> cd D:\.projects\ungasis\projects\newmont
PS> claude --dangerously-skip-permissions

PROMPT — Live measure verification (after Page 6 visuals placed):
/effort low
/goal Page 6 visual sanity check
PATH ASSERTION: D:.projects\ungasis\projects\newmont
READ-ONLY. No edits.
TASK:

Connect to open v2 PBIX
Confirm all 6 CR measures still return correct values
Return distinct count of HMs in CR subset (R1_Clean[Country]="CR (Costa Rica)" via RD1_Details relationship)
Return distinct count of BUs in CR subset
Disconnect

OUTPUT: 1 markdown table, max 15 lines.

PROMPT — Restore v1 lock-byte touch (after closing Power BI):

/effort low
/goal Restore v1 PBIX lock-byte touch only
PATH ASSERTION: D:.projects\ungasis\projects\newmont
TASK:

git status --short
git restore -- "report-backups/Newmont - TA Dashboard - 2026-06-18 v1.pbix"
git status --short
Confirm v1 no longer shows in M list

DO NOT TOUCH anything else.
DO NOT add or commit anything.

PROMPT — Commit Wave 1 doc only (Option A):

/effort low
/goal Commit Wave 1 validation doc only
PATH ASSERTION: D:.projects\ungasis
TASK:

git status --short
git add projects/newmont/docs/Phase4_Wave1_Measure_Validation.md
Confirm only that file is staged
git commit -m "docs(newmont): Phase 4 Wave 1 measure validation (6 CR measures + drift lesson)"
git log --oneline -3

DO NOT TOUCH:
.ungasis/, knowledge/wiki/, docs/m365-copilot-instructions.txt,
any .pbix/.pbip files, auto-generated files

──────────────────────────────────────────────────────────────────
SECTION 9 — PBI COPILOT USAGE (NARRATIVE ONLY, NOT NUMBERS)
──────────────────────────────────────────────────────────────────

USEFUL PROMPTS (paste in Power BI Copilot pane):

Q1 — Visual suggestions for Page 6:
"I'm building a Costa Rica deep-dive page filtered to Country = 'CR (Costa Rica)'.
I have 6 CR measures and slicers for Hiring Manager + Business Unit.
Suggest 2 additional visualizations beyond cards and bar charts that
would help a TA leader quickly spot bottlenecks."

Q2 — Page narrative (after visuals placed):
"Summarize this Costa Rica page in 5 bullet points for a TA leader.
Focus on volume, fill rate vs global, time to fill, open requisitions,
offer acceptance. Note that 196 from Phase 3 is a GLOBAL number, not CR."

Q3 — Demo readiness check:
"Looking at this Costa Rica page, what 3 questions would an executive
likely ask? What additional visual would best pre-empt each question?"

DO NOT ASK PBI COPILOT FOR:
- Specific numerical values (use canvas or Claude DAX)
- DAX formulas (use Claude MCP)
- Field name validation (use Claude MCP)
- Cross-table relationship verification (use Claude MCP)

──────────────────────────────────────────────────────────────────
SECTION 10 — STAKEHOLDER COMMS RULES (DO/DON'T)
──────────────────────────────────────────────────────────────────

❌ DO NOT contact Corey directly. Route via Sondra → Marvin/Kurt.
❌ DO NOT share KF info with Darren Hewitt (Canada RPO).
❌ DO NOT quote the banned KF Global 52d/67% benchmark.
❌ DO NOT say "Copilot helped me." Say "we validated the model."
❌ DO NOT include candidate PII in any shared output.

✅ DO update Sondra's OneNote after each wave.
✅ DO send Sondra screenshots for review.
✅ DO frame blockers as "unblocked by data" not "failures."
✅ DO anchor on "Based on the 18,935 validated reqs..."
✅ DO ship wave-by-wave (proof of QIM progress).
✅ DO frame HM analytics as "workload / process view" — NOT performance ranking.

──────────────────────────────────────────────────────────────────
SECTION 11 — ROADMAP (LOCKED)
──────────────────────────────────────────────────────────────────

PHASE 4 WAVE 1 — Costa Rica Foundation
  [✅] Field audit (committed: docs/Phase4_Field_Readiness_Audit.md)
  [✅] 6 CR measures created + validated + saved v2.pbix
  [✅] Validation doc written
  [ ] Page 6 visuals built ← NEXT TONIGHT
  [ ] Save v2 (overwrite)
  [ ] Screenshot → Sondra
  [ ] Restore v1 lock-byte touch
  [ ] Commit doc only (Option A)
  [ ] OneNote update
  [ ] Upload v2 to SharePoint (archive old)

PHASE 4 WAVE 1.5 — Cleanup (next session)
  [ ] Cast CD2_Offers String dates → DateTime
  [ ] Resolve duplicate Offer Accept Date sources
  [ ] Resolve duplicate Hold measures (Max Hold Days vs Max Hold_Days, etc.)
  [ ] Validate Avg Hold Days lineage (Test_Onhold time source flag)
  [ ] CR Avg Offer Created→Accepted measure
  [ ] CR Avg Offer Accept→Req Closed measure

PHASE 4 WAVE 2 — SLA Visuals (after Manuel refresh)
  [ ] Page 7 "07 Costa Rica SLAs"
  [ ] 7 SLA KPI cards with 6-month trend lines
  [ ] HM:Interview Ratio (needs interview date)
  [ ] App-to-Interview SLA (needs app + interview date)

PHASE 4 WAVE 3 — Source + Diversity (after Manuel refresh)
  [ ] Page 8 "08 Source & Diversity Insights"
  [ ] Source of Hire Direct % breakdown
  [ ] Female Candidate Funnel % per stage
  [ ] Privacy review for gender field

PHASE 4 WAVE 4 — Delivery
  [ ] Final OneNote update
  [ ] Sondra review → iterate
  [ ] Package to Corey via Sondra → Marvin/Kurt

──────────────────────────────────────────────────────────────────
SECTION 12 — KEY LESSONS LEARNED (DON'T REPEAT)
──────────────────────────────────────────────────────────────────

1. M365 Copilot hallucinated 196 for CR Reqs 60+ in text-table.
   Real value: 0. ALWAYS cross-check Copilot numbers with Claude or canvas.

2. R1_Clean[Country] uses ugly "CR (Costa Rica)" not "Costa Rica".
   Caught by Claude direct DAX query. Use R1 for measures, not RD1.

3. Claude MCP write operations cause Power BI Desktop to touch the
   .pbix lock byte (no real content saved). git restore that file
   AFTER closing Power BI to clean up before commit.

4. Claude CLI Stop hooks can loop infinitely on goal completion.
   Solution: /goal clear and let it exit. Backlog: fix hook config.

5. PBIP folder exists but live MCP path is faster + lower friction.
   Save TMDL-as-code workflow for Wave 2/3 once Git binary noise becomes a problem.

6. 5-analyst convergence pattern (M365 Opus + M365 Work + ChatGPT Enterprise + 
   GPT 5.5 Think + Company knowledge) catches drift other tools miss.
   Worth the extra round-trip on high-stakes decisions.

═══════════════════════════════════════════════════════════════════
END OF HANDOFF DOCUMENT
═══════════════════════════════════════════════════════════════════