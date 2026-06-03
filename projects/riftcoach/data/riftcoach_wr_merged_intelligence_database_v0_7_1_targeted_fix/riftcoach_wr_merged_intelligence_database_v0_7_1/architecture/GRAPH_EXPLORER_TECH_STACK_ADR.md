# ADR: Relationship Explorer Technology Direction

## Decision
Use JSON/JSONL relationship files first, then support optional graph UI libraries and graph databases later.

## Context
RiftCoach is still being built in chunks. The database needs relationship readiness before it needs a heavy graph stack.

## Options considered
1. JSON/JSONL only
2. React Flow graph canvas
3. Cytoscape.js graph explorer
4. Neo4j graph database
5. Full graph neural network stack

## Chosen path
Prototype path:
- JSON/JSONL relationship index
- backlinks and neighborhoods files
- saved graph views
- app UI can later render with React Flow or Cytoscape.js

Upgrade path:
- Neo4j/Cypher-style queries when relationship volume is large
- GNN only after labeled training/evaluation data exists

## Why not heavier now
A full graph database is not required to validate the relationship model. The next real need is clean entity/edge generation, source provenance, and graph integrity validation.

## Reversal path
If local JSON becomes too slow or hard to query, migrate `global_relationship_index.jsonl` into graph tables or Neo4j nodes/edges.
