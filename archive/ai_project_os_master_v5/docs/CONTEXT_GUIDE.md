# Context Guide

Context is a limited resource. Use it deliberately.

## Load first

For most sessions:

1. `AGENTS.md`
2. `CLAUDE.md`
3. `docs/PROJECT_BRIEF.md`
4. relevant spec / task file
5. relevant source files only

## Do not load by default

- the entire repo
- large generated files
- logs unless debugging
- unrelated docs
- old worklogs unless needed

## When context gets noisy

1. Stop unrelated work.
2. Write `docs/HANDOFF.md`.
3. Record decisions and changed files.
4. Start a fresh session.
5. Paste only the handoff and relevant files.

## Good handoff summary

```text
Current goal:
What changed:
Files touched:
Commands run:
Known issues:
Next step:
Do not redo:
```
