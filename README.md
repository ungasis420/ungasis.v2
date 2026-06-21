UNGASIS OS — Personal AI Operating System (Validation Test)
Token validation run 2 active — using session-close-light workflow.
# 🏰 UNGASIS OS v5.2 — Personal AI Operating System

[![CI](https://github.com/ungasis420/ungasis.v2/actions/workflows/ungasis-ci.yml/badge.svg)](https://github.com/ungasis420/ungasis.v2/actions/workflows/ungasis-ci.yml)

> **AI Builder's Personal Operating System for Solopreneurs**
>
> Author: Mel John Dimat | Version: 5.2 | Date: June 2026
>
> Source of truth: [CLAUDE.md](./CLAUDE.md). This README is an overview.

---

## What Is This?

In short: UNGASIS turns scattered notes, scripts, and AI agent workflows into one self-tracking system you run from this repo.

UNGASIS OS is a complete ecosystem of **30+ markdown knowledge modules** that serve as your personal AI builder's operating system. It covers everything from idea capture → validation → build → deploy → monetization — using a **free-first tool stack** with 110+ tools and 30 API keys.

## Key Numbers

| Metric | Value |
|---|---|
| Tools | 110+ tools |
| API Keys | 30 (5 accounts × 6 providers) |
| Monthly Cost | **$19.99/mo** (Google AI Pro, 3-month trial: June-August 2026) + $0 company-provided tools (M365 Copilot, ChatGPT Enterprise) |
| Module Files | ~30 |
| Token Efficiency | 12 layers (~350K tokens/month saved) |
| AI Layers | 7 (app) + 7 (kernel) |
| Build Sprints | 14 + 6 future skills |

## Repository Structure

```
ungasis/
│
├── CLAUDE.md            # 🧭 Canonical source of truth (all agents)
├── GEMINI.md            # 🪐 Antigravity (agy) config — Gemini-specific
├── LLM_CONTEXT.md       # 🛂 Project passport (quick reference)
├── CONTEXT.md           # 📓 Rolling session log
├── README.md            # 📖 This file
│
├── .claude/             # 🤖 Claude Code config + rules/ (token-efficiency, multi-agent, graphify, model-routing)
├── .gemini/             # 🪐 Antigravity agents/ + rules/ (token-efficiency, build-protocol)
├── .github/             # 🐙 Copilot instructions, issue templates, CI
├── .ungasis/            # ⚙️ OS internals: config/, architect/, orchestrator/, dna/, context-engine/
│
├── projects/            # 🚀 Real apps — newmont/ (Vite+React+Tailwind+Zustand), riftcoach/ (Next.js)
├── dashboard/           # 📊 Dashboard app (same stack as Newmont)
├── scripts/             # 🐍 Python utilities (wiki-ingest, wiki-query, ungasis.py, graphify, ~25 scripts)
├── knowledge/           # 📚 Wiki (Karpathy method) + raw knowledge
│   └── wiki/            #    hot.md cache, decisions/, patterns/, gotchas/
├── modules/             # 📦 Generated knowledge modules
├── blueprints/          # 🏗️ Master architecture documents
├── docs/                # 📄 Changelog, runbook, QA plan, audits
├── specs/               # 📐 Project spec templates
├── source-files/        # 🔒 Original master prompts (READ ONLY)
└── archive/             # 🔒 Historical / sunset files (READ ONLY)
```

## Configuration Files

Orchestration configs live in `.ungasis/config/`. Detailed agent rules live in
`.claude/rules/` (Claude Code) and `.gemini/rules/` (Antigravity).

## Build & Verify

- `npm run build` — build the apps (Newmont, RiftCoach, Dashboard)
- `python scripts/ungasis.py pulse` — system health check
- Always verify the build passes before committing.

> The old Cline/Codespaces QA-audit workflow is retired. See `archive/QA-MISSION.md`
> for the historical brief.

## Token Efficiency Summary

This repo implements the UNGASIS 12-Layer Token Efficiency System:

| Layer | Category | Rule | Saves |
|---|---|---|---|
| 1 | 🛡️ PREVENT | Pre-fill templates | ~50% |
| 2 | 🛡️ PREVENT | Knowledge file offloading | ~80% |
| 3 | 🛡️ PREVENT | Example-driven prompts | ~40% |
| 4 | ⚡ OPTIMIZE | Route by complexity | ~40% |
| 5 | ⚡ OPTIMIZE | Batch questions | ~60% |
| 6 | ⚡ OPTIMIZE | Context pruning | ~70% |
| 7 | 🎯 CONTROL | Structured output | ~20% |
| 8 | 🎯 CONTROL | Response length caps | ~30% |
| 9 | 🎯 CONTROL | Incremental disclosure | ~50% |
| 10 | 🔄 MAINTAIN | Cache responses | ~10% |
| 11 | 🔄 MAINTAIN | Session checkpointing | ~60% |
| 12 | 🔄 MAINTAIN | Compact at 70% | ~30% |

**Combined savings: ~70% reduction → from 500K to 150K tokens/month**

## Built With
- M365 Copilot Opus (planning, architecture, QA)
- M365 Copilot ChatGPT (structured generation)
- ChatGPT Enterprise (content generation)
- GitHub Codespaces + Cline (execution, audit)
- DeepSeek V4 Flash (free model for audit)

## License
Personal use. Not open source. © 2026 Mel John Dimat.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
