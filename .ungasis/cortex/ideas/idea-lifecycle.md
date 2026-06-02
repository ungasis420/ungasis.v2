# Idea Lifecycle

## Purpose
Define the lifecycle stages, transition criteria, and workflow rules for ideas in the Ideas Garden.

## How It Works
```
Seed (Concept) ──> Sprout (Validating) ──> Grow (Planning) ──> Harvest (Active) ──> Archive (Done)
```

## Rules
1. Ideas must progress through the lifecycle stages in sequence; do not skip stages.
2. Every stage transition must satisfy the criteria defined in the Lifecycle Table.
3. Track and update the "Lifecycle Stage" metadata field in the individual idea file on every transition.
4. Clean out stagnant "Seed" ideas (inactive for 60+ days) to the Archive during the weekly review.

## Lifecycle Transition Criteria

| Stage | Definition | Gate to Next Stage | Handoff Destination |
|---|---|---|---|
| Seed | Captured raw concept | Validate interest or feasibility | Sprout |
| Sprout | Undergoing validation | Write problem and value hypothesis | Grow |
| Grow | Spec and planning phase | Blueprint generated & approved | Harvest |
| Harvest | Active implementation | Code merged and verified in prod | Archive |
| Archive | Fully completed or retired | Final learnings documented | Done |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| State change request | Builder Agent / Mel | Trigger to transition an idea stage |

| Output | Destination | Description |
|---|---|---|
| Updated idea file | Disk (`ideas/*.md`) | Idea file with updated metadata stage |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
