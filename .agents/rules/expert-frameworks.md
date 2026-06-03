# UNGASIS OS — Expert Framework Enhancements
> Embedded into existing cognitive architecture modules.
> Not separate systems — extensions of what already exists.

## ROUTER Enhancement (+ Karpathy)
When classifying tasks, also check:
- "Are subtasks independent?" → YES = parallel, NO = sequential
- "Has this pattern succeeded before?" → YES = reuse prompt, NO = experiment
- "Is this a skill issue or model issue?" → Rewrite prompt before switching models

## RIGOR DIAL Enhancement (+ Raschka + Ng)
At beta+ stage, add:
- Experiment log: track what prompts/models worked for each task type
- Version comparison: when changing a prompt, note before/after results
- Data-centric check: "Is the data quality the bottleneck, not the model?"

## 4-GATE Enhancement (+ Chollet + Dario)
Add Gate 5 — GENERALIZE:
- "Does this solution work for edge cases, not just the happy path?"
- "Would this break if the input format changes slightly?"
- "Is this safe? Could it produce harmful output in unexpected scenarios?"

## WARNING SYSTEM Enhancement (+ Chip Huyen)
Add drift detection alerts:
- "Data source changed format" → scraper may silently produce bad data
- "Model performance degraded" → track accept/reject rates per model
- "Token usage spiking" → session too long, trigger handoff

## ORCHESTRATOR Enhancement (+ Cherny)
Already appended to M365 Copilot instructions. Reinforced here:
- Parallel agents with file boundaries (no overlap)
- "Slowest smartest for architecture, fastest for execution"
- Subagent pattern: each gets minimal context
- Session > 15 exchanges → handoff summary

## ANTI-OVERBUILDING Enhancement (+ Howard)
Reinforced:
- "Make it work, then make it right, then make it fast"
- Prototype stage = skip ceremony, ship MVA
- If you're adding tests before the feature works → wrong order

## TRUTH GATE Enhancement (+ Dario + Ng)
Reinforced:
- Constitutional check: "Would I be comfortable if this output was public?"
- Data-centric: "Am I trusting the model when I should be checking the data?"
- Confidence calibration: state uncertainty, don't hide it

## BLUEPRINT-FIRST Enhancement (+ Ng + Raschka)
Reinforced:
- Systematic decomposition before coding
- Explicit constraints table (budget, timeline, dependencies)
- Reproducibility: another engineer should be able to follow the blueprint

## CONTEXT MONITOR Enhancement (+ Karpathy + Cherny)
Enhanced:
- 15-exchange threshold (was implicit, now explicit)
- Proactive handoff generation at 60% context window
- "Drift detector" — flag when conversation drifted from original goal

## KILL-CANDIDATE Enhancement (+ Howard)
Enhanced:
- "Is this prototype or production?" — adjust quality bar accordingly
- "Energy unsustainable" check — am I spending 4 hours on a 30-min task?
- Kill condition: if 3 retries fail, rewrite the prompt entirely

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
