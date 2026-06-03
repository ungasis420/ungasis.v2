# Token-Efficiency Agent OS v4.0.0
> Universal kit for token-efficient AI coding agents.

## v3->v4: 10->12 layers, 18->24 sources, 14->22 gaps closed
New: .claudeignore, fill-% zones, pre-tool hooks, model routing, message cap (15-20), context rot detection.

## Fast Install
```bash
cp -r token-efficiency-agent-os-v4/* your-project/
nano docs/PROJECT_BRIEF.md
bash scripts/verify-token-kit.sh
```

## Minimal Install
AGENTS.md, CLAUDE.md, TOKEN_POLICY.md, .claudeignore, docs/PROJECT_BRIEF.md, docs/PROJECT_MEMORY.md, docs/TEST_COMMANDS.md, docs/TASK_HANDOFF.md, docs/DECISIONS.md, templates/task-prompt.md, templates/fresh-chat-starter.md

## Tool Table
| Tool | Config | Auto? |
|------|--------|-------|
| Claude Code | CLAUDE.md | Yes |
| Cursor | .cursorrules | Yes |
| Cline | .clinerules | Yes |
| Aider | .aider.conf.yml + CONVENTIONS.md | Yes |
| Copilot | .github/copilot-instructions.md | Yes |
| Gemini | GEMINI.md | Manual |

## First Prompt
```
Read AGENTS.md, docs/PROJECT_BRIEF.md, docs/TEST_COMMANDS.md, docs/TASK_HANDOFF.md.
Do not scan whole repo. Plan before editing. Patch smallest safe surface.
End with: changed files, commands, results, risks, rollback, memory updates.
```
See INSTALL.md, AUDIT_REPORT.md, guide/. *24 sources. MIT License.*
