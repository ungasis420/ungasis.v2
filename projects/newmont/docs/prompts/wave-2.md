# Wave 2 Prompts — Core Modules (S2)

> Executed in parallel via `agy -p "<prompt>" --model gemini-3.5-flash --add-dir D:\.projects\ungasis\projects\newmont --dangerously-skip-permissions --print-timeout 5m`

## Agent 4: Field Gap Command

Create src/components/modules/FieldGapCommand.tsx. React client component ('use client'). Props: none (loads field data from static import or passed prop). Display 3 category sections: Requisition Report (77 fields), Candidate Report (32 fields), Workflow Dates (18 date fields). Each field rendered as a small colored badge: green bg-emerald-500/20 text-emerald-400 for 'ok', red bg-red-500/20 text-red-400 for 'no', gray bg-zinc-500/20 text-zinc-400 for 'blank'. Summary bar at top: 84 Available / 38 Missing / 5 Unknown with progress bar. Click any field to expand details panel showing kfNotes, newmontComments, kfImpactToReporting. Dark theme, glass card (bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6). Tailwind only, no Shadcn dependency. Max 200 lines.

## Agent 5: Executive Dashboard

Create src/components/modules/ExecutiveDashboard.tsx. React client component ('use client'). Import useStore from @/stores/dashboard and selector functions. ROW 1: 6 KPI cards in 3-col grid. Each card: glass bg (bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6), large number text-3xl font-bold, label text-sm text-zinc-400, color-coded (green for good, amber for warning, red for bad). Cards: Total Reqs (value from selectTotalReqs, neutral #00d4ff), Fill Rate (selectFillRate, green #22c55e), Avg TTF (selectAvgTTF with 'd' suffix, amber #f59e0b), Cancel Rate (selectCancelRate, red #ef4444), Open Reqs (selectOpenReqs, neutral #a78bfa), On Hold (selectOnHold, neutral #6b7280). ROW 2: Recharts BarChart for TTF by Country from selectTTFByCountry. Bar fill #00d4ff, dark grid, white labels. ROW 3: Recharts PieChart for status distribution from selectStatusDistribution. Colors: Filled #22c55e, Cancelled #ef4444, Open #00d4ff, On Hold #f59e0b. Max 200 lines.

## Agent 6: SLA Calculator

Create src/components/modules/SLACalculator.tsx. React client component ('use client'). Two sections in glass cards. SECTION 1 'Calculable SLAs' (border-emerald-500/30): Table with columns Name, Formula, Current Value, Status. Rows: Time to Fill (Closed Date - Approved Date, show avg), Fill Rate (Filled/Total, show %), Cancel Rate (Cancelled/Total, show %), Hold Duration (UnFreeze - Freeze, show avg days). Green badges for status. SECTION 2 'Cannot Calculate' (border-red-500/30): Table with Name, Missing Field, Blocked Reason. 11 rows: Time to Assign (Intake Meeting Date), Time to Advertise (KF Assigned Date), Time to Brief (Intake Meeting Date), Time to Shortlist (Req Shortlist Date), Time to Interview (KF Assigned Date), Time to Screen BGC (Bgr Check dates), Time to Offer (Verbal Offer Date), Offer Acceptance Rate (Verbal Offer Date), Assign to Intake (Intake Meeting Date), Intake to Agreement (Recruitment Agreement Date), Close Req 1BD (Fill Date). Red badges. Footer: 'Missing fields require Candidate + Workflow reports from Newmont CORE system.' Dark theme, Tailwind. Max 200 lines.

---
*Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel John Dimat*
