# end-of-day.md — End of Day Workflow

## Trigger
Ending the day's development tasks and shutting down your PC.

## Steps
1. **Update Context Documentation:** Edit the current session entry in `CONTEXT.md` to list exactly what was completed, new file line counts, and what needs to happen tomorrow.
2. **Review Memory Banks:** If you learned any new rules, patterns, or fixed persistent bugs, add them to `MEMORY_BANK.md` or a wiki file.
3. **Stage and Commit all Changes:** Run `git status` to see unstaged changes, stage them, and write a descriptive commit:
   `git add . && git commit -m "chore: end of day updates"`
4. **Push to Remote Repository:** Push all commits to the remote branch:
   `git push`
5. **Clean Workspace:** Close the IDE window, shut down the Ollama local background processes (if running), and turn off the device.

## Time to Complete
~5 minutes.

## Expected Output
All progress committed, pushed, and recorded in CONTEXT.md with no unsaved files left on the hard drive.

## Gotchas
- Ensure you commit all active config files under `.ungasis/` so your next AI session can find the latest settings.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
