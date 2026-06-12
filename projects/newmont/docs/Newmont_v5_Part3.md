# NEWMONT v5.0 — PART 3: SECTIONS 13-24

---

## 13. File & Folder Structure

```
D:\.projects\ungasis\projects\newmont\
├── CLAUDE.md                          ← Foreman rules (auto-loaded by Claude Code)
├── next.config.js                     ← port 3001, static export
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── .gitignore                         ← includes data/
├── data/                              ← RAW CSV/XLSX FILES (GITIGNORED)
│   ├── All_Global_REQ_New_Report_KF.csv
│   ├── On_hold_time_Audit_KF.csv
│   ├── Posted_Requisitions_Global_KF.csv
│   └── TA_Semantic_Model_Fields.xlsx
├── docs/
│   ├── prompts/                       ← Claude Code generates these
│   │   ├── wave-1.md
│   │   ├── wave-2.md
│   │   └── wave-3.md
│   ├── data-analysis.json             ← Google AI Studio output
│   └── meeting-prep/
│       └── one-pager.pdf              ← Claude Design output
├── src/
│   ├── app/                           ← Next.js App Router pages
│   │   ├── layout.tsx                 ← Root layout with sidebar nav
│   │   ├── page.tsx                   ← Redirect to /dashboard
│   │   ├── dashboard/page.tsx
│   │   ├── field-gap/page.tsx
│   │   ├── sla/page.tsx
│   │   ├── req-analytics/page.tsx
│   │   ├── freeze/page.tsx
│   │   ├── posting/page.tsx           ← Phase 2
│   │   ├── email/page.tsx             ← Phase 2
│   │   └── billing/page.tsx           ← Phase 3
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── KPICard.tsx
│   │   │   ├── StatusDonut.tsx
│   │   │   ├── TTFByCountry.tsx
│   │   │   └── HiringTrend.tsx
│   │   ├── field-gap/
│   │   │   ├── FieldCoverageHeatmap.tsx
│   │   │   ├── CategorySummary.tsx
│   │   │   ├── FieldDetailTable.tsx
│   │   │   └── ImpactAnalysis.tsx
│   │   ├── sla/
│   │   │   ├── SLAMatrix.tsx
│   │   │   ├── ReportableCard.tsx
│   │   │   └── SLADetailCard.tsx
│   │   ├── req-analytics/
│   │   │   ├── PipelineFunnel.tsx
│   │   │   ├── AgingChart.tsx
│   │   │   ├── WorkloadTable.tsx
│   │   │   └── CountryDrilldown.tsx
│   │   ├── freeze/
│   │   │   ├── HoldDurationChart.tsx
│   │   │   ├── BounceDetector.tsx
│   │   │   └── FrozenPipeline.tsx
│   │   ├── posting/                   ← Phase 2
│   │   ├── email/                     ← Phase 2
│   │   ├── billing/                   ← Phase 3
│   │   └── shared/
│   │       ├── Sidebar.tsx
│   │       ├── PageHeader.tsx
│   │       ├── DataImport.tsx
│   │       ├── ExportButton.tsx
│   │       ├── SearchBar.tsx
│   │       └── FilterPanel.tsx
│   ├── lib/
│   │   ├── data/
│   │   │   ├── csvParser.ts
│   │   │   ├── db.ts                  ← Dexie.js schema
│   │   │   └── dataService.ts
│   │   ├── calc/
│   │   │   ├── slaCalculator.ts
│   │   │   ├── kpiEngine.ts
│   │   │   └── billingCalculator.ts   ← Phase 3
│   │   └── email/
│   │       └── emailParser.ts         ← Phase 2
│   ├── stores/
│   │   ├── dataStore.ts
│   │   ├── uiStore.ts
│   │   └── emailStore.ts             ← Phase 2
│   └── types/
│       └── index.ts
└── dist/                              ← Static export output (after build)
```

---

## 14. Design System — Glassmorphism DNA

### Color Tokens

```css
/* Base Palette */
--nm-bg-primary: #0a0a1a;           /* Deep space black */
--nm-bg-card: rgba(255,255,255,0.05); /* Glass card */
--nm-bg-card-hover: rgba(255,255,255,0.08);
--nm-border: rgba(255,255,255,0.1);  /* Subtle glass edge */

/* Accent Colors */
--nm-accent-cyan: #00d4ff;           /* Primary accent */
--nm-accent-purple: #a78bfa;         /* Secondary accent */
--nm-accent-green: #34d399;          /* Positive / Available */
--nm-accent-red: #f87171;            /* Negative / Missing */
--nm-accent-yellow: #fbbf24;         /* Warning / Partial */
--nm-accent-orange: #fb923c;         /* Alert */

/* Text */
--nm-text-primary: #f1f5f9;          /* High contrast */
--nm-text-secondary: #94a3b8;        /* Subdued */
--nm-text-muted: #64748b;            /* Disabled/hint */

/* Brand */
--nm-newmont-gold: #C5A34F;          /* Newmont brand gold */
--nm-kf-blue: #003B71;               /* Korn Ferry brand blue */
```

### Glassmorphism Rules

- Cards: `bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl`
- Hover: `hover:bg-white/8 transition-all duration-300`
- Shadows: `shadow-lg shadow-black/20`
- All text ≥ 12px for readability
- Charts inherit accent colors
- Dark theme ONLY (matches executive dashboard aesthetic)

---

## 15. Critical Constraints

| # | Constraint | Impact |
|---|---|---|
| 1 | **ALL data LOCAL.** IndexedDB + localStorage. Zero cloud storage. | No network calls in code |
| 2 | **Newmont IP per MSA §8.** All deliverables are work-for-hire. | Cannot publish, share externally, or use in portfolio without written approval |
| 3 | **36% field coverage.** 42 of 116 fields available. | Every module must gracefully handle "Cannot Calculate" states |
| 4 | **2 of 5 reports missing.** Candidates + Workflow Dates not available. | Design placeholder modules with "Data Not Yet Available" |
| 5 | **Static export.** `next build` → `out/` folder. Must work as file:// | No server-side features, no API routes, no dynamic SSR |
| 6 | **Port 3001.** RiftCoach uses 3000. | Set in next.config.js |
| 7 | **data/ folder GITIGNORED.** Never commit CSV files. | Client data never in version control |
| 8 | **Max 200 lines per file.** Split if longer. | Enforced by CLAUDE.md rules |
| 9 | **No data export without approval.** Cannot generate files that leave Newmont's data boundary. | Export features generate LOCAL files only (download to user's machine) |
| 10 | **Newmont-only environment.** KF cannot use Foresight or KF PowerBI for this account. | All reporting built inside Newmont's tools or this offline SPA |

---

## 16. Stakeholder Directory

### Korn Ferry Team

| Name | Role | Location | Relevance |
|---|---|---|---|
| **Sondra Wozniak** | Reporting Implementation & CI Lead | Milwaukee, USA | Primary lead. Reviews all reporting. Currently back in office (was OOO unexpectedly). Meeting Jun 11 2PM for semantic model review. |
| **Mel John Dimat** | Consultant, Reporting | Manila, Philippines | Builder. Has Newmont system access (mel.dimat@newmont.com). |
| **Marvin Alfaro** | Implementation Project Manager | Costa Rica | Buffer for client communications. Routes meetings. |
| **Patricia Helbig (Patty)** | Director, TA Operations | Costa Rica | Oversees headcount and contract discussions. Stepping in while Sondra was out. |
| **Marco Garza** | Director of Operations | Monterrey, Mexico | Primary ops contact. Relayed Corey's concerns about reporting capabilities. |
| **Lizbeth Garcia** | Senior TA Professional | Costa Rica | Account knowledge. Scheduled QIM meetings. Suggested contacting Canada RPO analyst ("Darren reports"). |
| **Jaime Lopez** | TA Team | Costa Rica | Assessment interviews coordination. QIM scheduling with Liz Cardona. |
| **Kurt Leander Helmuth** | Mel's Manager | — | Escalation path. Support during Sondra's absence. |
| **Montse Pakan** | Skip Manager | — | Secondary escalation. |

### Newmont Team

| Name | Role | Location | Relevance |
|---|---|---|---|
| **Corey Leuders** | KF Client Director / TA Lead | — | Primary stakeholder. Process-driven. Expects QIM one week after quarter close. Was on PTO until Jun 18. Expressed concern about reporting gaps. Willing to pull some data himself. |
| **Manuel Kassis** | PowerBI / Data & Analytics | Costa Rica | Created custom CORE reports. Provided semantic model access + field mapping XLSX. Key technical contact for data questions. |
| **Megan Heffernan** | Reporting CoE Manager | Australia | Granted Mel + Sondra system access. Handles admin/access requests. |
| **Doug Rolwood** | IT / HRIS | — | Semantic model permissions. Controls PowerBI workspace access. Has not yet granted full Build-level access. |

### External Reference

| Name | Role | Notes |
|---|---|---|
| **Darren Hewitt** | Contractor (other RPO) | Built Newmont's existing PowerBI dashboards. Can answer technical data questions. Do NOT share KF information with him. |

---

## 17. Key Dates & Deadlines

| Date | Event | Details |
|---|---|---|
| **Jun 11, 2026 2:00 PM** | Newmont Semantic Model review | 🔴 TODAY — Sondra × Mel. Teams call. Review field mapping, determine what's calculable. |
| **Jun 18, 2026 (morning)** | QIM Presentation | First QIM for Newmont. Must present with available data. Corey expects full metrics. |
| **Jun 18, 2026 (afternoon)** | Meeting with Corey | Discussion on reporting gaps and path forward. |
| **Jun 20, 2026 5:30 AM** | Newmont Reporting | Recurring meeting (Lizbeth Garcia organizer). Sondra, Patty, Marco, Jaime, Mel (optional), Marvin (optional). |
| **Feb 20, 2028** | Contract End | CW162992 term expiration. |

### Reporting Context Timeline

```
Jan-Mar 2026: Legal delays (data ownership, IP discussions)
Apr 2026:     Newmont decides: NO KF PowerBI/Foresight. All data stays in Newmont env.
Apr 22, 2026: Mel + Sondra get Newmont system access
May 18, 2026: Megan confirms logins. Mel accesses CORE + PBI.
May 27, 2026: Sondra discovers TA Dashboard link broken. Requests field mapping.
May 28, 2026: Manuel updates dashboard link. Discusses semantic model with Doug.
Jun 1, 2026:  Manuel creates CORE reports, shares semantic model + XLSX mapping.
Jun 2, 2026:  Marco emails team: Corey wants QIM on time, concerned about KF gaps.
Jun 8, 2026:  Marco escalates: Corey says other RPOs CAN extract data. Wants alignment.
Jun 10, 2026: Sondra returns. Says Manuel sent notes. Will review semantic model with Mel.
Jun 11, 2026: Lizbeth suggests contacting Canada RPO analyst for comparison.
Jun 11, 2026: 🔴 TODAY — Semantic model review meeting (2 PM)
```

---

## 18. Handoff Prompt — For Fresh M365 Opus Window

> Copy-paste this ENTIRE block into a new M365 Copilot chat:

```
# NEWMONT INTELLIGENCE COMMAND CENTER v5.0 — BUILD SESSION

## YOUR ROLE
You are my sr co-developer and co-architect for the Newmont Command Center v5.0.
Polymath full-stack architect-engineer. Simple English. Kitchen analogies.
Explain WHY not just what. Wait for "done" before moving to next task.

## PROJECT IDENTITY
- Client: Newmont Mining × Korn Ferry RPO (Costa Rica)
- Contract: CW162992 (Feb 2026 – Feb 2028)
- Builder: Mel John Dimat (Manila) | Lead: Sondra Wozniak (Milwaukee)
- Type: Portable offline-first SPA (no backend, no cloud)
- Data Posture: ALL data LOCAL (IndexedDB). Newmont IP per MSA §8.
- Repository: D:\.projects\ungasis\projects\newmont\
- Port: localhost:3001

## TECH STACK
Next.js 15 | React 19 | TypeScript 5.8 | Tailwind CSS 4 | Shadcn/ui
Zustand 5 | Recharts | Papa Parse | Dexie.js | Fuse.js | date-fns | xlsx

## DATA MODEL
- fact_requisitions: 19,292 rows × 38 cols — AVAILABLE
- fact_hold_events: 23,710 rows × 7 cols — AVAILABLE
- fact_postings: 317 rows × 10 cols — AVAILABLE
- fact_candidates: FUTURE (missing report)
- fact_workflow: FUTURE (missing report)
- dim_field_mapping: 116 fields (42 available = 36%)
- dim_sla_rules: 7 calculable, 11 cannot calculate

## KEY METRICS
Total 19,292 | Fill 73.6% | TTF 80.1d | Cancel 21.1% | Open 3.8% | Hold 1.1%
TTF: CR 46d | Ghana 59d | PNG 105d | Suriname 148d | Chile 190d
Freeze: 3,127 ever on hold | 390 currently frozen | Mean 100d

## SLA RULES
Cancel fees: 0-5d=0%, 6-20d=50%, 21+=100%. Hold >30d → eligible for cancel.
Unavailable: Time to Assign/Advertise/Brief/Shortlist/Interview/Screen/Offer,
Assign→Intake, Intake→Agreement, Close Req 1BD, Offer Acceptance Rate.

## BUILD MODEL
Foreman: Claude Code orchestrates, Antigravity builds, Opus architects.
Max 200 lines/file. Git: conventional commits. data/ gitignored.

## CONSTRAINTS
- 36% field coverage (42/116). Show "Cannot Calculate" for missing.
- 2 of 5 reports missing. Design placeholders.
- Static export. No network calls. No server.

## KEY DATES
- Jun 11 2PM: Semantic Model review with Sondra
- Jun 18: QIM Presentation (first QIM for Newmont)
- Jun 20: Newmont Reporting meeting (recurring)

## CURRENT STATUS
Claude Pro subscribed. UNGASIS OS S6 in progress. Ready for execution.
```

---

## 19. Kickoff Prompt — Claude Code Foreman

> Paste into Claude Code CLI after `cd D:\.projects\ungasis\projects\newmont && claude`:

```
You are the FOREMAN for Newmont Intelligence Command Center v5.0.
Read CLAUDE.md for your complete rules. You DELEGATE component generation to
Antigravity agents — you NEVER generate components >50 lines yourself.

SETUP TASKS (do these now):
1. npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
2. npm i zustand recharts papaparse dexie fuse.js date-fns xlsx danfojs-node
3. npm i -D @types/papaparse vitest
4. Set port 3001 in next.config.js (add: server: { port: 3001 } to config)
5. Create folder structure:
   src/components/{dashboard,field-gap,sla,req-analytics,freeze,email,posting,billing,shared}
   src/lib/{data,calc,email}
   src/stores
   src/types
   data
   docs/prompts
6. Add "data/" to .gitignore
7. npm run dev — verify clean start on localhost:3001
8. git init && git add . && git commit -m "feat: project scaffold"
9. Generate Wave 1 Antigravity prompts and save to docs/prompts/wave-1.md

FOREMAN RULES:
- NEVER generate a component >50 lines (delegate to Antigravity)
- NEVER rewrite a file when a surgical edit works
- Max 3 debug attempts then STOP and ASK
- Max 150 tokens per Antigravity agent prompt
- Conventional commit messages: feat:, fix:, docs:
```

---

## 20. Antigravity Wave Prompts

### Wave 1: Data Foundation (3 Parallel Agents)

```markdown
## Agent 1: TypeScript Interfaces
Path: src/types/index.ts
Stack: TypeScript 5.8
Output: Export interfaces for all data types.
→ Requisition (38 fields: reqId, positionTitle, recruiterName, status,
  country, city, department, businessUnit, jobLevel, employmentType,
  hiringManager, dateOpened, dateFilled, dateCancelled, dateClosed,
  timeToFillDays, region, division, compensationMin, compensationMax,
  currency, and remaining columns matching CSV headers — use camelCase).
→ HoldEvent (7 fields: reqId, holdStartDate, holdEndDate,
  holdDurationDays, holdReason, holdCount, currentHoldStatus).
→ Posting (10 fields: reqId, postingId, postingChannel, postDate,
  removeDate, postingStatus, postingDurationDays, externalUrl, title, notes).
→ FieldMapping { fieldId, kfFieldName, suggestedBackendRef,
  newmontFieldName, manipulationNeeded, kfNotes, newmontReportable,
  newmontComments, kfImpact, category }.
→ SLARule { slaId, metricName, targetDays, startEvent, endEvent,
  requiredFields: string[], dataAvailable: boolean,
  status: 'calculable' | 'cannot_calculate', reason: string }.
→ KPIResult { metric, value, unit, trend, source }.
Constraints: max 200 lines. Use exact CSV column names as field names (camelCase).

## Agent 2: Data Engine
Path: src/lib/data/csvParser.ts, src/lib/data/db.ts, src/lib/data/dataService.ts
Stack: TypeScript + Papa Parse + Dexie.js
→ csvParser.ts: export function parseCsv<T>(file: File): Promise<T[]>
  using Papa Parse with header:true, dynamicTyping:true, skipEmptyLines:true.
→ db.ts: Dexie database with tables — requisitions (++id, reqId, status,
  country, recruiterName), holdEvents (++id, reqId, holdStartDate),
  postings (++id, reqId, postingChannel), fieldMappings (++fieldId, category,
  newmontReportable), slaRules (++slaId, status).
→ dataService.ts: importCsv(file: File, tableName: string),
  loadAll(), clearAll(), getTableCount(tableName).
Constraints: max 200 lines per file. Error handling for malformed CSVs.

## Agent 3: Zustand Stores
Path: src/stores/dataStore.ts, src/stores/uiStore.ts
Stack: TypeScript + Zustand 5
→ dataStore: { requisitions: Requisition[], holdEvents: HoldEvent[],
  postings: Posting[], fieldMappings: FieldMapping[], slaRules: SLARule[],
  isLoaded: boolean, isImporting: boolean,
  loadFromDb: () => Promise<void>,
  importCsv: (file: File, table: string) => Promise<void>,
  getKPIs: () => KPIResult[] }.
→ uiStore: { activePage: string, searchQuery: string,
  filters: { country?: string, status?: string, dateRange?: [Date,Date] },
  sidebarOpen: boolean,
  setPage, setSearch, setFilter, clearFilters, toggleSidebar }.
Constraints: max 200 lines per file. Zustand v5 syntax (create from zustand).
```

### Wave 2: Core Modules (3 Parallel Agents)

```markdown
## Agent 1: Field Coverage Heatmap
Path: src/components/field-gap/FieldCoverageHeatmap.tsx,
      src/components/field-gap/CategorySummary.tsx,
      src/components/field-gap/FieldDetailTable.tsx,
      src/app/field-gap/page.tsx
Stack: React 19 + TypeScript + Shadcn/ui + Recharts
Input: FieldMapping[] from Zustand dataStore
→ FieldCoverageHeatmap: grid of 116 colored cells. Green=available (newmontReportable
  contains 'ok' or 'yes'), Red=unavailable, Yellow=partial/manipulation needed.
  Group by category: Requisition, Candidate, Workflow, Posting, Other.
→ CategorySummary: 5 Shadcn Cards showing coverage % per category.
  Overall: 36%, Requisition: ~59%, Candidate: 0%, Workflow: 0%, Posting: ~100%.
→ FieldDetailTable: Shadcn Table, sortable, searchable via Fuse.js.
  Columns: KF Field Name | Newmont Field | Available? | Impact | Notes.
→ page.tsx: Layout — CategorySummary row → Heatmap → Detail Table.
Constraints: max 200 lines per file. Use Shadcn Card, Table, Badge components.

## Agent 2: Executive Dashboard
Path: src/components/dashboard/KPICard.tsx,
      src/components/dashboard/StatusDonut.tsx,
      src/components/dashboard/TTFByCountry.tsx,
      src/app/dashboard/page.tsx
Stack: React 19 + TypeScript + Shadcn/ui + Recharts
Input: Requisition[] from Zustand dataStore
→ KPICard: Reusable component. Props: { value: string|number, label: string,
  subtitle?: string, trend?: 'up'|'down'|'neutral', color?: string }.
  Glassmorphism card style (bg-white/5 backdrop-blur border-white/10).
→ StatusDonut: Recharts PieChart. Slices: Filled (73.6%), Cancelled (21.1%),
  Open (3.8%), On Hold (1.1%), Other. Colors: green, red, cyan, yellow.
→ TTFByCountry: Recharts BarChart. Bars: CR 46d, Ghana 59d, PNG 105d,
  Suriname 148d, Chile 190d. Horizontal bars sorted by TTF.
→ page.tsx: 6 KPI cards in grid → StatusDonut + TTFByCountry side-by-side.
Constraints: max 200 lines per file. Calculate KPIs from requisitions array.

## Agent 3: SLA Calculator
Path: src/lib/calc/slaCalculator.ts,
      src/components/sla/SLAMatrix.tsx,
      src/components/sla/ReportableCard.tsx,
      src/app/sla/page.tsx
Stack: React 19 + TypeScript + Shadcn/ui
Input: Requisition[] + SLARule[] from Zustand dataStore
→ slaCalculator.ts: export function calculateSLAs(reqs, rules): SLAResult[].
  Each result: { metric, value, status: 'calculable'|'cannot_calculate',
  reason, confidence }. Calculable: TTF (80.1d), Fill Rate (73.6%),
  Cancel Rate (21.1%), Hold Duration, Pipeline Count, Geo Distribution.
  Cannot Calculate (11): Time to Assign, Advertise, Brief, Shortlist,
  Interview, Screen, Offer, Assign→Intake, Intake→Agreement, Close 1BD,
  Offer Acceptance. Each has a reason string explaining why.
→ SLAMatrix: Two-column layout. Left: green cards (calculable, show values).
  Right: red cards (cannot_calculate, show reason). Shadcn Card + Badge.
→ ReportableCard: Summary — "X of Y SLAs calculable from available data".
→ page.tsx: ReportableCard → SLAMatrix → explanation notes.
Constraints: max 200 lines per file. Use Shadcn Card, Badge ('success'/'destructive').
```

### Wave 3: Analytics + Navigation (2 Parallel Agents)

```markdown
## Agent 1: Requisition Analytics
Path: src/components/req-analytics/PipelineFunnel.tsx,
      src/components/req-analytics/AgingChart.tsx,
      src/components/req-analytics/WorkloadTable.tsx,
      src/app/req-analytics/page.tsx
Stack: React 19 + TypeScript + Recharts + Shadcn/ui
Input: Requisition[] from Zustand dataStore
→ PipelineFunnel: Recharts BarChart showing count by status (Filled, Cancelled,
  Open, On Hold). Horizontal bars with status colors.
→ AgingChart: Histogram of open reqs by age bucket: 0-30d, 31-60d, 61-90d,
  91-120d, 120d+. Calculate from dateOpened vs today.
→ WorkloadTable: Shadcn Table. Group reqs by recruiterName. Show: Recruiter,
  Open Count, Filled Count, Avg TTF, Fill Rate %. Sortable.
→ page.tsx: PipelineFunnel → AgingChart → WorkloadTable.
Constraints: max 200 lines per file.

## Agent 2: Navigation Sidebar + Page Layout
Path: src/components/shared/Sidebar.tsx,
      src/components/shared/PageHeader.tsx,
      src/components/shared/DataImport.tsx,
      src/app/layout.tsx
Stack: React 19 + TypeScript + Tailwind + Shadcn/ui
→ Sidebar: Left sidebar nav (glassmorphism: bg-white/5, backdrop-blur-xl).
  Links: Dashboard, Field Gap, SLA Calculator, Req Analytics, Freeze Analysis,
  Posting (Phase 2), Email (Phase 2), Billing (Phase 3).
  Phase 2/3 items show subtle "Coming Soon" badge. Collapsible.
  Active page highlighted with cyan accent.
→ PageHeader: Top bar with page title + global search (Fuse.js) + export button.
→ DataImport: Drag-drop zone + file picker. Accepts .csv and .xlsx.
  On drop: calls dataStore.importCsv(). Shows import progress + row count.
→ layout.tsx: Wraps all pages. Sidebar on left (240px). Main content area.
  Dark theme (bg-[#0a0a1a]). Responsive.
Constraints: max 200 lines per file. Mobile: sidebar collapses to hamburger.
```

---

## 21. Agent Skills, Personas & Instructions

### M365 Copilot Opus (The Architect)

```
PERSONA: Enterprise architect with access to Outlook, SharePoint, Teams, OneDrive.
GOALS: Generate blueprints, pull enterprise context, create sprint specs.
SKILLS: Email search, file analysis, meeting prep, cross-referencing sources.
INSTRUCTIONS:
- Always search enterprise data before answering Newmont questions
- Cross-reference emails from Sondra, Marco, Manuel, Corey, Patty
- Generate sprint specs with wave definitions for Antigravity
- Produce meeting prep materials from real email context
- Never fabricate stakeholder quotes or data points
```

### Claude Code CLI (The Foreman)

```
PERSONA: Lean, surgical project foreman. Uses terminal. Never over-builds.
GOALS: Scaffold, generate prompts, integrate, debug, commit. Preserve tokens.
SKILLS: npm/npx, file I/O, git, error diagnosis, multi-file wiring.
INSTRUCTIONS (from CLAUDE.md):
- NEVER generate components >50 lines (delegate to Antigravity)
- Fix imports/types/paths during integration (surgical edits only)
- Max 3 debug attempts then STOP and ASK the user
- Save all Antigravity prompts to docs/prompts/wave-N.md
- Commit with conventional messages: feat:, fix:, docs:, chore:
- Run npm run dev after every integration to catch errors early
```

### Antigravity Agent Manager (The Builders)

```
PERSONA: Fast, parallel code generators. Gemini Flash models.
GOALS: Generate complete, working React/TypeScript components from skinny prompts.
SKILLS: React 19, TypeScript, Shadcn/ui, Recharts, Tailwind CSS.
INSTRUCTIONS:
- Each agent gets ONE focused prompt (max 150 tokens)
- Output must be copy-pasteable into the project with minimal edits
- Max 200 lines per file
- Use Shadcn/ui components (Card, Table, Badge, Button, Input)
- Use Recharts for all charts (PieChart, BarChart, LineChart)
- Import types from @/types
- Import stores from @/stores
- Glassmorphism styling: bg-white/5, backdrop-blur-xl, border-white/10
```

### Google AI Studio (The Validator)

```
PERSONA: Data scientist with file upload capabilities. Structured output.
GOALS: Analyze raw CSVs, validate calculations, extract column specs.
SKILLS: File analysis, JSON output, statistical validation, column inference.
INSTRUCTIONS:
- Upload CSVs at P0 → extract exact column headers + types + null patterns
- Upload SLA calculator + CSV at P2B → verify calculation correctness
- Upload final components at P4 → cross-validate numbers match raw data
- Always output structured JSON for easy consumption by Claude Code
- Flag any mismatches between component logic and actual CSV structure
```

### Claude Design (The Stylist)

```
PERSONA: Visual designer specializing in dark-theme analytics dashboards.
GOALS: Generate UI mockups as build targets, create client-facing materials.
SKILLS: Dashboard layouts, glassmorphism, data visualization design, one-pagers.
INSTRUCTIONS:
- Before Wave 2: Generate dashboard mockup (dark theme, glassmorphism,
  6 KPI cards, status donut, TTF bar chart, field heatmap)
- Before meeting: Generate professional one-pager for Sondra
  (Newmont branding, clean layout, key metrics, field coverage summary)
- Output serves as VISUAL TARGET — agents build to MATCH the mockup
- Colors: #0a0a1a base, #00d4ff accent, #a78bfa secondary
```

### Jules (Night Shift)

```
PERSONA: Reliable async worker. Submits PRs overnight while you sleep.
GOALS: Write tests, README, JSDoc, changelog.
SKILLS: Vitest, Markdown, documentation generation.
INSTRUCTIONS:
- Queue before sleep: "Write Vitest tests for src/lib/calc/*.ts and src/lib/data/*.ts"
- Also: "Generate README.md with project overview, setup instructions, architecture"
- Review PR in the morning, merge if clean
- DO NOT use Jules for component generation (Antigravity does that)
```

### ChatGPT Enterprise (Second Opinion)

```
PERSONA: Alternative AI perspective. Different model strengths.
GOALS: Tiebreaker when Claude and Opus disagree. Fresh perspective.
SKILLS: Alternative architecture ideas, edge case identification.
INSTRUCTIONS:
- Use when stuck on a design decision (get a different viewpoint)
- Use when Claude Code and Antigravity produce conflicting approaches
- Do NOT use for component generation or file editing
- Do NOT share Newmont client data
```

---

## 22. UNGASIS OS Integration

### Project Registration

```yaml
# In D:\.projects\ungasis\projects.yaml (or equivalent registry)
newmont:
  name: Newmont Intelligence Command Center v5.0
  path: projects/newmont/
  port: 3001
  status: active
  phase: MVP Build
  stack: Next.js 15 + React 19 + TypeScript + Tailwind + Zustand
  client: Newmont Mining × Korn Ferry RPO
  deadline: 2026-06-18 (QIM)
```

### Port Mapping

| Project | Port | Status |
|---|---|---|
| RiftCoach | 3000 | Active (paused for Newmont sprint) |
| **Newmont Command Center** | **3001** | **Active build** |
| UNGASIS OS Web App | 3002 | Future (Form 2 not started) |

### Project Switching Commands

```bash
# Switch to Newmont
cd D:\.projects\ungasis\projects\newmont && npm run dev

# Switch to RiftCoach
cd D:\.projects\ungasis\projects\riftcoach && npm run dev

# UNGASIS root
cd D:\.projects\ungasis
```

### Integration with UNGASIS Workflows

- Newmont follows the **Foreman Model** workflow (from `.ungasis/config/workflows/foreman-model.md`)
- Token efficiency rules from `.ungasis/config/token-efficiency.md` apply
- Multi-agent protocol from `.ungasis/config/multi-agent-protocol.md` governs agent coordination
- Anti-marathon rule: agents stop after 3 failed attempts and ask the user

---

## 23. Decision Log (ADRs)

### ADR-001: Offline-First SPA (vs Server-Rendered)

| Field | Value |
|---|---|
| **Decision** | Build as offline-first SPA with static export |
| **Date** | April 2026 |
| **Context** | Newmont requires all data to stay in their environment. No KF PowerBI/Foresight. |
| **Options Considered** | 1) Server app on Newmont infra, 2) PowerBI embedded, 3) Offline-first SPA |
| **Chosen** | Option 3 — zero server dependency, works from dist/ folder |
| **Rationale** | No server provisioning needed. Works within Newmont's data boundary. Portable. |

### ADR-002: Foreman Model (vs Claude Builds Everything)

| Field | Value |
|---|---|
| **Decision** | Claude Code = Foreman (orchestrator), Antigravity = Builders |
| **Date** | June 8, 2026 |
| **Context** | Claude Pro has token limits. Building full components burns tokens fast. |
| **Options Considered** | 1) Claude builds everything, 2) Cline builds, 3) Foreman Model |
| **Chosen** | Option 3 — 89% Claude token savings |
| **Rationale** | Antigravity uses Gemini Flash (separate quota). Claude only integrates + debugs. |

### ADR-003: IndexedDB via Dexie.js (vs localStorage / SQLite)

| Field | Value |
|---|---|
| **Decision** | Use Dexie.js (IndexedDB wrapper) for all structured data |
| **Date** | June 2026 |
| **Context** | 19,292+ rows need persistent browser storage with querying. |
| **Options Considered** | 1) localStorage (5MB limit), 2) sql.js (SQLite in WASM), 3) Dexie.js |
| **Chosen** | Option 3 — Promise-based, supports indexes, >100MB capacity |
| **Rationale** | IndexedDB handles our data volume. Dexie simplifies the API. |

### ADR-004: Next.js 15 (vs Vite + React Router)

| Field | Value |
|---|---|
| **Decision** | Use Next.js 15 with App Router and static export |
| **Date** | June 2026 |
| **Context** | Need file-based routing, static export, and TypeScript first-class support. |
| **Chosen** | Next.js 15 — familiar, excellent DX, `next export` produces clean dist/ |
| **Trade-off** | Slightly heavier bundle than Vite, but offset by built-in optimizations. |

### ADR-005: "Cannot Calculate" Pattern (vs Hiding Missing SLAs)

| Field | Value |
|---|---|
| **Decision** | Explicitly show "Cannot Calculate" with reason for every unavailable SLA |
| **Date** | June 2026 |
| **Context** | 11 of 18 SLAs cannot be calculated due to missing fields. |
| **Options** | 1) Hide unavailable SLAs, 2) Show as "N/A", 3) Show with full explanation |
| **Chosen** | Option 3 — transparency builds trust with Corey (process-driven stakeholder) |
| **Rationale** | Shows we understand the gaps AND have a plan to address them. |

---

## 24. Risks & Mitigations

| # | Risk | Severity | Probability | Impact | Owner | Mitigation |
|---|---|---|---|---|---|---|
| R01 | **Semantic model access revoked** — Doug/Newmont pulls contributor access | High | Low | Can't update field mapping | Sondra/Manuel | Export XLSX immediately as backup copy to data/ |
| R02 | **CSV column headers changed** — Newmont updates CORE report format | High | Medium | Type mismatches break parser | Mel | csvParser uses dynamic header mapping, not hardcoded |
| R03 | **QIM deadline too tight** — can't finish all P0 modules by Jun 18 | High | Medium | Incomplete demo | Mel | Prioritize Field Gap (most impactful). Dashboard and SLA can be partial. |
| R04 | **Corey's expectations exceed available data** — wants all SLAs | Medium | High | Client disappointment | Sondra/Marco | SLA Matrix explicitly shows "Cannot Calculate" + reason. Transparency. |
| R05 | **Claude Pro rate limit** — hit token cap during build session | Medium | Medium | Build interrupted | Mel | Foreman Model limits Claude to ~19K tokens. Antigravity as backup builder. |
| R06 | **Antigravity agent generates bad code** — doesn't compile | Medium | Medium | Integration delay | Claude Code | Foreman fixes with surgical edits (max 500 tokens). Not a rewrite. |
| R07 | **IndexedDB storage exceeded** — browser limit hit | Low | Low | Data loss | Mel | 19K rows × 38 cols ≈ 15MB. IndexedDB supports >100MB. No risk. |
| R08 | **Sondra unavailable again** — family emergency recurrence | Medium | Medium | No meeting lead | Mel/Patty/Marco | Patty and Marco can step in. Mel has all data and context. |
| R09 | **Data stored in git accidentally** — CSV committed | High | Low | Client data exposure | Mel | data/ in .gitignore. Pre-commit hook planned (Phase 2). |
| R10 | **Field mapping XLSX outdated** — Manuel updates model | Medium | Medium | Heatmap shows stale data | Mel/Manuel | Re-import XLSX via DataImport component. No code change needed. |
| R11 | **Other RPO (Darren) has better reporting** — Corey compares | Medium | High | Pressure to match | Sondra/Marco | Command Center v5 shows what WE can do. Field Gap Command explains gaps. |
| R12 | **Newmont environment decision reversed** — now wants KF PowerBI | Low | Low | Pivot needed | Sondra | Architecture is data-source-agnostic. Can pivot to PowerBI embedded. |

### Risk from Email Context (Jun 2-11, 2026)

Marco Garza's Jun 2 email flagged that Corey is "very process-driven" and "concerned that under current circumstances, we may not be able to meet expectations." The Command Center v5 directly addresses this by:
1. **Showing what IS calculable** (not hiding gaps)
2. **Explaining WHY** each SLA is unavailable (field-level traceability)
3. **Providing a visual tool** (Field Gap Command) that Corey can USE in QIM prep
4. **Demonstrating KF's technical capability** despite data limitations

---

## END OF DOCUMENT

> **Total Sections:** 24
> **Files to download:** Part 1 (Sections 1-6), Part 2 (Sections 7-12), Part 3 (Sections 13-24)
> **Combined into one file:** Concatenate all 3 parts to create the complete Master Blueprint.
>
> **To start building:** Use Section 19 (Claude Code Kickoff) → Section 20 (Wave Prompts)
> **For fresh Opus chat:** Use Section 18 (Handoff Prompt)
> **For project context:** Sections 1-12 cover everything any agent needs to know
