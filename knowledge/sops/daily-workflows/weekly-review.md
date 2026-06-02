# weekly-review.md — Weekly Review Procedure

## Trigger
End of the work week (usually Sunday afternoon).

## Steps
1. **Review Git Logs:** Read the past week's git history to evaluate feature progress:
   `git log --since="1 week ago" --oneline`
2. **Review Metrics:** Check your time-to-ship records and model token usage. Update the metrics wiki page under `knowledge/wiki/metrics/`.
3. **Audit AI Rules:** Evaluate if any routing guidelines in `MODEL_ROUTING.md` need updates based on recent model performance.
4. **Plan Next Week's Quests:** Draft the upcoming sprint goals. Write them as upcoming tasks in `CONTEXT.md`.
5. **Verify Project Health:** Run `graphify update .` to rebuild the AST and clear out stale files.

## Time to Complete
~15 minutes.

## Expected Output
Up-to-date metrics tables and a clear list of goals for the next week.

## Gotchas
- Do not let weekly tasks pile up. Consistently documenting metrics and gotchas keeps the codebase clean.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
