# task-sizing.md — Task Sizing and Budgets

## Purpose
This document sets standards for task sizing, time estimation, and token budgets for agent execution.

## How It Works
Before assigning a task, the agent checks the size parameters. The size determines the model choice and sets the maximum context tokens allocated.

## Sizing Matrix
| Size | Max Duration | File Modifications | Token Budget | Model Choice |
|---|---|---|---|---|
| **S** | ≤ 15 minutes | 1 file | 500 tokens | Surgeon (Cerebras) |
| **M** | ≤ 30 minutes | 2-3 files | 1,000 tokens | Surgeon / Builder |
| **L** | ≤ 60 minutes | 4-6 files | 2,500 tokens | Builder (Flash) |
| **XL** | ≤ 120 minutes| 7+ files (Split Goal) | 4,000 tokens | Split into Sub-sprints |

## Sizing Examples
| Example Task | Files Touched | Sizing Category | Reasoning |
|---|---|---|---|
| Fix a spelling error in a readme | 1 file | S | Minimal change, fast fix |
| Add a single route and view | 2 files | M | Standard change, low complexity |
| Create a new module with tests | 5 files | L | Requires code, docs, and test suite |
| Build an entire authentication system | 12 files | XL | Too large. Must decompose first |

## Rules
1. **Split XL Goals**: Any task rated XL must be split into multiple smaller sub-sprints.
2. **Context Budget Enforcement**: If active tokens exceed the sizing limit, trigger context decay immediately.

## Inputs and Outputs
- **Inputs**: Task specs, file target list.
- **Outputs**: Sizing classification, assigned model, context budget limit.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
