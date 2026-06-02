---
name: quality-auditor
description: >
  Manually trigger the Quality Auditor to review files against the 9-point UNGASIS checklist.
---

# /quality-auditor — Quality Audit Workflow

Call @quality-auditor to review files after a sprint or task.

## When to Use
- After every sprint completion
- After file modifications
- Before git commit (pre-flight check)
- When Mel requests a quality review

## Steps
1. Identify which files to audit (sprint output or specified files)
2. Call @quality-auditor with the file list
3. Auditor checks each file against the 9-point checklist:
   - Staleness footer present on all .md files
   - Simple English (avg <20 words per sentence)
   - Knowledge entry format (What, Code, When to Use, Gotchas, Source, Tags)
   - SOP format (Trigger, Steps, Time, Output, Gotchas)
   - Genome format (sections, tables, references)
   - Engine file format (Purpose, How It Works, Rules, Inputs/Outputs)
   - File completeness (all expected files exist)
   - No forbidden modifications (archive/, source-files/)
   - Content accuracy (glassmorphism values, conventions)
4. Return PASS or FAIL verdict per file
5. If FAIL: generate fix prompt with specific file + line + change needed
6. If PASS: proceed to @graphify-watchdog for re-indexing

## Output Format
Returns a table: # | File | Status | Issue | Fix

## Safety
- Auditor NEVER modifies files — only reviews
- Auditor NEVER approves archive/ or source-files/ changes

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
