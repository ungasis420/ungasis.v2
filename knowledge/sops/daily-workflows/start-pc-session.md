# start-pc-session.md — Starting a PC Work Session

## Trigger
Beginning a development session on a personal computer or Codespace.

## Steps
1. **Pull Latest Changes:** Open terminal and pull any remote updates to synchronize work done on other devices:
   `git pull`
2. **Read Project Context:** Open and review `CONTEXT.md` in the root folder to see what tasks were completed and what is currently planned.
3. **Load MCP profile:** Choose and activate the appropriate profile profile from `.mcp/profiles/` (`build.json` for coding, `research.json` for searching, or `full.json`).
4. **Initialize AI Agent:** Open the AI tool (Antigravity IDE or Cline), paste the complete `SESSION_STARTER.md` text block, and prompt the agent to start the session.

## Time to Complete
~5 minutes.

## Expected Output
A synchronized local workspace with active AI agent loaded and ready for instructions.

## Gotchas
- Skipping `git pull` will lead to merge conflicts later if you edited files on your phone/tablet.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
