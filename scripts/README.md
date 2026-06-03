# UNGASIS Automation Scripts

These scripts make JARVIS actually DO things. Run them manually or set up as Scheduled Tasks in Antigravity Agent Manager.

## Scripts Overview

| Script | Purpose | Run Command | Output |
|---|---|---|---|
| `daily-pulse.py` | Morning situation report | `python scripts/daily-pulse.py` | Terminal + `.ungasis/jarvis-core/daily-pulse-latest.md` |
| `warn-check.py` | Check warning conditions | `python scripts/warn-check.py` | Terminal + `.ungasis/warnings/warning-log.md` |
| `quality-score.py` | Score a file 1-10 | `python scripts/quality-score.py [file]` | Terminal + `.ungasis/quality/quality-log.md` |
| `tag_sweep.py` | Scan for TODOs, stale files | `python scripts/tag_sweep.py` | Terminal + `.agents/skills/auto-tagger/tag-log.md` |
| `ungasis.py` | Unified CLI wrapper | `python scripts/ungasis.py [command]` | Terminal + Execution |
| `ungasis-test.py` | Smoke tests + validation | `python scripts/ungasis.py test` | Terminal Output |
| `graph-search.py` | GraphRAG search script | `python scripts/ungasis.py graph [query]` | Terminal Output |
| `research-github.py` | Fetch GitHub trending repos | `python scripts/research-github.py` | Terminal + `.ungasis/scout/research-inbox.md` |
| `research-hn.py` | Fetch HackerNews top stories | `python scripts/research-hn.py` | Terminal + `.ungasis/scout/research-inbox.md` |
| `research-feeds.py` | Fetch RSS blog posts | `python scripts/research-feeds.py` | Terminal + `.ungasis/scout/research-inbox.md` |
| `research-youtube.py` | Fetch YouTube channel videos | `python scripts/research-youtube.py` | Terminal + `.ungasis/scout/research-inbox.md` |
| `feedback-close.py` | Analyze suggestion adoption rates | `python scripts/feedback-close.py` | Terminal + `.ungasis/tracking/feedback-tracker.md` |
| `quality-close.py` | Track quality trends, flag low prompts | `python scripts/quality-close.py` | Terminal + `.ungasis/quality/quality-log.md` |
| `routing-close.py` | Track routing performance | `python scripts/routing-close.py` | Terminal + Output |
| `retro-close.py` | Extract learnings from retrospectives | `python scripts/retro-close.py` | Terminal + Output |
| `energy-close.py` | Analyze time data vs energy patterns | `python scripts/energy-close.py` | Terminal + Output |
| `graphify-providers.py` | Register backup AI providers | `python scripts/graphify-providers.py` | Terminal Output |
| `tests/test_parsers.py` | Parser unit tests | `python -m unittest scripts/tests/test_parsers.py` | Test Results |

## Quick Reference

| Command | What It Does |
|---|---|
| `ungasis pulse` | Morning situation report |
| `ungasis warn` | Warning scan |
| `ungasis score [file]` | Quality score a file |
| `ungasis research all` | Fetch from all research sources |
| `ungasis feedback all` | Run all feedback loops |
| `ungasis health` | Full health check |
| `ungasis test` | Smoke tests |
| `ungasis backup` | Create backup ZIP |
| `ungasis version` | Show version info |
| `ungasis graph [query]` | Search the knowledge graph |

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
| **Smoke Tests** | Every day at 7:45 AM | `python scripts/ungasis.py test` |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
