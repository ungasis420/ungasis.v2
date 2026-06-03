---
name: qa-audit
description: "Run QA checks on a file against UNGASIS standards."
---
# QA Audit Skill

## Purpose
Perform conformance audits on repository files to maintain high quality and consistency.

## Steps
1. Open and inspect the target file.
2. Check for the existence of the standard staleness footer:
   `Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel`
3. Verify that Simple English is used and complex terms are explained.
4. Verify that tables are used to summarize comparison data instead of lengthy prose.
5. Verify that domain-specific terms match the Domain Language Table (e.g., `quest`, `chapter`, `mana`).
6. Scan for any exposed secrets, passwords, or API keys.
7. Compile and output a report showing pass/fail status for each of the checks.

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
