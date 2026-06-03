# RAG / Vector Architecture

RAG chunks are source-aware knowledge objects, not blind text blobs.

## Chunk groups
- champion identity
- champion ability
- item mechanics
- rune mechanics
- spell mechanics
- build archetypes
- synergies
- counters / deny logic
- strategy notes

## Required metadata filters
patch_version, game, not_lol_pc, source_status, source_family, entity_type, entity_id, roles, classes, lanes, effect_tags, damage_types, defense_types.

## Retrieval safety
If a record is pending source refresh, the assistant may reason strategically but must not present exact numeric values as verified.

