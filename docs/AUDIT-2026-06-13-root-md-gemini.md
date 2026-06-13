# Audit Report — Root `.md` Files + `.gemini/` Folder

**Auditor:** Claude (Opus 4.8) | **Date:** 2026-06-13 | **Scope:** 11 root `.md` files + 5 `.gemini/agents/*.md` files

> Read-only audit. No files were modified. Purpose: find version drift, contradictions, stale content, and broken references across the repo's top-level documentation and Gemini CLI agent configs.

---

## 1. File Inventory

### Root `.md` files (11)
| # | File | Lines | Declared Version | Last Touched | First H1 |
|---|------|------:|---|---|---|
| 1 | CLAUDE.md | 79 | **v5.1** | Jun 13 | UNGASIS OS v5.1 |
| 2 | AGENTS.md | 145 | v5.0 | Jun 5 | AGENTS.md (⚠️ SUNSET Jun 18) |
| 3 | GEMINI.md | 153 | v5.0 | Jun 11 | GEMINI.md — Antigravity Config |
| 4 | LLM_CONTEXT.md | 90 | v5.0 | Jun 11 | LLM_CONTEXT.md — Passport |
| 5 | CONTEXT.md | 628 | (session log) | Jun 11 | Session Log — Coach Narrator |
| 6 | CONVENTIONS.md | 23 | **v4.0** | Jun 11 | CONVENTIONS.md (v4.0) |
| 7 | MODEL_ROUTING.md | 39 | **v4.0** | Jun 5 | Model Routing (v4.0) |
| 8 | README.md | 139 | **v4.0** | Jun 11 | UNGASIS OS v4.0 |
| 9 | QA-MISSION.md | 188 | **v3.0** | Jun 5 | QA MISSION — v3.0 |
| 10 | QA-AUDIT-REPORT.md | 65 | v5.0 | Jun 5 | QA Audit Report |
| 11 | UNGASIS-OS-v5.0-JARVIS-BLUEPRINT.md | 1373 | v5.0 | Jun 11 | JARVIS-Fabricator Blueprint |

### `.gemini/agents/` files (5)
| # | File | Lines | Tools | `write_file`? |
|---|------|------:|---|---|
| 1 | blueprint-architect.md | 101 | read, grep, glob, ls, web | No |
| 2 | commander.md | 50 | read, grep, glob, ls, run_command | No |
| 3 | designer.md | 50 | read, **write**, grep, glob, ls | **Yes** |
| 4 | graphify-watchdog.md | 42 | shell, glob, ls | No |
| 5 | quality-auditor.md | 131 | read, grep, glob, ls | No |

---

## 2. Critical Findings (contradictions across files)

| # | Issue | Conflicting Sources | Severity |
|---|-------|---------------------|----------|
| C1 | **Version drift** — 5 different versions live at root | CLAUDE=v5.1, AGENTS/GEMINI/LLM_CONTEXT/BLUEPRINT=v5.0, CONVENTIONS/MODEL_ROUTING/README=v4.0, QA-MISSION=v3.0 | 🔴 High |
| C2 | **Single-source-of-truth conflict** | quality-auditor.md + CLAUDE.md say "**CLAUDE.md is the single source of truth — not AGENTS.md**"; but GEMINI.md & LLM_CONTEXT.md mandate a read order led by AGENTS.md/GEMINI.md and never mention CLAUDE.md | 🔴 High |
| C3 | **Budget / paid-tool contradiction** | README + AGENTS say "**Never recommend paid tools — free tier only**" and budget "$19.99/mo Google AI Pro + $0"; quality-auditor.md (v5.1) says "**Claude Pro ($20/mo) is APPROVED**". CLAUDE.md routing is built around Claude Pro. | 🔴 High |
| C4 | **Stack identity conflict** | AGENTS.md/GEMINI.md/LLM_CONTEXT/BLUEPRINT describe an **Antigravity + Gemini Flash + Cline** crew and a "markdown-only, NOT a running app" repo. CLAUDE.md describes **real apps** (Newmont, RiftCoach, Dashboard — Vite/React/Next). The two halves of the repo disagree on what UNGASIS even is. | 🔴 High |
| C5 | **AGENTS.md self-sunset** | AGENTS.md H1 says "⚠️ SUNSET June 18, 2026 — Replaced by Antigravity CLI (agy)", yet the entire 145-line file is still written as active authority and is referenced as mandatory reading by GEMINI.md & LLM_CONTEXT.md. | 🟠 Med |

## 3. Numeric Drift (same metric, different values)

| Metric | Values found | Files |
|--------|--------------|-------|
| Token-efficiency layers | **12** vs **17** vs **20** | CLAUDE/README/LLM_CONTEXT=12; AGENTS=17 (adds 13–17); BLUEPRINT=20 |
| Agent crew size | **4** vs **6** | BLUEPRINT=4 (Builder, Architect, Auditor, Watchdog); AGENTS/GEMINI/LLM_CONTEXT=6 (+Commander, Surgeon); `.gemini/` ships **5** files (adds Designer, drops Builder & Surgeon) |
| Graphify communities | **2,713** vs **4,580** | GEMINI/LLM_CONTEXT/BLUEPRINT=2,713; CLAUDE "Known Issues" + graphify.md rule=4,580 |
| Graphify nodes | **20,929** vs **19,470+** | most files=20,929; graphify-watchdog.md=19,470+ |
| Tool count | **88** vs **110+** | QA-MISSION="88 tools (not 67)"; README="110+ tools" |
| Project version in body | BLUEPRINT header=v5.0 but internal git tag=**v4.0-engines-complete**, date "June 2, 2026" | BLUEPRINT |

## 4. Broken / Suspect References

| # | Location | Problem |
|---|----------|---------|
| R1 | GEMINI.md line 8 | Link text "CONTEXT.md" points to `./context/README.md` — mislabeled, likely wrong target (root has CONTEXT.md) |
| R2 | README.md "Repository Structure" | Describes legacy layout (`ungasis-unified-lossless-repo-v3/`, top-level `modules/`, `blueprints/`, `multi-agent/`) — does not match current `.ungasis/`, `projects/`, `dashboard/` layout in CLAUDE.md/LLM_CONTEXT |
| R3 | README.md "Configuration Files" | Still tells user to manually extract YMLs from a ZIP in `archive/` — stale setup step |
| R4 | QA-MISSION.md | Whole brief targets "~30 .md files" and v3.0 audit; repo is now 1,242 files. Mission + its sister QA-AUDIT-REPORT.md (sprints F20b/F20c) are obsolete relative to current state |
| R5 | AGENTS.md / GEMINI.md | Both advertise "9 slash commands" (`/goal`, `/blueprint`, `/scout`…) that are Antigravity-native, not the Claude Code skills actually available in this session |

## 5. `.gemini/` Folder Observations

| # | Observation | Note |
|---|-------------|------|
| G1 | Only 5 of the "6-agent crew" exist as Gemini agents; **Builder and Surgeon are missing**, and **Designer** (not in the crew tables) is present. Crew docs and actual agent files disagree. | Med |
| G2 | `designer.md` is the only agent with `write_file`. Consistent with "plating specialist" role, but note AGENTS.md's "no two agents edit same file" boundary rule has no enforcement here. | Low |
| G3 | `quality-auditor.md` is the **only** `.gemini` agent updated for v5.1 (has "v5.1 Approved Changes" block, "Last synced: 2026-06-10"). The other 4 agents still reference v5.0/v4.0 and Antigravity-only assumptions. | Med |
| G4 | `graphify-watchdog.md` node count (19,470+) is stale vs the 20,929 quoted everywhere else (see §3). | Low |
| G5 | Agents use Gemini tool names (`read_file`, `grep_search`, `run_command`, `shell`) — correct for Gemini CLI, but `commander.md` and `graphify-watchdog.md` reference signal-file orchestration (`*.signal`, `graphify .`) that depends on infra not described in any root doc. | Low |

## 6. What's Healthy

- All 16 files carry the required staleness footer (`Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel`) except the two session-log/report files, which is acceptable.
- Domain-language table (quest/chapter/shield/forge/gate/module/mana/codex) is **consistent** across AGENTS.md, GEMINI.md, and LLM_CONTEXT.md.
- Glassmorphism design tokens (`bg-white/[0.04]`, `backdrop-blur-xl`, `border-white/10`, `rounded-2xl`, `#00d4ff`, `#a78bfa`) match between CONVENTIONS.md and `.gemini/agents/designer.md`.
- `quality-auditor.md` is the cleanest, most current agent file and correctly names CLAUDE.md as source of truth.

## 7. Recommended Fixes (priority order)

| Priority | Action |
|---|---|
| 1 | Resolve C2/C4: declare CLAUDE.md as canonical in AGENTS.md, GEMINI.md, LLM_CONTEXT.md headers; add a one-line "legacy — see CLAUDE.md" banner to the Antigravity-era docs |
| 2 | Resolve C3: pick one budget truth (Google AI Pro vs Claude Pro) and remove the "free tier only / never recommend paid tools" rule from README + AGENTS |
| 3 | Normalize versions (C1): bump CONVENTIONS, MODEL_ROUTING, README to v5.1 or archive them |
| 4 | Reconcile numbers (§3): one figure each for token layers, crew size, Graphify nodes/communities, tool count |
| 5 | Fix R1 link; rewrite README §"Repository Structure" + §"Configuration Files" to current layout |
| 6 | Archive QA-MISSION.md + QA-AUDIT-REPORT.md (v3 audit, obsolete) into `docs/` or `archive/` |
| 7 | Update the 4 stale `.gemini` agents to v5.1 (mirror quality-auditor.md's approach); decide whether Builder/Surgeon agents should exist |

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
