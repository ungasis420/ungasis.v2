---
name: model-routing
description: Use when choosing model/tier, reasoning effort, thinking budget, or routing work across free/paid/async agents. Keywords: model, tier, opus, sonnet, haiku, reasoning, routing.
---

# Model Routing (v5.2)
# Moved from root MODEL_ROUTING.md. Source of truth: CLAUDE.md.

> Match task complexity to model capability. Save cost on simple tasks.

## Routing Table

| Task Type | Tier | Recommended Models |
|-----------|------|--------------------|
| Architecture design | Tier 1 (Large) | Claude Opus, GPT-4.1, Gemini Ultra |
| Security audit | Tier 1 (Large) | Claude Opus, GPT-4.1 |
| Complex multi-file refactor | Tier 1 (Large) | Claude Opus, Claude Sonnet |
| Feature implementation | Tier 2 (Medium) | Claude Sonnet, GPT-4.1-mini |
| Bug fix | Tier 2 (Medium) | Claude Sonnet, GPT-4.1-mini |
| Code review | Tier 2 (Medium) | Claude Sonnet, Gemini Flash |
| Formatting / linting | Tier 3 (Small) | Claude Haiku, GPT-4.1-nano, Gemini Flash |
| Renames / boilerplate | Tier 3 (Small) | Claude Haiku, GPT-4.1-nano |
| Documentation | Tier 3 (Small) | Claude Haiku, Gemini Flash |

## Rules
- Default to Tier 2 unless task clearly requires Tier 1 or is simple enough for Tier 3
- Tell the user when a smaller model could handle the task
- Tier 1 tasks should have clear acceptance criteria before starting

## Reasoning Budget by Task Type
| Task Type | Model Tier | Reasoning Budget | Example |
|-----------|-----------|:----------------:|---------|
| Generate JSON/data | Small (Cerebras, llama3.1-8b) | None (0) | Codex data files |
| Write component | Medium (Groq, llama3-70b) | Low (~500 tokens) | New React component |
| Architecture decision | Large (Claude Opus, GPT-5) | Medium (~2,000) | Stack choice, DB design |
| Debug complex bug | Large + Extended | High (~5,000) | Multi-file state bugs |
| Refactor >500 lines | Gemini/Antigravity (1M ctx) | Medium (~2,000) | File splitting |

When calling APIs that support `max_thinking_tokens` or `reasoning_effort`:
- Set `reasoning_effort: low` for data generation tasks
- Set `reasoning_effort: medium` for standard coding tasks
- Set `reasoning_effort: high` only for architecture and complex debugging

Last reviewed: June 13, 2026 | Review by: September 2026 | Owner: Mel
