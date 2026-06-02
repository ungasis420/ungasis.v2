# deploy-rollback.md — Reverting a Failed Deployment

## Trigger
A production build is deployed but crashes or contains critical bugs for active users.

## Steps
1. **Identify Stable Commit:** Check the git commit history to find the last working version hash:
   `git log --oneline -n 10`
2. **Revert Commit Local:** Revert local changes or checkout the stable commit:
   `git revert <bad-commit-hash>`
3. **Push to Deploy:** Push the revert commit to remote GitHub repository:
   `git push`
4. **Cloudflare Rollback:** Alternatively, open Cloudflare Pages dashboard, locate the previous successful build, and select "Rollback to this deployment".
5. **Verify Live Status:** Open the app URL and ensure the stable version loads correctly.

## Time to Complete
~5 minutes.

## Expected Output
The live application successfully restored to the last known stable state.

## Gotchas
- Do not attempt to write complex bug fixes live on the main branch while the site is crashing. Revert first, then fix in a dev branch.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
