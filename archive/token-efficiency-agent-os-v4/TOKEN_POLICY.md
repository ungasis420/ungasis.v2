# TOKEN_POLICY.md - Token Efficiency Policy (v4.0)

## Token Breakdown
| Category | Budget |
|----------|--------|
| Instructions | 5-10% |
| Project context | 10-15% |
| File reads | 30-40% |
| Reasoning | 15-20% |
| Output | 15-25% |
| Buffer | 5-10% |

## Message Cap: Target 15-20. Hard limit 25: mandatory compaction.

## Fill-% Zones
| Zone | Fill% | Policy |
|------|-------|--------|
| Green | 0-50% | Full exploration, examples OK |
| Yellow | 50-70% | Efficiency mode, skip examples |
| Orange | 70-85% | Compaction mode, /compact |
| Red | 85%+ | Emergency: hand off |

## Pre-Tool Filter: 1.Excluded?->SKIP 2.Needed?->SKIP 3.Partial?->Lines 4.Full read
## Always-On (<=15%): AGENTS.md, TOKEN_POLICY.md, tool config, docs/PROJECT_BRIEF.md
## On-Demand: RESEARCH_PROTOCOL, SUBAGENT_PROTOCOL, skills/*, templates/*
## Context Rot: Re-read critical files after 5+ msgs. Check DECISIONS.md before arch changes.
## Cost: Bug fix 5-15K/3-5msg | Feature 20-50K/8-15msg | Review 5-10K/2-4msg | Refactor 40-80K/10-20msg
