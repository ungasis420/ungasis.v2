# NEWMONT v5.0 — SECTIONS 7-24 (APPEND TO PART 1)

---

## 7. CLAUDE.md — Foreman Edition

> Save this as `CLAUDE.md` in the project root. Claude Code auto-loads it.

```markdown
# Newmont Intelligence Command Center v5.0

## Your Role: FOREMAN (Not Builder)
You orchestrate and integrate. You DO NOT generate large components.
You DELEGATE component generation to Antigravity agents via skinny prompts.
You ONLY do: setup, prompt generation, integration, debugging, git, QA.

## Token Efficiency Rules
- NEVER generate a component >50 lines. Delegate to Antigravity.
- NEVER rewrite a file when a surgical edit fixes the issue.
- For integration: read existing files, fix imports/types, wire into pages.
- For debugging: read error, apply minimal fix, re-run. Max 3 attempts then STOP and ASK.
- For prompt gen: max 150 tokens per Antigravity agent prompt.
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
- Client: Newmont Mining × Korn Ferry RPO (Costa Rica)
- Contract: CW162992 (Feb 20, 2026 – Feb 20, 2028)
- Builder: Mel John Dimat (Manila)
- Lead: Sondra Wozniak (Milwaukee)

## Critical Constraints
- ALL data LOCAL (IndexedDB + localStorage). No cloud. No server.
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
date-fns | html2canvas | jsPDF | SheetJS (xlsx)

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
  billing/         → Fee calculator (Phase 3)
  shared/          → Reusable UI (cards, charts, nav)
src/lib/           → Business logic (Antigravity generates these)
  data/            → CSV parser, IndexedDB, data service
  calc/            → SLA calculator, KPI engine, billing calc
  email/           → Email parser (Phase 2)
src/stores/        → Zustand stores (Antigravity generates these)
src/types/         → TypeScript interfaces
data/              → Raw CSV files (GITIGNORED)
docs/prompts/      → Antigravity agent prompts (Foreman generates these)

## Data Model
### Fact Tables
- fact_requisitions: 19,292 rows, 38 cols (AVAILABLE)
- fact_hold_events: 23,710 rows, 7 cols (AVAILABLE)
- fact_postings: 317 rows, 10 cols (AVAILABLE)
- fact_candidates: FUTURE (missing report)
- fact_workflow: FUTURE (missing report)

### Dimension Tables
- dim_field_mapping: 116 fields from TA_Semantic_Model_Fields.xlsx
- dim_sla_rules: SLA definitions from SOW + reportability analysis
- dim_recruiters: derived from fact_requisitions
- dim_locations: derived from fact_requisitions (13 countries)

### Key Metrics
- Total Reqs: 19,292 | Fill Rate: 73.6% | Avg TTF: 80.1d
- Cancelled: 21.1% | Open: 3.8% | On Hold: 1.1%
- Countries: 13 | TTF: CR 46d, Ghana 59d, PNG 105d, Suriname 148d, Chile 190d
- Ever On Hold: 3,127 | Currently Frozen: 390

### SLA Rules (SOW)
- Cancel fees: 0-5d=0%, 6-20d=50%, 21+=100%
- Hold >30d → eligible for cancellation + fee
- Unavailable SLAs: Time to Assign, Advertise, Brief, Shortlist, Interview,
  Screen (BGC), Offer, Assign→Intake, Intake→Agreement, Close Req 1BD,
  Offer Acceptance Rate

## Antigravity Prompt Template
When generating prompts for Antigravity agents, use this format:
---
## Agent N: [Component Name]
Path: src/[path]/[FileName].tsx
Stack: React 19 + TypeScript + [specific libs]
Input: [data source or props]
Output: [what it renders]
Constraints: max 200 lines, Shadcn/ui components, Recharts for charts
Schema: [I/O types]
---
```

---

## 8. Data Model — Star Schema

### Fact Tables (Available)

#### fact_requisitions (19,292 rows × 38 columns)
Source: `report_All_Global_REQ_New_Report_KF.csv`

Key columns (from actual CSV headers):
- Job Requisition ID, Position Title, Department, Division
- Country, City, State/Province
- Status (Filled, Cancelled, Open, On Hold)
- Recruiter Name, Hiring Manager
- Date Opened, Date Filled, Date Cancelled, Date Closed
- Time to Fill (calculated: Date Filled - Date Opened)
- Business Unit, Job Level, Employment Type
- Compensation Range Min/Max, Currency

#### fact_hold_events (23,710 rows × 7 columns)
Source: `report_On_hold_time_Audit_KF.csv`

Key columns:
- Job Requisition ID, Hold Start Date, Hold End Date
- Hold Duration (days), Hold Reason, Hold Type
- Current Status (still on hold vs released)

#### fact_postings (317 rows × 10 columns)
Source: `report_Posted_Requisitions_Global_KF.csv`

Key columns:
- Job Requisition ID, Posting Title, Posting Channel
- Post Date, Unpost Date, Posting Duration
- External URL, Status

#### fact_candidates (FUTURE — report not yet available)
#### fact_workflow (FUTURE — report not yet available)

### Dimension Tables

#### dim_field_mapping (116 fields)
Source: `TA_Semantic_Model_Fields.xlsx` (from Manuel Kassis via Sondra)

Columns:
- KF Requisition Field Name
- Suggested Back-End Reference
- Newmont Field Name [TableName.FieldName]
- Newmont Field (Manipulation Needed?)
- KF Notes
- Newmont Reportable (Yes/No/Partial)
- Newmont Comments
- KF Impact to Reporting

Coverage: 42 available / 116 total = 36.2%

#### dim_sla_rules
Source: SOW CW162992 + Sondra's SLA Reportability Analysis (March 2026)

| SLA | Target | Required Fields | Status |
|---|---|---|---|
| Time to Fill | Varies by level | Date Opened, Date Filled | ✅ Calculable |
| Time to Assign | TBD | Date Opened, Date Assigned | ❌ Cannot Calculate (no Assignment Date) |
| Time to Advertise | TBD | Date Assigned, Date Posted | ❌ Cannot Calculate (no Assignment Date) |
| Time to Brief | TBD | Date Assigned, Briefing Date | ❌ Cannot Calculate |
| Time to Shortlist | TBD | Briefing Date, Shortlist Date | ❌ Cannot Calculate |
| Time to Interview | TBD | Shortlist Date, Interview Date | ❌ Cannot Calculate |
| Time to Screen (BGC) | TBD | Offer Date, BGC Complete Date | ❌ Cannot Calculate |
| Time to Offer | TBD | Interview Date, Offer Date | ❌ Cannot Calculate |
| Offer Acceptance Rate | TBD | Offers Extended, Offers Accepted | ❌ Cannot Calculate |
| Close Req within 1 BD | 1 business day | Acceptance Date, Close Date | ❌ Cannot Calculate |
| Cancellation Rate | Benchmark | Total Reqs, Cancelled Reqs | ✅ Calculable (21.1%) |
| Fill Rate | Benchmark | Total Reqs, Filled Reqs | ✅ Calculable (73.6%) |

#### dim_recruiters (derived from fact_requisitions)
#### dim_locations (derived: 13 countries)
#### dim_job_levels (derived from fact_requisitions)

---

## 9. Key Metrics — From Actual Data

### Requisition Overview
| Metric | Value | Source |
|---|---|---|
| Total Requisitions | 19,292 | fact_requisitions row count |
| Fill Rate | 73.6% | Filled / Total |
| Average Time to Fill | 80.1 days | Mean of (Date Filled - Date Opened) |
| Cancelled | 21.1% (4,071 reqs) | Status = Cancelled / Total |
| Open | 3.8% (733 reqs) | Status = Open / Total |
| On Hold | 1.1% (212 reqs) | Status = On Hold / Total |
| Countries | 13 | Distinct Country values |

### Time to Fill by Country
| Country | Avg TTF (days) |
|---|---|
| Costa Rica | 46 |
| Ghana | 59 |
| Papua New Guinea | 105 |
| Suriname | 148 |
| Chile | 190 |

### Freeze/Hold Analysis
| Metric | Value |
|---|---|
| Total Hold Events | 23,710 |
| Reqs Ever On Hold | 3,127 |
| Currently Frozen | 390 |
| Mean Hold Duration | ~100 days |

### Field Coverage
| Category | Available | Total | Coverage |
|---|---|---|---|
| Requisition Fields | ~29 | 49 | 59.2% |
| Candidate Fields | 0 | 38 | 0% |
| Workflow/Milestone Fields | 0 | 18 | 0% |
| Posting Fields | 8 | 11 | 72.7% |
| **Overall** | **42** | **116** | **36.2%** |

### Posting Overview
| Metric | Value |
|---|---|
| Total Postings | 317 |

---

## 10. SLA Rules — From SOW (Contract CW162992)

### Cancellation Fee Schedule
| Days Since Assignment | Fee % |
|---|---|
| 0-5 days | 0% (no fee) |
| 6-20 days | 50% of placement fee |
| 21+ days | 100% of placement fee |

### Hold Rules
- Req on hold >30 days → eligible for cancellation + applicable fee
- Hold/unhold events tracked in fact_hold_events (23,710 rows)
- Multiple hold cycles possible per requisition (bounce detection)

### SLAs — Calculable vs Not Calculable

#### ✅ CALCULABLE (data available)
| SLA | Formula | Data Fields Used |
|---|---|---|
| Time to Fill | Date Filled - Date Opened | Date Opened, Date Filled |
| Fill Rate | Count(Filled) / Count(Total) | Status field |
| Cancellation Rate | Count(Cancelled) / Count(Total) | Status field |
| Hold Duration | Hold End - Hold Start | Hold events CSV |
| Reqs On Hold % | Count(On Hold) / Count(Total) | Status field |

#### ❌ CANNOT CALCULATE (data NOT available — from Sondra's May 27 analysis)

**SLAs & KPIs (11 unavailable):**
1. Time to Assign — no Assignment Date field
2. Time to Advertise — no Advertisement Date
3. Time to Brief — no Briefing Date
4. Time from Assign to Intake — no Assignment/Intake dates
5. Time from Intake to Recruitment Agreement — no Agreement date
6. Time to Shortlist — no Shortlist Date
7. Time to Interview — no Interview Date
8. Close Req within 1 Business Day of Acceptance — no Acceptance/Close dates
9. Time to Screen (BGC) — no Background Check dates
10. Time to Offer — no Offer dates
11. Offer Acceptance Rate — no Offer tracking data

**Requested Insights (3 unavailable):**
1. Candidate drop-off point / reason — no candidate pipeline data
2. Analysis of salary expectations — no salary expectation field
3. Gender breakdown — no gender field

**Billing Details (2 unavailable):**
1. Reason for req cancellation — no cancellation reason field
2. Flag for candidates that terminate ≤6 days after Start Date — no start date/termination tracking

---

## 11. Module Specifications

### Module 1: Executive Dashboard

**Purpose:** Hero KPIs at a glance + high-level status distribution

**Components:**
| File | Description |
|---|---|
| `src/components/dashboard/KPICard.tsx` | Reusable stat card (value, label, trend, color) |
| `src/components/dashboard/StatusDonut.tsx` | Recharts PieChart — Filled/Cancelled/Open/Hold |
| `src/components/dashboard/TTFByCountry.tsx` | Recharts BarChart — TTF across 13 countries |
| `src/components/dashboard/HiringTrend.tsx` | Recharts LineChart — monthly opens vs fills |
| `src/app/dashboard/page.tsx` | Page layout: 6 KPI cards + 2 charts |

**KPI Cards:**
1. Total Requisitions: 19,292
2. Fill Rate: 73.6%
3. Avg Time to Fill: 80.1 days
4. Cancellation Rate: 21.1%
5. Open Reqs: 3.8% (733)
6. Field Coverage: 36.2% (42/116)

### Module 2: Field Gap Command (THE MEETING DELIVERABLE)

**Purpose:** Show exactly which of 116 semantic model fields are available, missing, or partial

**Components:**
| File | Description |
|---|---|
| `src/components/field-gap/FieldCoverageHeatmap.tsx` | Grid/heatmap: green=available, red=missing, yellow=partial |
| `src/components/field-gap/CategorySummary.tsx` | Coverage % by category (Req, Candidate, Workflow, Posting) |
| `src/components/field-gap/FieldDetailTable.tsx` | Sortable table with all 116 fields + Newmont comments |
| `src/components/field-gap/ImpactAnalysis.tsx` | Which SLAs/KPIs are blocked by missing fields |
| `src/app/field-gap/page.tsx` | Full page layout |

**Data Source:** dim_field_mapping (parsed from TA_Semantic_Model_Fields.xlsx)

### Module 3: SLA/KPI Calculator

**Purpose:** Show which SLAs are calculable + calculate them from live data

**Components:**
| File | Description |
|---|---|
| `src/lib/calc/slaCalculator.ts` | Core SLA engine — returns value + status + reason |
| `src/components/sla/SLAMatrix.tsx` | Table: SLA name, target, actual, status (green/red) |
| `src/components/sla/ReportableCard.tsx` | Summary: X calculable / Y total |
| `src/app/sla/page.tsx` | Page layout |

### Module 4: Requisition Analytics

**Components:**
| File | Description |
|---|---|
| `src/components/req-analytics/PipelineFunnel.tsx` | Status funnel visualization |
| `src/components/req-analytics/AgingChart.tsx` | Open req aging distribution |
| `src/components/req-analytics/WorkloadTable.tsx` | Reqs per recruiter |
| `src/components/req-analytics/CountryDrilldown.tsx` | Country-level breakdown |
| `src/app/req-analytics/page.tsx` | Page layout |

### Module 5: Freeze Analysis

**Components:**
| File | Description |
|---|---|
| `src/components/freeze/HoldDurationChart.tsx` | Distribution of hold durations |
| `src/components/freeze/BounceDetector.tsx` | Reqs with multiple hold cycles |
| `src/components/freeze/FrozenPipeline.tsx` | Currently frozen reqs list |
| `src/app/freeze/page.tsx` | Page layout |

### Module 6: Posting Tracker (Phase 2)

**Components:**
| File | Description |
|---|---|
| `src/components/posting/PostingOverview.tsx` | Active vs expired postings |
| `src/components/posting/ChannelDistribution.tsx` | Postings by channel |
| `src/app/posting/page.tsx` | Page layout |

### Module 7: Email Intelligence (Phase 2)

**Components:**
| File | Description |
|---|---|
| `src/components/email/EmailParser.tsx` | Paste email → extract actions |
| `src/components/email/ActionTracker.tsx` | Action items + owners + status |
| `src/components/email/StakeholderTimeline.tsx` | Who said what when |
| `src/app/email/page.tsx` | Page layout |

### Module 8: Billing Workbench (Phase 3)

**Components:**
| File | Description |
|---|---|
| `src/components/billing/FeeCalculator.tsx` | SOW-based cancel fee calc |
| `src/components/billing/InvoicePreview.tsx` | Monthly billing projection |
| `src/app/billing/page.tsx` | Page layout |

---

## 12. Sprint Roadmap

### Wave-Based Build Plan (Foreman Model)

| Sprint | Wave | What | Agents | Claude Code | Duration |
|---|---|---|---|---|---|
| **S0** | Setup | Scaffold, install deps, create folders, port 3001 | 0 | ~2K tokens | 15 min |
| **S1** | Wave 1 | TypeScript interfaces + Data Engine + Zustand Stores | 3 parallel | ~4K tokens | 45 min |
| **S2a** | Design | Claude Design: Dashboard mockup (visual target) | 0 | 0 | 15 min |
| **S2b** | Wave 2 | Field Gap Heatmap + Exec Dashboard + SLA Calculator | 3 parallel | ~4K tokens | 45 min |
| **S3** | Wave 3 | Req Analytics + Navigation/Layout | 2 parallel | ~3K tokens | 30 min |
| **S4** | QA | Full integration, npm run build, data validation | 0 | ~5K tokens | 30 min |
| **S5** | Polish | Bug fixes, responsive, final commit, git tag | 0 | ~1K tokens | 15 min |
| **S6** | Night | Jules: Vitest tests + README + changelog | Jules async | 0 | Overnight |
| **S7** | Meeting Prep | Claude Design: one-pager, Opus: talking points | 0 | 0 | 30 min |
| **S8** | Phase 2 | Freeze Analysis + Posting Tracker + Email Intel | 3 parallel | ~4K tokens | Post-QIM |

### Timeline (Battle Plan)

```
10:15 PM  S0: Setup (Claude Code scaffolds)
          Google AI Studio: Upload CSVs, analyze column specs (PARALLEL)

10:45 PM  S1: Wave 1 (Claude Code → prompts → Antigravity builds)
          YOU: copy prompts, paste outputs

11:30 PM  S1: Integration (Claude Code wires Wave 1)

11:45 PM  S2a: Claude Design mockup (while Claude Code commits)

12:15 AM  S2b: Wave 2 (Antigravity builds dashboard/field-gap/SLA)

1:00 AM   S2b: Integration (Claude Code wires Wave 2)
          Google AI Studio: Validate SLA calculations (PARALLEL)

1:45 AM   S3: Wave 3 (Antigravity builds analytics/nav)

2:15 AM   S3: Integration + npm run build

2:45 AM   🛌 Queue Jules task → SLEEP

8:00 AM   S4: Review Jules PR, merge, QA
          Google AI Studio: Final data validation

9:30 AM   S5: Hot fixes, npm run build, git tag v5.0-mvp

10:00 AM  S7: Claude Design one-pager + Opus meeting prep

12:00 PM  Buffer for issues

2:00 PM   🎯 MEETING WITH SONDRA (Semantic Model review)
```

