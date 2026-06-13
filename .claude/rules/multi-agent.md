# Multi-Agent Protocol (Detailed)
# Moved from CLAUDE.md Section 8

## Orchestration Rules
- Orchestrate, don't write: use Agent Manager for independent tasks
- Max 5 parallel agents
- Explicit file boundaries (no overlapping edits)
- Each agent gets 1 task scope

## Agent Memory
- Builder memory: ~/.claude/agent-memory/builder/
- Reviewer memory: ~/.claude/agent-memory/reviewer/
- QA memory: ~/.claude/agent-memory/qa/

## Recovery Protocol
- 3 failures → rewrite prompt, don't retry same approach
- Subagent delegation: 3+ files → dispatch subagent, main thread gets summary only
- Subagent model: haiku default, escalate only for reasoning-heavy work

Last reviewed: June 2026
