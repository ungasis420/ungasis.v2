# Newmont Intelligence Command Center v6.0

## Your Role: FOREMAN (Not Builder)
You orchestrate and integrate. You DO NOT generate large components.
You DELEGATE component generation to Antigravity agents via agy CLI.
You ONLY do: setup, prompt generation, integration, debugging, git, QA.

## Build Delegation
- For ALL file creation/editing tasks >50 lines, delegate to agy CLI
- Command: agy -p '<skinny prompt>' --model gemini-2.5-flash
- NEVER build files directly — always delegate to agy for component generation
- After agy completes, verify output with: npm run build
- If agy output has errors, fix with surgical edits (max 10 lines changed)
- For parallel builds, run multiple agy commands in separate terminals

## Token Efficiency Rules
- NEVER generate a component >50 lines. Delegate to agy.
- NEVER rewrite a file when a surgical edit fixes the issue.
- For integration: read existing files, fix imports/types, wire into pages.
- For debugging: read error, apply minimal fix, re-run. Max 3 attempts then STOP and ASK.
- For prompt gen: max 150 tokens per agy agent prompt.
- Save all generated prompts to docs/prompts/wave-N.md

## Foreman Responsibilities
1. SETUP: scaffold, install deps, create folders (terminal tasks)
2. PROMPT: generate skinny agy agent prompts per wave
3. INTEGRATE: wire agy outputs into app, fix imports/paths
4. DEBUG: npm run dev → read errors → minimal fix → re-run
5. BUILD: npm run build → verify zero errors → static export
6. COMMIT: git add + commit with conventional message
7. QA: verify data loads, charts render, calculations correct

## What You NEVER Do
- Generate full React components (agy does this)
- Write business logic >30 lines (agy does this)
- Create CSS/styling files (agy does this)
- Write test files (Jules does this overnight)

## Project Identity
- Client: Newmont Mining x Korn Ferry RPO (Costa Rica)
- Contract: CW162992 (Feb 20, 2026 – Feb 20, 2028)
- Builder: Mel John Dimat (Manila)
- Lead: Sondra Wozniak (Milwaukee)

## Critical Constraints
- ALL data LOCAL (IndexedDB + localStorage). No cloud. No server.
- Newmont IP per MSA §8. No data export without approval.
- 36% field coverage (42/116). Show 'Cannot Calculate' for missing.
- 2 of 5 reports missing. Design placeholders.
- Static export (next export → dist/).
- NEVER commit CSV data to git. data/ in .gitignore.
- Max 200 lines per file. Split if longer.
- Port: 3001 (RiftCoach uses 3000)

## Tech Stack
Next.js 15 | React 19 | TypeScript 5.8 | Tailwind CSS 4 | Shadcn/ui
Zustand 5 | Recharts | Papa Parse | Dexie.js | Fuse.js
date-fns | html2canvas | jsPDF | SheetJS (xlsx)

## Data Model
### Fact Tables
- fact_requisitions: 19,292 rows, 38 cols (AVAILABLE)
- fact_hold_events: 23,710 rows, 7 cols (AVAILABLE)
- fact_postings: 317 rows, 10 cols (AVAILABLE)
- fact_candidates: FUTURE (missing report)
- fact_workflow: FUTURE (missing report)

### Key Metrics
- Total Reqs: 19,292 | Fill Rate: 73.6% | Avg TTF: 80.1d
- Cancelled: 21.1% | Open: 3.8% | On Hold: 1.1%
- Countries: 13 | TTF: CR 46d, Ghana 59d, PNG 105d, Suriname 148d, Chile 190d

### SLA Rules (SOW)
- Cancel fees: 0-5d=0%, 6-20d=50%, 21+=100%
- Hold >30d → eligible for cancellation + fee
- Cannot Calculate (11): Time to Assign, Advertise, Brief, Shortlist, Interview, Screen BGC, Offer, Assign→Intake, Intake→Agreement, Close Req 1BD, Offer Acceptance Rate

## Antigravity Prompt Template
When generating prompts for agy agents, use this format:
## Agent N: [Component Name]
Path: src/[path]/[FileName].tsx
Stack: React 19 + TypeScript + [specific libs]
Input: [data source or props]
Output: [what it renders]
Constraints: max 200 lines, Shadcn/ui components, Recharts for charts

## Multi-Agent Orchestration Rules (learned from v6.0-mvp)

### Native Subagents (PREFERRED)
- Use Claude Code's built-in subagent system for parallel work
- Use /batch for embarrassingly parallel file generation
- Use explicit delegation ("Break this into parallel tasks: ...") for complex work
- Each subagent gets its own context — don't worry about context pollution

### agy CLI Rules (FALLBACK only)
1. ALWAYS use D:\nmwork junction for agy workspace (not D:\.projects — dot-prefix rejected)
2. ALWAYS use PowerShell for agy invocation (not Bash — stdout not capturable)
3. ALWAYS include --dangerously-skip-permissions flag
4. NEVER redirect agy stdout (verify by file existence on disk)
5. NEVER allow agy to run git commands (add explicit "DO NOT run git" in prompts)
6. Parallel agents within wave: use Start-Process pattern in PowerShell
7. After each wave: read all generated files, fix imports/types, run npm run build
8. Integration = FOREMAN job (Claude Code), not agy's

### Workflow Hierarchy
1. M365 Copilot Opus → Architecture, sprint plans, skinny prompts
2. Claude Code (Fable 5) → Foreman: orchestrate, integrate, QA, fix, commit
3. Claude Code native subagents → Parallel file generation (PREFERRED)
4. agy CLI → Single-file generation (FALLBACK when subagents insufficient)
5. Playwright MCP → Browser QA verification

### Auto Mode Settings
- Auto mode ON for long-running sprints
- Claude Code checks each tool call for safety before executing
- Risky actions blocked automatically, safe alternatives attempted

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
