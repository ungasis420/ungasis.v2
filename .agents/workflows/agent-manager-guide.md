name: agent-manager
trigger: /agent-manager
description: Guide for using Antigravity Agent Manager with UNGASIS

## Quick Reference
When to use Agent Manager vs Right Panel:

| Situation | Use |
|---|---|
| Sequential file edits | Right Panel |
| Parallel sprints | Agent Manager (spawn multiple conversations) |
| Scheduled recurring tasks | Agent Manager → Scheduled Tasks |
| Autonomous sprint execution | Agent Manager → `/goal` mode |
| Quick one-off question | Right Panel |

## How to Spawn Parallel Agents
1. Open Agent Manager.
2. Click "New Conversation".
3. Paste the sprint prompt.
4. Repeat for parallel sprints.
5. Monitor in the Inbox.

## Scheduled Task Format
- **Name**: `[task name]`
- **Schedule**: `[daily/weekly/custom cron]`
- **Prompt**: `[what the agent should do]`

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
