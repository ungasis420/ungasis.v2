# decomposer-rules.md — Goal Decomposer Rules

## Purpose
This engine defines rules for breaking down high-level user commands into atomic, manageable tasks that agents can execute without exceeding context budgets.

## How It Works
When a task is loaded, the Decomposer analyzes the file count and complexity. If the task is larger than a medium size, it splits the goal into smaller tasks, assigns an agent to each, and outputs a decomposition sheet.

## Rules
1. **Decomposition Levels**: Never decompose tasks deeper than 3 levels (Goal → Sub-goal → Atomic Task).
2. **Execution Limit**: Each atomic task must represent no more than 30 minutes of execution time.
3. **Clear Outputs**: Every task must result in a concrete, verifiable output (e.g. a file created or updated).
4. **Trigger Threshold**: Automatically trigger decomposition when a quest targets 3+ files or is rated Large.
5. **Agent Routing**: Route tasks using the table below.

| Task Complexity | File Count | Target Agent | Reason |
|---|---|---|---|
| Architecture / Spec | 3+ files | Architect 📐 | Blueprint planning needed |
| Standard Build | 1-5 files | Builder 🏗 | Standard file writing |
| Small bug fix | 1-2 files | Surgeon 🔪 | Fast Cerebras model is cheaper |
| Test suite / docs | any | Jules 🧪 | Best for unit test frameworks |

## Inputs and Outputs
- **Inputs**: High-level user goal, `BLUEPRINT_CONTEXT.md` context file.
- **Outputs**: Decomposed task list, `goal-decomposed` event emitted to bus-manifest.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
