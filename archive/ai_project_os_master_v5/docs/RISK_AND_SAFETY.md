# Risk and Safety

## Safety posture

Default to lightweight safety for personal/prototype work. Increase rigor for public, commercial, regulated, security-sensitive, financial, health, legal, or user-impacting projects.

## Approval required before

- deleting files or data
- sending messages or publishing content
- changing permissions or credentials
- deploying to production
- modifying infrastructure
- accessing sensitive data
- charging money or moving funds
- taking legal, HR, health, or financial actions

## Secrets handling

- Never commit real `.env` files.
- Never place API keys in frontend/public code.
- Use `.env.example` for names only.
- Rotate any secret that was accidentally committed.

## Automation safety

Before automation:

1. Prove the workflow manually.
2. Add a checklist.
3. Add logs.
4. Add dry-run mode if possible.
5. Add human approval for risky actions.
6. Add rollback.

## AI reliability

AI output may be wrong. Require evidence for factual claims, code changes, tests, and external actions.
