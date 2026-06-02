# Idea Template

## Purpose
Provide a standardized markdown layout for capturing, detailing, and measuring new ideas in the Ideas Garden.

## How It Works
```
New Idea Formulated ──> Copy Template ──> Populate Metadata ──> Save to .ungasis/cortex/ideas/
```

## Rules
1. Every captured idea file must be named using kebab-case and stored in `.ungasis/cortex/ideas/`.
2. All sections in the Idea Form must be filled; no empty fields are allowed.
3. The initial stage for any new idea is strictly set to "Seed".
4. Estimate key metrics (difficulty, value) using a 1-5 scale (1: lowest, 5: highest).

## Idea Form Template

```markdown
# Idea: [Title of the Idea]

## Metadata
| Parameter | Value |
|---|---|
| Idea ID | IDX-[Number] |
| Captured Date | YYYY-MM-DD |
| Lifecycle Stage | Seed |
| Estimated Value (1-5) | [Value] |
| Difficulty (1-5) | [Difficulty] |

## Problem Statement
[Describe the pain point or problem this idea solves.]

## Proposed Solution
[Detail the proposed solution, feature, or mechanism.]

## Value Hypothesis
[Explain why this idea is worth pursuing and what return it provides.]
```

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| New concept details | Mel / Agent | The brainstormed idea parameters |

| Output | Destination | Description |
|---|---|---|
| Created idea file | Disk (`.ungasis/cortex/ideas/`) | Completed idea markdown file |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
