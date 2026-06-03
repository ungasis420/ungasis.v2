# Recommendation Engine Spec

## Input
match_context: champion, lane, role, allied champions, enemy champions, enemy threats, team needs, player skill profile, patch_version.

## Process
1. Validate source and patch context.
2. Validate champion role/lane/class fit.
3. Retrieve source-verified mechanics and generated strategy separately.
4. Validate rune/item/spell legality.
5. Score recommendations using source confidence, patch freshness, mechanic match, role/lane fit, and data completeness.
6. Return reason codes and suppression reasons.

## Output
legal ranked recommendations with confidence and source status.

