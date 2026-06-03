# Beginner Step-by-Step Guide

## The simple idea

An app setup is like a car.
Before you drive on the highway, you check the brakes, lights, fuel, mirrors, and seatbelt.

This pack is that safety check.

## Step 1: Know your stage

Pick one:

| Stage | Meaning | What to do |
|---|---|---|
| Learning | You are exploring | Read and test only |
| Personal | Only you use it | Keep it simple |
| Private beta | A few trusted people use it | Add logs and feedback |
| Public | Anyone can use it | Add security and support |
| Production | Real users depend on it | Add full tests and rollback |

For now, choose: **Learning or private beta**.

## Step 2: Do not chase production too early

Production is not just "it works on my laptop".

Production means:

- it is tested
- it is safe enough
- it can recover from failure
- secrets are protected
- changes are reviewed
- users have a way to report problems

## Step 3: Use the checklist

Open:

`02_COPY_TO_YOUR_PROJECT_ROOT/docs/READINESS_LEVELS.md`

Find your stage.
Check what is missing.

## Step 4: Set permissions

Open:

`02_COPY_TO_YOUR_PROJECT_ROOT/docs/PERMISSION_MATRIX.md`

Write what the AI agent is allowed to do.

Beginner rule:

The AI may draft and suggest.
The human approves before it changes, sends, deletes, or pays.

## Step 5: Test with fake data first

Fake data means sample data, not real private data.

Example:

Use "test@example.com" instead of a real customer email.

## Step 6: Add a rollback plan

Rollback means going back to the last good version.

Open:

`02_COPY_TO_YOUR_PROJECT_ROOT/docs/RELEASE_AND_ROLLBACK.md`

Fill it in before any launch.

## Step 7: Keep a decision log

Open:

`02_COPY_TO_YOUR_PROJECT_ROOT/docs/DECISION_LOG.md`

Write major choices there.

This stops future confusion.

## Step 8: Ask ChatGPT to audit it

Copy this:

```text
Use my uploaded readiness files. Audit my project. Tell me:
1. what is ready
2. what is not ready
3. what is dangerous
4. what I should do next
Use simple English.
```

## Feynman explanation

If you cannot explain your app safety in simple words, you do not understand it well enough yet.

## Layman analogy

Do not open a restaurant just because one meal tasted good at home.
First, check food safety, kitchen tools, staff, menu, payment, complaints, and cleanup.
