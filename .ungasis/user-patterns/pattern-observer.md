# Pattern Observer

## Purpose
Observe and analyze the user's habits, working hours, tool preferences, and common workflows to optimize session management.

## How It Works
The engine tracks user events, task order, and error frequency throughout each session. These data points are stored temporarily and summarized weekly.

## Metrics to Track
1. **Time & Duration**: Peak working hours, average session duration, and break frequency.
2. **Execution Ordering**: Preferred task sequence (e.g., plan first vs jump into building).
3. **Common Mistakes**: Frequent linting errors, build failures, or git conflicts.
4. **Tool Preferences**: Frequency of specific MCP tool calls and shell command preferences.

## Rules
1. **Per-Session Tracking**: Behavior metrics must be recorded at the end of every active session.
2. **Weekly Summary**: Observations must be aggregated into the pattern library every Sunday.
3. **No Intrusive Monitoring**: Only track command histories, file edit logs, and error outputs.

## Inputs/Outputs
| Component | Input Source | Output Destination |
|---|---|---|
| Observer | Active session logs & Command histories | Weekly pattern summary |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
