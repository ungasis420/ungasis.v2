# Build Protocol (Gemini / Antigravity CLI)
# Source of truth: CLAUDE.md. This file covers agy-specific build mechanics.

## Scratch Directory Behavior
- agy copies the project to a scratch workspace before running:
  `C:\Users\My PC\.gemini\antigravity-cli\scratch\`
- Edits happen in scratch, then sync back. Stale scratch causes ghost edits.
- ALWAYS delete scratch before a fresh run:
  `Remove-Item -Recurse -Force "C:\Users\My PC\.gemini\antigravity-cli\scratch"`

## --add-dir Rules
- agy only sees the project root by default. Sub-projects need explicit access.
- For Newmont work: `agy --add-dir D:\.projects\ungasis\projects\newmont`
- For RiftCoach work: `agy --add-dir D:\.projects\ungasis\projects\riftcoach`
- Use dot-path junction workaround if agy mishandles the `.projects` leading dot.

## /effort Usage
- There is NO `--effort` launch flag. Setting it at launch is ignored.
- Set effort INSIDE the session: type `/effort high` (or `/effort low`).
- Default: Flash for implementation, Pro reasoning only via high effort.

## Model Routing
- Flash 3.5: implementation, file writes, boilerplate
- Pro: architecture, complex reasoning — escalate only when Flash is insufficient
- See `.claude/rules/model-routing.md` for the full task→model table.

## Build Verification
- `npm run build` must pass before committing (Newmont, RiftCoach, Dashboard)
- Max 200 lines per new file
- Staleness footer on all .md files
- Git commit: `type: description` (feat/fix/docs/perf/chore)

Last reviewed: June 13, 2026 | Review by: September 2026 | Owner: Mel
