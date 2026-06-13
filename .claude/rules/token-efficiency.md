# Token Efficiency Rules (auto-applied at session start  zero cost)

## Session Behavior
- Complete ALL work in a single response. Max 1 turn per session.
- Never ask clarifying questions. Make reasonable assumptions and state them.
- Never explain what you're about to do. Just do it.
- Never echo or summarize the prompt back.
- Never print file contents after writing them unless asked.
- Don't list directory contents unless the task requires file discovery.

## Context Loading
- Read .ungasis/context/hot-context.md FIRST for task-relevant knowledge graph data.
- If hot-context.md is empty or missing, proceed without it.
- Only read files explicitly mentioned in the prompt.
- Trust the file system  skip verification reads unless asked.

## Output
- Code + commit only. No prose explanations unless asked.
- Git commit messages: under 72 chars, format: type: description
- Don't print success messages for each step. One summary at the end.

## Anti-Waste
- Don't install packages unless the task requires a missing one.
- Don't create backup files. Git is the backup.
- Don't add comments explaining obvious code.
- Don't refactor code you weren't asked to touch.

## Session Launch Protocol
- ALWAYS: /effort low (default for ALL tasks)
- ONLY use /effort high for: architecture decisions, complex multi-file refactors
- Max turns: 7 (not 15) — forces Claude to be focused
- NEVER read third-party source code (site-packages/, node_modules/)
- If a tool CLI fails, use --help only (max 3 discovery commands)
- If still stuck after 3 attempts → STOP and ask user

## Prompt Pre-Flight (before pasting /goal)
- Include tool CLI help output for any non-standard tool
- Include "DO NOT re-extract/re-index — work with existing data" when applicable
- Include known gotchas (e.g., "DeepSeek key may not be set")

## File: Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
