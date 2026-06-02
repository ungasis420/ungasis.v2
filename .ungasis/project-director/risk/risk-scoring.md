# Risk Scoring

## Purpose
This document defines standard scoring matrices and action thresholds used to evaluate risk severity and determine appropriate response urgency.

## Probability × Impact Matrix

| Probability \ Impact | Low (1) | Medium (2) | High (3) |
|---|---|---|---|
| **High (3)** | 3 (Monitor) | 6 (Immediate) | 9 (Immediate) |
| **Medium (2)** | 2 (Accept) | 4 (Monitor) | 6 (Immediate) |
| **Low (1)** | 1 (Accept) | 2 (Accept) | 3 (Monitor) |

## Action Thresholds

| Score Range | Severity Tier | Required Action | Review Frequency |
|---|---|---|---|
| **6 - 9** | Immediate | Active mitigation plan required; escalate to Commander if unmitigated. | Daily review |
| **3 - 5** | Monitor | Log risk in register; monitor for changes in status or probability. | Weekly review |
| **1 - 2** | Accept | Accept risk without active mitigation; review periodically. | Monthly review |

## Rules
1. **Score Calculation**: Risk Score = Probability Value (1-3) × Impact Value (1-3).
2. **Escalation Trigger**: Any risk scored >= 6 must have active mitigation steps defined within 24 hours.

## Inputs/Outputs
- **Inputs**: Risk observations, impact parameters.
- **Outputs**: Risk score, severity tier classification.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
