# Incident Response

## Purpose

This file is used when something bad or risky happens.

## First 10 minutes

1. Stop risky action.
2. Protect secrets.
3. Save evidence.
4. Tell owner.
5. Do not guess publicly.

## Incident form

```text
Incident ID:
Date:
Reporter:
What happened:
What data may be affected:
What secret may be affected:
What action was stopped:
Who was told:
Fix made:
Test after fix:
Lesson:
```

## Severity

| Level | Meaning | Example |
|---|---|---|
| Low | Small issue | typo in doc |
| Medium | Some risk | test data exposed |
| High | Serious risk | real secret exposed |
| Critical | Big harm possible | private user data exposed |

## Feynman explanation

Incident response is the plan for stopping damage, fixing the problem, and learning from it.

## Layman analogy

If water leaks in your house, first turn off the water, then clean, then repair the pipe, then prevent it next time.
