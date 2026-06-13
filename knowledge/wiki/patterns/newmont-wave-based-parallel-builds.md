---
source: Newmont project
created: 2026-06-13T04:44:19+00:00
tags: newmont, wave, parallel, agy, claude, workflow
---
# Newmont Wave-Based Parallel Builds (Agy Creates, Claude Edits)

> Source: Newmont project

## Lesson
- **What happened:** Parallel multi-agent builds collided when two agents tried to author and revise the same files at once.
- **Root cause:** No clear division of labor between the fast generator and the careful editor.
- **Fix applied:** Adopt a wave pattern with strict roles — **Agy creates** new files in bulk (fast, cheap drafts); **Claude edits** them afterward (surgical, correctness-focused). One role owns a file at a time.
- **Prevention rule:** Keep create and edit in separate waves with explicit file boundaries so no two agents touch the same file simultaneously. See [[surgical-edits]] and [[autonomous-batch-pipeline]].

## Tags
#newmont #wave #parallel #agy #claude #workflow
