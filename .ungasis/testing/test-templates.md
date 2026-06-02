# Test Templates Engine

## Purpose
Define reusable test templates and checklists to automate validation of new files and integrations.

## How It Works
The engine provides layout frameworks for checklist validation, content matches, and cross-reference sanity testing.

## Rules
1. All test records must be logged using one of the three formats below.
2. Integration tests must verify references exist on both ends (source and destination).

## Test Layout Templates

### Template 1: Checklist Test (Y/N)
```markdown
## Checklist Test: [File Name]
- [ ] Purpose Section Present? (Y/N)
- [ ] How It Works Section Present? (Y/N)
- [ ] Rules Section Present? (Y/N)
- [ ] Inputs/Outputs Section Present? (Y/N)
- [ ] Staleness Footer Valid? (Y/N)
```

### Template 2: Content Test (Expected vs Actual)
```markdown
## Content Test: [Property Name]
- Expected Pattern: [regex or string]
- Actual Content: [found string]
- Result: [PASS/FAIL]
```

### Template 3: Integration Test (Cross-Engine)
```markdown
## Integration Test: [Source Engine] -> [Target Engine]
- Bus manifest link registered? (Y/N)
- Event type mapped? (Y/N)
- Target consumer exists? (Y/N)
```

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `test_type` | Test Strategy | Selected template format to execute |

| Output | Destination | Description |
|---|---|---|
| `filled_test_template` | Quality Log | Completed test structure |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
