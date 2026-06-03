# TASK_BOARD.md

Use this board to track work when several AI helpers, tools, or people touch the same project.

## Current Tasks

| ID | Task | Owner | Status | Blockers | Locked By | Lock Until | Notes |
|----|------|-------|--------|----------|-----------|------------|-------|
| T-001 | Original placeholder task from uploaded board | Planner | Queued | - | - | - | Preserved from user upload. Replace with a real task when you start work. |
| T-002 | Cross-check production-candidate repo v2 with new uploaded workflow files | Reviewer | Done | - | - | - | Completed in v3 merge. |
| T-003 | Add shared state, task board, model routing, MCP pruning, and Cursor token rules | Builder | Done | - | - | - | Added as active files plus raw backups. |
| T-004 | Run local validation checks | Tester | Done | - | - | - | See `audit/local_full_check_output_v3.txt`. |
| T-005 | Run real GitHub Actions after upload to GitHub | Human / Developer | Queued | Needs GitHub repo | - | - | Required before production use. |
| T-006 | Replace sample MCP token handling with real local secrets storage | Human / Developer | Queued | Needs local environment | - | - | Never commit real tokens. |

## File Locks

Rule: **Check > Edit > Release. Max 30 minutes.**

| Step | Meaning | Beginner analogy |
|------|---------|------------------|
| Check | See if someone is editing the file. | Look if the bathroom is occupied. |
| Edit | Make the change. | Use the room while it is your turn. |
| Release | Remove your lock and write what changed. | Open the door and leave a note. |

## Simple rule

One person or one AI helper edits one important file at a time.
