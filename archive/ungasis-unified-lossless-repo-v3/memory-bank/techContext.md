# Tech Context — Stack, Setup, and Constraints

## Stack Summary

| Layer | Tool | Status / Note |
|---|---|---|
| Cloud dev environment | GitHub Codespaces | Free-tier workflow, no local installs |
| Editor | VS Code Web | Runs in browser |
| Agent extension | Cline | Main execution/audit agent |
| Primary model | ⚠️ DeepSeek V4 Flash via OpenRouter | Verify current model name, limits, and free availability before use |
| Backup model | ⚠️ Gemini 3 Flash via Google AI Studio | Verify current model name, limits, and free availability before use |
| Planning / QA | ⚠️ M365 Copilot Opus | Verify current availability and naming |
| Content generation | ⚠️ ChatGPT Enterprise | Verify access and organization policy before use |
| File format | Markdown | Main storage format |
| Install style | Browser-first | No local installs |

## Development Setup

1. Push repo to a private GitHub repository.
2. Open GitHub Codespaces.
3. Install Cline extension in VS Code Web.
4. Configure model provider.
5. Ask Cline to read Memory Bank before work.
6. Run QA mission and write outputs to files.

## Technical Constraints

| Constraint | Rule |
|---|---|
| $0 budget | Prefer free tiers and no paid dependencies |
| No local installs | Use Codespaces and browser tools only |
| Markdown-first | Keep instructions, modules, memory, and reports as `.md` |
| Beginner user | Avoid complex setup unless required |
| ESL-friendly | Use simple English and clear file names |
| Protected source files | Do not edit `source-files/` |
| Secrets | Never expose API keys, tokens, credentials, or connection strings |
| Human approval | Required before push, delete, permission changes, external messages, or destructive edits |

## Tool Usage Patterns

| Task | Preferred Tool Pattern |
|---|---|
| Find files | Glob / file tree first |
| Find exact text | Grep/search before full read |
| Inspect content | Read only relevant sections first |
| Update docs | Patch smallest relevant section |
| Audit coverage | Batch checks and write to report file |
| Preserve context | Update Memory Bank after important changes |
| Reduce context size | Checkpoint then compact/new task |

## Verification Commands / Checks

| Check | What It Confirms |
|---|---|
| File tree check | Required files and folders exist |
| Search for `67 tools` | Known count bug found before fixing |
| Search duplicate Blueprint §26 blocks | Known duplicate issue found before fixing |
| Count module files | Confirms whether 24/30 or 30+ modules exist |
| Check staleness footers | Confirms hygiene rule compliance |

## Volatile Claims To Re-Verify

| Claim | Why Verify |
|---|---|
| DeepSeek V4 Flash free via OpenRouter | Model names, pricing, and limits change |
| Gemini 3 Flash via Google AI Studio | Model names, pricing, and limits change |
| GitHub Codespaces free hours/month | GitHub plan limits can change |
| M365 Copilot Opus naming | Product names and model routing can change |
| ChatGPT Enterprise availability | Depends on account/organization access |

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
