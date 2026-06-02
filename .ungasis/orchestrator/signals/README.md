# README.md — Signal Files System

## Purpose
This system acts like order tickets in a restaurant kitchen. It allows different CLI agents to communicate asynchronously by writing and reading signal files.

## How It Works
1. An agent writes a `.signal` file to declare a status change (e.g. `blueprint-ready.signal`).
2. The next agent in the pipeline scans for the relevant signal file.
3. The consuming agent processes the signal, performs its work, deletes the active signal, and writes a new signal.
4. All signal changes are recorded in the central `signal-log.md` file.

## Signal Types
| Signal File | Meaning | Created By | Consumed By |
|---|---|---|---|
| `blueprint-ready.signal` | Blueprint has been approved and is ready | Architect 📐 | Builder 🏗️ |
| `build-complete.signal` | Code changes written and ready for audit | Builder 🏗️ | Auditor 🔍 |
| `audit-pass.signal` | Code has passed all quality checks | Auditor 🔍 | Watchdog 📊 |
| `audit-fail.signal` | Code failed checks and needs revisions | Auditor 🔍 | Surgeon 🔪 / Builder 🏗️ |
| `fix-needed.signal` | Specific error reported that needs surgical fix| Commander 🎖️ | Surgeon 🔪 |
| `task-complete.signal` | Entire quest or sprint has been completed | Watchdog 📊 | Commander 🎖️ |

## File Format
Each active signal file must be named `[signal-name].signal` and contain a single line formatted as follows:
`timestamp|source|target|details`

Example contents for `blueprint-ready.signal`:
`2026-06-03T04:00:00Z|architect|builder|Blueprint for Sprint F19 ready for build`

## Lifecycle Stages
1. **Created**: Writing the `[signal-name].signal` file to `.ungasis/orchestrator/signals/`.
2. **Consumed**: Reading agent picks up the signal file and starts working.
3. **Archived**: After completing the work, the consuming agent deletes the active signal and moves a copy to `.ungasis/orchestrator/signals/archive/`.

## Operational Rules
1. **One Active Per Type**: Only one file of a given signal type (e.g., `blueprint-ready.signal`) can exist at a time.
2. **Consumer Deletes**: The agent that consumes the signal is responsible for deleting the file.
3. **Audit Log**: Every creation and deletion must be appended to the central log file `signal-log.md`.

## Inputs and Outputs
| Action | Input | Output |
|---|---|---|
| Create Signal | Stage Change Event | `[signal-name].signal` file on disk |
| Consume Signal | `[signal-name].signal` file detection | Task Execution + Deletion of Signal |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
