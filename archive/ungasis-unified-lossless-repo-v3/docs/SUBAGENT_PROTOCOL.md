# Subagent Protocol (On-Demand)

> Load this file ONLY when spawning subagents.

## When to Use Subagents
- Noisy investigation that would pollute main context
- Parallel tasks that are independent
- Codebase mapping before starting work

## Rules
1. Give the subagent a clear, scoped task
2. Subagent returns SUMMARY ONLY (not full file contents)
3. Parent agent uses summary to proceed
4. Subagent context is isolated and discarded after use

## Available Subagents
- .claude/agents/codebase-mapper.md - find relevant files
- .claude/agents/reviewer.md - review changes before commit
