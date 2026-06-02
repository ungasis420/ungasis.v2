# Smoke Test: Shared State and Model Routing

## Prompt

```text
I have a coding task with many files. Pick the model tier, assign agent roles, update the task board, and explain which shared-state file should be touched.
```

## Expected

- Starts with the task stage and risk.
- Uses Model Routing v4.1.
- Starts at Tier 2 unless architecture/security requires Tier 1.
- Updates or references `TASK_BOARD.md`.
- Writes durable notes to `memory/PROJECT_MEMORY.md` only when needed.
- Writes decisions to `memory/DECISIONS.md` only when an important choice is made.
- Does not expose secrets.
