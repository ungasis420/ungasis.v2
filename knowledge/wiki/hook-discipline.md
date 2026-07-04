# Hook Discipline

Canonical guide for Claude Code hook design in UNGASIS-OS.

## Two hook classes

- **Allowlist (PermissionRequest)**: speedup only. Skips permission dialog for known-safe patterns. Does NOT block danger.
- **Deny (PreToolUse permissionDecision=deny)**: actual safety. Fires before tool execution. Deny is final.

## Fail-closed pattern (mandatory)

All PowerShell hook bodies MUST:

1. Wrap logic in try/catch
2. Emit deny JSON on ANY script error
3. Never silent-pass on crash

## Windows Claude Code + Git Bash reality

Bash-tool matcher hooks execute via /usr/bin/bash, NOT powershell.exe.
Raw PowerShell syntax will cause bash parse errors and break all subsequent tool calls.

**Fix**: wrap as `powershell -NoProfile -NonInteractive -EncodedCommand <base64>`.
Bash then launches PowerShell as a subprocess. No parsing conflict.

## Validation rules

- Synthetic pipe tests are insufficient. Always validate via real `bash -c` invocation.
- Use a non-matcher tool (PowerShell tool) to drive Bash tests, otherwise the hook self-gates its own validation.
- Test at least 7 scenarios including malformed JSON (fail-closed proof).

## Audit before add

Before installing any new hook:
- Run /hooks to see existing counts
- Check plugin/skill/agent-owned hooks
- Never assume empty layer

## Bonus behavior

PreToolUse deny reasons surface to the model as `<error>` tags.
This trains Claude to avoid the pattern within-session (behavioral moat).

## Never hardcode paths

Always discover settings via `$env:USERPROFILE\.claude\settings.json`.
Never hardcode user paths.

## Rollback discipline

Every hook install requires:
- Backup file before edit (`settings.json.bak-YYYY-MM-DD-<wave>`)
- JSON validation after edit
- Auto-restore on any test failure

## References

- Template: docs/skinny-prompt-template-v2.md (v2.2)
- Hooks docs: https://docs.anthropic.com/en/docs/claude-code/hooks
- Session origin: docs/handoffs/UNGASIS_HANDOFF_2026-07-05_W1d.md

Last reviewed: 2026-07-05 | Owner: Mel | Related: W1a, W1b, W1d
