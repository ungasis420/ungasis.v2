# Context Loops

## Purpose
Manage context growth and decay mid-session, triggering compaction or handoff states to maintain token efficiency.

## How It Works
```
Context Fresh → Growing (each response) → Reaches 70% Limit → Composed to Compact → Reset / Continue
```

## Rules
1. Context growth: each agent response adds ~500-1000 tokens to context.
2. Compaction trigger: when context reaches 70% of model's limit, run the compaction workflow.
3. Compaction method: summarize tool results (keep conclusions, discard raw data), compress conversation history (keep decisions, discard back-and-forth), and checkpoint to CONTEXT.md before compacting.
4. Handoff: when switching agents mid-session, export only: task description + current state + decisions made + next steps (never pass full history).

## Inputs/Outputs

| Input | Trigger |
|---|---|
| Current context size | Every model invocation / turn |
| Agent switch event | Handoff initialization |

| Output | Action |
|---|---|
| Compacted context | 70% compaction trigger execution |
| Handoff packet | Simplified handoff format generation |

## Reference
Refer to Layer 12 (compact at 70%) and Layer 16 (context decay) from [ungasis-token-policy.md](./modules/ungasis-token-policy.md).

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
