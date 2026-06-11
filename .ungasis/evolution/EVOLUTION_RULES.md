# Evolution Rules

## Purpose
Define when and how the UNGASIS OS observes its own performance and adapts rules automatically.

## How It Works
```
EVERY SESSION:
1. WORK      ← Agent does tasks
   ↓
2. OBSERVE   ← Track: tokens, errors, time, model used
   ↓
3. REFLECT   ← Compare: expected vs actual performance
   ↓
4. ADAPT     ← Update: rules, routing, budgets
   ↓
5. RECORD    ← Save: lesson learned to knowledge/wiki/
→ NEXT SESSION STARTS SMARTER
```

## Rules
1. Never modify a file listed in the `EVOLUTION_LOCK.md` without Mel's explicit command.
2. Routing optimizations and budget changes must follow the Adaptation Approval Levels table.
3. Automatically log all adaptations to `adaptations/` with trigger, action, and evidence.

## Metrics Tracked

| Metric | How Tracked | Used By |
|---|---|---|
| Tokens per task | Count input + output | Layer 4 (routing optimization) |
| Model success rate | Completed without retry? | Layer 4 (model scoring) |
| Context hit rate | Did Graphify return useful nodes? | Layer 6 (graph tuning) |
| Cache hit rate | How often was semantic cache useful? | Layer 10 (cache tuning) |
| Error rate | How many tool calls failed? | Layer 14 (MCP (Model Context Protocol) optimization) |
| Time to complete | Wall clock per task | Overall efficiency |
| Human corrections | How often did Mel say "redo this"? | Rule quality scoring |

## Adaptation Rules

| If system notices... | It automatically... |
|---|---|
| Model X fails 3x on task type Y | Updates `MODEL_ROUTING.md`: route Y → different model |
| Graphify returns 0 results for topic Z | Flags: "Knowledge gap — topic Z not in graph" |
| Token budget exceeded 5 sessions in a row | Increases budget OR adds compression step |
| Same error pattern appears 3x | Adds to GOTCHAS + creates prevention rule |
| A template is never used | Flags for removal in next review |
| A module is referenced 50x | Promotes to "core" with higher cache priority |

## Adaptation Approval Levels
Use this table to check if changes require human confirmation:

| Change Type | Auto or Human? |
|---|---|
| Log a metric | Auto (always) |
| Flag a knowledge gap | Auto (always) |
| Suggest a routing change | Auto-propose, human approves |
| Modify MODEL_ROUTING.md | Human approves (via weekly review SOP) |
| Add to GOTCHAS.md | Auto (low risk) |
| Modify token budgets | Human approves |

## Inputs/Outputs

| Input | Output |
|---|---|
| Session Metrics (tokens, errors, time) | Optimized Rules, Gotchas, and Routing |

## Impact Table
| Metric | Static Rules | Self-Evolving |
|---|---|---|
| Rule quality over time | Same | Improves every session |
| Knowledge gaps | Invisible | Auto-detected and flagged |
| Model routing accuracy | ~70% | ~95% after 20 sessions |
| Manual rule updates needed | Weekly | Monthly |
| Adaptation to new projects | Manual reconfig | Auto-adjusts within 3 sessions |

## Scout Integration
When the Scout Engine discovers a HIGH-relevance item:
1. Log to `scout-log.md` (auto)
2. Flag in `CONTEXT.md` next session summary (auto)
3. Human reviews and marks ADOPT/WATCH/IGNORE (human)
4. If ADOPT: move to `adaptation-queue.md` with implementation plan (human)
5. Implement in next available sprint (follows normal pipeline)

Scout discoveries that affect `MODEL_ROUTING.md` or token budgets require human approval per the Adaptation Approval Levels table.

## Additional Context

### When to Use
Use evolution rules to evaluate session metrics and adapt system parameters automatically.

### Example
```markdown
- [ ] Measure error rate: 5 fails.
- [ ] Check if MCP (Model Context Protocol) optimization is needed.
- [ ] Suggest routing adaptation to Groq.
```

### Tags
evolution, self-adaptation, metrics, optimization

### See also
- [evolution/metrics-pipeline.md](./.ungasis/evolution/metrics-pipeline.md)
- [evolution/EVOLUTION_LOCK.md](./.ungasis/evolution/EVOLUTION_LOCK.md)

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
