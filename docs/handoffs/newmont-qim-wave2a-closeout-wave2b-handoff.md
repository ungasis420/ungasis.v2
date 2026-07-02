# NEWMONT QIM — WAVE 2A CLOSEOUT & WAVE 2B HANDOFF
**Date:** 2026-06-22 (late evening, Manila time)
**Author:** Mel John Dimat (Korn Ferry, Manila)
**Project:** Newmont Talent Acquisition Dashboard — Phase 4 (Costa Rica scope)
**Status:** Wave 2A FULLY SHIPPED. Wave 2B kickoff next.

═══════════════════════════════════════════════════════════════
SECTION 1 — CURRENT STATE
═══════════════════════════════════════════════════════════════

## Repository & Build State
- **GitHub:** github.com/ungasis420/ungasis.v2
- **Active branch:** main
- **Latest commit:** `5bdc2b4` (Wave 2A Measure Dictionary updated)
- **Commit chain:**
  - `55f82af` → Wave 1.5 shipped (8 CR measures)
  - `3f0d7ca` → Wave 2A logic shipped (measures + docs)
  - `557156b` → Wave 2A Page 07 visuals + handoff append
  - `5bdc2b4` → Measure Dictionary updated (23 → 26 rows)
- **PBIX file:** `Newmont - TA Dashboard - 2026-06-22 v5.pbix` (LOCAL ONLY)
- **Locked PBIX files (do not touch):** v3.pbix, v4.pbix
- **Discipline rule:** No PBIX files in git (Option A maintained)

## Live Measures in v5 (11 total CR measures)
**Wave 1 + 1.5 (8 measures, Page 6):**
1. CR Total Requisitions = 352
2. CR Fill Rate = 96.65%
3. CR Avg Time to Fill = 46.15d
4. CR Open Reqs = 24
5. CR Reqs 60+ Days Old = 0
6. CR Offer Acceptance Rate = 82.17%
7. CR Avg Time to Offer = 47.08d
8. CR Avg Time to Accept = 1.74d
9. CR Avg Accept to Close = 5.66d

**Wave 2A (3 new measures, Page 7):**
10. CR Avg Time to Interview = 10.8 days
11. CR HM:Interview Ratio = 39.9% (funnel-honest)
12. CR Distinct Apps Reaching Stage = 5,359 (helper)

## Live Tables in v5
- `R1_Clean` (18,935 rows, Excel-sourced) — req hub
- `RD1_Details` (req details — HM Last Name, BU, Job Title)
- `R3_OnHold` (audit history)
- `CD2_Offers` (offer + accept dates)
- `OnHold_Validated` (Manuel's semantic model export)
- `W2A_CR_ReqIDs` (352 rows) — CR req gold list
- `W2A_Applicants_Workflow_CR` (8,726 rows, 340 distinct reqs) — workflow events
- `Measure Dictionary` (26 rows, calculated DATATABLE)
- `_Measures` (DAX measure home)
- `Lists - Locations` (124 rows — country lookup)

## Pages in v5
- Page 1: Executive Summary
- Page 2: TTF & Hold
- Page 3: Candidate Pipeline (Offer/Accept)
- Page 4: SLA Status & Notes
- Page 5: Measure Dictionary (26 rows)
- Page 6: Costa Rica Deep-Dive (W1 + W1.5 measures + HM/BU charts)
- Page 7: Costa Rica — Interview Funnel (W2A — 2 KPI cards, 3-stage funnel, Top 15 HM bar chart, HM + BU slicers)

═══════════════════════════════════════════════════════════════
SECTION 2 — WAVE 2A HANDOFF (WHAT JUST SHIPPED)
═══════════════════════════════════════════════════════════════

## Scope Delivered
- **CR Avg Time to Interview** = 10.8 days
- **CR HM:Interview Ratio** = 39.9% (funnel-honest version)
- **CR Distinct Apps Reaching Stage** = 5,359 (helper measure)
- **Page 07 visuals:** 2 KPI cards + 3-stage funnel + Top 15 HM bar chart + HM/BU slicers
- **Measure Dictionary:** Updated 23 → 26 rows via MCP (calculated DATATABLE rewrite)

## Source Data
- **REQ table:** R1_Clean ← `report_All_Global_REQ_New_Report_KF.xlsx` (sheet `cleaned_r1`)
  - 18,935 rows global, 352 CR rows where Country = "CR (Costa Rica)"
- **Applicant workflow:** W2A_Applicants_Workflow_CR ← `Applicants_Workflow_Dates_KF_2026_06_15_18_16_56.xlsx`
  - 187,352 rows global, 8,726 after CR Job Req ID join
  - 14 columns; sheet name = `Applicants_Workflow_Dates_KF`

## File Locations (dual-machine)
- **KF laptop:** `C:\Users\DIMATM\OneDrive - Korn Ferry\Desktop\newmont\`
- **Personal laptop:** `D:\.projects\ungasis\projects\newmont\data\`
- Both folders contain BOTH source Excels (sync'd manually)

## DAX Definitions (canonical)

**CR Avg Time to Interview:**
```dax
VAR InterviewStatuses = {"Face-to-Face Interview", "Live Interview"}
VAR InterviewEvents =
    FILTER(W2A_Applicants_Workflow_CR,
           W2A_Applicants_Workflow_CR[Application Status] IN InterviewStatuses)
VAR PerApplicant =
    GROUPBY(InterviewEvents,
            W2A_Applicants_Workflow_CR[Application ID],
            W2A_Applicants_Workflow_CR[Application Date],
            "FirstInterviewDate", MINX(CURRENTGROUP(), W2A_Applicants_Workflow_CR[Created Date]))
VAR WithDuration =
    ADDCOLUMNS(PerApplicant, "Days",
               DATEDIFF(W2A_Applicants_Workflow_CR[Application Date], [FirstInterviewDate], DAY))
VAR ValidDurations = FILTER(WithDuration, [Days] >= 0)
RETURN AVERAGEX(ValidDurations, [Days])

Format string: "0.0"

CR HM:Interview Ratio:

VAR HMReviewApps =
    CALCULATETABLE(VALUES(W2A_Applicants_Workflow_CR[Application ID]),
                   W2A_Applicants_Workflow_CR[Application Status] = "Hiring Manager Review")
VAR InterviewApps =
    CALCULATETABLE(VALUES(W2A_Applicants_Workflow_CR[Application ID]),
                   W2A_Applicants_Workflow_CR[Application Status] IN {"Face-to-Face Interview", "Live Interview"})
VAR BothStages = INTERSECT(HMReviewApps, InterviewApps)
VAR HMCount = COUNTROWS(HMReviewApps)
VAR BothCount = COUNTROWS(BothStages)
RETURN DIVIDE(BothCount, HMCount, 0) * 100

Format string: "0.0\%"
CR Distinct Apps Reaching Stage:

DISTINCTCOUNT(W2A_Applicants_Workflow_CR[Application ID])

Format string: "0"

═══════════════════════════════════════════════════════════════
SECTION 3 — KICK-OFF FOR WAVE 2B
═══════════════════════════════════════════════════════════════
Wave 2B Scope: Source of Hire
Goal: Show where CR candidates come from (direct sources vs. indirect/external).
Deliverables (2 views)

Applicant Source view — where do all CR applicants come from?
Accept Source view — where do the CR ACCEPTED offers come from?

Direct source flags (Sondra-defined)
Any candidate from these sources = Direct:

Silver Medalist
TalentPool
Referral
LinkedIn Recruiter
ATS Search

All other sources = Indirect.
Possible measures to build

CR Direct Sourcing Rate % (KPI headline)
CR Applicants by Source (bar chart)
CR Accepted Hires by Source (bar chart)
Direct vs Indirect breakdown (donut or stacked bar)

Data readiness (from Wave 2A probes)

Workflow Excel has Source and Source Details columns ✅
Need to confirm CR coverage % first (probe before build)
May need a calculated column to flag Direct vs Indirect

Open questions for Sondra (ask before building)

Should "Direct" be a binary flag, or each source shown separately?
Is Source field at the application level or candidate level?
Where does "Accept Source" live? (Same Source column at time of accept, OR a separate field?)
Any edge cases? (e.g., source changed during workflow → which one counts?)

Estimated effort

3–4 hours (1 focused session)
Blockers: None major. Data exists; just needs scoping.

═══════════════════════════════════════════════════════════════
SECTION 4 — ROADMAP (FULL PHASE 4)
═══════════════════════════════════════════════════════════════






















































WaveScopeStatusEffortBlockers1CR foundation (Reqs, TTF, Fill Rate, etc.)✅ Shipped——1.5CR Time to Offer/Accept/Close✅ Shipped——2ACR Time to Interview + HM:Interview Ratio✅ SHIPPED— (done)—2BCR Source of Hire (Direct vs Indirect)🔵 Next~3-4hNone2CCR Female Candidate Funnel %🔵 After 2B~6hSondra-approved privacy rules3(Out of scope until 2B/2C done)———
═══════════════════════════════════════════════════════════════
SECTION 5 — PROGRESS COMPLETION
═══════════════════════════════════════════════════════════════
Phase 4 Score

9 Sondra asks total
7 of 9 shipped (78% complete)
2 remaining (Wave 2B Source of Hire, Wave 2C Female Funnel %)

Sondra Ask Tracker











































































#AskStatusPageFinal Value1Time to Interview✅ Shipped W2APage 710.8d2HM:Interview Ratio✅ Shipped W2APage 739.9%3Time to Offer✅ Shipped W1.5Page 647.08d4Time to Accept✅ Shipped W1.5Page 61.74d5Offer Accept Rate✅ Shipped W1Page 682.17%6Reqs 60+ Days Old✅ Shipped W1Page 607Offer Accept → Req Close✅ Shipped W1.5Page 65.66d8Source of Hire🔵 Wave 2BTBDTBD9Female Candidate Funnel %🔵 Wave 2CTBDTBD
═══════════════════════════════════════════════════════════════
SECTION 6 — LESSONS & FINDINGS (8 ANTI-DRIFT WINS)
═══════════════════════════════════════════════════════════════


Table name with spaces: Data - Applicants_status has spaces around the dash (not Data-Applicants_status). Probe before assuming.


Country lives elsewhere: Data - Applicants_status has no Country column. Country comes from Lists - Locations via Loc_Cons join.


Data - All Reqs[Country] does NOT have Costa Rica: This table only has 10 countries (Ghana, US, Peru, etc.) — CR is missing. The v3 CR isolation uses R1_Clean[Country] = "CR (Costa Rica)" from a separate Excel (report_All_Global_REQ_New_Report_KF.xlsx, sheet cleaned_r1, original column Career Site Filter Country).


R1_Clean is Excel-sourced, not PBIX-sourced: Always trace back to Excel for CR truth.


HM:Interview Ratio v1 was misleading: First version (68.4% = 519/759) mixed populations. Funnel-honest v2 (39.9% = 303/759) uses INTERSECT to only count apps that went through BOTH stages.


Application Status is canonical, Application Status2 is QA-only: They differ in 77% of rows (144,325 mismatches). Manuel's semantic model maps Current Candidate Status to Application Status only.


Dual-machine path divergence: KF laptop uses OneDrive Desktop path. Personal laptop uses D:.projects\ungasis. Always sync files to BOTH locations.


Live Interview = 1 in CR scope: Data sparse. Costa Rica effectively uses Face-to-Face Interview exclusively. Option B definition (F2F + Live) was functionally just F2F for CR.


Additional findings worth flagging to Sondra

42% of CR interviews skip HM Review (216 of 519 interviews). Possible process gap.
Dobson = 0.0d average Time to Interview — likely small sample / data quality flag.
Live Interview = 1 in CR — confirm with Corey if this is intentional or under-logged.

═══════════════════════════════════════════════════════════════
SECTION 7 — ANALYSIS, GOAL & PLAN
═══════════════════════════════════════════════════════════════
Current Goal (Wave 2B Kickoff)
Build Source of Hire dashboard view for Costa Rica to answer:

"Where do CR candidates come from?"
"What % are from Direct sources (recruiter-driven) vs Indirect (open postings)?"
"Which source produces the most ACCEPTED hires?"

Plan (Wave 2B Sequential Steps)

Step 0 (probe-first): Ask Claude MCP to inspect Source + Source Details columns on the workflow Excel

Confirm CR coverage
List all distinct source values (find the 5 Direct ones + any unknowns)
Check % rows with blank source


Step 1 (data prep): Add a calculated column Direct_Indirect_Flag to W2A_Applicants_Workflow_CR (or new query)
Step 2 (measures): Build:

CR Direct Sourcing Rate % (KPI)
CR Applicants by Source (count distinct App IDs per source)
CR Hires by Source (filter to Accepted/Hired)


Step 3 (visuals on Page 08): Bar chart by source, donut for Direct vs Indirect
Step 4 (commit + measure dictionary update + handoff)

Stop Conditions

Field Source is unreliable for CR → escalate to Sondra/Manuel
Source values don't match the 5 Direct flags → ask Sondra to clarify
Privacy concerns surface unexpectedly → pause and align

═══════════════════════════════════════════════════════════════
SECTION 8 — WORKFLOW & AI ORCHESTRATION
═══════════════════════════════════════════════════════════════
Proven Tool Stack (this session)








































ToolRoleWhen to useM365 Copilot Opus (this chat)Blueprint, cross-ref, anti-drift, executive commsPlanning, cross-analyst auditing, message draftingClaude Code CLI + Power BI MCPRead probes, DAX writes, calculated DATATABLE rewrites, git opsAnything that touches the model or gitManual GUI (Power BI Desktop)Power Query paste, KPI card builds, visual layouts, saveAnything Claude can't click onPBI Copilot Desktop⛔ NEVER USED — BANNEDHallucinates numbers, mixes populationsChatGPT EnterpriseSharePoint file search, Excel inspection (semantic model fields)When SharePoint indexing helps5 parallel AI analystsCross-check every major decisionAfter every Claude probe or measure build
Anti-Drift Rules (active)

Filename gate every write (probe exact name before paste)
PBIX never in git (Option A discipline)
Source-of-truth = R1_Clean for CR isolation
Application Status only (Status2 banned for primary)
Cross-machine: dual-location file copies
Verify row count after every PQ load (Power Query preview lies)
Funnel-honest math (INTERSECT, not raw ratio)
KSA RPO 52d/67% benchmark BANNED in CR context

Sequential Build Pattern (proven this session)
Probe (Claude MCP, read-only)
  → Cross-analyst verify (5 AI panels converge)
  → Design (M365 Copilot Opus drafts logic)
  → Sanity check (Claude MCP again)
  → Build (Manual GUI OR Claude MCP write)
  → Verify (Claude MCP read-back)
  → Save (Manual Ctrl+S)
  → Document (Claude writes markdown)
  → Commit (Claude git ops)

═══════════════════════════════════════════════════════════════
SECTION 9 — PENDING FOLLOW-UPS
═══════════════════════════════════════════════════════════════
Sondra

⏳ Walkthrough of Page 07 (when available)
⏳ Approve Wave 2C privacy gating rules before build
⏳ Clarify Wave 2B questions (direct flag binary vs split, Source vs Accept Source semantics)
⏳ v5.pbix uploaded to Newmont QIM SharePoint folder before walkthrough

Corey

⏳ Confirm "Live Interview = 1 in CR" is data-correct, not under-logged
⏳ Decide if "Source of Hire" should show Direct % or full breakdown

Manuel

⏳ Check Dobson = 0.0d source data (single-app outlier vs data quality)
⏳ Confirm Source and Source Details field semantics for Wave 2B

Internal

⏳ Upload v5.pbix to SharePoint (Newmont QIM folder)
⏳ Optional: SharePoint sync of v5 for team distribution
⏳ Wave 2B probe-first session (Claude MCP on Source columns)

═══════════════════════════════════════════════════════════════
END OF HANDOFF DOCUMENT
═══════════════════════════════════════════════════════════════