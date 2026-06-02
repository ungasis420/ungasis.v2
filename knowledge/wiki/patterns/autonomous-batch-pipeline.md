# Autonomous Batch Pipeline

## What
An orchestration pattern where a commander agent generates all sprint prompts upfront, a builder executes them sequentially, and an auditor verifies each sprint outcome recursively.

## Code
```markdown
MODE 2 (Commander Pipeline):
1. Commander generates prompts upfront for all sprints.
2. User pastes prompts one-by-one.
3. Builder executes each prompt in a self-contained manner.
4. Auditor audits files created in each sprint.
```

## When to Use
Use when performing multi-sprint upgrades, complex feature builds, or batch migration processes involving multiple file modifications.

## Gotchas
- The builder agent might lose context or drift in long batches; mitigate this by checkpointing `CONTEXT.md` mid-batch.
- Mel's copy-paste action remains the primary speed bottleneck between sprint executions.

## Source
Learned in: UNGASIS v5.0 Batch 1-4 execution (June 3, 2026)
Verified in: UNGASIS OS

## Tags
orchestration, batch, pipeline, commander, automation

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
