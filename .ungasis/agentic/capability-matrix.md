# Capability Matrix

## Purpose
Define the capabilities, boundaries, and routing rules for all agents in the UNGASIS crew.

## How It Works
Tasks are routed to the most efficient agent based on task type (Build, Debug, Test, Review, Deploy, Research, Plan) matching the capability matrix.

## Rules
1. Always route to primary agent unless quota limits or context constraints require fallback.
2. Complex debug tasks (>10k context) MUST route to Antigravity due to its large context window.
3. Repetitive review tasks must route to M365 Copilot or automated subagents to preserve main agent token budgets.

## Agent Capabilities

| Agent | Build | Debug | Test | Review | Deploy | Research | Plan |
|---|---|---|---|---|---|---|---|
| Antigravity (Gemini Flash) | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ |
| Cline (Claude/BYOK) | ✅ | ✅ | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| Jules (GitHub AI) | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| M365 Copilot (Claude) | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ |
| VS Code Copilot (GPT-4.1) | ⚠️ | ⚠️ | ❌ | ❌ | ❌ | ❌ | ❌ |
| ChatGPT Enterprise (GPT-4.1) | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ |
| @quality-auditor (subagent) | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| @graphify-watchdog (subagent) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

## Routing Rules
- **BUILD feature:** Antigravity (primary) or Cline (if quota low)
- **DEBUG complex:** Antigravity (1M context sees everything)
- **DEBUG simple:** Cline (faster, BYOK)
- **TEST:** Jules (overnight, free 100 tasks/day)
- **REVIEW:** M365 Copilot (unlimited) or @quality-auditor (automated)
- **RESEARCH:** M365 Copilot or ChatGPT Enterprise
- **PLAN:** M365 Copilot
- **DEPLOY:** Manual (Cloudflare Pages) or Antigravity terminal
- **GRAPH UPDATE:** @graphify-watchdog

## Inputs/Outputs

| Input | Output |
|---|---|
| Task Type & Size | Selected Agent Assignment |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
