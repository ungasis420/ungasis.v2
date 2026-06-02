# Multi-Agent Dev Orchestration Kit v4.0 — Master Guide

> Sequential Pipelines + Self-Healing Loops + Browser Workflow
> v4.0 | May 2026 | Mel John Dimat | Korn Ferry Manila

---

## Part 0: Contents

| # | Topic |
|:---:|---|
| 1 | Architecture & Agent Roles |
| 2 | Tool Stack |
| 3 | Browser Workflow |
| 4 | Sequential Pipeline |
| 5 | Debug & Self-Healing |
| 6 | State Machine & Token Budget |
| 7 | Failure Taxonomy |
| 8 | Metrics & Scoring |
| 9 | Security & Kill Switch |
| 10 | Protocols & Frameworks |
| 11 | Walkthrough: Dark Mode Toggle |
| 12 | Quick Reference |
| 13 | Glossary |

---

## Part 1: Architecture & Agent Roles

### System Diagram
```
Human Lead
  -> M365 Copilot -------- business context
    -> ChatGPT Enterprise -- planning/review
      -> GitHub ------------ issues/PRs
        -> VS Code ---------- cockpit
          -> Cline/Ollama ---- workers
            -> CI/tests ------ verification
              -> Human merge -- final gate
```

### Agent Roles
| Agent | Edit | Tool | Must NOT |
|---|:---:|---|---|
| Planner | No | ChatGPT | Edit code |
| Builder | Scoped | Cline/Aider | Expand scope |
| Tester | Tests | Cline | Fix code |
| Reviewer | Read-only | ChatGPT | Merge |
| Docs | Docs only | M365 | Change behavior |

### 5 Control Rules
1. Planner assigns work — agents don't self-assign
2. Workers do NOT merge
3. Reviewers do NOT edit code
4. Shared files require sequencing
5. **Human approves merge. Always.**

### Merge Order
Infra -> Data -> Backend -> Frontend -> Tests -> Docs

---

## Part 2: Tool Stack

| Layer | Tool | Role |
|---|---|---|
| Planning | M365 Copilot | Business context |
| Architecture | ChatGPT Enterprise | Lead planner |
| Control | GitHub | Issues, PRs, Actions |
| Cockpit | VS Code | Local development |
| Workers | Cline + GPT-4.1 | Coding |
| Local AI | Ollama (qwen3, devstral) | Autocomplete, fallback |

---

## Part 3: Browser Workflow

7 Rules:
1. One agent per issue per branch
2. Lead planner coordinates
3. github.dev for workers
4. File ownership BEFORE work
5. CI before review
6. Fresh-context review
7. Human merges always

---

## Part 4: Sequential Pipeline

```
intake -> planner -> builder -> tester -> reviewer -> docs -> human -> done
```

If tests fail: `tester -> debugger -> tester` (max 3)
If review fails: `reviewer -> debugger -> tester -> reviewer` (max 2)
If exhausted: `-> human -> diagnosis -> manual`

### Conflict Resolution
1. Detect via ownership map
2. Sequence: A finishes, then B starts
3. Merge through lead planner
4. Escalate to human if unresolvable

---

## Part 5: Debug Loops & Self-Healing

### Circuit Breaker
```
CLOSED -> 3 failures -> OPEN -> 10min -> HALF-OPEN -> probe pass? CLOSED : OPEN
```

### 5-Level Graceful Degradation
| Level | Action |
|---|---|
| 1 | Skip optional steps (docs, memory) |
| 2 | Fallback to cheaper/local model |
| 3 | Core-only MVP |
| 4 | Checkpoint + pause for human |
| 5 | EMERGENCY KILL — stop everything |

---

## Part 6: State Machine & Token Budget

| Agent | Budget | % |
|---|---:|---:|
| Planner | 12,000 | 12% |
| Builder | 20,000 | 20% |
| Tester | 9,000 | 9% |
| Debugger | 16,000 | 16% |
| Reviewer | 20,000 | 20% |
| Docs | 7,000 | 7% |
| Buffer | 16,000 | 16% |
| **Total** | **100,000** | **100%** |

---

## Part 7: Failure Taxonomy

| # | Category | Freq | Recovery |
|:---:|---|:---:|---|
| 1 | Transient (timeout/429) | 60% | Retry + backoff + jitter |
| 2 | Context Overflow | 15% | Compress context |
| 3 | Hallucination | 12% | Validate + fallback |
| 4 | Cascading | 8% | Isolate + rollback |
| 5 | State Corruption | 5% | Restore checkpoint |

> Retrying a rate limit WORKS. Retrying a hallucination makes it WORSE.

### 3 Anti-Patterns
| Pattern | Behavior | Fix |
|---|---|---|
| Repeater | Same action 3x | Inject new context |
| Wanderer | Active but off-goal | Refocus |
| Looper | A->B->A->B | Circuit break + escalate |

---

## Part 8: Metrics & Scoring (0-100)

| Agent | M1 | M2 | M3 | M4 |
|---|---|---|---|---|
| Planner | Criteria (30) | Ownership (20) | Risk (25) | Scope (25) |
| Builder | Test pass (40) | Scope (25) | Quality (20) | Speed (15) |
| Tester | Coverage (40) | False pos (20) | Reporting (25) | Complete (15) |
| Debugger | Fix rate (40) | Hypothesis (25) | Minimal (20) | No scope (15) |
| Reviewer | Bugs (35) | False alarm (20) | Complete (25) | Actionable (20) |

Cost: gpt-4.1 input $0.002/1k, output $0.008/1k, Ollama $0.000

---

## Part 9: Security & Kill Switch

**Never Expose:** API keys, tokens, secrets, credentials, PII

**Kill Switch Triggers:**
- Secret detected
- Production access
- Cost > $10
- Unauthorized API
- Cascading failures
- Merge without human

**Kill Actions:** Stop all -> Lock branches -> Cancel CI -> Incident report -> Rollback -> Notify human+security

---

## Part 10: Protocols & Frameworks

| Protocol | By | What | Analogy |
|---|---|---|---|
| MCP | Anthropic | Agent<->tools | USB-C for AI |
| A2A | Google | Agent<->agent | Walkie-talkies |
| ACP | IBM | Governance | Health inspector |

| Framework | By | Best For | Difficulty |
|---|---|---|:---:|
| LangGraph | LangChain | State machines | Hard |
| AutoGen | Microsoft | Chat multi-agent | Medium |
| CrewAI | Community | Role teams | Easy |
| Semantic Kernel | Microsoft | Enterprise | Medium |

> Don't buy power tools until hand tools work.

---

## Part 11: Walkthrough — Dark Mode Toggle

1. **Intake:** Issue "Add dark mode toggle"
2. **Planner:** Scopes files (theme.ts, toggle.tsx), ownership map
3. **Builder:** Implements toggle, theme switching, CSS variables
4. **Tester:** `npm test` — FAIL (missing CSS variable)
5. **Debugger:** Hypothesis: missing --bg-dark -> Adds it -> PASS
6. **Reviewer:** Fresh-context — no scope creep, no secrets -> APPROVED
7. **Docs:** Updates PROJECT_MEMORY, AGENT_RUN_LOG
8. **Human:** Reviews PR -> MERGE
9. **Done:** Shipped, scorecard filled, cost logged

---

## Part 12: Quick Reference

```
Pipeline:  planner -> builder -> tester -> [debugger] -> reviewer -> docs -> human
Debug:     fail -> hypothesis -> patch -> retest -> pass? done : attempt++ -> max? escalate
Breaker:   CLOSED -> 3 fails -> OPEN -> 10min -> HALF-OPEN -> probe -> CLOSED/OPEN
```

---

## Part 13: Glossary

| Term | Definition |
|---|---|
| Agent | AI instance with specific role and scope |
| Handoff Contract | Structured data between agents |
| Circuit Breaker | Stops retries after failures |
| Kill Switch | Emergency stop for all agents |
| Checkpoint | Saved state for recovery |
| Graceful Degradation | Progressive scope reduction |
| File Ownership Map | Agent-file assignments |
| Fresh-Context Review | Review with no prior context |
| Scope Creep | Changes outside assigned task |
| Token Budget | Max tokens per agent per task |
| MCP | Model Context Protocol (agent-tool) |
| A2A | Agent-to-Agent Protocol |
| ACP | Agent Communication Protocol |
| LangGraph | Agent state machine framework |
| Human Gate | Required human approval |
| Backoff | Increasing retry delay |
| Jitter | Random backoff variation |
| Definition of Done | Must-pass merge checklist |

---

*Multi-Agent Kit v4.0 — Mel John Dimat — Korn Ferry Manila — May 2026*
