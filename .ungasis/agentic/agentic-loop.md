# Agentic Loop

## Purpose
Define the iterative standard execution loop that all tasks must follow from start to completion.

## How It Works
```
THE AGENTIC LOOP (runs every task):
┌──────────────────────────────────────┐
│ 1. PLAN    ← Decompose into subtasks │
│    ↓                                  │
│ 2. ROUTE   ← Assign to best agent    │
│    ↓          (use capability matrix) │
│ 3. ACT     ← Agents execute           │
│    ↓                                  │
│ 4. CHECK   ← Verify against DoD       │
│    ↓                                  │
│ 5. PASS? ──NO──→ 6. RETRY/FALLBACK   │
│    │ YES              (back to 3)     │
│    ↓                                  │
│ 7. LEARN   ← Log metrics, update     │
│    ↓          routing, save pattern   │
│ 8. NEXT    ← Move to next task       │
└──────────────────────────────────────┘
```

## Rules
1. Never execute a task without first planning and decomposing it into subtasks.
2. Every output must be checked against the Definition of Done (DoD) before completion.
3. Lessons learned (errors, successes) must be captured and logged at the end of the loop.

## Steps Explained
1. **PLAN:** The agent decomposes the goal into smaller, clear, manageable tasks.
2. **ROUTE:** Assign each subtask to the most capable agent based on the Capability Matrix.
3. **ACT:** The assigned agent performs the task and outputs code or documentation.
4. **CHECK:** Review the output using automated rules (e.g. `@quality-auditor`) or manual check.
5. **PASS?:** If audit/test passes, move to learning. If it fails, move to retry/fallback.
6. **RETRY/FALLBACK:** Analyze the failure reason, modify the prompt or approach, and retry up to 3 times.
7. **LEARN:** Record token costs, time spent, and any new gotchas to help subsequent tasks.
8. **NEXT:** Transition cleanly to the next task in the plan.

## Inputs/Outputs

| Input | Output |
|---|---|
| User Request | Verified Deliverables & Logged Metrics |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
