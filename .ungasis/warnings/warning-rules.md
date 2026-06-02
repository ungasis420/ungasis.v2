# Warning Rules Engine

## Purpose
Define the triggers, severities, and corrective actions for predictive system warnings to prevent session failures.

## How It Works
```
System Metrics ──> Evaluated by Warning Rules ──> Severity Set 🔴🟡🟢 ──> Route Action to event bus
```

## Rules
1. Warnings must be evaluated at the start of each session and after any file changes.
2. A warning is classified into one of three severities: L3 (🔴 Critical), L2 (🟡 Warning), or L1 (🟢 Info).
3. If any L3 warning triggers, execution must stop until a human review resolves the issue.

## Warning Triggers

| Condition | Severity | Action |
|---|---|---|
| Stale file >90 days without updates | 🟡 Warning | Run tag-sweep on target directory |
| API key expires <7 days | 🔴 Critical | Notify human to rotate keys immediately |
| queue.md has >20 pending tasks | 🟡 Warning | Suggest task decomposition or deferral |
| Workspace context >70% capacity | 🔴 Critical | Run Context Decay compression protocol |
| 3 audit failures in a row | 🔴 Critical | Lock session and trigger Rollback Engine |
| No Git push >24 hours | 🟡 Warning | Prompt human to commit and push changes |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `context_status` | Context Engine | Current context window utilization percentage |
| `task_count` | Conductor | Number of open tasks in queue.md |
| `git_status` | CLI / Git | Timestamp of last push and uncommitted edits |
| `audit_results` | Quality Auditor | PASS/FAIL history |

| Output | Destination | Description |
|---|---|---|
| `warning_triggered` | Event Bus | warning event payload containing severity |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
