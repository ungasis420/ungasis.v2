# How to Use v3 for Beginners

## What to open first

1. `README_START_HERE.md`
2. `LOSSLESS_MERGE_AUDIT_v3.md`
3. `TASK_BOARD.md`
4. `CROSS_REFERENCE_BRIDGE.md`

## What not to touch first

Do not edit files inside:

```text
00_LOSSLESS_ARCHIVE_READ_ONLY/
```

That folder is the backup pocket.

## How to make a change

1. Add the task to `TASK_BOARD.md`.
2. Check if the file is locked.
3. Edit only the needed file.
4. Run `scripts/run_all_checks.sh`.
5. Write what changed in `CHANGELOG.md`.

## Simple analogy

The archive is the photo of the original recipe. The active files are the recipe you cook from today.
