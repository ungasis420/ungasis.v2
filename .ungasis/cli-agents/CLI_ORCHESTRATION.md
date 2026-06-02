# CLI_ORCHESTRATION.md — CLI Orchestration Operations Manual

## Purpose
This manual outlines how the multiple CLI agents coordinate tasks to build UNGASIS OS. It establishes roles, routing rules, signal pipelines, and recovery protocols.

## How It Works
The system works like a restaurant kitchen. The Commander (head chef) takes the order (quest) and hands it to the Architect (menu designer) to create the recipe (blueprint). The Builder (line chef) follows the blueprint to prepare the food, the Auditor (sous chef) checks food quality, and the Watchdog (runner) logs it in the inventory.

```
+-----------+     blueprint-ready.signal     +-----------+
| Commander | -----------------------------> | Architect |
+-----------+                                +-----------+
      ^                                            |
      |                                            v
+-----------+      build-complete.signal     +-----------+
| Watchdog  | <----------------------------- |  Builder  |
+-----------+                                +-----------+
      ^                                            |
      |                                            v
      |            audit-pass.signal         +-----------+
      +--------------------------------------|  Auditor  |
                                             +-----------+
```

## Agent Roles
| Agent | Icon | Tool | Model | Role |
|---|---|---|---|---|
| Commander | 🎖️ | M365 Copilot + Agent Manager | Claude Opus / Gemini 3.5 | Orchestrate, plan, delegate |
| Blueprint Architect | 📐 | Antigravity IDE / M365 Copilot | Gemini 3.5 High / Opus | Write blueprints (NEVER code) |
| Builder | 🏗️ | Antigravity IDE Right Panel / agy CLI | Gemini 3.5 Flash | Execute blueprints into files |
| Surgeon | 🔪 | Cline 2.0 (VS Code) | DeepSeek V4 Flash FREE | Surgical 1-2 file fixes |
| Quality Auditor | 🔍 | @quality-auditor subagent | Inherit | Review, PASS/FAIL verdict |
| Graphify Watchdog | 📊 | @graphify-watchdog subagent | Inherit | Re-index knowledge graph |

## Routing Rules
| Input Pattern | Target Agent | Why |
|---|---|---|
| Quest requiring 3+ new files | Architect 📐 | Needs structural planning and blueprint |
| Task with approved blueprint | Builder 🏗️ | Executes task block using kickoff prompt |
| Single file syntax or lint error| Surgeon 🔪 | Fast and cheap code correction |
| Multi-file performance bug | Surgeon 🔪 | Target fix without full rebuild |
| Code written and needs verification| Auditor 🔍 | Verifies files against UNGASIS standards |
| Code committed to Git | Watchdog 📊 | Indexes workspace into Graphify graph |
| Overnight heavy building batch | Commander 🎖️ | Executes complex loops with state saves |
| CLI API Key expiration | Watchdog 📊 | Triggers key switch logs and notification |

## Operational Rules
1. **Never Bypass Audit**: No code changes may be merged to main branch without Auditor PASS.
2. **Signal-Driven execution**: Agents only wake up and perform work when their respective signal file is present.
3. **Budget First**: Select the lowest cost model that can fulfill the specific task.

## Inputs and Outputs
| Source Agent | Signal Output | Destination Agent | Action Taken |
|---|---|---|---|
| Commander | `blueprint-request.signal` | Architect | Generates design blueprint |
| Architect | `blueprint-ready.signal` | Builder | Implements file changes |
| Builder | `build-complete.signal` | Auditor | Audits code quality |
| Auditor | `audit-pass.signal` | Watchdog | Runs graph indexing and git commit |
| Auditor | `audit-fail.signal` | Surgeon | Repairs failed code paths |

## Error Handling
| Error Condition | Cause | Recovery Protocol |
|---|---|---|
| API Timeout | Network drop / model latency | Wait 30s, retry up to 3 times, then fall back |
| Triple Audit Fail | Surgeon unable to fix QA failure | Clear signal, halt build, notify Mel |
| Key Exhausted | Rate limits hit on primary API | Switch credentials to Fallback1/Fallback2 |
| Context Full | Active context > 4,000 tokens | Run context decay, evict oldest log files |
| Unclear Blueprint | Missing files or specs in plan | Return `audit-fail.signal` to Architect |

## Antigravity Agent Manager
The Agent Manager is a separate Antigravity window for visual orchestration.
How to open: Launch Antigravity → look for 'Agent Manager' option or open from taskbar.

Features:
| Feature | What It Does | When to Use |
|---|---|---|
| New Conversation | Spawn a new agent on the project | Parallel work |
| Conversation History | See all past agent sessions | Review previous work |
| Scheduled Tasks | Set recurring agent tasks | Daily pulse, weekly synthesis |
| /goal mode | Agent works autonomously until done | Hands-off sprint execution |
| Inbox | See messages from all active agents | Monitor parallel work |

Shares same rules, skills, workflows, and memory as IDE Right Panel.

## Antigravity CLI (agy)
Installed at: `C:\Users\63905\AppData\Local\agy\bin` (or npm global)
Version: 1.0.4 (confirmed installed)
Auth: already authenticated as emjaydimat@gmail.com
Model: Gemini 3.5 Flash (Medium) — same as IDE
Usage: `cd C:\Users\63905\Downloads\ungasis && agy`
Shares same brain as IDE + Agent Manager.

## Blueprint Model Priority
For blueprint writing (3+ files), use models in this order:
1. Gemini 3.5 Flash High (Antigravity) — 1M ctx, free
2. Claude Opus (M365 Copilot) — deep reasoning, free
3. DeepSeek V4 Flash (Cline FREE) — 1M ctx, free
4. GPT-4.1 (ChatGPT Enterprise) — alternative view, free
5. DeepSeek V4 Pro (Cline BYOK) — reasoning mode, ~$0.01
6. OpenRouter free models (Cline BYOK) — fallback

## Device Constraints
| Device | Tools Available |
|---|---|
| PC (Primary) | Antigravity IDE + Agent Manager + CLI (agy) + Cline 2.0 + VS Code Copilot + Ollama |
| Work Laptop | M365 Copilot + ChatGPT Enterprise + VS Code Web |
| Phone/Tablet | Termux (git) + GitHub Mobile + Acode |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
