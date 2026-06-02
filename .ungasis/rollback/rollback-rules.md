# Rollback Rules

## Purpose
This document defines standard criteria and trigger conditions for rolling back changes when an audit fails, regression occurs, or files are modified in error.

## How It Works
When a trigger condition is met, the system evaluates the severity and applies the decision tree to determine the rollback scope (file, sprint, or batch).

## Decision Tree Matrix

| Failure Severity | Trigger Condition | Rollback Scope | Target Action |
|---|---|---|---|
| **Low** | Wrong file modified or minor formatting error | File | Discard local changes for affected file |
| **Medium** | Sprint audit fails 3 times or regression detected | Sprint | Revert current sprint git commit |
| **High** | Critical repository damage or batch failure | Batch | Hard reset to previous release tag |

## Rules
1. **Trigger Threshold**: Initiate rollback immediately if a sprint audit fails 3 consecutive times.
2. **Post-Rollback Sync**: Update `CONTEXT.md` immediately following any rollback execution.
3. **Log Enforcement**: Record all rollback details in `rollback-log.md`.

## Inputs/Outputs
- **Inputs**: Audit logs, test results, git status.
- **Outputs**: Rollback decision, designated scope.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
