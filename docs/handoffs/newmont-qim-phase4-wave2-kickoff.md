# Newmont QIM — Phase 4 Wave 2 Kickoff Handoff
**Date:** 2026-06-22 (Manila late PM / EST AM)
**From:** Mel Dimat (Korn Ferry, Manila)
**To:** Next M365 Copilot Opus session
**Status:** Wave 1.5 SHIPPED + COMMITTED. Wave 2A starting.

---

## 🎯 CURRENT STATE (as of session close)

| Item | Status |
|---|---|
| Phase 4 score | 12 of 12 actionable |
| Shipped & visible in v3 | 8 of 12 (67%) |
| Evidence-mapped for Wave 2 | 4 of 12 (33%) |
| Wave 1.5 commit | `55f82af6d2c58ab7e213ff3db655eacc67db9877` on origin/main |
| Active working file | **Newmont - TA Dashboard - 2026-06-22 v4.pbix** (saved from v3) |
| v3 status | Wave 1.5 anchor — DO NOT TOUCH |

**File paths:**
- Project root: `D:\.projects\ungasis\projects\newmont\report-backups`
- v4 = `Newmont - TA Dashboard - 2026-06-22 v4.pbix` (Wave 2 build target)
- v3 = `Newmont - TA Dashboard - 2026-06-22 v3.pbix` (Wave 1.5 anchor, locked)
- v2 = `Newmont - TA Dashboard - 2026-06-21 v2.pbix` (Wave 1 anchor)
- v1 = `Newmont - TA Dashboard - 2026-06-18 v1.pbix` (lock byte)
- Source = `Talent Acquisition Dashboard_ work file.pbix` (155 tables, read-only reference)

---

## 📊 WAVE 1.5 SHIPPED MEASURES (in v3, also in v4)

| Measure | Value | Valid Rows | Filter |
|---|---|---|---|
| CR Avg Time to Offer | 47.08 days | 353 | Country = "CR (Costa Rica)" |
| CR Avg Time to Accept | 1.74 days | 285 | + Offer Status = "Accepted" |
| CR Avg Accept to Close | 5.66 days | 277 | + Offer Status = "Accepted" |

**Wave 1 baselines (DO NOT REGRESS):**
- CR Total Requisitions = 352
- CR Fill Rate = 96.65%
- CR Avg TTF = 46.15d
- CR Open Reqs = 24
- CR Reqs 60+ Days Old = 0
- CR Offer Acceptance Rate = 82.17%

---

## 🎯 WAVE 2 SCOPE (4 items, 3 sub-waves)

### Wave 2A — LOW RISK (next up)
1. **CR Avg Time to Interview (days)** — App → Interview
2. **CR HM:Interview Ratio** — Applications HM Reviewed / Applications Interviewed
3. CR Time to Interview Coverage % (transparency pair)

### Wave 2B — MEDIUM RISK
4. **CR Source of Hire — Applicant View** (Top 10 sources, all CR applicants)
5. **CR Source of Hire — Accept View** (Top 10 sources, accepted only)
6. **Direct Source flag** = (Silver Medalist OR TalentPool OR Referral OR LinkedIn Recruiter OR ATS Search)
7. **% of Top 10 Accept Sources that are Direct** (KPI)

### Wave 2C — HIGH RISK (privacy)
8. **CR Female Hires Count** (aggregate-only)
9. **CR % Female Hires** (aggregate-only)
10. **CR Female Funnel %** (by stage if data supports)

---

## 🛡️ ANTI-DRIFT RULES (carry forward, NEVER violate)

1. **PBI Copilot Desktop = NOT trusted** for numbers or build (60-70% reliable). Use only for narrative drafts at most.
2. **Always verify filenames in git ops** — date discipline (v3 = 06-22, NOT 06-21)
3. **Lock goals to commit MESSAGE, not hash** (rebase rewrites hashes)
4. **5-analyst convergence ≠ truth** if source hallucinates — anchor to handoff
5. **Schema presence ≠ data quality** — always check null counts + distribution
6. **Filename gate** — pre-flight every Claude CLI write (caught v3pbix typo)
7. **VertiPaq recompresses on save** — verify via MCP measure-count, NOT file-size
8. **Country format VARIES BY TABLE** in source PBIX — normalize at import
9. **History grain = 2.9M rows** in Data-Applicants_status — dedupe by Application ID or Is Current Status = "Yes"
10. **Distribution > Average** for sanity checks (bimodal hides in means)
11. **Banned benchmark:** Never cite KSA RPO 52d/67% in Newmont narrative
12. **Routing discipline:** Via Marvin/Kurt only. No direct Corey. No Darren Hewitt.
13. **Privacy gate (Wave 2C):** Aggregate-only, no row-level export, HR/Legal sign-off framing
14. **Source pre-built measures may be broken** under CR filter ([Time to Offer] returned blank). Build custom DAX.

---

## 🛠️ TOOL ORCHESTRATION (Wave 2 sequential pattern)

| Step | Tool | Role |
|---|---|---|
| Blueprint + cross-reference | M365 Copilot Opus (this chat) | Plan + anti-drift |
| Power Query import + Country normalization | You + PBI Desktop manual GUI | Execute PQ M code |
| Verify import (table count, CR coverage, dedupe success) | Claude Code CLI + Power BI MCP | Read-only probe |
| Draft DAX | M365 Copilot Opus | Specs |
| Write measures + validate (test value, regression check) | Claude CLI + MCP | Write + verify |
| Build KPI cards + visuals | You + PBI Desktop manual GUI | Visual placement |
| Cross-filter sanity test | You + PBI Desktop manual | Slicer validation |
| Update Measure Dictionary | Claude CLI + MCP (calculated table DATATABLE() expression) | Append new rows |
| Save + integrity check | Manual + Claude CLI MCP probe | 14-check pattern |
| Commit handoff docs (NOT PBIX) | Claude CLI git ops | Audit trail |

---

## 🎯 IMMEDIATE NEXT STEP — Wave 2A Step 2 (Power Query Import)

**Decisions already confirmed:**
- ✅ v4 saved (current working file)
- ✅ Power Query Import method (NOT DirectQuery)
- ✅ Sequential tool pattern locked

**Next:** Next session needs to provide Power Query M code for:
1. Connect to source PBIX (`Talent Acquisition Dashboard_ work file.pbix`) OR copy table definitions in
2. Import `Data-Applicants_status` filtered to `Is Current Status = "Yes"` (reduces 2.9M → ~533K)
3. Country normalization: source "Costa Rica" → match v3 "CR (Costa Rica)" format
4. Import `Data-All Reqs` for CR join (Job Req ID + Country)
5. Validate: Imported tables, CR row count (target ~30,706 down to ~5-10K post-dedupe), join feasibility

---

## 📋 SOURCE PBIX FIELD PATHS (already audited tonight)

### For Wave 2A (Interview + HM:Interview Ratio)
| Field | Source Path | DataType | CR Coverage |
|---|---|---|---|
| Application Date | `Data-Applicants_status[Application Date]` | DateTime | 100% of 30,706 CR rows |
| Funnel Category | `Data-Applicants_status[Funnel Category]` | String calc | New Application / TA Advisor Review / Interview / Hiring Manager Review / Offer / Hired |
| WasInHMReviewBeforeInterview | `Data-Applicants_status[WasInHMReviewBeforeInterview]` | String calc | Yes / No |
| Application Status | `Data-Applicants_status[Application Status]` | String | Multiple stages |
| Job Req ID | `Data-Applicants_status[Job Req ID]` | String | Joinable to v3 R1_Clean[Job Req ID] |

### For Wave 2B (Source of Hire)
| Field | Source Path | CR Coverage |
|---|---|---|
| Source (top-level channel) | `Data-Applicants_status[Source]` | 100% — Jobs2Web 85%, Forwarded 8%, Corporate Site 5%, Internal Referred 1.4% |
| Source Details (granular) | `Data-Applicants_status[Source Details]` | LinkedIn etc. visible here |

### For Wave 2C (Female Funnel)
| Field | Source Path | CR Coverage | Privacy |
|---|---|---|---|
| Gender Consolidated (canonical) | `Data-Diversity[Gender Consolidated]` | 7,048 CR rows | 🔴 High |
| Pre-built measure | `1-Measures[Female Hires]` | CR test = 63 | — |
| Pre-built measure | `1-Measures[% Females Hires]` | CR test = 21.65% | — |

**REJECT:** EEOC Diversity_current[Gender] — US-only, coded F/U/M, not canonical.

### Country Format Reference (CRITICAL)
| Table | Country Field | CR Value |
|---|---|---|
| Data-All Reqs | Country | "Costa Rica" |
| Data-Filled Positions | Country | "Costa Rica" |
| Data-Diversity | Country | "Costa Rica" |
| EEOC Diversity_current | Career Site Filter Country | "CR (Costa Rica)" |
| **v3 R1_Clean** | Country | **"CR (Costa Rica)"** |

**Normalization rule:** During PQ import, replace "Costa Rica" → "CR (Costa Rica)" to match v3 join key.

---

## 🔑 GOVERNANCE STATUS

- ✅ Sondra Wozniak implicitly approved Wave 2 build (she built from source semantic herself)
- ✅ Routing via Marvin/Kurt (NOT direct Corey, NOT Darren Hewitt)
- ✅ No separate Manuel data refresh needed (fields already exist in source PBIX)
- ⚠️ Wave 2C privacy framing required (aggregate-only, no row-level export)

---

## 📁 SONDRA-READY ARTIFACTS (already saved)

- ✅ OneNote evidence pack (Phase 4 + Wave 2 evidence + FAQ + 3 governance asks)
- ✅ 5 Sondra grilling questions (backup, only use if sync surfaces ambiguity)
- ✅ Measure Dictionary updated to 23 rows with Wave 1.5 caveat footer
- ✅ Page 6 = 9 KPI cards (3x3 grid + HM/BU slicers + 2 bars)
- ✅ Git commit 55f82af pushed to origin/main with full audit trail

---

## 📝 SONDRA'S FRIDAY ASKS (anchor for Corey meeting)

> 1. Filter everything to Costa Rica
> 2. Don't compare Costa Rica vs other countries, compare HMs or BUs within CR
> 3. For any new visuals, focus on the SLAs we know we have:
>    - Time from app to interview
>    - Time to offer
>    - Time to accept (calendar days, candidate level)
>    - HM to Interview Ratio
>    - Offer Acceptance Rate
>    - Current # reqs 60+ days old
>    - Avg days between written offer accept and Req Closed Date
> 4. Source of Hire analysis: applicant source vs accept source, are "direct candidate sources" within Top 10 sources of accept? (Direct = Silver Medalist, TalentPool, Referral, LinkedIn Recruiter, ATS Search)
> 5. Female candidate funnel %
>
> *"Anything you can do with those pieces will be a huge win, proof we're working towards the QIM."*

---

## 🆔 USER CONTEXT

- Name: Mel John Dimat (Korn Ferry, Manila)
- Role: Sr full-stack BI/data analyst-consultant, Microsoft MVP track
- ESL speaker, visual learner, prefers Feynman analogies
- Currently on shift (Manila late evening = KF EST morning)
- Corey will be on a meeting today — context-critical
- Energy: high (start of shift)
- Tone preference: short, simple, executive-ready, no walls of text, one step at a time
- Wait for "next" / "continue" between steps
- Save context window aggressively

---

## 🎯 NEXT SESSION'S OPENING DELIVERABLE

Provide:
1. Confirm read of this handoff fully
2. 5-bullet snapshot (current state / 1 finding / 3 caveats / 1 next action)
3. Wave 2A Step 2 = Power Query M code for import (paste-ready), including:
   - Connection to source `Data-Applicants_status` + `Data-All Reqs`
   - Filter `Is Current Status = "Yes"` to dedupe 2.9M → ~533K
   - Country normalization "Costa Rica" → "CR (Costa Rica)"
   - Output ready for v4 model
4. Pre-paste sanity checks (what could go wrong, how to verify)
5. Ask user for "go" before proceeding

DO NOT proceed past Step 2 without explicit user confirmation.