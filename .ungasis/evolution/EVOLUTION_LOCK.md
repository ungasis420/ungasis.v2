# Evolution Lock

## Purpose
Enforce strict security boundaries by listing files that the evolution engine is locked from modifying autonomously.

## How It Works
1. Before any file adaptation or modification is executed, the target file path is matched against the lock list.
2. If a match is found, the modification is blocked, and an entry is logged in blocked-attempts.md.

## Rules
1. Any file matching this list must NEVER be modified autonomously.
2. Attempted modifications to locked files must instantly trigger a system STOP and notification.
3. This lock file itself is recursively locked from auto-changes.

## Locked Files List
- `BUILDER_PROFILE.md` — only Mel changes identity.
- `.env` / API keys — security credentials.
- `archive/` — read-only forever.
- `source-files/` — read-only reference prompts.
- `EVOLUTION_LOCK.md` — self-referential lock.
- Any file without Mel's explicit `"evolve"` tag.
- Permission profiles (`config/permission-profiles.yml`).
- Kill switch settings.

## Inputs/Outputs

| Input | Output |
|---|---|
| Proposed File Modification | Pass / Block Verdict |

## Escalation Policy
If the evolution system ever tries to modify a locked file, it MUST:
1. STOP immediately.
2. Log the attempt to `evolution/adaptations/blocked-attempts.md`.
3. Notify Mel in the next session summary.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
