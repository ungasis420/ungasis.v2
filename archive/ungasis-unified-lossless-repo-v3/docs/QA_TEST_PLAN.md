# QA Test Plan

QA means quality assurance.

## Local checks

Run:

```bash
python3 scripts/validate_repo.py
```

## What this checks

- required files exist
- JSON files are valid
- YAML files are valid
- shell scripts have correct syntax
- Python scripts compile
- no obvious secrets are present
- active config has no unsafe placeholders
- permission profiles exist
- approval gates exist
- observability example exists

## Manual prompt tests

Open `tests/smoke-tests/MANUAL_SMOKE_TESTS.md`.

## Feynman

QA means checking quality before users find the mistakes.

## Analogy

Like proofreading before printing invitations.
