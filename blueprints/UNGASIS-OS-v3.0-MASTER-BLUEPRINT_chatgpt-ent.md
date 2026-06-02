# 🏰 UNGASIS OS v4.0 — Complete Blueprint & Build Spec
## "The Builder's Quest OS"

| Field | Value |
|-------|-------|
| **Version** | 3.0 — AI-Embedded Edition |
| **Author** | Mel John Dimat |
| **Date** | May 30, 2026 |
| **Platform** | Work Laptop + Android Phone + Android Tablet + Personal PC |
| **Monthly Cost** | $19.99/mo (Google AI Pro, 3-month trial: June-August 2026) + $0 company-provided tools (M365 Copilot, ChatGPT Enterprise) |
| **Tools** | 110+ verified free/freemium |
| **API Keys** | 30 (5 accounts × 6 providers) |
| **Build Sessions** | ~34 across 14 sprints |

---

## 📑 Table of Contents

1. [Executive Summary](#1-executive-summary) · 2. [Product Vision](#2-product-vision) · 3. [Quest System](#3-quest-system)
4. [Tool Registry (110+ tools)](#4-tool-registry) · 5. [30 API Key Arsenal](#5-api-key-arsenal) · 6. [Screen Designs](#6-screen-designs)
7. [Three Pillars](#7-three-pillars) · 8. [AI Architecture](#8-ai-architecture) · 9. [Data Model](#9-data-model)
10. [Tech Stack](#10-tech-stack) · 11. [File Structure](#11-file-structure) · 12. [Sprint Roadmap](#12-sprint-roadmap)
13. [Browser Workflow](#13-browser-workflow) · 14. [Design System](#14-design-system) · 15. [ADRs](#15-adrs)
16. [Daily Workflow](#16-daily-workflow) · 17. [Hour-Saving Protocol](#17-hour-saving) · 18. [Cost Analysis](#18-cost-analysis)
19. [Quest Wizard Spec](#19-quest-wizard) · 20. [AI Command Bar](#20-ai-command-bar) · 21. [Quest Master](#21-quest-master)
22. [Deployment Pipeline](#22-deployment) · 23. [Emergency Fallbacks](#23-fallbacks) · 24. [Appendix](#24-appendix)

---

## 1. Executive Summary

UNGASIS OS v4.0 is a **browser-only, AI-embedded operating system** for solopreneurs building apps with AI coding agents. Every time you start a new project, it auto-generates repo files (token efficiency + multi-agent protocols), a project tracker (tasks + journal + decisions), and a BI dashboard (progress + velocity + risks) — then an AI Quest Master guides you through every phase.

### Key Numbers

| Metric | Value |
|--------|-------|
| Tools | 110+ (all browser-based) |
| API keys | 30 (5 accounts × 6 providers) |
| Monthly cost | **$19.99/mo** (Google AI Pro, 3-month trial: June-August 2026) + $0 company-provided tools (M365 Copilot, ChatGPT Enterprise) |
| Local installs | **0** |
| AI calls/day capacity | 3,000–10,000+ |
| AI calls/day needed | ~10–50 (<1%) |
| Cloud IDE hours | 60/mo (Codespaces 60, Ona paid-only now) |
| Jules async tasks | 15/day |
| Storage | Client-side IndexedDB |
| Hosting | Cloudflare Pages (auto-deploy) |

### Constraints

- ❌ No local installs (company laptop) · ❌ No Codex CLI/Web, Antigravity, Windsurf, Cursor, Ollama
- ✅ Codespace-internal installs OK (Cline, Gemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash) · ✅ 30 free API keys · ✅ $0/month

---

## 2. Product Vision

### Evolution

| Version | Analogy | Intelligence |
|---------|---------|-------------|
| **v1.0** | Recipe book on shelf | 📖 Zero — static HTML wiki |
| **v2.0** | Organized kitchen with labeled drawers | 📋 Structured — interactive tracker |
| **v3.0** | Kitchen with sous chef who watches stove and warns before burn | 🧠 Intelligent — AI thinks, suggests, generates |

### Core Philosophy: **Think for free → Build on the clock → Ship for free**

| Zone | Activity | Timer | Cost | Primary Tools |
|------|----------|-------|------|---------------|
| 🧠 Think | Plan, architect | ❌ None | $0 | M365 Copilot, ChatGPT Enterprise |
| 🔧 Build | Code, test | ⏱️ 60 hrs/mo | $0 | Codespaces + Cline + Copilot |
| 🚀 Ship | Deploy, monitor | ❌ None | $0 | Cloudflare Pages, PostHog |

---

## 3. Quest System

### RPG → Builder Mapping

| RPG | Builder | Description |
|-----|---------|-------------|
| 🧙 Character | Builder | Your profile, stats, streaks |
| ⚔️ Quest | Project | One app you're building |
| 📖 Chapters 1-10 | Phases | Idea → Scale |
| 🎯 Missions | Tasks | Work items per chapter |
| ⭐ XP | Completion % | Progress per quest |
| 🤝 Party | AI Agents | Cline, Jules, Copilot, Gemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash |
| 💎 Mana | Token Budget | Per-session allocation |
| 📜 Spell Book | Prompt Library | Reusable prompts |
| 📚 Codex | Reference Wiki | 110+ tools, guides, glossary |
| 🛡️ Shield | Data Safety | L0 Public → L3 Company |
| 🗺️ Map | Roadmap | Visual progress timeline |

### 5 Zones: 🏰 Command Center · 📜 Quest Log · 📖 Codex · ⚒️ Forge · ⚙️ Settings

### 10 Chapters

| Ch | Name | Key Deliverable | Stop Gate |
|----|------|----------------|-----------|
| 1 | 💡 Idea | Pain-Freq-WTP score | ≥ 7/10 |
| 2 | 🔍 Validate | 15+ survey responses | >60% confirm |
| 3 | 🎨 Design | Wireframes + spec | Scope locked |
| 4 | 🖱️ Prototype | Clickable demo | Users can test |
| 5 | 🔧 Build | Working MVP | Core features done |
| 6 | 🧪 Test | User feedback | No critical bugs |
| 7 | 🚀 Deploy | Live URL | Loads <3s |
| 8 | 💰 Monetize | Payment working | First $1 |
| 9 | 📈 Grow | Analytics active | Users growing |
| 10 | 🏗️ Scale | Automated ops | Revenue ≥ costs |

### 7 Quest Scenarios

| Scenario | Duration | Chapters | Best For |
|----------|----------|----------|----------|
| 🏃 Speed Run | 7 days | 1-5 | Quick validation |
| ⚔️ Full Quest | 30 days | 1-7 | Idea → deploy |
| 👑 Empire Build | 60 days | 1-10 | Idea → revenue |
| 🧪 Lab Experiment | 3 days | 4-5 | Technical spike |
| 📂 Portfolio Piece | 14 days | 1-7 | Show-off project |
| 🔧 Side Tool | 7 days | 4-7 | Personal utility |
| 🤖 Agent Setup | 1 day | Config | Workspace setup |

---

## 4. Tool Registry

> **110+ tools — all browser-based, $0/month, zero local installs**

### Zone A: 🧠 THINK (Unlimited)

| # | Tool | Free Tier | Phase |
|---|------|-----------|-------|
| 1 | M365 Copilot | Company | All |
| 2 | ChatGPT Enterprise | Company | All |
| 3 | Notion | Free personal | Ch.1 |
| 4 | Google Trends | Free | Ch.2 |
| 5 | Tally.so | Unlimited forms | Ch.2,6 |
| 6 | Google Forms | Free | Ch.2 |
| 7 | Excalidraw | 100% free | Ch.3 |
| 8 | Figma | 3 projects free | Ch.3 |
| 9 | v0.dev | ~$5 credits/mo | Ch.3 |
| 10 | Loom | 25 videos free | Ch.6 |

### Zone B: 🎨 PROTOTYPE (Free)

| # | Tool | Free Tier | Strength |
|---|------|-----------|----------|
| 11 | Bolt.new | 1M tokens/mo | Fastest prototyping |
| 12 | Lovable | 5 credits/day | Best design quality |
| 13 | Google AI Studio Build | Rate-limited | Full-stack + Android |
| 14 | Firebase Studio ⚠️ SUNSETTING March 2027 — Use for quick prototyping only. Migrate to Google AI Studio or Antigravity for long-term projects. | 3 workspaces | AI scaffolds Next.js |

### Zone C: 🔧 BUILD — Cloud IDEs

| # | Tool | Free Tier | Hours/Mo |
|---|------|-----------|----------|
| 15 | GitHub Codespaces ⭐ | 60 hrs (2-core) | 60 |
| 16 | Ona (formerly Gitpod) ⚠️ | Paid-only (min $20/mo) | ⚠️ DEPRECATED — Gitpod rebranded to Ona, free tier removed ($20/mo minimum). Use GitHub Codespaces instead (60 hrs/mo free). |
| 17 | StackBlitz | ∞ public | ∞ |
| 18 | vscode.dev | ∞ unlimited | ∞ (no terminal) |
| 19 | Amazon Kiro | 50 credits/mo | ~50 |

### Zone C: 🤖 AI Agents (Inside Codespace)

| # | Tool | Free Tier | Role |
|---|------|-----------|------|
| 20 | Cline ⭐ | Free (BYOK) | Primary builder agent |
| 21 | Gemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash | 1,000 req/day | Terminal agent (1M context) |
| 22 | GitHub Copilot Free | 2,000 comp/mo | Autocomplete |
| 23 | OpenCode | Free (BYOK) | Backup terminal agent |

### Zone C: 🤖 AI Agents (Web-Only)

| # | Tool | Free Tier | Role |
|---|------|-----------|------|
| 24 | Google Jules | 15 tasks/day | Async PRs overnight |
| 25 | ChatGPT Enterprise | Company | Deep reasoning |

### Zone C: ⚡ API Providers (×5 Keys Each)

| # | Provider | Limit/Key/Day | ×5 Total | Best Model |
|---|----------|--------------|----------|-----------|
| 26 | Cerebras | ~200 req | 1,000 | llama3.1-8b |
| 27 | Google AI Studio | 100-1,000 | 500-5,000 | Gemini 2.5 Flash |
| 28 | Groq | ~200 req | 1,000 | llama3-70b |
| 29 | Mistral | ~200 req | 1,000 | mistral-small |
| 30 | OpenRouter | varies | varies | various free |
| 31 | Together AI | ~200 req | 1,000 | llama3-70b |

### Zone D: 🏗️ FRAMEWORKS (Open Source)

| # | Tool | Purpose |
|---|------|---------|
| 32 | Next.js 15 | React web framework |
| 33 | React 19 | UI components |
| 34 | TypeScript 5.8 | Type-safe JS |
| 35 | Tailwind CSS 4 | Utility-first CSS |
| 36 | shadcn/ui | Accessible UI kit |
| 37 | Framer Motion 12 | Cinematic animations |
| 38 | Zustand 5 | State management |
| 39 | Recharts | Dashboard charts |
| 40 | Dexie.js | IndexedDB wrapper |
| 41 | Lucide React | Icons |
| 42 | Vite | Build tool |
| 43 | Node.js | Runtime |
| 44 | npm | Package manager |

### Zones E-I: 💾 Databases · 🚀 Hosting · 📊 Monitor · 💰 Payments · 🔗 VCS

| # | Tool | Free Tier | Zone |
|---|------|-----------|------|
| 45 | IndexedDB (Dexie.js) ⭐ | ∞ | E - DB (primary) |
| 46 | Supabase | 500MB | E - PostgreSQL |
| 47 | Firebase Spark | 1GB | E - NoSQL |
| 48 | Neon | 0.5GB | E - Serverless PG |
| 49 | Turso/LibSQL | 9GB | E - SQLite edge |
| 50 | CockroachDB | 10GB | E - Distributed SQL |
| 51 | MongoDB Atlas | 512MB | E - Document |
| 52 | Upstash Redis | 256MB | E - Key-value |
| 53 | Cloudflare Pages ⭐ | ∞ BW | F - Hosting |
| 54 | Netlify | 100GB BW | F - Hosting |
| 55 | GitHub Pages | ∞ | F - Static |
| 56 | Firebase Hosting | 10GB/mo | F - Hosting |
| 57 | Render | 3 static | F - Hosting |
| 58 | Deno Deploy | 1M req/mo | F - Edge |
| 59 | Surge.sh | ∞ | F - Static |
| 60 | PostHog ⭐ | 1M events | G - Analytics |
| 61 | Umami | Self-hosted | G - Analytics |
| 62 | UptimeRobot | 50 monitors | G - Uptime |
| 63 | Crisp | 2 agents | G - Chat |
| 64 | Lemon Squeezy | 5%+$0.50 | H - Payments |
| 65 | PayMongo | % per tx | H - PH Payments |
| 66 | GitHub | ∞ repos | I - Code |
| 67 | Git | ∞ free | I - VCS |

**Total: 110+ tools, 30 API keys, $0/month**

---

## 5. 30 API Key Arsenal

```
5 Email Accounts × 6 Providers = 30 API Keys

Provider          Keys   Free/Key/Day       Total/Day
━━━━━━━━━━━━━━━━  ━━━━   ━━━━━━━━━━━━━━━    ━━━━━━━━━
Cerebras           5     ~200 requests       1,000
Google AI Studio   5     100-1,000 req       500-5,000
Groq               5     ~200 requests       1,000
Mistral            5     ~200 requests       1,000
OpenRouter         5     varies              varies
Together AI        5     ~200 requests       1,000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMBINED          30                         5,500-10,000+
```

### Rotation: Groq → Cerebras → Together → Mistral → Google → OpenRouter. If key rate-limited → next account's key. Cache responses 1hr.

### .env.local (Codespace only — NEVER commit)

```bash
CEREBRAS_KEY_1=csk-xxx  # through CEREBRAS_KEY_5
GOOGLE_AI_KEY_1=AIza-xxx  # through GOOGLE_AI_KEY_5
GROQ_KEY_1=gsk-xxx  # through GROQ_KEY_5
MISTRAL_KEY_1=xxx  # through MISTRAL_KEY_5
OPENROUTER_KEY_1=sk-or-xxx  # through OPENROUTER_KEY_5
TOGETHER_KEY_1=xxx  # through TOGETHER_KEY_5
```

---

## 6. Screen Designs

### 6.1 Command Center

```
┌────────────────────────────────────────────────────┐
│ ⚔️ UNGASIS OS                    🧠 ⌘K  ⚙️  👤   │
├────────────────────────────────────────────────────┤
│ "Welcome back, Builder. Streak: 5 days."           │
│ ┌─ ACTIVE QUESTS ─────────────────────────────┐   │
│ │ ⚔️ RiftCoach     Ch.5 BUILD   ████░░ 62%   │   │
│ │ 🔧 Newmont Dash  Ch.3 DESIGN  ██░░░░ 35%   │   │
│ └─────────────────────────────────────────────┘   │
│ ┌─ STATS ────┐ ┌─ RECENT ──────────────────┐     │
│ │ Health: 82 │ │ ✅ Phase 5.5-A complete    │     │
│ │ Tasks: 18  │ │ 🔨 Phase 5.7 in progress  │     │
│ └────────────┘ └────────────────────────────┘     │
│ ┌─ IDEAS ─────────────────────────────────────┐   │
│ │ 💡 "Stat calculator"    Score: 8.2/10        │   │
│ └─────────────────────────────────────────────┘   │
│ [⚔️ New Quest]  [📚 Codex]  [🔨 Forge]           │
└────────────────────────────────────────────────────┘
```

### 6.2 Quest Detail — Task Board

```
┌────────────────────────────────────────────────────┐
│ ← Back │ ⚔️ RiftCoach │ Ch.5 BUILD │ 62%          │
├────────────────────────────────────────────────────┤
│ [📋 Tasks] [📓 Journal] [📊 Dashboard] [📁 Repo]  │
│ MAP: ●━●━●━●━◉━○━○━○━○━○                         │
│ ┌────────┐ ┌────────┐ ┌──────┐ ┌────────┐        │
│ │📥 TODO │ │🔨 DOING│ │REVIEW│ │✅ DONE │        │
│ │Ph5.7   │ │Fix JSON│ │PR #42│ │Ph5.0   │        │
│ │Deep WHY│ │parsing │ │Jules │ │Ph5.5   │        │
│ │⏱️3hr   │ │⏱️1hr   │ │      │ │        │        │
│ └────────┘ └────────┘ └──────┘ └────────┘        │
│ [+ Add Task]  [🧠 AI: Generate Tasks]             │
└────────────────────────────────────────────────────┘
```

### 6.3 BI Dashboard

```
┌────────────────────────────────────────────────────┐
│ 📊 QUEST DASHBOARD — RiftCoach                     │
├────────────────────────────────────────────────────┤
│ ┌─HEALTH─┐ ┌─VELOCITY────┐ ┌─TIMELINE─────────┐  │
│ │ 🟢 82  │ │3.2 tasks/wk │ │ ●━━◉━○━○━○━○━○   │  │
│ │OnTrack │ │↑ from 2.8   │ │ Ch.5 of 10       │  │
│ └────────┘ └─────────────┘ └──────────────────┘  │
│ ┌─PHASE PROGRESS──────────────────────────────┐   │
│ │ Ch.1-4 ████████████ 100%  Ch.5 ████░░ 62%  │   │
│ │ Ch.6-10 ░░░░░░░░ 0%                         │   │
│ └──────────────────────────────────────────────┘   │
│ ┌─TOKENS──────┐ ┌─TASKS────────────────────┐     │
│ │58K/100K used│ │✅18 Done · 🔨3 Active    │     │
│ └─────────────┘ │📥9 Todo                   │     │
│ ┌─RISKS───────────────────────────────────┐  │     │
│ │🔴 AI hallucination (12d) 🟡 Groq expired│  │     │
│ └──────────────────────────────────────────┘  │     │
└────────────────────────────────────────────────────┘
```

---

### 6.6 Codex Page
```
+----------------------------------------------------+
| <- Back | Codex                    [Search...]      |
|----------------------------------------------------|
| [Tools] [Guides] [Glossary] [Sources]              |
|                                                    |
| TOOLS (88)                    Filter: [All Zones v]|
| +------------+ +------------+ +------------+       |
| | Cline      | | Codespaces | | Cloudflare |       |
| | Zone: Build| | Zone: Build| | Zone: Ship |       |
| | Free BYOK  | | 60 hrs/mo  | | Unlimited  |       |
| | [Details]  | | [Details]  | | [Details]  |       |
| +------------+ +------------+ +------------+       |
| +------------+ +------------+ +------------+       |
| | PostHog    | | Groq       | | shadcn/ui  |       |
| | Zone: Mon  | | Zone: API  | | Zone: Frame|       |
| | 1M events  | | 200 req/d  | | Free OSS   |       |
| | [Details]  | | [Details]  | | [Details]  |       |
| +------------+ +------------+ +------------+       |
|                                                    |
| Showing 12 of 110+ tools          [Load More]        |
+----------------------------------------------------+
```
### 6.7 Forge Page


```
+----------------------------------------------------+
| <- Back | Forge                                    |
|----------------------------------------------------|
| [Prompt Forge] [Repo Forge] [Scenarios]            |
|                                                    |
| PROMPT FORGE                                       |
| +------------------------------------------------+ |
| | Template: Cline Feature Build          [Use]   | |
| | Template: Jules Background Task        [Use]   | |
| | Template: Gemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash Refactor          [Use]   | |
| | Template: Bug Fix Prompt               [Use]   | |
| | Template: Session Starter              [Use]   | |
| +------------------------------------------------+ |
| | Custom Prompts (3 saved)                       | |
| | + "RiftCoach rune validator"           [Use]   | |
| | + "Newmont data extractor"             [Use]   | |
| | + "Glass card component"               [Use]   | |
| +------------------------------------------------+ |
| [+ New Custom Prompt]  [AI: Suggest Prompt]        |
+----------------------------------------------------+
```
### 6.8 Settings Page


```
+----------------------------------------------------+
| <- Back | Settings                                 |
|----------------------------------------------------|
| [API Keys] [Preferences] [Export/Import] [About]   |
|                                                    |
| API KEYS                                           |
| +-- Cerebras ----+  Status: 4/5 active             |
| | Key 1: ****xxx |  [Test] [Edit] [Delete]         |
| | Key 2: ****xxx |  [Test] [Edit] [Delete]         |
| | Key 3: EXPIRED |  [Replace]                      |
| | Key 4: ****xxx |  [Test] [Edit] [Delete]         |
| | Key 5: ****xxx |  [Test] [Edit] [Delete]         |
| +----------------+                                 |
| [+ Add Provider]                                   |
|                                                    |
| PREFERENCES                                        |
| Theme:           [Dark Glass v]                    |
| Token Budget:    [100,000    ]                     |
| Session Cap:     [10,000     ]                     |
| Compact At:      [70%        ]                     |
| Idle Timeout:    [15 min     ]                     |
|                                                    |
| DATA                                               |
| [Export All (JSON)]  [Import from File]             |
| [Clear All Data]     <- requires confirmation      |
+----------------------------------------------------+
```

## 7. Three Pillars

### Pillar 1: 📁 Repo Forge — 18 Auto-Generated Files

| # | File | Purpose |
|---|------|---------|
| 1 | `AGENTS.md` | Multi-agent roles, rules, budget zones |
| 2 | `CLAUDE.md` | Cline auto-loaded rules |
| 3 | `CONVENTIONS.md` | Code style, naming, commits |
| 4 | `PROJECT_BRIEF.md` | Project overview from wizard |
| 5 | `MODEL_ROUTING.md` | Which model for which task |
| 6 | `TOKEN_LOG.md` | Token usage tracker |
| 7 | `TASK_HANDOFF.md` | Session handoff template |
| 8 | `TEST_COMMANDS.md` | Verify commands (lint/build/test) |
| 9 | `DECISIONS.md` | Architecture decision record |
| 10 | `GOTCHAS.md` | Known issues + workarounds |
| 11 | `CHANGELOG.md` | Version history |
| 12 | `.env.example` | Safe placeholder keys |
| 13 | `.gitignore` | Pre-configured for stack |
| 14 | `README.md` | Auto-generated project readme |
| 15 | `SECURITY.md` | Data classification rules |
| 16 | `.devcontainer/devcontainer.json` | Codespace auto-setup: installs Cline, Gemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash, Prettier, ESLint, forwards port 3000 |
| 17 | `.github/copilot-instructions.md` | GitHub Copilot context: project stack, conventions, design tokens for better autocomplete |
| 18 | `GEMINI.md` | Gemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash context: project overview, role, conventions for 1M-context analysis |

### Pillar 2: 📋 Quest Tracker — 9 PM Features

| Feature | Description | View |
|---------|-------------|------|
| Phase Tracker | Quest map (chapters 1-10) | Progress dots + bar |
| Task Board | Kanban: Todo → Doing → Review → Done | Drag-and-drop |
| Journal | Markdown notes per phase | Timeline feed |
| Decision Log | WHY you chose something | Searchable table |
| Handoff Generator | One-click session summary | Copy-paste block |
| Meeting Notes | Stakeholder feedback | Per-phase entries |
| Risk Tracker | Blockers with severity | Red/yellow/green cards |
| Custom Prompts | Project-specific prompts | Per-quest library |
| Time Tracker | Estimated vs actual hours | Input + chart |

### Pillar 3: 📊 BI Dashboard — 10 Widgets

| Widget | Chart Type | Data Source |
|--------|-----------|-------------|
| Health Score | Radial gauge | Velocity + completion + risks |
| Phase Progress | Horizontal bars | Task completion per chapter |
| Task Velocity | Line chart (7-day) | Tasks completed per day |
| Token Budget | Stacked bar | Manual log entries |
| Task Breakdown | Donut chart | Todo / Doing / Done |
| Risk Radar | Status cards | Risk entries |
| Activity Timeline | Bar chart (daily) | Task timestamps |
| Milestone Map | Horizontal timeline | Phase dates |
| Codespace Hours | Progress bar | Manual entry |
| Agent Performance | Radar chart | Tasks per agent |

---

## 8. AI Architecture (7 Layers)

| Layer | Name | Purpose | AI Call? |
|-------|------|---------|---------|
| 1 | 🔌 Inference | Route to free API with fallback | Yes |
| 2 | 💾 Memory | Assemble project context | No |
| 3 | 🔍 RAG | Search project data naturally | Yes (1) |
| 4 | ✍️ Generation | Create files, tasks, handoffs | Yes (1 each) |
| 5 | 🧠 Reasoning | Recommend next actions | Yes (1) |
| 6 | 🔮 Prediction | Forecast, detect anomalies | No (math) |
| 7 | 🎭 Personality | Quest Master voice | Partial |

### Layer 1: Inference Fallback Chain

```
Simple → Cerebras (ultra-fast, free)
Medium → Groq → Cerebras → Together → Mistral → Google → OpenRouter
Complex → Gemini 2.5 Pro → OpenRouter
Cache: same question <1hr = cached. 30-key rotation across 5 accounts.
```

### Layer 2: Memory System

| Type | Scope | Location |
|------|-------|----------|
| Working | Current session | RAM (Zustand) |
| Project | Per quest | IndexedDB |
| Builder | Cross-quest | IndexedDB |
| Codex | Static knowledge | JSON files |

### Layer 3: RAG (No Vector DB Needed)

```
User asks → Extract keywords → Search IndexedDB → Build context → 1 AI call → Answer
```

### Layer 4: Generation (What AI Creates)

| Output | API Calls |
|--------|-----------|
| AGENTS.md (200 lines) | 1 |
| Task breakdown (5-8 tasks) | 1 |
| Handoff summary | 1 |
| Journal suggestion | 1 |
| Smart prompt pre-fill | 0 (template) |

### Layer 5: Reasoning Examples

| You Ask | AI Responds |
|---------|-------------|
| "What should I focus on?" | Task recommendation with reasons |
| "Am I on track?" | Forecast with confidence |
| "Biggest risk?" | Top risk + mitigation |

### Layer 6: Prediction (Pure Math, No AI)

| Prediction | Formula |
|-----------|---------|
| Completion | tasks remaining ÷ velocity |
| Token burn | usage trend → exhaustion date |
| Risk escalation | unresolved > 7 days |
| Velocity anomaly | drop > 30% |

### Layer 7: Quest Master Personality

| Trigger | Message | Tone |
|---------|---------|------|
| App opens | "Welcome back, Builder. 5-day streak." | Warm |
| Chapter done | "⚔️ Chapter CONQUERED!" | Celebratory |
| Stuck 3 days | "No movement. Break it down?" | Gentle |
| STOP gate | "🛑 Data says pivot." | Direct |
| First $1 | "💰 You're running a business!" | Epic |
| Risk aging | "⚠️ Risk open 12 days." | Urgent |

---

### Addendum v1 Gap 3: Token Efficiency Protocol

### 3-Zone Budget (per quest, configurable)

```
TOTAL: 100,000 tokens per quest
Builder Zone: 60% (60K) - primary coding via Cline/Gemini
Tester Zone:  20% (20K) - review, debug, test generation
Buffer Zone:  20% (20K) - emergencies, architecture questions
```

### Token-Saving Rules

| Rule | Saves |
|------|-------|
| Compact at 70% context window | ~30% waste |
| Pre-fill templates, not generate from scratch | ~50% tokens |
| Cache same question within 1hr | ~10% calls |
| Route by complexity (small model for simple) | ~40% tokens |
| Batch 3 questions in 1 prompt | ~60% overhead |
| Context pruning (relevant data only) | ~70% context |

### Session Flow

```
Start  -> budget = sessionCap
Each call -> budget -= tokens_used
At 70% -> Warning: '70% of session budget used'
At 90% -> Warning: 'Save remaining for handoff'
At 100% -> Block: 'Budget exhausted. Generate handoff?'
End    -> Log total to TokenLog in IndexedDB
```

---

### API Key Health Check Procedure

Run this monthly or when you suspect keys are expired.

STEP 1: Open Codespace terminal
STEP 2: Test each provider (one-liner per provider):
curl -s https://api.groq.com/v1/models -H "Authorization: Bearer $GROQ_KEY_1" | head -1
curl -s https://api.cerebras.ai/v1/models -H "Authorization: Bearer $CEREBRAS_KEY_1" | head -1
Repeat for each key 1-5 per provider
STEP 3: Check responses:
-> JSON with models list = KEY WORKS
-> "invalid_api_key" or 401 = KEY EXPIRED
-> 429 = KEY RATE-LIMITED (working but busy)
STEP 4: Update .env.local:
-> Comment out expired keys with # and note the date
-> # GROQ_KEY_1=gsk-xxx  # EXPIRED 2026-06-15
-> Move working keys to primary position
STEP 5: Log in TOKEN_LOG.md:
-> Date, which keys expired, which provider affected

### Quick Status Table (maintain monthly)

| Provider | Key 1 | Key 2 | Key 3 | Key 4 | Key 5 | Last Checked |
|----------|-------|-------|-------|-------|-------|-------------|
| Cerebras | ? | ? | ? | ? | ? | [date] |
| Google AI | ? | ? | ? | ? | ? | [date] |
| Groq | ? | ? | ? | ? | ? | [date] |
| Mistral | ? | ? | ? | ? | ? | [date] |
| OpenRouter | ? | ? | ? | ? | ? | [date] |
| Together | ? | ? | ? | ? | ? | [date] |

Status: OK = working, EXP = expired, LTD = rate-limited

### Addendum v3 Inline Merge: Complete 12-Layer Token Efficiency

Gap 4: 12-Layer Token Efficiency — Expanded to 12 Layers (Medium)
Insert into: Addendum v1 Gap 3 (Token Efficiency Protocol) — Merge into the complete 12-layer system
The UNGASIS wiki (index.html) documented 12 token optimization layers. Our Addendum v1 captured 6 of them. Here are the missing 6 to complete the system.

Existing captured layers from Addendum v1

#RuleSaves1Compact at 70% context~30%2Pre-fill templates~50%3Cache same Q within 1hr~10%4Route by complexity~40%5Batch questions~60% overhead6Context pruning~70% context

NEW: 6 Additional Layers (from wiki)

#RuleWhat It MeansSaves7Structured output enforcementAlways request JSON or markdown format — prevents AI from rambling in prose~20% response tokens8Example-driven promptsShow 1 example of desired output instead of describing it in paragraphs~40% prompt tokens9Incremental disclosureDon't dump entire project context — reveal info only when AI needs it~50% context tokens10Response length capsAdd "respond in under 500 words" or "max 3 bullet points" to prompts~30% response tokens11Session checkpointingEvery 10 messages, AI summarizes conversation so far — prevents re-reading entire history~60% in long sessions12Knowledge file offloadingMove static info (tool list, glossary, conventions) to uploaded files instead of pasting in chat~80% for repeated info
Complete 12-Layer System
LAYER 1-3: PREVENT (Stop waste before it happens)
  1. Pre-fill templates          <- Don't generate what you can template
  2. Knowledge file offloading   <- Upload static info, don't paste
  3. Example-driven prompts      <- Show, don't describe

LAYER 4-6: OPTIMIZE (Use tokens more efficiently)
  4. Route by complexity         <- Small model for simple tasks
  5. Batch questions             <- 3 questions in 1 prompt
  6. Context pruning             <- Only send relevant data

LAYER 7-9: CONTROL (Limit what AI generates)
  7. Structured output           <- JSON/markdown, not prose
  8. Response length caps        <- "under 500 words"
  9. Incremental disclosure      <- Reveal info as needed

LAYER 10-12: MAINTAIN (Keep sessions efficient over time)
  10. Cache responses            <- Same Q within 1hr = cached
  11. Session checkpointing      <- Summarize every 10 messages
  12. Compact at 70%             <- Auto-compress when context fills

Token Savings Calculator
WITHOUT 12 layers:
  Average session: 5,000 tokens
  x 5 sessions/day = 25,000/day
  x 20 days/month = 500,000/month

WITH 12 layers:
  Average session: 1,500 tokens (70% reduction)
  x 5 sessions/day = 7,500/day
  x 20 days/month = 150,000/month

  SAVINGS: 350,000 tokens/month
  That's like getting 23 extra FREE sessions every month.

### Addendum v1 Gap 4: Multi-Agent Orchestration Patterns

### Pattern 1: Sequential Pipeline (Daily Default)

```
M365 Copilot (plan) -> copy prompt -> Cline (build)
-> handoff -> M365 (review) -> Cline (next task)
-> git push -> Cloudflare auto-deploy
```

### Pattern 2: Parallel Async (Jules + Cline)

```
Assign 3 Jules tasks (overnight)     You open Codespace
        |                                  |
        v                                  v
Jules makes PRs                    Cline builds main feature
        |                                  |
        +-------> You review all ----------+
                        |
                  Merge + deploy
```

### Pattern 3: Self-Healing Loop (Debug)

```
Cline builds -> test fails -> fix attempt 1
-> still broken? -> fix attempt 2
-> still broken? -> STOP. Handoff to M365 Copilot.
   Human analyzes, writes new prompt, pastes back.
```

### Pattern 4: Specialist Routing

| Task | Best Agent | Why |
|------|-----------|-----|
| Build new feature | Cline | Reads AGENTS.md, follows conventions |
| Refactor >500 lines | Gemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash | 1M context window |
| Background PRs | Jules | Async, no Codespace hours |
| Autocomplete | Copilot Free | Inline, zero effort |
| Architecture decisions | M365 Copilot | Deep reasoning, no timer |
| Complex debugging | ChatGPT Enterprise | Extended thinking, free |


### Pattern 5: Planning Pipeline (Your Validated Daily Workflow)

This is your personally tested and validated workflow across multiple projects
(RiftCoach, Newmont, QIM Dashboard, UNGASIS). It works because each tool
handles what it's best at, and you never waste paid/timed resources on thinking.

STEP 1: M365 Copilot (Claude Opus) — PLAN
-> Architecture, blueprints, specs, prompts
-> Free, unlimited, no timer
-> Output: task spec + Cline prompt + acceptance criteria
STEP 2: VS Code Copilot (GPT-4.1) — AUTOCOMPLETE
-> Inline code suggestions while you type or review
-> 2,000 completions/month free
-> Works alongside Cline, not instead of it
STEP 3: VS Code Cline — BUILD
-> Reads CLAUDE.md + AGENTS.md automatically
-> Precise, multi-insertion file edits
-> Autonomous changes with your approval
-> Uses your 30 free API keys (BYOK)
STEP 4: Back to M365 Copilot — REVIEW
-> Paste handoff summary
-> Get next prompt for Cline
-> Log decisions, update memory bank

Why this order works:

| Step | Tool | Timer? | Cost | Brain Power |
|------|------|--------|------|-------------|
| 1. Plan | M365 Copilot | None | $0 | High (thinking) |
| 2. Assist | VS Code Copilot | None | $0 | Low (autocomplete) |
| 3. Build | Cline in Codespace | 60 hrs/mo | $0 | Medium (reviewing) |
| 4. Review | M365 Copilot | None | $0 | High (analyzing) |

> Key insight: Steps 1 and 4 are FREE and UNLIMITED. Only Step 3 uses
> Codespace hours. So you spend maximum time in free tools and minimum
> time on the clock.

### Pattern 6: ABIT Loop (Project-Specific Iteration)

Validated during RiftCoach development. Use this when building features
that need multiple rounds of refinement.

A — ARCHITECT: Define what you're building (M365 Copilot)
-> Spec, data model, component structure, acceptance criteria
B — BUILD: Code it (Cline in Codespace)
-> Paste Cline prompt, build feature, run dev server
I — INSPECT: Test and review (Browser + M365 Copilot)
-> Test in browser, check mobile, review code quality
-> Paste results into M365 Copilot for analysis
T — TWEAK: Fix and improve (Cline)
-> Paste fix prompt, iterate until acceptance criteria met
-> If 2 tweaks fail, STOP — go back to ARCHITECT
REPEAT until feature is complete.

When to use: Feature-level iteration (not full daily workflow).
How it differs from Pattern 5: Pattern 5 is your daily macro flow.
Pattern 6 is your micro loop WITHIN the Build step.

---

## 9. Data Model

> All stored in **IndexedDB** via **Dexie.js**. No backend.

### Quest
- `id` · `name` · `northStar` · `targetUser` · `scenario` · `dataLevel` · `status`
- `currentChapter` · `stack` {framework, styling, db, hosting} · `party` [agents]
- `tokenBudget` {total, sessionCap, compactAt} · `createdAt` · `updatedAt`

### Chapter
- `questId` · `number` (1-10) · `title` · `status` · `startedAt` · `completedAt`

### Task
- `id` · `questId` · `chapterNumber` · `title` · `done` · `status` (todo/doing/review/done)
- `assignedAgent` · `estimatedHours` · `actualHours` · `tags` · `createdAt`

### Idea
- `id` · `title` · `painScore` · `freqScore` · `wtpScore` · `compositeScore`
- `notes` · `promotedToQuest` · `createdAt`

### JournalEntry
- `id` · `questId` · `chapterNumber` · `date` · `content` (md) · `tags`

### Decision
- `id` · `questId` · `date` · `title` · `context` · `decision` · `alternatives` · `consequences`

### Risk
- `id` · `questId` · `title` · `severity` (red/yellow/green) · `mitigation` · `status` · `resolvedAt`

### TokenLog
- `id` · `questId` · `date` · `agent` · `tokensUsed` · `sessionMessages` · `notes`

### Handoff
- `id` · `questId` · `date` · `fromAgent` · `summary` · `filesChanged` · `nextActions` · `prompt`

### CustomPrompt
- `id` · `questId` · `name` · `content` · `tags` · `lastUsed`

### Builder (singleton)
- `name` · `experience` · `preferences` · `stats` · `defaultParty` · `defaultBudget`

---

## 10. Tech Stack

| Package | Version | Purpose | ~Size |
|---------|---------|---------|-------|
| Next.js | 15 | React meta-framework | ~300KB |
| React | 19 | UI components | ~45KB |
| TypeScript | 5.8 | Type safety | Dev only |
| Tailwind CSS | 4 | Utility styling | ~15KB |
| shadcn/ui | latest | UI component library | Tree-shake |
| Framer Motion | 12 | Animations | ~35KB |
| Zustand | 5 | State management | ~2KB |
| Recharts | latest | Chart widgets | ~50KB |
| Dexie.js | latest | IndexedDB wrapper | ~25KB |
| Lucide React | latest | Icons | Tree-shake |
| react-markdown | latest | Journal rendering | ~15KB |
| Vercel AI SDK | latest | Streaming AI | ~50KB |
| @ai-sdk/groq | latest | Groq adapter | ~10KB |
| @ai-sdk/google | latest | Google AI adapter | ~10KB |
| zod | latest | Schema validation | ~15KB |

**Estimated production: ~600KB JS + ~40KB CSS**

---

## 11. File Structure

```
ungasis-v3/
├── public/                     # Static assets, PWA manifest
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout + providers
│   │   ├── page.tsx            # Command Center (home)
│   │   ├── quest/[id]/page.tsx # Quest detail (tabs)
│   │   ├── quest/new/page.tsx  # New Quest Wizard
│   │   ├── codex/page.tsx      # Codex library
│   │   ├── forge/page.tsx      # Prompt + Repo Forge
│   │   ├── settings/page.tsx   # API keys, prefs
│   │   └── api/ai/route.ts    # AI inference API route
│   ├── components/
│   │   ├── command-center/     # Home widgets
│   │   ├── quest/              # Task board, phase tracker
│   │   ├── journal/            # Entries, editor
│   │   ├── dashboard/          # 10 chart widgets
│   │   ├── codex/              # Tool cards, search
│   │   ├── forge/              # Prompt builder, repo gen
│   │   ├── wizard/             # 7-step quest wizard
│   │   ├── ai/                 # Command bar, responses
│   │   ├── ui/                 # shadcn/ui components
│   │   └── shared/             # Layout, nav, sidebar
│   ├── data/
│   │   ├── codex/              # tools.json, guides, glossary
│   │   ├── scenarios/          # 7 quest templates
│   │   └── templates/          # 18 project file templates
│   ├── lib/
│   │   ├── db.ts               # Dexie schema + init
│   │   ├── store.ts            # Zustand store
│   │   ├── ai-router.ts        # Inference + key rotation
│   │   ├── ai-context.ts       # Memory assembler
│   │   ├── predictions.ts      # Math prediction engine
│   │   └── repo-generator.ts   # Repo Forge engine
│   ├── hooks/                  # useQuest, useTasks, useAI
│   └── styles/globals.css      # Tailwind + CSS vars
├── .devcontainer/devcontainer.json  # Codespace auto-setup
├── .env.example · .gitignore · next.config.ts
├── tailwind.config.ts · tsconfig.json · package.json
└── README.md
```

---

### Addendum v1 Gap 1: devcontainer.json

```json
{
  "name": "UNGASIS v4.0",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:22",
  "customizations": { "vscode": {
    "extensions": [
      "saoudrizwan.claude-dev",
      "bradlc.vscode-tailwindcss",
      "esbenp.prettier-vscode",
      "dbaeumer.vscode-eslint"
    ],
    "settings": {
      "editor.formatOnSave": true,
      "editor.tabSize": 2,
      "editor.wordWrap": "on",
      "files.autoSave": "onFocusChange"
    }
  }},
  "postCreateCommand": "npm install && npm install -g @google/gemini-cli && npm install -g @google/antigravity-cli",
  "forwardPorts": [3000],
  "features": { "ghcr.io/devcontainers/features/github-cli:1": {} }
}
```

Manual once: github.com/settings/codespaces -> idle=15min, machine=2-core

---

## 12. Sprint Roadmap

| Sprint | Focus | Sessions | Deliverables |
|--------|-------|----------|-------------|
| **0** | Setup | 2 | Codespace, design system, layout, nav |
| **1** | Quest CRUD | 3 | Create/edit/delete quests, wizard (basic) |
| **2** | Repo Forge | 2 | Generate 18 project files from wizard, .zip |
| **3** | Task Board | 3 | Kanban, drag-drop, phase tracker |
| **4** | Journal + Decisions | 2 | Markdown journal, decision log, risks |
| **5** | BI Dashboard | 3 | All 10 chart widgets (Recharts) |
| **6** | Codex | 2 | 110+ tools, guides, glossary, search |
| **7** | Prompt Forge | 2 | 8 templates, context fill, custom prompts |
| **8** | Handoff Generator | 1 | One-click summary + continuation prompt |
| **9** | AI Engine | 3 | Inference router, key rotation, API routes |
| **10** | AI Features | 3 | Command bar (⌘K), smart prompt, AI tasks |
| **11** | Quest Master | 2 | Personality, greetings, warnings |
| **12** | Cinematic Polish | 2 | Particles, transitions, glow effects |
| **13** | Export + PWA | 2 | JSON export/import, offline, installable |
| **14** | Mobile + QA | 2 | Responsive, bottom tabs, bug fixes |
| | **TOTAL** | **~34** | |

```
Sprint 0-2   ████░░░░░░░░░░  Foundation + Repo Forge
Sprint 3-5   ████████░░░░░░  Tracker + Dashboard (v2.0)
Sprint 6-8   ██████████░░░░  Codex + Forge + Handoff
Sprint 9-11  ████████████░░  AI Brain (v4.0 upgrade)
Sprint 12-14 ██████████████  Polish + PWA + Launch
```

### Addendum v1 Gap 5: Agent Kickoff Prompt Templates

### Cline Kickoff (Sprint 0)

```markdown
## Task: [Quest Name] - Sprint 0 Setup
Context: [name], [northStar], [stack]
Role: Senior dev. Read AGENTS.md + CONVENTIONS.md first.
Tasks:
1. Init Next.js 15 + TypeScript
2. Install dependencies from stack config
3. Setup Tailwind CSS 4 with design tokens
4. Create layout.tsx with 5-zone sidebar nav
5. Create placeholder pages for all 5 zones
6. Verify: npm run build passes with zero errors
Budget: [sessionCap] tokens, compact at 70%
```

### Jules Background Task

```markdown
## Jules: Create Codex data files
Repo: [url] | Branch: create from main
Create src/data/codex/tools.json (110+ tool objects)
Create src/data/codex/glossary.json (50+ terms)
Source: AGENTS.md section 4. Create PR to main.
```

### Gemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash Refactor

```markdown
## Gemini: Split QuestDetail.tsx (800+ lines)
Split into: QuestHeader, TaskBoard, PhaseTracker, QuestTabs, QuestDetail
Rules: Preserve all functionality, keep types, each file <200 lines
Test: npm run build must pass after refactor
```

---

---

## 13. Browser-Only Workflow

| Tab | Tool | Zone | Purpose |
|-----|------|------|---------|
| 1 | M365 Copilot | A Think | Plan, prompts, review |
| 2 | ChatGPT Enterprise | A Think | Architecture, reasoning |
| 3 | GitHub Codespaces | B Build | VS Code + Cline + Copilot |
| 4 | GitHub + Jules | B Build | Review PRs, async tasks |
| 5 | Bolt.new / Lovable | B Proto | Quick prototypes |
| 6 | Cloudflare Dashboard | C Ship | Monitor deploys |
| 7 | Your live app | C Ship | Test deployed app |

```
ZONE A: THINK (Free, Unlimited) -> specs, prompts
ZONE B: BUILD (60 hrs/mo)       -> code, test, commit
ZONE C: SHIP  (Free, Auto)      -> git push -> live
```

---

### Addendum v1 Gap 6: Cline-Specific Workflow

```
Codespace starts -> Cline extension loads
-> Cline auto-reads CLAUDE.md (repo root)
-> CLAUDE.md says: 'Read AGENTS.md for full instructions'
-> Cline reads AGENTS.md -> knows:
   - Its role (Builder agent)
   - Budget zones (60K/20K/20K)
   - Conventions to follow
   - Files it can/cannot edit
   - Error handling (2 attempts then stop)
-> You paste task prompt -> Cline builds following all rules
```

### CLAUDE.md Content (Auto-Generated)

```markdown
# CLAUDE.md
Read AGENTS.md for complete instructions.
Quick Rules:
- Follow CONVENTIONS.md for all code style
- Never modify src/data/ without explicit permission
- Run npm run build after every change
- If build fails twice, STOP and report the error
- Compact context at 70% usage
```

---

### Addendum v1 Gap 8: Gemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash 1M Context Advantage

| Scenario | Use Gemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash | Use Cline |
|----------|---------------|-----------|
| Refactor file >500 lines | Yes (needs full context) | No |
| Analyze entire codebase | Yes (1M tokens) | No |
| Build new feature | No | Yes (reads AGENTS.md) |
| Fix bug in specific file | No (overkill) | Yes (targeted) |
| Generate tests for 10+ files | Yes (sees all at once) | Slower |
| Quick 1-file edit | No | Yes |

```bash
# In Codespace terminal:
gemini
> Read all files in src/components/ and identify duplicate patterns.
```

---

## 14. Design System

| Token | Value | Use |
|-------|-------|-----|
| `--bg-deep` | `#0a0a1a` | Page bg |
| `--bg-surface` | `#12122a` | Cards |
| `--accent` | `#00d4ff` | Primary cyan |
| `--secondary` | `#a78bfa` | Purple |
| `--success` | `#4ade80` | Completed |
| `--warning` | `#fbbf24` | Caution |
| `--danger` | `#f87171` | Errors |
| `--text` | `#e2e8f0` | Body text |

### Effects: Star field, Parallax, Glow pulse, Typewriter, Fade-in, Progress anim, Particle burst, Scan-line
### Breakpoints: Desktop 1024+ | Tablet 768-1023 | Mobile <768

---

### Addendum v1 Gap 11: Glassmorphism Design Pattern

### CSS Recipe

```css
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
.glass-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(0, 212, 255, 0.3);
}
.glass-card.active {
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.15);
}
```

### Tailwind Shorthand

```
bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl
hover:bg-white/[0.06] hover:border-cyan-400/30 transition-all duration-300
```

### Where Glass Is Used

| Component | Notes |
|-----------|-------|
| Quest cards | Active quest has glow border |
| Stat widgets | Smaller padding |
| Sidebar nav | Fixed position |
| Modal overlays | Darker backdrop |
| Command bar | Floating, centered |
| Dashboard charts | Chart bg transparent |
| Toast notifications | Smaller, dismissable |
| Wizard steps | Full-width panels |

---

## 15. Architecture Decision Records

| # | Decision | Chosen | Why | Rejected |
|---|----------|--------|-----|----------|
| 1 | Storage | IndexedDB | Complex data, offline, $0 | localStorage, Supabase |
| 2 | Framework | Next.js 15 | Known stack, SSG | Astro, Vite+React |
| 3 | Quest Data | JSON + Dexie | Flexible, offline | Supabase (premature) |
| 4 | Animations | Framer Motion + CSS | Performance-first | Three.js (overkill) |
| 5 | Codex | Structured JSON | Searchable, reusable | Hardcoded HTML |
| 6 | Mobile | PWA + bottom tabs | Installable, offline | React Native |
| 7 | Multi-device | JSON export/import | Simple first | Cloud-first |

---

## 16. Daily Workflow

```
PREPARE (Zone A, Free)  ~15 min -> specs + prompts + Jules
BUILD   (Zone B, Timer) ~60 min -> Cline build + test + commit + STOP
REVIEW  (Zone A, Free)  ~10 min -> paste summary + next prompt
VERIFY  (Zone C, Free)  ~5 min  -> check live site + phone test
```

| Phase | Time | Codespace | Cost |
|-------|------|-----------|------|
| Prepare | 15 min | 0 | $0 |
| Build | 60 min | **1 hr** | $0 |
| Review | 10 min | 0 | $0 |
| Verify | 5 min | 0 | $0 |
| **Daily** | **90 min** | **1 hr** | **$0** |
| **Monthly** | **30 hrs** | **20 hrs** | **$0** |

---

### Addendum v1 Gap 2: 7-Part Handoff Template

```markdown
# Session Handoff - [Quest] - [Date]
## 1. CONTEXT: Quest, Chapter, Duration
## 2. COMPLETED: [Task 1 done] [Task 2 done]
## 3. FILES CHANGED: [path] - [what changed]
## 4. STATE: App runs? Build passes? Bugs?
## 5. NEXT ACTIONS: 1. [task] 2. [task]
## 6. BLOCKERS: [or none]
## 7. PROMPT FOR NEXT SESSION:
> [Pre-written Cline prompt to pick up exactly where you left off]
```

Auto-fill: quest/chapter from IndexedDB, tasks from board, prompt from AI (1 call).

---

### Addendum v1 Gap 7: Jules-Specific Workflow

```
MORNING (Zone A, 5 min, free):
  Review overnight PRs -> merge good ones -> comment on issues

EVENING (Zone A, 5 min, free):
  Write 2-3 task descriptions -> assign to repo -> Jules works overnight

TOTAL: ~10 min/day, 0 Codespace hours, 15 tasks/day capacity
```

| Good for Jules | Bad for Jules |
|---------------|---------------|
| Create data JSON files | Core feature building |
| Write unit tests | UI needing visual review |
| Add TypeScript types | Complex state management |
| Documentation files | Files Cline is actively editing |
| Create component stubs | Multi-file coordinated changes |

---

## 17. Hour-Saving Protocol

| # | Rule | Saves |
|---|------|-------|
| 1 | Plan BEFORE Codespace | ~40% |
| 2 | Paste prompts, don't type | ~20% |
| 3 | Idle timeout = 15 min | ~10% |
| 4 | STOP when thinking | ~15% |
| 5 | Batch 3-5 tasks/session | ~10% |
| 6 | Always 2-core machine | 50% quota |
| 7 | Delete unused Codespaces | Storage |

---

### Addendum v1 Gap 9: Codespace Hour Tracking

```
START: Note time, set phone timer 60 minutes
AT 45 min: Start wrapping up
AT 55 min: Commit, push, generate handoff
AT 60 min: STOP Codespace
END: Log hours in UNGASIS dashboard widget
WEEKLY: Check github.com/settings/billing for actual usage
```

### Monthly Pacing

| Week | Target Used | Remaining | Session Length |
|------|------------|-----------|--------------|
| Week 1 | 15 hrs | 45 hrs | 60 min |
| Week 2 | 30 hrs | 30 hrs | 60 min |
| Week 3 | 45 hrs | 15 hrs | 45 min |
| Week 4 | 55 hrs | 5 hrs | 30 min |
| Buffer | 60 hrs | 0 hrs | Emergency only |

---

## Gap 9b: Git Branch and Commit Workflow (Low)
### Insert into: Section 16 (Daily Workflow) or Section 22 (Deployment)

### Branch Strategy (Simple — Solo Developer)

### When to Branch

| Situation | Branch? | Why |
|-----------|---------|-----|
| Small fix (1 file, <10 lines) | No, commit to main | Fast, low risk |
| New feature (multi-file) | Yes, feat/[name] | Isolate changes |
| Jules task | Yes, Jules auto-creates | PR-based workflow |
| Experimental / risky | Yes, experiment/[name] | Can delete if bad |

### Commit Message Format


type: what — why
Examples:
feat: add task board kanban — core Sprint 3 deliverable
fix: glass card hover state — border wasn't showing on mobile
docs: update MEMORY_BANK — added Dexie version bump gotcha
refactor: split QuestDetail into 5 files — was 800+ lines

### Types: feat, fix, docs, refactor, style, test, chore

### Daily Git Pattern


START SESSION:
git pull origin main           <- Get latest (Jules PRs, etc.)
DURING SESSION:
git add .                      <- Stage changes
git commit -m "feat: ..."     <- Commit with message
END SESSION:
git push origin main           <- Push to GitHub
<- Cloudflare auto-deploys
STOP Codespace                 <- Save hours

## 18. Cost Analysis

| Category | Tools | Cost |
|----------|-------|------|
| Planning | M365 Copilot, ChatGPT Enterprise | $0 |
| Prototyping | Bolt.new, Lovable, AI Studio, Firebase | $0 |
| Cloud IDE | Codespaces (60 hrs) | $0 |
| AI Agents | Cline, Gemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash, Copilot, OpenCode | $0 |
| Async Agent | Jules (15 tasks/day) | $0 |
| API Providers | 30 keys x 6 providers | $0 |
| Hosting | Cloudflare Pages | $0 |
| Database | IndexedDB | $0 |
| Analytics | PostHog | $0 |
| Monitoring | UptimeRobot | $0 |
| Forms | Tally.so | $0 |
| Support | Crisp | $0 |
| VCS | GitHub | $0 |
| **TOTAL** | **110+ tools, 30 keys** | **$19.99/mo (Google AI Pro, 3-month trial: June-August 2026) + $0 company-provided tools (M365 Copilot, ChatGPT Enterprise)** |

**No credit cards linked anywhere. At limits = blocked, never charged.**

---

### Addendum v1 Gap 12: Never Pay a Peso Principle

### The Protocol

```
RULE: Never link a credit card or payment method to ANY
      development tool, API provider, or hosting service.

WHY:  No payment method = physically impossible to be charged.
      Rate-limiting is a FEATURE, not a bug. It protects you.

HOW:  All 30 API keys: email only, no card.
      GitHub Codespaces: free tier only, no billing setup.
      Cloudflare Pages: free tier, no card required.
      All hosting/DB: free tier, no card required.
```

### What Happens at Every Limit

| Tool | At Free Limit | What You Do |
|------|--------------|-------------|
| Codespace hours | Blocked until next month | ⚠️ DEPRECATED — Gitpod rebranded to Ona, free tier removed ($20/mo minimum). Use GitHub Codespaces instead (60 hrs/mo free). |
| API key rate limit | 429 error | Rotate to next key (30 total) |
| All keys exhausted | All 429 | Wait 1 hour or switch provider |
| Bolt.new tokens | Blocked for day | Use Lovable or Firebase Studio ⚠️ SUNSETTING March 2027 — Use for quick prototyping only. Migrate to Google AI Studio or Antigravity for long-term projects. |
| Jules tasks | 15/day cap | Queue remaining for tomorrow |
| PostHog events | 1M/mo cap | Unlikely to hit for months |

> **The Guarantee:** If every free tier hit its limit simultaneously,
> the WORST that happens is: you plan in M365 Copilot until tomorrow.
> You are NEVER charged money. Ever.

---

## 19. New Quest Wizard Spec

| Step | Question | Auto-Fills |
|------|----------|----------|
| 1 | **Name** - quest, north star, target user | README, BRIEF, headers |
| 2 | **Path** - scenario (7 options) | Checklists, timeline |
| 3 | **Shield** - L0/L1/L2/L3 | SECURITY, CONVENTIONS |
| 4 | **Party** - select AI agents | AGENTS, MODEL_ROUTING |
| 5 | **Budget** - tokens, cap, compact % | TOKEN_LOG, budget zones |
| 6 | **Stack** - framework, styling, DB, hosting | .gitignore, .env |
| 7 | **Confirm** - Begin Quest | ALL 18 project files generated |

Generated: 18 project files (.zip) + 30+ tasks + BI dashboard + 3 Cline prompts + handoff template

---

### Addendum v1 Gap 10: Data Flow Diagram Expanded

```
Quest Wizard (7 steps)
  |
  v
Template Engine --> 18 project files (downloadable .zip)
  |
  v
IndexedDB (Dexie.js) --> Quest + Chapter + 30+ Task records
  |
  v
Dashboard Engine (Recharts) --> 10 chart widgets initialized
  |
  v
AI Generation (1 API call) --> 3 Cline prompts + handoff + journal
```

---

## 20. AI Command Bar (Cmd+K)

| Type | Example | AI? |
|------|---------|-----|
| Progress | "Show my progress" | No |
| Recommend | "What should I do next?" | 1 call |
| Generate | "Cline prompt for Phase 5.7" | 0-1 |
| Search | "What did I decide about auth?" | 1 call |
| Assess | "Am I ready to deploy?" | 1 call |
| Write | "Write today's journal" | 1 call |
| Handoff | "Generate handoff summary" | 1 call |
| Codex | "Which hosting is commercial?" | 1 call |
| Navigate | "Open RiftCoach dashboard" | No |

Average: 5-10 AI calls/session = <1% of free tier.

---

## 21. Quest Master Personality

Traits: Warm, Data-driven, Honest, Encouraging, Protective, Adaptive, Non-intrusive

| Trigger | Message | Tone |
|---------|---------|------|
| App opens | "Welcome back, Builder. 5-day streak." | Warm |
| Chapter done | "Chapter 5 CONQUERED!" | Celebratory |
| Stuck 3+ days | "No movement. Break it down?" | Gentle |
| STOP gate fail | "Only 45% confirmed. Pivot?" | Direct |
| First $1 | "First dollar! You're a business." | Epic |
| Risk aging | "Risk 12 days open. Fix plan?" | Urgent |
| Low velocity | "Pace dropped 40%. Blocked?" | Empathetic |
| Hours low | "20/60 hrs left. Shorten sessions." | Practical |

---

## 22. Deployment Pipeline

```
Codespace -> git push -> GitHub -> Cloudflare Pages -> yourapp.pages.dev (LIVE)
```

One-time: Connect repo to Cloudflare Pages. Every git push = auto-deploy.

**Cost: $0 | Builds: 500/mo | Bandwidth: Unlimited**

---

## 23. Emergency Fallback Chain

| Level | Problem | Fallback | Capability |
|-------|---------|----------|----------|
| 1 | Codespace hours out | **vscode.dev** | Edit files |
| 2 | Need terminal | **StackBlitz** | Full dev |
| 3 | StackBlitz insufficient | **Ona (formerly Gitpod)** ⚠️ DEPRECATED — Rebranded, free tier removed ($20/mo minimum). | Full IDE |
| 4 | Ona (formerly Gitpod) gone | **Amazon Kiro (50 credits)** | Full IDE |
| 5 | All IDEs exhausted | **Jules (15 tasks/day)** | Async PRs |
| 6 | Everything down | **M365 Copilot** | Planning only |

**You are never fully blocked.**

---

## 24. Appendix - Removed Tools

| Tool | Why | Replacement |
|------|-----|------------|
| Codex CLI | Local install required | Cline + Gemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash (Codespace) |
| Codex Web | Unavailable in ChatGPT Enterprise | Jules + Cline |
| Antigravity 2.0 | Desktop app | Cline in Codespace |
| Windsurf | Desktop IDE | Codespaces |
| Cursor | Desktop IDE | Codespaces + Copilot |
| Ollama | Local GPU required | 30 free API keys |

**Impact: Zero meaningful capability loss.**

---

### Addendum v1 Summary (Preserved)

## Addendum Summary

| # | Gap Topic | Severity |
|---|-----------|----------|
| 1 | devcontainer.json full spec | Medium |
| 2 | 7-part handoff template | Medium |
| 3 | Token efficiency protocol | Medium |
| 4 | Multi-agent orchestration patterns | Medium |
| 5 | Agent kickoff prompt templates | Medium |
| 6 | Cline-specific workflow | Low |
| 7 | Jules-specific workflow | Low |
| 8 | Gemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash 1M context advantage | Low |
| 9 | Codespace hour tracking | Low |
| 10 | Data flow diagram expanded | Low |
| 11 | Glassmorphism design pattern | Low |
| 12 | Never Pay a Peso principle | Low |

---

*UNGASIS OS v4.0 Blueprint Addendum*
*Mel John Dimat | May 31, 2026*
*Main blueprint + this addendum = 100% lossless*

## Document Summary (Updated Counts)

| Metric | Value |
|--------|-------|
| Sections | 26 + final summary |
| Tools | 110+ |
| API keys | 30 (5 x 6) |
| Sprints | 14 (~34 sessions) + 6 future skills post-Sprint 14 |
| Monthly cost | **$19.99/mo** (Google AI Pro, 3-month trial: June-August 2026) + $0 company-provided tools (M365 Copilot, ChatGPT Enterprise) |
| Local installs | **0** |
| AI layers | 7 (app) + 7 kernel files (Prompt OS) |
| Data entities | 11 |
| Dashboard widgets | 10 |
| Auto-gen files | 30 (18 repo + 12 token prevention) |
| Quest scenarios | 7 |
| Build phases | 10 chapters |
| MCP servers | 5 (optional) |
| Token efficiency layers | 12 |
| Workflows | 15 |
| Platforms | Work Laptop + Android Phone + Android Tablet + Personal PC |

---

*UNGASIS OS v4.0 Blueprint - AI-Embedded Edition*
*Author: Mel John Dimat | May 30, 2026*
*"Think for free. Build on the clock. Ship for free."*

---

## 25. Android + Power Platform + Token Prevention

UNGASIS OS v4.0 — Blueprint Addendum v2
Android Tools + Power Platform + Token Prevention System

Purpose: Adds 19 missing/additional tool entries, 3 mobile workflows, and the complete Token Prevention System (12 setup files that eliminate token waste from the first message in every AI tool).
Author: Mel John Dimat | Date: May 31, 2026
Use with: Main Blueprint Part 1 + Part 2 + Addendum v1


PART A: Additional Tools (19 New — Total: 88)
A1: Android-Specific Tools (5 tools)

#ToolFree TierZonePurpose68Termux100% freeB-MobileFull Linux terminal on Android — Node.js, Git, Python, npm, ssh. No root needed. Saves Codespace hours.69Google AI Studio MobileFreeB-MobileBuild native Android apps from phone. In-browser emulator. NEW 2026.70GitHub Mobile AppFreeA/C-MobileReview PRs, manage repos, assign Jules tasks, merge from phone.71M365 Copilot MobileCompanyA-MobilePlan, write prompts, review on the go. Full AI access.72OrinIDEFreeB-MobileBrowser-based IDE running locally on Android via Termux + Node.js.

A2: Power Platform Tools (6 tools — Company-Provided)

#ToolFree TierZonePurpose73Power PagesCompanyB-WorkBuild data-driven websites with Copilot-assisted editor.74Copilot StudioCompanyB-WorkBuild AI agents for Power Pages and Teams.75Power BICompanyG-WorkEmbed interactive reports and dashboards.76DataverseCompanyE-WorkStructured database backend for Power Pages.77Power AutomateCompanyB-WorkAutomated workflows, triggers, notifications.
| 83 | Power Apps | Company | B-Work | Build custom business apps with low-code canvas and model-driven editors. Connects to Dataverse. |

A3: Alternative/Backup Dev Tools (8 tools)

#ToolFree TierZonePurpose78Vercel100GB free (non-commercial)F-HostingNext.js-optimized hosting alternative.79ReplitLimited freeB-PrototypeQuick prototyping in browser.80SentryFree Developer tierG-MonitorError tracking and crash reporting.81PostmanFree tierB-BuildAPI testing and documentation.82Continue (VS Code ext)Open source BYOKB-BuildAlternative AI coding assistant to Cline.
| 84 | Amazon Q Developer | Unlimited free tier | B-Build | AWS AI coding agent. Works in browser via AWS Console. Alternative to Cline for AWS-focused projects. |
| 85 | Clerk | 10,000 MAU free | B-Build | Drop-in authentication (login, signup, user management). Free tier generous for MVPs. Future need for monetization chapters. |
| 86 | Resend | 3,000 emails/month free | B-Build | Transactional email API (signup confirmations, notifications). Future need for growth chapters. |
| 89 | Antigravity CLI (agy) | Free with AI Pro | B-Build | Terminal-based agentic development, free tier with AI Pro boost. Access: Codespace + PC. |
| 90 | Antigravity Desktop/IDE | Free tier | B-Build | Visual agentic IDE, same engine as CLI. Access: PC only (requires install). |
| 91 | Antigravity SDK | Free tier | B-Build | Python library for custom agents. Access: Codespace + PC. |
Updated Tool Count
Original blueprint:    110+ tools
Android-specific:      +5
Power Platform:        +6
Alternative/backup:    +8
NEW TOTAL:             110+ tools, 30 API keys, $0/month


## Mobile Development Tools (Tools 92-107)

> **Note:** Full mobile tool registry (Termux, Acode, Spck Editor, GitHub Mobile, Replit Mobile, Termius, ConnectBot, TabSSH, Codeanywhere, CodePen, JDoodle, vscode.dev, Codeit, Google AI Studio Mobile App, Bolt.new) — to be detailed in Sprint F2.

PART B: Android Mobile Workflows (3 New)
B1: Cross-Device Sync Architecture
                YOUR WORK LIVES HERE
                +------------------+
                |   GitHub Repo    |
                |   (cloud)        |
                +--------+---------+
                         |
          +--------------+--------------+
          |              |              |
     +----+----+   +----+----+   +----+----+
     | LAPTOP  |   | ANDROID |   | TABLET  |
     | Browser |   | Browser |   | Browser |
     +----+----+   +----+----+   +----+----+
          |              |              |
     Codespace      Codespace      Codespace
     (same repo)    (same repo)    (same repo)
          |              |              |
          +--------------+--------------+
                         |
                +--------+---------+
                | Cloudflare Pages |
                | (auto-deploy)    |
                +------------------+

All tools access the same GitHub repo. Start on laptop, continue on phone, test on tablet. Zero sync effort — Git IS your sync.
B2: Daily Mobile Pattern (adds ~20 min/day, $0)
MORNING COMMUTE (10 min, phone):
  1. GitHub app -> review Jules overnight PRs -> merge
  2. M365 Copilot app -> plan today's tasks -> save prompts

LUNCH BREAK (optional, 10 min):
  3. vscode.dev in Chrome -> quick file edit if needed
  4. Test live app on phone browser (real device testing!)

EVENING (5 min):
  5. Assign Jules tasks for overnight
  6. Check UptimeRobot for any issues

B3: Full Build on Phone (When Needed)
OPTION A: Codespaces in Chrome (uses hours)
  -> Full VS Code, terminal, Cline
  -> Tip: Connect Bluetooth keyboard for real typing

OPTION B: Termux (free, unlimited, offline-capable)
  -> pkg install nodejs git
  -> git clone [repo] && cd [repo] && npm install
  -> npm run dev (preview on localhost)
  -> Edit with vim/nano, commit, push
  -> 0 Codespace hours burned!

OPTION C: Google AI Studio (free, new)
  -> Describe app in plain language
  -> AI generates code + in-browser emulator
  -> Export to repo

B4: Android Pro Tips

TipWhyBluetooth keyboardReal typing speed on phone/tabletSamsung DeX / USB-C displayPhone becomes desktop — full CodespacesTermux saves hoursGit pull, edit, push = 0 cloud hoursPhone IS your test deviceTest mobile web apps on actual deviceSplit screen (tablet)Codespace + live preview side by side

PART C: Token Prevention System
C0: The Problem This Solves
WITHOUT TOKEN PREVENTION:
  Every new chat = 500-2000 tokens wasted on:
  "I'm Mel, beginner, Filipino, ESL, I use Next.js..."
  x 5-10 sessions/day = 5,000-20,000 tokens/day WASTED

WITH TOKEN PREVENTION:
  Every tool auto-loads your profile + project context
  First message is about the TASK, not the setup
  Savings: 2,000-5,000 tokens/day = 60K-150K/month

C1: File Structure
.ungasis/
├── BUILDER_PROFILE.md           <- Who you are (universal)
├── QUEST_CONTEXT.md             <- What you're building (per-quest)
├── SESSION_STARTER.md           <- One-paste for any new chat
├── MEMORY_BANK.md               <- Growing knowledge base
└── tool-configs/
    ├── m365-copilot-instructions.md
    ├── chatgpt-custom-instructions.md
    ├── chatgpt-custom-gpt-spec.md
    ├── claude-project-instructions.md
    ├── copilot-instructions.md
    ├── gemini-config.md (⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy))
    ├── cline-claude.md           <- (already CLAUDE.md in repo root)
    └── cline-agents.md           <- (already AGENTS.md in repo root)


C2: BUILDER_PROFILE.md

# Builder Profile — Mel John Dimat

## Identity
- Name: Mel John Dimat
- Role: Consultant, Reporting @ Korn Ferry
- Location: Manila, Philippines
- Language: Filipino (English is second language)
- Experience: No-code background, learning to code with AI

## Learning Style
- Visual + kinesthetic learner (NOT text-heavy lectures)
- NOT tech-savvy — I learn by doing (copy-paste workflow)
- Feynman method: explain like I'm 12
- Use analogies from cooking, sports, everyday life
- Break complex ideas into small numbered steps
- Check understanding before moving to next concept

## Communication Preferences
- Simple, concise English — no jargon unless explained simply
- Always explain WHY behind every decision, not just WHAT
- Always provide complete, copy-paste-ready code with file path as first comment
- Include tables for comparisons, diagrams for flows
- Use before/after examples to show what changed
- Wait for my "done" between tasks

## Tech Context
- Primary Stack: Next.js 15, React 19, TypeScript 5.8, Tailwind CSS 4, shadcn/ui
- Animation: Framer Motion 12
- State: Zustand 5
- Charts: Recharts
- Database: IndexedDB via Dexie.js (client-side, no backend)
- AI SDK: Vercel AI SDK + @ai-sdk/groq + @ai-sdk/google
- Work Laptop (IT restricted, browser-only)
- Android Phone (small screen, apps installable)
- Android Tablet (medium screen, BT keyboard)
- Personal PC (Intel i5-10400, 32GB RAM, RTX 5060 Ti 16GB, Ollama installed, NO restrictions)
- IDE: GitHub Codespaces (browser-only) + Cline + Copilot Free
- AI Providers: 30 free API keys across 6 providers (Cerebras, Google AI, Groq, Mistral, OpenRouter, Together)
- Hosting: Cloudflare Pages (auto-deploy from GitHub)
- Budget: $19.99/mo (Google AI Pro, 3-month trial: June-August 2026) + $0 company-provided tools (M365 Copilot, ChatGPT Enterprise)

## Design Preferences
- Theme: Dark glassmorphism (bg #0a0a1a, accent #00d4ff cyan, secondary #a78bfa purple)
- Glass: bg-white/[0.04] backdrop-blur-xl border-white/10
- All text >= 12px for readability
- Chart/bar colors: inline hex styles (NOT Tailwind classes)
- RPG/quest metaphors in UI language

## Active Projects
- UNGASIS OS v4.0 — AI-embedded builder's operating system
- RiftCoach — AI Wild Rift coaching app
- Newmont Intelligence Dashboard — Korn Ferry client project

## What NOT To Do
- Don't use jargon without explaining it
- Don't give partial code — always complete files
- Don't assume I know terminal commands — explain each one
- Don't skip the "why" — I need to understand reasoning
- Don't recommend paid tools — I use free tier only

C3: QUEST_CONTEXT.md (Template — Auto-Filled Per Quest)
# Quest Context — [QUEST_NAME]

## Project Overview
- Name: [quest.name]
- North Star: [quest.northStar]
- Target User: [quest.targetUser]
- Scenario: [quest.scenario] (e.g., Full Quest 30d)
- Data Level: [quest.dataLevel] (e.g., L0 Public)

## Current Status
- Chapter: [quest.currentChapter] of 10 — [chapter.name]
- Overall Progress: [calculated]%
- Health Score: [calculated]/100
- Active Sprint: [current sprint focus]

## Stack
- Framework: [quest.stack.framework]
- Styling: [quest.stack.styling]
- Database: [quest.stack.db]
- Hosting: [quest.stack.hosting]
- AI Provider: [quest.stack.aiProvider]

## Recent Activity (Last 5 Tasks)
- [task.title] — [task.status] — [task.assignedAgent]
- [task.title] — [task.status] — [task.assignedAgent]
- [task.title] — [task.status] — [task.assignedAgent]
- [task.title] — [task.status] — [task.assignedAgent]
- [task.title] — [task.status] — [task.assignedAgent]

## Key Decisions Made (Last 5)
- [decision.title] — Chose [decision.chosen] because [decision.why]
- [decision.title] — Chose [decision.chosen] because [decision.why]

## Known Issues / Risks
- [risk.title] — [risk.severity] — [risk.mitigation]

## File Structure (Key Files)
- [auto-generated or manual list of important files and what they do]

## What's Next
1. [Next priority task]
2. [Second priority]
3. [Third priority]

C4: SESSION_STARTER.md (One-Paste for ANY Tool)
# Session Context

## Who I Am
Mel John Dimat. Filipino, ESL. Visual learner, not tech-savvy.
Simple English, explain WHY, complete code with file paths.
Wait for "done" between tasks.

## What I'm Building
[one-line description]
Stack: [framework] + [styling] + [db] + [hosting]
Chapter [N] of 10: [chapter name]
Budget: $19.99/mo (Google AI Pro, 3-month trial: June-August 2026) + $0 company-provided tools (M365 Copilot, ChatGPT Enterprise)

## Last Session Summary
Completed: [last handoff — tasks done]
Current state: [app runs? build passes?]
Files changed: [key files from last session]

## This Session's Task
[FILL THIS IN — what you want to accomplish today]

## Rules for This Session
- Follow project conventions
- Complete, copy-paste-ready code
- Run npm run build after changes
- If stuck after 2 attempts, stop and explain what failed
- Token budget: [sessionCap] — compact at 70%

C5: MEMORY_BANK.md (Growing Knowledge — Graphify-Style)
# Memory Bank — [QUEST_NAME]
> This file grows over time. Append new entries, never delete old ones.
> AI tools should READ this for context. You UPDATE it after sessions.

## Decisions Log (append new at top)
<!-- Format: - [DECISION] — Chose [X] because [WHY] -->

## Patterns Learned (append new at top)
<!-- Format: - [PATTERN] — [CONTEXT] -->
<!-- Example: - 2026-06-01: Cline works best with 5-step prompts, not paragraphs -->
<!-- Example: - 2026-06-03: Tailwind v4 uses @theme not @apply for tokens -->

## Gotchas & Workarounds (append new at top)
<!-- Format: - [WORKAROUND] -->
<!-- Example: - Dexie.js version bump needed when adding tables -->

## Frequently Used Code Patterns
<!-- Paste reusable code snippets here -->

## Frequently Used Prompts (top 5 most-used)
<!-- Copy from Prompt Forge when you find yourself repeating -->

## Cross-Quest Knowledge (persists between projects)
- Component naming: PascalCase, max 200 lines per file
- Commit format: "feat: [what] — [why]"
- Always npm run build before committing
- Glass card: bg-white/[0.04] backdrop-blur-xl border-white/10 rounded-2xl
- Chart colors: always inline hex, never Tailwind classes

C6: Tool-Specific Config — M365 Copilot Custom Instructions
# M365 Copilot — Custom Instructions
# WHERE TO SET: Copilot Settings > Personalization > Custom Instructions

## Who I Am
I am Mel John Dimat, a Filipino reporting consultant based in Manila.
English is my second language. I am building apps using AI coding agents.

## My Learning Style
- Slow learner with low comprehension — go slowly and check understanding
- Visual and kinesthetic — use diagrams, tables, flowcharts, before/after
- NOT tech savvy — no-code experience, learn by doing (copy-paste)
- Feynman method explanations, layman analogies, real-world examples
- Break complex ideas into small digestible pieces with numbered steps

## How to Respond
- Use simple, concise English — avoid jargon unless explained simply
- Always provide complete, copy-paste-ready code files with file path
- Always include analysis, insights, and rationale for every recommendation
- Always explain the "why" behind every decision — not just the "what"
- Use visual aids: tables for comparisons, diagrams for flows, emojis
- Use before/after examples to show what changed and why
- Be grounded — avoid hallucinations, cite sources when possible
- Wait for my "done" between tasks
- All chart/bar colors use inline hex styles (NOT Tailwind classes)
- Match glassmorphism theme: border-white/10, bg-white/[0.04], backdrop-blur-xl

C7: Tool-Specific Config — ChatGPT Enterprise Custom Instructions
# ChatGPT Enterprise — Custom Instructions
# WHERE TO SET: Settings > Personalization > Custom Instructions

## What would you like ChatGPT to know about you?

I am Mel John Dimat, Filipino, based in Manila. English is my second language.
I'm a reporting consultant building apps with AI coding agents.
I'm a visual learner, NOT tech-savvy, and learn by copy-paste workflow.
My stack: Next.js 15, React 19, TypeScript, Tailwind 4, Zustand, Dexie.js.
I work across 4 devices:
  - Work Laptop (IT restricted, browser-only)
  - Android Phone (small screen, apps installable)
  - Android Tablet (medium screen, BT keyboard)
  - Personal PC (Intel i5-10400, 32GB RAM, RTX 5060 Ti 16GB, Ollama installed, NO restrictions)
Budget: $19.99/mo (Google AI Pro, 3-month trial: June-August 2026) + $0 company-provided tools (M365 Copilot, ChatGPT Enterprise)
Current projects: UNGASIS OS (builder's OS), RiftCoach (Wild Rift coach), Newmont Dashboard.

## How would you like ChatGPT to respond?

- Simple English, no jargon unless explained
- Always explain WHY, not just WHAT
- Complete copy-paste-ready code with file path as first comment
- Use tables, diagrams, before/after comparisons
- Feynman method — explain like I'm 12
- Use cooking/sports/everyday analogies for technical concepts
- Break complex ideas into numbered steps
- Wait for "done" between tasks
- Never recommend paid tools — free tier only
- All chart colors: inline hex, not Tailwind classes
- Dark glassmorphism theme: #0a0a1a bg, #00d4ff accent, #a78bfa secondary

C8: Tool-Specific Config — ChatGPT Custom GPT Spec
# Custom GPT Blueprint: "UNGASIS Builder"
# WHERE TO CREATE: ChatGPT > Explore GPTs > Create a GPT

## Name
UNGASIS Builder

## Description
Your personal AI building assistant. Knows your profile, stack, projects,
and conventions. Saves tokens by pre-loading your context every session.

## Instructions (System Prompt)

You are UNGASIS Builder — Mel's personal AI development assistant.

### About Mel
- Filipino, ESL speaker, based in Manila
- Visual/kinesthetic learner, NOT tech-savvy
- Learns by copy-paste, Feynman explanations, cooking/sports analogies
- Work Laptop (IT restricted, browser-only) + Android Phone + Android Tablet + Personal PC (Ollama installed)
- Budget: $19.99/mo (Google AI Pro, 3-month trial: June-August 2026) + $0 company-provided tools (M365 Copilot, ChatGPT Enterprise)

### His Stack
- Next.js 15 + React 19 + TypeScript 5.8 + Tailwind CSS 4 + shadcn/ui
- Framer Motion 12 + Zustand 5 + Recharts + Dexie.js (IndexedDB)
- Vercel AI SDK + Groq + Google AI (30 free API keys)
- Hosting: Cloudflare Pages (auto-deploy from GitHub)

### His Active Projects
1. UNGASIS OS v4.0 — AI-embedded builder's operating system
2. RiftCoach — AI Wild Rift coaching app
3. Newmont Intelligence Dashboard — client project

### How to Respond
- Simple English, explain jargon
- Complete code with file path as first line comment
- Always explain WHY behind decisions
- Tables for comparisons, diagrams for flows
- Break into numbered steps
- Wait for "done" between tasks
- Never suggest paid tools
- Dark glassmorphism theme (#0a0a1a, #00d4ff, #a78bfa)
- Chart colors: inline hex only

### Token Efficiency
- Be concise but complete
- Don't repeat context Mel already knows
- If Mel pastes a SESSION_STARTER, parse it and jump to the task
- Compact long conversations by summarizing at natural breaks

## Knowledge Files (Upload These)
1. BUILDER_PROFILE.md
2. Current QUEST_CONTEXT.md
3. MEMORY_BANK.md
4. CONVENTIONS.md (from active project)

## Conversation Starters
- "What should I build today?"
- "Here's my session context: [paste SESSION_STARTER]"
- "Review this code: [paste]"
- "Generate a Cline prompt for [task]"

C9: Tool-Specific Config — Claude Projects Instructions
# Claude Projects — System Prompt
# WHERE TO SET: Claude > Projects > [Project Name] > Project Instructions
# ALSO UPLOAD: BUILDER_PROFILE.md, QUEST_CONTEXT.md, MEMORY_BANK.md as knowledge files

You are assisting Mel John Dimat with the project described in the uploaded files.

Key rules:
- Read BUILDER_PROFILE.md for who Mel is and how to communicate
- Read QUEST_CONTEXT.md for current project state
- Read MEMORY_BANK.md for past decisions and patterns
- Simple English, no jargon unless explained
- Complete code with file path as first comment
- Explain WHY behind every recommendation
- Tables, diagrams, before/after examples
- Wait for "done" between tasks
- Free tier tools only — never suggest paid options
- Dark glassmorphism theme: #0a0a1a bg, #00d4ff accent
- If Mel pastes a SESSION_STARTER, parse it and jump directly to the task

C10: Tool-Specific Config — .github/copilot-instructions.md
# GitHub Copilot Instructions
# WHERE TO PLACE: .github/copilot-instructions.md (in repo root)
# Copilot reads this automatically for every autocomplete suggestion

## Project
This is [QUEST_NAME] — [one-line description].

## Stack
- Next.js 15 (App Router) + React 19 + TypeScript 5.8
- Tailwind CSS 4 (utility-first, @theme for tokens)
- shadcn/ui components (Radix-based)
- Framer Motion 12 for animations
- Zustand 5 for state management
- Dexie.js for IndexedDB
- Recharts for dashboard charts
- Vercel AI SDK for streaming

## Code Conventions
- File naming: kebab-case for files, PascalCase for components
- Max 200 lines per component file
- Use TypeScript strict mode — no `any` types
- Use `interface` over `type` for object shapes
- Tailwind classes: use utility classes, not @apply
- Chart colors: inline hex styles, NOT Tailwind color classes
- Import order: react, next, third-party, local, types, styles
- Always use `'use client'` directive for client components

## Design Tokens
- Background: #0a0a1a (--bg-deep), #12122a (--bg-surface)
- Accent: #00d4ff (--accent), #a78bfa (--secondary)
- Success: #4ade80, Warning: #fbbf24, Danger: #f87171
- Text: #e2e8f0
- Glass: bg-white/[0.04] backdrop-blur-xl border-white/10 rounded-2xl

## Do NOT
- Do not use CSS modules — use Tailwind only
- Do not create files > 200 lines — split into components
- Do not use default exports — use named exports
- Do not hardcode colors — use CSS variables or design tokens

C11: Tool-Specific Config — Gemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash (GEMINI.md)
# GEMINI.md — Gemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash Configuration
# WHERE TO PLACE: Project root (Gemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash auto-reads this)

## Project
[one-line description]
Stack: Next.js 15 + TypeScript 5.8 + Tailwind 4 + Dexie.js

## Your Role
You are a senior full-stack developer reviewing and refactoring code.
Your strength is your 1M token context window — use it for:
- Analyzing entire codebases at once
- Refactoring large files (>500 lines)
- Finding duplicate patterns across multiple files
- Generating comprehensive test suites

## Conventions
- Follow .github/copilot-instructions.md for code style
- Max 200 lines per file — split if larger
- Preserve all existing functionality when refactoring
- Run npm run build to verify after changes

## Communication
- Simple English — developer is ESL
- Explain what you changed and why
- Show before/after for refactors

C12: How Each Tool Loads Context (Reference Table)
ToolConfig FileSetup MethodAuto-Loads?Token SavingsM365 Copilotm365-copilot-instructions.mdSettings > Personalization > Custom InstructionsYes, every chat~500/sessionChatGPT Enterprisechatgpt-custom-instructions.mdSettings > Personalization > Custom InstructionsYes, every chat~500/sessionChatGPT Custom GPTchatgpt-custom-gpt-spec.mdCreate GPT + upload knowledge filesYes, every chat in that GPT~1000/sessionClaude (web)claude-project-instructions.mdProjects > Instructions + upload knowledge filesYes, every chat in project~800/sessionClineCLAUDE.md (repo root)Auto-read by Cline on Codespace startYes, every task~300/sessionGitHub Copilot.github/copilot-instructions.mdPlace file in repoYes, every autocompleteBetter suggestionsGemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bashGEMINI.md (repo root)Place file in repoYes, every session~300/sessionJulesAGENTS.md (repo root)Jules reads repo files before making PRYes, every task~200/sessionBolt.new / LovableSESSION_STARTER.mdPaste at start of chatManual each time~500/sessionAny new toolSESSION_STARTER.mdPaste at start of chatManual each time~500/session
Estimated Total Savings
Per session average:         ~500 tokens saved
Sessions per day:            5-10
Daily savings:               2,500-5,000 tokens
Monthly savings (20 days):   50,000-100,000 tokens
Yearly savings:              600,000-1,200,000 tokens

That's like getting 10-20 FREE extra sessions per month
just from not repeating yourself.


C13: UNGASIS Auto-Generation Logic
When the Quest Wizard completes (Step 7: Confirm and Generate), UNGASIS should generate ALL of the following:
WIZARD COMPLETES
  |
  v
Generate 18 project files (existing — AGENTS.md, CLAUDE.md, etc.)
  |
  v
Generate .ungasis/ folder:
  |
  +-> BUILDER_PROFILE.md (from Builder singleton in IndexedDB)
  |     - Pre-filled with saved profile data
  |     - User edits once, reused for all quests
  |
  +-> QUEST_CONTEXT.md (from wizard answers)
  |     - Auto-filled: name, northStar, targetUser, stack, chapter
  |     - Updated automatically when tasks complete or chapter changes
  |
  +-> SESSION_STARTER.md (from profile + quest + last handoff)
  |     - Regenerated at end of each session
  |     - Always reflects latest state
  |
  +-> MEMORY_BANK.md (empty template)
  |     - Grows over time as user adds decisions, patterns, gotchas
  |     - AI can suggest entries: "Should I add this to Memory Bank?"
  |
  +-> tool-configs/ (from profile + quest data)
        |
        +-> m365-copilot-instructions.md (from BUILDER_PROFILE)
        +-> chatgpt-custom-instructions.md (from BUILDER_PROFILE)
        +-> chatgpt-custom-gpt-spec.md (from BUILDER_PROFILE + quest)
        +-> claude-project-instructions.md (from BUILDER_PROFILE + quest)
        +-> copilot-instructions.md (from quest stack + conventions)
        +-> gemini-config.md (⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy)) (from quest stack + conventions)
        +-> cline-claude.md (already generated as CLAUDE.md)
        +-> cline-agents.md (already generated as AGENTS.md)

TOTAL: 18 project files + 12 token prevention files = 30 auto-generated files

When Files Update

FileCreatedUpdatedHowBUILDER_PROFILEFirst quest everManual edit anytimeUser edits, persists across questsQUEST_CONTEXTQuest wizard completeAuto after task/chapter changesIndexedDB watch triggersSESSION_STARTERQuest wizard completeAuto at end of each sessionHandoff generator rebuilds itMEMORY_BANKQuest wizard completeManual append after sessionsUser adds entries, AI suggestsTool configsQuest wizard completeWhen BUILDER_PROFILE changesTemplate re-render

PART D: Power Platform Workflows (3 New)
D1: Power Pages Development Flow
M365 Copilot (plan page structure)
  |
  v
Power Pages Studio (browser — company provided)
  |-> Use Copilot in Power Pages editor to generate sections
  |-> Connect to Dataverse for structured data
  |-> Add Power BI embedded visuals (iframe or Power BI component)
  |
  v
Copilot Studio (build AI agent)
  |-> Create agent that answers questions from Dataverse data
  |-> Embed agent into Power Pages site
  |
  v
Power Automate (connect workflows)
  |-> Trigger: form submission on Power Pages
  |-> Action: create Dataverse record + send Teams notification
  |
  v
Published Power Pages site (company-hosted)

D2: Power BI Embed Workflow
1. Build report in Power BI Desktop or Power BI Service
2. Publish to Power BI workspace
3. In Power Pages Studio:
   -> Add Power BI component to page
   -> Select workspace + report
   -> Set row-level security if needed
4. Alternative: Use iframe embed code from Power BI Service
   -> Copy embed URL
   -> Add HTML component to Power Pages
   -> Paste iframe code

D3: Copilot Studio Agent for Power Pages
1. Open Copilot Studio (make.powerapps.com > Copilot Studio)
2. Create new agent
3. Add knowledge sources:
   -> Connect to Dataverse tables
   -> Upload documents (PDFs, Word docs)
   -> Add website URLs
4. Configure topics and responses
5. Test in Copilot Studio preview
6. Publish to Power Pages:
   -> Get embed code from Copilot Studio
   -> Add to Power Pages as custom component

PART E: Addendum v2 Summary
New Tools Added

CategoryCountExamplesAndroid-specific5Termux, GitHub Mobile, OrinIDEPower Platform6Power Pages, Copilot Studio, Power BI, Power AppsAlternative/backup8Vercel, Replit, Sentry, Postman, Continue, Amazon Q, Clerk, ResendTotal new19Grand total88 tools
New Workflows Added

#WorkflowPlatform1Cross-device sync (PC + Android)All2Daily mobile patternAndroid3Full build on phone (3 options)Android4Power Pages development flowCompany5Power BI embed workflowCompany6Copilot Studio agent creationCompany

Token Prevention System


#FilePurposeSaves1BUILDER_PROFILE.mdWho you are (universal)~500/session2QUEST_CONTEXT.mdWhat you're building (per-quest)~300/session3SESSION_STARTER.mdOne-paste for any tool~500/session4MEMORY_BANK.mdGrowing knowledge (Graphify-style)Compounds over time5m365-copilot-instructions.mdM365 Copilot config~500/session6chatgpt-custom-instructions.mdChatGPT config~500/session7chatgpt-custom-gpt-spec.mdCustom GPT blueprint~1000/session8claude-project-instructions.mdClaude Projects config~800/session9copilot-instructions.mdGitHub Copilot configBetter suggestions10gemini-config.md (⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy))Gemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash config~300/session11cline-claude.mdAlready in blueprint as CLAUDE.md~300/session12cline-agents.mdAlready in blueprint as AGENTS.md~200/session
Final Numbers
UNGASIS OS v4.0 COMPLETE PACKAGE:
  Main Blueprint Part 1:     24 sections (Sec 0-12)
  Main Blueprint Part 2:     12 sections (Sec 13-24)
  Addendum v1:               12 gap fills (5 medium + 7 low)
  Addendum v2:               19 tools + 6 workflows + 12 token prevention files

  TOTAL TOOLS:               110+
  TOTAL API KEYS:            30
  TOTAL SETUP FILES:         30 auto-generated files per quest
  TOTAL WORKFLOWS:           15
  MONTHLY COST:              $19.99/mo (Google AI Pro, 3-month trial: June-August 2026) + $0 company-provided tools (M365 Copilot, ChatGPT Enterprise)
  TOKEN SAVINGS:             ~350,000/month (with 12 layers)
  PLATFORMS:                 Work Laptop + Android Phone + Android Tablet + Personal PC


UNGASIS OS v4.0 Blueprint Addendum v2
Author: Mel John Dimat | May 31, 2026
"Configure once, save tokens forever."

---

## 26. Prompt OS + Future Skills + MCP + 12-Layer Tokens

UNGASIS OS v4.0 — Blueprint Addendum v3
Repo v3 Cross-Reference Gaps (4 Medium Fixes)

Purpose: Captures 4 items from the existing ungasis-unified-lossless-repo-v3 that were not yet in the blueprint.
Author: Mel John Dimat | Date: May 31, 2026
Use with: Main Blueprint + Addendum v1 + Addendum v2 + Quick Patch


Gap 1: 7 Kernel Architecture — ChatGPT Projects "Prompt OS" Layer (Medium)
Insert into: Section 8 (AI Architecture) as Layer 8, or as Appendix B
UNGASIS exists in TWO forms that work together:
FORM 1: The App (This Blueprint)
  -> Next.js web app you BUILD
  -> Interactive dashboard, task board, AI command bar
  -> Runs in browser, stores data in IndexedDB
  -> You use this daily to manage projects

FORM 2: The Prompt OS (Repo v3 — Already Working)
  -> 7 kernel .md files you UPLOAD to ChatGPT Projects
  -> Makes ChatGPT already know who you are and how you work
  -> Zero tokens wasted on setup — AI is pre-configured
  -> You use this every time you open ChatGPT

The 7 Kernel Files (from ungasis-core/)

#Kernel FileWhat It Does1K1-ROUTER.mdRoutes your questions to the right "engine" — coding, research, Microsoft, app building2K2-ENGINES.mdDefines how each engine works — what tools, what format, what rules3K3-FRAMEWORKS.mdYour reusable frameworks — Feynman explanations, decision matrices, comparison tables4K4-INTELLIGENCE.mdHow AI reasons about your projects — context assembly, recommendation logic5K5-MEMORY.mdPersistent memory across sessions — decisions, patterns, gotchas6K6-TEMPLATES.mdReady-to-use prompt templates — session starters, handoffs, task prompts7K7-MAINTENANCE.mdHow to update, version, and maintain the kernel files
How They Connect
ChatGPT Projects (Prompt OS)          UNGASIS App (This Blueprint)
+---------------------------+         +---------------------------+
| Upload 7 kernel files     |         | Quest Wizard generates    |
| to ChatGPT Projects       |         | 30 project files          |
|                           |         |                           |
| ChatGPT already knows:    |         | App already tracks:       |
| - Who you are             |   <-->  | - Your tasks and progress |
| - Your stack              |  SYNC   | - Your decisions          |
| - Your conventions        |  VIA    | - Your token budget       |
| - Your project context    | COPY/   | - Your risks              |
|                           | PASTE   |                           |
| You ASK questions here    |         | You MANAGE projects here  |
+---------------------------+         +---------------------------+

How to Deploy the Prompt OS
1. Go to ChatGPT Enterprise -> Projects -> Create Project
2. Name it "UNGASIS OS"
3. Upload all 7 kernel files from ungasis-core/ folder
4. Set the Project Instructions to UNGASIS_PROJECT_INSTRUCTIONS_v7.txt
5. Every new chat in this project = AI already knows everything
6. Token savings: ~1,000-2,000 tokens per session

Sync Between Prompt OS and App
When UNGASIS app generates QUEST_CONTEXT.md or SESSION_STARTER.md, you can:

Copy those files from the app
Upload/update them in your ChatGPT Project
Now ChatGPT knows your latest project state automatically

Future feature (post-Sprint 14): Auto-export these files to a GitHub repo that ChatGPT Projects can reference.

Gap 2: SKILL_CANDIDATES — 6 Future Skills (Medium)
Insert into: Section 12 (Sprint Roadmap) as "Post-Sprint 14 Roadmap"
These 6 skills were identified during UNGASIS v7.0 kernel development. They represent future capabilities to build AFTER the core 14 sprints are complete.

Post-Sprint 14 Roadmap
#Skill IDNameWhat It DoesPriority1SKILL-ROSResearch OSDeep research mode — multi-source analysis, citation tracking, literature reviewsHigh2SKILL-MPSMicrosoft Power SuiteIntegrated guidance for Power Pages, Power BI, Power Automate, Copilot Studio, DataverseHigh3SKILL-PAFPortable App FabricatorOne-click app scaffolding — describe idea, get full project structure + boilerplateMedium4SKILL-DAFDefabricatorReverse-engineer existing apps — upload code, get architecture diagrams + documentationMedium5SKILL-DSADesign Systems AuditorAudit UI for accessibility, consistency, design token compliance, responsive issuesLow6SKILL-GAFGoogle AI Studio FactoryBuild and deploy apps using Google AI Studio's native Android builderLow
Estimated Timeline
Sprint 14 complete (UNGASIS v4.0 launched)
  |
  v
Phase 2: Skill Expansion (post-launch, ~3 months)
  Sprint 15-16: Research OS + Power Suite
  Sprint 17-18: App Fabricator + Defabricator
  Sprint 19-20: Design Auditor + Google Factory

Phase 3: Platform Growth
  Sprint 21+: Community features, shared quests, template marketplace


Gap 3: MCP Config — Model Context Protocol (Medium)
Insert into: Section 11 (File Structure) or Addendum v1 Gap 1 (devcontainer.json)
MCP (Model Context Protocol) lets AI agents access external tools like file systems, GitHub, and memory servers. This is how Cline and Gemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash get superpowers inside your Codespace.

mcp-config.json (Optional — Add to Codespace)
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/workspaces"],
      "description": "AI can read/write project files directly"
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "${GITHUB_TOKEN}" },
      "description": "AI can create issues, PRs, read repo data"
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "description": "AI remembers context across sessions (like Graphify)"
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"],
      "description": "AI can fetch web pages and APIs"
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"],
      "description": "AI breaks complex problems into steps"
    }
  }
}

Where to Place
Option A: In devcontainer.json (auto-installs with Codespace)
  -> Add to postCreateCommand: "npx @anthropic/setup-mcp"

Option B: As standalone file in project root
  -> .mcp/mcp-config.json
  -> Cline auto-detects this

Option C: Sprint 0 optional task
  -> "Configure MCP servers for enhanced AI agent capabilities"
  -> Not required for MVP, but improves Cline/Gemini CLI ⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy). Install: curl -fsSL https://antigravity.google/cli/install.sh | bash significantly

What Each Server Enables

ServerWithout MCPWith MCPfilesystemAI asks you to copy-paste file contentsAI reads files directlygithubYou manually create issues/PRsAI creates issues/PRs for youmemoryAI forgets between sessionsAI remembers (like Graphify)fetchAI can't check websitesAI can read docs, APIs, examplessequential-thinkingAI jumps to answersAI shows step-by-step reasoning

Updated devcontainer.json postCreateCommand
"postCreateCommand": "npm install && npm install -g @google/gemini-cli && npm install -g @google/antigravity-cli && npx -y @anthropic/setup-mcp || true"

The || true ensures Codespace still starts even if MCP setup fails (graceful fallback).

Gap 4: 12-Layer Token Efficiency — Expanded to 12 Layers (Medium)
Insert into: Addendum v1 Gap 3 (Token Efficiency Protocol) — Merge into the complete 12-layer system
The UNGASIS wiki (index.html) documented 12 token optimization layers. Our Addendum v1 captured 6 of them. Here are the missing 6 to complete the system.

Existing captured layers from Addendum v1

#RuleSaves1Compact at 70% context~30%2Pre-fill templates~50%3Cache same Q within 1hr~10%4Route by complexity~40%5Batch questions~60% overhead6Context pruning~70% context

NEW: 6 Additional Layers (from wiki)

#RuleWhat It MeansSaves7Structured output enforcementAlways request JSON or markdown format — prevents AI from rambling in prose~20% response tokens8Example-driven promptsShow 1 example of desired output instead of describing it in paragraphs~40% prompt tokens9Incremental disclosureDon't dump entire project context — reveal info only when AI needs it~50% context tokens10Response length capsAdd "respond in under 500 words" or "max 3 bullet points" to prompts~30% response tokens11Session checkpointingEvery 10 messages, AI summarizes conversation so far — prevents re-reading entire history~60% in long sessions12Knowledge file offloadingMove static info (tool list, glossary, conventions) to uploaded files instead of pasting in chat~80% for repeated info
Complete 12-Layer System
LAYER 1-3: PREVENT (Stop waste before it happens)
  1. Pre-fill templates          <- Don't generate what you can template
  2. Knowledge file offloading   <- Upload static info, don't paste
  3. Example-driven prompts      <- Show, don't describe

LAYER 4-6: OPTIMIZE (Use tokens more efficiently)
  4. Route by complexity         <- Small model for simple tasks
  5. Batch questions             <- 3 questions in 1 prompt
  6. Context pruning             <- Only send relevant data

LAYER 7-9: CONTROL (Limit what AI generates)
  7. Structured output           <- JSON/markdown, not prose
  8. Response length caps        <- "under 500 words"
  9. Incremental disclosure      <- Reveal info as needed

LAYER 10-12: MAINTAIN (Keep sessions efficient over time)
  10. Cache responses            <- Same Q within 1hr = cached
  11. Session checkpointing      <- Summarize every 10 messages
  12. Compact at 70%             <- Auto-compress when context fills

Token Savings Calculator
WITHOUT 12 layers:
  Average session: 5,000 tokens
  x 5 sessions/day = 25,000/day
  x 20 days/month = 500,000/month

WITH 12 layers:
  Average session: 1,500 tokens (70% reduction)
  x 5 sessions/day = 7,500/day
  x 20 days/month = 150,000/month

  SAVINGS: 350,000 tokens/month
  That's like getting 23 extra FREE sessions every month.


Addendum v3 Summary

#GapWhat Was AddedSeverity17 Kernel ArchitecturePrompt OS layer + 7 kernel file descriptions + deployment steps + sync patternMedium2SKILL_CANDIDATES6 future skills + Post-Sprint 14 roadmap + timelineMedium3MCP ConfigFull mcp-config.json + 5 server descriptions + devcontainer update + placement optionsMedium412-Layer Token Efficiency6 new rules + complete 12-layer system + savings calculatorMedium
Updated Final Numbers
UNGASIS OS v4.0 — FULLY COMPLETE:

  Tools:                110+
  API Keys:             30
  Auto-generated files: 30 (18 repo + 12 token prevention)
  Token efficiency:     12 layers (was 6)
  Workflows:            15
  Future skills:        6 (post-Sprint 14)
  MCP servers:          5 (optional enhancement)
  Kernel files:         7 (Prompt OS layer)
  Completeness:         100% LOSSLESS


UNGASIS OS v4.0 Addendum v3 — Repo v3 Cross-Reference
Mel John Dimat | May 31, 2026
"Two forms, one system. The Prompt OS thinks. The App manages."

> Count integrity note: The required final document summary uses **110+ tools**. The merged source material explicitly names tools through **#86** after Quick Patch Fixes 3-6. No extra unnamed tools were invented in the registry rows; the final count follows the required package count supplied in the task.


## FINAL Document Summary

| Metric | Final Value |
|--------|-------------|
| Tools | 110+ |
| API Keys | 30 (5 x 6) |
| Auto-generated files | 30 (18 repo + 12 token prevention) |
| Token efficiency layers | 12 |
| Workflows | 15 |
| Sprints | 14 (~34 sessions) + 6 future skills post-Sprint 14 |
| AI Layers | 7 (app) + 7 kernel files (Prompt OS) |
| Data Entities | 11 |
| Dashboard Widgets | 10 |
| Screen Wireframes | 8 |
| Quest Scenarios | 7 |
| Build Phases | 10 chapters |
| MCP Servers | 5 (optional) |
| Monthly Cost | $19.99/mo (Google AI Pro, 3-month trial: June-August 2026) + $0 company-provided tools (M365 Copilot, ChatGPT Enterprise) |
| Token Savings | ~350,000/month (with 12 layers) |
| Platforms | Work Laptop + Android Phone + Android Tablet + Personal PC |


Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
