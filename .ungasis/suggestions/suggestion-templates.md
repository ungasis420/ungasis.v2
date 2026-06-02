# Suggestion Templates Engine

## Purpose
Define the 8 standardized pre-built recommendations used by the Proactive Suggestion Engine.

## How It Works
The engine selects the appropriate template matching the active trigger rule, inserts contextual detail, and displays it to the user.

## Rules
1. Every suggestion must use one of the 8 pre-built formats below.
2. The display format must exactly match: `💡 SUGGESTION: [what] — [why] — [effort estimate]`.
3. Effort estimates must be clear and realistic.

## Pre-Built Suggestions Table

| ID | Goal | Suggestion Format | Effort |
|---|---|---|---|
| S1 | Prioritize | `💡 SUGGESTION: Start with highest-priority task — To build early momentum and address bottlenecks — Estimate: S` | S |
| S2 | Clean Up | `💡 SUGGESTION: Review stale files — Clean up folders with no changes in 90 days to prevent bloat — Estimate: M` | M |
| S3 | Maintain | `💡 SUGGESTION: Run tag-sweep — Scan workspace to flag TODOs and stale footers — Estimate: XS` | XS |
| S4 | Research | `💡 SUGGESTION: Check scout-log — Find newly discovered tools and libraries to speed up build — Estimate: S` | S |
| S5 | Portfolio | `💡 SUGGESTION: Update portfolio — Keep project status and outcomes up to date — Estimate: S` | S |
| S6 | Git Sync | `💡 SUGGESTION: Commit uncommitted changes — Backup current progress to remote branch — Estimate: XS` | XS |
| S7 | Health | `💡 SUGGESTION: Take a break — Continuous coding exceeds 2 hours; rest to maintain energy — Estimate: XS` | XS |
| S8 | Review | `💡 SUGGESTION: Review weekly synthesis — Reflect on metrics and learnings from this week — Estimate: S` | S |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `template_id` | Suggestion Rules | Selector code for the recommendation |

| Output | Destination | Description |
|---|---|---|
| `formatted_suggestion` | Event Bus | Output string printed to the terminal console |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
