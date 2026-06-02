# Pattern Library

## Purpose
Store all identified user patterns and coordinate the system adaptations associated with each behavior.

## How It Works
Patterns identified by the observer are added here. The engine assesses confidence and frequency levels before triggering automatic system adaptations.

## Discovered Patterns Library
| Pattern | Frequency | Confidence | Adaptation | Since Date |
|---|---|---|---|---|
| **Prefers tables over prose** | 24 | H | Format output summaries as tables | June 2, 2026 |
| **Works best morning/afternoon** | 18 | H | Suggest complex tasks during 08:00-17:00 | June 2, 2026 |
| **Uses cooking analogies** | 12 | H | Adapt descriptions using kitchen metaphors | June 2, 2026 |
| **Pastes prompts sequentially** | 8 | M | Optimize prompt sequencing layouts | June 2, 2026 |

## Rules
1. **Confidence Scale**: Set Confidence to High (H) if frequency is $\ge$ 10, Medium (M) if 5 to 9, or Low (L) if $<$ 5.
2. **Review Interval**: Re-evaluate the pattern library weekly to promote or retire behavioral records.
3. **Registry Standards**: Follow standard pipe-delimited format for all additions.

## Inputs/Outputs
| Component | Input Format | Output Format |
|---|---|---|
| Pattern Library | Aggregated observer findings | System preference adjustments |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
