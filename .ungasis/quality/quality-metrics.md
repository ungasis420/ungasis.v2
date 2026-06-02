# Quality Metrics Engine

## Purpose
Define specific, measurable evaluation parameters for each file category (Markdown, Blueprint, Code) to ensure concrete audits.

## How It Works
The engine provides checklist criteria and target metrics based on file extension and location, grading them on a 1-10 scale.

## Rules
1. Metrics checks must be customized per file type.
2. For Code files, TypeScript `any` types are strictly forbidden (automatic deduction of 3 points).
3. Every Markdown file must pass the staleness footer check (automatic fail if missing).

## Specific Evaluation Metrics

### 1. Markdown Files (`.md`)
- **Sections Present**: Purpose, How It Works, Rules, Inputs/Outputs (for engines).
- **Staleness Footer**: Must match standard June 2026 text.
- **Word Count**: Under 200 lines per file (compactness constraint).
- **Readability**: Simple English, short sentences.

### 2. Blueprints (`blueprints/`)
- **Required Sections**: All 8 sections from blueprint.md workflow must exist.
- **Token Count**: Scoped context matching reasoning budget.
- **Actionability**: Clear, decomposed tasks list.

### 3. Code Files (`.js`, `.py`, `.ts`)
- **Conventions**: Consistent naming syntax.
- **Strict Typing**: No unsafe types (e.g. `any`).
- **Imports**: Sorted imports, modular dependencies.

## Metric Weights Table

| File Type | Metric Key | Weight in Dimension | Target Value |
|---|---|---|---|
| Markdown | footer_valid | 50% of Format | True |
| Markdown | line_count | 50% of Format | ≤ 200 lines |
| Blueprint | section_count | 60% of Completeness | 8 sections |
| Code | no_any_type | 40% of Accuracy | 100% compliant |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `file_content` | File System | Raw file source for metrics extraction |

| Output | Destination | Description |
|---|---|---|
| `metric_ratings` | Quality Framework | Set of metric grades (1-10) for calculation |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
