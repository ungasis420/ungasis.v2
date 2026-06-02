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
| Agent | Icon | Primary Tooling | AI Model | Cost | Best For |
|---|---|---|---|---|---|
| Commander | 🎖️ | Filesystem + Command Executor | Inherit | Medium | High-level planning and delegation |
| Architect | 📐 | Filesystem only | Gemini Pro / Opus | High | Design spec and blueprint generation |
| Builder | 🏗️ | Filesystem + Git | Gemini Flash | Low | Writing code blocks and files |
| Surgeon | 🔪 | Filesystem only | Cerebras Llama 8b | Low | Quick bug fixing (under 2 files) |
| Auditor | 🔍 | Filesystem only | Inherit | Low | QA checklist verification |
| Watchdog | 📊 | Git + Graphify Indexer | Inherit | Low | Knowledge graph updates and logs |

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

## Device Constraints
| Device Type | Allowed Operations | Excluded Operations |
|---|---|---|
| Desktop PC | Full CLI Orchestration, local testing, Graphify | None |
| Laptop PC | Web editing, GitHub codespaces, remote build | Heavy Graphify indexing (run remotely) |
| Phone / Tablet | Simple Git status, doc edits, signal creation | Local builds, model fine-tuning |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
