# Pattern Rules

## Purpose
Specify the rules governing how and when the system automatically adapts to the user's habits.

## How It Works
The engine evaluates entries in the pattern library. If confidence and frequency requirements are met, it safely initiates updates to session profiles or template contexts.

## Rules
1. **Adaptation Trigger**: Automatically trigger a system adaptation when a pattern achieves a Confidence of High (H) and a Frequency of $\ge$ 5.
2. **Context Update**: Apply adaptations by modifying user profiles in `.ungasis/context-engine/profiles/` or session templates.
3. **Safety Override**: Never adapt files listed in `EVOLUTION_LOCK.md` or lock-protected master prompts.
4. **Adaptation Logging**: Every automated system adjustment must be recorded in the adaptations log under `.ungasis/evolution/adaptations/`.

## Inputs/Outputs
| Component | Input Criteria | Output Action |
|---|---|---|
| Pattern Rules Engine | Pattern Library row (`pattern-library.md`) | Profile/Template update operations |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
