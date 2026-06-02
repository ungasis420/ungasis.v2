# Knowledge Gaps Radar Engine

## Purpose
Track technical, tool, domain, and soft skill gaps to prioritize learning objectives and target skill acquisition.

## How It Works
The engine stores Mel's learning gaps, records his current proficiency level (1-5), sets target levels, and suggests specific learning resources.

## Rules
1. All knowledge gaps must be categorized into one of four areas: Technical, Tools, Domain, or Soft.
2. Proficiencies are measured on a scale of 1 (Novice) to 5 (Expert).
3. Gaps must be closed using the strategies specified in `gaps-rules.md`.

## Knowledge Gaps Database Matrix

| Category | Topic | Current Level (1-5) | Target Level | Priority | Learning Resource |
|---|---|---|---|---|---|
| Technical | PowerBI Advanced DAX | 2 | 4 | Medium | Microsoft docs & tutorials |
| Tools | Graphify Visualization | 3 | 5 | High | Skill observer scripts |
| Domain | SaaS Valuation | 1 | 3 | Low | Indichackers articles |
| Soft | Agent Handoff Protocols | 3 | 4 | High | Multi-agent templates |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `audit_findings` | Quality Auditor | Audit FAIL reports indicating lack of knowledge |
| `scout_updates` | Scout Engine | Newly discovered topics with zero local SOPs |

| Output | Destination | Description |
|---|---|---|
| `radar_priorities` | Session Planner | Recommended learning tasks to inject into queue.md |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
