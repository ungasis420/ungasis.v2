# MEMORY.md — Agent Learning Log

**Owner:** Mel John Dimat  
**Scope:** Cross-session learning across UNGASIS work  
**Last Updated:** June 1, 2026  
**Rule:** Project-specific state belongs in `memory-bank/`. Universal lessons belong here.

---

## Decisions Made

| Date | Decision | Why | Outcome |
|---|---|---|---|
| June 2026 | Use file checkpoints instead of chat-only progress | Chat context can reset; files persist across sessions | ✅ Adopted as default working style |
| June 2026 | Use Cline Memory Bank for project continuity | UNGASIS has many files, phases, and decisions | ✅ `memory-bank/` structure added |
| June 2026 | Use `MEMORY.md` for cross-project learning | Some lessons apply beyond one repo or one quest | ✅ This file created |
| June 2026 | Use `CONTEXT.md` for quick session state | New chats need a fast “where are we now?” snapshot | 🟡 Planned for T4 |
| June 2026 | Keep UNGASIS repo Markdown-first | Beginner-friendly, portable, free, and easy to inspect | ✅ Active convention |
| June 2026 | Use DeepSeek V4 Flash as primary audit model | ⚠️ User-observed: strong free reasoning/audit performance | 🟡 Verify per audit run |
| June 2026 | Use Gemini 3 Flash as backup model | ⚠️ User-observed: useful fallback if DeepSeek is slow or limited | 🟡 Verify per audit run |
| June 2026 | Split large Opus sessions into 7 tasks maximum | ⚠️ User-observed: Opus hit context limits on 12+ tasks | ✅ Adopted as session planning rule |
| June 2026 | Keep source files read-only | Original prompts must remain trustworthy references | ✅ Enforced by repo rules |
| June 2026 | Require pass/fail checks for agent tasks | Prevents vague completion and silent failure | ✅ Added to agent design pattern |

---

## Patterns Discovered

| Pattern | Context | Confidence |
|---|---|---|
| 3-bot parallel generation works well | Split generation across E/M/O lanes for modules | ✅ High |
| File-first memory beats chat memory | Long repo work across many sessions | ✅ High |
| “Grill before build” prevents wrong builds | mattpocock-inspired clarification before execution | ✅ High |
| One task per response reduces drift | Sequential T1–T8 repo upgrade workflow | ✅ High |
| Tables reduce token waste and ambiguity | QA audits, file inventories, scorecards | ✅ High |
| Staleness footers make rules safer | Long-lived `.clinerules/` files | ✅ High |
| Use Memory Bank for project state | UNGASIS repo-specific current work | ✅ High |
| Use `MEMORY.md` for universal lessons | Cross-session agent learning patterns | ✅ High |
| Use `CONTEXT.md` for current sprint snapshot | Quick-load starting point for new agents | ✅ High |
| Use status markers for audit clarity | ✅ / 🟡 / 🔴 / ⚠️ / N/A reports | ✅ High |
| Keep volatile model claims marked | AI model availability and quality changes quickly | ✅ High |
| Read files from disk instead of asking user to paste | Large repo work in Codespaces/Cline | ✅ High |

---

## Mistakes & Corrections

| Date | What Went Wrong | Root Cause | Fix Applied |
|---|---|---|---|
| June 2026 | M365 Copilot QA audit failed | Only 4 of 30 files were attached | ✅ Attach or read all relevant files before audit |
| June 2026 | Opus hit context limits on 12+ tasks | Too many tasks in one session | ✅ Split sessions into 7 tasks maximum |
| June 2026 | Blueprint says “67 tools” | Count drift from older version | 🟡 Fix to “88 tools” during QA cleanup |
| June 2026 | Blueprint has 3 duplicate blocks in §26 | Generation or merge duplication | 🟡 Remove duplicates during QA cleanup |
| June 2026 | Recovery files may be missing | Content generation not fully complete | 🟡 Verify 5 recovery files during QA audit |
| June 2026 | Chat-only decisions risk being lost | No durable memory file | ✅ Add Memory Bank, `MEMORY.md`, and `CONTEXT.md` |
| June 2026 | Agent may over-explain instead of auditing | Uncontrolled output style | ✅ Use table-only audit rules where needed |
| June 2026 | Agent may continue stale rules | No hygiene review cycle | 🟡 Add `.clinerules/05-hygiene.md` in T6 |

---

## Conventions Established

| Convention | Applies To | Example |
|---|---|---|
| Use `quest` for project | UNGASIS domain language | “This quest is in QA phase.” |
| Use `chapter` for lifecycle stage | Roadmaps and workflows | “Chapter 4 is validation.” |
| Use `shield` for data level | Privacy and security notes | “Shield L2 data needs care.” |
| Use `module` for standalone Markdown file | Knowledge files | `ungasis-prompt-library.md` |
| Use `mana` for token budget | Token planning | “Save mana by using grep first.” |
| Use ✅ / 🟡 / 🔴 / ⚠️ / N/A | Audits and status checks | “Coverage: 🟡 partial.” |
| Use staleness footer on new files | Rules, memory, context files | `Last reviewed: June 2026` |
| Mark unverified volatile claims with ⚠️ | Models, tools, pricing, install commands | “⚠️ Verify before installing.” |
| Keep source files read-only | `source-files/` | Do not edit original prompts |
| Use one focused task per response | T1–T8 upgrade workflow | Finish T3 before T4 |
| End each task with a self-check | Agent output QA | `Self-check: PASS — reason` |
| Prefer simple English and tables | Beginner-friendly documentation | Short rows, clear labels |

---

## Tools & Models Performance

| Tool/Model | Task Type | Quality | Speed | Notes |
|---|---|---|---|---|
| GitHub Codespaces | Browser-based repo work | ✅ Strong | 🟡 Depends on free quota | ⚠️ Verify current free quota before planning heavy use |
| Cline | Agentic repo execution and audit | ✅ Strong | 🟡 Depends on model/provider | Good for file-based tasks and Memory Bank workflow |
| DeepSeek V4 Flash | Reasoning and audit | ✅ Strong | 🟡 Depends on rate limits | ⚠️ User-observed; verify current availability and quality |
| Gemini 3 Flash | Backup reasoning/model lane | 🟡 Useful backup | 🟡 Depends on platform limits | ⚠️ User-observed; verify current availability and quality |
| M365 Copilot Opus | Planning and QA | ✅ Strong | 🟡 Context can become limiting | Split large jobs into smaller sessions |
| ChatGPT Enterprise | Content generation and synthesis | ✅ Strong | ✅ Fast enough for drafting | Useful for modules and prompt architecture |
| 3-bot E/M/O split | Parallel module generation | ✅ Strong | ✅ Faster than one lane | Works when outputs are merged carefully |
| Memory Bank | Project continuity | ✅ Strong | ✅ Fast to read | Best for active project state |
| `MEMORY.md` | Cross-session learning | ✅ Strong | ✅ Fast to scan | Best for universal patterns and mistakes |
| `CONTEXT.md` | Current session snapshot | ✅ Strong | ✅ Fast to load | Best for “where are we right now?” |

---

## Things That Worked Well

| Technique | Context | Repeat? |
|---|---|---|
| 3-bot parallel generation | Creating many UNGASIS modules | ✅ Yes |
| Checkpoint to files after major work | Long repo sessions | ✅ Yes |
| Read files from disk, not pasted chat | Codespaces/Cline repo work | ✅ Yes |
| Use one task per response | T1–T8 upgrade flow | ✅ Yes |
| Use official docs for tool-specific patterns | Memory Bank and Claude Code compatibility | ✅ Yes |
| Use status tables for QA | Coverage, count, duplicate, and gap checks | ✅ Yes |
| Use “grilling” before building | Avoiding wrong app or wrong repo change | ✅ Yes |
| Keep $0 tool stack visible | Beginner solopreneur constraints | ✅ Yes |
| Add staleness review dates | Long-lived instruction rules | ✅ Yes |
| Mark volatile claims with ⚠️ | Model/tool/pricing/install claims | ✅ Yes |

---

## Things To Avoid

| Anti-Pattern | Why | Alternative |
|---|---|---|
| Chat-only memory | Lost after context reset | Write decisions to files |
| One giant 12+ task session | Context limit and drift risk | Split into 7 tasks maximum |
| Auditing with partial attachments | Produces false confidence | Load or attach all required files |
| Editing `source-files/` | Breaks source-of-truth integrity | Treat as read-only references |
| Trusting old model/tool claims | AI tools change quickly | Mark ⚠️ and verify before use |
| Long prose audit reports | Token waste and hard scanning | Use compact tables |
| Asking user to paste repo files | Wastes time and tokens | Read files from disk |
| Building before clarifying | Can build the wrong thing | Grill requirements first |
| Adding paid tools by default | Violates $0 budget constraint | Use free/browser-based tools first |
| Ignoring stale rules | Can follow outdated instructions | Use rule hygiene and review dates |
| Saying “done” without a check | Completion may be false | Run pass/fail verification |
| Mixing project state and universal lessons | Memory becomes confusing | Use `memory-bank/` for project state; `MEMORY.md` for universal learning |

---

Self-check: PASS — File has all requested sections, pre-filled UNGASIS learnings, no empty table cells, volatile claims marked with ⚠️, and a staleness footer.

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
