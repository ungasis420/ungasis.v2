# Dependency Graph

## Purpose
This document maps and tracks the dependency relationships between the 9 core UNGASIS engines and 3 automation systems to prevent breaks during changes.

## How It Works
The dependency matrix specifies which components are prerequisites for other components to function correctly. This is formatted as a structured markdown table.

## Dependency Graph Table

| Component Name | Depends On | Dependency Type | Purpose / Impact |
|---|---|---|---|
| **Context Engineering** | Knowledge Compounding | Soft | Context Engine queries wiki directories to build context |
| **Context Engineering** | Auto-Orchestrator | Hard | Requires queue.md task information to load profiles |
| **Self-Evolution Loop** | Context Engineering | Soft | Adjusts context budgets based on execution stats |
| **Self-Evolution Loop** | Auto-Orchestrator | Soft | Reads metrics to apply adaptations |
| **Project DNA** | Auto-Orchestrator | Soft | Copied/used by scaffolding workflows |
| **Decision Intelligence** | Knowledge Compounding | Hard | Checks decisions/ precedents during research phases |
| **SOP Library** | Auto-Orchestrator | Soft | Provides templates for runner tasks |
| **Self-Learning Skills** | SOP Library | Soft | Proposes new skills based on SOP usage patterns |
| **Agentic Framework** | SOP Library | Soft | Executes cooperative agent workflows |
| **Auto-Orchestrator** | Agentic Framework | Hard | Conductor routes and dispatches tasks using agent rules |
| **Auto-Tagger** | Auto-Orchestrator | Soft | Scans codebase and populates task queue |
| **Scout Engine** | Self-Evolution Loop | Hard | Discovered tech feeds into evolution adaptation logs |

## Rules
1. **Dependency Cap**: No engine may have more than 3 direct dependencies.
2. **Strict DAG**: Circular dependencies (e.g. A depends on B and B depends on A) are strictly forbidden.
3. **Hard vs Soft**: Hard dependencies block execution if missing. Soft dependencies represent informational or optional flows.

## Inputs/Outputs
- **Inputs**: Component specifications and file mappings.
- **Outputs**: Dependency status logs and priority mapping indices.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel