# reasoning-budget.md — Reasoning Token Budgets

## Purpose
This document monitors and limits token usage for reasoning processes to prevent excessive API costs.

## How It Works
The engine checks token usage at each reasoning step and halts execution if the allocated budget is exceeded.

## Reasoning Depth Allocations
| Reasoning Depth | Max Tokens Per Task | Target Cost Per Run | Model Selection |
|---|---|---|---|
| **Deep** | 500 tokens | ~$0.015 | Claude Opus |
| **Moderate** | 200 tokens | ~$0.002 | Gemini Flash / Pro |
| **Skip** | 0 tokens | $0.000 | Fast Execution |

## Monthly Tracking Rules
1. **Budget Cap**: Never spend more than 30% of a single session's tokens on reasoning logic alone.
2. **Weekly Review**: Reset the reasoning count every Sunday and review cumulative weekly costs.
3. **Escalation Trigger**: If monthly reasoning costs exceed $10, downgrade default reasoning depth to Skip for low-priority tasks.

## Inputs and Outputs
- **Inputs**: Call log stats, monthly billing logs.
- **Outputs**: Budget allocation status, cost limits warnings.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
