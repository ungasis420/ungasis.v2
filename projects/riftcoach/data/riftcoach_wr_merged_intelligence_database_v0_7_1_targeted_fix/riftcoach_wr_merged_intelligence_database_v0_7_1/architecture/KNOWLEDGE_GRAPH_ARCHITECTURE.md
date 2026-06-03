# Knowledge Graph Architecture

## Core nodes
Champion, Ability, Item, Rune, Spell, Patch, Role, Lane, Class, Effect, DamageType, DefenseType, CrowdControlType, Build, CounterEdge, SynergyEdge, Source, Claim, Rule, ValidationReport.

## Core edges
HAS_ABILITY, HAS_EFFECT, USES_ITEM, USES_RUNE, USES_SPELL, COUNTERS, DENIES, MITIGATES, SYNERGIZES_WITH, CHANGED_IN_PATCH, SOURCE_SUPPORTS, HAS_GOLD_COST, HAS_COOLDOWN, VALIDATED_BY.

## Data quality rule
Graph edges must reference valid source and target IDs. Source-verified numeric nodes require linked Claim nodes.

