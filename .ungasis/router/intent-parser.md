# Natural Language Intent Parser

## Purpose
Translate casual developer prompts into structured actions, system commands, or targeted agent dispatches.

## Intent Mapping Table
| Mel Says (Casual Prompt) | Parsed Intent | Designated Target | Action |
|---|---|---|---|
| "what should I do?", "what's next?" | `PLAN` | `@commander` | Read queue and prioritize tasks |
| "how's the project?", "status?" | `STATUS` | `daily-pulse.py` | Query portfolio and display pulse metrics |
| "anything broken?", "any issues?" | `CHECK` | `warn-check.py` | Scan workspace files for warning flags |
| "build me a [thing]" | `BUILD` | Smart Router | Classify requirements and map build chain |
| "fix [this problem]" | `FIX` | Surgeon (Cline) | Isolate and resolve specific file errors |
| "design [a screen]" | `DESIGN` | `@designer` | Check Design DNA and draft visual assets |
| "score [this file]" | `QUALITY` | `quality-score.py` | Run lint checks and register quality scores |
| "I'm done for today" | `SESSION_END` | Handoff | Save state and compile handoff templates |
| "take a break", "tired" | `BREAK` | Energy | Register red energy and suggest resume schedule |
| "show me the graph" | `GRAPH` | Graphify | Re-render and load `graph.html` visualization |
| "deploy [project]" | `DEPLOY` | Deployment | Run git actions and execute deploy pipeline |

## Rules
1. **Pre-processing**: The intent parser runs *before* the Smart Router task complexity logic.
2. **Disambiguation Gate**: If a command's match score is low or ambiguous, display the top 2 candidate intents and ask Mel to clarify.
3. **Slash Shortcut Promotion**: If a command matches an registered custom slash command, suggest using the `/[command]` prefix in the chat UI.
4. **Learning Logs**: Append all parsed commands, outcomes, and corrections to the shared `router-log.md`.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
