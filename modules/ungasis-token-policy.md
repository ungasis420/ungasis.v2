# Token Policy — Your Complete Mana Budget Guide

## 1. Kitchen Analogy
Managing your token budget (mana) is like running a restaurant kitchen with a strict daily food budget. You cannot spend all your money in the morning, or you will have nothing left to serve for dinner. You must split your budget carefully:
- **Appetizers:** Small, cheap items to start the meal (Planning stage — ~12% of the budget).
- **Main Course:** The core, heavy food that satisfies the guests (Building/Coding stage — ~20% of the budget).
- **Desserts & Cleaning:** Nice finishing touches and cleanup (Docs & Updates stage — ~7% of the budget).
- **Emergency Pantry:** Food held back in case a dish burns or a guest has a special request (Buffer/Debugging — ~32% of the budget).

---

## 2. Three Budget Layers Table
To prevent running out of mana, we track our token limits at three distinct levels:

| Layer | Name | Scope | Resource Limit | Purpose |
|---|---|---|---|---|
| **Layer 1** | Subscription Limit | Daily / Monthly | 1,500 requests/day (AI Studio), 100 tasks/day (Jules) | Keeps our operational costs at $0 or within subscription limits. |
| **Layer 2** | Session Limit | Per Quest | 100,000 tokens total split among specialized agents | Prevents a single task from exhausting our active model context. |
| **Layer 3** | Per-Message Limit | Per Interaction | Keep prompts and responses compact and focused | Prevents model rambling and saves context window space. |

---

## 3. The 12-Layer Mana System
Our 12-layer token efficiency system helps us squeeze the maximum value out of every single token. (For full details, reference [.clinerules/01-token-efficiency.md](file:///c:/Users/63905/Downloads/ungasis/.clinerules/01-token-efficiency.md) / [.agents/rules/01-token-efficiency.md](file:///c:/Users/63905/Downloads/ungasis/.agents/rules/01-token-efficiency.md)):

1. **Pre-fill templates:** Use pre-existing table structures instead of letting the AI write them from scratch.
2. **Knowledge offloading:** Use local files on disk for reference instead of pasting them into the chat window.
3. **Example-driven output:** Show one concrete output example instead of writing paragraphs of guidelines.
4. **Complexity routing:** Route simple jobs to fast models and save heavy models for complex reasoning.
5. **Batch operations:** Perform multiple checks or small file edits in a single turn.
6. **Context pruning:** Use `grep` or read only file headers first; do not read full files unless necessary.
7. **Structured output:** Enforce markdown tables and lists to cut down on chatty paragraphs.
8. **Response caps:** Keep replies short (under 2,000 tokens) and log long reports into dedicated files on disk.
9. **Incremental disclosure:** Read files in small groups (5-8 files at a time) rather than all at once.
10. **Cache awareness:** Structure instructions to trigger system prompt caching.
11. **Session checkpoints:** Write progress logs to disk often so we can recover without repeating work.
12. **Context compaction:** When the session context gets heavy, summarize history and start fresh.

---

## 4. Message Cap Policy
Every turn consumes substantial tokens. We use a strict message cap system to stay efficient:
- **Target Range:** 15–20 messages per session.
- **Yellow Warning:** 20 messages. The agent will alert you that the budget is running low.
- **Hard Cap:** 25 messages. The agent must stop, run the `/session-handoff` command to save the current progress to [CONTEXT.md](file:///c:/Users/63905/Downloads/ungasis/CONTEXT.md), and end the session.

---

## 5. Context Rot Detection
When a conversation gets long (more than 5 messages), the agent's memory can start to drift or get confused (Context Rot).
- **Rule:** Every 5 messages, the agent must re-read [CONTEXT.md](file:///c:/Users/63905/Downloads/ungasis/CONTEXT.md) and key active files to refresh its memory and align with the sprint goal.

---

## 6. Model Routing Tiers
We assign tasks to the model that offers the best balance of speed, cost, and intelligence:

| Tier | Complexity | Models | Typical Tasks |
|---|---|---|---|
| **Tier 1** | Simple / Routine | Gemini 3.5 Flash (Low/Medium), Jules | File lookup, style checks, standard file creation, updates. |
| **Tier 2** | Intermediate / Coding | Gemini 3.5 Flash (High), Claude Sonnet 4.6 | Code building, bug fixing, test writing. |
| **Tier 3** | Complex / Architecture | Claude Opus 4.6, Gemini Pro, M365 Copilot | Structural design, complex logic, multi-file refactoring. |

---

## 7. Cost-Per-Task Guidelines Table
This table estimates the typical token (mana) consumption for standard solopreneur operations:

| Task Type | Estimated Mana Cost | Key Resource Used | Efficiency Check |
|---|---|---|---|
| **Create Module** | ~5,000 tokens | builder + docs | Use pre-made template; skip explanations. |
| **Fix Bug** | ~3,000 tokens | debugger + tester | Target only the affected lines; do not rewrite the file. |
| **QA Audit** | ~2,000 tokens | reviewer + tester | Use grep first to locate requirements. |
| **Full Sprint (Quest)** | ~30,000 tokens | planner + builder + tester | Save progress logs to disk at each step. |

---

## 8. Cross-References
- Check agent-level token allocations in [config/token-budget.yml](file:///c:/Users/63905/Downloads/ungasis/config/token-budget.yml)
- Check total account-level limits in [config/rate-limit-budget.yml](file:///c:/Users/63905/Downloads/ungasis/config/rate-limit-budget.yml)

---

## Upgraded 20-Layer Token System (v2.0)

### PREVENT (Layers 1-3): Stop waste before it starts
1. Pre-fill templates (50%)
2. Knowledge file offloading (80%)
3. Example-driven prompts (40%)

### OPTIMIZE (Layers 4-6): Use tokens efficiently
4. Route by complexity + reasoning budget (55%)
5. Batch questions (60%)
6. Context pruning via Graphify query (98%)

### CONTROL (Layers 7-9): Limit output waste
7. Structured output enforcement (20%)
8. Response length caps (30%)
9. Incremental disclosure (50%)

### MAINTAIN (Layers 10-12): Keep sessions lean
10. Semantic cache (50% — upgraded from 10%)
11. Session checkpointing (60%)
12. Compact at 70% (30%)

### ADVANCED (Layers 13-17): Deep optimization
13. Retrieval-based memory (75%)
14. Tool schema pruning (70%)
15. TOON compact encoding (60%)
16. Context decay / stale eviction (70%)
17. Prompt prefix caching (90%)

### Estimated Monthly Impact
- Before (12 layers): ~150,000 tokens/month
- After (17 layers): ~30,000-50,000 tokens/month
- Savings: ~90-95% overall
- Theoretical max: ~97-98%

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
