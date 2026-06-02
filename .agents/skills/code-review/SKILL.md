---
name: code-review
description: "Structured code review following UNGASIS quality standards."
---
# Code Review Skill

## Purpose
Perform a structured code review on a file to ensure it aligns with UNGASIS standards.

## Steps
1. **Read the Target File:** Load the file in full to understand its purpose and logic.
2. **Verify Token Efficiency:** Check if the file is structured concisely to save token space.
3. **Verify Safety Compliance:** Confirm that the file does not expose secrets or run risky operations without approval.
4. **Verify UNGASIS Style:** Ensure the use of Simple English, tables for comparisons, and kitchen or everyday analogies.
5. **Generate Summary Table:** Output a markdown table summarizing the audit results:

| Check | Status (Pass/Fail) | Notes / Details |
|---|---|---|
| Token Efficiency | | |
| Safety Compliance | | |
| UNGASIS Style | | |

6. **Suggest Fixes:** If any check fails, provide simple drop-in code fixes.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
