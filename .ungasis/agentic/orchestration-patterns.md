# Orchestration Patterns

## Purpose
Define the cooperation patterns governing how multiple agents coordinate their work on single tasks or sprints.

## How It Works
Agents cooperate using one of the five patterns below, depending on the complexity and dependency structure of the task.

## Rules
1. Use Sequential pattern by default for developer-review pipelines.
2. Use Parallel pattern only when subtasks have zero cross-dependencies.
3. Use Self-Healing pattern for all production releases and sprint checkpoints.

## Patterns

| Pattern | How It Works | When to Use | Example |
|---|---|---|---|
| Sequential | A → B → C (pipeline) | Tasks depend on each other | Build → Review → Deploy |
| Parallel | A + B + C simultaneously | Independent subtasks | Copilot plans + Cline debugs + Jules tests |
| Hierarchical | Manager assigns to workers | Complex multi-part task | You assign subtasks to 3 agents |
| Self-Healing | Build → Audit → Fix → Retry | Quality-critical work | Sprint with @quality-auditor loop |
| Swarm | Agents self-organize | Future (not yet supported) | Placeholder for Form 2 |

## Inputs/Outputs

| Input | Output |
|---|---|
| Quest requirements & dependencies | Selected Orchestration Pattern |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
