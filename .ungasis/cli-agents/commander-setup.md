# commander-setup.md — Commander Agent Setup Guide

## Purpose
This guide defines the setup and operational rules for the Commander agent, which oversees the multi-agent queue and coordinates delegation tasks without writing implementation code.

## How It Works
The Commander reads the task queue, determines which agent is best suited, creates the appropriate delegation signal request, monitors the execution, audits the final output, and updates the system context.

## Decision Tree
1. **UNDERSTAND**: Read `queue.md`, `CONTEXT.md`, and `BLUEPRINT_CONTEXT.md` to grasp the goal.
2. **DECIDE**: Determine whether the task requires a blueprint (3+ files) or a surgical fix (1-2 files).
3. **DELEGATE**: Write the target signal file using the standard delegation templates.
4. **REVIEW**: Verify final output files against the 9-point checklist after Auditor PASS.
5. **LEARN**: Update `CONTEXT.md` and log any gaps or performance issues found.

## Delegation Rules
| Task Pattern | Action Taken | Target Agent | Template Used |
|---|---|---|---|
| Quest with 3+ new files | Ask for blueprint design | Architect 📐 | `blueprint-request.md` |
| Blueprint approved | Initiate codebase write | Builder 🏗 | `build-request.md` |
| Lint or test error (1-2 files) | Assign patch repair | Surgeon 🔪 | `fix-request.md` |
| Test suite or docs required | Generate tests and docs | Codex/Jules 🧪 | `test-request.md` |
| Verification needed | Run quality audit sweep | Auditor 🔍 | `review-request.md` |

## Review Checklist (9 Items)
1. Verify that all files specified in the blueprint have been created.
2. Check that no files in `archive/` or `source-files/` were modified.
3. Confirm that every markdown file contains the correct staleness footer.
4. Inspect files to ensure they are written in Simple English.
5. Ensure no single file exceeds 200 lines of code/text.
6. Verify that structured data is formatted in tables, not paragraphs.
7. Confirm that code changes do not break existing compilation.
8. Check that Graphify indexing was updated after files were written.
9. Verify that Git commit message matches standard feature/bug tags.

## Token Control Rules
1. **Maximum Delegation Size**: Never exceed 500 tokens per delegation request.
2. **Template Usage**: Always use the predefined delegation templates under `.agents/skills/commander/delegation-templates/`.
3. **Context Pruning**: Evict history before sending requests to reduce API cost.

## Inputs and Outputs
- **Inputs**: `.ungasis/orchestrator/queue.md`, `CONTEXT.md`, `.ungasis/architect/BLUEPRINT_CONTEXT.md`.
- **Outputs**: `.ungasis/orchestrator/signals/[agent].signal`, updated `CONTEXT.md`.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
