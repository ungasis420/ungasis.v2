# DAX Review Reference

## Use when
Use for Power BI DAX measure review, calculated columns, KPI logic, filter-context issues, and performance review.

## Checklist
1. Prefer explicit measures for reusable business logic.
2. Use `VAR` / `RETURN` when logic repeats or readability suffers.
3. Prefer `DIVIDE` over `/` when the denominator can be zero or BLANK.
4. Check `CALCULATE` filter context: what filters are added, removed, or overwritten?
5. Check iterator use: `SUMX`, `AVERAGEX`, `FILTER` — confirm row context is intentional.
6. Check blank handling: preserve BLANK unless business logic requires zero.
7. Check measure naming: readable, business-facing, and consistent.
8. Check duplicated logic: extract shared logic into base measures.
9. Check relationship assumptions: confirm the measure depends on the intended filter path.
10. Check visual behavior: ask for Performance Analyzer output if performance is the issue.

## Output format
For each issue found, return:
- Issue
- Evidence
- Recommended fix
- Risk if ignored

## Safety
- Do not open PBIX files.
- Prefer PBIP/TMDL/docs/MCP.
- Do not edit measures unless the user explicitly asks.
