# Wave 3 Prompts — Analytics + Shell (S3)

> Executed in parallel via `agy -p "<prompt>" --model gemini-3.5-flash --add-dir D:\.projects\ungasis\projects\newmont --dangerously-skip-permissions --print-timeout 5m`

## Agent 7: Requisition Analytics

Create src/components/modules/ReqAnalytics.tsx. React client component. Import store selectors. Three visualization sections in glass cards (bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6). SECTION 1: Status breakdown - Recharts horizontal BarChart showing count per requisitionStatus (Filled, Open, Cancelled, On Hold). Colors: Filled #22c55e, Open #00d4ff, Cancelled #ef4444, On Hold #f59e0b. SECTION 2: Aging analysis - Recharts BarChart grouping reqs by age buckets (0-30d, 31-60d, 61-90d, 91-120d, 120+d). Bar fill #a78bfa. SECTION 3: Workload by Recruiter - horizontal BarChart showing top 15 recruiters by req count (group by taFirstName + taLastName). Bar fill #00d4ff. Dark theme, Tailwind, no Shadcn. Max 200 lines.

## Agent 8: Layout + Navigation

Create 3 files. FILE 1: src/components/layout/Sidebar.tsx - Fixed left sidebar 260px width. Dark bg-[#0a0a1a] border-r border-white/10. Top section: Newmont x Korn Ferry RPO header text-sm text-zinc-400, then 'Command Center' text-lg font-bold text-white. Nav items as buttons: Dashboard, Field Gaps, SLA Calculator, Requisitions, Hold Analysis. Active item has bg-white/10 and left border-2 border-[#00d4ff]. Icons use emoji or unicode characters. Bottom: 'v6.0-mvp' version badge. FILE 2: src/components/layout/AppShell.tsx - Flex container, Sidebar on left, main content area flex-1 overflow-y-auto p-8 bg-[#0a0a1a]. Takes children prop. FILE 3: src/app/page.tsx - Import AppShell, Sidebar, and all module components. Use Zustand activeModule to conditionally render: 'dashboard' shows ExecutiveDashboard, 'fieldgap' shows FieldGapCommand, 'sla' shows SLACalculator, 'requisitions' shows ReqAnalytics. Default to 'dashboard'. Include a CSV upload zone at top (input type=file, accept .csv) that calls data-engine loadCSVFile. Wrap in AppShell. Max 200 lines per file.

---
*Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel John Dimat*
