# Workflow: Parallel Agents

Use parallel work only when tasks are independent and context-heavy.

## Good uses

- one agent explores code while another reviews docs
- research agent compares libraries while main session plans
- security/test reviewers inspect final diff from fresh context

## Bad uses

- multiple agents editing the same files
- vague tasks with overlapping scope
- production or destructive changes without coordination

## Coordination rules

1. Define each agent's scope and allowed files.
2. Prefer read-only exploration unless approved.
3. Merge summaries into the main session.
4. Main session decides final implementation.
