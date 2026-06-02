# review-request.md — Quality Review Request Template

## Purpose
Used by the Commander to trigger quality audits at the end of a sprint.

## Target Agent
- **Target**: Auditor 🔍

## Trigger Condition
- When files have been written or modified and are ready for verification.

## Delegation Prompt Template
```markdown
# Quality Audit Request

Please audit the following files against UNGASIS design standards:

- **Sprint Name**: [SPRINT]
- **Target Files**:
[FILE_LIST]

## Verification Checklist
1. Staleness footer present on all .md files?
2. Simple English and short sentences?
3. Proper SOP or Wiki entries formats applied?
4. Line ceiling limits respected (<200 lines)?
5. Tables used instead of paragraphs for structured data?
6. No modification of `archive/` or `source-files/` folders?
```

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
