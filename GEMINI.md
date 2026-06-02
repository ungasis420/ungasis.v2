# GEMINI.md — Antigravity Agent Configuration

## Read Order
Before starting any work on this quest, the agent must read these files in the following order:
1. [AGENTS.md](file:///c:/Users/63905/Downloads/ungasis/AGENTS.md) — Cross-tool rules
2. [GEMINI.md](file:///c:/Users/63905/Downloads/ungasis/GEMINI.md) — Antigravity configuration
3. [.agents/rules/](file:///c:/Users/63905/Downloads/ungasis/.agents/rules/) — Active rule files
4. [CONTEXT.md](file:///c:/Users/63905/Downloads/ungasis/context/README.md) — Current state

---

## Project Identity
| Metric | Value |
|---|---|
| Project Name | UNGASIS OS |
| Type | Markdown-first Unified Lossless Knowledge Repository |
| Version | v4.0 |
| Owner | Mel John Dimat |

---

## Token Budget Rules
To conserve mana (tokens) during your work, follow these rules:
- **Never Repeat**: Do not repeat instructions from AGENTS.md, GEMINI.md, or rule files.
- **Batch Edits**: Group related changes into a single tool call instead of writing files one by one.
- **Skip Pleasantries**: Do not write greetings, preambles, or conversational filler. Go straight to the answer.
- **Tables Over Prose**: Use markdown tables instead of paragraphs to present structured information.
- **Reference via Mentions**: Reference files with `@mentions` or links instead of pasting contents into the chat.

---

## File Edit Rules
| Directory | Permission | Purpose / Rule |
|---|---|---|
| `source-files/` | **READ-ONLY** | Original master prompts. Never edit or delete. |
| `modules/` | **EDITABLE** | Knowledge files. Create or edit following style guide. |
| `.clinerules/` | **READ-ONLY for Antigravity** | cline rules. Keep in sync but don't edit here. |
| `.agents/` | **EDITABLE** | Antigravity config, rules, skills, and workflows. |

---

## UNGASIS Style Guide
- **Simple English**: Mel is an ESL speaker and visual learner. Use plain English and avoid complex technical jargon.
- **Tables for Comparisons**: Use clear tables to compare features, pros/cons, or status.
- **Checklists for Procedures**: Use markdown task lists for step-by-step instructions.
- **Analogies**: Explain concepts using everyday analogies (e.g., cooking, sports, driving).
- **Staleness Footer**: Every rule, module, and configuration file must end with the standard footer:
  `Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel`

---

## Domain Language Table
Use these ubiquitous terms when communicating with the owner or editing modules:

| Term | Means | Do Not Say Instead |
|---|---|---|
| **quest** | A project from idea to completion | project, initiative |
| **chapter** | A lifecycle stage (1-10) | phase, step, level |
| **shield** | Data classification level (L0-L4) | security tier |
| **forge** | The build/development phase | development, coding |
| **gate** | A human approval checkpoint | review, approval |
| **module** | A standalone .md knowledge file | document, guide |
| **mana** | Token budget per session | tokens, credits |
| **codex** | Reference wiki / knowledge base | docs, documentation |

---

## Verification Checklist
Before completing a task, check these items:
- [ ] No secrets, passwords, or API keys are exposed.
- [ ] The style guide has been strictly followed (Simple English, tables, footers).
- [ ] No files in `source-files/` have been modified or deleted.
- [ ] A self-check line in the format `Self-check: PASS — [what was checked]` has been logged.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
