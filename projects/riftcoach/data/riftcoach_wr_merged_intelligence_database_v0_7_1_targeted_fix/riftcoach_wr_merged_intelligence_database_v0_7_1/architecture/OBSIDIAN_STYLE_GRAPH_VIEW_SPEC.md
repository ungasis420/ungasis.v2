# Obsidian-Style Graph View Spec

## Purpose
Provide a visual relationship map for RiftCoach where champions, abilities, items, runes, spells, effects, builds, counters, synergies, patches, and source claims can be explored as connected nodes.

## Beginner model
Think of every asset as a note card. Lines between cards explain why they are connected.

## Core graph flow
```text
Entity selected → fetch node → fetch edges → expand neighborhood → filter by type/status/confidence → show explanation panel
```

## Must-have features
1. Center node view: user starts from a champion, item, rune, spell, effect, or build.
2. Depth control: depth 1, 2, or 3 hops.
3. Edge filters: synergy, deny, counterplay, uses, has effect, changed in patch, source supports.
4. Source-status filter: source_verified, generated_rule, generated_archetype, pending_allowed_source_refresh.
5. Confidence filter: hide low-confidence generated relationships when needed.
6. Relationship explanation: every edge explains why it exists.
7. Backlinks: every entity shows what links into it.
8. Saved graph views: prebuilt maps such as Karma Support Enchanter or Anti-Burst Defense.
9. No LoL-PC contamination: graph nodes/edges inherit Chunk 1 source policy.

## Non-goals for prototype
- Do not require Neo4j for the first local version.
- Do not require complex GNN training.
- Do not show every node by default; avoid unreadable graph hairballs.

## Recommended implementation path
Prototype: JSON/JSONL + local graph explorer UI.
Private beta: indexed relationship files + search/filter + saved views.
Scale later: graph database and graph algorithms if relationship volume becomes difficult to query locally.
