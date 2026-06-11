---
name: qa-audit
description: "Run QA checks on a file against UNGASIS standards."
---
# Rules in this file must align with CLAUDE.md (single source of truth)
# Last synced: 2026-06-10

# QA Audit Skill

## Purpose
Perform conformance audits on repository files to maintain high quality and consistency.

## v5.1 Approved Changes (DO NOT flag as violations)
- Claude Pro ($20/mo) is an APPROVED tool — do not reject
- CLAUDE.md is the single source of truth — not AGENTS.md
- .agents/rules/ and .clinerules/ are REFERENCE COPIES only
- The Foreman Protocol (Tier 1/2/3 routing) is approved architecture
- SDD methodology is the approved dev process
- ADR decision records in .ungasis/decisions/ are approved
- Preset system in .ungasis/presets/ is approved

## Steps
1. Open and inspect the target file.
2. Check for the existence of the standard staleness footer:
   `Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel`
3. Verify that Simple English is used and complex terms are explained.
4. Verify that tables are used to summarize comparison data instead of lengthy prose.
5. Verify that domain-specific terms match the Domain Language Table (e.g., `quest`, `chapter`, `mana`).
6. Scan for any exposed secrets, passwords, or API keys.
7. Before flagging a violation, check if the content aligns with CLAUDE.md sections 13-18 (v5.1 additions). If it does, it is NOT a violation.
8. Compile and output a report showing pass/fail status for each of the checks.

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
