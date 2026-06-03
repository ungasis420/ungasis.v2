# Context Budget (v4.0 - NEW)

> Proactive context management using fill-% zones.

## Fill-% Budget Zones

| Zone | Fill % | Behaviour | Actions |
|------|--------|-----------|---------|
| Green | 0-50% | Normal | Read files freely, detailed explanations, examples OK |
| Yellow | 50-70% | Efficient | Shorter responses, skip examples, read only necessary files |
| Orange | 70-85% | Compact | Summarise history, drop old file reads, suggest /compact |
| Red | 85%+ | Emergency | No new file reads, complete minimally, hand off |

## Estimation
- 1 message ~ 3-5K tokens (input + output combined)
- 15 messages ~ 45-75K tokens
- Most models: 128K-200K context window

## Compaction Triggers
- Proactive: /compact at 60-70% fill (Orange zone entry)
- Reactive: auto-compaction at 93% (too late - avoid this)
- Emergency: hand off at 85%+ to fresh session via docs/TASK_HANDOFF.md

## What to Preserve During Compaction
- Current task goal and constraints
- Files read and changed (paths only)
- Decisions made and reasoning
- Test commands run and results
- Unresolved failures and risks
- Next action

## What to Drop
- Repeated discussion and back-and-forth
- Long terminal output and logs
- Irrelevant file contents
- Abandoned approaches
