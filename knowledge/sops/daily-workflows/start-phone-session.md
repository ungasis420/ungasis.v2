# start-phone-session.md — Starting a Mobile Work Session

## Trigger
Opening a workspace on an Android mobile device to make quick changes, edits, or review status.

## Steps
1. **Open Termux Application:** Start the Termux app on your phone.
2. **Synchronize Files:** Run `git pull` in the repository directory to fetch the latest PC updates.
3. **Launch Code Editor:** Open code editing apps (such as Acode or Spck) to load the files.
4. **Make Modifications:** Focus only on quick edits (fixing spelling mistakes, tweaking single-line configs). Avoid massive coding blocks.
5. **Git Push:** Stage, commit, and push your changes back to GitHub from Termux:
   `git add . && git commit -m "style: minor phone adjustments" && git push`

## Time to Complete
~5 minutes.

## Expected Output
Small updates successfully pushed to remote repository from the mobile device.

## Gotchas
- Virtual keyboards can easily add typos. Triple-check edited files before committing.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
