# PreCompact Preservation — UNGASIS OS

CRITICAL: The following MUST survive compaction verbatim.

## Project Identity
- Project: UNGASIS OS v5.1 "AUTONOMY" — personal AI operating system
- Owner: Mel John Dimat, Filipino reporting consultant, Manila
- Repo: D:\.projects\ungasis (Dev Drive, ReFS)

## Current Sprint / Mission
- Check QA-MISSION.md and CONTEXT.md for the active mission before resuming work
- Re-read CLAUDE.md Section 19 (Context Management) after compaction

## File Conventions
- Max 200 lines per new file
- Staleness footers on all .md files
- source-files/ and archive/ are READ ONLY
- Status markers: ✅ / 🟡 / 🔴 / ⚠️
- File references by filename only, not full path

## Stack
- Python project (pyproject.toml); scripts in scripts/, specs in specs/
- No Node frontend in this repo

## Git Conventions
- Commit format: `type: description` (feat, fix, chore, docs)
- Never push without explicit instruction
- Branch noted in CLAUDE.md header

## Key Constraints
- Never expose secrets, API keys, .env contents
- 3-strike rule: stop after 3 failed attempts
- Tier 1 free models first; escalate to Tier 2 (Claude) only when needed

<!-- Staleness: 2026-06-11 | Owner: Mel John Dimat | Review: September 2026 -->
