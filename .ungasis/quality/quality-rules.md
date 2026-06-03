# Quality Rules
 
## Purpose
Define the dimensions, weightings, and mathematical formula to compute a quality score from
1-10 for every artifact.
 
## How It Works
```
Audit Results ──> Rate each of 5 dimensions ──> Calculate weighted average ──> Determine
Threshold action
```
 
## Rules
1. Every file reviewed must receive a score on a scale of 1 to 10.
2. The final quality score is computed using the weighted averages of the 5 dimensions.
3. Any output scoring below 6.0 is marked as a FAIL and must be refactored before merging.
 
## Quality Dimensions Matrix
 
| Dimension | Weight | Target Criteria |
|---|---|---|
| Completeness | 25% | All required files and sections exist |
| Accuracy | 25% | Technical values, paths, and patterns are correct |
| Clarity | 20% | Simple English, short sentences, and explanations |
| Format | 15% | Correct markdown layout and footer presence |
| Reusability | 15% | Modular design, clear inputs/outputs |
 
## Score Threshold Action Rules
 
| Score | Rating | Action Required |
|---|---|---|
| ≥ 8.0 | Excellent | Ready to merge; log as positive pattern |
| 6.0 - 7.9 | Good | Ready to merge; flag minor improvements |
| 4.0 - 5.9 | Needs Work | Request edit from builder; do not merge |
| < 4.0 | Redo | Trigger full reconstruction; do not merge |
 
## Inputs/Outputs
 
| Input | Source | Description |
|---|---|---|
| `dimension_scores` | Quality Auditor | Raw scores (1-10) for the five criteria |
 
| Output | Destination | Description |
|---|---|---|
| `computed_quality_score` | Quality Log | Final weighted score and rating classification |

## Additional Context

### When to Use:
Use quality framework rules during code reviews and quality checks to grade artifacts.

### Example
```markdown
- [ ] Evaluate Completeness: 10/10.
- [ ] Evaluate Clarity: 8/10.
- [ ] Compute overall score: 8.2 (Excellent).
```

### Tags:
quality, scoring, audit, matrix

### See also:
-
[warnings/warning-rules.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/warnings/warning-rules.md)
-
[suggestions/suggestion-rules.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/suggestions/suggestion-rules.md)
 
---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
