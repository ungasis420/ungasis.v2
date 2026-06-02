# Bus Rules

## Purpose
Define priority settings, throttling thresholds, and error handling strategies for the engine interconnect bus.

## How It Works
```
Event Received ──> Assess Priority ──> Throttling Check ──> Route to Target
                                                                │
                                                        Delivery Fails ──> Retry 3x ──> Escalation
```

## Rules
1. Process high-priority events (e.g., API limits, system errors) immediately, pre-empting lower-priority log events.
2. Apply throttling to any event category exceeding 50 dispatches per minute.
3. Automatically retry failed event transmissions 3 times with exponential backoff (1s, 2s, 4s).
4. Escalate persistent transmission failures to the escalation matrix.

## Event Priorities and Rules

| Event Class | Priority | Max Rate / Min | Error Action | Escalation Target |
|---|---|---|---|---|
| Resource Limit Warnings | Critical | 10 | Immediate Retry | Mel |
| Code Audit Failures | High | 20 | Retry in 5s | Quality Matrix |
| Discovery Logs | Medium | 30 | Log and Skip | Scout Queue |
| Routine Metrics | Low | 60 | Drop on Failure | Dev Null |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| Raw Bus Event | Interconnect Bus | Active message to be processed |

| Output | Destination | Description |
|---|---|---|
| Dispatched Event | Target Engine | Event routed in order of priority |
| Error Log | Disk (`bus-error.log`) | Delivery failure details |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
