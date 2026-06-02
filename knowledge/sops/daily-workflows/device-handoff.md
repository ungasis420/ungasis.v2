# device-handoff.md — Device Handoff Procedure

## Trigger
Switching development from one device to another (e.g., PC to phone, or tablet to PC).

## Steps
1. **Document Current State:** Update the Session Handoff block in `CONTEXT.md` on your source device:
   - What was done.
   - Files created or edited.
   - Next steps.
2. **Push Changes:** Commit and push all files from the source device:
   `git add . && git commit -m "chore: save progress for device handoff" && git push`
3. **Pull Changes:** Go to the target device, open a terminal, and retrieve the changes:
   `git pull`
4. **Verify State:** Open `CONTEXT.md` on the target device to read the session handoff block and confirm the git status is clean.

## Time to Complete
~3 minutes.

## Expected Output
Git state and CONTEXT.md fully synced between devices.

## Gotchas
- Always commit outstanding changes before leaving a device to prevent files from getting out of sync.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
