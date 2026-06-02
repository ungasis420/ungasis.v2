# Release & Rollback — Opening Night and the Emergency Exit

## 1. Kitchen Analogy
Opening a new version of your software is like holding the "Opening Night" at a new restaurant. First, you run a private test dinner (soft launch) with friends and family to make sure the kitchen handles orders smoothly. If everything is fine, you open to the general public. But if something goes terribly wrong—like a power outage or bad ingredients—you must know how to quickly use the emergency exit, close the restaurant for the night, and restore the previous menu.

---

## 2. Release & Rollback Checklists

We use these checklists to ensure changes are deployed safely and can be reverted quickly if they break.

### Release Checklist

- [ ] **All Tests Pass:** Run unit and integration tests.
- [ ] **QA Audit Complete:** Review code structure against the style guide.
- [ ] **CHANGELOG Updated:** Document new features and changes in [CHANGELOG.md](file:///c:/Users/63905/Downloads/ungasis/docs/CHANGELOG.md).
- [ ] **Version Tagged:** Create a permanent version tag in Git.
- [ ] **Human Gate Approved:** Get owner signature to verify release readiness.

### Rollback Checklist

- [ ] **Identify the Bad Change:** Check error logs to find which commit caused the failure.
- [ ] **Revert to Last Good Version:** Run the rollback commands to restore stability.
- [ ] **Verify Fix:** Confirm tests pass and the application works again.
- [ ] **Write Postmortem:** Document the issue and root cause in [INCIDENT_RESPONSE.md](file:///c:/Users/63905/Downloads/ungasis/docs/INCIDENT_RESPONSE.md).

---

## 3. Git Commands Reference

| Operation | Action | Command | What it Does |
|---|---|---|---|
| **Release** | Tag Version | `git tag vX.Y` | Labels the current code state with a version number. |
| **Release** | Push Tag | `git push origin --tags` | Sends the version tag to the remote repository. |
| **Rollback** | Undo Commit | `git revert HEAD` | Creates a new commit that rolls back the last changes. |
| **Rollback** | Push Rollback | `git push origin main` | Pushes the rolled-back code to the remote repository. |

---

## 4. Cross-References
- [CHANGELOG.md](file:///c:/Users/63905/Downloads/ungasis/docs/CHANGELOG.md) — View the project history and list of updates.
- [kill-switch.yml](file:///c:/Users/63905/Downloads/ungasis/config/kill-switch.yml) — Used to quickly stop buggy features when a rollback is in progress.
- [RUNBOOK.md](file:///c:/Users/63905/Downloads/ungasis/docs/RUNBOOK.md) — Detailed operations guide for deploying and rolling back manually.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
