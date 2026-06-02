# Agentic Framework

## Purpose
Define the master system architecture for how multiple AI agents cooperate, handle failures, and continuously improve in UNGASIS.

## How It Works
AI agents are organized under 7 structured disciplines, which define their specific roles, orchestration rules, state handoffs, safety thresholds, and learning loops.

## Rules
1. Every agent operation must respect its defined boundaries in the capability-matrix.md.
2. State must be preserved across agent boundaries using the handoff-protocol.md.
3. Errors must trigger fallback mechanisms before escalating to Mel.

## The 7 Disciplines of Agentic Engineering

| # | Discipline | What It Covers | UNGASIS Coverage |
|---|---|---|---|
| 1 | Agent Design | Roles, capabilities, boundaries | ✅ [AGENTS.md](file:///c:/Users/63905/Downloads/ungasis/AGENTS.md), [CLAUDE.md](file:///c:/Users/63905/Downloads/ungasis/CLAUDE.md), [GEMINI.md](file:///c:/Users/63905/Downloads/ungasis/GEMINI.md) |
| 2 | Orchestration Patterns | Sequential, parallel, hierarchical, swarm, hybrid | ✅ [orchestration-patterns.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/agentic/orchestration-patterns.md) |
| 3 | State Management | Shared state, checkpoints, handoff packets | ✅ [CONTEXT.md](file:///c:/Users/63905/Downloads/ungasis/CONTEXT.md), MEMORY_BANK |
| 4 | Failure Engineering | Retry, fallback, escalate, circuit break, self-heal | ✅ `config/circuit-breaker.yml` |
| 5 | Evaluation & Scoring | Task completion, token efficiency, error rate | ⚠️ Partial → connects to Evolution (Engine 2) |
| 6 | Safety & Governance | Permissions, approval gates, kill switch, audit trail | ✅ `EVOLUTION_LOCK`, permission-profiles |
| 7 | Continuous Improvement | Observation, metrics, feedback, knowledge, skills | ⚠️ Partial → connects to Engines 2 + 7 |

## Inputs/Outputs

| Input | Description |
|---|---|
| Task request | Decomposed goals and requirements from Mel. |
| Agent state | Current context and history before the handoff. |

| Output | Description |
|---|---|
| Completed quest | Fully verified codebase changes and walkthrough logs. |
| Learned patterns | Newly extracted gotchas and optimized skills. |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
