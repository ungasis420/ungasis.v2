# Cross-Project Rules

## Purpose
Define the sharing constraints, template propagation, and isolation boundaries between multiple projects.

## How It Works
The engine regulates what knowledge, templates, and agent configurations can be synchronized across workspaces, preventing contamination of project-specific databases.

## Rules
1. **Global Knowledge Sharing**: Common development patterns, gotchas, and architectural decisions must be stored globally under `knowledge/wiki/` to be shared.
2. **Template Propagation**: All workspace templates must be standardized and distributed via the DNA genomes repository.
3. **Configuration Sharing**: Developer agent settings and custom workflow definitions must be placed in `.agents/` to remain synchronized.
4. **Data Isolation**: Sensitive databases, private user keys, and client-specific data must remain isolated in their respective project workspaces.

## Inputs/Outputs
| Component | Input Shared resource | Output Sharing action |
|---|---|---|
| Sharing Manager | Global templates/docs or Local project files | Permitted sync payload or Isolation block |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
