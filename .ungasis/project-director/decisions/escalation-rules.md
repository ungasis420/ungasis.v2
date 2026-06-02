# Escalation Rules

## Purpose
This document defines standard criteria and templates for determining when an agent can make autonomous decisions versus when it must escalate to Mel.

## How It Works
The active agent checks decision parameters against the rules matrix below before taking action.

## Decision Matrix

| Metric | Auto-Decide (Run) | Escalate to Mel (Stop) |
|---|---|---|
| **Risk Score** | Score < 4 | Score >= 6 |
| **Financial Cost** | $0 cost | Cost > $0 |
| **Reversibility** | Reversible change (git reset) | Irreversible change / data loss risk |
| **Precedent** | Existing pattern in `decisions/` | No precedent on record |

## Escalation Template
When escalating a decision to Mel, use the following format:
```markdown
### ⚠️ DECISION ESCALATION REQUIRED
- **Situation**: [Explain the issue briefly]
- **Options**:
  1. Option A: [Description, pros, cons]
  2. Option B: [Description, pros, cons]
- **Recommendation**: [Which option the agent recommends and why]
- **Urgency**: [High / Medium / Low]
```

## Rules
1. **Never Bypass Mel**: Any change exceeding $0 or scored >= 6 risk must be escalated immediately.
2. **Log Decided Items**: Record both auto-decided and escalated decisions in `escalation-log.md`.

## Inputs/Outputs
- **Inputs**: Decision target metrics.
- **Outputs**: Escalation message or auto-decision log.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
