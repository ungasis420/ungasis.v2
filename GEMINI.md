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
| Version | v5.0 JARVIS-Complete |
| Owner | Mel John Dimat |
| JARVIS Score | 98% |
| File Count | ~1,222+ across 240+ folders |
| Sprint Count | 66+ completed |
| Git Tag | v5.0-jarvis-complete |
| Graphify | 20,929 nodes, 24,207 edges, 2,713 communities |
| Engines | 9 core engines + 20 subsystems (see [BLUEPRINT_CONTEXT.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/architect/BLUEPRINT_CONTEXT.md)) |

---

## Agent Crew
| Agent | Icon | Tool | Model | Role |
|---|---|---|---|---|
| Commander | 🎖️ | M365 Copilot + Agent Manager | Claude Opus / Gemini 3.5 | Orchestrate, plan, delegate |
| Blueprint Architect | 📐 | Antigravity IDE / M365 Copilot | Gemini 3.5 High / Opus | Write blueprints (NEVER code) |
| Builder | 🏗️ | Antigravity IDE Right Panel / agy CLI | Gemini 3.5 Flash | Execute blueprints into files |
| Surgeon | 🔪 | Cline 2.0 (VS Code) | DeepSeek V4 Flash FREE | Surgical 1-2 file fixes |
| Quality Auditor | 🔍 | @quality-auditor subagent | Inherit | Review, PASS/FAIL verdict |
| Graphify Watchdog | 📊 | @graphify-watchdog subagent | Inherit | Re-index knowledge graph |

---

## Slash Commands
The system supports 9 slash commands:
- `/goal` — Autonomous mode
- `/schedule` — Scheduled task / timer
- `/grill-me` — Interactive interview
- `/blueprint` — Spec planning
- `/scout` — Tech discovery
- `/tag-sweep` — Stale tag scan
- `/audit` — Auditor review
- `/commander` — Commander workflow
- `/designer` — Designer UI workflow

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

## Agent Manager Integration
Antigravity Agent Manager provides visual multi-agent orchestration.
Use for: parallel agents, scheduled tasks, /goal autonomous mode.
Shares same brain as IDE Right Panel (Shared Agent Harness).
Customization budget: ~19,000 tokens for rules+skills+workflows+MCP.
Current usage: ~42% — room for new customizations.

---

## Auto-Routing Rules (Always Active)

When starting ANY task, the Builder agent checks these conditions
and acts accordingly. These rules run automatically — no need
for Mel to specify them in every prompt.

| # | Condition | Action | Why |
|---|-----------|--------|-----|
| 1 | Task creates 3+ new files | Call @blueprint-architect FIRST for spec | Blueprint-first rule — prevents hallucinated architecture |
| 2 | Task is a bug fix (1-2 files) | Use surgical precision, change only specified files | Minimize blast radius |
| 3 | After creating/modifying ANY .md file | Call @quality-auditor for review | Every dish gets tasted before serving |
| 4 | After @quality-auditor PASS on 5+ files | Call @graphify-watchdog for re-index | Keep knowledge graph current |
| 5 | After ANY sprint completion | Append to CONTEXT.md + git commit + push | Session state always saved |
| 6 | Task mentions "UI", "component", "dashboard", "screen" | Call @designer for Design DNA compliance | Consistent glassmorphism look |
| 7 | Task is unclear, ambiguous, or multi-sprint | Call @commander for decomposition | Commander decides routing |
| 8 | Task mentions "test" or "overnight" | Suggest Jules for async execution | Free, runs in background |

These rules are checked automatically by the Builder at task start.
If multiple rules match, apply ALL matching rules in order.

## Session Start Protocol
At the START of every /goal command, the Builder:
1. Reads the task description
2. Checks smart-router.md keyword table for task type
3. Logs classification to router-log.md
4. Follows the agent chain
This is AUTOMATIC — Mel does not need to specify.

## Projects Directory
All apps are built inside projects/. Each project is a self-contained
app that inherits UNGASIS context. Use /scaffold to create new projects.
Current: projects/riftcoach/ (RiftCoach), projects/newmont/ (Newmont)

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
