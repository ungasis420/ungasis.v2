# Prompt Evolution Rules

## Purpose
Specify rules for when and how prompts are cloned, modified, tested, and promoted.

## How It Works
When a prompt score drops below the threshold, the evolution engine triggers a mutation workflow. The modified prompt is tested in parallel before being promoted to the library.

## Rules
1. **Evolution Trigger**: Evolve a prompt if its score is below 6.0 after 3 uses, or if a more efficient prompt pattern is discovered.
2. **Mutation Steps**:
   - Step 1: Clone the existing prompt to a temporary sandbox.
   - Step 2: Apply optimization techniques (e.g., token pruning, clearer role definitions).
   - Step 3: Test and compare outputs side-by-side.
   - Step 4: Promote to the active prompt library if the new score exceeds the old score.
3. **Safety Archive**: Never delete a working prompt. Keep the original prompt in an `_archive` folder when promoting the mutated version.
4. **Metadata Updates**: Increment the version number and log the adaptation history when promoting.

## Inputs/Outputs
| Component | Input Prompts | Output Mutated prompt |
|---|---|---|
| Mutation Engine | Low-performing prompt + Sandbox results | Optimized, high-performing prompt |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
