# Risk Review Rules

## Purpose
This document establishes rules for monitoring frequencies, review cadences, and escalation thresholds for active risks.

## How It Works
The system scans `risk-register.md` and enforces the review schedule based on individual risk scores.

## Review Frequency Table

| Risk Score | Risk Severity | Review Cadence | Action |
|---|---|---|---|
| **>= 6** | Critical / High | Daily review | Verify mitigation effectiveness |
| **3 - 5** | Medium | Weekly review | Review during Sunday review session |
| **<= 2** | Low | Monthly review | Periodic verification of status |

## Rules
1. **Daily Cadence**: Check critical risks (score >= 6) before starting any development work.
2. **Escalation Protocol**: If an active risk score rises to >= 6 and mitigation fails, escalate the item immediately to the Commander subagent to decide on halting work.
3. **Log Frequency**: All risk reviews must update the "Last Updated" column in `risk-register.md`.

## Inputs/Outputs
- **Inputs**: Active `risk-register.md`, execution logs.
- **Outputs**: Review triggers, escalation decisions.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
