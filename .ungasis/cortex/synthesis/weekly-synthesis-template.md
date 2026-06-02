# Weekly Synthesis Template

## Purpose
Define the standard schema for weekly synthesis summaries, auto-generated every Sunday.

## How It Works
The engine aggregates performance metrics, files touched, warnings, and learning logs to generate a comprehensive weekly snapshot.

## Weekly Synthesis Schema
```markdown
# Weekly Synthesis — Week Of [Date]

## Progress Overview
- **Projects Touched**: [List of projects]
- **Sprints Completed**: [Count of completed sprints]
- **Files Created/Modified**: [Count / List]

## System Quality & Warnings
- **Average Quality Score**: [Score out of 10]
- **Warnings Issued**: [Details of any critical warnings]
- **Suggestions Adopted**: [List of suggestions accepted]

## Learnings & Insights
- **Key Learnings**: [Summary takeaways]

## Weekly Retrospective
- **Top 3 Wins**:
  1. [Win 1]
  2. [Win 2]
  3. [Win 3]
- **Top 3 Blockers**:
  1. [Blocker 1]
  2. [Blocker 2]
  3. [Blocker 3]

## Next Week Focus
- [Prioritized focus items]
```

## Rules
1. **Reporting Cadence**: Generate a weekly synthesis every Sunday at the end of the day.
2. **Input Completeness**: All sections in the template must be populated with active logs data.
3. **Registry Standards**: Place the resulting weekly summary in `.ungasis/cortex/synthesis/history/`.

## Inputs/Outputs
| Component | Input Logs | Output Report |
|---|---|---|
| Aggregator | Git history, Quality Auditor scores, Warning logs, Learnings | Weekly synthesis markdown file |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
