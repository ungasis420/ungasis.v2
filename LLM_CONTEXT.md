# LLM_CONTEXT.md — Project Passport

> Source of truth: [CLAUDE.md](./CLAUDE.md). This passport is a quick-reference companion.

## 1. Identity
* **Project**: UNGASIS OS v5.4 AUTOMATE — personal AI operating system (IN PROGRESS, 3/5 tasks done)
* **Type**: Knowledge repo + real apps (Newmont, RiftCoach, Dashboard)
* **Owner**: Mel John Dimat (Filipino, Manila, ESL speaker, visual learner)
* **Budget**: $19.99/mo Google AI Pro + $0 company tools (M365 Copilot, ChatGPT Enterprise)
* **GitHub**: https://github.com/ungasis420/ungasis.v2
* **License**: Private

## 2. Read Order (MANDATORY)
1. [CLAUDE.md](./CLAUDE.md) (Canonical source of truth)
2. [LLM_CONTEXT.md](./LLM_CONTEXT.md) (This passport)
3. [GEMINI.md](./GEMINI.md) (Antigravity / agy config — Gemini only)
4. [CONTEXT.md](./CONTEXT.md) (Last session state)
5. Relevant `.claude/rules/` (Claude) or `.gemini/rules/` (Gemini) for the task

## 3. Architecture
* [.agents/](./.agents/) — Antigravity rules, skills, workflows
* [.clinerules/](./.clinerules/) — Cline agent rules (same content as .agents/rules/)
* [.github/](./.github/) — Copilot instructions, issue templates, CI workflows
* [archive/](./archive/) — READ ONLY original ZIP-extracted archives
* [blueprints/](./blueprints/) — Master blueprints (opus = primary)
* [config/](./config/) — 9 orchestration YMLs (circuit-breaker, kill-switch, etc.)
* [context/](./context/) — Session state files
* [docs/](./docs/) — Changelog, file inventory, runbook, QA plan, etc.
* [kernels/](./kernels/) — 7 kernel files (00-06)
* [knowledge/](./knowledge/) — Wiki and raw knowledge
* [memory-bank/](./memory-bank/) — Cline memory persistence
* [modules/](./modules/) — 30+ knowledge modules + production-readiness/
* [multi-agents/](./multi-agents/) — Orchestration master guide
* [scripts/](./scripts/) — Python utility scripts
* [source-files/](./source-files/) — READ ONLY original source documents
* [specs/](./specs/) — Project spec templates

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
* **Key Tools**: Antigravity IDE + CLI + Agent Manager, Cline 2.0 (VS Code), M365 Copilot, ChatGPT Enterprise, Ollama, 30 API keys across 6 providers.

## 7. Security
* `.env` is listed in `.gitignore` — never commit secrets.
* API key patterns to never output: `AIzaSy*`, `sk-*`, `ghp_*`, `gho_*`.
* `source-files/` and `archive/` are strictly **READ ONLY**.

## 8. How to Start a Session
1. Read this file.
2. Read [CONTEXT.md](./CONTEXT.md) for last session state.
3. If using Antigravity: `/context-pack` skill loads context automatically.
4. If using Cline: read `.clinerules/` rules.
5. Ask: "What is your task?"

## 9. Current Status
* **Version**: v5.4 AUTOMATE — IN PROGRESS (3/5 tasks done) (June 13, 2026)
* **v5.3 CONNECT**: ✅ COMPLETE (wiki-inject, session-recovery, verifier, merge-agy-output, claude-hooks)
* **GitHub**: Pushed, tag v5.0-jarvis-complete
* **Graphify**: 20,929 nodes, 24,207 edges, 4,580 communities
* **Antigravity-Mem**: Installed, verified.
* **JARVIS Score**: 98% complete
* **Sprint Count**: 66+ completed
* **Scripts**: ~32 automation scripts (`scripts/`)
* **Files**: ~1,222+ files across 240+ folders
* **Engines**: 9 core engines + 20 subsystems (see [BLUEPRINT_CONTEXT.md](./.ungasis/architect/BLUEPRINT_CONTEXT.md))
* **Agent Crew**: 6 agents (Commander, Blueprint Architect, Builder, Surgeon, Quality Auditor, Graphify Watchdog)
* **Slash Commands**: 9 slash commands (/goal, /schedule, /grill-me, /blueprint, /scout, /tag-sweep, /audit, /commander, /designer)
* **5 JARVIS Dimensions**: Second Brain, App Fabricator, Project Director, Personal JARVIS, Growth Engine
* **Next milestone**: Complete v5.4 AUTOMATE — wire self-heal.py into one-shot-build.ps1, verify scheduled-tasks.ps1, run cross-project.py end-to-end (Newmont → RiftCoach).

## 10. Scope Boundaries
* **In scope**: Updating modules/docs/knowledge; building & maintaining the apps under `projects/` (Newmont, RiftCoach) and `dashboard/`.
* **Out of scope**: Editing `source-files/` or `archive/` (READ ONLY); exposing secrets.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
