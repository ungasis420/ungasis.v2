# Production Gate Checklist

Do not launch to real users until each box is checked.

## Required gates

- [ ] Local validation passes.
- [ ] GitHub CI passes.
- [ ] No real secrets in repo.
- [ ] Real secrets stored in a safe secret manager.
- [ ] Permission matrix reviewed.
- [ ] Human approval gates reviewed.
- [ ] Logs are working.
- [ ] Rollback tested.
- [ ] Backups tested.
- [ ] Privacy review done.
- [ ] Security review done.
- [ ] Owner approves release.

## Final rule

Passing local checks is not the same as live production approval.
