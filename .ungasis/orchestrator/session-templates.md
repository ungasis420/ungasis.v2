# session-templates.md — Session Templates Cache

## Purpose
Provides pre-structured session schedules to fit various sprint goals and energy states.

## How It Works
The planner selects a template matching the task composition in the queue and allocates blocks of time.

## Templates Table
| Template Name | Duration | Primary Focus | Task Layout | Break Intervals |
|---|---|---|---|---|
| **Build Session** | 3 hours | Writing code files | T1-T6 (Builder) | 10 min break every 50 min |
| **Debug Session** | 1 hour | Fixing bug tickets | T1-T3 (Surgeon) | 5 min break after T2 |
| **Research Session**| 2 hours | Scopes and blueprints| Research + Design (Architect) | 15 min break at midpoint |
| **Review Session** | 1 hour | Audits and commits | Verify + Test (Auditor) | None |
| **Mixed Session** | 2 hours | Code writes + fixes | Build (Builder) + Fix (Surgeon) | 10 min break at 1 hour |

## Rules
1. **Selection Criteria**: Select the template that matches the highest quantity agent role in the session task list.
2. **Break Enforcement**: All templates must include structured rest breaks to avoid developer burnout.

## Inputs and Outputs
- **Inputs**: Task queue characteristics.
- **Outputs**: Instantiated session schedule file.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
