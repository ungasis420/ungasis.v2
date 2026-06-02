# GitHub Copilot Instructions for UNGASIS OS

## Identity
This is UNGASIS OS, a Markdown-first knowledge repository for AI-powered solopreneur development.

## Rules
- Follow the token efficiency rules in [.clinerules/01-token-efficiency.md](file:///c:/Users/63905/Downloads/ungasis/.clinerules/01-token-efficiency.md) / [.agents/rules/01-token-efficiency.md](file:///c:/Users/63905/Downloads/ungasis/.agents/rules/01-token-efficiency.md)
- Follow the safety gate in [.clinerules/06-safety-gate.md](file:///c:/Users/63905/Downloads/ungasis/.clinerules/06-safety-gate.md) or standard hygiene rules in [.agents/rules/05-hygiene.md](file:///c:/Users/63905/Downloads/ungasis/.agents/rules/05-hygiene.md) (always read files before editing them).
- Use simple English (ESL-friendly for Mel).
- Use tables for comparisons and markdown checklists for step-by-step procedures.
- Never expose API keys, tokens, passwords, or secrets.
- Never modify or delete reference files in `source-files/` (they are strictly read-only).
- End every new file with the standard staleness footer.

## Style
- Use UNGASIS domain language:
  - **quest** instead of project
  - **chapter** instead of lifecycle stage
  - **mana** instead of token budget
  - **codex** instead of documentation
  - **forge** instead of develop/code
- Compact output: prefer tables over paragraphs, and bullet lists over long descriptions.
- Include analogies from cooking, sports, or everyday life to explain technical ideas.

## Cross-Tool Awareness
- This project is used across multiple AI assistants: Cline (which reads `.clinerules/`) and Antigravity (which reads `.agents/rules/`).
- [AGENTS.md](file:///c:/Users/63905/Downloads/ungasis/AGENTS.md) acts as the shared configuration bridge.
- When editing behavior rules, you must update the rule files in both locations: `.clinerules/` and `.agents/rules/` to keep them in sync.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
