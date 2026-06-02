---
name: debug-one-bug
description: "Focus on exactly ONE bug at a time to prevent scope creep."
---
# Debug One Bug Skill

## Purpose
Fix a single identified bug cleanly and efficiently without altering unrelated parts of the codebase.

## Steps
1. **Identify the Single Bug:** Define the bug clearly before looking at files.
2. **Limit File Reads:** Read ONLY the file or files directly causing this bug. Do not wander to other files.
3. **Apply Safety Gate:** Perform checks to ensure we do not create side effects or delete working functions.
4. **Fix the Bug:** Make precise, targeted changes to fix *only* the identified issue.
5. **Run Reflection:** Run a self-check on the fix to ensure the code compiles and passes tests.
6. **Log Secondary Issues:** If you discover other bugs during the process, write them down in a task list, but **do not** fix them in this session.
7. **Report Progress:** List exactly what lines of code changed and how it resolves the issue.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
