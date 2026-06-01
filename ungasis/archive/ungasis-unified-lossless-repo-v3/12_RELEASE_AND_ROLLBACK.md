# 12 Release and Rollback

## Purpose

This file helps you launch changes safely.

## Simple idea

Release means putting a new version out.
Rollback means going back if the new version breaks.

## Before release

Check:

- tests passed
- no secrets in files
- owner approved
- known gaps are listed
- rollback plan exists
- support contact exists

## Release checklist

```text
Version:
Date:
What changed:
Who approved:
Tests passed:
Known gaps:
Rollback file/version:
Support contact:
Final decision: Release / Do not release
```

## Rollback checklist

```text
What broke:
When noticed:
Who decided rollback:
Last good version:
Steps to restore:
Test after restore:
Lesson learned:
```

## Feynman explanation

A release is a new version. A rollback is the undo plan.

## Layman analogy

Try a new recipe at a family dinner first. If it fails, you serve the backup dish.

## Hard words in this file

See `SIMPLE_WORDS_GLOSSARY.md` for:

- release
- rollback
- version
- smoke test
- owner
