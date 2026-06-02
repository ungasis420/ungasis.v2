# Cross-Functional Enablement

## Purpose

AI-assisted projects are not only for engineers. Legal, marketing, finance, operations, HR, and sales users can describe a workflow in plain language, then use the AI Project OS to convert it into a safe, scoped, verifiable tool or process.

## Translation flow

```text
plain-language problem -> interview -> workflow map -> risk check -> spec -> prototype -> verification -> handoff
```

## Plain-language intake

Ask:

- What work are you trying to make easier?
- Who does it today?
- What inputs are used?
- What output should exist?
- What mistakes are costly?
- What data is sensitive?
- What actions require approval?
- What would prove the tool works?

## Examples

| Function | Possible AI-assisted project | Extra caution |
|---|---|---|
| Marketing | campaign brief generator, content calendar, landing page draft | unsupported claims, brand consistency |
| Sales | account research summary, call prep, follow-up drafts | privacy, accuracy, outbound approval |
| Finance | reconciliation helper, variance explainer, dashboard | financial accuracy, audit trail |
| Legal | contract issue checklist, policy summary | lawyer review, no legal advice replacement |
| HR | onboarding checklist, FAQ assistant | privacy, employment sensitivity |
| Operations | SOP generator, task tracker, exception log | approvals, change control |

## Guardrails

- Keep the human accountable for high-impact decisions.
- Require approval before sending messages, changing records, submitting forms, moving money, or affecting users.
- Capture source data, assumptions, and verification evidence.
- Prefer internal/local/private workflows for sensitive data.

## Related files

- `.claude/skills/cross-functional-tool-builder/SKILL.md`
- `.claude/agents/cross-functional-translator.md`
- `templates/cross_functional_tool_request.md`
- `workflows/cross-functional-tool-loop.md`
