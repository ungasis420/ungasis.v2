# UNGASIS v5.1 — CLAUDE.md Consolidation Diff Report

## 1. Duplicate Files Check

- **`graphify.md` vs `07-graphify-query.md`**: **DIFFERENT**. Both address Graphify, but `07-graphify-query.md` focuses on the token-budget strategy (`--budget 2000`) and scoping reads to nodes/edges. `graphify.md` covers generic CLI/MCP commands (`path`, `explain`) and using `wiki/index.md`.
- **`skill-generator.md` vs `09-skill-generator.md`**: **DIFFERENT** (Structurally). The rule content is identical, but `skill-generator.md` uses YAML frontmatter (`trigger: always_on`), while `09-skill-generator.md` uses a markdown header (`# Rule 09:`).
- **`skill-observer.md` vs `08-skill-observer.md`**: **DIFFERENT** (Structurally). Essentially identical rules, but differing in YAML frontmatter vs markdown header, similarly to the generator files.

## 2. Rules Consolidation Diff Table

| Rule File | Total Rules/Bullets | In CLAUDE.md Already | MISSING from CLAUDE.md | Unique Content |
|---|---|---|---|---|
| `00-identity.md` | 9 | QA-AUDIT-REPORT tables | Identity definition, repo specifics (30+ files, 2 sources, owner Mel), "log gaps don't fix", context checkpointing. | Strict QA Auditor persona constraints and context limits. |
| `.clinerules.md` | 8 | Structured tables output | Max 1 line per file, no explanations, batch checks in one pass, FINAL SCORECARD. | Strict formatting restrictions to minimize output tokens. |
| `01-token-efficiency.md` | 35 | Batch edits, summaries | 12-Layer Protocol, Tool Selection Hierarchy (Glob -> Grep -> Read), Caching, file batching. | Comprehensive layered approach to reducing LLM token burn. |
| `02-output-rules.md` | 14 | Status markers, report file | H2 sections per task, summary rows, markdown referencing style (`§13`), Report header template. | QA Audit report structural layout constraints. |
| `03-self-iteration.md` | 22 | Continue until DONE | QA-MISSION 6 tasks flow, explicit Stop conditions, Error Recovery actions, Append-mode writing. | Complete autonomous loop design for audit missions. |
| `04-reflection.md` | 36 | PAUSE, CHECK, FIX, LOG | Quality Gate rubric (File output, counts, placeholders, claims), Acceptance Snapshot, specific verification commands. | Thorough self-critique parameters and failure handling mechanisms. |
| `05-hygiene.md` | 42 | Rule Priority | Ownership Map, Staleness Signals, Stale Rule Response (⚠️ STALE RULE), Duplication checks, tags. | Rule lifecycle governance, expiration, and conflict resolution. |
| `07-graphify-query.md` | 5 | graphify query fallback | The `--budget 2000` constraint, node/edge targeting to scope file reads. | Token-budgeting specifics for Graphify queries. |
| `08-skill-observer.md` | 12 | Track 3+ actions, proposals | >500 tokens savings required, max 5 proposals/week, "Ask Mel" format, Impact table. | Safety rules and threshold definitions for auto-proposing skills. |
| `09-skill-generator.md` | 10 | Draft->Tested->Optimized | Skill markdown file template, exact thresholds (10 uses = Proven, 50 = Optimized). | Standardized format and exact numbers for skill promotion. |
| `10-self-healing-loop.md` | 15 | @quality-auditor, commit | Git add/commit flow, "3 fails = escalate", Commander Integration (mega prompt flow). | The exact git hook loop and multi-agent chaining architecture. |
| `expert-frameworks.md` | 28 | Investigation limit | ROUTER (independent subtasks?), RIGOR DIAL, 4-GATE (generalize), WARNING SYSTEM, TRUTH GATE, KILL-CANDIDATE. | Advanced cognitive frameworks (Ng, Chollet, Karpathy, etc.) embedded in reasoning. |
| `graphify.md` | 4 | graphify query | `graphify path`, `graphify explain`, checking `graphify-out/wiki/index.md` first. | Advanced specific graphify tool commands. |
| `skill-generator.md` | 10 | Draft->Tested->Optimized | Same as 09 (Skill markdown template, exact usage thresholds for promotion). | Frontmatter variant of 09. |
| `skill-observer.md` | 12 | Track 3+ actions, proposals | Same as 08 (>500 tokens, 5 per week limit, "Ask Mel"). | Frontmatter variant of 08. |

## 3. Old Path References Check

Found in `CLAUDE.md`:
1. `file:///c:/Users/63905/Downloads/ungasis/LLM_CONTEXT.md`
   * **Replaced with**: `LLM_CONTEXT.md` (Relative path)
2. `file:///c:/Users/63905/Downloads/ungasis/CONTEXT.md`
   * **Replaced with**: `CONTEXT.md` (Relative path)

*(No other old `C:\Users\` or `C:\.projects\` paths were found in the `.agents/rules/` files.)*

---
Self-check: PASS — All rule files read, duplicate files analyzed, missing content extracted into a comparative table, and old paths documented and replaced.
