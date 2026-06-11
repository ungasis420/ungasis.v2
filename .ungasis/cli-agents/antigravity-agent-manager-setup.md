# Antigravity Agent Manager Setup Guide

## Purpose
Visual multi-agent orchestration for UNGASIS OS.

## How to Open
Launch from the Antigravity application menu or the taskbar icon. The Agent Manager runs as a separate window from the main IDE, allowing you to run both simultaneously.

## Project Setup
1. In the Projects panel, your active project should show `./`.
2. If duplicate entries with ⚠️ are visible, remove the entry showing the warning and keep the one showing the active branch name.
3. All rules, skills, and workflows from the IDE are automatically shared with the Agent Manager.

## Permissions (Recommended)
| Setting | Value | Why |
|---|---|---|
| Security Preset | Custom | Provides full control over resource usage |
| Outside Folders | Always Ask | Safety check for folder access |
| Terminal Auto-Execution | Require Review | Safety gate for running scripts or git commands |
| Artifact Review | Auto Accept | Speeds up sprint execution times |

## Local Permissions
- **File Access**: Allow `ungasis/`, Deny `archive/`, Deny `source-files/**`
- **Network**: Allow `github.com`, `*.googleapis.com`
- **Terminal**: Allow `git`, `python`, `npm`, `node`, `graphify`, `agy`
- **Deny Commands**: `rm -rf`, `del /s`, `format` (destructive commands)

## Customizations Budget
- **Total Budget**: ~19,000 tokens.
- **Target**: Keep total usage under 60%.
- Rules are the largest consumer (~36% of budget); keep rules concise.
- Skills and workflows are lean (~5% combined budget); feel free to add new ones.

## Scheduled Tasks
| Task | Schedule | Prompt |
|---|---|---|
| Daily Pulse | Daily 8:00 AM | `"Run python scripts/daily-pulse.py and report results"` |
| Warning Check | Daily 9:00 AM | `"Run python scripts/warn-check.py and report any warnings"` |
| Weekly Synthesis | Sunday 6:00 PM | `"Generate weekly synthesis from cortex/synthesis/weekly-synthesis-template.md"` |
| Tag Sweep | Weekly Monday 8:00 AM | `"Run python scripts/tag_sweep.py and report findings"` |

## /goal Mode
Type `/goal` in a conversation to activate autonomous execution.
- The agent works until the goal is fully completed without asking questions.
- **Best For**: Well-defined sprints with clear acceptance criteria.
- **Safety**: The agent still respects local file access rules and terminal permissions.

## Parallel Agents Pattern
For executing multi-sprint batches:
- **Conversation 1**: Sprint A implementation files.
- **Conversation 2**: Sprint B implementation files.
- **Conversation 3**: Audit Sprint A (after completion).

All conversations run in parallel. Check the Agent Manager Inbox to monitor progress across all active agents.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
