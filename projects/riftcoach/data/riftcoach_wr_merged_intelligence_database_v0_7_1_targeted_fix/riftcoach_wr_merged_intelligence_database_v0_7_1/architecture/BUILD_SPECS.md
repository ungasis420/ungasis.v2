# Build Specs

## Chunk 1 build objective
Create the foundation that later chunks must obey.

## Runtime compatibility
The existing app reads simple `public/data/*.json` files. Chunk 1 provides runtime-compatible rule files while expanded data lives under `database/`.

## Future chunk integration
Later chunks should add:
- `public/data/champions.json`
- `public/data/items.json`
- `public/data/runes.json`
- `public/data/spells.json`
- `public/data/builds.json`
- `public/data/meta_builds.json`
- `public/data/archetype_builds.json`
- `public/data/counters.json`
- `public/data/synergies.json`

Expanded files remain under `database/` and feed RAG/graph/analytics layers.

