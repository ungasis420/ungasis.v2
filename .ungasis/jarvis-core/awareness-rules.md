# Awareness Rules Engine

## Purpose
Define the startup check sequence to collect status metrics and auto-generate the daily pulse report.

## How It Works
```
Session Start ──> Read 5 Sources ──> Compile Metrics ──> Generate daily-pulse.md
```

## Rules
1. Perform the 5-point check sequence immediately at session startup.
2. If any source file is missing, default to safe values and log a warning.
3. Automatically assemble the compiled status into the `daily-pulse.md` report before starting tasks.

## Startup Check Sequence

| Step | Source File | Check Requirement | Purpose |
|---|---|---|---|
| 1 | `CONTEXT.md` | Extract last sprint name, status, and grand totals | Resume historical context |
| 2 | `queue.md` | Read pending tasks count and priorities | Plan session deliverables |
| 3 | `warning-log.md` | Check for unresolved critical (🔴) warnings | Assess safety blockers |
| 4 | `scout-log.md` | Read new tool detections or community shifts | Identify research assets |
| 5 | `portfolio-overview.md` | Audit active quest health metrics | Track high-level objectives |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `startup_signal` | CLI / Conductor | Initiating pulse trigger at startup |
| `source_files` | Workspace | CONTEXT.md, queue.md, warning-log.md, scout-log.md, portfolio-overview.md |

| Output | Destination | Description |
|---|---|---|
| `daily_pulse` | daily-pulse.md | Complete pulse report populated from source files |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
