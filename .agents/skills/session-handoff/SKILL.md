---
name: session-handoff
description: "Generate a compact session handoff for the next session or device."
---
# Session Handoff Skill

## Purpose
Produce a short session checkpoint so the next session or device can resume work seamlessly.

## Steps
1. Summarize what was accomplished in this session in simple English.
2. List all files changed with status markers (e.g., `[x]`, `[NEW]`, `[MODIFY]`).
3. List any blockers or outstanding questions.
4. Write the next 3 immediate tasks.
5. Update `CONTEXT.md` (or the relevant file in the `context/` directory) with the latest state.
6. Remind the user to run `git push` to synchronize changes.
