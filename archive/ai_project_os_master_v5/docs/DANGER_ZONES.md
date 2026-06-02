# Danger Zones

Require explicit human approval before work in these areas:

- production deploys
- database migrations or direct record edits
- auth, permissions, roles, secrets, billing, payments
- external messages, emails, forms, posts, PRs, API calls with side effects
- destructive shell commands
- legal, financial, medical, HR, security, or user-impacting automations
- public release decisions

## Approval format

```text
Action:
Scope:
Risk:
Rollback:
Verification:
Human approval: yes/no
```
