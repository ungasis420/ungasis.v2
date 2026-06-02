# Contributing

## Simple rule

Small safe changes are better than giant unclear changes.

## Before changing files

1. Read `README_START_HERE.md`.
2. Read `docs/PERMISSION_MATRIX.md`.
3. Make a small change.
4. Run `python3 scripts/validate_repo.py`.
5. Write what changed in `CHANGELOG.md`.

## Do not commit

- secrets
- private user data
- unfinished production config
- unclear placeholders inside active config files

## Pull request checklist

- [ ] I changed only what was needed.
- [ ] I did not add secrets.
- [ ] I updated docs if needed.
- [ ] I ran local checks.
- [ ] I know how to rollback.
