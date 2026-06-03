# Backlinks and Entity Neighborhoods Spec

## Backlinks
Backlinks answer: “What points to this entity?”

Example:
```text
Aery is linked from Karma Inspire, Janna shield patterns, Lulu shield patterns, and support enchanter builds.
```

## Neighborhoods
Neighborhoods answer: “What is near this entity?”

Depth 1: directly connected nodes.
Depth 2: effects and immediate recommendations.
Depth 3: wider build/counter/source paths.

## Usage
- Graph UI uses neighborhoods to draw visible nodes.
- RAG uses neighborhoods to add relationship context.
- Recommendations use neighborhoods to explain build choices.
- Analytics use neighborhoods to measure graph density and source coverage.
