# UNGASIS OS v4.0 — Master Blueprint (Updated June 2, 2026)
# Complete Handoff Document for Fresh Chat Continuation

---

## 1. EXECUTIVE SUMMARY

| Field | Value |
|-------|-------|
| **Project** | UNGASIS OS v4.0 — Unified Generative AI System for Independent Solopreneurs |
| **Type** | Markdown-first knowledge repo + AI agent operating system |
| **Owner** | Mel John Dimat, Filipino, Manila, ESL speaker, visual learner |
| **Job** | Consultant, Reporting @ Korn Ferry |
| **GitHub** | https://github.com/ungasis420/ungasis.v2 |
| **Location** | C:\Users\63905\Downloads\ungasis |
| **Budget** | $19.99/mo Google AI Pro + $0 company tools (M365 Copilot, ChatGPT Enterprise) |
| **Form 1 (Knowledge Repo)** | ✅ 100% COMPLETE — 9 sprints, ~977+ files, 209 folders |
| **Form 2 (Web App)** | 🟡 Scaffolded (dashboard/ exists, not wired) |
| **Graphify** | ✅ 16,538 nodes indexed, 2,035 labeled communities |
| **Token System** | ✅ 20-layer, ~90-95% savings |
| **Date** | June 2, 2026 |

### Two Forms of UNGASIS
- **Form 1 (DONE)**: Markdown files, configs, rules, templates, modules — the "operating system" that AI agents read
- **Form 2 (SCAFFOLDED)**: Next.js 15 web application scaffolded, mock data present, not fully wired (dashboard/ exists) — the "app" users interact with


---

## 2. CURRENT STATE — What Was Accomplished

### All 9 Sprints Completed (June 2, 2026 — Single Day)

| Sprint | What | Files | Status |
|--------|------|:-----:|:------:|
| Setup | Antigravity IDE integration — 16 config files | 16 | ✅ |
| F1 | 12 documentation bugs fixed | 12 | ✅ |
| F2 | 6 gaps filled — new modules created | 6 | ✅ |
| F3 | QA + v4.0 version freeze | 3 | ✅ |
| F4a | 17 orchestration config files (YMLs) | 17 | ✅ |
| F4b | 12 production readiness modules | 12 | ✅ |
| F5 | LLM_CONTEXT.md + 34 templates extracted from archive | 34 | ✅ |
| F6 | .ungasis/ folder (12 files), CONVENTIONS.md, Graphify skill | 15 | ✅ |
| F7 | Token efficiency 12→20 layers, MODEL_ROUTING.md, MCP profiles | 10+ | ✅ |

### Key Metrics
- **Total files**: ~977+ across 209 folders
- **Graphify**: 16,538 nodes, 17,809 edges, 2,035 communities
- **Graphify cost**: ~$0.70 total across all extraction runs
- **Antigravity-Mem**: Installed (SQLite at C:\Users\63905\.antigravity-mem\memory.db)
- **Token efficiency**: 20 layers, ~90-95% estimated savings (up from ~70% at 12 layers)
- **Git**: All pushed to GitHub with tag v4.0


---

## 3. ARCHITECTURE — Folder Structure

```
C:\Users\63905\Downloads\ungasis\
├── .agents/                    ← Antigravity rules (00-09), skills, workflows
│   ├── rules/                  ← 00-project-context through 09-skill-generator
│   ├── skills/                 ← code-review, debug-one-bug, research-to-code, graphify/
│   └── workflows/              ← graphify-after-change, build-feature, etc.
├── .clinerules/                ← Cline agent rules (synced with .agents/rules/)
├── .devcontainer/              ← GitHub Codespace auto-setup (devcontainer.json)
├── .github/
│   ├── copilot-instructions.md
│   ├── ISSUE_TEMPLATE/         ← 5 templates: bug, coding, multi-agent, sequential, readiness
│   ├── workflows/              ← ci.yml, security.yml, ungasis-readiness-ci.yml
│   └── instructions/           ← frontend.instructions.md, tests.instructions.md
├── .mcp/profiles/              ← Task-specific MCP configs
│   ├── build.json              ← filesystem + github only
│   ├── research.json           ← fetch + sequential-thinking only
│   └── full.json               ← all 5 MCP servers
├── .ungasis/                   ← Token prevention system
│   ├── BUILDER_PROFILE.md      ← Mel's identity (never auto-modified)
│   ├── QUEST_CONTEXT.md        ← Template with [FILL] placeholders
│   ├── SESSION_STARTER.md      ← One-paste context for any AI tool
│   ├── MEMORY_BANK.md          ← Decisions, patterns, gotchas log
│   └── tool-configs/           ← 8 configs: m365, chatgpt, claude, copilot, antigravity, cline
├── archive/                    ← READ ONLY — original ZIP-extracted archives
├── blueprints/                 ← 3 master blueprints
│   ├── opus_bp.txt             ← PRIMARY blueprint (92K chars, from M365 Copilot)
│   ├── chatgpt_bp.txt          ← ChatGPT Enterprise version
│   └── m365-chatgpt_bp.txt     ← Combined M365+ChatGPT version
├── config/                     ← 9 orchestration YMLs
│   ├── agent-orchestration.yml, circuit-breaker.yml, graceful-degradation.yml
│   ├── llm-budget.yml, permission-profiles.yml, rate-limit-budget.yml
│   ├── scoring-rubric.yml, session-config.yml, token-budget.yml
├── context/                    ← Session state files
├── docs/                       ← Changelog, file inventory, runbook, QA plan, semantic-cache-plan
├── graphify-out/               ← Knowledge graph outputs
│   ├── graph.json              ← Full graph (16,538 nodes)
│   ├── graph.html              ← Interactive browser visualization
│   └── GRAPH_REPORT.md         ← Community report with labels
├── kernels/                    ← 7 kernel files (00-06) for ChatGPT Projects
├── knowledge/                  ← Wiki, patterns, raw knowledge
├── memory-bank/                ← Cline memory persistence
├── modules/                    ← 30+ knowledge modules
│   ├── ungasis-token-policy.md ← 20-layer token system v2.0
│   ├── ungasis-antigravity.md, ungasis-cline.md, ungasis-context.md, etc.
│   └── production-readiness/   ← 7 production modules
├── multi-agents/               ← Orchestration master guide v4
├── scripts/                    ← graphify-smart.ps1, utilities
├── source-files/               ← READ ONLY — original source documents
├── specs/                      ← Project spec templates
├── templates/                  ← 8 prompt templates + 12 operational templates in orchestration/
│
├── AGENTS.md                   ← Master agent instructions (Codex/Cline/OpenCode)
├── CLAUDE.md                   ← Claude Code instructions + Context Decay Protocol
├── CONVENTIONS.md              ← Coding conventions (naming, TypeScript, Tailwind, imports)
├── CONTEXT.md                  ← Session handoff state (updated every sprint)
├── GEMINI.md                   ← Gemini CLI / Antigravity instructions
├── LLM_CONTEXT.md              ← Project passport (<200 lines)
├── llms.txt                    ← Open standard AI discovery file
├── MODEL_ROUTING.md            ← Model selection + reasoning budget table
└── README.md                   ← Project overview
```


---

## 4. TECH & TOOL STACK

### Hardware — 4 Devices
| Device | Specs | Use For |
|--------|-------|---------|
| **PC (Primary)** | i5-10400, 32GB DDR4, RTX 5060 Ti 16GB, Gigabyte B460M | Everything — unlimited |
| **Work Laptop** | Company-issued, browser-only | M365 Copilot, ChatGPT Enterprise, browser IDEs |
| **Phone (Android)** | Personal phone | Termux, GitHub Mobile, Acode, Spck — quick edits |
| **Tablet** | Android tablet | Reading docs, reviewing PRs |

### AI Tools
| Tool | Model | Cost | Role |
|------|-------|:----:|------|
| **Antigravity IDE/CLI** | Gemini 3.5 Flash (1M ctx) | $19.99/mo (AI Pro) | Primary builder |
| **Cline (VS Code)** | Claude / BYOK | Free (API keys) | Precise edits |
| **Jules** | GitHub AI | Free (100 tasks/day) | Overnight PRs |
| **M365 Copilot Premium** | Claude model | $0 (company) | Planning, analysis |
| **ChatGPT Enterprise** | GPT-4.1 | $0 (company) | Research |
| **VS Code Copilot** | GPT-4.1 | Free (GitHub) | Autocomplete |
| **Ollama (Local)** | devstral, qwen2.5-coder:14b, qwen3:14b | $0 | Autocomplete only |

### 30 API Keys — 6 Providers
| Wave | Provider | Keys | Free Limits | Best For |
|:----:|----------|:----:|-------------|----------|
| 0 | Cerebras | 5 | 2,700 tok/s | Fastest inference |
| 1 | Groq | 5 | 800 tok/s | Fast + reliable |
| 2 | Google AI Studio | 5 | 1,500 req/day (across keys) | Best Graphify quality |
| 3 | OpenRouter | 1 | 30+ free models | Variety/fallback |
| 4 | Mistral | 4 | 1B tok/month | Deep bench |
| 5 | Together | 5 | 68 free models | Variety |

### Key Locations
- **Master keys**: `C:\Users\63905\.env.master` (ALL 30 keys — never in git)
- **Project keys**: `C:\Users\63905\Downloads\ungasis\.env` (only needed keys)
- **Antigravity-Mem DB**: `C:\Users\63905\.antigravity-mem\memory.db`
- **MCP Config**: `C:\Users\63905\.gemini\antigravity\mcp_config.json`

### Target Stack (For Form 2 / Future Apps)
Next.js 15, React 19, TypeScript 5.8, Tailwind CSS 4, Shadcn/UI, Framer Motion 12, Recharts, Zustand 5, Dexie.js (IndexedDB), Cloudflare Pages


---

## 5. 20-LAYER TOKEN EFFICIENCY SYSTEM (v2.0)

### PREVENT (Layers 1-3): Stop waste before it starts
| # | Layer | Savings |
|:-:|-------|:-------:|
| 1 | Pre-fill templates — use SESSION_STARTER.md, QUEST_CONTEXT.md | 50% |
| 2 | Knowledge file offloading — modules/ hold reference, not inline | 80% |
| 3 | Example-driven prompts — show 1 example instead of explaining | 40% |

### OPTIMIZE (Layers 4-6): Use tokens efficiently
| # | Layer | Savings |
|:-:|-------|:-------:|
| 4 | Route by complexity + reasoning budget (MODEL_ROUTING.md) | 55% |
| 5 | Batch questions — ask 5 at once, not 5 separate chats | 60% |
| 6 | Context pruning via `graphify query` (reads map, not files) | 98% |

### CONTROL (Layers 7-9): Limit output waste
| # | Layer | Savings |
|:-:|-------|:-------:|
| 7 | Structured output — tables, JSON, not prose | 20% |
| 8 | Response length caps — "answer in 3 sentences" | 30% |
| 9 | Incremental disclosure — give overview first, details on request | 50% |

### MAINTAIN (Layers 10-12): Keep sessions lean
| # | Layer | Savings |
|:-:|-------|:-------:|
| 10 | Semantic cache — similar questions return cached answers | 50% |
| 11 | Session checkpointing — save state, start fresh | 60% |
| 12 | Compact at 70% — when context fills, summarize and continue | 30% |

### ADVANCED (Layers 13-17): Deep optimization
| # | Layer | Savings |
|:-:|-------|:-------:|
| 13 | Retrieval-based memory — search MEMORY_BANK, inject only relevant entries | 75% |
| 14 | Tool schema pruning — load only needed MCP tools per task type | 70% |
| 15 | TOON compact encoding — pipe-delimited data instead of JSON | 60% |
| 16 | Context decay / stale eviction — summarize tool results, discard raw output | 70% |
| 17 | Prompt prefix caching — keep system prompts stable for provider cache | 90% |

**Overall: ~90-95% token savings | Theoretical max: ~97-98%**


---

## 6. NINE ENGINES ROADMAP (What's Next)

### Engine Overview
| # | Engine | Purpose | Status | Sprint |
|:-:|--------|---------|:------:|:------:|
| 1 | Context Engineering | Auto-compose perfect context per task type | ✅ DONE | F9a |
| 2 | Self-Evolution Loop | Track metrics, auto-adapt rules, learn | ✅ DONE | F10a |
| 3 | Project DNA | Scaffold new projects in 60 seconds from genomes | ✅ DONE | F8a |
| 4 | Knowledge Compounding | Patterns, gotchas, decisions compound across projects | ✅ DONE | F8c |
| 5 | Decision Intelligence | Check precedent before researching, never re-research | ✅ DONE | F9b |
| 6 | SOP Library | Standard procedures for every workflow | ✅ DONE | F8b |
| 7 | Self-Learning Skills | Observe patterns, propose & auto-generate skills | ✅ DONE | F10b |
| 8 | Agentic Framework | 7 disciplines, capability matrix, agentic loop | ✅ DONE | F9c |
| 9 | Revenue Pipeline | Idea → validate → build → launch → first ₱ in 27 hrs | ✅ DONE | F8d |

### Sprint Schedule
```
TOMORROW (Session 2 — ~80 min total):
├── Sprint F8a: Project DNA (20 min)
├── Sprint F8b: SOP Library (25 min)
├── Sprint F8c: Knowledge Compounding (20 min)
└── Sprint F8d: Revenue Pipeline (15 min)

NEXT WEEK (While building RiftCoach — ~60 min):
├── Sprint F9a: Context Engine (20 min)
├── Sprint F9b: Decision Intelligence (15 min)
└── Sprint F9c: Agentic Framework (25 min)

MONTH 2 (After RiftCoach ships — ~60 min):
├── Sprint F10a: Self-Evolution Loop (30 min)
└── Sprint F10b: Self-Learning Skills (30 min)

AFTER ALL ENGINES → START RIFTCOACH
```

### Engine 3: Project DNA (Detail)
```
.ungasis/dna/
├── base-genome.md          ← What EVERY project gets (rules, configs, templates)
├── nextjs-genome.md        ← Extra DNA for Next.js projects
├── html-genome.md          ← Extra DNA for static HTML projects
├── powerbi-genome.md       ← Extra DNA for Power BI projects
└── scaffold-rules.md       ← How to combine genomes
```

### Engine 6: SOP Library (Detail)
```
knowledge/sops/
├── project-lifecycle/      ← idea-to-quest, quest-to-mvp, mvp-to-deploy, deploy-to-revenue
├── daily-workflows/        ← start-session, device-handoff, end-of-day, weekly-review
├── agent-workflows/        ← antigravity-build, cline-debug, jules-overnight, multi-agent-sprint
└── emergency/              ← api-key-expired, context-overflow, git-conflict, deploy-rollback
```

### Engine 7: Self-Learning Skills (Detail)
```
Observation → Pattern detected (3+ times) → Proposal → Mel approves → Skill generated
                                                                    → Mel rejects → Logged
Skills stored in: .agents/skills/_auto/
Proposals in: .agents/skills/_auto/_proposals/
Safety: NEVER auto-activate without human approval
Max proposals: 5 per week
```


---

## 7. DEVELOPMENT WORKFLOW

### Preferred Tool Chain
```
M365 Copilot ──→ Planning, architecture, blueprints, analysis
     ↓
VS Code Copilot GPT-4.1 ──→ Autocomplete and quick fixes
     ↓
VS Code + Cline ──→ Precise multi-insertion edits, autonomous changes
     ↓
Antigravity IDE ──→ Heavy building (1M context, skills, workflows)
     ↓
Jules ──→ Overnight PRs (submit before bed)
```

### Session Workflow (Every Session)
1. **Read**: LLM_CONTEXT.md → AGENTS.md → CONTEXT.md (last session handoff)
2. **Load**: Relevant context profile (.mcp/profiles/build|research|full.json)
3. **Work**: Execute tasks using appropriate agent
4. **Log**: Update CONTEXT.md with session handoff
5. **Push**: `git add . && git commit -m "type: what — why" && git push`

### Device Handoff
- PC → Phone: `git push` on PC, `git pull` on Termux
- Phone → PC: Same — git is the bridge
- Any device: Read CONTEXT.md for last session state

### Multi-Agent Orchestration (Current: Manual)
```
YOU (Orchestrator)
├── Assign BUILD to Antigravity or Cline
├── Assign TEST to Jules (overnight)
├── Assign REVIEW to M365 Copilot
├── Assign RESEARCH to ChatGPT Enterprise
└── Copy handoff context between agents manually
```


---

## 8. AGENT PERSONAS & INSTRUCTIONS

### 🏗️ M365 Copilot (Opus) — "The Architect"
- **Role**: Strategic planning, blueprints, analysis, research
- **Model**: Claude (via Microsoft)
- **Cost**: $0 (company-provided)
- **Strengths**: Unlimited usage, deep reasoning, file access via OneDrive/SharePoint
- **Use for**: Architecture decisions, blueprint generation, code review analysis, project planning, handoff documents
- **Persona**: Senior polymath engineer who explains simply with analogies and tables
- **Key instruction**: "Simple English, analogies, tables, Feynman method. Batch edits. Staleness footers on all files."

### ⚡ Antigravity (Gemini) — "The Builder"
- **Role**: Primary development agent, heavy building
- **Model**: Gemini 3.5 Flash (1M context)
- **Cost**: $19.99/mo (Google AI Pro)
- **Strengths**: 1M token context, file editing, terminal access, skills, workflows, persistent memory
- **Use for**: Feature implementation, multi-file edits, running terminal commands, Graphify operations
- **Auto-reads**: `.agents/rules/`, `.agents/skills/`, `.agents/workflows/`, GEMINI.md
- **Key skills**: `/graphify query`, `/graphify .`, code-review, debug-one-bug
- **Key instruction**: "Read GEMINI.md first. Follow .agents/rules/. Update CONTEXT.md after every task."

### 🔪 Cline (Claude/BYOK) — "The Surgeon"
- **Role**: Precise file edits, focused builds
- **Model**: Claude (via API key) or any BYOK model
- **Cost**: $0 (BYOK from 30 free keys)
- **Strengths**: Multi-insertion edits, autonomous mode, follows .clinerules/
- **Use for**: Targeted bug fixes, component builds, surgical code changes
- **Auto-reads**: CLAUDE.md, `.clinerules/`
- **Key instruction**: "Read CLAUDE.md first. Follow .clinerules/ and CONVENTIONS.md. Never rewrite entire files."

### 🌙 Jules — "The Night Shift"
- **Role**: Overnight PR generation
- **Model**: GitHub AI
- **Cost**: $0 (100 tasks/day free)
- **Strengths**: Autonomous, works while you sleep, creates PRs
- **Use for**: Test writing, documentation updates, routine refactors
- **Limitation**: No interactive debugging, no real-time feedback
- **Key instruction**: "Submit tasks before bed. Review PRs in the morning."

### ✨ VS Code Copilot — "The Seasoning"
- **Role**: Inline autocomplete, quick fixes
- **Model**: GPT-4.1
- **Cost**: $0 (GitHub free tier)
- **Use for**: Line-by-line coding, tab completion, small fixes, inline suggestions

### 🔬 ChatGPT Enterprise — "The Researcher"
- **Role**: Research, alternative perspectives, knowledge synthesis
- **Model**: GPT-4.1
- **Cost**: $0 (company-provided)
- **Strengths**: Web browsing, file upload, custom GPTs, DALL-E
- **Use for**: Market research, tech comparisons, documentation drafts, alternative architectures


---

## 9. BUILDER PROFILE (Token Prevention Context)

### Identity
- **Name**: Mel John Dimat
- **Location**: Manila, Philippines
- **Language**: English (ESL — Filipino primary)
- **Learning style**: Visual + kinesthetic, learns by doing, not tech savvy
- **Job**: Consultant, Reporting @ Korn Ferry
- **Manager**: Kurt Leander Helmuth | **Skip**: Montse Pakan

### Communication Preferences
- Simple English, no jargon
- Analogies (kitchen/cooking preferred)
- Tables over paragraphs
- Feynman method (explain like I'm 5)
- Step-by-step with numbered lists
- Visual aids (diagrams, charts, ASCII art)

### Design DNA
- **Theme**: Glassmorphism — `bg-white/[0.04] backdrop-blur-xl border-white/10`
- **Charts**: Inline hex colors, NOT Tailwind classes
- **Font**: System default, all text ≥12px
- **Motion**: Framer Motion 12, subtle transitions
- **Sky scroll**: Animated gradient [30, 50, 90] starting values

### Technical Preferences
- TypeScript strict mode, no `any`
- Max 200 lines per component
- kebab-case files, PascalCase components
- Import order: react → next → third-party → local → types → styles
- Commit format: `type: what — why`
- Staleness footer on ALL files: `Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel`

### Side Projects
- **Wild Rift**: Support main (Karma, Swain, Nautilus, Senna, Seraphine, Soraka, Milio)
- **RiftCoach**: Wild Rift coaching app — Phase 5.5-A complete, Phase 5.7+ next
- **Unckiel's Tour Guide**: v10.2 complete, single-file HTML
- **Contemporario Arts**: v9.0 Atelier Edition, Vite + Tailwind
- **Uriel**: User's son (autistic), inspiration for Contemporario Arts


---

## 10. KICKOFF PROMPTS

### KICKOFF A: Continue UNGASIS Engines (Sprint F8a-d)

Paste this into M365 Copilot or Antigravity to continue building:

```
I'm continuing development of UNGASIS OS v4.0 — my AI-native solopreneur operating system.

PROJECT STATE:
- GitHub: https://github.com/ungasis420/ungasis.v2
- Location: C:\Users\63905\Downloads\ungasis
- Form 1 (Knowledge Repo): 100% COMPLETE — 9 sprints done (Setup, F1-F7)
- 977+ files, 209 folders, 16,538 Graphify nodes, 20-layer token system
- All pushed to GitHub

WHAT'S NEXT — Sprint F8a-d (9 Engines):
1. F8a: Project DNA — Create .ungasis/dna/ folder with base-genome.md, nextjs-genome.md, html-genome.md, scaffold-rules.md
2. F8b: SOP Library — Create knowledge/sops/ with project-lifecycle/, daily-workflows/, agent-workflows/, emergency/ SOPs
3. F8c: Knowledge Compounding — Create knowledge/wiki/patterns/, gotchas/, decisions/, metrics/ with entries from past projects
4. F8d: Revenue Pipeline — Create knowledge/sops/project-lifecycle/deploy-to-revenue.md, .ungasis/dna/revenue-models/ templates

KEY RULES:
- Read GEMINI.md and AGENTS.md first
- Simple English, analogies, tables, staleness footers
- Don't modify archive/ or source-files/
- Append to existing files, never replace
- Git commit and push after each sprint

BUILDER: Mel John Dimat, Filipino, Manila, ESL speaker, visual learner
DESIGN: Glassmorphism, Tailwind 4, inline hex colors
STACK: Next.js 15, React 19, TypeScript 5.8

Start with Sprint F8a: Project DNA. Show me the implementation plan first.
```

---

### KICKOFF B: Start RiftCoach Development

Paste this into a new chat to begin RiftCoach:

```
I'm starting RiftCoach — a Wild Rift AI coaching app built on my UNGASIS OS v4.0 foundation.

UNGASIS FOUNDATION:
- GitHub: https://github.com/ungasis420/ungasis.v2
- 20-layer token efficiency system, 16,538-node knowledge graph
- Agent rules, orchestration configs, templates all ready
- Stack: Next.js 15, React 19, TypeScript 5.8, Tailwind 4, Shadcn/UI

RIFTCOACH STATE:
- Phase 5.5-A complete (6 providers: Cerebras, Groq, Google AI, OpenRouter, Mistral, Together)
- 114 model attempts tested
- Build Engine pipeline: preBuildResponse() pre-fills with DB data, AI fills [AI:...] rationale
- runes.json: 53 runes with {id, name, type, path, slot, description, tier, image}
- wr_builds.json: keyed by champion_id (snake_case)
- Known issues: stats formatting (raw array indices), AI rationale hallucinations

NEXT: Phase 5.7 (Deep WHY Layer) then Phase 6+
- Fix validator for missing rune/spell rationale
- Stronger prompting and data grounding to prevent hallucinations
- Champion Build Lab with real-time stat calculator
- JARVIS-like proactive AI coach architecture

BUILDER: Mel John Dimat, Support main (Karma, Swain, Nautilus, Senna, Seraphine, Soraka, Milio)
RULES: Simple English, analogies, tables, staleness footers

Copy UNGASIS foundation (.clinerules/, .agents/, CLAUDE.md, AGENTS.md, CONVENTIONS.md) to RiftCoach project first. Then start Phase 5.7.
```


---

## 11. KEY RULES (Non-Negotiable)

### Token Efficiency
- Follow 20-layer token system (see Section 5)
- Batch edits into single operations
- Tables over prose, always
- Staleness footers on ALL files

### Safety
- Read before write — always check file exists and current content
- Never expose API keys (patterns: AIzaSy*, sk-*, ghp_*, gho_*, gsk_*, csk-*, tgp_*)
- Human approval gate required for: security files, .env, EVOLUTION_LOCK, BUILDER_PROFILE
- `.env` is in `.gitignore` — never commit secrets

### Archive Policy
- `archive/` — READ ONLY, never modify
- `source-files/` — READ ONLY, never modify
- These are lossless originals preserved for reference

### File Conventions
- File naming: kebab-case
- Component naming: PascalCase
- Max 200 lines per component
- TypeScript strict, no `any`
- Import order: react → next → third-party → local → types → styles
- Commit format: `type: what — why`

### Agent Coordination
- Each agent reads its own instruction file first (CLAUDE.md, GEMINI.md, AGENTS.md)
- Session state tracked in CONTEXT.md
- Git push before switching devices
- MEMORY_BANK.md for cross-session knowledge


---

## 12. KNOWN ISSUES

| Issue | Severity | Workaround |
|-------|:--------:|------------|
| Graphify community labels may show "Community N" placeholders | Low | Run `graphify label .` with fresh Gemini key |
| Node 858 warning: id='m365_copilot' missing source_file | Low | Cosmetic — doesn't affect functionality |
| graphify-smart.ps1 OpenAI-compatible backends fail | Medium | Graphify ignores OPENAI_BASE_URL; use `--backend gemini` with key rotation instead |
| Free tier API limits | Medium | Gemini: 5 req/min, 20 req/day per key; rotate across 5 keys |
| Groq API key #1 | Low | Invalid/expired; key #2 is active |
| Cline free models unreliable | Medium | Use BYOK with Cerebras or Groq keys |
| Ollama times out on coding tasks | Medium | Use for autocomplete only; cloud models for Cline/agents |
| Some archive template files may have stale content | Low | Always check staleness footer date |

---

## 13. HANDOFF SUMMARY

### What Was Accomplished (June 2, 2026)
- 9 sprints completed in a single afternoon
- UNGASIS OS v4.0 Form 1: 100% complete
- 977+ files, 209 folders, all pushed to GitHub
- 16,538 Graphify nodes, 2,035 labeled communities
- 20-layer token efficiency system (90-95% savings)
- Antigravity-Mem persistent memory installed
- 30 API keys organized across 6 providers
- .ungasis/ token prevention system (12 files)
- MCP task-specific profiles (3 configs)
- All tools installed: graphifyy, openai, antigravity-memory

### What's Next
1. **Sprint F8a-d**: Build 4 priority engines (DNA, SOPs, Knowledge, Revenue) — ~80 min
2. **Sprint F9a-c**: Build 3 optimization engines (Context, Decisions, Agentic) — ~60 min
3. **Sprint F10a-b**: Build 2 autonomy engines (Evolution, Self-Learning) — ~60 min
4. **START RIFTCOACH**: Copy UNGASIS foundation, continue from Phase 5.7

### Files to Read First in Any New Session
1. `LLM_CONTEXT.md` — Project passport (87 lines)
2. `AGENTS.md` — Master agent rules + 20-layer token system
3. `CONTEXT.md` — Last session handoff (always the latest state)
4. `MODEL_ROUTING.md` — Which model for which task
5. `CONVENTIONS.md` — Coding standards

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
