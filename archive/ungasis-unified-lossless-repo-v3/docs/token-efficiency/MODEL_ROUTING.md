# Model Routing (v4.0 - NEW)

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
