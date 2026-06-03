# UNGASIS OS — Multi-Agent Orchestration Protocol
> Based on patterns from Andrej Karpathy and Boris Cherny.
> Applied when using Antigravity Agent Manager or spawning subagents.

## Core Philosophy
- "Orchestrate, don't write" — human role is reviewing, not coding
- "Slowest smartest for architecture, fastest for execution"
- "Each subagent gets ONLY the data it needs"
- "Skill issue, not model issue" — if failing, fix the prompt

## When to Use Parallel Agents (Agent Manager)

| Condition | Action |
|---|---|
| Tasks are independent (no shared output) | YES → Agent Manager (parallel) |
| Tasks share dependencies | NO → Right Panel (sequential) |
| Need "done" checkpoints between steps | NO → Right Panel |
| "Just do all of it" autonomous work | YES → Agent Manager |
| First time doing something new | NO → Right Panel (learn first) |
| Repeating a proven pattern | YES → Agent Manager |

## Spawning Rules
1. Each agent gets its own task scope (1 file or 1 feature)
2. Define explicit FILE BOUNDARIES — no two agents edit the same file
3. Each agent prompt includes:
   - Goal (1 sentence)
   - Input files (read-only list)
   - Output files (write list — exclusive to this agent)
   - Verification command
   - Context snippet (only what's needed, not full handoff)
4. Max 5 parallel agents (diminishing returns beyond 5)
5. Merge results after all agents complete (human reviews)

## Conflict Prevention
- NEVER let two agents write to the same file
- If Agent A creates types that Agent B needs:
  → Run Agent A first (Right Panel)
  → Then spawn Agents B, C, D, E in parallel (Agent Manager)
- Shared types/interfaces = foundational task (always sequential first)

## Agent Prompt Template (for Agent Manager)

/goal [1-sentence objective]
Agent Task: [Name]
INPUT (read-only)
[file1.ts] — [what to read from it]
[file2.json] — [what to read from it]
OUTPUT (this agent writes ONLY these files)
[new-file.ts] — [what to create]
SPEC
[3-5 bullet points describing exactly what to build]
VERIFICATION
Run: [command] Expected: [success criteria]
RULES
Do NOT modify any file not listed in OUTPUT
Wild Rift MOBILE ONLY
Max 200 lines per file
Simple English

## Session Lifecycle with Agent Manager

RIGHT PANEL: Build foundation (shared types, interfaces, base files)
WAIT for "done"
AGENT MANAGER: Spawn 3-5 parallel agents for independent tasks
WAIT for all agents to complete
RIGHT PANEL: Integration task (wire parallel outputs together)
RIGHT PANEL: Run verification (npm run build, audit script)
COMMIT: git add . && git commit

## Recovery Protocol
- If agent fails: check output, fix prompt, retry THAT agent only
- If 2+ agents fail: something foundational is wrong → fix base first
- If merge conflicts: human resolves (review both outputs, pick best)

## Token Math (Why Parallel Saves Tokens)
- 1 session × 6 tasks = ~180K tokens (context accumulates)
- 6 sessions × 1 task = ~60K tokens (each starts fresh)
- Savings: ~67% fewer tokens
- Bonus: 3-5x faster (wall clock time)

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
