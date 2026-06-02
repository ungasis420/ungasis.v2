# reasoning-framework.md — Reasoning Framework

## Purpose
This document establishes rules for when an agent should spend tokens on step-by-step reasoning (using thinking models) versus executing commands directly.

## How It Works
When a task is loaded, the agent evaluates the Complexity and Novelty of the problem using the matrix below to determine the required Reasoning Depth.

## Decision Matrix
| Complexity | Novelty | Risk Level | Reasoning Depth | Recommended Model |
|---|---|---|---|---|
| High | High | High | Deep | Claude Opus (Thinking) |
| High | Medium | Medium | Moderate | Gemini Flash / Pro |
| Medium | High | Medium | Moderate | Gemini Flash / Pro |
| Medium | Medium | Low | Skip | Gemini Flash |
| Low | any | Low | Skip | Cerebras Llama 8b |

## Rules
1. **Force Deep Reasoning**: Always use Deep Reasoning when creating a new engine, implementing changes affecting 3+ files, or dealing with L2+ security classification.
2. **Direct Execution**: Fast-execute simple tasks (such as spelling corrections, simple file moves, and package installs) without opening a reasoning block.

## Inputs and Outputs
- **Inputs**: Task specs, file paths, dependency maps.
- **Outputs**: Chosen reasoning level, target model selection.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
