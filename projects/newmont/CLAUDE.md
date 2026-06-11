# Newmont Command Center — Claude Code Instructions
## Project: D:\.projects\ungasis\projects\newmont

---

## FIRST ACTION ON EVERY TASK
Read docs/NEWMONT-CONTEXT-PACK.md before doing anything.
This file contains all field mappings, SLA data, stakeholders, and build rules.
Do NOT invent data, field names, or metrics not in the context pack.

---

## BUILD RULES

### Paths
- BUILD from: D:\.projects\ungasis\projects\newmont (real path)
- NEVER build from D:\nmwork (junction — causes Vite path errors)
- vite.config.ts has preserveSymlinks: true (do not remove)

### Commands
- Dev: npm run dev
- Build: npm run build (produces dist/index.html ~418KB standalone)
- NO next build, NO next dev (Next.js was removed)

### Stack
- React 19, TypeScript 5.8, Vite 8, Zustand, Recharts, Tailwind 4
- vite-plugin-singlefile inlines all JS/CSS into one HTML file
- Standalone HTML — no server, no API calls, no external data fetching

---

## TOKEN EFFICIENCY RULES (CRITICAL — save 90-95% tokens)

### Rule 1: Context from FILE, not from prompt
- Read docs/NEWMONT-CONTEXT-PACK.md with the Read tool
- NEVER ask the user to paste context into chat
- Cost: ~200 tokens (vs ~8000 if pasted into prompt)

### Rule 2: Surgical edits ONLY
- NEVER rewrite an entire file to change a few lines
- Use targeted insertions and replacements
- If changing 5 lines in a 300-line file, edit only those 5 lines
- Cost: ~500 tokens (vs ~4000 for full rewrite)

### Rule 3: Stop after 3 failed attempts
- If the same approach fails 3 times, STOP
- Report: what failed, what you tried, your best guess at root cause
- Let the user decide next steps
- This prevents runaway debugging loops (saves ~15K tokens)

### Rule 4: No clarification loops
- When run with --yes flag, do NOT ask questions
- Make reasonable assumptions based on context pack
- If truly ambiguous, pick the safer option and note your choice

### Rule 5: One commit per task
- Do all work, THEN one git add -A && git commit
- Do NOT make multiple small commits per task

### Rule 6: Minimal console output
- Do NOT cat entire files to stdout
- Do NOT echo large blocks of code
- Read files with the Read tool, not cat/type commands

---

## EXISTING ARCHITECTURE

### Entry Points
- index.html -> src/main.tsx -> src/App.tsx
- App.tsx renders layout/AppShell.tsx which contains Sidebar + main content

### Navigation / Views
- src/components/layout/AppShell.tsx — layout wrapper with sidebar
- src/components/layout/Sidebar.tsx — navigation sidebar
- src/components/Dashboard.tsx — main dashboard orchestrator
- src/components/Views.tsx — view routing (22.6 KB, handles all views)

### Module Components
- src/components/modules/ExecutiveDashboard.tsx — KPI cards + overview charts
- src/components/modules/FieldGapCommand.tsx — REPLACE with CandidatePipeline
- src/components/modules/ReqAnalytics.tsx — requisition analytics view
- src/components/modules/SLACalculator.tsx — existing SLA calculator

### Shared Components
- src/components/Charts.tsx — reusable chart components
- src/components/Icons.tsx — icon components
- src/components/TweaksPanel.tsx — settings/tweaks panel

### State and Data
- src/stores/dashboard.ts — Zustand store
- src/lib/data-engine.ts — CSV parsing, data processing (DO NOT modify without reason)
- src/lib/field-gap-data.ts — field gap definitions (UPDATE with v4 mapping when asked)
- src/lib/mock-data.ts — mock data fallbacks
- src/types/newmont.ts — TypeScript types

### Real Data Files (in data/ folder)
- report_All_Global_REQ_New_Report_KF.csv (10.4 MB) — all requisitions
- report_On_hold_time_Audit_KF.csv (2.3 MB) — hold/freeze dates
- report_Posted_Requisitions_Global_KF.csv (41 KB) — posted reqs
- TA Semantic Model_Fields.xlsx (34 KB) — field reference

### Design System
- Background: #0a0a1a
- Glass cards: rgba(255,255,255,0.04) backdrop-blur-xl border rgba(255,255,255,0.10)
- Accent: #00d4ff | Success: #22c55e | Warning: #f59e0b | Danger: #ef4444
- ALL colors as inline hex (NEVER Tailwind color classes for brand colors)
- Font: Inter with system-ui fallback. Use tabular-nums for numbers.
- Rounded corners: rounded-2xl for cards
- Hover: scale-[1.02] transition

---

## WHAT NOT TO BUILD
- NO Coverage Intelligence or Sourcing Coverage (no field supports this)
- NO Hold Reasons breakdown (no Hold_Reason field exists)
- NO Reactivation Rate (no field tracks hold-to-reactivated transitions)
- NO invented job family names (use Function field from real data)
- NO external API calls or data fetching
- NO server-side rendering

---

## GIT CONVENTIONS
- feat: new feature (feat: add SLA reportability view)
- fix: bug fix (fix: chart color alignment)
- docs: documentation (docs: update context pack)
- chore: cleanup (chore: remove unused imports)
- refactor: code restructure (refactor: extract chart config)

---
