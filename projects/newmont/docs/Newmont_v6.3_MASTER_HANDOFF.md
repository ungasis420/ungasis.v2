# Newmont Intelligence Command Center — MASTER HANDOFF v2
## v6.3 | June 12, 2026 | QIM Deadline: June 18, 2026
---

## 1. PROJECT IDENTITY

| Field | Value |
|-------|-------|
| Name | Newmont Intelligence Command Center |
| Version | v6.3 (SLA Reportability + Candidate Pipeline) |
| What | Standalone HTML dashboard — portable BI tool for Newmont RPO reporting |
| For | Corey Leuders (Newmont TA Lead) via QIM presentation June 18 |
| By | Mel John Dimat (KF Consultant, Reporting, Manila) |
| Lead | Sondra Wozniak (KF Reporting Implementation Lead, Milwaukee) |
| Contract | CW162992 — Feb 20, 2026 → Feb 20, 2028 |
| Monthly Fee | US $22,000/mo + $830/written offer acceptance |

---

## 2. CURRENT STATE

| Item | Status |
|------|--------|
| Git commit | `1b3a60b` feat: replace Field Gaps + add SLA Reportability |
| Git tag | `v6.2a` (Vite migration), no v6.3 tag yet |
| Branch | main (7 commits ahead of origin — NOT PUSHED) |
| Build | ✅ PASSES — dist/index.html 785 KB standalone |
| Build tool | Vite 8 + vite-plugin-singlefile |
| Build command | `npm run build` from `D:\.projects\ungasis\projects\newmont` |
| Dev server | `npm run dev` |
| Data | 3 of 5 CORE CSVs present, ALL numbers still mock |
| Deploy | file:// protocol — no server needed |

### Commit History (latest first)
```
1b3a60b feat: replace Field Gaps view with Candidate Pipeline, add SLA Reportability
7884a07 fix: clean scratch contamination, fix build script copy logic
d35fce4 docs: add CLAUDE.md update + autonomous build script
4eac651 docs: update CLAUDE.md with token efficiency rules + architecture map
13d97c9 docs: add context pack for AI agent grounding
1e1f6c1 chore: remove Next.js leftovers
f3c0436 fix: merge resolve config, build from real path
53e1fd5 (tag: v6.2a) feat: migrate to Vite + standalone HTML
69980a4 (tag: v6.0-mvp, origin/main) fix(newmont): S4 QA pass
```

### What's Done ✅
- Vite migration from Next.js (standalone HTML works)
- SLAReportability.tsx (7.2 KB) — 3-column scorecard
- CandidatePipeline.tsx (5.7 KB) — 12-stage funnel
- Both wired into navigation (Sidebar + AppShell + Views + App)
- FieldGapCommand replaced with CandidatePipeline
- NEWMONT-CONTEXT-PACK.md (9.4 KB) — AI grounding doc
- CLAUDE.md (4.8 KB) — token efficiency rules
- NEWMONT-AUTONOMOUS-BUILD.ps1 (8.4 KB) — build pipeline
- Build-logs directory with .gitignore

### What's NOT Done ❌
- Real CSV data NOT wired to any dashboard KPIs
- All displayed numbers are mock/fake
- Hold Reasons are INVENTED (no field exists)
- Reactivation Rate is INVENTED (no field exists)
- Job family names are INVENTED (should use Function field)
- Reports 4 & 5 not yet obtained from Sondra
- Build script Claude Code flag needs fix (--dangerously-skip-permissions)
- Not pushed to origin (7 commits ahead)

---

## 3. ARCHITECTURAL BLUEPRINT

### Entry Points
```
index.html → src/main.tsx → src/App.tsx → layout/AppShell.tsx
```

### Component Tree
```
App.tsx
├── AppShell.tsx (layout wrapper)
│   ├── Sidebar.tsx (navigation)
│   └── Main Content Area
│       ├── Dashboard.tsx (default view)
│       │   └── ExecutiveDashboard.tsx (KPI cards + charts)
│       ├── CandidatePipeline.tsx (NEW v6.3 — replaces FieldGapCommand)
│       ├── SLAReportability.tsx (NEW v6.3)
│       ├── SLACalculator.tsx (existing calculator)
│       ├── RequisitionsView (in Views.tsx)
│       ├── HoldAnalysisView (in Views.tsx)
│       └── TweaksPanel.tsx (settings)
```

### Navigation IDs (in AppShell.tsx)
```
dashboard → Dashboard (default)
candidates → CandidatePipelineView (NEW)
sla → SLACalculator
slareport → SLAReportabilityView (NEW)
requisitions → RequisitionsView
holds → HoldAnalysisView
```

### Data Flow
```
CSV files (data/) → data-engine.ts (PapaParse) → Zustand store → Components → Recharts
                                                    ↑
                                              mock-data.ts (fallback)
```

### File Structure
```
D:\.projects\ungasis\projects\newmont\
├── index.html                          (Vite entry point)
├── vite.config.ts                      (preserveSymlinks: true)
├── package.json                        (vite build, no next)
├── CLAUDE.md                           (Claude Code instructions + token rules)
├── AGENTS.md                           (0.3 KB, basic agent notes)
├── tsconfig.json
├── postcss.config.mjs
├── data/
│   ├── report_All_Global_REQ_New_Report_KF.csv      (10.4 MB — REAL)
│   ├── report_On_hold_time_Audit_KF.csv              (2.3 MB — REAL)
│   ├── report_Posted_Requisitions_Global_KF.csv      (41 KB — REAL)
│   └── TA Semantic Model_Fields.xlsx                  (34 KB — reference)
├── docs/
│   ├── NEWMONT-CONTEXT-PACK.md          (9.4 KB — AI grounding)
│   ├── NEWMONT-AUTONOMOUS-BUILD.ps1     (8.4 KB — build pipeline)
│   ├── Newmont_v6.3_MASTER_HANDOFF.md   (THIS FILE)
│   ├── sprint-current.md                (17.2 KB — older sprint notes)
│   └── prompts/                         (wave 1-3 prompts from earlier sprints)
├── design-bundle/                       (Claude Design reference files)
├── scripts/
│   └── inline-build.js                  (2.6 KB)
├── src/
│   ├── main.tsx                         (entry — renders App)
│   ├── App.tsx                          (7.1 KB — routing switch)
│   ├── components/
│   │   ├── Charts.tsx                   (11.3 KB — shared chart components)
│   │   ├── Dashboard.tsx                (8.5 KB — main dashboard orchestrator)
│   │   ├── Icons.tsx                    (3.8 KB — icon components)
│   │   ├── SLACalculator.tsx            (12.4 KB — existing SLA calc)
│   │   ├── TweaksPanel.tsx              (14.4 KB — settings)
│   │   ├── Views.tsx                    (22.6 KB → view routing, contains
│   │   │                                 RequisitionsView + HoldAnalysisView +
│   │   │                                 CandidatePipelineView + SLAReportabilityView)
│   │   ├── layout/
│   │   │   ├── AppShell.tsx             (6.3 KB — layout + nav)
│   │   │   └── Sidebar.tsx              (3.4 KB — sidebar nav)
│   │   └── modules/
│   │       ├── ExecutiveDashboard.tsx    (9.5 KB — KPI cards)
│   │       ├── FieldGapCommand.tsx       (11.6 KB — ORPHANED, replaced)
│   │       ├── ReqAnalytics.tsx          (7.6 KB)
│   │       ├── SLACalculator.tsx         (7 KB — module version)
│   │       ├── SLAReportability.tsx      (7.2 KB — NEW v6.3)
│   │       └── CandidatePipeline.tsx     (5.7 KB — NEW v6.3)
│   ├── lib/
│   │   ├── data-engine.ts               (6.2 KB — CSV parsing)
│   │   ├── field-gap-data.ts            (9.6 KB — field definitions)
│   │   └── mock-data.ts                 (8.7 KB — mock fallbacks)
│   ├── stores/
│   │   └── dashboard.ts                 (3.5 KB — Zustand store)
│   ├── styles/
│   │   ├── design-tokens.ts             (0.5 KB)
│   │   └── globals.css                  (25.5 KB — Tailwind + custom)
│   └── types/
│       └── newmont.ts                   (1.7 KB — TS types)
└── dist/
    └── index.html                       (785 KB — standalone build)
```

---

## 4. BUILD SPECS

| Spec | Value |
|------|-------|
| Framework | React 19 |
| Language | TypeScript 5.8 |
| Bundler | Vite 8.0.16 |
| CSS | Tailwind 4 + PostCSS |
| State | Zustand |
| Charts | Recharts |
| CSV Parser | PapaParse |
| Excel | xlsx |
| PDF | jsPDF + html2canvas |
| Search | Fuse.js |
| Offline DB | Dexie (IndexedDB) |
| Dates | date-fns |
| Single-file | vite-plugin-singlefile |

### Build Commands
```powershell
# ALWAYS build from real path, NEVER from junction
cd "D:\.projects\ungasis\projects\newmont"
npm run dev      # Dev server
npm run build    # Production → dist/index.html
npm run preview  # Preview production build
```

### Path Rules (CRITICAL)
| Action | Path |
|--------|------|
| npm run build | `D:\.projects\ungasis\projects\newmont` (REAL) |
| agy CLI | `D:\nmwork` (junction — agy rejects dot-prefix) |
| Claude Code | Either works |
| git | Either works |
| vite.config.ts | Has `preserveSymlinks: true` (DO NOT REMOVE) |

---

## 5. DESIGN SYSTEM

### Colors (ALL as inline hex — never Tailwind classes)
| Token | Hex | Use |
|-------|-----|-----|
| Base/Background | `#0a0a1a` | Page background |
| Accent/Primary | `#00d4ff` | Headers, highlights, links |
| Secondary | `#a78bfa` | Secondary accents |
| Success | `#22c55e` | Positive metrics, calculable SLAs |
| Warning | `#f59e0b` | Watch metrics, pending SLAs |
| Danger | `#ef4444` | Negative metrics, blocked SLAs |
| Glass bg | `rgba(255,255,255,0.04)` | Card backgrounds |
| Glass border | `rgba(255,255,255,0.10)` | Card borders |

### Glassmorphism Card Recipe
```css
background: rgba(255,255,255,0.04);
backdrop-filter: blur(18px);
border: 1px solid rgba(255,255,255,0.10);
border-radius: 1rem; /* rounded-2xl */
padding: 1.5rem;
```

### Typography
- Font: Inter (fallback: system-ui, -apple-system)
- Numbers: `font-variant-numeric: tabular-nums`
- KPI values: 2.5-3rem, bold
- Labels: 0.875rem, opacity 0.7
- Headers: section label in accent color (#00d4ff), uppercase, tracking-wider

### Interactions
- Hover: `transform: scale(1.02)`, transition 0.2s ease-out
- Cards: subtle shadow-lg on hover

---

## 6. TECH & TOOL STACKS

### AI Orchestration
| Tool | Role | Cost | Key Flags |
|------|------|------|-----------|
| M365 Copilot (Claude Opus) | Architect — planning, prompts, analysis | Company provided | — |
| agy CLI (Gemini 3.5 Flash) | Builder — file generation | **$0** | `\| agy --add-dir D:\nmwork` |
| Claude Code (Sonnet 4.6) | Foreman — integrate, QA, git | Claude Pro tokens | `--dangerously-skip-permissions --print` |
| Claude Cowork | Background tasks | Claude Pro tokens | VS Code background |
| Antigravity Agent Manager | Parallel builds (3+ files) | $0 | Desktop GUI |

### Development
| Tool | Purpose |
|------|---------|
| VS Code | Primary editor |
| PowerShell 7 | Terminal, scripts |
| Git + GitHub | Version control (ungasis420) |
| Node.js v24 (NVM) | Runtime |
| Chrome | Browser testing (file:// protocol) |

---

## 7. DATA ARCHITECTURE

### CORE Reports (from Manuel Kassis, April 2026)
| # | Report | In Project? | File |
|---|--------|------------|------|
| 1 | All_Global REQ_New Report_KF | ✅ YES | data/report_All_Global_REQ_New_Report_KF.csv (10.4 MB) |
| 2 | Posted_Requisitions_Global_KF | ✅ YES | data/report_Posted_Requisitions_Global_KF.csv (41 KB) |
| 3 | On hold time_Audit_KF | ✅ YES | data/report_On_hold_time_Audit_KF.csv (2.3 MB) |
| 4 | Global Candidates_KF | ❌ NO | Need from Sondra |
| 5 | Applicants_Workflow_Dates_KF | ❌ NO | Need from Sondra |

### Data Status Per Dashboard Section
| Section | Data Source | Status |
|---------|-----------|--------|
| Executive KPIs | Report 1 | **MOCK** — CSV exists but not wired |
| Time to Fill | Report 1 | **MOCK** — Approved/Closed dates in CSV |
| Req Status Donut | Report 1 | **MOCK** — Req Status field in CSV |
| Hold Analysis | Report 3 | **MOCK** — Hold CSV exists but not wired |
| Candidate Pipeline | Report 4+5 | **MOCK** — CSVs not yet obtained |
| SLA Reportability | Context Pack | ✅ **GROUNDED** — structure is correct |
| Hold Reasons | NONE | ❌ **INVENTED** — no field exists |
| Reactivation Rate | NONE | ❌ **INVENTED** — no field exists |
| Job Family names | NONE | ❌ **INVENTED** — use Function field |

### Key Field Mappings (v4 xlsx, June 12)
| Dashboard Field | CSV Column | Source |
|----------------|-----------|--------|
| Req ID | Job Req ID | Report 1 |
| Req Status | Requisition Status | Report 1 |
| Created Date | Date Created | Report 1 |
| Approved Date | Approved Date | Report 1 |
| Closed Date | Closed Date | Report 1 |
| Country | Country | Report 1 |
| Function | Function | Report 1 |
| Hiring Manager | Hiring Manager First/Last Name | Report 1 |
| Recruiter | Talent Acquisition First/Last Name | Report 1 |
| Freeze Date | Last Freeze Effective Date | Report 3 |
| UnFreeze Date | Last UnFreeze Effective Date | Report 3 |

---

## 8. SLA REPORTABILITY (Sondra's March 2026 Analysis)

### ✅ CALCULABLE (6)
| SLA | Formula | SOW Target |
|-----|---------|------------|
| Time to Fill | Approved Date → Offer Accept Date (minus hold days) | ≤50 cal days |
| Fill Rate | Openings Filled ÷ Total Openings | — |
| Cancel Rate | Cancelled ÷ Total Reqs | — |
| Hold Duration | UnFreeze Date − Freeze Date | — |
| Pipeline Stage Times | Workflow status dates per stage | — |
| Requisition Aging | Today − Created Date (open reqs) | 60-day trigger |

### ⚠️ PENDING (2)
| SLA | Workaround | Status |
|-----|-----------|--------|
| Time to Offer | Use Offer Created Date | Awaiting Sondra confirmation |
| Offer Acceptance Rate | Same workaround | Same |

### ❌ BLOCKED (9)
| SLA | Missing Field |
|-----|---------------|
| Time to Assign | Intake Meeting Date |
| Time to Advertise | KF Assigned Date |
| Time to Brief | Intake Meeting Date |
| Assign to Intake | Both dates |
| Intake to RA | Both dates |
| Time to Shortlist | Req Shortlist Date |
| Time to Interview | KF Assigned flag |
| Close Req within 1 BD | Job Req Fill Date |
| Time to Screen (BGC) | BGC Init/Complete Dates |

---

## 9. STAKEHOLDERS

### Newmont
| Name | Role | Key Info |
|------|------|----------|
| Corey Leuders | TA Lead, QIM audience | Dissatisfied with reporting gaps. Agreed to limited RCOE. |
| Manuel Kassis | People Analytics | Created 5 CORE reports + PBI semantic model |
| Doug Rolwood | PBI Workspace admin | Confirmed KF cannot access semantic model |
| Megan Heffernan | Advisor TA Global (Melbourne) | Access coordination |
| Darren Hewitt | Prior contractor | "Darren reports" benchmark. DO NOT share KF info. |

### Korn Ferry
| Name | Role |
|------|------|
| Sondra Wozniak | Reporting Implementation Lead, v4 xlsx owner |
| Marco Garza | Director of Operations, QIM prep initiator |
| Patricia Helbig ("Patti") | QIM presenter |
| Mel John Dimat | Dashboard developer (you) |
| Marvin Alfaro | Implementation PM, RAID log |

---

## 10. ROADMAP

| Sprint | Target Date | Deliverable | Status |
|--------|------------|-------------|--------|
| v6.0-mvp | June 8 | Next.js dashboard, 4 views | ✅ DONE |
| v6.1 | June 10 | Visual alignment (12 TSX from Claude Design) | ✅ DONE |
| v6.2a | June 12 | Vite migration, standalone HTML | ✅ DONE |
| v6.3 | June 12 | SLA Reportability + Candidate Pipeline | ✅ DONE |
| **v6.4** | **June 13** | **Wire real CSV data → Executive Dashboard** | 🔲 P0 |
| **v6.5** | **June 14-15** | **Clean mock data labels, remove invented metrics** | 🔲 P0 |
| **v6.6** | **June 16** | **QIM presentation polish** | 🔲 P1 |
| **v6.7** | **June 17** | **Sondra review + sign-off** | 🔲 P1 |
| **🎯 QIM** | **June 18** | **Present to Corey** | 🔲 |
| v7.0 | Post-QIM | Wire Reports 4+5, full pipeline | 🔲 |
| v8.0 | TBD | Auto-CSV ingestion, scheduled refresh | 🔲 |

---

## 11. PENDING ACTIONS (Prioritized)

| Priority | Task | Effort | Agent |
|----------|------|--------|-------|
| 🔴 P0 | Wire real CSV data → Executive Dashboard KPIs | 2-3 hrs | agy + Claude Code |
| 🔴 P0 | Add "Sample Data" banner to mock views | 30 min | Claude Code |
| 🔴 P0 | Remove/label Hold Reasons as "Manual Input Required" | 30 min | Claude Code |
| 🔴 P0 | Remove Reactivation Rate metric | 15 min | Claude Code |
| 🔴 P0 | Replace job family names with real Function values | 30 min | Claude Code |
| 🔴 P0 | Push to origin (7 commits ahead) | 1 min | Manual |
| 🟡 P1 | Fix build script: --dangerously-skip-permissions flag | 10 min | Manual |
| 🟡 P1 | Get Reports 4 & 5 from Sondra | Depends on Sondra | Email |
| 🟡 P1 | Delete orphaned FieldGapCommand.tsx | 5 min | Claude Code |
| 🟡 P1 | QIM presentation layout/polish | 2 hrs | agy + Claude Code |
| 🟢 P2 | Link .ungasis token-efficiency.md | 10 min | Manual |
| 🟢 P2 | Tag v6.3 in git | 1 min | Manual |
| 🟢 P2 | Wire Candidate Pipeline to real data (needs Reports 4+5) | 2 hrs | Post-QIM |

---

## 12. MULTI-AGENT WORKFLOW

### Pipeline Architecture
```
M365 Copilot (Architect — Mel)
    │ generates context pack + prompts
    ▼
NEWMONT-AUTONOMOUS-BUILD.ps1 (Orchestrator)
    ├── WAVE 1: agy (Gemini Flash, $0)
    │   ├── Worker 1 → component.tsx
    │   └── Worker 2 → component.tsx
    ├── Copy target files from scratch (if needed)
    ├── WAVE 2: Claude Code (Sonnet 4.6)
    │   └── Integrate → Fix TS → Build → Commit
    └── WAVE 3: Verify
        └── Check dist/ + component files + git log
```

### Running the Pipeline
```powershell
cd "D:\.projects\ungasis\projects\newmont"
.\docs\NEWMONT-AUTONOMOUS-BUILD.ps1           # Full run
.\docs\NEWMONT-AUTONOMOUS-BUILD.ps1 -DryRun   # Preview
.\docs\NEWMONT-AUTONOMOUS-BUILD.ps1 -SkipAgy  # Claude only
.\docs\NEWMONT-AUTONOMOUS-BUILD.ps1 -SkipClaude  # agy only
```

---

## 13. TOKEN EFFICIENCY PROTOCOL

### The 7 Rules
1. **Context from FILE, not prompt** — "Read docs/NEWMONT-CONTEXT-PACK.md" (~200 tokens vs ~8000)
2. **Surgical edits ONLY** — never rewrite entire files (~500 vs ~4000 tokens)
3. **Stop after 3 failed attempts** — report error, let user decide
4. **No clarification loops** — assume from context pack, note choices
5. **One commit per task** — all work then one git commit
6. **Minimal console output** — use Read tool, not cat/type
7. **agy for generation, Claude for integration** — $0 generation, paid integration only

### Token Budget Per Sprint
| Activity | agy (Free) | Claude Code | M365 Copilot |
|----------|-----------|-------------|-------------|
| Generate components | $0 | 0 | 0 |
| Integrate + build | 0 | ~15-20K | 0 |
| Planning | 0 | 0 | ~2K |
| **Target total** | **$0** | **~20K tokens** | **~2K** |

### Claude Code Optimization
- Use `--model sonnet` (not max effort)
- Use `--max-turns 10` to prevent runaway
- Use `--dangerously-skip-permissions` for auto-approve
- Use `--print` for non-interactive one-shot
- NEVER re-read files already read in session
- NEVER create temp scripts — use Write tool directly

---

## 14. AGENT CONFIGURATIONS

### agy CLI (Gemini 3.5 Flash) — BUILDER
| Field | Value |
|-------|-------|
| Persona | Line cook — builds one dish (file) at a time |
| Skills | React/TS component generation, Recharts charts |
| Goal | Generate production-ready TSX files |
| Cost | $0 (free tier) |
| Invoke | `$prompt \| agy --add-dir D:\nmwork` |
| Rules | One file per prompt. No git. No modifying other files. |
| Output | Writes to D:\nmwork (junction) or scratch dir |

### Claude Code (Sonnet 4.6) — FOREMAN
| Field | Value |
|-------|-------|
| Persona | Sous chef — plates, integrates, quality checks |
| Skills | Read code, surgical edits, import wiring, npm build, git |
| Goal | Integrate agy outputs, fix errors, build, commit |
| Cost | Claude Pro tokens (~15-20K per integration) |
| Invoke | `claude --dangerously-skip-permissions --model sonnet --max-turns 10 --print "prompt"` |
| Rules | Read CLAUDE.md first. Surgical edits only. 3-attempt max. One commit. |
| Config | CLAUDE.md in project root |

### Claude Cowork — BACKGROUND WORKER
| Field | Value |
|-------|-------|
| Persona | Night shift crew — works while you sleep |
| Skills | Bulk fixes, TypeScript cleanup, import organization |
| Goal | Background maintenance and cleanup tasks |
| Invoke | VS Code command palette → Claude: Start Cowork Session |
| Best for | "Fix all TS errors", "organize imports", "update all mock labels" |

### M365 Copilot (Claude Opus) — ARCHITECT
| Field | Value |
|-------|-------|
| Persona | Head chef — designs menu, plans kitchen |
| Skills | Planning, analysis, prompt generation, enterprise search |
| Goal | Strategy, grounding, prompt crafting, stakeholder alignment |
| Cost | Company provided |
| Best for | Context pack updates, field mapping analysis, handoff docs |

---

## 15. KNOWN ISSUES

| Issue | Severity | Workaround |
|-------|----------|------------|
| Build must run from real path, not junction | 🔴 | Always `cd D:\.projects\ungasis\projects\newmont` |
| agy scratch dir contains other project files | 🔴 | Build script only copies target filenames |
| Claude Code `--yes` flag doesn't exist | 🟡 | Use `--dangerously-skip-permissions` instead |
| Build script `[math]::Round` syntax errors | 🟡 | Use `[math]::Round()` not `:Round()` |
| FieldGapCommand.tsx is orphaned dead code | 🟢 | Delete in cleanup pass |
| `.next/` folder may regenerate | 🟢 | Already in cleanup, removed |
| 7 commits not pushed to origin | 🟡 | `git push` before QIM |
| Claude Code used 194.7K tokens (should be ~20K) | 🔴 | Add --max-turns 10, use normal effort |
| Hold Reasons section shows invented data | 🔴 | Remove or label "Manual Input Required" |
| All KPI numbers are mock | 🔴 | Wire real CSV in v6.4 |

---

## 16. HANDOFF PROMPT (for fresh M365 Copilot chat)

Copy-paste this into a new M365 Copilot conversation:

```
Continuing Newmont Intelligence Command Center build.

STATUS: v6.3 committed (1b3a60b), Vite build working (785KB standalone HTML),
SLA Reportability + Candidate Pipeline wired into nav.
7 commits ahead of origin — need to push.

PROJECT PATH: D:\nmwork (junction → D:\.projects\ungasis\projects\newmont)
CONTEXT: Read D:\nmwork\docs\NEWMONT-CONTEXT-PACK.md for full grounding
HANDOFF: Read D:\nmwork\docs\Newmont_v6.3_MASTER_HANDOFF.md for architecture + state

IMMEDIATE PRIORITY (QIM June 18):
1. Wire real CSV data (3 files in data/) to Executive Dashboard KPIs
2. Remove invented metrics (Hold Reasons, Reactivation Rate)
3. Add "Sample Data" banners to mock views
4. Replace invented job family names with real Function field
5. Push to origin

KEY CONSTRAINT: All numbers currently mock. 3 of 5 CORE CSVs in project.
Token efficiency: use agy ($0) for generation, Claude Code only for integration.
```

---

## 17. KICKOFF PROMPT (for Claude Code session)

Copy-paste this into Claude Code:

```
Read docs/NEWMONT-CONTEXT-PACK.md and CLAUDE.md.

TASK: Wire real CSV data to Executive Dashboard.

1. Read data/report_All_Global_REQ_New_Report_KF.csv headers (first 3 rows)
2. Map CSV columns to dashboard KPIs per context pack section 5
3. Update src/lib/data-engine.ts to parse real CSV and compute:
   - Total Requisitions (count rows)
   - Fill Rate (status=Filled / total)
   - Cancel Rate (status=Cancelled / total)
   - Avg Time to Fill (Approved Date → Closed Date, exclude holds)
   - Open Reqs (status=Open)
   - On Hold (status=On Hold or has freeze date)
   - Country breakdown (group by Country)
4. Update mock-data.ts fallbacks to match real data structure
5. npm run build from D:\.projects\ungasis\projects\newmont
6. git add -A && git commit -m "feat(v6.4): wire real CSV data to executive dashboard"

Surgical edits only. Max 3 retries on errors.
```

---

## 18. AGY PROMPT TEMPLATES

### Template: Component Builder
```
Read docs/NEWMONT-CONTEXT-PACK.md. Create src/components/modules/[NAME].tsx.

[2-3 lines describing what to build]
See context pack section [N] for data.

Design: bg #0a0a1a, cards rgba(255,255,255,0.04) backdrop-blur-xl
border rgba(255,255,255,0.10) rounded-2xl.
Section header: [TITLE] in #00d4ff.
ALL hex colors. Default export. React 19 + TS + Recharts.
No git. One file only.
```

### Template: Data Wiring
```
Read docs/NEWMONT-CONTEXT-PACK.md. Update src/lib/[FILE].ts.

[Description of what to change]
See context pack section [N] for field mappings.

Surgical changes only. Do not rewrite the entire file.
No git. One file only.
```

### Template: Quick Fix
```
Read CLAUDE.md. In src/components/[FILE].tsx:
[Specific change description]
No git. One file only.
```

---

## 19. SESSION LOG — June 12, 2026

| Time | Action | Result |
|------|--------|--------|
| ~05:00 | Started session, attached handoff doc | Context loaded |
| ~05:15 | Vite migration: copy scratch files | Copy failed (files already in project) |
| ~05:20 | npm run build → next build error | package.json still had next scripts |
| ~05:25 | Fixed package.json → vite build | Junction path error (preserveSymlinks) |
| ~05:30 | Added preserveSymlinks, duplicate resolve | Second resolve overwrote first |
| ~05:35 | Merged resolve blocks, built from real path | ✅ BUILD SUCCESS — 418 KB |
| ~05:40 | Reviewed dashboard screenshots vs field mapping | Coverage Intelligence NOT grounded |
| ~06:00 | Searched all Newmont enterprise data | Found emails, chats, xlsx, meetings |
| ~06:15 | Created NEWMONT-CONTEXT-PACK.md | 9.4 KB grounding document |
| ~06:30 | Updated CLAUDE.md with token rules | 4.8 KB with 6 efficiency rules |
| ~06:40 | Created NEWMONT-AUTONOMOUS-BUILD.ps1 | 8.4 KB build pipeline |
| ~06:50 | Dry run — scratch contamination discovered | 133 junk files copied to src/ |
| ~07:00 | Emergency cleanup (git clean -fd) | All junk removed, build restored |
| ~07:05 | Fixed build script (copy logic + dry run guard) | Clean dry run passed |
| ~07:10 | Committed fixes, clean dry run confirmed | 7884a07 |
| ~07:11 | FULL PIPELINE RUN | agy built both components ($0) |
| ~07:12 | SLAReportability.tsx created | 7.2 KB ✅ |
| ~07:13 | CandidatePipeline.tsx created | 5.7 KB ✅ |
| ~07:13 | Claude Code integration (Wave 2) | --yes flag wrong, ran interactively |
| ~07:45 | Claude Code completed | 194.7K tokens (too high — needs optimization) |
| ~07:46 | Build passed | 785 KB standalone HTML, 0 TS errors |
| ~07:46 | Commit 1b3a60b | feat: replace Field Gaps + add SLA Reportability |
| ~08:00 | Dashboard review | Numbers all mock, structure aligned to Corey's asks |
| ~08:10 | Handoff document created | This file |

### Key Lessons Learned
1. **agy writes directly to project** — scratch copy often unnecessary
2. **Scratch dir contains OTHER projects** — never copy all files, only target names
3. **Claude Code --yes doesn't exist** — use --dangerously-skip-permissions
4. **Build from real path ALWAYS** — junction causes Vite path resolution errors
5. **Max effort mode wastes tokens** — use normal effort + max-turns cap
6. **preserveSymlinks: true is required** — don't remove from vite.config.ts
7. **One context pack to rule them all** — agents read file, not prompt bloat

---

*End of Master Handoff — Newmont v6.3*
*Generated: June 12, 2026, ~8:00 AM Manila*
*Next review: After QIM (June 18, 2026)*