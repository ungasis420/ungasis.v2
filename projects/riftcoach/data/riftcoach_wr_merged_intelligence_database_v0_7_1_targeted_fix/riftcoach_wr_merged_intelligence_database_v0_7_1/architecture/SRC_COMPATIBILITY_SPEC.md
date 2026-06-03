# src Compatibility Spec

The uploaded app currently expects simple runtime fields such as:
- champions.json: id, name, classes, roles, tier, rangeType, resource, adaptiveType, style, abilities[]
- items.json: id, name, tier, category, cost, stats[], passive
- runes.json: id, name, type, path, slot, description, tier
- spells.json: id, name, effect, cooldown

The v0.6 database should preserve these simple fields for UI compatibility while adding expanded nested fields for RAG, graph, analytics, and validation.

Rule: do not break the simple shape; extend it.

