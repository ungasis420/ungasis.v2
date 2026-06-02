# Test Strategy Engine

## Purpose
Define verification strategies and checks required for each file category (Engine, SOP, Template, Config) to ensure system reliability.

## How It Works
```
File Target ──> Identify File Category ──> Apply Category Checks ──> Calculate Coverage & Score
```

## Rules
1. Engine files must contain all four standard sections: Purpose, How It Works, Rules, and Inputs/Outputs.
2. Templates must define default values for all variables to prevent interpolation failures.
3. SOP files must have numbered steps, estimated time durations, and clear exit criteria.
4. JSON/YAML configurations must be valid and conform to standard schemas.

## Test Priority Matrix

| File Type | Test Priority | Required Verification Method | Coverage Target |
|---|---|---|---|
| Engine File (`.ungasis/`) | High (P0) | Verification of 4 core sections & tables | 100% of files |
| Template (`templates/`) | Medium (P1) | Variable interpolation defaults check | 100% of variables |
| SOP (`sops/`) | Medium (P1) | Numbered steps & time estimate audit | 100% of files |
| Config (`config/`) | High (P0) | YAML/JSON syntax validator parser | 100% of files |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `file_under_test` | Quality Auditor | Absolute path and content of file |

| Output | Destination | Description |
|---|---|---|
| `test_report` | Quality Auditor | Checklist PASS/FAIL report for the target file |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
