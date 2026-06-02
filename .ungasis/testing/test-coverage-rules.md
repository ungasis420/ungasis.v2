# Test Coverage Rules Engine

## Purpose
Set the threshold requirements for code and document validation coverage across UNGASIS repositories.

## How It Works
The engine monitors the repository state, tracks changed files, and ensures test coverage meets minimum standards before commits are authorized.

## Rules
1. Every engine file (`.ungasis/`) must be verified against the Checklist Test.
2. Every template file must have all variables tested for fallback default values.
3. Every SOP file must have at least one test verifying numbered steps and time estimates.
4. Test execution priority:
   - Priority 1: New files created in the active sprint.
   - Priority 2: Modified files changed within the last 7 days.
   - Priority 3: Stable, unchanged historical documents.

## Minimum Coverage Standards

| File Category | Coverage Type | Threshold Requirement | Enforcement Action |
|---|---|---|---|
| Engine files | Section Validation | 100% (all sections must exist) | Block Commit on FAIL |
| Templates | Fallback Defaults | 100% variables have defaults | Block Commit on FAIL |
| SOPs | Step Completeness | At least 1 validation audit | Warn on FAIL |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `modified_files_list` | Git status | List of files changed in active workspace |

| Output | Destination | Description |
|---|---|---|
| `coverage_status` | Quality Auditor | Report of untested vs tested files |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
