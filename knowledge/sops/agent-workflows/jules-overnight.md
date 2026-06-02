# jules-overnight.md — Overnight PR Submission with Jules

## Trigger
A complex, non-blocking feature or bug is identified at the end of the day and can be solved offline.

## Steps
1. **Create GitHub Issue:** Open a GitHub issue detailing the task requirements and referencing the relevant codebase files.
2. **Assign to Jules:** Use the GitHub interface or CLI to assign the issue to `@jules` or label it for background agent pickup.
3. **Shutdown Session:** Complete the standard end-of-day checklist and sign off.
4. **Morning Review:** The next morning, check the pull requests opened by Jules.
5. **Merge or Request Changes:** Review the code diffs, run local verification, and either merge the PR or write comments to request adjustments.

## Time to Complete
~10 minutes (before bed) and ~15 minutes (in the morning).

## Expected Output
A fully completed pull request with passing tests, ready to merge.

## Gotchas
- Do not assign critical, blocking production bugs to Jules overnight. Keep those for real-time debugging sessions.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
