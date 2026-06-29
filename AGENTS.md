# AGENTS.md — Shared Agent Rules (non-Claude)

Safety and token-discipline rules for any agent working in this repo.
CLAUDE.md is canonical for Claude. This file adds shared guardrails only.

## Scope
- Work only inside `D:\.projects\ungasis`.
- One project per session. Ignore other project directories.

## Safety
- Read before write. Confirm a file's content before editing it.
- Make small, surgical edits. Do not refactor code you were not asked to touch.
- Ask before destructive commands (push, reset, clean, rebase, checkout, delete).
- Do not use bypass or dangerous permission modes.
- Never open or print secrets (`.env`, keys, tokens, credentials).

## Do NOT touch
- `.env` and any secrets
- `raw/`
- `data/`
- `*.pbix`
- `report-backups/`
- `dist/` and `build/`
- `node_modules/`
- `archive/` (read-only)

## Token discipline
- Use minimal context: read only the files you actually need.
- Summarize large command or file outputs instead of pasting them in full.
- Do not list directories unless the task requires file discovery.

## Commands
- Prefer safe, read-only commands: `git status`, `git diff`, `git log`.
- Avoid broad wildcard commands. Use specific subcommands.

## Verification
- Always show your verification steps and their output.
- State plainly when a check fails. Evidence before claims.

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
