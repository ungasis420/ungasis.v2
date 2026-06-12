# Newmont Intelligence Command Center — MASTER HANDOFF v3
## v6.5 | June 12, 2026 | QIM Deadline: June 18, 2026

---

# SECTION 1: PROJECT IDENTITY

| Field | Value |
|-------|-------|
| Name | Newmont Intelligence Command Center |
| Version | v6.5 (Real Data + Cleanup) |
| What | Standalone HTML dashboard — portable BI tool for Newmont RPO reporting |
| For | Corey Leuders (Newmont TA Lead) via QIM presentation June 18 |
| By | Mel John Dimat (KF Consultant, Reporting, Manila) |
| Lead | Sondra Wozniak (KF Reporting Implementation Lead, Milwaukee) |
| Contract | CW162992 — Feb 20, 2026 → Feb 20, 2028 |
| Monthly Fee | US $22,000/mo + $830/written offer acceptance |
| Path | `D:\.projects\ungasis\projects\newmont` (REAL — use for builds) |
| Junction | `D:\nmwork` (for agy CLI only — agy rejects dot-prefix paths) |
| GitHub | github.com/ungasis420/ungasis.v2 (projects/newmont/) |
| Build Output | dist/index.html — 792.6 KB standalone (file:// protocol) |

---

# SECTION 2: CURRENT STATE (v6.5)

## Commit History (latest first)
```
b2d6ce7 fix(v6.5): wire all KPIs to real-data.ts, remove invented metrics, add sample banners
71d31eb fix: remove injected instructions from CLAUDE.md
93e15ee feat: wire real CORE data into ExecutiveDashboard, remove invented metrics
1b3a60b feat: replace Field Gaps view with Candidate Pipeline, add SLA Reportability
7884a07 fix: clean scratch contamination, fix build script copy logic
d35fce4 docs: add CLAUDE.md update + autonomous build script
4eac651 docs: update CLAUDE.md with token efficiency rules + architecture map
13d97c9 docs: add context pack for AI agent grounding
1e1f6c1 chore: remove Next.js leftovers
f3c0436 fix: merge resolve config, build from real path
53e1fd5 (tag: v6.2a) feat: migrate to Vite + standalone HTML
69980a4 (tag: v6.0-mvp) fix(newmont): S4 QA pass
```

## What's DONE ✅
- Vite migration from Next.js (standalone HTML works)
- Real CSV data wired via aggregate-csv.js → real-data.ts (7.1KB)
- Executive Dashboard: 7 KPI cards with REAL numbers
- Executive Dashboard: 4 charts (Status donut, Aging bars, Function bars, Country bars)
- SLAReportability.tsx — 3-column scorecard (6 calculable, 2 pending, 9 blocked)
- CandidatePipeline.tsx — 12-stage funnel (mock data, labeled)
- SLA Calculator — interactive tool with country baselines
- Tooltip z-index fix on all 4 dashboard charts
- Sidebar counts wired to realData (729 open, 219 hold)
- Hold Analysis: invented metrics removed (Reactivation Rate, Avg Hold Duration, Reason for Hold)
- Sample data banners on Requisitions, Hold Analysis, Candidate Pipeline
- scripts/refresh.js — one-command data refresh pipeline
- scripts/aggregate-csv.js — CSV parser (zero npm deps)
- CLAUDE.md injection cleaned (commit 71d31eb)
- NEWMONT-v6.4-KICKOFF.md heredoc wrapper stripped
- Tags: v6.0-mvp, v6.2a, v6.3, v6.4, v6.5

## What's NOT Done ❌
- Dashboard trend badges still showing (+8.4%, -6.3 days) — these are INVENTED (no historical data)
- Dashboard sparkline mini-charts still visible — decorative only (no trend data)
- Requisitions table still shows mock data (fake names, fake REQ IDs)
- Candidate Pipeline data is mock (needs Reports 4+5)
- Ingestion Zone "Choose File" buttons may not be wired to live recalculation
- TTF by Country chart only shows 5 countries (mock), not all 14 from real data
- Reports 4+5 not obtained from Sondra

## Data Status Per Component

| Component | Data Source | Status |
|-----------|------------|--------|
| Executive KPIs (7 cards) | real-data.ts | ✅ REAL (19292, 73.6%, 21.1%, 78d, 729, 219, 67) |
| Status Distribution donut | real-data.ts | ✅ REAL (5 statuses) |
| By Function chart | real-data.ts | ✅ REAL (top 10 functions) |
| By Country chart | real-data.ts | ✅ REAL (14 countries) |
| Open Reqs Aging | real-data.ts | ✅ REAL (4 buckets) |
| SLA Reportability | Context Pack | ✅ GROUNDED (correct structure) |
| SLA Calculator | Hardcoded baselines | 🟡 FUNCTIONAL but baselines are estimated |
| Hold Analysis — Total + Aged 90+ | real-data.ts | ✅ REAL |
| Hold Analysis — Aging chart | real-data.ts (fallback) | 🟡 PARTIAL |
| Hold Analysis — By Country | mock-data.ts | 🟡 MOCK (labeled with banner) |
| Hold Analysis — Reasons | REMOVED | ✅ Correctly removed (no data exists) |
| Hold Analysis — Duration/Reactivation | REMOVED | ✅ Correctly removed (invented) |
| Candidate Pipeline | mock-data.ts | 🟡 MOCK (labeled with banner) |
| Requisitions table | mock-data.ts | 🟡 MOCK (labeled with banner) |
| TTF by Country | Dashboard.tsx (old mock?) | ⚠️ CHECK — may still show 5 mock countries |
| Trend badges (+8.4% etc.) | NONE | 🔴 INVENTED — must remove before QIM |
| Sparkline mini-charts | NONE | 🔴 DECORATIVE — no real trend data |

---

# SECTION 3: ARCHITECTURAL BLUEPRINT

## Entry Points
```
index.html → src/main.tsx → src/App.tsx → layout/AppShell.tsx
```

## Component Tree
```
App.tsx
├── AppShell.tsx (layout wrapper + sidebar nav with realData counts)
│   ├── Sidebar.tsx (navigation)
│   └── Main Content Area
│       ├── Dashboard.tsx (default view — orchestrator)
│       │   └── ExecutiveDashboard.tsx (7 KPI cards + 4 charts, REAL DATA)
│       ├── CandidatePipeline.tsx (12-stage funnel, MOCK + banner)
│       ├── SLAReportability.tsx (3-column scorecard, GROUNDED)
│       ├── SLACalculator.tsx (interactive calculator)
│       ├── RequisitionsView (in Views.tsx, MOCK + banner)
│       ├── HoldAnalysisView (in Views.tsx, PARTIAL real + banners)
│       └── TweaksPanel.tsx (settings)
```

## Navigation IDs (in AppShell.tsx)
```
dashboard    → Dashboard (default)
candidates   → CandidatePipelineView
sla          → SLACalculator
slareport    → SLAReportabilityView
requisitions → RequisitionsView
holds        → HoldAnalysisView
```

## Data Flow
```
CSV files (data/)
    ↓ [manual: node scripts/aggregate-csv.js]
src/lib/real-data.ts (7.1KB — pre-computed aggregates)
    ↓ [import at build time]
src/lib/data-engine.ts (getter functions with mock fallback)
    ↓ [imported by components]
Components (ExecutiveDashboard, Views, AppShell)
    ↓ [Recharts renders]
Visualizations
```

## File Structure
```
D:\.projects\ungasis\projects\newmont\
├── index.html                          (Vite entry point)
├── vite.config.ts                      (preserveSymlinks: true)
├── package.json                        (vite build scripts)
├── CLAUDE.md                           (Claude Code instructions — CLEANED)
├── AGENTS.md                           (agent notes)
├── tsconfig.json / postcss.config.mjs
│
├── data/                               (GITIGNORED — real Newmont CSVs)
│   ├── report_All_Global_REQ_New_Report_KF.csv      (10.4 MB, 19292 rows)
│   ├── report_On_hold_time_Audit_KF.csv              (2.3 MB, 23709 rows)
│   ├── report_Posted_Requisitions_Global_KF.csv      (42 KB, 316 rows)
│   └── TA Semantic Model_Fields.xlsx                  (34 KB, field reference)
│
├── scripts/
│   ├── aggregate-csv.js                (CSV → real-data.ts, zero npm deps)
│   ├── refresh.js                      (one-command: aggregate + build)
│   └── inline-build.js                 (legacy)
│
├── docs/
│   ├── NEWMONT-CONTEXT-PACK.md          (9.4 KB — AI grounding doc)
│   ├── NEWMONT-v6.4-KICKOFF.md          (cleaned — no PS wrapper)
│   ├── Newmont_v6.3_MASTER_HANDOFF.md   (superseded by this file)
│   └── prompts/
│       ├── v6.5-foreman.md              (5.4 KB — v6.5 task list)
│       ├── agy-aggregate-csv.md         (2.4 KB — agy prompt)
│       ├── claude-wire-realdata.md      (wiring prompt)
│       └── walk-away.md                 (one-liner Claude Code command)
│
├── src/
│   ├── main.tsx                         (entry)
│   ├── App.tsx                          (routing switch)
│   ├── components/
│   │   ├── Charts.tsx                   (shared chart components)
│   │   ├── Dashboard.tsx                (main dashboard orchestrator)
│   │   ├── Icons.tsx                    (icon components)
│   │   ├── SLACalculator.tsx            (interactive SLA calc)
│   │   ├── TweaksPanel.tsx              (settings panel)
│   │   ├── Views.tsx                    (RequisitionsView + HoldAnalysisView + wrappers)
│   │   ├── layout/
│   │   │   ├── AppShell.tsx             (layout + nav, counts from realData)
│   │   │   └── Sidebar.tsx              (sidebar nav)
│   │   └── modules/
│   │       ├── ExecutiveDashboard.tsx    (7 KPIs + 4 charts, REAL DATA)
│   │       ├── SLAReportability.tsx      (scorecard)
│   │       ├── CandidatePipeline.tsx     (mock + banner)
│   │       └── ReqAnalytics.tsx          (analytics)
│   ├── lib/
│   │   ├── real-data.ts                 (7.1 KB — AUTO-GENERATED, DO NOT EDIT)
│   │   ├── data-engine.ts              (CSV parsing + getReal* functions)
│   │   ├── mock-data.ts                 (fallback data)
│   │   └── field-gap-data.ts            (field definitions)
│   ├── stores/
│   │   └── dashboard.ts                 (Zustand store)
│   ├── styles/
│   │   ├── design-tokens.ts
│   │   └── globals.css                  (Tailwind + custom)
│   └── types/
│       └── newmont.ts                   (TS types)
│
└── dist/
    └── index.html                       (792.6 KB — standalone build)
```

---

# SECTION 4: BUILD SPECS

| Spec | Value |
|------|-------|
| Framework | React 19 |
| Language | TypeScript 5.8 |
| Bundler | Vite 8.0.16 + vite-plugin-singlefile |
| CSS | Tailwind 4 + PostCSS |
| State | Zustand |
| Charts | Recharts |
| CSV Parser | PapaParse (runtime) + custom Node parser (build-time) |
| Excel | xlsx |
| PDF | jsPDF + html2canvas |
| Search | Fuse.js |
| Offline DB | Dexie (IndexedDB) |
| Dates | date-fns |
| Build Command | `npm run build` from `D:\.projects\ungasis\projects\newmont` |
| Dev Server | `npm run dev` |
| Data Refresh | `node scripts/refresh.js` (aggregate + build) |
| Deploy | file:// protocol — no server needed |

---

# SECTION 5: DATA ARCHITECTURE

## CORE Reports (Manuel Kassis, April 2026)

| # | Report | File | Rows | Cols | In Project? |
|---|--------|------|------|------|-------------|
| 1 | All_Global REQ | report_All_Global_REQ_New_Report_KF.csv | 19,292 | 38 | ✅ YES |
| 2 | Posted_Requisitions | report_Posted_Requisitions_Global_KF.csv | 316 | 10 | ✅ YES |
| 3 | On hold time_Audit | report_On_hold_time_Audit_KF.csv | 23,709 | 7 | ✅ YES |
| 4 | Global Candidates | — | — | — | ❌ Need from Sondra |
| 5 | Applicants_Workflow_Dates | — | — | — | ❌ Need from Sondra |

## Report 1 Columns (38)
```
Job Req ID, Requisition Status, Candidate Progress, Job Title,
SAP Position ID, Position Subtype, Business Unit, Function,
Job Location (trailing space), Location, Location (trailing space),
Onsite/Remote Position, Union Bid, Pay Grade, Pay Scale Group,
Pay Scale Level, Talent Acquisition First Name, Talent Acquisition Last Name,
Hiring Manager First name, Hiring Manager Last Name,
Direct Supervisor First Name, Direct Supervisor Last Name,
Date Created, Approved Date, Closed Date, Age,
Reason for Requisition, Is this position budgeted?,
Will this position have direct reports?, Openings Filled, Time to Fill,
Career Site Filter Country, ELT Member, Notes, Template Name,
Maximum Annual Base Salary, Mid-Point Annual Base Salary,
Minimum Annual Base Salary
```

## Report 2 Columns (10)
```
Job Req ID, Job Title, Location, Board ID, Post End Date,
Posting Start Date (Timestamp), Posting Status,
Talent Acquisition First Name, Talent Acquisition Last Name,
Post Expiration Date
```

## Report 3 Columns (7)
```
Job Req ID, Requisition Status, Created Date (Timestamp),
Closed Date, Job Title, Talent Acquisition First Name,
Talent Acquisition Last Name
```
⚠️ NO freeze/unfreeze dates — hold duration cannot be calculated

## Verified Metrics (Source of Truth)

| KPI | Value | Source |
|-----|-------|--------|
| Total Requisitions | 19,292 | Report 1 row count |
| Unique Req IDs | 18,935 | Distinct Job Req ID |
| Filled | 14,205 (73.6%) | Status = Filled |
| Cancelled | 4,072 (21.1%) | Status = Cancelled |
| Open | 729 (3.8%) | Status = Open |
| On Hold | 219 (1.1%) | Status = On Hold |
| Pending Approval | 67 (0.3%) | Status = Pending Approval |
| Avg TTF | 78.0 days | Mean of Time to Fill column (14,199 values) |
| Median TTF | 62.9 days | Middle value |
| TTF Range | 0 – 1,343.4 days | Min/Max |
| Countries | 14 | AU, CA, GH, US, AR, SR, PG, MX, PE, CR, CL, GF, GT + 746 blank |
| Top Function | Mine Operations (4,530) | 15+ functions total |
| Posted Reqs | 316 | Report 2 |
| Hold Records | 23,709 | Report 3 |

## real-data.ts Schema
```typescript
export const realData = {
  generatedAt: string,
  totalRequisitions: number,      // 19292
  uniqueReqIds: number,           // 18935
  statusDistribution: {
    filled: number,               // 14205
    cancelled: number,            // 4072
    open: number,                 // 729
    onHold: number,               // 219
    pendingApproval: number,      // 67
  },
  fillRate: number,               // 73.6
  cancelRate: number,             // 21.1
  timeToFill: {
    average: number,              // 78.0
    median: number,               // 62.9
    min: number,                  // 0
    max: number,                  // 1343.4
    count: number,                // 14199
  },
  byFunction: Array<{name: string, count: number}>,   // sorted desc
  byCountry: Array<{name: string, count: number}>,     // sorted desc, blanks = "Unspecified"
  byEltMember: Array<{name: string, count: number}>,   // sorted desc
  byBusinessUnit: Array<{name: string, count: number}>, // sorted desc
  postings: {
    total: number,                // 316
    byStatus: Array<{name: string, count: number}>,
  },
  holds: {
    totalRecords: number,         // 23709
    uniqueReqIds: number,
  },
  openReqsAging: {
    under30: number,
    between30and60: number,
    between60and90: number,
    over90: number,
  },
} as const;
```

---

# SECTION 6: DESIGN SYSTEM

## Colors (ALL as inline hex — never Tailwind classes)

| Token | Hex | Use |
|-------|-----|-----|
| Background | #0a0a1a | Page background |
| Accent | #00d4ff | Headers, highlights, links |
| Secondary | #a78bfa | Secondary accents |
| Success | #22c55e | Positive metrics, fill rate |
| Warning | #f59e0b | Watch metrics, sample banners |
| Danger | #ef4444 | Negative metrics, cancel rate |
| Glass bg | rgba(255,255,255,0.04) | Card backgrounds |
| Glass border | rgba(255,255,255,0.10) | Card borders |
| Banner bg | #1e293b | Sample data banner background |

## Sample Banner Recipe
```css
background: #1e293b;
border: 1px solid #f59e0b;
color: #f59e0b;
padding: 8px 16px;
border-radius: 8px;
font-size: 14px;
text-align: center;
margin-bottom: 16px;
```

## Glassmorphism Card Recipe
```css
background: rgba(255,255,255,0.04);
backdrop-filter: blur(18px);
border: 1px solid rgba(255,255,255,0.10);
border-radius: 1rem;
padding: 1.5rem;
```

---

# SECTION 7: SLA REPORTABILITY

## CALCULABLE (6)

| SLA | Formula | SOW Target |
|-----|---------|------------|
| Time to Fill | Approved Date → Offer Accept Date (minus hold) | ≤50 cal days |
| Fill Rate | Openings Filled ÷ Total Openings | — |
| Cancel Rate | Cancelled ÷ Total Reqs | — |
| Hold Duration | UnFreeze Date − Freeze Date | — |
| Pipeline Stage Times | Workflow status dates per stage | — |
| Req Aging | Today − Created Date (open reqs) | 60-day trigger |

## PENDING (2)

| SLA | Workaround |
|-----|------------|
| Time to Offer | Use Offer Created Date |
| Offer Acceptance Rate | Same workaround |

## BLOCKED (9)

| SLA | Missing Field |
|-----|---------------|
| Time to Assign | Intake Meeting Date |
| Time to Advertise | KF Assigned Date |
| Time to Brief | Intake Meeting Date |
| Assign to Intake | Both dates |
| Intake to RA | Both dates |
| Time to Shortlist | Req Shortlist Date |
| Time to Interview | KF Assigned flag |
| Close Req 1BD | Job Req Fill Date |
| Time to Screen BGC | BGC Init/Complete Dates |

---

# SECTION 8: STAKEHOLDERS

## Newmont (Client)

| Name | Role | Key Info |
|------|------|----------|
| Corey Leuders | TA Lead, QIM audience | Dissatisfied with reporting gaps |
| Manuel Kassis | People Analytics | Created 5 CORE reports |
| Doug Rolwood | PBI Workspace admin | KF cannot access semantic model |
| Megan Heffernan | Advisor TA Global (Melbourne) | Access coordination |
| Darren Hewitt | Prior contractor | "Darren reports" benchmark — DO NOT share KF info |

## Korn Ferry

| Name | Role |
|------|------|
| Sondra Wozniak | Reporting Implementation Lead, v4 xlsx owner |
| Marco Garza | Director of Operations, QIM prep initiator |
| Patricia Helbig ("Patti") | QIM presenter |
| Mel John Dimat | Dashboard developer |
| Marvin Alfaro | Implementation PM |
| Lizbeth Garcia | Operations coordinator |

## Latest Intel (June 12)
- Lizbeth flagged that Corey insists Sondra contact the Canadian RPO reporting analyst for benchmarking
- Patti is counting on the dashboard for QIM: "if you can access the info, provide it for the QIM"
- Sondra confirmed she and Mel will review the semantic model
- QIM meeting may be June 19 (not 18) — verify with Lizbeth

---

# SECTION 9: ROADMAP

| Sprint | Target | Deliverable | Status |
|--------|--------|-------------|--------|
| v6.0-mvp | June 8 | Next.js dashboard, 4 views | ✅ DONE |
| v6.1 | June 10 | Visual alignment (12 TSX from Claude Design) | ✅ DONE |
| v6.2a | June 12 | Vite migration, standalone HTML | ✅ DONE |
| v6.3 | June 12 | SLA Reportability + Candidate Pipeline | ✅ DONE |
| v6.4 | June 12 | Wire real CSV data → Executive Dashboard | ✅ DONE |
| v6.5 | June 12 | Clean invented metrics, add banners, refresh.js | ✅ DONE |
| **v6.6** | **June 13** | **Remove trend badges/sparklines, wire TTF by Country to real data** | 🔲 P0 |
| **v6.7** | **June 14-15** | **Wire Ingestion Zone for runtime CSV reload** | 🔲 P0 |
| **v6.8** | **June 16** | **QIM presentation polish** | 🔲 P1 |
| **v6.9** | **June 17** | **Sondra review + sign-off** | 🔲 P1 |
| **🎯 QIM** | **June 18** | **Present to Corey** | 🔲 |
| v7.0 | Post-QIM | Wire Reports 4+5, cross-data intelligence engine | 🔲 |
| v7.5 | July | In-browser knowledge graph (Graphology.js) | 🔲 |
| v8.0 | August | Natural language query via API, predictive TTF | 🔲 |
| v9.0 | September | Full RAG, vector search, anomaly alerts | 🔲 |

---

# SECTION 10: OPERATIONAL PIPELINE

## Daily Data Refresh Workflow
```
1. Get new CSVs from Newmont CORE (SuccessFactors)
2. Drop them into data/ folder (replace old ones)
3. Run one command:
   cd "D:\.projects\ungasis\projects\newmont"
   node scripts/refresh.js
4. Open dist/index.html in Chrome
5. Done — real numbers updated
```

## Build Commands
```powershell
# ALWAYS build from real path, NEVER from junction
cd "D:\.projects\ungasis\projects\newmont"
npm run dev        # Dev server
npm run build      # Production → dist/index.html
npm run preview    # Preview production build
node scripts/refresh.js          # Full data refresh + build
node scripts/aggregate-csv.js    # Just regenerate real-data.ts
```

## Path Rules (CRITICAL)

| Action | Path |
|--------|------|
| npm run build | `D:\.projects\ungasis\projects\newmont` (REAL) |
| agy CLI | `D:\nmwork` (junction — agy rejects dot-prefix) |
| Claude Code | Either works |
| git | Either works |
| vite.config.ts | Has `preserveSymlinks: true` (DO NOT REMOVE) |

---

# SECTION 11: AI AGENT WORKFLOW

## Pipeline Architecture
```
M365 Copilot (Architect — Mel)
    │ plans, analyzes, generates prompts
    ▼
Prompt Files (docs/prompts/*.md)
    │ contain task instructions
    ▼
┌───────────────────────────┐
│   WAVE 1: agy Workers     │  ($0, parallel)
│   Generate new files       │
│   One file per prompt      │
└─────────────┬─────────────┘
              ▼
┌───────────────────────────┐
│   WAVE 2: Claude Code      │  (Claude Pro tokens)
│   Foreman — integrate,     │
│   fix imports, build, git  │
└─────────────┬─────────────┘
              ▼
┌───────────────────────────┐
│   WAVE 3: Verify           │
│   Check dist/ + components │
│   Visual QA in browser     │
└───────────────────────────┘
```

## Agent Configurations

### M365 Copilot (Claude Opus) — ARCHITECT

| Field | Value |
|-------|-------|
| Persona | 🧑‍🍳 Head chef — designs the menu, plans the kitchen |
| Role | Planning, analysis, prompt generation, enterprise search |
| Skills | Context pack updates, field mapping, handoff docs, stakeholder intel |
| Cost | Company provided |
| Best for | Strategy, grounding, prompt crafting |

### agy CLI (Gemini 3.5 Flash) — BUILDER

| Field | Value |
|-------|-------|
| Persona | 🍳 Line cook — builds one dish (file) at a time |
| Role | Generate new files (components, scripts, data files) |
| Skills | React/TS generation, Node.js scripts, Recharts charts |
| Cost | **$0** (free tier) |
| Invoke | `agy --add-dir D:\nmwork --prompt "<prompt>"` |
| Rules | One file per prompt. No git. No modifying other files. |
| Best for | New file creation, parallel generation (3+ files) |

### Claude Code (Sonnet 4.6) — FOREMAN

| Field | Value |
|-------|-------|
| Persona | 🔧 Sous chef — plates, integrates, quality checks |
| Role | Read existing code, surgical edits, import wiring, build, git |
| Skills | Multi-file edits, TypeScript fixes, npm build, git operations |
| Cost | Claude Pro tokens (~15-25K per session) |
| Invoke | `claude --dangerously-skip-permissions -p "<prompt>"` |
| Config | CLAUDE.md in project root |
| Rules | Read CLAUDE.md first. Surgical edits only. 3-attempt max. One commit. |
| Best for | Integration, bug fixes, multi-file coordination |
| Max turns | 10-15 (prevent token runaway) |

### Claude Cowork — BACKGROUND WORKER

| Field | Value |
|-------|-------|
| Persona | 🌙 Night shift crew |
| Role | Bulk fixes, TS cleanup, import organization |
| Invoke | VS Code → Claude: Start Cowork Session |
| Best for | "Fix all TS errors", "organize imports", "update all mock labels" |

### Antigravity Agent Manager — PARALLEL COORDINATOR

| Field | Value |
|-------|-------|
| Role | Run 3+ agy agents in parallel for new file generation |
| Cost | $0 |
| Invoke | Antigravity Desktop GUI |
| Best for | Sprint waves with multiple new components |

---

# SECTION 12: TOKEN EFFICIENCY PROTOCOL

## The 7 Rules
1. **Context from FILE, not prompt** — "Read docs/NEWMONT-CONTEXT-PACK.md" (~200 tokens vs ~8000)
2. **Surgical edits ONLY** — never rewrite entire files
3. **Stop after 3 failed attempts** — report error, let user decide
4. **No clarification loops** — assume from context pack, note choices
5. **One commit per task** — all work then one git commit
6. **Minimal console output** — use Read tool, not cat/type
7. **agy for generation, Claude for integration** — $0 generation, paid integration only

## Token Budget Per Sprint

| Activity | agy (Free) | Claude Code | M365 Copilot |
|----------|-----------|-------------|--------------|
| Generate components | $0 | 0 | 0 |
| Integrate + build | 0 | ~15-25K | 0 |
| Planning | 0 | 0 | ~2K |

---

# SECTION 13: KNOWN ISSUES

| Issue | Severity | Fix In |
|-------|----------|--------|
| Trend badges (+8.4%, -6.3 days etc.) are INVENTED | 🔴 | v6.6 |
| Sparkline mini-charts are decorative (no data) | 🔴 | v6.6 |
| TTF by Country may still show 5 mock countries | 🟡 | v6.6 |
| Requisitions table shows fake names/IDs | 🟡 | v6.7 (Ingestion Zone) |
| Ingestion Zone "Choose File" may not recalculate live | 🟡 | v6.7 |
| 746 CSVs have blank country (3.9%) | 🟢 | Grouped as "Unspecified" |
| TTF max outlier: 1,343 days (3.7 years) | 🟢 | Show median too |
| Hold Duration still listed as "Calculable" in SLA scorecard | 🟡 | v6.6 — Report 3 has no duration data |

---

# SECTION 14: CONSTRAINTS & RULES

## Data Rules
- NEVER store raw Newmont data in KF systems
- Label mock data: "Sample data — pending CORE export"
- Use Function field for job categories (NOT invented names)
- 13+ countries: CRI, GHA, PNG, SUR, CHL, PER, AUS, DOM, MEX, CAN, USA, ECU, ARG

## Visual Rules
- ALL colors as inline hex (never Tailwind color classes)
- Font: Inter (system-ui fallback), tabular-nums for numbers
- Glass cards: bg rgba(255,255,255,0.04) backdrop-blur-xl

## Build Rules
- Build from REAL path: `D:\.projects\ungasis\projects\newmont`
- agy uses junction `D:\nmwork` only
- Never let agy run git commands
- preserveSymlinks: true in vite.config.ts (DO NOT REMOVE)

## What NOT to Build
- NO Coverage Intelligence / Sourcing Coverage (no field supports this)
- NO Hold Reasons (no Hold_Reason field exists)
- NO Reactivation Rate (no field tracks transitions)
- NO Hold Duration from Report 3 (no freeze/unfreeze dates in CSV)
- NO invented trend badges without historical data

---

# SECTION 15: ADVANCED INTELLIGENCE ROADMAP

## Level 1: Mirror (Current — v6.5)
Shows numbers directly from data. "Fill rate is 73.6%"

## Level 2: Lens (v7.0-7.5)
Cross-references data to find patterns automatically:
- Reqs that are Open but NOT posted (gap detection)
- Recruiters with highest/lowest fill rates
- Countries where TTF exceeds SLA target
- Functions with high cancel rates
- Implementation: add `insights[]` array to aggregate-csv.js output

## Level 3: Brain (v8.0-9.0)
Predicts and advises:
- Knowledge Graph (Graphology.js — runs in browser)
- Vector embeddings for job title similarity (Transformers.js)
- Natural language queries via LLM API (Groq/OpenRouter)
- Anomaly detection with z-scores
- RAG search over all requisition data

---

# SECTION 16: KICKOFF PROMPT (Fresh M365 Copilot Chat)

```
# Newmont Command Center — Continuing v6.6+

## Status
- v6.5 COMPLETE (commit b2d6ce7), build 792.6KB
- Real data wired: 19292 reqs, 73.6% fill, 21.1% cancel, 78d TTF
- Invented metrics removed (Hold Reasons, Reactivation Rate, Avg Hold Duration)
- Sample banners on all mock sections
- scripts/refresh.js pipeline working
- CLAUDE.md injection fixed
- Tags pushed: v6.3, v6.4, v6.5

## Project Path
D:\.projects\ungasis\projects\newmont (GitHub: ungasis420/ungasis.v2)

## Context Files (attach or reference)
- docs/NEWMONT-CONTEXT-PACK.md — field mappings, SLA data
- This handoff document

## Immediate Priority (QIM June 18)
1. REMOVE trend badges (+8.4%, +2.1pts, -6.3days) — NO historical data
2. REMOVE sparkline mini-charts — decorative only
3. Wire TTF by Country chart to realData.byCountry (currently may show mock)
4. Verify Hold Duration SLA is marked correctly (Report 3 has no duration data)
5. Wire Ingestion Zone for runtime CSV reload
6. QIM presentation polish

## Constraints
- All colors inline hex, never Tailwind classes
- agy ($0) for generation, Claude Code for integration
- Token target: <25K per Claude Code session
- Build from real path only
```

---

# SECTION 17: CLAUDE CODE KICKOFF PROMPT (v6.6)

```
Read CLAUDE.md and docs/NEWMONT-CONTEXT-PACK.md.
TASK: v6.6 final QIM data cleanup.

1. Find and remove ALL trend badges from the dashboard:
   - Any element showing "+8.4%", "+2.1 pts", "-6.3 days", "+0.4 pts"
   - Replace with simple subtitle: "all-time" or "current period"
2. Find and remove ALL sparkline/mini-chart decorations from KPI cards
3. Verify the TTF by Country chart in Dashboard.tsx reads from realData
   - If it uses mock data (CRI 46d, GHA 59d, etc.), replace with realData.byCountry
4. In SLAReportability.tsx: if Hold Duration is listed as "Calculable",
   move it to "Blocked" with note "Report 3 missing freeze/unfreeze dates"
5. npm run build from D:\.projects\ungasis\projects\newmont
6. git add -A && git commit -m "fix(v6.6): remove trend badges, wire TTF by country, fix SLA scorecard"

Surgical edits only. Max 3 retries.
```

---

# SECTION 18: SESSION LOG — June 12, 2026

| Time | Action | Result |
|------|--------|--------|
| ~09:00 | Started fresh session with v6.3 handoff | Context loaded |
| ~09:15 | Discovered CSV filenames differ from docs | Fixed: found real names |
| ~09:20 | Read all 3 CSV headers + row counts | 19292 rows, 38 cols confirmed |
| ~09:30 | Explored data: status counts, TTF, functions, countries | All benchmarks matched |
| ~09:45 | Created agy prompt for aggregate-csv.js | docs/prompts/agy-aggregate-csv.md |
| ~10:00 | agy built aggregate-csv.js + generated real-data.ts | 7.1KB, all numbers verified |
| ~10:10 | Claude Code v6.4: wired real data to ExecutiveDashboard | Commit 93e15ee |
| ~10:30 | Visual QA: found mismatches (TTF 80.1≠78, Open 733≠729, Hold 212≠219) | Multiple issues logged |
| ~10:40 | Found Hold Analysis still has ALL invented metrics | Foreman v6.5 prompt created |
| ~10:50 | agy cleaned NEWMONT-v6.4-KICKOFF.md heredoc wrapper | ✅ Done ($0) |
| ~11:00 | Claude Code v6.5: CLAUDE.md injection found + fixed | Commit 71d31eb |
| ~11:10 | Claude Code v6.5: all 6 tasks completed | Commit b2d6ce7, 792.6KB |

## Key Lessons Learned
- PowerShell heredocs with `<` inside can inject content into wrong files
- `Get-Content` line count ≠ CSV row count (multi-line Notes field)
- pre-aggregate approach keeps dist/index.html small (~800KB vs ~12MB)
- Claude Code correctly flags security anomalies in project files
- Report 3 has NO freeze/unfreeze dates despite handoff claiming otherwise
- Always verify dashboard numbers against real-data.ts after each build

---

*End of Master Handoff v3 — Newmont v6.5*
*Generated: June 12, 2026*
*Next review: After QIM (June 18, 2026)*
*Owner: Mel John Dimat*
