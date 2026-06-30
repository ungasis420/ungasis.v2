---
name: powerbi
description: Use when the task involves Power BI, PBIX, PBIP, TMDL, DAX, measures, semantic models, Power Query, M code, Performance Analyzer, report visuals, slicers, relationships, star schema, or Power BI MCP/model review.
---

# Power BI Skill

## Purpose
Route Power BI work through safe, text-first review. Prefer PBIP/TMDL, markdown docs, and Power BI MCP tools. Never open PBIX binaries.

## Triggers
Use this skill for:
- Power BI
- PBIX / PBIP
- TMDL
- DAX
- measures
- semantic model
- Power Query / M code
- Performance Analyzer
- report visuals
- slicers
- relationships
- star schema

## Safety rules
- Do not open `.pbix` files.
- Prefer `.pbip`, `.tmdl`, `.dax`, markdown docs, and MCP model tools.
- Treat report-backup PBIX files as read-only binaries.
- Do not edit model, measure, or report files unless the user explicitly asks.
- Start with read-only audit before edits.
- Do not run destructive Git commands.

## Review checklist
1. Identify task type: DAX, semantic model, visual/performance, Power Query, or documentation.
2. Find safe source files first: PBIP/TMDL/docs.
3. For DAX, check variables, `DIVIDE`, filter context, `CALCULATE` clarity, iterators, blank handling, and duplicated logic.
4. For model structure, check star schema, relationships, cardinality, bidirectional filters, and auto date/time tables.
5. For Power Query, check source paths, privacy, query folding, and fragile transformations.
6. For report performance, ask for or inspect Performance Analyzer output when available.
7. Return short findings: issue, evidence, fix, risk.

## UNGASIS repo routing
- For Newmont Power BI work, prefer:
  - `projects/newmont/pbip/`
  - `projects/newmont/docs/`
- Never open:
  - `projects/newmont/report-backups/*.pbix`
- Use Power BI MCP tools when available for model, measure, relationship, or DAX query inspection.
