# Model Performance Metrics

## What
A comparative reference tracking AI model performance across different development tasks.

## Code (if applicable)
| Model | Task Type | Success Rate | Avg Tokens | Notes |
|---|---|---|---|---|
| Gemini 3.5 Flash | Scaffolding / Docs | 94% | 15k | Fast, excellent layout following |
| Claude 3.5 Sonnet | Logical Debugging | 91% | 22k | High logical reasoning capability |
| Llama 3 (Groq) | Quick Fixes | 88% | 8k | Instant completions, low latency |
| Ollama devstral | Autocomplete | 75% | 2k | Runs local; prone to timeouts |

## When to Use
Consult this sheet when deciding which model to route a specific task to in `MODEL_ROUTING.md`.

## Gotchas
- Local models should never be assigned complex debugging tasks due to potential context limits.

## Source
Learned in: RiftCoach (114 model attempts) & UNGASIS (9 sprints) (May-June 2026)
Verified in: None

## Tags
performance, agent

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
