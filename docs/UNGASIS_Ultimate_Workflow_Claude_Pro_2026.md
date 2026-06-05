# UNGASIS Ultimate Workflow — Claude Pro Edition
> **The Complete Idea → Revenue Pipeline | June 2026**
> **Monthly Investment:** $40/mo (Claude Pro $20 + Google AI Pro $20)
> **Free via Company:** M365 Copilot Opus + ChatGPT Enterprise

---

## 1. YOUR TOOL STACK (4 Pillars + Supporting Tools)

### The 4 Pillars

| Pillar | Tool | Cost | Role | Models |
|--------|------|------|------|--------|
| 🧠 **Architect** | M365 Copilot (Opus) | $0 (company) | Planning, architecture, handoffs, custom instructions, memory | Claude Opus 4.8 |
| ⚡ **Builder** | Claude Pro + Claude Code CLI | $20/mo | Autonomous coding, multi-file edits, subagents, tests, PRs | Opus 4.8 + Sonnet 4.6 |
| 🤖 **Orchestrator** | Google AI Pro + Antigravity IDE | $20/mo | Agent Manager, parallel tasks, Graphify, skills | Gemini 3.5 Flash |
| 🔬 **Researcher** | ChatGPT Enterprise | $0 (company) | Deep research, analysis, second opinions, data viz | GPT-5.5 |

### Supporting Tools

| Tool | Role | When to Use |
|------|------|-------------|
| VS Code + Copilot GPT-4.1 | Autocomplete, inline fixes | During active coding sessions |
| Cline Extension | Precise multi-insertion edits | When Claude Code is at rate limit |
| Ollama (Desktop) | Local models for autocomplete | Offline/privacy-sensitive work |
| Graphify | Knowledge graph indexer | Auto-runs on prebuild |

### NEW with Claude Pro ($20/mo)

| Feature | What It Does | Impact |
|---------|-------------|--------|
| **Claude Code CLI** | Agentic coding in terminal — reads codebase, writes files, runs tests, creates PRs | Replaces Cline for heavy tasks |
| **Claude Cowork** | Claude works with your files/apps in background | Scheduled maintenance tasks |
| **CLAUDE.md Auto-Load** | Your repo's CLAUDE.md becomes instant context | Zero copy-paste, agents know rules |
| **Up to 8 Subagents** | Parallel autonomous workers, worktree-isolated | 50-70% faster complex tasks |
| **/batch Command** | Splits work into 5-30 worktree-isolated subagents | Massive parallelism |
| **Hooks System** | Pre/post execution hooks for security, logging, cost | Token tracking, guardrails |
| **MCP Integration** | Connect to external tools natively | Database, API, browser access |
| **~45 Opus / 5hr window** | High-intelligence messages for architecture decisions | Complex reasoning tasks |
| **Research Mode** | Multi-step deep research with citations | Data validation, competitive analysis |

---

## 2. THE 8-STAGE PIPELINE: Idea → Revenue

### Stage 1: 💡 IDEA (Brainstorm & Validate)
> Duration: 1-2 hours | Token cost: ~$0

| Task | Primary Tool | Secondary | What Happens |
|------|-------------|-----------|-------------|
| Brainstorm features | M365 Opus | ChatGPT | Opus has your memory, knows your projects |
| Market research | ChatGPT Enterprise | Claude Research | GPT-5.5 web search + analysis |
| Validate with data | Claude Pro Research | ChatGPT | Claude multi-step research with citations |
| Competitive analysis | ChatGPT Enterprise | Claude | Deep web crawl, structured comparison |
| User persona creation | M365 Opus | — | Leverages your stored user profile/context |

**Claude Code adds:** Research mode validates ideas with multi-step reasoning + web search before you write a single line of code.

**RiftCoach example:** *"Research Wild Rift coaching apps in app stores. Compare features, ratings, monetization models. Report gaps RiftCoach can fill."*

---

### Stage 2: 🎨 DESIGN (UI/UX & Architecture)
> Duration: 2-4 hours | Token cost: ~$0-2

| Task | Primary Tool | Secondary | What Happens |
|------|-------------|-----------|-------------|
| Architecture blueprint | M365 Opus | — | Opus generates full system design with tables |
| Data modeling | M365 Opus | Claude Code | Opus designs schemas, Claude Code creates files |
| Component hierarchy | Claude Code CLI | VS Code | Claude reads existing codebase, suggests structure |
| UI wireframe specs | M365 Opus | ChatGPT | Text-based component specs |
| API design | Claude Code CLI | M365 Opus | Claude reads existing routes, generates new ones |

**Claude Code adds:** Reads your ENTIRE codebase via CLAUDE.md context — suggests architecture that fits what already exists, not generic patterns.

**Before:** You'd describe your codebase to Opus in chat (300+ tokens) → paste code → get suggestions → manually apply.
**After:** Claude Code reads `src/` directly → understands existing patterns → generates architecture docs that reference your actual files.

---

### Stage 3: 📋 PLAN (Sprints & Agent Prompts)
> Duration: 1-2 hours | Token cost: ~$0

| Task | Primary Tool | Secondary | What Happens |
|------|-------------|-----------|-------------|
| Sprint planning | M365 Opus | — | Your project manager — generates sprint tasks |
| Handoff documents | M365 Opus | — | Creates .md files for agent execution |
| Agent prompts | M365 Opus | Claude Code | Opus writes prompts, Claude validates executability |
| Risk assessment | ChatGPT Enterprise | — | Second opinion on timeline/complexity |
| File ownership map | Claude Code CLI | — | `claude "map which files each agent should touch"` |

**Claude Code adds:** Before you even start building, Claude Code can analyze your codebase and tell you which files need changes, potential conflicts, and optimal agent boundaries.

**RiftCoach example:** `claude "Given Phase 6.0 plan, analyze src/lib/ and map which files each of the 6 agents should own. Flag any shared dependencies."`

---

### Stage 4: 🔨 BUILD (Code Generation)
> Duration: 4-8 hours per sprint | Token cost: ~$5-15

**THIS IS WHERE CLAUDE PRO CHANGES EVERYTHING**

| Task | Primary Tool | Secondary | What Happens |
|------|-------------|-----------|-------------|
| Foundation scaffolding | Claude Code CLI | — | Creates types, configs, boilerplate across files |
| Multi-file feature | Claude Code `/batch` | — | Splits into 5-8 subagents, each isolated worktree |
| Single file precision | Claude Code CLI | VS Code Copilot | Claude edits, Copilot autocompletes |
| Parallel 6-agent build | Antigravity Agent Manager | Claude Code | Antigravity for Gemini agents, Claude for Opus agents |
| Complex refactor | Claude Code CLI | Cline | Opus 4.8 for reasoning, Cline as backup |
| Quick fixes | VS Code Copilot GPT-4.1 | — | Inline autocomplete for typos, imports |
| Local autocomplete | Ollama (devstral) | — | Offline/fast, no token cost |

#### The BUILD Loop (Detailed)

```
┌─────────────────────────────────────────────────────┐
│  YOU (Commander): Describe the task in plain English │
└──────────────────┬──────────────────────────────────┘
                   │
         ┌─────────▼──────────┐
         │  M365 Opus: Plan   │  → Sprint tasks + agent prompts
         └─────────┬──────────┘
                   │
    ┌──────────────▼───────────────┐
    │  Claude Code: /batch execute │  → 5-8 parallel subagents
    │  OR                          │     each in isolated worktree
    │  Antigravity: Agent Manager  │  → 6 Gemini agents in parallel
    └──────────────┬───────────────┘
                   │
         ┌─────────▼──────────┐
         │  Claude Code: test  │  → Runs npm run build, fixes errors
         └─────────┬──────────┘
                   │
         ┌─────────▼──────────┐
         │  Claude Code: commit│  → Creates branch, PR, commit msg
         └─────────┬──────────┘
                   │
         ┌─────────▼───────────────┐
         │  Skills: build-learner  │  → Records what worked/failed
         │  Graphify: re-indexes   │  → Knowledge graph updated
         └─────────────────────────┘
```

**Token Savings:**
- Claude Code uses CLAUDE.md as context → no need to re-paste project rules each session
- Skills auto-inject when triggered → agents don't waste tokens re-discovering conventions
- Subagent isolation → each agent only loads relevant file context, not entire codebase
- **Estimated: 30-40% fewer tokens vs Cline/manual approach**

**RiftCoach example (Phase 6.0):**
```bash
# Instead of 6 separate Antigravity prompts...
claude "/batch Create 6 agent files in src/lib/agents/: build-optimizer.ts, meta-analyst.ts, draft-advisor.ts, matchup-analyst.ts, synergy-engine.ts, coach-narrator.ts. Each follows types.ts schema. Max 200 lines each. npm run build must pass."
```

---

### Stage 5: 🧪 TEST (QA & Regression)
> Duration: 1-2 hours | Token cost: ~$2-5

| Task | Primary Tool | Secondary | What Happens |
|------|-------------|-----------|-------------|
| Build verification | Claude Code CLI | — | `claude "run npm run build and fix any errors"` |
| Regression testing | Claude Code CLI | — | `claude "verify Karma build output matches baseline"` |
| Type checking | Claude Code CLI | — | Reads tsconfig, fixes all TS errors autonomously |
| Security audit | Claude Code hooks | — | Pre-commit hooks check for API key leaks |
| Data validation | Claude Code CLI | — | Validates JSON schemas (runes, items, builds) |
| Code review | Claude Code CLI | ChatGPT | `claude "review all changes in this branch"` |

**Claude Code adds:** Autonomous test-fix loops. It runs tests → reads errors → fixes code → re-runs tests → repeats until green. No manual intervention.

**Before:** `npm run build` fails → you read error → you ask Cline to fix → Cline fixes → you re-run → another error → repeat 5x manually.
**After:** `claude "fix all build errors until npm run build passes"` → Claude loops autonomously → done.

---

### Stage 6: 🚀 DEPLOY (Production)
> Duration: 30 min - 1 hour | Token cost: ~$1-3

| Task | Primary Tool | Secondary | What Happens |
|------|-------------|-----------|-------------|
| Build production | Claude Code CLI | — | `claude "run npm run build, verify output"` |
| Deploy to Vercel | Claude Code CLI | — | `claude "deploy to Vercel production"` |
| Environment setup | Claude Code CLI | — | Manages .env, secrets, API keys |
| CI/CD pipeline | Claude Code + GitHub | — | Creates GitHub Actions workflow |
| Monitoring setup | Claude Cowork | — | Scheduled health checks |

**Claude Code adds:** Full deployment automation including git branch management, PR creation, and CI/CD setup — all from terminal.

---

### Stage 7: 📢 DISTRIBUTE (Get Users)
> Duration: Ongoing | Token cost: ~$2-5/week

| Task | Primary Tool | Secondary | What Happens |
|------|-------------|-----------|-------------|
| PWA setup | Claude Code CLI | — | `claude "add PWA manifest, service worker"` |
| Landing page copy | M365 Opus | ChatGPT | Opus generates, ChatGPT refines |
| SEO optimization | ChatGPT Enterprise | Claude | Keyword research, meta tags |
| Social media content | M365 Opus | ChatGPT | Tailored posts for Reddit, Discord, Twitter |
| Documentation | Claude Code CLI | — | Generates README, API docs from codebase |
| Community building | You (manual) | ChatGPT | Reddit r/wildrift, Discord servers |

**Claude Code adds:** Auto-generates documentation by reading your actual codebase — not generic templates.

---

### Stage 8: 💰 MONETIZE (Revenue)
> Duration: Ongoing | Token cost: ~$1-3/week

| Task | Primary Tool | Secondary | What Happens |
|------|-------------|-----------|-------------|
| Pricing strategy | M365 Opus | ChatGPT | Data-driven pricing analysis |
| Stripe integration | Claude Code CLI | — | `claude "add Stripe subscription with free/pro tiers"` |
| Analytics setup | Claude Code CLI | — | PostHog/Mixpanel integration |
| A/B testing | Claude Code CLI | — | Feature flag system |
| User feedback loop | Claude Cowork | — | Scheduled data collection |
| Growth experiments | ChatGPT Enterprise | M365 Opus | Brainstorm → validate → implement |

**Claude Code adds:** Implements payment, analytics, and growth features autonomously. You describe what you want, it builds the integration.

---

## 3. BEFORE vs AFTER (Side-by-Side)

| Dimension | WITHOUT Claude Pro | WITH Claude Pro ($20/mo) |
|-----------|-------------------|-------------------------|
| **Idea validation** | Manual research, paste into chat | Claude Research mode — multi-step autonomous |
| **Architecture** | Describe codebase to Opus (300 tokens) | Claude Code reads codebase directly (0 tokens) |
| **Agent prompts** | Write manually, hope they work | Claude analyzes codebase, validates executability |
| **Code generation** | Cline (GPT-4.1) — good but slower | Claude Code (Opus 4.8) — autonomous, subagents |
| **Multi-file changes** | One file at a time via Cline | `/batch` splits into 5-8 parallel subagents |
| **Build errors** | Manual: read → paste → ask → fix → repeat | Autonomous: Claude loops until green |
| **Project context** | Re-paste rules every session | CLAUDE.md auto-loads (0 tokens wasted) |
| **Deployment** | Manual terminal commands | `claude "deploy to production"` |
| **Documentation** | You write it manually | Claude generates from actual code |
| **Payments** | Research → implement manually | `claude "add Stripe subscription"` |
| **Learning** | You remember what worked | build-learner skill tracks automatically |
| **Time per sprint** | 8-12 hours | **5-7 hours** (~40% faster) |
| **Tokens per sprint** | ~5000 tokens across tools | **~3000 tokens** (~40% savings) |
| **Sprints to revenue** | ~8 sprints (Phase 6-9) | **~5 sprints** |

---

## 4. ROI ANALYSIS

### Monthly Investment
| Tool | Cost | Status |
|------|------|--------|
| M365 Copilot Opus | $0 | Company provided |
| ChatGPT Enterprise | $0 | Company provided |
| Google AI Pro | $20/mo | Already subscribed |
| **Claude Pro** | **$20/mo** | **NEW** |
| **TOTAL** | **$40/mo** | |

### Monthly Returns (Conservative Estimates)
| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Sprint velocity | 1 sprint/week | 1.5-2 sprints/week | **+50-100%** |
| Token cost per sprint | ~$5 | ~$3 | **-40%** |
| Build-fix cycles | 5-8 manual iterations | 1-2 autonomous | **-70%** |
| Context setup per session | 5-10 min paste/explain | 0 min (CLAUDE.md) | **-100%** |
| Multi-file refactors | 45-60 min | 15-20 min | **-65%** |
| Time to Phase 9.0 (revenue) | ~8 weeks | ~4-5 weeks | **-40%** |

### Break-Even
The $20/mo Claude Pro pays for itself if it saves you **2 hours/month** of development time. Based on estimates above, it saves **15-25 hours/month**. ROI: **750-1250%**.

---

## 5. THE JARVIS LOOP (Self-Improving Development)

```
    ┌──────────────────────────────────────┐
    │           YOU: Describe Goal          │
    └──────────────────┬───────────────────┘
                       │
              ┌────────▼────────┐
              │  M365 Opus:     │
              │  Plan + Handoff │
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │  Claude Code:   │
              │  Build + Test   │──→ Reads CLAUDE.md (auto-context)
              │  + Deploy       │──→ Skills auto-inject (conventions)
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │  Graphify:      │
              │  Re-index       │──→ Knowledge graph updated
              └────────┬────────┘
                       │
              ┌────────▼─────────────┐
              │  build-learner:      │
              │  Record outcomes     │──→ learned-patterns.md grows
              │  Update conventions  │──→ Agents get smarter
              └────────┬─────────────┘
                       │
              ┌────────▼────────┐
              │  NEXT SESSION:  │
              │  Smarter agents │──→ Fewer tokens, faster builds
              │  Better context │──→ Less re-discovery
              └────────┬────────┘
                       │
                       ▼
               (LOOP REPEATS)
          Each cycle: agents improve
          Each build: knowledge grows
          Each sprint: faster than last
```

This is your JARVIS vision realized:
- **Self-healing:** Claude Code fixes its own build errors
- **Self-learning:** build-learner skill accumulates knowledge
- **Self-improving:** learned-patterns.md makes each session more efficient
- **Self-indexing:** Graphify keeps the knowledge graph current
- **Self-deploying:** Claude Code handles git, PRs, and deployment

---

## 6. DAILY WORKFLOW (Typical Evening Dev Session)

```
6:00 PM — Open M365 Opus
           Review where you left off (Opus has memory)
           Plan tonight's sprint tasks
           Generate agent prompts for Claude Code

6:15 PM — Open Terminal
           cd D:\.projects\ungasis\projects\riftcoach
           claude "read CLAUDE.md, what's the current state?"
           Claude auto-loads context. No paste. No explain.

6:20 PM — BUILD
           claude "/batch [task description]"
           → 5-8 subagents spawn in parallel
           → Each in isolated worktree
           → You monitor progress in Agent View

6:45 PM — Claude reports: "All subagents complete. 2 tests failing."
           claude "fix failing tests"
           → Autonomous fix loop
           → Build passes

7:00 PM — REVIEW
           claude "show me what changed"
           → Visual diff of all files
           → You approve or request changes

7:10 PM — DEPLOY
           claude "commit all changes, push to main"
           → Git add, commit with smart message, push

7:15 PM — LEARN
           build-learner skill auto-records outcomes
           Graphify re-indexes (prebuild hook)
           learned-patterns.md updated

7:20 PM — Back to M365 Opus
           Update handoff doc
           Plan tomorrow's sprint
           Done. 🎯

Total: 80 minutes instead of 3-4 hours
```

---

## 7. QUICK-START: First 30 Minutes With Claude Pro

After subscribing, do this:

```powershell
# 1. Install Claude Code CLI
irm https://claude.ai/install.ps1 | iex

# 2. Login
claude login

# 3. Navigate to project
cd D:\.projects\ungasis\projects\riftcoach

# 4. First interaction — Claude reads your codebase
claude "analyze this project, read CLAUDE.md"

# 5. Try a real task
claude "run npm run build and report the results"

# 6. Try parallel agents
claude "/batch create types for all 6 agents in src/lib/agents/"
```

---

**TOTAL: $40/mo → 40% faster sprints → Revenue 4 weeks sooner → JARVIS loop activated**
