# Timeline Rules Engine

## Purpose
Define the scheduling estimation rules, converting qualitative task sizes (S/M/L/XL) into numeric time budgets with buffer safety factors.

## How It Works
```
Task Sizes ──> Map to Minutes ──> Add 20% Buffer ──> Sum sprint total ──> Track Planned vs Actual
```

## Rules
1. Map task sizes to base duration:
   - S = 15 minutes
   - M = 30 minutes
   - L = 60 minutes
   - XL = 120 minutes (must decompose)
2. Every estimation must include a +20% buffer to handle unexpected debugging or context overflows.
3. Compare actual time against planned time and calculate variance:
   `variance = ((actual - planned) ÷ planned) × 100%`.
4. If variance exceeds +30%, update historical buffers for the next sprint cycle.

## Sizing to Timeline Translation Matrix

| Size | Base Minutes | Buffer (20%) | Total Planned Minutes |
|---|---|---|---|
| **S** | 15 min | 3 min | 18 min |
| **M** | 30 min | 6 min | 36 min |
| **L** | 60 min | 12 min | 72 min |
| **XL** | 120 min | 24 min | 144 min |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `task_sizes` | Decomposer | S/M/L/XL sizing categorization per task |
| `actual_duration` | CLI / Conductor | Time elapsed to complete tasks in the sprint |

| Output | Destination | Description |
|---|---|---|
| `sprint_estimation` | Timeline Template | Total planned execution duration for the sprint |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
