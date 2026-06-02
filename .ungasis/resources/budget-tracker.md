# Budget Tracker

## Purpose
Track, log, and control the monthly API expenditure for the UNGASIS workspace to keep costs within the specified limits.

## How It Works
```
Agent Session Ends ──> Calculate Cost ──> Log to Budget Table ──> Assess Limit Status
                                                                       │
                                                            Limit Exceeded (>80%)
                                                                       │
                                                                       ▼
                                                            Switch to Free Models
```

## Rules
1. The total workspace monthly budget is strictly capped at $19.99.
2. Record token costs for paid models (e.g., Together, OpenRouter) after every session.
3. Automatically dispatch a critical warning when usage exceeds 80% of the budget.
4. Block all paid API requests once the monthly limit is reached, falling back to free tiers.

## Monthly Spend Log (June 2026)

| Date | Session ID | Model / Provider | Input Tokens | Output Tokens | Estimated Cost | Total Monthly Spend |
|---|---|---|---|---|---|---|
| 2026-06-02 | SES-01 | Gemini 3.5 Flash | 1.2M | 50K | $0.00 (Sub) | $0.00 |
| 2026-06-02 | SES-02 | Together AI | 500K | 20K | $0.15 | $0.15 |
| 2026-06-03 | SES-03 | OpenRouter | 100K | 5K | $0.05 | $0.20 |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| Task Metrics | Disk (`.ungasis/evolution/metrics/`) | Token count and runtime data |

| Output | Destination | Description |
|---|---|---|
| Updated spend balance | Disk (`budget-tracker.md`) | New monthly total cost |
| Warning alert | Bus Interconnect | Signal to route tasks to free tiers |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
