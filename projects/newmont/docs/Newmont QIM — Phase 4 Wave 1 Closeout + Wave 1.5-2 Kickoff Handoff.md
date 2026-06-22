# Newmont QIM — Phase 4 Wave 1 Closeout + Wave 1.5/2 Kickoff Handoff
**Date:** 2026-06-22 (Manila)
**Author:** Mel John Dimat (Reporting Consultant, Korn Ferry)
**Status:** Wave 1 SHIPPED. Wave 1.5 + Wave 2 planning required.
**Last commit:** `90ca6a8` on origin/main (ungasis420/ungasis.v2)

---

## 1. CURRENT STATE — what is live, verified, and shipped

### 1.1 Files
| File | Location | Status |
|---|---|---|
| `Newmont - TA Dashboard - 2026-06-18 v1.pbix` | local + Git (clean) | ✅ Lock-byte restored |
| `Newmont - TA Dashboard - 2026-06-21 v2.pbix` | local only (Option A — NOT in Git) | ✅ Saved, pending SharePoint upload |
| `Talent Acquisition Dashboard_ work file.pbix` | local (Newmont source PBIX, 155 tables) | 🔍 Audited read-only, untouched |
| `docs/handoffs/Newmont_Phase4_Wave1_Handoff_2026-06-21.md` | Git, pushed | ✅ Reference handoff |
| `projects/newmont/docs/Phase4_Wave1_Measure_Validation.md` | Git, pushed | ✅ Validation evidence |

### 1.2 Validated CR baselines (triple-checked: MCP + canvas + analyst convergence)
| Measure | Value |
|---|---|
| CR Total Requisitions | 352 |
| CR Fill Rate | 96.65% |
| CR Avg TTF | 46.15 days |
| CR Open Requisitions | 24 |
| CR Reqs 60+ Days Old | 0 (rendered via Card (new) visual) |
| CR Offer Acceptance Rate | 82.17% |

### 1.3 Page 6 "Costa Rica Deep-Dive" — visual inventory
- Page filter: `R1_Clean[Country] = "CR (Costa Rica)"` (locked + hidden)
- 6 KPI cards in 2x3 grid (above measures)
- 2 slicers: `RD1_Details[Hiring Manager Last Name]` (search-enabled dropdown) + `RD1_Details[Business Unit]` (vertical checkbox)
- 2 clustered bar charts: Reqs by HM (Top 15, desc) + Reqs by BU (desc)
- All 3 cross-filter sanity tests passed (HM->cards/BU, BU->cards/HM, combined)
- `_TEST_DELETE_LATER` tab removed
- `CR Reqs 60+ Days Old` displays clean `0` via Card (new) visual

### 1.4 Git state
- Branch: `main`
- HEAD: `90ca6a8 docs(newmont): Phase 4 Wave 1 — CR measures validated + handoff`
- Pushed to `origin/main` ✅
- `v2.pbix` correctly outside Git (Option A — too large + binary)
- Stash dropped clean (no orphan state)
- 3 unstaged UNGASIS noise files remain (trigger-log.jsonl, m365-copilot-instructions.txt, knowledge/wiki/log.md) — expected auto-trigger output, NOT in scope

---

## 2. PROGRESS COMPLETION — Phase 4 scorecard

### Sondra's Phase 4 ask (12 items) vs delivery
| # | Sondra Ask | Status | Where |
|---|---|---|---|
| 1 | Costa Rica-only filtering | ✅ DELIVERED | Page 6 locked filter |
| 2 | Compare HMs within CR | ✅ DELIVERED | HM slicer + bar chart |
| 3 | Compare BUs within CR | ✅ DELIVERED | BU slicer + bar chart |
| 4 | Reqs 60+ Days Old | ✅ DELIVERED | KPI card |
| 5 | Offer Acceptance Rate | ✅ DELIVERED | KPI card |
| 6 | App → Interview SLA | 🔓 UNBLOCK CANDIDATE | Source PBIX has Application Date + interview-stage fields |
| 7 | Time to Offer | 🔓 UNBLOCK CANDIDATE | Source has pre-built measure + DateTime fields |
| 8 | Time to Accept | 🔓 UNBLOCK CANDIDATE | Source has typed DateTime fields |
| 9 | HM:Interview Ratio | 🔓 UNBLOCK CANDIDATE | Source has `WasInHMReviewBeforeInterview` flag |
| 10 | Offer Accept → Req Close | 🟡 PARTIAL | v2 has `OnHold_Validated[Offer Accept Date]` DateTime + `Closed Date` |
| 11 | Source of Hire (direct flags) | 🔓 UNBLOCK CANDIDATE | Source has `Data-Applicants_status[Source]` + `[Source Details]` |
| 12 | Female candidate funnel % | 🔓 UNBLOCK CANDIDATE | Source has `Data-Diversity[Gender Consolidated]` + pre-built `[% Females Hires]` |

**Score:** 5 of 12 SHIPPED (42%). 6 reframed from "blocked" → "unblock candidates" pending Wave 2 import scope. 1 partial.

---

## 3. KEY FINDING — Wave 2/3 SCOPE PIVOT (most important)

### The Discovery (cross-verified 2026-06-22)
The 7 previously "blocked on Manuel data refresh" items are NOT missing data. They exist upstream in the Newmont internal source PBIX (`Talent Acquisition Dashboard_ work file.pbix`, 155 tables). They were simply never carried into v2's narrow 24-table extract.

### Field availability confirmed (PBI Copilot + Claude MCP convergence)
| v2 Blocker | Source PBIX Location | Type |
|---|---|---|
| Source of Hire | `Data-Applicants_status[Source]` + `[Source Details]` | String |
| Female Funnel | `Data-Diversity[Gender Consolidated]`, `Data-Diversity[Gender]`, `EEOC Diversity_current[Gender]` (multi-variant) | String |
| Application Date | `Data-Diversity[Application Date]`, `Data-Applicants_status[Application Date]` | DateTime |
| Interview stage | `Data-Applicants_status[Application Status]` + `[Funnel Category]` (calc) + `[WasInHMReviewBeforeInterview]` (calc) | String |
| Time to Offer (pre-built) | `1-Measures[Time to Offer]` | Double |
| Female hires % (pre-built) | `1-Measures[% Females Hires]`, `[Female Hires]`, `[%Female Hires YTD]` | Double |
| ~150+ other pre-built measures (TTH, TTA, TTI, TTO, internal/external splits, source mix, etc.) | `1-Measures` table | Various |

### Reframed Wave 2 narrative
- BEFORE: "Wave 2 blocked on Manuel data refresh ETA"
- AFTER: "Wave 2 = controlled import + relationship wiring + privacy review of fields that already exist upstream"

### Critical caveats (be honest with Sondra)
1. **155 tables ≠ governance-approved scope.** Many likely legacy/draft/Newcrest holdovers. Need Marvin/Kurt/Sondra alignment on which tables are canonical.
2. **Multiple gender variants** (`Gender`, `Gender Consolidated`, `Gender_US`, `What is your gender?_1/_2/_3/_4`) need reconciling to one canonical field.
3. **No literal `Interview Date` timestamp** found. Interview tracking is stage-based via `Application Status` strings — proxy only.
4. **Country format mismatch risk** between v2's `R1_Clean[Country] = "CR (Costa Rica)"` and source `Data-Filled Positions[Country]` (likely different format).
5. **Privacy/EEOC compliance review** required before importing Gender/Ethnicity fields.
6. **EEOC table is US-only** — do NOT use as global Female %.
7. **Join scope unverified.** New relationships to `Job Req ID`, `Candidate ID`, `Application ID` need testing.

---

## 4. ROADMAP — what's next

### Wave 1.5 (small cleanup, ~1-2 hours, optional)
- Resolve duplicate `Offer Accept Date` (CD2_Offers String vs OnHold_Validated DateTime) — pick canonical
- Resolve duplicate measure (`CR Reqs 60+ Days_Old` with underscore vs `CR Reqs 60+ Days Old` with space) — delete orphan
- Build CR Time to Offer / Accept / Accept-to-Close measures using v2 fields only (no source import needed)
- Add Wave 1.5 metrics to Page 6 or new Page 7 SLA mini-section

### Wave 2 (major scope decision required first — DO NOT BUILD ALONE)
- **Decision required:** Import source tables into v2 (architectural fork) OR pivot QIM to read source-direct OR build measure wrappers from source DAX patterns
- **Route:** Sondra Wozniak (KF lead) + Marvin/Kurt (governance) + Manuel (data owner)
- **Privacy gate:** EEOC + gender field handling before any import
- **Build scope (after decision):** App→Interview SLA, Time to Offer, Time to Accept, HM:Interview Ratio, Offer Accept→Close, Source of Hire, Female funnel

### Wave 3 (Pages 7 + 8 visuals)
- Page 7: SLA detail (7 SLA visuals)
- Page 8: Source of Hire + Diversity funnel
- Requires Wave 2 complete

---

## 5. ANALYSIS — anti-drift lessons captured

| # | Lesson | Trigger | Mitigation |
|---|---|---|---|
| 1 | PBI Copilot Desktop visual-build is ASYNC | Empty canvas at T+0 looked like failure | Verify canvas at T+5min minimum before judging Copilot |
| 2 | Filename verification in git ops | M365 Copilot mis-referenced v1 as 06-21 instead of 06-18 | Always have Claude verify filenames before scripting |
| 3 | Don't hash-lock goals — message-lock them | Goal locked to literal commit `012d952`, rebase made it `90ca6a8` | Verify commit MESSAGE on origin/main, not hash |
| 4 | 5-analyst convergence ≠ truth when source hallucinates | Multiple analysts trusted PBI Copilot's fake "I built 10 visuals" claim | Always anchor to YOUR screenshot, not Copilot's narration |
| 5 | Schema presence ≠ data quality | Source PBIX has fields, but populated/joinable/governance-approved is separate | Probe + validate before committing to Wave 2 import |

---

## 6. TOOL ORCHESTRATION — what worked, what to repeat

### Tonight's working split
| Tool | Best Use | Trust Level |
|---|---|---|
| M365 Copilot Opus (Claude) | Blueprint, reconciliation, anti-drift, handoff docs | ✅ High for planning |
| Claude Code CLI + Power BI MCP | DAX validation, schema audit, git ops | ✅ High for read/git |
| PBI Copilot Desktop | Visual placement (60-70% success), narrative text | ⚠️ Medium for build, NEVER for numbers |
| Manual GUI | Unavoidable fixes (Card (new) swap, layout cleanup) | ✅ Required |
| 5 parallel AI analysts (web + work mode) | Cross-check for hallucination | ✅ High when canvas is anchor |

### Cross-check pattern (proven)
1. M365 Copilot Opus = planner
2. Claude CLI + MCP = ground truth via DAX/schema
3. PBI Copilot = narrator (verify against #2)
4. Canvas screenshot = visual ground truth
5. M365 Copilot = reconciler between all 3

---

## 7. AI PROMPTS LIBRARY — copy-paste ready

### 7.1 Claude Code CLI — Probe v2.pbix field inventory (read-only)

Probe v2.pbix tables for Phase 4 field availability.
Working dir: D:.projects\ungasis\projects\newmont\report-backups
PBIX: Newmont - TA Dashboard - 2026-06-21 v2 (find current port via list_instances)
Tasks:

List all PBI Desktop instances. Identify v2 port.
Connect (read-only) and list tables: R1_Clean, RD1_Details, CD2_Offers, R3_OnHold, OnHold_Validated, _Measures, DateTable, Measure Dictionary.
For each table, list all columns + data types + 3 non-blank sample values.
Flag columns matching: date, created, posted, closed, accept, offer, approved, filled, interview, application, applied, source, gender, diversity, female, candidate.
Return markdown table: Table | Column | Type | Sample | Phase 4 metric it could feed.
Disconnect cleanly. No model changes. No commits.


### 7.2 Claude Code CLI — Probe source PBIX field inventory (read-only)

Probe Newmont internal source PBIX for Phase 4 field availability.
Working dir: D:.projects\ungasis\projects\newmont\report-backups
PBIX: Talent Acquisition Dashboard_ work file (find current port via list_instances)
Tasks:

List all PBI Desktop instances. Identify source PBIX port.
Connect (read-only). The model has ~155 tables.
Pull schemas for tables matching: Diversity, EEOC, Applicants, Filled Positions, CRM, Source, Gender, Measures, Filter, Date, Region, Country.
For each table, list columns + types + 3 sample values.
Build a "v2 vs Source" diff:
| Table | Column | Type | Present in v2? | Phase 4 metric |
Flag pre-built measures in 1-Measures that could be ported to v2.
Honest caveats: which tables look canonical vs legacy, any obvious country format issues.
Disconnect cleanly. No model changes. No commits.


### 7.3 Claude Code CLI — DAX measure validation pattern

Validate [list of measures] against expected baselines via powerbi-modeling MCP.
PBIX: [filename] (port [X])
Model: [_Measures or 1-Measures]
Task: Run EVALUATE ROW for each measure, return markdown table with Actual | Expected | Status.
Expected baselines:

[Measure 1] = [value]
[Measure 2] = [value]
...

Rules:

Do not modify the model
Do not commit anything to git
Read-only DAX only
Flag any mismatch with ⚠️ and stop


### 7.4 Claude Code CLI — Git ops template (Newmont docs only, Option A)

Stage and commit Newmont docs only (Option A — no PBIX).
Working dir: D:.projects\ungasis
Tasks:

Stage ONLY these specified files: [list]
Verify staging: git status --short
ONLY the specified files should show "A". v2.pbix MUST remain "??". UNGASIS noise files MUST remain "M" unstaged.
Commit: git commit -m "[message]"
Confirm: git log -1 --oneline
Do NOT push yet. Stop and report.

Rules:

Do NOT stage v2.pbix or any .pbix file
Do NOT stage UNGASIS auto-trigger noise files
Do NOT push
If any file outside the specified list gets staged, abort and report
Verify filenames before scripting (handoff rule #2 — v1 is dated 2026-06-18, NOT 06-21)


### 7.5 Claude Code CLI — Push with divergence handling

Push to origin/main with divergence handling.
Working dir: D:.projects\ungasis
Tasks:

git branch --show-current (confirm main)
git fetch origin main
git log origin/main..HEAD --oneline (commits to push)
If remote has new commits, investigate: git log [base]..origin/main --stat

If remote touches Newmont files → STOP
If remote is only UNGASIS noise → proceed


If working tree has unstaged noise files blocking rebase: git stash push -m "ungasis-noise-tmp"
git pull --rebase origin main
git status (verify clean)
git push origin main
git stash pop (if stashed). If pop conflicts, stash is preserved.
git log -1 --oneline (confirm commit message — NOT hash)

Rules:

Verify commit MESSAGE on origin/main, not literal hash (rebase rewrites hashes)
If any rebase conflict → STOP
No force push
No history rewrite


### 7.6 PBI Copilot Desktop — Page audit (inventory only, narrator)

Audit the data model for this file. Do NOT generate visuals or calculate numbers. Return a structured inventory only.
For each table in the model, list:

Table name
All column names
Data type for each column
Whether the column appears sparse (if model exposes nullability)
Any relationships to other tables

Focus especially on fields related to:

Dates (application, interview, offer, accept, posted, closed)
Source of hire / candidate origin
Gender / diversity / demographic
Interview events / stages
Hiring manager / business unit / country

Format output as a markdown table:
| Table | Column | Type | Sparse? | Phase 4 metric |
Do NOT suggest measures. Do NOT write DAX. Do NOT modify the model.
Inventory only.

### 7.7 PBI Copilot Desktop — Narrative draft (page summary only)

Generate a 3-sentence narrative summary for the current page based on the visuals already on canvas.
Rules:

Do NOT generate numbers in chat text — only reference what the canvas cards show
Do NOT make claims about trends not visible in current visuals
Do NOT use the banned KSA RPO benchmark (52-day / 67%)
Write in consultant tone, no AI-style phrasing
Stay anchored to: 352 reqs, 96.65% Fill, 46.15d TTF, 24 open, 0 aged 60+, 82.17% offer accept

Output: 3 sentences, factual, plain English.

### 7.8 M365 Copilot Opus — Wave 2 scope reconciliation prompt

You are the Newmont QIM blueprint architect. I need to reconcile Wave 2 scope.
Inputs to consider:

Sondra's Phase 4 ask (12 items, 5 shipped in Wave 1)
Source PBIX audit findings (fields exist upstream, not in v2)
v2.pbix Wave 1 architecture (24 tables, _Measures pattern)
Privacy + governance constraints (EEOC, gender variants, US-only tables)
KF routing: Sondra → Marvin/Kurt → never direct to Corey, never share with Darren

Task:

List 3 Wave 2 path options (import to v2 / pivot to source-direct / measure wrappers)
For each: effort, risk, governance dependencies
Recommend one
Draft 5 grilling questions for Sondra alignment call
Honest caveats (3-5 items)

Anti-drift rules:

Never invent measure values
Never claim governance approval
Always cite the source table for any field reference


---

## 8. CONSTRAINTS + GOVERNANCE (do not violate)

- **Tracking:** Summary Reporting (NOT Full Suite)
- **Routing:** Sondra Wozniak (KF lead) ↔ Marvin/Kurt (Korn Ferry governance). NEVER direct to Corey (Newmont TA Lead) without Sondra. NEVER share KF info with Darren Hewitt (Canada RPO).
- **Privacy:** Gender / Ethnicity fields require EEOC review before any import
- **File scope:** v2.pbix stays out of Git (Option A). Source PBIX is read-only audit only — NEVER modify.
- **Country format trap:** `R1_Clean[Country] = "CR (Costa Rica)"` exact string. NOT "Costa Rica". RD1 uses different format.
- **Banned benchmarks:** Do NOT cite "52-day / 67%" anywhere — that's KSA RPO 2023, wrong client/year.
- **Working dir:** Build from `D:\.projects\ungasis\projects\newmont` ONLY. Do NOT use `D:\nmwork` junction.

---

## 9. PENDING ACTIONS (carry into next session)

1. Upload v2.pbix to KF SharePoint > Newmont QIM (archive v1)
2. Paste OneNote note to Sondra (template in Section 10)
3. Schedule 15-min alignment sync with Sondra re: Wave 2 path decision
4. Update CONTEXT.md in UNGASIS with 5 anti-drift lessons (Section 5)
5. Wave 1.5 (optional): duplicate measure cleanup, CD2 vs OnHold_Validated reconciliation

---

## 10. SONDRA ONENOTE NOTE (executive-ready, paste-ready)


Newmont QIM — Phase 4 Wave 1 Update (2026-06-22)
Hi Sondra,
Quick status on Phase 4. Wave 1 shipped this weekend.
═══════════════════════════════════════════════
✅ DELIVERED (Wave 1)
═══════════════════════════════════════════════
Costa Rica deep-dive page is live in v2.pbix with:
• CR filter locked at country level (R1_Clean[Country])
• HM and BU slicers for in-country comparison
• 5 of the 12 Phase 4 metrics built and validated:
– Total Reqs:           352
– Fill Rate:             96.65%
– Avg TTF:              46.15 days
– Open Reqs:           24
– Reqs 60+ Days Old:   0
– Offer Acceptance:    82.17%
• Workload views: Reqs by HM (Top 15) + Reqs by BU
Why this matters: Proves QIM architecture works for
country-level drill-down. CR ops look healthy on the
metrics we can measure today.
═══════════════════════════════════════════════
🔓 WAVE 2 SCOPE FINDING (worth a 15-min sync)
═══════════════════════════════════════════════
Side-audited the broader internal Newmont PBIX
("Talent Acquisition Dashboard_ work file"). Found that
most of the "blocked" Phase 4 fields actually exist
upstream — they were not carried into v2's narrower
import scope:
– Source of Hire:           Data-Applicants_status[Source/Details]
– Female Funnel %:          Data-Diversity[Gender Consolidated]
– Application Date:         Data-Diversity[Application Date]
– Interview stage:          Data-Applicants_status[Funnel Category]
– HM-to-Interview signal:   WasInHMReviewBeforeInterview (pre-built)
– Time to Offer:            1-Measures[Time to Offer] (pre-built)
– Female hires %:           1-Measures[% Females Hires YTD] (pre-built)
Implication: Wave 2 may shift from "wait for Manuel data
refresh" → "controlled import + relationship wiring +
privacy review of fields that already exist."
Honest caveats:

155 tables in source ≠ governance-approved scope
Multiple gender variants need reconciling
No literal Interview Date timestamp (proxy via stages)
EEOC + privacy review needed before importing demographics

═══════════════════════════════════════════════
🎯 ASK
═══════════════════════════════════════════════
Can we get a 15-min sync to align on Wave 2 path:
(a) import-and-wire upstream tables into v2, or
(b) pivot QIM to read source-direct with CR filter overlay, or
(c) build measure wrappers from existing v2 fields +
confirm Manuel refresh is still preferred for governance?
I'd want Marvin/Kurt's view on governance before any import.
═══════════════════════════════════════════════
📂 FILE
═══════════════════════════════════════════════
Newmont - TA Dashboard - 2026-06-21 v2.pbix
→ Uploading to KF SharePoint > Newmont QIM today
→ v1 (06-18) will be archived
Happy to walk through Page 6 when you're free.
Thanks,
Mel

---

## 11. CITATIONS / EVIDENCE TRAIL

- Wave 1 validation: `projects/newmont/docs/Phase4_Wave1_Measure_Validation.md` (commit 90ca6a8)
- Phase 4 field readiness audit: `projects/newmont/docs/Phase4_Field_Readiness_Audit.md` (commit 6100c69 → e618785 post-rebase)
- Wave 1 handoff: `docs/handoffs/Newmont_Phase4_Wave1_Handoff_2026-06-21.md`
- Next-chat handoff: `docs/handoffs/handoff-2026-06-21-NEXT-CHAT.md`
- This closeout: `docs/handoffs/Newmont_Phase4_Wave1_Closeout_Handoff_2026-06-22.md` (to be created)

---

**END OF HANDOFF DOCUMENT**