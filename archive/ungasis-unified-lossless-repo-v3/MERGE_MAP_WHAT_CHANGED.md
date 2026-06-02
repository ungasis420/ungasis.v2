# Merge Map: What Changed

## Goal

Turn three ZIP files into one cleaner repository.

## Source ZIPs

| ZIP | Role |
|---|---|
| `multi-agent-orchestration-kit-v4.zip` | Agent workflow and orchestration blueprint. |
| `token-efficiency-agent-os-v4.zip` | Token-saving AI coding workflow rules. |
| `ungasis-production-readiness-pack-v1.zip` | Security, QA, schemas, tests, and learner guides. |

## Backup rule

No original ZIP was deleted.

Original ZIPs are stored in:

```text
01_ORIGINAL_ZIP_BACKUPS/
```

Extracted originals are stored in:

```text
02_EXTRACTED_ORIGINALS_READ_ONLY/
```

## Main merge decisions

| Decision | What happened | Why |
|---|---|---|
| Root README replaced | New merged `README.md` created | Avoid duplicate/confusing README files. |
| Original README files preserved | Saved inside extracted backups or docs/original folders | No information loss. |
| Token AI tool settings hardened | `.claude/settings.json` changed to read-only default | Safer beginner default. |
| Aider auto-commit disabled | `.aider.conf.yml` sets `auto-commits: false` | Prevents silent commits. |
| Production files added | Security, runbook, rollback, schemas, tests | Needed before production use. |
| CI added | `.github/workflows/ci.yml` | Automatic checking. |
| File status register added | `FILE_STATUS_REGISTER.csv` | Every file is marked. |

## Duplicate rule

When duplicate files had the same purpose, the merged repo keeps one active version and preserves originals in backup folders.


# v3 Merge Map - 2026-05-31

| Source | Preserved raw location | Active/revised location | Status |
|--------|------------------------|-------------------------|--------|
| `TASK_BOARD.md` | `00_LOSSLESS_ARCHIVE_READ_ONLY/2026-05-31_direct_uploads_raw/TASK_BOARD.md` | `TASK_BOARD.md` | Merged |
| `CROSS_REFERENCE_BRIDGE.md` | `00_LOSSLESS_ARCHIVE_READ_ONLY/2026-05-31_direct_uploads_raw/CROSS_REFERENCE_BRIDGE.md` | `CROSS_REFERENCE_BRIDGE.md`, `config/cross-reference-bridge.yml` | Merged |
| `cursor_rules_token_efficiency.mdc` | `00_LOSSLESS_ARCHIVE_READ_ONLY/2026-05-31_direct_uploads_raw/cursor_rules_token_efficiency.mdc` | `.cursor/rules/token_efficiency.mdc` | Activated |
| `mcp-config.json` | `00_LOSSLESS_ARCHIVE_READ_ONLY/2026-05-31_direct_uploads_raw/mcp-config.json` | `mcp/mcp-config.safe.example.json` | Safely templated |
| `MODEL_ROUTING_v4.1.md` | `00_LOSSLESS_ARCHIVE_READ_ONLY/2026-05-31_direct_uploads_raw/MODEL_ROUTING_v4.1.md` | `MODEL_ROUTING_v4.1.md`, `config/model-routing.yml` | Merged |
| `SHARED_STATE_PROTOCOL.md` | `00_LOSSLESS_ARCHIVE_READ_ONLY/2026-05-31_direct_uploads_raw/SHARED_STATE_PROTOCOL.md` | `SHARED_STATE_PROTOCOL.md`, `config/shared-state-protocol.yml` | Merged |
| UNGASIS core files | `00_LOSSLESS_ARCHIVE_READ_ONLY/2026-05-31_ungasis_project_knowledge_raw/` | `ungasis-core/` | Added |
