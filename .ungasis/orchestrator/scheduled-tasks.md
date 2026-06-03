# UNGASIS Scheduled Tasks

## Purpose
Automated recurring tasks that run in Antigravity Agent Manager.
These tasks make JARVIS proactive — checking health, scanning
warnings, and generating reports without Mel asking.

Kitchen analogy: The prep list that runs every morning before the
restaurant opens — no chef needs to remember it.

## Active Tasks

| # | Task Name | Schedule | Command | What It Does |
|---|-----------|----------|---------|-------------|
| 1 | Daily Pulse | Every day, 8:00 AM | python scripts/daily-pulse.py | Morning situation report |
| 2 | Warning Check | Every day, 9:00 AM | python scripts/warn-check.py | Scan for 7 warning conditions |
| 3 | Weekly Quality | Every Sunday, 6:00 PM | python scripts/quality-score.py | Score recent files, track trends |
| 4 | Weekly Tag Sweep | Every Monday, 8:00 AM | python scripts/tag_sweep.py | Scan for TODOs, stale files |
| 5 | GitHub Research | Every day, 7:00 AM | python scripts/research-github.py | Fetch trending repos |
| 6 | HackerNews Research | Every day, 7:15 AM | python scripts/research-hn.py | Fetch Show HN posts |
| 7 | YouTube Research | Every Sunday, 7:00 AM | python scripts/research-youtube.py | Fetch channel videos |
| 8 | Blog Research | Every Sunday, 7:30 AM | python scripts/research-feeds.py | Fetch RSS feeds |
| 9 | Feedback Analysis | Monthly, 1st, 6:00 PM | python scripts/feedback-close.py | Analyze suggestion adoption |
| 10 | Quality Trends | Weekly, Sunday, 6:30 PM | python scripts/quality-close.py | Track quality over time |
| 11 | Routing Analysis | Monthly, 1st, 6:15 PM | python scripts/routing-close.py | Track agent performance |
| 12 | Retro Extraction | Weekly, Sunday, 6:45 PM | python scripts/retro-close.py | Extract learnings |
| 13 | Energy Analysis | Weekly, Sunday, 7:00 PM | python scripts/energy-close.py | Update energy patterns |

## How to Set Up in Agent Manager
1. Open Antigravity Agent Manager (separate window from IDE)
2. Click "Scheduled Tasks" in left sidebar
3. Click "+ New" button
4. Fill in:
   - Name: [task name from table above]
   - Schedule: [schedule from table above]
   - Prompt: "Run [command] and report the results. If any critical
     issues found, list them clearly."
5. Save
6. Repeat for each task

## How to Verify Tasks Are Running
- Check Agent Manager → Scheduled Tasks → see last run time
- Check output files:
  - .ungasis/jarvis-core/daily-pulse-latest.md (daily pulse)
  - .ungasis/warnings/warning-log.md (warning check)
  - .ungasis/quality/quality-log.md (quality scores)

## Troubleshooting
| Issue | Fix |
|-------|-----|
| Task not running | Check Agent Manager is open (tasks only run when app is running) |
| Script errors | Run script manually in terminal to see error details |
| Wrong schedule | Edit task in Agent Manager → Scheduled Tasks → click task → modify |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
