# Rollback Procedures

## Purpose
This document provides step-by-step instructions for executing rollback procedures depending on the determined scope of failure.

## How It Works
The operator or agent follows the designated checklist below to perform git resets or checkouts, then logs the outcome.

## Rollback Scope Checklists

### 1. File Scope Rollback
- **Trigger**: Single file corrupted or incorrect modification.
- **Commands**:
  ```powershell
  pwsh -c git checkout -- [file-path]
  ```
- **Verification**: Run `git status` to verify file changes are cleared.

### 2. Sprint Scope Rollback
- **Trigger**: Sprint audit failed 3 times or regression found in sprint files.
- **Commands**:
  ```powershell
  pwsh -c git revert [commit-hash]
  ```
- **Verification**: Run build and verify that previous sprint tests pass.

### 3. Batch Scope Rollback
- **Trigger**: Core codebase corruption or multi-sprint failure.
- **Commands**:
  ```powershell
  pwsh -c git reset --hard [tag-name]
  ```
- **Verification**: Clean index and rebuild knowledge graph.

## Rules
1. **Always Update Context**: Immediately after any rollback procedure, append the rollback event and state status to `CONTEXT.md`.
2. **Prevent Re-commit**: Do not stage files after a rollback until the root cause of the failure is addressed.

## Inputs/Outputs
- **Inputs**: Scope target, commit hash or tag name.
- **Outputs**: Clean git tree, updated context log.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
