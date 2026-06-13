# UNGASIS OS — AI Engineer Frameworks Roadmap
## Status: Phase 2 Intelligence Layer (Future — After Newmont QIM)

### What This Is
Integrating methodologies from 20 renowned AI engineers into UNGASIS OS.
6 are already embedded. 5 are partially implemented. 9 are not yet applicable.
This roadmap tracks what's done, what's next, and what to skip.

### Already Embedded (6/20) ✅

| # | Expert | Pattern | Where in UNGASIS | Status |
|---|--------|---------|-----------------|--------|
| 1 | **Andrej Karpathy** | Wiki-based learning (Obsidian-style knowledge) | `knowledge/wiki/` — 56 pages, Karpathy method | ✅ LIVE |
| 2 | **Andrej Karpathy** | Skinny prompts, 1 example > 3 paragraphs | `.claude/rules/token-efficiency.md` L3 | ✅ LIVE |
| 3 | **Francois Chollet** | Simplest solution first (ARC-style thinking) | Anti-overbuilding rule, MVA protocol | ✅ LIVE |
| 4 | **Gary Marcus** | Verification layer, skeptical critique | `verifier.py`, quality-auditor agent, pre/post-flight | ✅ LIVE |
| 5 | **Thomas Wolf** | Open-source first, community models | Tier 1 free-first routing, 7 API providers | ✅ LIVE |
| 6 | **Dario Amodei** | Safety limits, constitutional constraints | 3-strike rule, read-only archives, secrets gate | ✅ LIVE |

### Also Embedded (via Cherny Protocol — not in the 20 list but critical)

| Expert | Pattern | Where | Status |
|--------|---------|-------|--------|
| **Cherny** | Multi-agent file boundaries | `.claude/rules/multi-agent.md` | ✅ LIVE |
| **Cherny** | Wave-based parallel builds | Wave A (Agy) / Wave B (Claude) pattern | ✅ LIVE |

### Partially Implemented (5/20) ⚠️

| # | Expert | Pattern | Current State | What's Missing | Priority | Effort |
|---|--------|---------|--------------|----------------|----------|--------|
| 1 | **Andrew Ng** | Iterative prompt refinement | task-router recommends models | No prompt performance tracking — don't know which prompts save vs waste tokens | 🟡 MED | Low |
| 2 | **Connor Leahy** | Open-source LLM integration | Ollama installed with local models | No UNGASIS script calls Ollama directly — zero integration | 🟡 MED | Medium |
| 3 | **Kai-Fu Lee** | AI strategy, budget-conscious | Budget tracking exists | No formal strategy framework (ROI per project, opportunity cost) | 🟢 LOW | Low |
| 4 | **Timnit Gebru** | AI ethics, fairness | Safety limits exist | No formal ethics checklist for project outputs | 🟢 LOW | Low |
| 5 | **Mustafa Suleyman** | AI product thinking | Product projects exist (Newmont, RiftCoach) | No formal product framework (user research, metrics, feedback loops) | 🟡 MED | Medium |

### Not Yet Applicable (9/20) — Skip for Now

| # | Expert | Why Skip |
|---|--------|----------|
| 1 | Demis Hassabis | AGI/reinforcement learning — not relevant to personal OS |
| 2 | Fei-Fei Li | Computer vision — not in UNGASIS scope |
| 3 | Emad Mostaque | Generative AI product — not applicable |
| 4 | Soumith Chintala | PyTorch framework-level — not applicable |
| 5 | Daphne Koller | ML/biotech domain — not applicable |
| 6 | Mira Murati | Product leadership — not applicable at solo scale |
| 7 | Abhishek Thakur | Kaggle ML engineering — not applicable |
| 8 | Gabriel Lazaro | Insurance-specific applied AI |
| 9 | Oriol Vinyals | Deep learning research — not applicable |

### Note on Yoshua Bengio
Bengio's work on deep learning foundations is embedded indirectly through every model UNGASIS uses (transformers, attention mechanisms). No specific framework to add.

### Phase 2 Roadmap: Intelligence Layer Integration

| # | Task | Expert Source | What to Build | Priority | Effort | Tokens |
|---|------|-------------|--------------|----------|--------|--------|
| 1 | Wire Google AI API into self-heal.py | Hassabis (reinforcement from outcomes) | self-heal calls Gemini to generate hypotheses instead of if/else | 🔴 HIGH | Medium | ~3K |
| 2 | Prompt performance tracking | Ng (iterative refinement) | Log prompt hash + outcome → weekly report of best/worst | 🔴 HIGH | Low | ~2K |
| 3 | Wire Ollama into task-router | Leahy (open-source LLMs) | Tier 0 local routing for simple tasks (0 cost, instant) | 🟡 MED | Medium | ~4K |
| 4 | Build result → wiki auto-update | Hassabis (reinforcement learning) | post-flight failure → auto-create wiki lesson page | 🟡 MED | Medium | ~3K |
| 5 | Agent performance scoring | Ng (data-driven optimization) | Track agent + task-type + tokens + outcome → dashboard leaderboard | 🟡 MED | Low | ~2K |
| 6 | Idea validation framework | Lee (AI strategy) | idea-score.py: market size, effort, uniqueness → ranked list | 🟡 MED | Medium | ~3K |
| 7 | Product metrics framework | Suleyman (AI products) | User research template, feedback loop, success metrics per project | 🟢 LOW | Low | ~1K |

### Token-Saving Techniques — Complete Inventory

These are the sr dev/engineer hacks already in UNGASIS's 12-Layer Mana System:

| Layer | Category | Technique | Source Expert |
|-------|----------|-----------|--------------|
| L1 | PREVENT | Pre-fill templates — don't generate structure from scratch | Karpathy |
| L2 | PREVENT | Knowledge file offloading — read files via tools, never paste | Karpathy |
| L3 | PREVENT | Example-driven — 1 example > 3 paragraphs | Karpathy |
| L4 | OPTIMIZE | Route by complexity — Glob (~50) → Grep (~100) → Read partial → full | Chollet |
| L5 | OPTIMIZE | Batch operations — read multiple files in one plan | Wolf |
| L6 | OPTIMIZE | Context pruning — headings for inventory, full only when verifying | Karpathy |
| L7 | CONTROL | Structured output ONLY — markdown tables, no prose | Marcus |
| L8 | CONTROL | Response length caps — max 1 line per file/section | Chollet |
| L9 | CONTROL | Incremental disclosure — batch 5-8 files at a time | Wolf |
| L10 | MAINTAIN | Cache awareness — keep system prompt stable across turns | Amodei |
| L11 | MAINTAIN | Session checkpointing — write progress after EACH task | Cherny |
| L12 | MAINTAIN | Compact at 60% context. Autocompact at 50%. | Karpathy |

### Additional Token Hacks (Beyond 12-Layer)

| Hack | Description | Source |
|------|-------------|--------|
| context-inject.py | 70x savings by injecting only relevant wiki pages | UNGASIS original |
| Anti-drift protocol | Path assertions prevent agents from wandering (saves retry tokens) | Cherny |
| 1-turn sessions | /effort low + single /goal = minimal context overhead | Karpathy |
| .claudeignore | Exclude 90% of repo from Claude's context scan | Karpathy |
| MAX_THINKING_TOKENS=10000 | Cap reasoning tokens to prevent overthinking | Chollet |
| File boundary tables | No two agents edit same file = no merge conflict retries | Cherny |
| Skinny prompts (150 tokens) | Each agent gets ONLY file path, I/O schema, constraints | Karpathy |
| Tier 1 free-first routing | Always try free models before paid — save $$ | Wolf/Lee |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
