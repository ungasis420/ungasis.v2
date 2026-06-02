# Audit Report: v3.0 -> v4.0

## v3 Strengths: 10 layers, 18 sources, SCAN->PLAN->EDIT->VERIFY->SUMMARIZE->HANDOFF workflow.

## v4 Additions (22 gaps closed)
### New Files: .claudeignore, .claude/settings.json, docs/MODEL_ROUTING.md, docs/CONTEXT_BUDGET.md
### New Concepts:
1. Pre-tool hooks (declare before reading)
2. Fill-% budget zones (Green/Yellow/Orange/Red)
3. Model routing (Tier 1/2/3)
4. On-demand vs always-on file classification
5. Context rot detection
6. Message cap (15-20 target, 25 hard limit)
7. Token breakdown table
8. MAX_THINKING_TOKENS (saves ~30%)
9. MCP tool pruning
10. Cost-per-task guidelines

### Cross-Check Refinements:
- Output rules vary by mode (code/explain/debug/review/research)
- Lock files excluded from agent context but NOT from .gitignore
- Compaction trigger lowered from 93% auto to 60-70% manual
- Cline Memory Bank mapping documented
- Copilot Spaces integration documented

## Final Doctrine
Token efficiency = smaller instructions + better routing + relevant reads + small patches + fill-% zones + model routing + durable memory
