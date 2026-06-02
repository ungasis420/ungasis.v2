# 🏰 UNGASIS OS v3.0 — Unified Lossless Repository

> **AI Builder's Personal Operating System for Solopreneurs**
>
> Author: Mel John Dimat | Version: 3.0 | Date: June 2026 | Cost: $0/month

---

## What Is This?

UNGASIS OS is a complete ecosystem of **30+ markdown knowledge modules** that serve as your personal AI builder's operating system. It covers everything from idea capture → validation → build → deploy → monetization — using a **$0 free-first tool stack** with 88 browser-based tools and 30 API keys.

## Key Numbers

| Metric | Value |
|---|---|
| Tools | 88 (all browser-based) |
| API Keys | 30 (5 accounts × 6 providers) |
| Monthly Cost | **$0.00** |
| Module Files | ~30 |
| Token Efficiency | 12 layers (~350K tokens/month saved) |
| AI Layers | 7 (app) + 7 (kernel) |
| Build Sprints | 14 + 6 future skills |

## Updated File Counts After Context Upgrade

| Area | Updated Count | Notes |
|---|---:|---|
| New context/memory files added | 13 | T1–T7 additions: Memory Bank, Claude compatibility, learning log, session state, reflection, hygiene, and context module |
| Root memory/context files | 3 | `CLAUDE.md`, `MEMORY.md`, `CONTEXT.md` |
| Root cross-tool instruction files | 2 | `AGENTS.md` + `CLAUDE.md` |
| `.clinerules/` files | 6 | `00-identity.md` through `05-hygiene.md` |
| Memory Bank files | 7 | 6 core files + `memory-bank/.clinerules/memory-bank.md` |
| Module files listed in this README | 25 | Original listed modules + `ungasis-context-engineering.md`; ⚠️ verify final repo count after all recovery files are restored |
| Target module ecosystem | 30+ | Matches original UNGASIS OS target |

## Repository Structure

```
ungasis-unified-lossless-repo-v3/
│
├── .clinerules/                    # 🤖 Agent behavior rules — HOW agents work
│   ├── 00-identity.md              #    Who the agent is
│   ├── 01-token-efficiency.md      #    12-layer token saving protocol
│   ├── 02-output-rules.md          #    Structured output enforcement
│   ├── 03-self-iteration.md        #    Autonomous loop (don't stop)
│   ├── 04-reflection.md            #    Self-critique loop after each task
│   └── 05-hygiene.md               #    Staleness detection + rule freshness
│
├── memory-bank/                    # 🧠 Project memory — WHAT we are building
│   ├── projectbrief.md             #    Foundation and project scope
│   ├── productContext.md           #    Why the project exists
│   ├── activeContext.md            #    Current focus and next steps
│   ├── systemPatterns.md           #    Architecture and patterns
│   ├── techContext.md              #    Tools, setup, constraints
│   ├── progress.md                 #    Status, milestones, known issues
│   └── .clinerules/
│       └── memory-bank.md          #    Cline instructions for reading/updating memory
│
├── .clineignore                    # 🚫 Files excluded from AI indexing
├── AGENTS.md                       # 🤝 Cross-tool agent instructions
├── CLAUDE.md                       # 🧭 Claude Code compatibility instructions
├── MEMORY.md                       # 🧠 Cross-session learning log
├── CONTEXT.md                      # 📍 Current session state snapshot
├── README.md                       # 📖 This file
├── QA-MISSION.md                   # 🎯 Current audit mission brief
├── QA-AUDIT-REPORT.md              # 📊 Generated audit results
│
├── source-files/                   # 📁 Original master prompts (READ-ONLY)
│   ├── AI_Builders_Master_Workflow_Prompt_v4.0.md
│   └── unified_beginner_solopreneur_app_building_workflow_playbook_v3.md
│
├── blueprints/                     # 🏗️ Master architecture documents
│   ├── UNGASIS-OS-v3.0-MASTER-BLUEPRINT_m365-opus.md
│   ├── UNGASIS-OS-v3.0-MASTER-BLUEPRINT_m365-chatgpt.md
│   └── UNGASIS-OS-v3.0-MASTER-BLUEPRINT_chatgpt-ent.md
│
├── multi-agent/                    # 🤖 Multi-agent orchestration
│   └── multi-agent-orchestration-master-guide-v4.md
│
└── modules/                        # 📚 Generated knowledge modules
    ├── ungasis-ai-operating-model.md
    ├── ungasis-chatgpt-feature-router.md
    ├── ungasis-m365-feature-router.md
    ├── ungasis-instruction-hierarchy.md
    ├── ungasis-decision-matrix.md
    ├── ungasis-stack-lanes.md
    ├── ungasis-tool-stack-strategy.md
    ├── ungasis-output-control-rules.md
    ├── ungasis-html-manual-spec.md
    ├── ungasis-source-ledger.md
    ├── ungasis-30day-roadmap.md
    ├── ungasis-hallucination-guide.md
    ├── ungasis-recovery-mode.md
    ├── ungasis-portfolio-strategy.md
    ├── ungasis-monetization-strategy.md
    ├── ungasis-backup-strategy.md
    ├── ungasis-gold-skeleton.md
    ├── ungasis-me-as-mvp-workflow.md
    ├── ungasis-prompt-engineering.md
    ├── ungasis-glossary.md
    ├── ungasis-prompt-library.md
    ├── ungasis-sop-library.md
    ├── ungasis-version-control.md
    ├── ungasis-cost-monitoring.md
    └── ungasis-context-engineering.md
```

## Memory & Context System

UNGASIS now uses a **3-layer memory system**. Think of it like a small workshop:

| Layer | Folder/File | Simple Meaning | Job |
|---|---|---|---|
| Layer 1 | `.clinerules/` | The agent's work habits | Teaches Cline **HOW to work**: save tokens, write files, reflect, and avoid stale rules |
| Layer 2 | `memory-bank/` | The project notebook | Stores **WHAT we are building**: scope, product context, active focus, architecture, stack, progress |
| Layer 3 | `MEMORY.md` + `CONTEXT.md` | Learning + current map | Stores **WHERE we are now** and reusable lessons across sessions |

### Quick Start for a New Agent Session

| Step | What to Open | Why |
|---:|---|---|
| 1 | `CONTEXT.md` | See the current phase, blockers, files being worked on, and next actions |
| 2 | `memory-bank/activeContext.md` | Understand current focus and recent decisions |
| 3 | `memory-bank/progress.md` | Check status, milestones, known bugs, and pending work |
| 4 | `.clinerules/` | Follow the repo behavior rules |
| 5 | `AGENTS.md` or `CLAUDE.md` | Use the right agent instruction file for the tool being used |
| 6 | `MEMORY.md` | Reuse patterns that worked before and avoid repeated mistakes |

### Memory File Roles

| File | Use When | Update Habit |
|---|---|---|
| `.clinerules/00-identity.md` | Agent needs role and mission | Rarely |
| `.clinerules/01-token-efficiency.md` | Agent must save mana/tokens | Review when tool/model setup changes |
| `.clinerules/02-output-rules.md` | Agent must follow output format | Review when reports/templates change |
| `.clinerules/03-self-iteration.md` | Agent must continue autonomously | Review when mission flow changes |
| `.clinerules/04-reflection.md` | Agent must check its own output | Use after every task |
| `.clinerules/05-hygiene.md` | Agent detects stale rules | Review every 90 days |
| `memory-bank/projectbrief.md` | Project scope is unclear | Update only when scope changes |
| `memory-bank/productContext.md` | Why/for whom is unclear | Update when user or pain changes |
| `memory-bank/activeContext.md` | Starting or resuming work | Update after major sessions |
| `memory-bank/systemPatterns.md` | Architecture changes | Update when folders/patterns change |
| `memory-bank/techContext.md` | Tools/models/setup change | Update when stack changes |
| `memory-bank/progress.md` | Status needs tracking | Update after milestones |
| `MEMORY.md` | Reusable lesson appears | Update after strong success/failure |
| `CONTEXT.md` | Session state changes | Update before ending a session |
| `CLAUDE.md` | Claude Code needs repo guidance | Update when Claude-specific rules change |

## Context Engineering Notes

| Idea | Simple Meaning | Where It Lives |
|---|---|---|
| Prompt engineering | Writing a good instruction | `modules/ungasis-prompt-engineering.md` |
| Context engineering | Giving the agent the right kitchen: rules, files, memory, tools, and state | `modules/ungasis-context-engineering.md` |
| Token efficiency | Spend less mana by reading only what matters | `.clinerules/01-token-efficiency.md` |
| Persistent memory | Write important state to files, not only chat | `memory-bank/`, `MEMORY.md`, `CONTEXT.md` |
| Rule hygiene | Remove stale/conflicting instructions | `.clinerules/05-hygiene.md` |

⚠️ Tool names, model names, free tiers, commands, and package installation steps can change. Verify current official docs before depending on them.

## How to Run the QA Audit

### Prerequisites
- GitHub account (free)
- OpenRouter account with DeepSeek V4 Flash free model

### Steps
1. **Push this repo** to a private GitHub repository
2. **Open Codespace:** Code → Codespaces → Create codespace (2-core, free)
3. **Install Cline:** Extensions → search "Cline" → Install
4. **Configure Cline:** Settings → API Provider = OpenRouter → Model = `deepseek/deepseek-v4-flash:free`
5. **Run the audit:** Open Cline chat → paste: `Read QA-MISSION.md and execute all 6 tasks. Write results to QA-AUDIT-REPORT.md. Do not stop until all tasks are complete and "🏰 MISSION COMPLETE" is written.`
6. **Results:** Check `QA-AUDIT-REPORT.md` when done

### If DeepSeek is slow/rate-limited
Switch Cline to: `google/gemini-3-flash` (backup model)

⚠️ Verify current model names, availability, pricing, rate limits, and data handling before use.

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

⚠️ Verify tool availability, model names, free-tier status, and workspace data rules before using this stack.

## License
Personal use. Not open source. © 2026 Mel John Dimat.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
