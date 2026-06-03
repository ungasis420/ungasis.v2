# UNGASIS Build Status — Source of Truth

Updated: June 3, 2026
Method: Reconciliation audit cross-referencing ChatGPT Enterprise gap audit
        with verified local filesystem state.

## Status Legend
| Status | Icon | Meaning |
|--------|:----:|---------|
| Built | ✅ | Exists, functional, verified |
| Scaffolded | 🟡 | Structure exists, not fully wired |
| Planned | 🔵 | Designed but not built yet |
| Deferred | ⚫ | Intentionally postponed |
| Risk | 🔴 | Needs attention |

## Form 1: Knowledge OS

| Component | Path | Status | Files | Notes |
|-----------|------|:------:|:-----:|-------|
| Agent rules | .agents/rules/ | ✅ | 14 | Synced to .clinerules/ |
| Agent skills | .agents/skills/ | ✅ | 29+ | 14 skills including commander, designer |
| Agent workflows | .agents/workflows/ | ✅ | 16 | 11 with correct step content |
| Subagents | .gemini/agents/ | ✅ | 5 | blueprint-architect, commander, designer, quality-auditor, graphify-watchdog |
| Cline rules | .clinerules/ | ✅ | 11 | Synced from .agents/rules/ |
| MCP profiles | .mcp/profiles/ | ✅ | 3 | build, research, full |
| Config YAMLs | config/ | ✅ | 9 | Operational configs |
| Knowledge SOPs | knowledge/sops/ | ✅ | 22 | Standard operating procedures |
| Knowledge wiki | knowledge/wiki/ | ✅ | 30+ | Patterns, gotchas, decisions |
| Production modules | modules/ | ✅ | 7 | Production readiness |
| Graphify | graphify-out/ | ✅ | 2864+ | 20,929 nodes, 24,207 edges |

## Form 1.5: JARVIS OS (.ungasis/)

| Engine/Subsystem | Path | Status | Files |
|-----------------|------|:------:|:-----:|
| Context Engine | .ungasis/context-engine/ | ✅ | 3+ |
| Self-Evolution | .ungasis/evolution/ | ✅ | 3+ |
| Project DNA | .ungasis/dna/ | ✅ | 10+ |
| Agentic Framework | .ungasis/agentic/ | ✅ | 3+ |
| Orchestrator | .ungasis/orchestrator/ | ✅ | 6+ |
| Scout Engine | .ungasis/scout/ | ✅ | 8+ |
| Semantic Memory | .ungasis/memory/ | ✅ | 6+ |
| Interconnect Bus | .ungasis/bus/ | ✅ | 2+ |
| Cortex / Second Brain | .ungasis/cortex/ | ✅ | 12+ |
| Resource Manager | .ungasis/resources/ | ✅ | 2+ |
| Communication Layer | .ungasis/comms/ | ✅ | 2+ |
| Goal Decomposer | .ungasis/decomposer/ | ✅ | 5+ |
| Reasoning Layer | .ungasis/reasoning/ | ✅ | 3+ |
| Dependency Intel | .ungasis/dependencies/ | ✅ | 3+ |
| Rollback Intel | .ungasis/rollback/ | ✅ | 3+ |
| Project Director | .ungasis/project-director/ | ✅ | 15+ |
| JARVIS Core | .ungasis/jarvis-core/ | ✅ | 4+ |
| Quality Scoring | .ungasis/quality/ | ✅ | 4+ |
| Warnings | .ungasis/warnings/ | ✅ | 4+ |
| Suggestions | .ungasis/suggestions/ | ✅ | 3+ |
| Revenue Intel | .ungasis/revenue-intel/ | ✅ | 3+ |
| Testing Intel | .ungasis/testing/ | ✅ | 3+ |
| Multi-Project | .ungasis/multi-project/ | ✅ | 3+ |
| Prompt Evolution | .ungasis/prompt-evolution/ | ✅ | 3+ |
| User Patterns | .ungasis/user-patterns/ | ✅ | 3+ |
| OKR Engine | .ungasis/okr/ | ✅ | 3 |
| Event System | .ungasis/events/ | ✅ | 3 |
| Smart Router | .ungasis/router/ | ✅ | 5 |
| Time/Feedback | .ungasis/tracking/ | ✅ | 4 |
| Architect | .ungasis/architect/ | ✅ | 3+ |
| CLI Agents | .ungasis/cli-agents/ | ✅ | 6+ |

## Form 2: Dashboard

| Component | Path | Status | Notes |
|-----------|------|:------:|-------|
| App scaffold | dashboard/ | 🟡 | Next.js 15 skeleton |
| Data parser | dashboard/src/lib/ | 🟡 | parse-markdown.ts, ungasis-data.ts, types.ts |
| Main page | dashboard/src/app/page.tsx | 🟡 | Mock data — needs getDashboardData() wiring |
| Quest routes | dashboard/src/app/quest/ | ⚫ | Deferred |
| Codex route | dashboard/src/app/codex/ | ⚫ | Deferred |
| Forge route | dashboard/src/app/forge/ | ⚫ | Deferred |
| Settings route | dashboard/src/app/settings/ | ⚫ | Deferred |
| AI API route | dashboard/src/app/api/ | ⚫ | Deferred |
| Additional libs | package.json | ⚫ | Zustand, Framer Motion, shadcn — add when needed |
| Tests/lint | package.json | ⚫ | Deferred |
| Lockfile | package-lock.json | ⚫ | Run npm install to generate |

## CLI

| Component | Status | Notes |
|-----------|:------:|-------|
| ungasis.py CLI | ✅ | Unified entry point for all 13+ scripts |
| ungasis-test.py | ✅ | Smoke tests + schema validation |

## Projects

| Project | Path | Status | Notes |
|---------|------|:------:|-------|
| RiftCoach | projects/riftcoach/ | 🟡 | Ready for Phase 5.7 |
| Newmont | projects/newmont/ | ⏸️ | Paused |

## Automation Scripts

| Script | Path | Status | Schedule |
|--------|------|:------:|----------|
| Daily Pulse | scripts/daily-pulse.py | ✅ | Daily 8:00 AM |
| Warning Check | scripts/warn-check.py | ✅ | Daily 9:00 AM |
| Quality Score | scripts/quality-score.py | ✅ | On demand |
| Tag Sweep | scripts/tag_sweep.py | ✅ | Weekly Monday |
| Unified CLI | scripts/ungasis.py | ✅ | Unified CLI entry point |
| Smoke Tests | scripts/ungasis-test.py | ✅ | Daily 7:45 AM |
| GraphRAG Search | scripts/graph-search.py | ✅ | On demand |
| Research GitHub | scripts/research-github.py | ✅ | Daily 7:00 AM |
| Research HN | scripts/research-hn.py | ✅ | Daily 7:15 AM |
| Research YouTube | scripts/research-youtube.py | ✅ | Weekly Sunday |
| Research Feeds | scripts/research-feeds.py | ✅ | Weekly Sunday |
| Feedback Close | scripts/feedback-close.py | ✅ | Monthly |
| Quality Close | scripts/quality-close.py | ✅ | Weekly Sunday |
| Routing Close | scripts/routing-close.py | ✅ | Monthly |
| Retro Close | scripts/retro-close.py | ✅ | Weekly Sunday |
| Energy Close | scripts/energy-close.py | ✅ | Weekly Sunday |

## Security

| Item | Status | Notes |
|------|:------:|-------|
| .gitignore blocks .env | ✅ | Verified |
| .env.example exists | ✅ | Template with placeholders |
| No secrets in tracked files | ✅ | Reviewed and redacted |
| git archive for exports | ✅ | Use instead of Windows ZIP |

## Infrastructure (Deferred)

| Item | Status | Notes |
|------|:------:|-------|
| .devcontainer/ | ⚫ | Not needed — using local PC |
| .github/ CI/CD | ⚫ | Build when deploying RiftCoach |
| Claude Code CLI | ⚫ | Not needed — using Antigravity + Cline |
| Codex CLI | ⚫ | Not needed |
| Claude Squad | ⚫ | Not needed — using Agent Manager |

## Totals
- ✅ Built: 62
- 🟡 Scaffolded: 5 (dashboard components + project templates)
- ⚫ Deferred: 13
- 🔴 Risks: 0 (all resolved in F21a)

---
Last reviewed: June 3, 2026 | Review by: September 2026 | Owner: Mel
