
---

## 7. CLAUDE.md — Foreman Edition

> Save this as `CLAUDE.md` in the project root. Claude Code auto-loads it.

```markdown
# Newmont Intelligence Command Center v5.0

## Your Role: FOREMAN (Not Builder)
You are the project foreman. You DO NOT generate large components.
You DELEGATE component generation to Antigravity agents via skinny prompts.
You ONLY do: setup, prompt generation, integration, debugging, git, QA.

## Token Efficiency Rules
- NEVER generate a component >50 lines. Delegate to Antigravity.
- NEVER rewrite a file when a surgical edit fixes the issue.
- For integration: read existing files, fix imports/types, wire into pages.
- For debugging: read error, apply minimal fix, re-run. Max 3 attempts.
- For prompt generation: max 150 tokens per Antigravity agent prompt.
- Save all generated prompts to docs/prompts/wave-N.md

## Foreman Responsibilities
1. SETUP: scaffold, install deps, create folders (terminal tasks)
2. PROMPT: generate skinny Antigravity agent prompts per wave
3. INTEGRATE: wire Antigravity outputs into app, fix imports/paths
4. DEBUG: npm run dev → read errors → minimal fix → re-run
5. BUILD: npm run build → verify zero errors → static export
6. COMMIT: git add + commit with conventional message
7. QA: verify data loads, charts render, calculations correct

## What You NEVER Do
- Generate full React components (Antigravity does this)
- Write business logic >30 lines (Antigravity does this)
- Create CSS/styling files (Antigravity does this)
- Write test files (Jules does this overnight)

## Project Identity
- Client: Newmont Mining × Korn Ferry RPO
- Type: Portable offline-first SPA
- Builder: Mel John Dimat (Manila)
- Lead: Sondra Wozniak (Milwaukee)
- Contract: CW162992 (Feb 20, 2026 – Feb 20, 2028)

## Critical Constraints
- ALL data LOCAL (IndexedDB + localStorage). No cloud.
- Newmont IP per MSA §8. No data export without approval.
- 36% field coverage (42/116). Show "Cannot Calculate" for missing.
- 2 of 5 reports missing. Design placeholders.
- Static export (next export → dist/).
- NEVER commit CSV data to git. data/ in .gitignore.
- Max 200 lines per file. Split if longer.
- Port: 3001 (RiftCoach uses 3000)

## Tech Stack
Next.js 15 | React 19 | TypeScript 5.8 | Tailwind CSS 4 | Shadcn/ui
Zustand 5 | Recharts | Papa Parse | Dexie.js | Fuse.js
date-fns | html2canvas | jsPDF | SheetJS (xlsx) | DanfoJS

## File Structure
src/app/           → Next.js pages (app router)
src/components/    → React components (Antigravity generates these)
  dashboard/       → KPI cards, status charts
  field-gap/       → Coverage heatmap, field mapping
  sla/             → SLA calculator, reportable matrix
  req-analytics/   → Pipeline funnel, aging, workload
  freeze/          → Hold duration, bounce analysis
  email/           → Email parser, search, timeline (Phase 2)
  posting/         → Posting tracker (Phase 2)
  billing/         → Billing workbench (Phase 3)
  shared/          → Reusable UI (cards, charts, nav, layout)
src/lib/           → Business logic (Antigravity generates these)
  data/            → CSV parser, IndexedDB, data service
  calc/            → SLA calculator, KPI engine, billing calc
  email/           → Email parser (Phase 2)
src/stores/        → Zustand stores (Antigravity generates these)
src/types/         → TypeScript interfaces
data/              → Raw CSV/XLSX files (GITIGNORED)
docs/prompts/      → Antigravity agent prompts (YOU generate these)

## Antigravity Prompt Template
When generating prompts for Antigravity agents, use this format:
---
## Agent N: [Component Name]
Path: src/[path]/[FileName].tsx
Stack: React 19 + TypeScript + [specific libs]
Input: [data source or props]
Output: [what it renders]
Constraints: max 200 lines, Shadcn/ui components, Recharts for charts
Schema: [I/O types if needed]
---
```

---

## 8. Data Model — Star Schema

### Fact Tables (Available)

| Table | Rows | Columns | Source File | Key Fields |
|---|---|---|---|---|
| **fact_requisitions** | 19,292 | 38 | `All_Global_REQ_New_Report_KF.csv` | req_id, status, country, recruiter, open_date, close_date, fill_date, cancel_date, ttf_days, job_title, department, grade, region, hiring_manager |
| **fact_hold_events** | 23,710 | 7 | `On_hold_time_Audit_KF.csv` | req_id, hold_start, hold_end, hold_duration_days, hold_reason, hold_count, is_currently_frozen |
| **fact_postings** | 317 | 10 | `Posted_Requisitions_Global_KF.csv` | req_id, posting_id, posting_platform, post_date, remove_date, posting_status, external_url, posting_duration_days |

### Fact Tables (Future — Design Placeholders)

| Table | Expected Rows | Source | Status |
|---|---|---|---|
| **fact_candidates** | Unknown | Global Candidates report (not yet created in CORE) | ❌ Not available — blocks Candidate Analytics |
| **fact_workflow** | Unknown | Applicants Workflow Dates report (not yet created) | ❌ Not available — blocks milestone SLAs |

### Dimension Tables

| Table | Source | Key Fields |
|---|---|---|
| **dim_field_mapping** | `TA_Semantic_Model_Fields.xlsx` (116 fields) | field_id, kf_field_name, suggested_backend_ref, newmont_field_name, manipulation_needed, kf_notes, newmont_reportable, newmont_comments, kf_impact, category |
| **dim_sla_rules** | SOW contract CW162992 + Sondra's SLA analysis (Mar 2026) | sla_id, metric_name, target_days, start_event, end_event, required_fields, status (calculable/cannot_calculate), reason |
| **dim_recruiters** | Derived from fact_requisitions (recruiter column) | recruiter_id, name, country, assignment_count, avg_ttf |
| **dim_locations** | Derived from fact_requisitions (country/region columns) | country_code, country_name, region, req_count, avg_ttf |
| **dim_emails** | Manual import / .eml parsing (Phase 2) | email_id, subject, from, to, date, thread_id, actions[], decisions[] |
| **dim_milestones** | Smartsheet project plan (Phase 2) | milestone_id, name, target_date, actual_date, status, owner |

### Star Schema Diagram

```
                    dim_field_mapping (116 fields)
                           │
                           │ coverage analysis
                           │
dim_locations ────── fact_requisitions ────── dim_recruiters
    (13 countries)    (19,292 rows)          (recruiter workload)
                     ╱           ╲
                    ╱             ╲
          fact_hold_events    dim_sla_rules
          (23,710 rows)       (SOW metrics)
                    ╲
                     ╲
               fact_postings
               (317 rows)
```

---

## 9. Key Metrics — From Actual Data

### Headline KPIs

| Metric | Value | Source |
|---|---|---|
| Total Requisitions | 19,292 | fact_requisitions row count |
| Fill Rate | 73.6% | Filled / (Filled + Cancelled + Open + On Hold) |
| Average Time to Fill | 80.1 days | Mean of TTF column (filled reqs only) |
| Cancelled Rate | 21.1% | Status = Cancelled / Total |
| Open Rate | 3.8% | Status = Open / Total |
| On Hold Rate | 1.1% | Status = On Hold / Total |
| Countries Covered | 13 | Distinct country values |
| Field Coverage | 36% | 42 available / 116 total fields |

### Time to Fill by Country

| Country | Avg TTF (days) | Interpretation |
|---|---|---|
| Costa Rica | 46 | Fastest — home market |
| Ghana | 59 | Moderate — Africa ops |
| Papua New Guinea | 105 | Slow — remote mining site |
| Suriname | 148 | Very slow — limited talent pool |
| Chile | 190 | Slowest — competitive mining market |

### Freeze Statistics

| Metric | Value |
|---|---|
| Requisitions Ever On Hold | 3,127 |
| Currently Frozen (active hold) | 390 |
| Mean Hold Duration | 100 days |
| Hold Events Total | 23,710 |

### Field Coverage by Category

| Category | Available | Total | Coverage |
|---|---|---|---|
| Requisition Fields | ~29 | ~49 | ~59.2% |
| Candidate Fields | 0 | ~35 | 0% |
| Workflow/Milestone Fields | 0 | ~22 | 0% |
| Posting Fields | ~10 | ~10 | ~100% |
| **Overall** | **42** | **116** | **36.2%** |

---

## 10. SLA Rules — From SOW (Contract CW162992)

### Cancellation Fee Tiers

| Days Open Before Cancel | Fee % | Rule |
|---|---|---|
| 0-5 business days | 0% | No charge |
| 6-20 business days | 50% | Half-fee |
| 21+ business days | 100% | Full fee applies |

### Hold Rules

| Rule | Detail |
|---|---|
| Hold > 30 days | Req eligible for cancellation + cancellation fee |
| Hold resume | Timer resumes from pre-hold position |
| Multiple holds | Each hold event tracked separately (bounce detection) |

### SLA Reportability Matrix

#### ✅ CALCULABLE SLAs (Have Required Fields)

| SLA | Required Fields | Available? | Status |
|---|---|---|---|
| Time to Fill (TTF) | Open Date, Fill Date | ✅ Both available | Calculable |
| Cancellation Rate | Status field | ✅ Available | Calculable |
| Hold Duration | Hold Start, Hold End | ✅ Available | Calculable |
| Posting Duration | Post Date, Remove Date | ✅ Available | Calculable |

#### ❌ CANNOT CALCULATE — From Sondra's May 27, 2026 Email

**SLAs & KPIs (11 unavailable):**

| # | SLA/KPI | Why Not Available |
|---|---|---|
| 1 | Time to Assign | No assignment date field in CORE data |
| 2 | Time to Advertise | No advertisement date field |
| 3 | Time to Brief | No brief/intake date field |
| 4 | Time from Assign to Intake | Neither date available |
| 5 | Time from Intake to Recruitment Agreement | Neither date available |
| 6 | Time to Shortlist | No shortlist date field |
| 7 | Time to Interview | No interview date field |
| 8 | Close Req within 1 Business Day of Acceptance | No acceptance + close timestamps |
| 9 | Time to Screen (BGC) | No BGC completion date |
| 10 | Time to Offer | No offer date field |
| 11 | Offer Acceptance Rate | No offer/acceptance tracking |

**Requested Insights (3 unavailable):**

| # | Insight | Why Not Available |
|---|---|---|
| 12 | Candidate drop-off point / reason | No candidate pipeline data |
| 13 | Analysis of salary expectations | No salary/compensation fields |
| 14 | Gender | No gender field available |

**Billing Details (2 unavailable):**

| # | Detail | Why Not Available |
|---|---|---|
| 15 | Reason for req cancellation | No cancellation reason field |
| 16 | Flag candidates terminating within 6 days of Start Date | No start date / termination date |

---

## 11. Module Specifications

### Module 1: Executive Dashboard

| Attribute | Value |
|---|---|
| Path | `src/components/dashboard/` |
| Data Source | `fact_requisitions` (Zustand dataStore) |
| Priority | P0 — MVP |

**Components:**
- `KPICard.tsx` — Reusable card (value, label, trend, icon). 6 cards: Total Reqs, Fill Rate, Avg TTF, Cancelled %, Open %, Field Coverage %
- `StatusDonut.tsx` — Recharts PieChart: Filled (73.6%), Cancelled (21.1%), Open (3.8%), On Hold (1.1%)
- `TTFByCountryChart.tsx` — Recharts BarChart: 5 countries (CR 46d, Ghana 59d, PNG 105d, Suriname 148d, Chile 190d)
- `HiringTrendLine.tsx` — Recharts LineChart: monthly req opens vs fills
- `DashboardPage.tsx` — Page layout: 6 KPI cards row → donut + bar side-by-side → trend line

### Module 2: Field Gap Command (THE MEETING DELIVERABLE)

| Attribute | Value |
|---|---|
| Path | `src/components/field-gap/` |
| Data Source | `dim_field_mapping` (from XLSX import) |
| Priority | P0 — MVP |

**Components:**
- `FieldCoverageHeatmap.tsx` — Grid: 116 cells, green=available, red=unavailable, yellow=partial. Grouped by category (Requisition, Candidate, Workflow, Posting, Other)
- `CoverageStats.tsx` — Summary cards: Overall 36%, Req 59.2%, Candidate 0%, Workflow 0%, Posting 100%
- `FieldDetailTable.tsx` — Searchable table: KF Field Name | Newmont Field | Available? | Impact | Notes
- `FieldGapPage.tsx` — Page layout: coverage stats → heatmap → detail table

### Module 3: SLA/KPI Calculator

| Attribute | Value |
|---|---|
| Path | `src/components/sla/` + `src/lib/calc/` |
| Data Source | `fact_requisitions` + `dim_sla_rules` |
| Priority | P0 — MVP |

**Components:**
- `src/lib/calc/slaCalculator.ts` — Returns: `{ metric, value, status: 'calculable'|'cannot_calculate', reason, requiredFields, confidence }`
- `SLAMatrix.tsx` — Two-column table: left=calculable (green), right=cannot_calculate (red, with reason)
- `ReportableCard.tsx` — Summary: "4 of 15 SLAs calculable from available data"
- `SLAPage.tsx` — Page layout: reportable card → SLA matrix → explanation notes

### Module 4: Requisition Analytics

| Attribute | Value |
|---|---|
| Path | `src/components/req-analytics/` |
| Data Source | `fact_requisitions` |
| Priority | P1 |

**Components:**
- `PipelineFunnel.tsx` — Funnel: Open → Filled → Cancelled → On Hold
- `AgingChart.tsx` — Recharts BarChart: reqs by age bucket (0-30d, 31-60d, 61-90d, 91-120d, 120d+)
- `WorkloadTable.tsx` — Recruiter workload: name, open count, avg TTF, fill rate
- `CountryDrilldown.tsx` — Country selector → filtered metrics
- `ReqAnalyticsPage.tsx` — Page layout

### Module 5: Freeze Analysis

| Attribute | Value |
|---|---|
| Path | `src/components/freeze/` |
| Data Source | `fact_hold_events` |
| Priority | P1 |

**Components:**
- `HoldDurationChart.tsx` — Distribution of hold durations
- `BounceDetector.tsx` — Reqs with multiple hold cycles (flag potential abuse)
- `FrozenPipeline.tsx` — 390 currently frozen reqs: by country, by age
- `FreezeAnalysisPage.tsx` — Page layout

### Module 6: Posting Tracker (Phase 2)

| Attribute | Value |
|---|---|
| Path | `src/components/posting/` |
| Data Source | `fact_postings` (317 rows) |
| Priority | P2 |

### Module 7: Email Intelligence (Phase 2)

| Attribute | Value |
|---|---|
| Path | `src/components/email/` + `src/lib/email/` |
| Data Source | Manual paste / .eml import |
| Priority | P2 |

### Module 8: Billing Workbench (Phase 3)

| Attribute | Value |
|---|---|
| Path | `src/components/billing/` |
| Data Source | `fact_requisitions` + `dim_sla_rules` |
| Priority | P3 |

---

## 12. Sprint Roadmap

### Wave-Based Build Schedule

| Sprint | Wave | What | Agents | Time | Claude Cost |
|---|---|---|---|---|---|
| **S0** | — | Scaffold: Next.js, deps, folders, port 3001, git init | Claude Code only | 15 min | ~2K tokens |
| **S1** | Wave 1 | Types + Data Engine + Zustand Stores | 3 Antigravity agents | 30 min | ~4K tokens |
| **S2** | Wave 2 | Field Gap Heatmap + Dashboard + SLA Calculator | 3 Antigravity agents | 30 min | ~4K tokens |
| **S3** | Wave 3 | Req Analytics + Navigation + Layout | 2 Antigravity agents | 20 min | ~3K tokens |
| **S4** | — | Full integration + QA + npm run build | Claude Code only | 30 min | ~5K tokens |
| **S5** | — | Git tag v5.0-mvp + meeting prep | Claude Code + Design | 15 min | ~1K tokens |
| **S6** | Wave 4 | Freeze Analysis + Posting Tracker | 2 Antigravity agents | Phase 2 | — |
| **S7** | Wave 5 | Email Intelligence | 2 Antigravity agents | Phase 2 | — |
| **S8** | Wave 6 | Billing Workbench | 1 Antigravity agent | Phase 3 | — |

### Tonight's Timeline (Building for Sondra Meeting)

```
10:00 PM → S0: Claude Code scaffolds project
10:30 PM → S1: Wave 1 (types + data + stores) via Antigravity
11:00 PM → S1: Claude Code integrates Wave 1
11:30 PM → Claude Design generates dashboard mockup
12:00 AM → S2: Wave 2 (field gap + dashboard + SLA) via Antigravity
12:45 AM → S2: Claude Code integrates Wave 2
 1:30 AM → S3: Wave 3 (req analytics + nav) via Antigravity
 2:00 AM → S3: Claude Code integrates Wave 3
 2:30 AM → S4: Full QA + npm run build
 2:45 AM → 💤 SLEEP (Jules runs tests overnight)
 8:00 AM → S5: Review Jules PR, final fixes
10:00 AM → Meeting prep materials
 2:00 PM → 🎯 MEETING WITH SONDRA (Semantic Model)
```
