# Sprint Current — Newmont Intelligence Command Center v6.0 MVP

> **Status:** ACTIVE  
> **Sprint Window:** Jun 11–17, 2026  
> **Deadline:** Jun 18 QIM Presentation  
> **Builder Agent:** Claude Code (Fable 5 — Foreman)  
> **Build Agents:** Antigravity CLI (`agy`) — Gemini 3.5 Flash  
> **Architect:** M365 Copilot Opus  

---

## 1. MISSION

Build the Newmont Intelligence Command Center v6.0 MVP — a portable offline-first SPA that transforms raw ATS data into actionable insights for the KF RPO team.

**YOU ARE THE FOREMAN.** You orchestrate, delegate component generation to `agy` CLI, integrate outputs, debug, and commit. You do NOT generate large components directly.

**Client:** Newmont Mining × Korn Ferry RPO (Costa Rica)  
**Contract:** CW162992 (Feb 20, 2026 – Feb 20, 2028)  
**Builder:** Mel John Dimat (Manila)  
**Lead:** Sondra Wozniak (Milwaukee)

---

## 2. CONSTRAINTS

| Rule | Value |
|------|-------|
| Port | `3001` (RiftCoach uses 3000) |
| Data | ALL local — IndexedDB + localStorage. No server. No cloud. |
| IP | Deliverables = Newmont IP per MSA §8. No data export without approval. |
| Max file length | 200 lines. Split if longer. |
| Data files | NEVER commit CSVs to git. `data/` is in `.gitignore`. |
| Export | Static: `next export` → `dist/` |
| Field coverage | 42/77 requisition fields available (54.5%). Show "Cannot Calculate" for missing SLAs. |
| Debug rule | Max 3 attempts per error. Then STOP and ask user. |

---

## 3. agy COMMAND TEMPLATE

All build delegation uses this pattern:

```bash
agy -p "<SKINNY_PROMPT>" --model gemini-3.5-flash --add-dir D:\.projects\ungasis\projects\newmont --print-timeout 5m
```

**RULES for agy prompts:**
- Max 150 tokens per prompt
- Save all prompts to `docs/prompts/wave-N.md` BEFORE executing
- After each agy output: read file → fix imports/paths → `npm run build`
- If agy output has errors: surgical fix (max 10 lines changed)

---

## 4. S0 — SCAFFOLD (Claude Code solo)

Do these steps yourself (no agy needed):

```bash
cd D:\.projects\ungasis\projects\newmont
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npm i zustand recharts papaparse dexie fuse.js date-fns html2canvas jspdf xlsx
npm i -D @types/papaparse
```

Configure `next.config.ts`:
- Set dev server port to 3001
- Enable static export: `output: 'export'`

Create folder tree:
```
src/
  types/
  lib/
  stores/
  components/
    modules/
    ui/
    layout/
docs/
  prompts/
```

Add to `.gitignore`:
```
data/
*.csv
```

Verify:
```bash
npm run dev
# Confirm localhost:3001 shows clean Next.js page
```

Commit:
```bash
git add -A && git commit -m "feat(newmont): S0 scaffold complete"
```

---

## 5. S1 — WAVE 1: FOUNDATION (3 agy agents)

Save these prompts to `docs/prompts/wave-1.md`, then execute each:

### Agent 1: Types

```bash
agy -p "Create src/types/newmont.ts with TypeScript interfaces. Requisition: jobReqId string, requisitionStatus string, candidateProgress string, jobTitle string, sapPositionId string, businessUnit string, functionName string, location string, locationName string, onsiteRemote string, payGrade string, taFirstName string, taLastName string, hmFirstName string, hmLastName string, dateCreated string, approvedDate string, closedDate string, age number, reasonForRequisition string, openingsFilled number, timeToFill number|null, careerSiteFilterCountry string, eltMember string, notes string, maxAnnualBaseSalary number|null, midAnnualBaseSalary number|null, minAnnualBaseSalary number|null. HoldEvent: jobReqId string, requisitionStatus string, createdDate string, closedDate string, jobTitle string, taFirstName string, taLastName string. Posting: jobReqId string, jobTitle string, location string, boardId string, postEndDate string, postingStartDate string, postingStatus string, taFirstName string, taLastName string, postExpirationDate string. FieldMapping: kfFieldName string, backendRef string, newmontFieldName string, manipulationNeeded string, kfNotes string, newmontReportable 'ok'|'no'|'blank', newmontComments string, kfImpactToReporting string. SLAMetric: name string, canCalculate boolean, formula string, currentValue number|null, missingFields string[], status 'green'|'red'|'amber'. KPICard: label string, value string, trend 'up'|'down'|'neutral', color string. Export all. Max 200 lines." --model gemini-3.5-flash --add-dir D:\.projects\ungasis\projects\newmont --print-timeout 5m
```

### Agent 2: Data Engine

```bash
agy -p "Create src/lib/data-engine.ts. Import Dexie and Papa from papaparse and types from @/types/newmont. Class NewmontDB extends Dexie with tables: requisitions (Requisition[]), holdEvents (HoldEvent[]), postings (Posting[]). Constructor defines stores with jobReqId as key. Export functions: initDB() returns NewmontDB instance. loadCSVFile(file: File, tableName: 'requisitions'|'holdEvents'|'postings') parses CSV with Papa.parse, maps headers to camelCase, stores in Dexie. getRequisitions() getHoldEvents() getPostings() query all rows. clearAllData() clears all tables. Handle column name mapping from CSV headers (e.g. 'Job Req ID' -> jobReqId, 'Requisition Status' -> requisitionStatus). Max 200 lines." --model gemini-3.5-flash --add-dir D:\.projects\ungasis\projects\newmont --print-timeout 5m
```

### Agent 3: Zustand Store

```bash
agy -p "Create src/stores/dashboard.ts. Zustand store using create(). State: requisitions Requisition[], holdEvents HoldEvent[], postings Posting[], isLoaded boolean, activeModule string. Computed selectors (exported functions): selectTotalReqs, selectFillRate (count where requisitionStatus is Filled or Closed divided by total), selectCancelRate (Cancelled/total), selectAvgTTF (mean of timeToFill where not null), selectOpenReqs (count Open), selectOnHold (count 'On Hold'), selectTTFByCountry (group by careerSiteFilterCountry, avg TTF, return array sorted desc), selectStatusDistribution (count per requisitionStatus). Actions: setRequisitions, setHoldEvents, setPostings, setActiveModule, reset. Import types from @/types/newmont. Max 200 lines." --model gemini-3.5-flash --add-dir D:\.projects\ungasis\projects\newmont --print-timeout 5m
```

### After Wave 1:
1. Read all 3 output files
2. Fix any import path issues (`@/types/newmont` etc.)
3. `npm run build` — must pass
4. `git add -A && git commit -m "feat(newmont): S1 wave 1 — types, data engine, stores"`

---

## 6. S2 — WAVE 2: CORE MODULES (3 agy agents)

Save prompts to `docs/prompts/wave-2.md`, then execute:

### Agent 4: Field Gap Command

```bash
agy -p "Create src/components/modules/FieldGapCommand.tsx. React client component ('use client'). Props: none (loads field data from static import or passed prop). Display 3 category sections: Requisition Report (77 fields), Candidate Report (32 fields), Workflow Dates (18 date fields). Each field rendered as a small colored badge: green bg-emerald-500/20 text-emerald-400 for 'ok', red bg-red-500/20 text-red-400 for 'no', gray bg-zinc-500/20 text-zinc-400 for 'blank'. Summary bar at top: 84 Available / 38 Missing / 5 Unknown with progress bar. Click any field to expand details panel showing kfNotes, newmontComments, kfImpactToReporting. Dark theme, glass card (bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6). Tailwind only, no Shadcn dependency. Max 200 lines." --model gemini-3.5-flash --add-dir D:\.projects\ungasis\projects\newmont --print-timeout 5m
```

### Agent 5: Executive Dashboard

```bash
agy -p "Create src/components/modules/ExecutiveDashboard.tsx. React client component ('use client'). Import useStore from @/stores/dashboard and selector functions. ROW 1: 6 KPI cards in 3-col grid. Each card: glass bg (bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6), large number text-3xl font-bold, label text-sm text-zinc-400, color-coded (green for good, amber for warning, red for bad). Cards: Total Reqs (value from selectTotalReqs, neutral #00d4ff), Fill Rate (selectFillRate, green #22c55e), Avg TTF (selectAvgTTF with 'd' suffix, amber #f59e0b), Cancel Rate (selectCancelRate, red #ef4444), Open Reqs (selectOpenReqs, neutral #a78bfa), On Hold (selectOnHold, neutral #6b7280). ROW 2: Recharts BarChart for TTF by Country from selectTTFByCountry. Bar fill #00d4ff, dark grid, white labels. ROW 3: Recharts PieChart for status distribution from selectStatusDistribution. Colors: Filled #22c55e, Cancelled #ef4444, Open #00d4ff, On Hold #f59e0b. Max 200 lines." --model gemini-3.5-flash --add-dir D:\.projects\ungasis\projects\newmont --print-timeout 5m
```

### Agent 6: SLA Calculator

```bash
agy -p "Create src/components/modules/SLACalculator.tsx. React client component ('use client'). Two sections in glass cards. SECTION 1 'Calculable SLAs' (border-emerald-500/30): Table with columns Name, Formula, Current Value, Status. Rows: Time to Fill (Closed Date - Approved Date, show avg), Fill Rate (Filled/Total, show %), Cancel Rate (Cancelled/Total, show %), Hold Duration (UnFreeze - Freeze, show avg days). Green badges for status. SECTION 2 'Cannot Calculate' (border-red-500/30): Table with Name, Missing Field, Blocked Reason. 11 rows: Time to Assign (Intake Meeting Date), Time to Advertise (KF Assigned Date), Time to Brief (Intake Meeting Date), Time to Shortlist (Req Shortlist Date), Time to Interview (KF Assigned Date), Time to Screen BGC (Bgr Check dates), Time to Offer (Verbal Offer Date), Offer Acceptance Rate (Verbal Offer Date), Assign to Intake (Intake Meeting Date), Intake to Agreement (Recruitment Agreement Date), Close Req 1BD (Fill Date). Red badges. Footer: 'Missing fields require Candidate + Workflow reports from Newmont CORE system.' Dark theme, Tailwind. Max 200 lines." --model gemini-3.5-flash --add-dir D:\.projects\ungasis\projects\newmont --print-timeout 5m
```

### After Wave 2:
1. Read all 3 output files
2. Fix imports, wire to Zustand store
3. `npm run build` — must pass
4. `git add -A && git commit -m "feat(newmont): S2 wave 2 — field gap, dashboard, SLA calculator"`

---

## 7. S3 — WAVE 3: ANALYTICS + SHELL (2 agy agents)

Save prompts to `docs/prompts/wave-3.md`, then execute:

### Agent 7: Requisition Analytics

```bash
agy -p "Create src/components/modules/ReqAnalytics.tsx. React client component. Import store selectors. Three visualization sections in glass cards (bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6). SECTION 1: Status breakdown - Recharts horizontal BarChart showing count per requisitionStatus (Filled, Open, Cancelled, On Hold). Colors: Filled #22c55e, Open #00d4ff, Cancelled #ef4444, On Hold #f59e0b. SECTION 2: Aging analysis - Recharts BarChart grouping reqs by age buckets (0-30d, 31-60d, 61-90d, 91-120d, 120+d). Bar fill #a78bfa. SECTION 3: Workload by Recruiter - horizontal BarChart showing top 15 recruiters by req count (group by taFirstName + taLastName). Bar fill #00d4ff. Dark theme, Tailwind, no Shadcn. Max 200 lines." --model gemini-3.5-flash --add-dir D:\.projects\ungasis\projects\newmont --print-timeout 5m
```

### Agent 8: Layout + Navigation

```bash
agy -p "Create 3 files. FILE 1: src/components/layout/Sidebar.tsx - Fixed left sidebar 260px width. Dark bg-[#0a0a1a] border-r border-white/10. Top section: Newmont x Korn Ferry RPO header text-sm text-zinc-400, then 'Command Center' text-lg font-bold text-white. Nav items as buttons: Dashboard, Field Gaps, SLA Calculator, Requisitions, Hold Analysis. Active item has bg-white/10 and left border-2 border-[#00d4ff]. Icons use emoji or unicode characters. Bottom: 'v6.0-mvp' version badge. FILE 2: src/components/layout/AppShell.tsx - Flex container, Sidebar on left, main content area flex-1 overflow-y-auto p-8 bg-[#0a0a1a]. Takes children prop. FILE 3: src/app/page.tsx - Import AppShell, Sidebar, and all module components. Use Zustand activeModule to conditionally render: 'dashboard' shows ExecutiveDashboard, 'fieldgap' shows FieldGapCommand, 'sla' shows SLACalculator, 'requisitions' shows ReqAnalytics. Default to 'dashboard'. Include a CSV upload zone at top (input type=file, accept .csv) that calls data-engine loadCSVFile. Wrap in AppShell. Max 200 lines per file." --model gemini-3.5-flash --add-dir D:\.projects\ungasis\projects\newmont --print-timeout 5m
```

### After Wave 3:
1. Read all output files
2. Wire modules into page, fix all imports
3. Update `src/app/layout.tsx` to use dark bg and Inter font
4. `npm run dev` — test on localhost:3001
5. `npm run build` — must pass zero errors
6. `git add -A && git commit -m "feat(newmont): S3 wave 3 — analytics, navigation, layout"`

---

## 8. S4 — QA (Claude Code solo)

1. `npm run build` — zero errors required
2. `npm run dev` — verify localhost:3001 loads
3. Manual test checklist:
   - [ ] Upload CSV → data loads into IndexedDB
   - [ ] Dashboard KPI cards render with real numbers
   - [ ] TTF by Country chart renders
   - [ ] Status distribution pie chart renders
   - [ ] Field Gap heatmap shows 84 green / 38 red / 5 gray
   - [ ] SLA Calculator shows 4 green / 11 red
   - [ ] Req Analytics charts render
   - [ ] Sidebar navigation switches modules
4. Fix any errors (max 3 attempts each)
5. `git add -A && git commit -m "fix(newmont): S4 QA pass"`

---

## 9. S5 — POLISH + TAG (Claude Code solo)

1. Verify all commits are clean
2. `git tag v6.0-mvp`
3. `git push && git push --tags`
4. `git add -A && git commit -m "chore(newmont): S5 tag v6.0-mvp"`

---

## 10. DATA MODEL REFERENCE

### Fact Tables (Available)
| Table | Source File | Rows | Columns |
|-------|-----------|:----:|:-------:|
| fact_requisitions | report_All_Global_REQ_New_Report_KF.csv | ~19,292 | 38 |
| fact_hold_events | report_On_hold_time_Audit_KF.csv | 23,710 | 7 |
| fact_postings | report_Posted_Requisitions_Global_KF.csv | 317 | 10 |

### Fact Tables (FUTURE — Not Yet Available)
| Table | Report Needed | Blocked SLAs |
|-------|--------------|:------------:|
| fact_candidates | Candidate Report from CORE | 7 SLAs |
| fact_workflow | Workflow Dates from CORE | 4 SLAs |

### Key Metrics (Validated from Data)
- Total Reqs: ~19,292
- Fill Rate: ~73.6%
- Avg TTF: ~80.1 days
- Cancel Rate: ~21.1%
- Open: ~3.8%
- On Hold: ~1.1%
- TTF by Country: CR 46d, Ghana 59d, PNG 105d, Suriname 148d, Chile 190d

### SLA Matrix
**CAN Calculate (4):** Time to Fill, Fill Rate, Cancel Rate, Hold Duration  
**CANNOT Calculate (11):** Time to Assign, Advertise, Brief, Shortlist, Interview, Screen BGC, Offer, Offer Acceptance, Assign→Intake, Intake→Agreement, Close Req 1BD  
**Reason:** Missing Candidate + Workflow reports from CORE system.

---

## 11. CSV COLUMN MAPPING

### report_All_Global_REQ_New_Report_KF.csv (38 columns)
```
Job Req ID → jobReqId
Requisition Status → requisitionStatus
Candidate Progress → candidateProgress
Job Title → jobTitle
SAP Position ID → sapPositionId
Position Subtype → positionSubtype
Business Unit → businessUnit
Function → functionName
Job Location → jobLocation
Location → location
Location  → locationAlt
Onsite/Remote Position → onsiteRemote
Union Bid → unionBid
Pay Grade → payGrade
Pay Scale Group → payScaleGroup
Pay Scale Level → payScaleLevel
Talent Acquisition First Name → taFirstName
Talent Acquisition Last Name → taLastName
Hiring Manager First name → hmFirstName
Hiring Manager Last Name → hmLastName
Direct Supervisor First Name → supervisorFirstName
Direct Supervisor Last Name → supervisorLastName
Date Created → dateCreated
Approved Date → approvedDate
Closed Date → closedDate
Age → age
Reason for Requisition → reasonForRequisition
Is this position budgeted? → isBudgeted
Will this position have direct reports? → hasDirectReports
Openings Filled → openingsFilled
Time to Fill → timeToFill
Career Site Filter Country → careerSiteFilterCountry
ELT Member → eltMember
Notes → notes
Template Name → templateName
Maximum Annual Base Salary → maxAnnualBaseSalary
Mid-Point Annual Base Salary → midAnnualBaseSalary
Minimum Annual Base Salary → minAnnualBaseSalary
```

### report_On_hold_time_Audit_KF.csv (7 columns)
```
Job Req ID → jobReqId
Requisition Status → requisitionStatus
Created Date (Timestamp) → createdDate
Closed Date → closedDate
Job Title → jobTitle
Talent Acquisition First Name → taFirstName
Talent Acquisition Last Name → taLastName
```

### report_Posted_Requisitions_Global_KF.csv (10 columns)
```
Job Req ID → jobReqId
Job Title → jobTitle
Location  → location
Board ID → boardId
Post End Date → postEndDate
Posting Start Date (Timestamp) → postingStartDate
Posting Status → postingStatus
Talent Acquisition First Name → taFirstName
Talent Acquisition Last Name → taLastName
Post Expiration Date → postExpirationDate
```

---

## 12. TECH STACK

```
Next.js 15 | React 19 | TypeScript 5.8 | Tailwind CSS 4
Zustand 5 | Recharts | Papa Parse | Dexie.js
Fuse.js | date-fns | html2canvas | jsPDF | SheetJS (xlsx)
```

---

## 13. FOREMAN RULES (CRITICAL)

1. **NEVER** generate a component >50 lines. Delegate to `agy`.
2. **NEVER** rewrite a file when a surgical edit fixes the issue.
3. For integration: read existing files, fix imports/types, wire into pages.
4. For debugging: read error → apply minimal fix → re-run. Max 3 attempts then **STOP and ASK**.
5. For prompt gen: max 150 tokens per agy agent prompt.
6. Save all generated prompts to `docs/prompts/wave-N.md`.
7. Conventional commits: `feat/fix/chore(newmont): description`.
8. NEVER commit CSV data to git.

---

*Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel John Dimat*
