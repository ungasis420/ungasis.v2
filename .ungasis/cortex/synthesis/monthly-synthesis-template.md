# Monthly Synthesis Template

## Purpose
Define the standard schema for monthly synthesis summaries, auto-generated on the 1st of every month.

## How It Works
The engine aggregates data from weekly summaries, the revenue dashboard, skill progress trackers, and user pattern libraries to assemble a monthly strategic report.

## Monthly Synthesis Schema
```markdown
# Monthly Synthesis — [Month, Year]

## Projects & Health Summary
- [Consolidated list and health state of active projects]

## Performance Progress Metrics
- **JARVIS Score Progress**: [Old Score]% → [New Score]%
- **Revenue Progress**: $[Old revenue]/mo → $[New revenue]/mo

## Capabilities Growth
- **Skills Grown**: [List of upgraded skills and new levels]
- **User Patterns Discovered**: [New patterns added to library]

## Momentum & Trends
- **Momentum Description**: [Text description or trend chart indicator of productivity velocity]

## Strategic Goals for Next Month
- [Key milestones to achieve]
```

## Rules
1. **Reporting Cadence**: Generate a monthly synthesis on the 1st day of every calendar month.
2. **Evaluation Standard**: Base progress evaluations on verified data in the revenue log and skill assessment matrix.
3. **Registry Standards**: Place the resulting monthly report in `.ungasis/cortex/synthesis/history/`.

## Inputs/Outputs
| Component | Input Source | Output Destination |
|---|---|---|
| Monthly Aggregator | Weekly syntheses, Revenue log, Skill matrix, Pattern library | Monthly synthesis markdown file |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
