# Bus Manifest

## Purpose
Document the authorized interconnect channels and communication mappings between UNGASIS engines.

## How It Works
```
Producer Engine ──> Publishes Event ──> Bus Router ──> Delivers to Consumer Engine
```

## Rules
1. Every engine connection must be registered in the Manifest Table before transmitting events.
2. No direct engine-to-engine API calls are allowed; all data must flow through the event bus.
3. Connections must specify the event severity level allowed (L0-L4).
4. Deprecated routing links must be removed within one week of engine refactoring.

## Inter-Engine Connections

| Source Engine | Destination Engine | Event Type | Purpose | Security Shield |
|---|---|---|---|---|
| Context Engine | Agentic Framework | `context_composed` | Inject context into agent prompt | L1 |
| Quality Auditor | Self-Evolution | `audit_completed` | Trigger adaptation on audit failures | L2 |
| Scout Engine | Self-Evolution | `tech_discovered` | Feed discovered tech into adaptation queue | L1 |
| Task Manager | Self-Evolution | `metrics_logged` | Analyze task performance metrics | L1 |
| Resource Manager | Decision Engine | `api_limit_near` | Trigger key rotation or pause actions | L3 |
| Goal Decomposer | Auto-Orchestrator | `goal_decomposed` | Trigger task sizing & queueing | L1 |
| Goal Decomposer | Auto-Orchestrator | `tasks_queued` | Add decomposed tasks to queue | L1 |
| Session Planner | Auto-Orchestrator | `session_planned` | Emit session schedule details | L1 |
| Rollback Engine | Self-Evolution | `rollback_triggered` | Log rollback event as adaptation | L2 |
| Risk Intelligence | Self-Evolution | `risk_escalated` | Trigger risk mitigation adaptation | L2 |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| Event registration | Developer | Mapping details for new engine links |
| Message request | Source Engine | Event payload and target address |

| Output | Destination | Description |
|---|---|---|
| Connection status | CLI / Logs | Active status of the bus route |
| Forwarded payload | Destination Engine | Decoupled event message |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
