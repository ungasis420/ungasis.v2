# LLM_CONTEXT.md — Project Passport

## 1. Identity
* **Project**: UNGASIS OS v4.0 (Unified Generative AI System for Independent Solopreneurs)
* **Type**: Markdown-first knowledge repo — NOT a running app
* **Owner**: Mel John Dimat (Filipino, Manila, ESL speaker, visual learner)
* **Budget**: $19.99/mo Google AI Pro + $0 company tools (M365 Copilot, ChatGPT Enterprise)
* **GitHub**: https://github.com/ungasis420/ungasis.v2
* **License**: Private

## 2. Read Order (MANDATORY)
1. [LLM_CONTEXT.md](file:///c:/Users/63905/Downloads/ungasis/LLM_CONTEXT.md) (This file)
2. [AGENTS.md](file:///c:/Users/63905/Downloads/ungasis/AGENTS.md) (Cross-tool bridge)
3. [GEMINI.md](file:///c:/Users/63905/Downloads/ungasis/GEMINI.md) (Antigravity project config)
4. [CONTEXT.md](file:///c:/Users/63905/Downloads/ungasis/CONTEXT.md) (Last session state)
5. Relevant `.agents/rules/` or `.clinerules/` for the task

## 3. Architecture
* [.agents/](file:///c:/Users/63905/Downloads/ungasis/.agents/) — Antigravity rules, skills, workflows
* [.clinerules/](file:///c:/Users/63905/Downloads/ungasis/.clinerules/) — Cline agent rules (same content as .agents/rules/)
* [.github/](file:///c:/Users/63905/Downloads/ungasis/.github/) — Copilot instructions, issue templates, CI workflows
* [archive/](file:///c:/Users/63905/Downloads/ungasis/archive/) — READ ONLY original ZIP-extracted archives
* [blueprints/](file:///c:/Users/63905/Downloads/ungasis/blueprints/) — Master blueprints (opus = primary)
* [config/](file:///c:/Users/63905/Downloads/ungasis/config/) — 9 orchestration YMLs (circuit-breaker, kill-switch, etc.)
* [context/](file:///c:/Users/63905/Downloads/ungasis/context/) — Session state files
* [docs/](file:///c:/Users/63905/Downloads/ungasis/docs/) — Changelog, file inventory, runbook, QA plan, etc.
* [kernels/](file:///c:/Users/63905/Downloads/ungasis/kernels/) — 7 kernel files (00-06)
* [knowledge/](file:///c:/Users/63905/Downloads/ungasis/knowledge/) — Wiki and raw knowledge
* [memory-bank/](file:///c:/Users/63905/Downloads/ungasis/memory-bank/) — Cline memory persistence
* [modules/](file:///c:/Users/63905/Downloads/ungasis/modules/) — 30+ knowledge modules + production-readiness/
* [multi-agents/](file:///c:/Users/63905/Downloads/ungasis/multi-agents/) — Orchestration master guide
* [scripts/](file:///c:/Users/63905/Downloads/ungasis/scripts/) — Python utility scripts
* [source-files/](file:///c:/Users/63905/Downloads/ungasis/source-files/) — READ ONLY original source documents
* [specs/](file:///c:/Users/63905/Downloads/ungasis/specs/) — Project spec templates

## 4. Domain Language
| Term | Means |
| :--- | :--- |
| **quest** | project from idea to completion |
| **chapter** | lifecycle stage (1-10) |
| **shield** | data classification level (L0-L4) |
| **forge** | build/development phase |
| **gate** | human approval checkpoint |
| **module** | standalone markdown knowledge file |
| **mana** | token budget per session |
| **codex** | reference wiki / knowledge base |

## 5. Key Rules
* **Token Efficiency**: 12-layer mana system, batch edits, tables over prose.
* **Safety**: Read before write, never expose secrets, human gate required.
* **Output**: Simple English, analogies, tables, staleness footers.
* **Memory**: Update CONTEXT.md every session, git push before switching devices.

## 6. Tools & Devices
* **4 Devices**: PC (unlimited, RTX 5060 Ti), Work Laptop (browser only), Phone, Tablet.
* **Key Tools**: Antigravity IDE/CLI, Cline, Jules (100 tasks/day), M365 Copilot, ChatGPT Enterprise, Ollama, 30 API keys across 6 providers.

## 7. Security
* `.env` is listed in `.gitignore` — never commit secrets.
* API key patterns to never output: `AIzaSy*`, `sk-*`, `ghp_*`, `gho_*`.
* `source-files/` and `archive/` are strictly **READ ONLY**.

## 8. How to Start a Session
1. Read this file.
2. Read [CONTEXT.md](file:///c:/Users/63905/Downloads/ungasis/CONTEXT.md) for last session state.
3. If using Antigravity: `/context-pack` skill loads context automatically.
4. If using Cline: read `.clinerules/` rules.
5. Ask: "What is your task?"

## 9. Current Status
* **Version**: v4.0 (June 2, 2026)
* **GitHub**: Pushed, tag v4.0.
* **Graphify**: Installed, pending first scan.
* **Antigravity-Mem**: Installed, verified.
* **Next milestone**: Use as foundation for RiftCoach project.

## 10. Scope Boundaries
* **In scope**: Updating modules, fixing docs, adding knowledge.
* **Out of scope**: Building a running app from this repo, deploying, adding executable code (unless Mel explicitly asks).

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
