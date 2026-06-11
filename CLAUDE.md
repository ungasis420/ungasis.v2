# UNGASIS OS v5.1 "AUTONOMY" — Agent Instructions
<!-- Single source of truth. All agents read THIS file. -->
<!-- Last consolidated: 2026-06-10 | Version: 5.1 -->

- Project: UNGASIS OS — personal AI operating system
- Owner: Mel John Dimat, Filipino reporting consultant, Manila
- Repo: D:\.projects\ungasis (Dev Drive, ReFS)
- Branch: feat/v5.1-autonomy
- Key files: ./CONTEXT.md (session log), ./LLM_CONTEXT.md (project context)

## Section 2: Read First
- Read ./LLM_CONTEXT.md before starting work
- Read ./CONTEXT.md for session history
- Read ./specs/ for any active specs before implementing

## Section 3: Core Rules (Safety & Hygiene)
[ENFORCED: agent-check]

**Scope**: Use this rule to keep `.clinerules/`, `AGENTS.md`, `CLAUDE.md`, Memory Bank files, and `MEMORY.md` fresh, non-conflicting, and lean.

**Rule Priority** (Project convention for conflicts, highest to lowest):
1. 🛡️ Safety and security guardrails (Never expose secrets)
2. 👤 Current user request (Follow latest explicit instruction)
3. 🎯 Current mission files (QA-MISSION.md, sprint brief)
4. 📁 `.clinerules/` numbered files (Lower number wins)
5. 🌐 Cross-tool files (AGENTS.md, CLAUDE.md)
6. 📖 Project memory (memory-bank/*.md, CONTEXT.md)
7. 🧠 Learning log (MEMORY.md lessons)

**Rule Ownership Map**:
| File | Owns |
|---|---|
| `00-identity.md` | Agent role and repo identity |
| `01-token-efficiency.md` | Mana saving and file-reading strategy |
| `02-output-rules.md` | Report format, status markers, file output |
| `03-self-iteration.md` | Continue-until-done task loop |
| `04-reflection.md` | Self-check after each task |
| `05-hygiene.md` | Freshness, conflicts, duplication, review cycle |
| `memory-bank.md` | How to read and update Memory Bank |

**Staleness Signals & Stale Rule Response**:
- A rule is stale when a named model no longer exists, path points to missing file, phase mismatches, conflict exists, review date is 90 days past, repeated failures occur, or there is overlap.
- When a stale rule appears, write: `⚠️ STALE RULE: [file] — [reason]`
- Do not follow the stale part. Patch the rule only when the task allows file edits.

**Duplication Control**:
- Same owner: Do not create a new rule if an existing file already owns the concern.
- Same instruction: Keep clearer version.
- Merge tables if explaining the same decision. Keep warnings in most relevant file.

**Enforcement Tags**:
- `[ENFORCED: agent-check]`: Agent verifies compliance during the task
- `[ENFORCED: CI]`: Future automated check
- `[ADVISORY]`: Helpful practice
- `[DEPRECATED]`: Do not follow

**Rule Review Workflow**:
1. Inventory files
2. Footer check (✅ or 🔴)
3. Path check
4. Conflict check
5. Duplication check
6. Patch
7. Reflect (`04-reflection.md`)

**General Core Rules**:
- Read before write (safety gate)
- Never expose secrets, API keys, .env contents
- source-files/ and archive/ are READ ONLY
- Max 200 lines per new file
- Staleness footers on all .md files

## Section 4: Token Efficiency
> Saves ~350,000 tokens/month. Every layer compounds.

**LAYER 1-3: PREVENT**
- L1: Pre-fill templates — don't generate structure from scratch
- L2: Knowledge file offloading — read files directly via tool calls, never request paste
- L3: Example-driven — follow table formats exactly, 1 example > 3 paragraphs

**LAYER 4-6: OPTIMIZE**
- L4: Route by complexity — simple checks -> Glob, content -> Grep -> Read
- L5: Batch operations — read multiple files in one plan, combine checks
- L6: Context pruning — Read headings only for inventory, full content only when verifying coverage

**LAYER 7-9: CONTROL**
- L7: Structured output ONLY — markdown tables, no explanatory prose
- L8: Response length caps — max 1 line per file, max 1 line per section
- L9: Incremental disclosure — batch files 5-8 at a time, reveal content as needed

**LAYER 10-12: MAINTAIN**
- L10: Cache awareness — Keep system prompt stable across turns
- L11: Session checkpointing — Write progress to file after EACH task
- L12: Compact at 60% — If context heavy (15+ tool calls), checkpoint and compact (thresholds: Section 19)

**Limits & Costs**:
- Investigation Limit: 3-Strike Rule (stop after 3 failed lookups)
- Ask-First Threshold for secrets
- Cost Check: >5 commands = ask first
- Marathon Detection: 3+ scratch scripts = ask
- Context Decay: summarize tool results in 1-2 sentences, drop raw output
- Working context target: under 4,000 tokens
- Session max: 15 exchanges → handoff summary
- Tool Selection Hierarchy: Glob (~50 tokens) -> Grep (~100 tokens) -> Read partial -> Read full.

## Section 5: Output Rules
- QA audits → QA-AUDIT-REPORT.md with structured tables
- Status markers: ✅ (Fully covered) / 🟡 (Partially covered) / 🔴 (Missing) / ⚠️ (Inconsistency)
- Self-check: PASS/FAIL log after every output
- Max 1 line per entry — use Notes column for context
- No standalone paragraphs between tables
- File references: Use filename only `ungasis-prompt-library.md`, not full path

## Section 6: Autonomous Execution
- Do NOT stop between tasks. Keep going until "MISSION COMPLETE"
- Only pause for: missing info, security concern, 3-strike limit
- Do NOT ask "should I continue?" — just continue
- If rate limited, wait 10s and retry once, then log ⚠️
- Stop conditions: All tasks complete, 3 consecutive unrecoverable errors, or user says "stop".

## Section 7: Reflection Loop
Use after every task, file edit, or command sequence before moving forward.

- **PAUSE**: re-read the requirement and the created output
- **CHECK**: does output match requirement? Every requested item covered or marked ⚠️
- **VERIFY**: run tests / count files / check paths. Evidence or clear assumption is present.
- **FIX**: if mismatch, repair issues before the next task.
- **LOG**: write `Self-check: PASS — [what was checked]` or `Self-check: FAIL — [issue found] | Action: [fixed]`

**Quality Gate Rules**:
- File output: Created/updated files must exist
- Tables: No empty cells, use status markers
- Counts: Verify with search, or mark ⚠️ if estimated
- Safety: No credentials, source-files/ untouched

## Section 8: Multi-Agent Protocol
- Orchestrate, don't write: use Agent Manager for independent tasks
- Max 5 parallel agents
- Explicit file boundaries (no overlapping edits)
- Each agent gets 1 task scope

## Section 9: Graphify Usage
- Before reading files for architecture questions: run `graphify query "<question>" --budget 2000`
- Use returned nodes/edges to scope file reads.
- Fallback: GRAPH_REPORT.md
- After sprint: run `graphify update .` before commit
- Advanced commands: `graphify path`, `graphify explain`, check `wiki/index.md`.

## Known Issue: Community Labels (June 2026)
- Current GRAPH_REPORT.md (commit abbbe223) has 4,580 communities, all labeled generically "Community N"
- Archive from 2026-06-02 had 200 named communities — names were lost during rebuild
- Impact: Cosmetic only. graph-search.py queries work via node/edge relationships, not labels
- TODO: Re-run Graphify community labeling step in a future maintenance sprint
- Priority: Low — defer until after Newmont deliverables

## Section 10: QA & Self-Healing
- Blueprint-First: For ANY task creating 3+ new files → call @blueprint-architect first
- Self-Healing Loop: After sprint, call @quality-auditor. Re-index → commit only AFTER audit PASS
- Loop flow: Build -> Audit -> If PASS (commit/push) -> If FAIL (apply fixes, retry max 3 attempts) -> If 3 FAILS (escalate to Mel)
- Commander Integration: Commander delegates -> Builder executes -> Builder calls Auditor -> Commander reviews.

## Section 11: Skill System
- Track 3+ repeating action sequences across 3+ sessions
- Propose new skills in .agents/skills/_auto/_proposals/
- Limit: Max 5 proposals per week. Token savings > 500 per use.
- Do NOT auto-activate skills. Ask Mel for approval.
- Lifecycle: Draft (born) → Tested (3 uses) → Proven (10 uses) → Optimized (50 uses) → Retired
- Markdown format requires: Trigger, Steps, Token Savings, Evidence, Status.

## Section 12: Expert Frameworks
- Anti-marathon: stop after 3 failed attempts
- Same rules apply to all agents (quality-auditor, builder, etc.)
- ROUTER: Check if subtasks are independent (parallel vs sequential)
- RIGOR DIAL: Experiment log, note before/after results for prompts
- 4-GATE: Generalize edge cases, state uncertainty, don't hide it
- WARNING SYSTEM: Drift detection (data source changed, model degraded)
- ANTI-OVERBUILDING: Make it work, make it right, make it fast (prototype = skip ceremony)
- TRUTH GATE: "Would I be comfortable if this output was public?"
- KILL-CANDIDATE: "Energy unsustainable" check — stop if spending hours on a 30-min task.

## Section 13: SDD Methodology (v5.1)
- Complexity check: ≤3 files = fast path, 4-10 = light spec, 10+ = full SDD
- Spec location: specs/[feature-name].md
- Flow: Spec → Plan → Implement → Verify
- NEVER skip spec for 10+ file changes

## Section 14: Decision Memory (v5.1)
- All architectural decisions logged in .ungasis/decisions/ADR-NNN-slug.md
- Template: .ungasis/decisions/TEMPLATE.md
- Review before making similar decisions

## Section 15: Presets (v5.1)
- Available presets: builder, research, debug, design, founder
- Activate via: ungasis preset [name]
- Each preset configures: model routing, token budget, output format

## Section 16: Agent Routing / Foreman Protocol (v5.1)
- Tier 1 Free: Google AI Pro, Cerebras, Groq → use for drafts, research, fast iteration
- Tier 2 Paid: Claude Pro → use for architecture, complex reasoning, multi-file changes
- Tier 3 Async: Jules (GitHub PRs), GitHub Actions (scheduled tasks)
- Rule: ALWAYS try Tier 1 first. Escalate to Tier 2 only when Tier 1 insufficient.

## Section 17: Mobile Pipeline (v5.1)
- Claude Dispatch: terminal commands from phone
- Claude Remote Control: approve/reject from phone
- Claude Channels: Telegram/iMessage/Discord quick commands (P2)

## Section 18: Anti-Patterns (v5.1)
- NEVER have 2+ files containing the same rule (single source of truth = THIS FILE)
- NEVER skip backup before major changes
- NEVER use local LLMs for coding tasks (cloud-first)
- NEVER exceed 3 retry attempts without asking user

## Section 19: Context Management (v5.1)
- Subagent delegation: reading/analyzing 3+ files → dispatch a subagent; main thread receives summary only
- Subagent model: haiku default (CLAUDE_CODE_SUBAGENT_MODEL) — escalate per-task only for reasoning-heavy work
- Compaction preservation: critical instructions must survive /compact — project name+version (UNGASIS OS v5.1), active mission/sprint file, file conventions (200-line cap, staleness footers), git convention (`type: description`), source-files/ + archive/ READ ONLY
- Session hygiene: /clear between unrelated tasks; manual /compact at 60% context; autocompact fires at 50% (CLAUDE_AUTOCOMPACT_PCT_OVERRIDE)
- Token budget awareness: working context <4,000 tokens (Section 4); .claudeignore keeps archives/caches out of context

<!-- This file is the SINGLE SOURCE OF TRUTH for all agent rules. -->
<!-- .agents/rules/ and .clinerules/ are reference copies only. -->

> Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
