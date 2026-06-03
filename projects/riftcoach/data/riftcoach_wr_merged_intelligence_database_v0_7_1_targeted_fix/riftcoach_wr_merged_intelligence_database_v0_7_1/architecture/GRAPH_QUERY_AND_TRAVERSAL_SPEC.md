# Graph Query and Traversal Spec

## Purpose
Define how RiftCoach asks relationship questions.

## Common questions
- What items synergize with this champion ability effect?
- What counters this threat type?
- Why is this rune recommended for this archetype?
- What changed in this patch that affects this build?
- What source claim supports this cooldown or item gold value?

## Traversal types
1. Direct neighborhood: one-hop links from a selected entity.
2. Explainer path: source entity → relationship → target entity with reason codes.
3. Recommendation path: champion + lane + enemy threat → effects → candidate builds/items/runes/spells.
4. Source path: entity → field → claim → source URL.
5. Patch path: patch → changed entity → affected builds/synergies/counters.

## Safety rule
Graph traversal is not enough. Generated answers must still obey source policy, source status, confidence score, build legality, and patch validity.
