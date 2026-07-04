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
- Skills: .claude/skills/ = active Claude Code project skills; .agents/skills/ = legacy/orphaned; official plugins may add extra user-level skills

## Core Rules
- Read before write (safety gate)
- Max 200 lines per new file
- Max 7 exchanges per session → write handoff summary
- Session discipline (clear/compact/length/push): see .claude/rules/session-discipline.md
- 3-strike rule: 3 failures → STOP and ask user
- Never expose secrets, API keys, .env contents
- source-files/ and archive/ are READ ONLY
- File boundaries: no two agents edit same file
- Simple English, explain jargon
- Staleness footers on all .md files
- Git: type: description (feat/fix/docs/perf/chore)

### Brain-First (check own docs before web/search)
Before web search, spawning subagents, or reading new files, check IN ORDER:
1. docs/handoffs/ — recent decisions and next steps
2. .ungasis/context/hot-context.md — current session state
3. knowledge/wiki/hot.md — hot cache (Karpathy method)
4. python scripts/wiki-query.py "<topic>" — full wiki search
Only escalate to web/subagents if brain returns nothing useful.

## Autonomous Execution
- Do NOT stop between tasks. Keep going until MISSION COMPLETE.
- Only pause for: missing info, security concern, 3-strike limit
- Stop conditions: all tasks complete, 3 consecutive errors, or user says "stop"

## Token Efficiency (Summary)
- For token rules, use the token-efficiency rule (.claude/rules/token-efficiency.md).

## Agent Routing
- Tier 1 Free: Google AI Pro, Cerebras, Groq → drafts, research, fast iteration
- Tier 2 Paid: Claude Pro → architecture, complex reasoning, multi-file changes
- Tier 3 Async: Jules (GitHub PRs), GitHub Actions (scheduled tasks)
- Rule: ALWAYS try Tier 1 first. Escalate only when insufficient.
- For the full model routing table, use the model-routing skill.

## Multi-Agent
- Max 5 parallel agents; explicit file boundaries.
- For full protocol, use the multi-agent skill.

## Graphify
- Query: graphify query "<q>" --budget 2000; update before commit.
- For full graphify rules, use the graphify skill.

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

## Hook Discipline (v2.3, added 2026-07-05)

- Always use skinny-prompt-template-v2.md v2.2 discipline for /goal prompts.
- Audit before add: check existing hook layer with /hooks before installing any new hook.
- Allowlist hooks = speedup only. Real safety needs PreToolUse deny or permissions.deny.
- Wrap all PowerShell hook logic in try/catch and emit deny on error (fail-closed).
- Never hardcode user paths; always discover via $env:USERPROFILE.
- On Windows Claude Code + Git Bash: PowerShell hook bodies MUST be wrapped as
  powershell -NoProfile -NonInteractive -EncodedCommand <base64>. Raw -Command
  triggers bash parse errors because Bash-tool hooks execute via /usr/bin/bash.
- Synthetic pipe tests are not enough. Always validate hooks via real bash -c
  invocation, using a non-matcher tool (PowerShell tool) to drive tests so the
  hook does not self-gate its own validation.
- PreToolUse deny reasons surface to the model as <error> tags, which trains
  Claude to avoid the pattern within-session (bonus behavior).

## Skinny Prompt Template v2.3 (2026-07-06)

- What changed vs v2.2: 4 rules added — success condition WAIVED when the
  escape hatch fires (BLOCKED is a valid terminal state, not a failure);
  own-probe mutations are documented as evidence, not self-reverted; the
  3-strike rule now elevates to save-memory-and-STOP on a 3rd identical
  rejection; and a W1d self-revert warning (never expect Claude to
  self-revert its own mutations via git checkout/restore).
- Why: v2.2 had a contradiction between its escape hatch and its success
  condition that caused a STALE_HOOK loop on 2026-07-06.
- When to use: all new `/goal` prompts, replacing v2.2.
- Template: docs/prompts/skinny-template-v2.3.md
- Reference: knowledge/wiki/decisions/skinny-template-v2.3.md