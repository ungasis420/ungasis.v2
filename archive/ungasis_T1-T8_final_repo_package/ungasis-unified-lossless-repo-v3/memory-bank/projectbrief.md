# Project Brief — UNGASIS OS v3.0

## Purpose

UNGASIS OS v3.0 is an AI builder's personal operating system for solopreneurs. It helps a beginner build apps, workflows, prompts, audits, and knowledge systems with AI assistants without losing context.

## Owner

| Field | Value |
|---|---|
| Owner | Mel John Dimat |
| Location | Manila, Philippines |
| User profile | Filipino reporting consultant, beginner, ESL speaker, visual learner |
| Budget | $0/month |
| Primary use | Personal operating system for solopreneur app-building and AI-assisted work |

## Foundation Statement

UNGASIS OS v3.0 is an AI builder's personal operating system for solopreneurs. It uses 30+ markdown knowledge modules, a $0 budget, and AI-assisted workflows built with M365 Copilot Opus, ChatGPT Enterprise, and Cline.

## Core Requirements

| Requirement | Meaning | Status |
|---|---|---|
| Markdown-first | Keep project knowledge in simple `.md` files | ✅ Active |
| Beginner-friendly | Use simple English, tables, checklists, and analogies | ✅ Active |
| $0-first | Prefer free tiers and browser-based tools | ✅ Active |
| Context-safe | Avoid context loss across AI sessions | ✅ Active |
| Agent-ready | Support Cline, Claude Code, Copilot, Gemini, and other coding agents | ✅ Active |
| Lossless coverage | Preserve source prompt meaning across generated modules | 🟡 QA pending |
| Human approval gates | Never push, delete, expose secrets, or modify protected source files without approval | ✅ Active |

## Project Scope

| In Scope | Out of Scope |
|---|---|
| Memory Bank setup | Paid tool migration |
| Agent instructions | Local machine installs |
| QA audit support | Editing read-only `source-files/` |
| Repo organization | Exposing API keys or credentials |
| Context engineering docs | Enterprise overbuild before MVP need |
| Persistent project state | Unverified claims presented as fact |

## Source of Truth Order

1. Current task instructions from Mel
2. `.clinerules/` behavior rules
3. `memory-bank/` project knowledge
4. `MEMORY.md` cross-project learning log
5. `CONTEXT.md` current session snapshot
6. `AGENTS.md` / `CLAUDE.md` global agent instructions
7. `source-files/` read-only source prompts

## Success Criteria

| Check | Pass Condition |
|---|---|
| Memory Bank exists | 6 core files are present in `memory-bank/` |
| Cline rule exists | Memory Bank instruction file exists and tells Cline to read all Memory Bank files |
| Beginner fit | Files use short sections, tables, simple language |
| Repo safety | Rules protect secrets and read-only source files |
| Continuity | `activeContext.md` and `progress.md` explain what to do next |

## Known Assumptions

| Assumption | Confidence | Note |
|---|---|---|
| The repo will be used in GitHub Codespaces | High | Stated by owner |
| Cline is the main audit/build agent | High | Stated by owner |
| The source files are read-only | High | Existing repo rules say source files must not be edited |
| Model names and free tiers may change | Medium | ⚠️ Verify current availability before relying on them |

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
