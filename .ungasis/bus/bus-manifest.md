# Bus Manifest

## Purpose
Document the authorized interconnect channels and communication mappings between UNGASIS engines.

## How It Works
```
Producer Engine ──> Publishes Event ──> Bus Router ──> Delivers to Consumer Engine
```

## Rules
1. Every engine connection must be registered in the Manifest Table before transmitting events.
2.
No direct engine-to-engine API (Application Programming Interface) calls are allowed; all
data must flow through the event bus.
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
| Warning Engine | Self-Evolution | `warning_triggered` | Feed warning logs into adaptation engine | L2 |
| Suggestion Engine | Auto-Orchestrator | `suggestion_emitted` | Update queue priorities based on suggestions | L1 |
| Suggestion Engine | Cortex | `suggestion_adopted` | Record adopted suggestion in cortex learnings | L1 |
| Test Intelligence | Quality Auditor | `test_completed` | Publish validation results to QA auditor | L1 |
| Quality Scoring | Quality Auditor | `quality_scored` | Grade finished files based on metrics | L1 |
| Quality Scoring | Self-Evolution | `quality_trend_dipped` | Trigger remediation on low average quality | L2 |
| Timeline Engine | Warning Engine | `timeline_delayed` | Warn when task or sprint exceeds estimate | L2 |
| Energy Management | Session Planner | `energy_level_changed` | Adjust task allocation weights | L1 |
| Energy Management | Suggestion Engine | `break_recommended` | Trigger fatigue relief suggestion | L1 |
| JARVIS Core | ALL Engines | `principle_asserted` | Assert core principles on all engine actions | L0 |
| Situational Awareness | ALL Engines | `pulse_generated` | Broad-pulse status check of active systems | L1 |
| Constraint Reasoning | Decision Engine | `constraint_raised` | Adjust planning logic under constraints | L2 |
| Gaps Radar | Cortex | `gap_identified` | Request learning session for missing skill | L1 |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| Event registration | Developer | Mapping details for new engine links |
| Message request | Source Engine | Event payload and target address |

| Output | Destination | Description |
|---|---|---|
| Connection status | CLI / Logs | Active status of the bus route |
| Forwarded payload | Destination Engine | Decoupled event message |

## Additional Context

### When to Use:
Use the Bus Manifest to verify that events are correctly mapped between emitters and consumers.

### Example
```markdown
- [ ] Register new emitter `routing-close.py` publishing to consumer `Cortex`.
- [ ] Verify that security shield level matches constraints.
```

### Tags:
event-bus, interconnect, security-shield, messaging

### See also:
-
[events/event-framework.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/events/event-framework.md)
- [router/smart-router.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/router/smart-router.md)

## Jargon Explanations

- API stands for Application Programming Interface.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
