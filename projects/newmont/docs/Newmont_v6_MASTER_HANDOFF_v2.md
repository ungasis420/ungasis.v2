# NEWMONT INTELLIGENCE COMMAND CENTER — MASTER HANDOFF v2
# Complete Blueprint, Build Specs, Architecture, Roadmap & Agent Protocol
---

**Version:** v6.1 → v6.2 Handoff
**Date:** 2026-06-12
**Author:** Mel John Dimat × M365 Copilot
**Status:** READY FOR CONTINUATION
**QIM Deadline:** June 18, 2026 (6 days)
**Next Meeting:** Newmont Reporting — Jun 19, 5:30 AM Manila

---

## TABLE OF CONTENTS

1. Executive Summary
2. Current State Dashboard
3. Architecture & Tech Stack
4. Tool Stack & Workflow Hierarchy
5. File & Directory Structure
6. Design System DNA
7. Module Specifications
8. Data Sources & Field Mapping
9. What's Done (v6.0 + v6.1)
10. What's NOT Done
11. Pending Files in Scratch
12. Key Lessons Learned
13. Multi-Agent Orchestration Protocol
14. Sprint Roadmap (v6.2 → QIM)
15. Objectives & Goals
16. Key People & Stakeholder Directory
17. Meeting Schedule & Deadlines
18. Risks & Mitigations
19. Agent Skills, Personas & Instructions
20. Handoff Prompt (Fresh Chat Window)
21. Kickoff Prompt (First Task)
22. Antigravity Wave Prompts
23. Claude Dispatch Mobile Workflow

---

## 1. EXECUTIVE SUMMARY

| Field | Value |
|-------|-------|
| **Project** | Newmont Intelligence Command Center v6.x |
| **Client** | Newmont Mining Corporation × Korn Ferry RPO |
| **Region** | Costa Rica (primary), Global (13 countries) |
| **Contract** | CW162992 — Feb 20, 2026 → Feb 20, 2028 |
| **Builder** | Mel John Dimat — Consultant, Reporting (Manila) |
| **Lead** | Sondra Wozniak — Reporting Implementation & CI Lead (Milwaukee) |
| **Type** | Portable offline-first SPA (no backend, no cloud) |
| **Data Posture** | ALL data stays local (IndexedDB + localStorage) |
| **IP** | Deliverables = Newmont IP per MSA §8 (work-for-hire) |
| **Repo Path** | `D:\.projects\ungasis\projects\newmont\` |
| **Junction** | `D:\nmwork` → `D:\.projects\ungasis\projects\newmont` |
| **Port** | localhost:3001 |
| **GitHub Tag** | `v6.0-mvp` (commit `69980a4`) |

### What Is This?
A browser-based intelligence dashboard that transforms raw Newmont ATS data into actionable insights for the KF RPO team — covering requisition analytics, SLA tracking, field coverage gaps, freeze analysis, billing workbench, email intelligence, and posting analytics. It replaces manual spreadsheets and enables Sondra + team to prepare for QIM and client presentations.

### Why Now?
- **Corey Leuders (TA Lead) is dissatisfied** — expressed "significant dissatisfaction" about KF's reporting gaps
- **QIM is June 18** — first QIM for Newmont. Must present with available data.
- **Other RPOs CAN extract this data** — Corey referenced "Darren reports" as benchmark
- **Semantic model meeting completed** (Jun 12 2AM Manila) — Sondra shared v4 field mapping
- **Window: 6 days** to QIM-ready

---

## 2. CURRENT STATE DASHBOARD

| Item | Status | Evidence |
|------|--------|----------|
| v6.0-mvp (Next.js, S0-S5) | ✅ COMPLETE | Tagged on GitHub, build passes |
| v6.1 visual alignment (12 TSX) | ✅ COMPLETE | agy built from Claude Design bundle |
| CLAUDE.md orchestration rules | ✅ UPDATED | Multi-agent rules added |
| Claude Design mockup | ✅ SHAREABLE | Interactive link available |
| Design bundle extracted | ✅ AVAILABLE | `D:\nmwork\design-bundle\` |
| `scripts/inline-build.js` | ✅ CREATED | Limited by Turbopack |
| Sondra v4 field mapping | 📄 RECEIVED | Shared in meeting chat — NOT YET REVIEWED |
| Vite migration | ❌ INCOMPLETE | Built in scratch, not in real project |
| Standalone HTML (file://) | ❌ BROKEN | Next.js can't do it; Vite migration needed |
| Real data integration | ❌ NOT STARTED | Pending field mapping review |
| SLA expansion (4→15) | ❌ NOT STARTED | Pending field mapping review |
| QIM presentation export | ❌ NOT STARTED | Jun 15-17 |
| Claude Pro usage | ⚠️ ~90% | Prefer agy (free) for heavy lifting |

---

## 3. ARCHITECTURE & TECH STACK

### Current Stack (v6.0-mvp — Next.js)

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.2.9 |
| UI | React | 19.1 |
| Language | TypeScript | 5.8 |
| State | Zustand | 5.x |
| Database | Dexie (IndexedDB) | 4.x |
| Charts | Recharts | 2.x |
| Styling | Tailwind CSS + globals.css | 4.x |
| Build | Turbopack | Built-in |
| Output | Static export (`output: 'export'`) | `dist/` |

### Target Stack (v6.2 — Vite Migration)

| Layer | Technology | Version | Why |
|-------|-----------|---------|-----|
| Build | **Vite** | 8.x | Standalone HTML via `vite-plugin-singlefile` |
| Plugin | **vite-plugin-singlefile** | 2.3.3 | Inlines ALL JS/CSS into one file |
| Plugin | **@vitejs/plugin-react** | latest | React support for Vite |
| Base | `'./'` | — | Enables `file://` protocol |
| Everything else | Same | Same | Components/stores/types unchanged |

### Why Migrate?
Next.js uses Turbopack's chunk-loading system which **requires HTTP** — it fundamentally cannot work from `file://`. Even with base64 data URI hacks, `document.currentScript.getAttribute("src")` fails. Vite + singlefile plugin was literally built for this use case. Mel has done this before (QIM Dashboard v5, Contemporario Arts v9).

---

## 4. TOOL STACK & WORKFLOW HIERARCHY

### Workflow Hierarchy (from CLAUDE.md)

```
1. M365 Copilot Opus → Architecture, sprint plans, skinny prompts
2. Claude Code (Sonnet 4.6) → Foreman: orchestrate, integrate, QA, fix, commit
3. Claude Code native subagents → Parallel file generation (PREFERRED)
4. agy CLI (Gemini 3.5 Flash) → Single/multi-file generation (FALLBACK)
5. Playwright MCP → Browser QA verification
```

### Tool Matrix

| Tool | Role | Cost | Best For |
|------|------|------|----------|
| M365 Copilot | Architect | Included | Planning, blueprints, sprint design, email search |
| Claude Code CLI | Foreman | Claude Pro (~90% used) | Integration, QA, git, build fixes |
| Claude Design | Designer | Claude Pro | Mockups, presentations, visual direction |
| agy CLI | Builder(s) | **FREE** (Google AI Pro) | File generation, component building |
| Antigravity Desktop | Agent Manager | FREE | Visual multi-agent dashboard (not yet used) |
| Playwright MCP | QA Tester | FREE | Browser verification, screenshots |
| VS Code + Cline | Editor | FREE | Precise multi-insertion edits |
| GitHub CLI (`gh`) | Version Control | FREE | Push, tag, release |

---

## 5. FILE & DIRECTORY STRUCTURE

### Real Project
```
D:\nmwork\ (junction → D:\.projects\ungasis\projects\newmont\)
├── CLAUDE.md                    # Agent rules & orchestration protocol
├── package.json                 # Dependencies & scripts
├── next.config.ts               # Next.js config (to be replaced by vite.config.ts)
├── tsconfig.json                # TypeScript config
├── postcss.config.mjs           # PostCSS config
├── scripts/
│   └── inline-build.js          # Standalone HTML builder (limited)
├── design-bundle/               # Claude Design export
│   └── newmont-command-center/
│       ├── README.md            # Handoff guide
│       └── project/
│           ├── Newmont Command Center.html
│           ├── app.jsx, dashboard.jsx, views.jsx, sla.jsx
│           ├── charts.jsx, tweaks-panel.jsx, icons.jsx
│           ├── data.js, styles.css (~26KB)
│           └── screenshots/dash.png
├── src/
│   ├── app/                     # Next.js pages (DELETE after Vite migration)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Dashboard.tsx        # v6.1 — from Claude Design
│   │   ├── Charts.tsx           # v6.1 — Recharts wrappers
│   │   ├── Views.tsx            # v6.1 — FieldGaps, Requisitions, HoldAnalysis
│   │   ├── SLACalculator.tsx    # v6.1 — SVG gauges, projections
│   │   ├── TweaksPanel.tsx      # v6.1 — Glassmorphism config
│   │   ├── Icons.tsx            # v6.1 — SVG icon library
│   │   ├── layout/
│   │   │   └── AppShell.tsx     # v6.1 — Sidebar + header merged
│   │   └── modules/             # v6.0 originals (may be superseded)
│   │       ├── ExecutiveDashboard.tsx
│   │       ├── FieldGapCommand.tsx
│   │       ├── SLACalculator.tsx
│   │       ├── RequisitionExplorer.tsx
│   │       └── HoldAnalysis.tsx
│   ├── lib/
│   │   ├── data-engine.ts       # CSV ingestion → Dexie (DO NOT TOUCH)
│   │   ├── field-gap-data.ts    # 127 field definitions
│   │   └── mock-data.ts         # v6.1 — fallback data
│   ├── stores/
│   │   └── dashboard.ts         # Zustand store
│   ├── styles/
│   │   ├── design-tokens.ts     # v6.1 — color/glass constants
│   │   └── globals.css          # v6.1 — 26KB design system
│   └── types/
│       └── newmont.ts           # TypeScript interfaces
├── dist/                        # Build output
│   ├── index.html               # Next.js static export (needs server)
│   └── _next/static/            # Chunks (won't work standalone)
└── public/
    ├── favicon.ico
    └── *.svg
```

### Scratch Directory (agy builds here — MUST COPY BACK)
```
C:\Users\My PC\.gemini\antigravity-cli\scratch\newmont-project\
├── vite.config.ts        ← COPY TO D:\nmwork
├── index.html            ← COPY TO D:\nmwork (Vite entry)
├── src/main.tsx          ← COPY TO D:\nmwork\src\
├── src/App.tsx           ← COPY TO D:\nmwork\src\
├── package.json          ← COPY TO D:\nmwork (Vite scripts)
└── dist/index.html       ← 435KB Vite standalone (verify this works)
```

---

## 6. DESIGN SYSTEM DNA

### Color Tokens
```typescript
// src/styles/design-tokens.ts
export const colors = {
  base: '#0a0a1a',        // Background
  surface: '#111827',     // Card backgrounds
  accent: '#00d4ff',      // Primary accent (cyan)
  secondary: '#a78bfa',   // Purple
  green: '#22c55e',       // Success / Fill Rate
  amber: '#f59e0b',       // Warning / Time to Fill
  red: '#ef4444',         // Danger / Cancel Rate
  purple: '#a78bfa',      // Open Reqs
  gray: '#6b7280',        // On Hold
};
```

### Glassmorphism
```css
/* Glass surfaces */
background: rgba(255, 255, 255, 0.04);      /* --glass-alpha: 0.04 */
backdrop-filter: blur(18px);                 /* --glass-blur: 18px */
border: 1px solid rgba(255, 255, 255, 0.10);
border-radius: 16px;

/* Neon glow effect */
box-shadow: 0 0 20px rgba(0, 212, 255, 0.15);

/* Tweaks Panel controls */
--accent: #00d4ff;           /* Configurable via color picker */
--glass-alpha: 0.061;        /* Configurable via slider (0-100%) */
--glass-blur: 18px;          /* Tied to intensity */
data-density: comfortable|compact;
data-glow: on|off;
data-anim: on|off;
```

### Typography
- Font: Inter (system fallback: ui-sans-serif, system-ui)
- Heading: 600-800 weight, tracking tight
- Body: 400 weight, #eaeef7
- Muted: rgba(234, 238, 247, 0.45-0.72)
- Tabular numbers: `font-variant-numeric: tabular-nums`

---

## 7. MODULE SPECIFICATIONS

### Module 1: Executive Dashboard
- 6 KPI cards: Total Reqs, Fill Rate, Avg TTF, Cancel Rate, Open Reqs, On Hold
- Sparkline SVGs per card
- Time to Fill by Country (horizontal bars with SLA target line)
- Requisition Status donut chart
- Country code chips (CRI, GHA, PNG, SUR, CHL)

### Module 2: Field Gap Command
- 127 field heatmap (from `field-gap-data.ts`)
- Categories: Requisition, Candidate, Workflow, Posting, Billing
- Available / Missing / Partial status
- Search + filter by category
- Visual coverage percentage

### Module 3: SLA Calculator
- SVG gauge arcs with progress
- Priority multipliers
- Recruiter capacity sliders
- "Cannot Calculate" transparency pattern (shows blocked SLAs and why)
- Projection calculator

### Module 4: Requisition Explorer
- Table view of all requisitions
- Search, sort, filter by status/country
- Detail panel slide-in
- CSV export capability

### Module 5: Hold Analysis
- Holds by Country (horizontal bars)
- Reason for Hold breakdown
- Hold Aging distribution
- Country-code chips
- Alert banner for critical holds

---

## 8. DATA SOURCES & FIELD MAPPING

### CSV Files (Local — uploaded via Ingestion Zone)

| File | Records | Key Fields |
|------|---------|-----------|
| Requisitions CSV | ~18,935 | Req ID, Status, Country, Open Date, Fill Date, Recruiter |
| Hold Events CSV | ~23,709 | Req ID, Hold Reason, Start Date, End Date, Country |
| Postings CSV | ~316 | Req ID, Posting Source, Date Posted, Status |

### Semantic Model Files

| File | Source | Status |
|------|--------|--------|
| `TA Semantic Model_Fields.xlsx` | Manuel Kassis | ✅ Available — 116 fields, 3 sheets |
| `Requested Fields List - Newmont v3.xlsx` | Sondra Wozniak | ✅ Available |
| `Requested Fields List - Newmont v4 incl PBI Semantic Model.xlsx` | Sondra Wozniak (Jun 12 meeting) | 📄 NEW — NOT YET REVIEWED |

### Field Coverage (from v3 analysis)
- Total fields: 116
- Available: 42 (36%)
- Missing: 74 (64%)
- Reports available: 3 of 5
- Missing reports: Candidates, Workflow Dates (blocks 11 of 18 SLAs)

### v4 Field Mapping (PRIORITY — review this first!)
Sondra shared this in the Jun 12 meeting chat with notes:
- "QIM ← once we start developing things"
- "Discovery ← can put more field analysis & export development work here"
- "add our new notes about field availability based on PBI semantic model"

---

## 9. WHAT'S DONE ✅

### v6.0-mvp (Jun 11, 2026)
- [x] S0: Next.js 16 scaffold with TypeScript 5.8
- [x] S1: Data engine (CSV → Dexie star schema)
- [x] S2: Zustand store + 5 module components
- [x] S3: Static export config (`output: 'export'`, `distDir: 'dist'`)
- [x] S4: Field gap data (127 fields mapped)
- [x] S5: Integration + build passes
- [x] GitHub tag: `v6.0-mvp` (commit `69980a4`)

### v6.1 Visual Alignment (Jun 11-12, 2026)
- [x] Claude Design mockup created (glassmorphism dashboard)
- [x] Design bundle exported (ZIP with JSX + CSS)
- [x] agy built 12 TSX files from Claude Design export ($0 cost)
- [x] Files copied from scratch to `D:\nmwork\src\components\`
- [x] `npm run build` passes with zero errors (2.4s)
- [x] `npm run dev` works at localhost:3001
- [x] `scripts/inline-build.js` created (1.25MB standalone — limited by Turbopack)
- [x] CLAUDE.md updated with orchestration rules

---

## 10. WHAT'S NOT DONE ❌

| # | Task | Blocker | Priority |
|---|------|---------|----------|
| 1 | Vite migration (standalone HTML) | Files in scratch, not real project | 🔴 HIGH |
| 2 | Review Sondra's v4 field mapping | Not yet opened | 🔴 HIGH |
| 3 | Real data integration | Pending #2 | 🔴 HIGH |
| 4 | SLA expansion (4→15) | Pending #2, #3 | 🟡 MEDIUM |
| 5 | "Cannot Calculate" transparency | Pending #2 | 🟡 MEDIUM |
| 6 | QIM presentation export (PDF/PPT) | Pending #4 | 🟡 MEDIUM |
| 7 | Sondra sign-off | Pending #6 | 🟡 MEDIUM |
| 8 | Git commit v6.1 + v6.2 | Pending above | 🟢 LOW |

---

## 11. PENDING FILES IN SCRATCH

These files were built by agy in the scratch directory and need to be copied to the real project:

```powershell
$scratch = "C:\Users\My PC\.gemini\antigravity-cli\scratch\newmont-project"
$target = "D:\nmwork"

# Vite config files
Copy-Item "$scratch\vite.config.ts" "$target\" -Force
Copy-Item "$scratch\index.html" "$target\" -Force
Copy-Item "$scratch\package.json" "$target\" -Force

# New source files
Copy-Item "$scratch\src\main.tsx" "$target\src\" -Force
Copy-Item "$scratch\src\App.tsx" "$target\src\" -Force

# Then install and build
cd $target
npm install
npm run build

# Verify: dist/index.html should be ~435KB standalone
Get-Item "$target\dist\index.html" | Select-Object Name, Length
```

---

## 12. KEY LESSONS LEARNED

### agy CLI Behavior
1. **Scratch directory default**: agy copies project to `C:\Users\My PC\.gemini\antigravity-cli\scratch\` and builds there — NOT in-place
2. **No parallel subagents in CLI**: `agy` interactive mode runs sequentially despite "break into subagents" prompts. Agent Manager (Desktop GUI) is needed for true parallel.
3. **Junction workaround**: agy rejects dot-prefixed paths (`D:\.projects`). Use junction `D:\nmwork`
4. **`--add-dir` flag**: Even with this, agy may still build in scratch. Always copy back.
5. **`--dangerously-skip-permissions`**: Required for autonomous execution

### Next.js Standalone Limitations
1. **Turbopack chunk-loading requires HTTP** — cannot work from `file://`
2. **`document.currentScript.getAttribute("src")` returns null** when scripts are inlined
3. **`</script>` literals inside JS chunks** break HTML parsing when inlined
4. **Base64 data URI workaround**: Partially works but still has Turbopack runtime errors
5. **Solution**: Migrate to Vite + `vite-plugin-singlefile`

### PowerShell Gotchas
1. **Double-paste issue**: Copy-pasting from Copilot sometimes doubles the command on one line
2. **Backtick escaping**: PowerShell interprets backticks differently — watch for in code blocks
3. **`cmd` vs PowerShell**: Use PowerShell for agy invocation (stdout not capturable in Bash)

### Claude Pro Token Management
1. Pro usage at ~90% after v6.0 + v6.1 sprint
2. Switched from Fable 5 (2× tokens) to Sonnet 4.6 (default)
3. agy (Gemini 3.5 Flash) is FREE — use for all file generation
4. Reserve Claude Code for: integration, QA, git, build fixes only

---

## 13. MULTI-AGENT ORCHESTRATION PROTOCOL

### Native Subagents (PREFERRED)
- Use Claude Code's built-in subagent system for parallel work
- Use `/batch` for embarrassingly parallel file generation
- Use explicit delegation ("Break this into parallel tasks: ...") for complex work
- Each subagent gets its own context — don't worry about context pollution
- As of v2.1.172 (Jun 10, 2026): subagents can nest up to 5 levels deep

### agy CLI Rules (FALLBACK only)
1. ALWAYS use `D:\nmwork` junction for agy workspace (not `D:\.projects` — dot-prefix rejected)
2. ALWAYS use PowerShell for agy invocation (not Bash — stdout not capturable)
3. ALWAYS include `--dangerously-skip-permissions` flag
4. NEVER redirect agy stdout (verify by file existence on disk)
5. NEVER allow agy to run git commands (add explicit "DO NOT run git" in prompts)
6. Parallel agents within wave: use `Start-Process` pattern in PowerShell
7. After each wave: read all generated files, fix imports/types, run `npm run build`
8. Integration = FOREMAN job (Claude Code), not agy's
9. ALWAYS copy files back from scratch to `D:\nmwork` after agy completes

### Auto Mode Settings
- Auto mode ON for long-running sprints
- Claude Code checks each tool call for safety before executing
- Risky actions blocked automatically, safe alternatives attempted

---

## 14. SPRINT ROADMAP

| Sprint | What | When | Tool | Cost |
|--------|------|------|------|------|
| **v6.2a** | Complete Vite migration (copy scratch → build) | Jun 12 | PowerShell + agy | $0 |
| **v6.2b** | Review Sondra's v4 field mapping xlsx | Jun 12-13 | You + Excel | $0 |
| **v6.3** | Real data integration (wire PBI fields) | Jun 13-14 | agy + Claude Code | ~3% Claude |
| **v6.4** | SLA expansion (4→15+ calculable) | Jun 14-15 | agy | $0 |
| **v6.5** | "Cannot Calculate" transparency pattern | Jun 15 | agy | $0 |
| **v6.6** | QIM presentation export (PDF/PPT) | Jun 15-16 | agy + Claude Design | $0 |
| **v6.7** | Polish + Sondra sign-off | Jun 16-17 | You + Claude Design | $0 |
| **QIM** 🎯 | Present to Corey + stakeholders | **Jun 18** | You + team | — |
| **Reporting** | Newmont Reporting team meeting | **Jun 19** | Teams | — |

---

## 15. OBJECTIVES & GOALS

### Business Goals
1. **Impress Corey at QIM (Jun 18)** — show KF can match or exceed "Darren reports"
2. **Demonstrate data transparency** — show what we CAN calculate AND what we can't (and why)
3. **Build trust** — prove KF understands the gaps and has a plan to close them
4. **Enable Sondra** — give her a tool she can use independently for ongoing reporting

### Technical Goals
1. **Standalone HTML** — one file, double-click, works in Chrome from `file://`
2. **Real data integration** — wire PBI semantic model fields into dashboard
3. **15+ SLAs calculable** — expand from current 4 based on v4 field mapping
4. **Offline-first** — all data stays local (IndexedDB), no cloud dependencies
5. **Portable** — share via Teams/SharePoint, no installation required

---

## 16. KEY PEOPLE & STAKEHOLDER DIRECTORY

| Person | Role | Location | Contact |
|--------|------|----------|---------|
| **Mel John Dimat** | Consultant, Reporting (Builder) | Manila | Mel.Dimat@KornFerry.com |
| **Sondra Wozniak** | Reporting Implementation & CI Lead | Milwaukee | Sondra.Wozniak@KornFerry.com |
| **Kurt Leander Helmuth** | Mel's Manager | — | Kurt.Helmuth@KornFerry.com |
| **Marco Garza** | Director of Operations | Mexico | Marco.Garza@KornFerry.com |
| **Patricia Helbig** | Operations | — | Patricia.Helbig@KornFerry.com |
| **Lizbeth Garcia** | Operations | — | Lizbeth.Garcia@KornFerry.com |
| **Marvin Alfaro** | Operations | — | Marvin.Alfaro@KornFerry.com |
| **Jaime Lopez** | Operations | — | Jaime.Lopez@KornFerry.com |
| **Manuel Kassis** | Newmont (TA Dashboard / Semantic Model) | — | External |
| **Corey Leuders** | Newmont TA Lead (KEY STAKEHOLDER) | — | External |
| **Darren Hewitt** | Contractor for other Newmont RPO (Canadian) | — | **DO NOT SHARE KF INFO** |

---

## 17. MEETING SCHEDULE & DEADLINES

| Date | Event | Who | Notes |
|------|-------|-----|-------|
| Jun 12 2AM ✅ | Newmont Semantic Model | Sondra + Mel | DONE — 73 min, v4 xlsx shared |
| **Jun 18** 🔴 | **QIM Presentation** | Full team + Corey | DEADLINE |
| **Jun 19 5:30AM** | Newmont Reporting | Full team | Next team meeting |
| Jun 19 9:30PM | Reporting COE Quarterly Town Hall | 108 invitees | Large event |

---

## 18. RISKS & MITIGATIONS

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| Claude Pro tokens run out | Can't use Claude Code | HIGH (at ~90%) | Use agy (free) for building; Claude Code only for integration |
| Vite migration breaks components | Dashboard doesn't render | MEDIUM | Components are framework-agnostic React — only entry point changes |
| Sondra's v4 mapping reveals fewer fields than expected | Fewer calculable SLAs | MEDIUM | "Cannot Calculate" transparency pattern shows gaps as a feature |
| Standalone HTML still doesn't work | Can't share with Sondra offline | LOW (Vite is proven) | Fallback: zip dist/, or Claude Design link |
| QIM deadline missed | Corey loses trust | LOW | Prioritize available-data SLAs; show progress not perfection |

---

## 19. AGENT SKILLS, PERSONAS & INSTRUCTIONS

### 🔧 FOREMAN — Claude Code (Sonnet 4.6)

**Role:** Integration specialist, QA lead, git manager
**Model:** claude-sonnet-4-6 (default)
**When to use:** After agy builds files — fix imports, run builds, verify, commit

**Instructions:**
```
You are the Foreman for the Newmont Command Center v6.x project.
Your workspace is D:\nmwork (junction → D:\.projects\ungasis\projects\newmont).

RESPONSIBILITIES:
- Read files generated by agy agents and fix integration issues
- Fix TypeScript errors, missing imports, type mismatches
- Run `npm run build` and verify zero errors
- Run Playwright MCP to verify visual rendering
- Git add, commit, push with conventional commit messages
- NEVER rewrite entire files — surgical edits only

CONSTRAINTS:
- Save Claude tokens. Be efficient.
- Use Haiku subagents (Explore) for codebase searches
- Use /batch for parallel file fixes
- Auto mode ON for long-running tasks
- Stop after 3 failed attempts and ask the user
```

### 🏗️ BUILDER — agy CLI (Gemini 3.5 Flash)

**Role:** Component generator, file creator
**Model:** gemini-3.5-flash (High)
**When to use:** Generating new TSX components, CSS, data files

**Instructions (include in every agy prompt):**
```
You are building React 19 + TypeScript components for the Newmont Command Center.
Output TypeScript (.tsx), not JavaScript.
Keep all existing data imports from src/lib/ and src/types/.
Use inline hex colors (NEVER Tailwind color classes for critical colors).
DO NOT run git commands.
DO NOT modify package.json or build config.
DO NOT modify data processing logic in src/lib/data-engine.ts.
Write files to the workspace directory provided.
```

### 📐 ARCHITECT — M365 Copilot Opus

**Role:** Strategic planner, sprint designer, email analyst
**When to use:** Before any sprint — design the plan, write skinny prompts

**Instructions:**
```
You are the Architect for Newmont Command Center v6.x.
Your job: design sprints, write agent prompts, analyze emails/meetings,
generate handoff documents, and maintain the master blueprint.
You do NOT write code. You write PLANS that agents execute.
Always include: goal, constraints, file paths, acceptance criteria.
```

### 🎨 DESIGNER — Claude Design (Opus 4.7)

**Role:** Visual prototyper, presentation creator
**When to use:** Creating mockups, exploring UI directions, QIM presentation

**Instructions:**
```
Design for the Newmont × Korn Ferry RPO Intelligence Command Center.
Dark theme. Glassmorphism surfaces.
Base: #0a0a1a. Accent: #00d4ff. Glass: bg-white/4%, blur 18px.
KF RPO branding. Professional but modern.
Export as standalone HTML or handoff bundle for Claude Code.
```

### 🧪 QA TESTER — Playwright MCP

**Role:** Browser verification, screenshot comparison
**When to use:** After every build, before every commit

**Instructions:**
```
Navigate to http://localhost:3001 (or file:// path for standalone).
Verify: sidebar renders, KPI cards show data, charts appear, tweaks panel opens.
Take full-page screenshot.
Check console for errors — zero errors = PASS.
```

---

## 20. HANDOFF PROMPT (Fresh Chat Window)

Copy-paste this into a new M365 Copilot chat:

```
# Newmont Command Center — Continuing from v6.1

I'm continuing the Newmont Intelligence Command Center build.
Here's where we left off:

## Status
- v6.0-mvp COMPLETE (Next.js 16, React 19, TS 5.8, Zustand, Dexie, Recharts)
- v6.1 visual alignment DONE (12 TSX from Claude Design bundle, agy built, $0)
- Project: D:\nmwork (junction → D:\.projects\ungasis\projects\newmont)
- GitHub: tagged v6.0-mvp (commit 69980a4)
- Claude Pro: ~90% used — prefer agy (free Gemini Flash) for heavy building
- Sondra Wozniak shared NEW v4 field mapping xlsx in Jun 12 meeting

## Immediate Priority
1. Complete Vite migration — files in agy scratch need copying to D:\nmwork
2. Review Sondra's "Requested Fields List - Newmont v4 incl PBI Semantic Model.xlsx"
3. Wire real data based on field mapping
4. QIM deadline: June 18 (6 days)

## Key Constraints
- agy CLI builds in scratch dir, not project dir — always copy back
- Next.js can't produce standalone HTML — Vite + vite-plugin-singlefile is the fix
- Use D:\nmwork junction (agy rejects dot-prefixed paths)
- Save Claude Code tokens — use agy for generation, Claude Code for integration only

## Agent Protocol
- M365 Copilot: planning
- Claude Code (Sonnet 4.6): foreman — integrate, QA, git
- agy CLI (Gemini Flash): builder(s) — generate files ($0)
- Playwright MCP: browser QA

What's the best approach to tackle the Vite migration and field mapping review?
```

---

## 21. KICKOFF PROMPT (First Task — Vite Migration)

```
Complete the Vite migration for Newmont Command Center.

agy previously built Vite config files in the scratch directory. Copy them back:

Source: C:\Users\My PC\.gemini\antigravity-cli\scratch\newmont-project\
Target: D:\nmwork\

Files to copy:
- vite.config.ts → D:\nmwork\
- index.html → D:\nmwork\
- package.json → D:\nmwork\
- src/main.tsx → D:\nmwork\src\
- src/App.tsx → D:\nmwork\src\

After copying:
1. Delete src/app/ folder (Next.js pages — no longer needed)
2. Delete next.config.ts
3. Run: npm install
4. Run: npm run build
5. Verify dist/index.html exists as single standalone file (~435KB)
6. Open dist/index.html via file:// in browser and verify it renders
7. If it works: git add -A && git commit -m "feat: migrate to Vite + standalone HTML"
```

---

## 22. ANTIGRAVITY WAVE PROMPTS

### Wave 1: Real Data Integration (after Vite migration)
```
agy --add-dir D:\nmwork --dangerously-skip-permissions

Read src/lib/data-engine.ts and src/stores/dashboard.ts.
The dashboard currently uses mock data.

Based on the CSV ingestion pipeline in data-engine.ts, update these components
to consume REAL Zustand store data instead of mock-data.ts fallbacks:

1. src/components/Dashboard.tsx — wire KPI values from store
2. src/components/Views.tsx — wire FieldGaps from field-gap-data.ts, wire Requisitions from store
3. src/components/Charts.tsx — wire chart data from store computations

Keep mock-data.ts as fallback when no CSV is uploaded (show "Upload data" state).
DO NOT run git commands. DO NOT modify data-engine.ts or dashboard store.
```

### Wave 2: SLA Expansion
```
agy --add-dir D:\nmwork --dangerously-skip-permissions

Read src/lib/field-gap-data.ts and the Newmont v4 field mapping.
Expand the SLA Calculator from 4 SLAs to all calculable SLAs.

For each SLA:
- If all required fields are available: show calculated value
- If some fields missing: show "Partial — [field] missing"
- If critical fields missing: show "Cannot Calculate — [reason]"

Update src/components/SLACalculator.tsx with the expanded SLA list.
Create src/lib/sla-definitions.ts with the full SLA schema.
DO NOT run git commands.
```

---

## 23. CLAUDE DISPATCH MOBILE WORKFLOW

For quick tasks from your phone via M365 Copilot:

```
@Claude Code in D:\nmwork:
Run `npm run build` and tell me if it passes.
If errors, fix them and commit.
```

```
@Claude Code in D:\nmwork:
Run npm run dev, open Playwright at localhost:3001,
take a full-page screenshot, and describe what you see.
```

---

## ⏱️ STALENESS FOOTER

| Field | Value |
|-------|-------|
| Last updated | 2026-06-12 ~3:30 AM Manila |
| Review by | 2026-06-18 (QIM) |
| Owner | Mel John Dimat |
| Next review trigger | After Vite migration completes |
| Context window note | Previous M365 Copilot chat was at limit — this is the fresh-start document |

---

*End of Master Handoff v2*
