# Revenue Rules

## Purpose
Define the decision parameters for when to pivot, persist, or pause development based on revenue metrics.

## How It Works
The engine evaluates project traction and timeline milestones against strict pivot and persistence rules to prevent over-building unvalidated ideas.

## Rules
1. **Pivot Directive**: If a project shows no revenue progress for 3 consecutive months, it must be halted and re-evaluated for a pivot.
2. **Persist Directive**: Persist with the current monetization plan if there are growing positive user signals or expanding weekly usage.
3. **Revenue-First Rule**: You must always validate the revenue model before writing code, following the `00-revenue-validation.md` SOP.
4. **Validation Proof**: A written record of validation (surveys, pre-orders, or signups) must be linked in the dashboard.

## Inputs/Outputs
| Component | Input Criteria | Output Action |
|---|---|---|
| Revenue Evaluator | Time elapsed without revenue, active usage trends, validation docs | Pivot/Persist decision status |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
