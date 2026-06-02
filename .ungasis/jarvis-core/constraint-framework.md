# Constraint Framework Engine

## Purpose
Define reasoning protocols to detect and adapt to resource limitations (Time, Budget, Skills, Tools, Energy).

## How It Works
```
Identify Constraint ──> Match Resolution Strategy ──> Mitigate / Accept ──> Adjust Sprint Plan
```

## Rules
1. Every constraint identified during execution must be logged in `constraint-log.md`.
2. Budget constraints must enforce free-tier options first before proposing paid tools.
3. Skills constraints must default to Simple English and visual analogies for ESL alignment.

## Constraint Types & Mitigation

| Constraint Type | Details | Mitigation Strategy |
|---|---|---|
| **Time** | Limited session duration | Decompose tasks; defer non-critical items |
| **Budget** | $19.99/mo + $0 tools limit | Prioritize free tiers; use open source |
| **Skills** | ESL, visual learner style | Use plain English, tables, diagrams; avoid jargon |
| **Tools** | PC vs Browser only | Adapt workflow to fit active capability matrix |
| **Energy** | Dips in focus/fatigue | Adjust task sizing bounds; mandate breaks |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `active_constraints` | Conductor / Environment | Identified blockages or resource deficits |

| Output | Destination | Description |
|---|---|---|
| `mitigated_plan` | Session Planner | Adjusted execution plan matching constraints |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
