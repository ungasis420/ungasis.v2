# UNGASIS OS v6.3

## Identity
- Project: UNGASIS OS — personal AI operating system
- Owner: Mel John Dimat, Manila
- Repo: D:\.projects\ungasis (Dev Drive, ReFS)
- Key context: ./LLM_CONTEXT.md, ./CONTEXT.md

## Build & Verify
- `npm run build` for all projects (Newmont, RiftCoach, Dashboard)
- `python scripts/ungasis.py pulse` for system health
- Always verify before committing: build must pass

## Project Paths
- Newmont: projects/newmont/ (Vite 8 + React 19 + Tailwind 4 + Zustand 5)
- RiftCoach: projects/riftcoach/ (Next.js)
- Dashboard: dashboard/ (same stack as Newmont)
- Configs: .ungasis/config/
- Wiki: knowledge/wiki/
- Raw sources: raw/
- Scripts: scripts/ (25 scripts)
- Agent skills: .agents/skills/ (13 skills)

## Core Rules
- Read before write (safety gate)
- Max 200 lines per new file
- Max 15 exchanges per session → write handoff summary
- 3-strike rule: 3 failures → STOP and ask user
- Never expose secrets, API keys, .env contents
- source-files/ and archive/ are READ ONLY
- File boundaries: no two agents edit same file
- Simple English, explain jargon
- Staleness footers on all .md files
- Git: type: description (feat/fix/docs/perf/chore)

## Autonomous Execution
- Do NOT stop between tasks. Keep going until MISSION COMPLETE.
- Only pause for: missing info, security concern, 3-strike limit
- Stop conditions: all tasks complete, 3 consecutive errors, or user says "stop"

## Token Efficiency (Summary)
- 5 short sessions < 1 long session
- Each agent gets ONLY the context it needs
- Include exact file paths in prompts
- Tool hierarchy: Glob (~50 tokens) → Grep (~100) → Read partial → Read full
- Working context target: under 4,000 tokens
- Compact at 60% context. Autocompact at 50%.
- For full token rules: see .claude/rules/token-efficiency.md

## Agent Routing
- Tier 1 Free: Google AI Pro, Cerebras, Groq → drafts, research, fast iteration
- Tier 2 Paid: Claude Pro → architecture, complex reasoning, multi-file changes
- Tier 3 Async: Jules (GitHub PRs), GitHub Actions (scheduled tasks)
- Rule: ALWAYS try Tier 1 first. Escalate only when insufficient.

## Multi-Agent
- Max 5 parallel agents
- Explicit file boundaries (no overlapping edits)
- Each agent gets 1 task scope
- For full protocol: see .claude/rules/multi-agent.md

## Graphify
- Before architecture questions: run graphify query "<question>" --budget 2000
- Fallback: GRAPH_REPORT.md
- After sprint: run graphify update . before commit
- For full graphify rules: see .claude/rules/graphify.md

## Wiki System (Karpathy Method)
- Ingest: python scripts/wiki-ingest.py <file>
- Query: python scripts/wiki-query.py "<question>"
- Lint: python scripts/wiki-lint.py
- Hot cache: knowledge/wiki/hot.md (inject into agent prompts)

## Known Issues (June 2026)
- Newmont sidebar is in AppShell.tsx, NOT Sidebar.tsx (dead code)
- Two SLACalculator files: interactive vs reportability
- CSV data has duplicates — always deduplicate by Job Req ID (18,935 unique)
- Graphify community labels are generic "Community N" — cosmetic only

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel