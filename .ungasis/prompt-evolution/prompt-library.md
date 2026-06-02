# Prompt Library

## Purpose
Catalog and track the performance of standardized prompts used for system initialization, delegation, and building.

## How It Works
The library hosts the master copies of highly effective prompts. The scoring engine updates each prompt's metadata (score, uses, last used date) after execution.

## Master Prompts Index
| Task Type | Prompt Name | Score | Uses | Last Used |
|---|---|---|---|---|
| Kickoff | kickoff-A (batch build) | 8.8 | 15 | June 3, 2026 |
| Kickoff | kickoff-C (session resume) | 9.0 | 25 | June 3, 2026 |
| Kickoff | kickoff-D (blueprint request) | 8.5 | 10 | June 3, 2026 |
| Delegation | delegate-plan | 8.7 | 8 | June 2, 2026 |
| Delegation | delegate-build | 8.4 | 12 | June 2, 2026 |
| Delegation | delegate-test | 8.2 | 5 | June 2, 2026 |
| Delegation | delegate-review | 9.1 | 20 | June 2, 2026 |
| Delegation | delegate-merge | 8.9 | 6 | June 2, 2026 |

## Rules
1. **Selection standard**: Prompts must achieve a score of $\ge$ 8.0 to be classified as master prompts in this library.
2. **Usage Tracking**: Increments the `Uses` field and updates `Last Used` for every invocation of the prompt.
3. **Registry Standards**: Follow standard pipe-delimited format for all additions.

## Inputs/Outputs
| Component | Input Query | Output Prompt Content |
|---|---|---|
| Prompt Library | Task type or Prompt name | Standardized prompt string |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
