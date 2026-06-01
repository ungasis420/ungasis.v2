# INSTALL.md - Setup Guide (v4.0)
1. Copy: `cp -r token-efficiency-agent-os-v4/* your-project/`
2. Configure .claudeignore (NEW v4) - match your project structure
3. Fill docs/PROJECT_BRIEF.md - replace all [PLACEHOLDER]
4. Pick agent file: CLAUDE.md | .cursorrules | .clinerules | .aider.conf.yml | .github/copilot-instructions.md | GEMINI.md
5. Set .claude/settings.json: `{"MAX_THINKING_TOKENS": 10000}`
6. Review AGENT_CONTEXT_EXCLUDE.md and .claudeignore
7. Verify: `bash scripts/verify-token-kit.sh`
8. (Optional) Copilot Spaces: upload copilot-instructions.md + PROJECT_BRIEF.md

## Checklist
- [ ] PROJECT_BRIEF.md filled
- [ ] .claudeignore configured
- [ ] Tool config in place
- [ ] verify-token-kit.sh passes
