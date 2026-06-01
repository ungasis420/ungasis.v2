# Model Routing v4.1

Use the smallest model that can safely finish the task.

## Original compact routing

| Tier | Models | Use For |
|------|--------|---------|
| 0 Local | devstral, qwen2.5-coder:14b | Autocomplete $0 |
| 1 Large | Opus 4.8, GPT-4.1 | Architecture |
| 2 Medium | Sonnet 4, GPT-4.1-mini | Features |
| 3 Small | Haiku 4, GPT-4.1-nano | Docs |

Start Tier 2. Escalate after 3 fails.

## Revised routing rules

| Task | Start tier | Escalate when |
|------|------------|---------------|
| Simple docs, summaries, formatting | Tier 3 | Output is unclear twice. |
| Normal feature work | Tier 2 | Three failed attempts or multi-file reasoning needed. |
| Architecture, security, production readiness | Tier 1 | Already Tier 1. Use strict acceptance checks. |
| Local autocomplete or private drafts | Tier 0 | Local model is too weak or too slow. |

## Safety rules

- Do not paste real secrets into any online model.
- Use local/private processing for sensitive files when possible.
- Check current model names, pricing, and limits before paid or production work.
- Keep task context small: only send the files needed for the current task.

## Feynman explanation

Model routing means choosing the right size brain for the job. A small job does not need the strongest model.

## Layman analogy

Use a bicycle for a nearby errand, a car for a long trip, and a truck only when you need to move heavy furniture.
