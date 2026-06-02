# Active Context — Current Focus

## Current Focus

Running a QA audit through Cline in GitHub Codespaces for the UNGASIS OS v3.0 repository.

## Current Phase

| Field | Value |
|---|---|
| Phase | QA Audit |
| Sprint | Content absorption complete → QA in progress |
| Primary agent | Cline in GitHub Codespaces |
| Primary model | ⚠️ DeepSeek V4 Flash free via OpenRouter — verify current availability before use |
| Backup model | ⚠️ Gemini 3 Flash via Google AI Studio — verify current availability before use |

## Current Work

| Work Item | Status | Note |
|---|---|---|
| Check lossless coverage of 30+ modules | 🟡 Pending | Compare generated modules against 2 source prompts |
| Fix known count bug | 🟡 Pending | Blueprint says “67 tools”; should be “88” per user brief |
| Fix duplicate Blueprint blocks | 🟡 Pending | 3 duplicate blocks in Blueprint §26 per user brief |
| Organize repo | 🟡 Pending | Prepare for GitHub private repo |
| Run autonomous audit agent | 🟡 Pending | Cline should execute QA mission |
| Add Memory Bank | ✅ This task | 6 core files + Cline Memory Bank rule |

## Recent Decisions

| Decision | Reason | Status |
|---|---|---|
| Use Cline Memory Bank | Prevent context loss across sessions | ✅ Adopted |
| Keep files markdown-based | Beginner-friendly and agent-readable | ✅ Active |
| Use Codespaces only | No local installs | ✅ Active |
| Use DeepSeek as primary audit model | User selected free reasoning/audit model | ⚠️ Verify model availability |
| Keep `source-files/` read-only | Preserve original source prompts | ✅ Active |

## Next Steps

1. Finish T1 Memory Bank files.
2. Continue T2 by creating `CLAUDE.md`.
3. Continue T3 by creating `MEMORY.md`.
4. Continue T4 by creating `CONTEXT.md`.
5. Add reflection and hygiene rules.
6. Add context engineering module.
7. Update README with memory/context sections.
8. Push to private GitHub repo.
9. Open Codespace and run Cline QA audit.

## Active Patterns and Preferences

| Pattern | Use It Because |
|---|---|
| One task per response | Keeps work controlled and reviewable |
| Tables + checklists | Better for beginner and ESL reading |
| Mark unknowns with ⚠️ | Prevents false certainty |
| Save to files | Files persist; chat does not |
| Pass/fail checks | Agents need concrete verification |
| Read before editing | Prevents accidental rewrites |

## Open Questions / Checks

| Check | Why It Matters |
|---|---|
| Are all 30+ modules present in repo? | QA audit depends on file count |
| Are 5 recovery files still missing? | May affect final coverage score |
| Are DeepSeek/Gemini model names still current? | Tool/model availability changes |
| Does Cline read nested `memory-bank/.clinerules/` files? | If not, copy to root `.clinerules/memory-bank.md` |

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
