# Metrics Pipeline

## Purpose
Define the process and data flow for aggregating task-level performance metrics into system-level self-evolution adaptations.

## How It Works
```
Task Metrics Saved ──> Weekly Aggregator ──> Check Performance Targets
                                                     │
                                            Target Missed (e.g., <90% Pass)
                                                     │
                                                     ▼
                                            Log Adaptation Request
```

## Rules
1. Automatically scan the `.ungasis/evolution/metrics/` folder for new task logs during the weekly review.
2. Aggregate key performance indicators (KPIs) into a summary table.
3. If the task success rate falls below 90% or average token waste exceeds 25%, trigger a prompt revision.
4. Clean up or archive task metrics logs that are older than 30 days.

## Performance Thresholds and Actions

| Metric | Target | Action on Breach | Escalation Target |
|---|---|---|---|
| Task Success Rate | >= 90% | Trigger Prompt Audit | Quality Auditor |
| Token Waste Rate | < 20% | Restructure Context Profile | Context Composer |
| Average Task Time | < 15 min | Decompose Sprints Smaller | Blueprint Architect |
| Audit Cycle Retries | <= 1 | Revise Rules & Conventions | Mel |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| Task Metric Log | Disk (`.ungasis/evolution/metrics/*.md`) | Individual task run records |

| Output | Destination | Description |
|---|---|---|
| Summary Report | Disk (`.ungasis/evolution/metrics/README.md`) | Weekly aggregated summary |
| Adaptation Trigger | Disk (`.ungasis/evolution/adaptations/`) | Requested rule or model change |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
