# fix-request.md — Fix Request Template

## Purpose
Used by the Commander to request quick bug fixes from the Surgeon.

## Target Agent
- **Target**: Surgeon 🔪

## Trigger Condition
- When a bug, test failure, or syntax error is detected in 1-2 files.

## Delegation Prompt Template
```markdown
# Surgical Fix Request

Please repair the following issue in the workspace:

- **Target File**: [FILE]
- **Problem Reported**: [PROBLEM]
- **Expected Outcome**: [EXPECTED]
- **Actual Outcome**: [ACTUAL]

## Instructions
1. Inspect the target file and apply the minimum necessary modifications.
2. Follow all guidelines in `.clinerules/` and conventions.
3. Test your changes locally to confirm the issue is fixed.
```

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
