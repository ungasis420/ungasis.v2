# 10 Observability and Incident Response

## Purpose

This file helps you see what happened and recover when something goes wrong.

## Simple idea

If your app breaks, you need a trail.

## What to log

Log these things:

| Item | Meaning | Example |
|---|---|---|
| Run ID | Name for one run | run-2026-05-30-001 |
| User action | What the user did | clicked "create report" |
| Agent action | What the AI tried | drafted email |
| Approval | Who approved | approved by owner |
| Error | What failed | API timeout |
| Recovery step | What fixed it | retried later |

## What not to log

Do not log:

- passwords
- API keys
- private client data
- full payment info
- private health/legal data

## Incident response

An incident means something bad or risky happened.

Use this simple process:

1. Stop the risky action.
2. Save what happened.
3. Protect secrets.
4. Tell the owner.
5. Fix the cause.
6. Test the fix.
7. Write the lesson.

## Simple incident form

```text
Date:
What happened:
Who noticed it:
What was affected:
Was private data exposed? Yes / No / Unknown
Was a secret exposed? Yes / No / Unknown
What did we stop:
What did we fix:
What test proves it is fixed:
What lesson did we learn:
```

## Feynman explanation

Observability means your app leaves clues so you can understand what happened. Incident response means your plan for bad events.

## Layman analogy

Observability is a car dashboard and dashcam. Incident response is what you do after a tire blows: slow down, pull over, check damage, call help, repair, and learn.

## Hard words in this file

See `SIMPLE_WORDS_GLOSSARY.md` for:

- observability
- log
- trace
- metric
- incident
- run ID
- audit log
- recovery
