---
name: commander
description: >
  Activate Commander orchestration mode to plan, delegate, and review tasks across agents.
---

# /commander — Orchestration Mode

Activate Commander mode for task orchestration.

## When to Use
- Session start (plan what to work on)
- When Mel asks "what should I do next?"
- When a multi-sprint task needs decomposition
- When routing decisions are needed (which agent handles what)

## Steps
1. Read .ungasis/architect/BLUEPRINT_CONTEXT.md (compressed context)
2. Read .ungasis/orchestrator/queue.md (pending tasks)
3. Read CONTEXT.md (last session state)
4. Check .ungasis/warnings/warning-log.md for active warnings
5. Assess: What needs to be done? Prioritize by impact.
6. Decompose: Break large tasks into atomic tasks with agent routing
   - 3+ files → @blueprint-architect
   - 1-2 files → Surgeon (Cline)
   - Heavy build → Builder (Antigravity main)
   - Quality check → @quality-auditor
   - Graph update → @graphify-watchdog
7. Generate delegation prompts using templates from
   .agents/skills/commander/delegation-templates/
8. After task completion: review output against acceptance criteria
9. Update CONTEXT.md with results
10. Suggest what Mel should do next (Proactive > Reactive)

## Token Budget
- Max 500 tokens per delegation prompt
- Use BLUEPRINT_CONTEXT.md, not individual files

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
