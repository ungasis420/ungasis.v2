# git-conflict.md — Resolving Git Merge Conflicts

## Trigger
A `git pull` or `git merge` command fails with conflict markers in files.

## Steps
1. **Identify Conflict Files:** Run `git status` in the terminal to list all conflicted files.
2. **Open Conflict File:** Locate conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) in your code editor.
3. **Choose Correct Version:**
   - Keep your local changes, keep remote changes, or combine both manually.
   - Delete the git conflict markers from the file once resolved.
4. **Stage the Fix:** Add the resolved files to the staging area:
   `git add <file-name>`
5. **Commit Resolution:** Finalize the merge:
   `git commit -m "chore: resolve merge conflicts"`

## Time to Complete
~10 minutes.

## Expected Output
A clean git repository status showing all changes successfully integrated.

## Gotchas
- Never leave git conflict markers inside a file. They will cause compilation and build failures.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
