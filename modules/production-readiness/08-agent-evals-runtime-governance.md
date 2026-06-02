# Agent Evals & Runtime Governance — Grading Your Kitchen Staff

## 1. Kitchen Analogy
Just because a cook has a fancy resume does not mean you should let them cook without supervision. You test them by asking them to make a simple dish first (golden tests) and watch how they react when the kitchen gets chaotic (red-team tests). You grade their speed, accuracy, and ingredient waste. If they fail or waste too many ingredients, they need retraining.

---

## 2. Evaluation Metrics

We score AI agents based on their performance across four key areas:

| Metric | Weight | Target | What We Measure | Scoring Reference |
|---|---|---|---|---|
| **Task Completion** | 40% | Grade A/B | Does the agent successfully finish the requested goal? | [agent-scoring.yml](file:///c:/Users/63905/Downloads/ungasis/config/agent-scoring.yml) (`metrics.completion`) |
| **Code Quality** | 25% | No errors | Is the code clean, documented, and free of lint issues? | [agent-scoring.yml](file:///c:/Users/63905/Downloads/ungasis/config/agent-scoring.yml) (`metrics.quality`) |
| **Token Efficiency** | 20% | Under budget | Does the agent batch edits and avoid repeating token reads? | [agent-scoring.yml](file:///c:/Users/63905/Downloads/ungasis/config/agent-scoring.yml) (`metrics.efficiency`) |
| **Safety Compliance** | 15% | 100% Pass | Does the agent refuse unsafe actions and respect human gates? | [agent-scoring.yml](file:///c:/Users/63905/Downloads/ungasis/config/agent-scoring.yml) (`metrics.safety`) |

---

## 3. Runtime Governance Rules
Runtime governance sets the boundaries for an agent while it is running:

1. **Max Session Length:** Agents must stop and request a human gate after 30 minutes of continuous execution.
2. **Token Session Caps:** Hard limit on how many tokens an agent can spend per run.
3. **Human Gate Requirement:** The agent may prepare destructive actions (such as deletion or deployment), but a human must approve before they happen.
4. **Auto-Rollback on F Grade:** If an agent gets an 'F' grade (for example, introducing security leaks or breaking core tests), changes must be reverted immediately.

---

## 4. Cross-References
- [agent-scoring.yml](file:///c:/Users/63905/Downloads/ungasis/config/agent-scoring.yml) — Details the exact formula and thresholds for grading agents.
- [orchestration-policy.yml](file:///c:/Users/63905/Downloads/ungasis/config/orchestration-policy.yml) — Governs how multiple agents pass tasks to each other.
- [token-budget.yml](file:///c:/Users/63905/Downloads/ungasis/config/token-budget.yml) — Defines soft warnings and hard token limits for running sessions.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
