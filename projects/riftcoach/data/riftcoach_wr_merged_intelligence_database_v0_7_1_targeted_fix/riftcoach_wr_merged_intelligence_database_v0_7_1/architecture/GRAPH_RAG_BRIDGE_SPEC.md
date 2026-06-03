# Graph + RAG Bridge Spec

## Purpose
Combine text retrieval with relationship traversal.

## RAG-only problem
Text chunks can find a relevant paragraph but may miss connected mechanics.

## Graph-assisted RAG solution
1. Retrieve text chunks for the user query.
2. Identify entities in retrieved chunks.
3. Expand graph neighborhood around those entities.
4. Filter by patch, source status, confidence, role/lane, and build legality.
5. Build answer context from both chunks and graph paths.

## Example
Query: “Karma support vs dive, enchanter or tank?”

RAG finds Karma and support build chunks.
Graph adds:
- Inspire → shield + movement speed
- Focused Resolve → tether + root
- enemy threat → dive / burst
- support rules → support item + boots + 4 remaining slots
- items/runes → peel, shield, survival, anti-burst

Result: a better grounded recommendation.
