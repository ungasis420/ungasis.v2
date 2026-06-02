# Runbook

## Purpose

A runbook tells you what to do when a known problem happens.

## Use this format

```text
Problem:
Signs:
First thing to check:
Safe fix:
Who to call:
How to confirm fixed:
How to prevent next time:
```

## Common problems

### Problem: Secret was pasted into a file

Do:

1. Stop sharing the file.
2. Remove the secret.
3. Rotate the secret.
4. Check logs.
5. Write what happened.

### Problem: AI agent tried risky action

Do:

1. Stop the run.
2. Save the log.
3. Check permission matrix.
4. Add a red-team test.
5. Require human approval.

### Problem: New version broke

Do:

1. Stop release.
2. Roll back to last good version.
3. Test again.
4. Record lesson.

## Feynman explanation

A runbook is a recipe for fixing common problems.

## Layman analogy

A fire drill tells people what to do before there is a fire.
