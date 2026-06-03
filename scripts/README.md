# UNGASIS Automation Scripts

These scripts make JARVIS actually DO things. Run them manually or set up as Scheduled Tasks in Antigravity Agent Manager.

## Scripts Overview

| Script | Purpose | Run Command | Output |
|---|---|---|---|
| `daily-pulse.py` | Morning situation report | `python scripts/daily-pulse.py` | Terminal + `.ungasis/jarvis-core/daily-pulse-latest.md` |
| `warn-check.py` | Check warning conditions | `python scripts/warn-check.py` | Terminal + `.ungasis/warnings/warning-log.md` |
| `quality-score.py` | Score a file 1-10 | `python scripts/quality-score.py [file]` | Terminal + `.ungasis/quality/quality-log.md` |
| `tag_sweep.py` | Scan for TODOs, stale files | `python `scripts/tag_sweep.py` | Terminal + `.agents/skills/auto-tagger/tag-log.md` |

## Requirements

- Python 3.8+
- No external packages needed (stdlib only)
- Works on Windows Personal PC without restriction

## Scheduled Tasks Setup (For Agent Manager)

Configure these in the Antigravity Agent Manager scheduler interface to run automatically in the background:

| Task Name | Schedule | Command |
|---|---|---|
| **Daily Pulse** | Every day at 8:00 AM | `python scripts/daily-pulse.py` |
| **Warning Check** | Every day at 9:00 AM | `python scripts/warn-check.py` |
| **Quality Batch** | Every Sunday at 6:00 PM | `python scripts/quality-score.py` |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
