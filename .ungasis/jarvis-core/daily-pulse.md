# Daily Pulse

## Purpose
Provide a standardized template for reporting the daily status, priorities, energy, warnings, and suggestions to align focus at session start.

## How It Works
The engine generates this pulse report automatically at startup by reading current metrics and queue files.

## Rules
1. A new Daily Pulse must be generated at the start of each session.
2. The Today's Focus section must be restricted to exactly one clear sentence.
3. Use tables for structured status data.

## Daily Pulse Report Template

### 1. General Info
- **Date**: [YYYY-MM-DD]
- **Current Energy Level**: 🟢 High / 🟡 Medium / 🔴 Low

### 2. Project Health Overview

| Active Project | Health Status | Primary Blockers / Next Step |
|---|---|---|
| [Project Name] | 🟢 On Track / 🟡 At Risk | [Action needed] |

### 3. Execution Focus

#### Today's Focus
*Today's Focus: [Write exactly one high-level sentence summarizing the main objective]*

#### Today's Task Queue (from queue.md)
- [ ] Task 1 — Size: [S/M/L] — Estimated time: [min]
- [ ] Task 2 — Size: [S/M/L] — Estimated time: [min]

### 4. Intel Logs

#### Active Warnings (from warning-log.md)
- [Active Warning 1]
- [Active Warning 2]

#### Active Suggestions (Top 3 from suggestion-templates.md)
1. Suggestion 1: [content]
2. Suggestion 2: [content]
3. Suggestion 3: [content]

#### Yesterday's Outcomes
- [Accomplished item 1]
- [Accomplished item 2]

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `context_metadata` | Context Engine | Current date, project lists, and historical outcomes |

| Output | Destination | Description |
|---|---|---|
| `daily_pulse_report` | User Interface | Standardized daily situation summary report |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
