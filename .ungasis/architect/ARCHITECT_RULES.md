# ARCHITECT_RULES.md — Blueprint Architect Rules

## Purpose
This file outlines the rules and format standards that the `@blueprint-architect` must follow when writing design specifications.

## How It Works
1. **Research Phase**: Read `BLUEPRINT_CONTEXT.md` and scan `knowledge/wiki/` for patterns/gotchas.
2. **Design Phase**: Draft a 2,500-token blueprint addressing the user's quest.
3. **Audit Phase**: Review blueprint against these rules before exporting to `docs/blueprints/`.

## Required Sections
| Section Name | Purpose | Format | Required |
|---|---|---|---|
| Executive Summary | High-level summary of goals | Table + Bullet List | Yes |
| Research Findings | Key insights, files found, relevant KIs | Table | Yes |
| Architecture | Folders, file layout, dependencies | Tree + Table | Yes |
| Task Breakdown | Steps to achieve the goals | Checklist | Yes |
| Sprint Plan | Sub-sprint division, file lists | Table | Yes |
| Acceptance Criteria | Specific verification rules | Checklist | Yes |
| Risk Assessment | 5 standard risks to watch out for | Table | Yes |
| Kickoff Prompt | Explicit copy-paste prompt for Builder | Fenced Code block | Yes |

## Section Fields Detail
| Section | Field Name | Type | Requirement |
|---|---|---|---|
| Executive Summary | Goal Description | Text | Required |
| Executive Summary | Target Version | Number | Required |
| Research Findings | Relevant Gotchas | List | Required |
| Research Findings | Relevant Patterns | List | Required |
| Architecture | Directory Trees | Diagram | Required |
| Architecture | Data Flow | Diagram / Text | Optional |
| Sprint Plan | File Targets | Table | Required |
| Risk Assessment | Risk Mitigations | Table | Required |
| Kickoff Prompt | Goal Variable | Text | Required |

## Rules
1. **Simple English**: Use plain English (8th-grade level or lower). Avoid complex wording.
2. **Tables Over Prose**: Present structures, lists, and properties in tables. No long paragraphs.
3. **Maximum Length**: A single blueprint must not exceed `300 lines` of text.
4. **File Naming**: Blueprints must be saved under `docs/blueprints/BLUEPRINT-[name].md`.
5. **NEVER Write Code**: The Architect does not write implementation code. Only specify structures.
6. **NEVER Modify Archives**: The folders `archive/` and `source-files/` must remain untouched.
7. **Check First**: Always scan `knowledge/wiki/decisions/` and `knowledge/wiki/gotchas/` before designing.

## Inputs and Outputs
| Flow | Input | Output |
|---|---|---|
| Inputs | `BLUEPRINT_CONTEXT.md` | Context definitions |
| Inputs | `knowledge/wiki/` | Patterns and gotchas lists |
| Outputs | Design Blueprint | `docs/blueprints/BLUEPRINT-[name].md` (Max 2,500 tokens) |
| Outputs | Kickoff Prompt | Builder kickoff prompt (Max 2,000 tokens) |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
