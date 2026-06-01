# Changelog

## 2026-05-30 - v1 merged master repository

### Added

- merged repository structure
- original ZIP backups
- extracted original backups
- production readiness files
- schema files
- local validation script
- CI workflow
- permission matrix
- human approval gates
- observability sample
- release and rollback docs
- beginner guides and glossary

### Changed

- root README now explains the merged repo
- `.claude/settings.json` now defaults to read-only
- `.aider.conf.yml` now disables auto-commits

### Removed

- No source material was deleted. Originals are preserved in backup folders.


## v3 - 2026-05-31 - Unified lossless merge

Added:
- Lossless archive for direct uploaded files and project knowledge files.
- Active `TASK_BOARD.md`, `SHARED_STATE_PROTOCOL.md`, `CROSS_REFERENCE_BRIDGE.md`, and `MODEL_ROUTING_v4.1.md`.
- Cursor rule at `.cursor/rules/token_efficiency.mdc`.
- Safe MCP setup guide and safe MCP config example.
- Config files for model routing, shared state, cross-reference bridge, and MCP pruning rules.
- JSON schemas for new config files.
- Smoke and permission tests for shared state, model routing, and MCP pruning.
- `LOSSLESS_MERGE_AUDIT_v3.md`.

Changed:
- Updated repository validator to check v3 files and schemas.
- Updated local check runner to include v3 lossless check.
- Expanded permission matrix with MCP tool permissions.

Removed:
- Nothing. Originals were preserved.

Production note:
- Still requires live GitHub Actions, real MCP runtime, real secret storage, and deployment testing before production certification.
