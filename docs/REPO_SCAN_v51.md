# UNGASIS v5.1 — Full Repo Alignment Scan

## Section 1: Directory Tree
```text
+--- .agents
|    +--- rules
|    +--- skills
|    |    +--- _auto
|    |    +--- _metrics
|    |    +--- auto-tagger
|    |    +--- bug-fix
|    |    +--- code-review
|    |    +--- commander
|    |    +--- context-pack
|    |    +--- debug-one-bug
|    |    +--- designer
|    |    +--- module-writer
|    |    +--- qa-audit
|    |    +--- research-to-code
|    |    +--- scout
|    |    \--- session-handoff
|    \--- workflows
+--- .clinerules
+--- .devcontainer
+--- .gemini
|    \--- agents
+--- .github
|    +--- ISSUE_TEMPLATE
|    +--- instructions
|    \--- workflows
+--- .mcp
|    \--- profiles
+--- .ungasis
|    +--- agentic
|    +--- architect
|    +--- bus
|    +--- cli-agents
|    +--- comms
|    +--- config
|    +--- context-engine
|    |    \--- profiles
|    +--- cortex
|    |    +--- contacts
|    |    +--- ideas
|    |    +--- learnings
|    |    \--- synthesis
|    +--- decisions
|    +--- decomposer
|    +--- dependencies
|    +--- dna
|    |    \--- revenue-models
|    +--- events
|    +--- evolution
|    |    +--- adaptations
|    |    \--- metrics
|    +--- jarvis-core
|    +--- memory
|    +--- multi-project
|    +--- okr
|    +--- orchestrator
|    |    +--- handoff-templates
|    |    \--- signals
|    +--- project-director
|    |    +--- decisions
|    |    +--- energy
|    |    +--- portfolio
|    |    +--- risk
|    |    +--- states
|    |    \--- timeline
|    +--- prompt-evolution
|    +--- quality
|    +--- reasoning
|    +--- resources
|    +--- revenue-intel
|    +--- rollback
|    +--- router
|    +--- scout
|    |    \--- sources
|    +--- suggestions
|    +--- testing
|    +--- tool-configs
|    +--- tracking
|    +--- user-patterns
|    \--- warnings
+--- .venv
|    +--- Include
|    +--- Lib
|    |    \--- site-packages
|    \--- Scripts
+--- archive
|    +--- ai_project_os_master_v5
|    |    +--- .claude
|    |    +--- .github
|    |    +--- checklists
|    |    +--- context
|    |    +--- docs
|    |    +--- knowledge
|    |    +--- outputs
|    |    +--- prompts
|    |    +--- scripts
|    |    +--- specs
|    |    +--- templates
|    |    +--- ungasis
|    |    \--- workflows
|    +--- chatgpt_ent
|    |    \--- archive
|    +--- m365_copilot_chatgpt
|    |    \--- archive
|    +--- m365_copilot_opus
|    |    \--- archive
|    +--- multi-agent_orchestration-kit
|    |    +--- .github
|    |    +--- .vscode
|    |    +--- config
|    |    +--- docs
|    |    +--- mcp
|    |    +--- memory
|    |    +--- orchestrators
|    |    +--- prompts
|    |    +--- scripts
|    |    \--- templates
|    +--- nested-ungasis-backup
|    |    \--- ungasis
|    +--- old
|    +--- output-token-optimization
|    +--- token-efficiency-agent-os-v4
|    |    +--- .claude
|    |    +--- .github
|    |    +--- docs
|    |    +--- guide
|    |    +--- scripts
|    |    \--- templates
|    +--- ungasis-unified-lossless-repo-v3
|    |    +--- .claude
|    |    +--- .cursor
|    |    +--- .github
|    |    +--- 00_LOSSLESS_ARCHIVE_READ_ONLY
|    |    +--- 02_EXTRACTED_ORIGINALS_READ_ONLY
|    |    +--- 03_MERGED_FINAL_RECOMMENDED
|    |    +--- audit
|    |    +--- config
|    |    +--- docs
|    |    +--- logs
|    |    +--- mcp
|    |    +--- memory
|    |    +--- memory-bank
|    |    +--- orchestrators
|    |    +--- prompts
|    |    +--- runtime
|    |    +--- schemas
|    |    +--- scripts
|    |    +--- templates
|    |    +--- tests
|    |    \--- ungasis-core
|    +--- ungasis-v5-absorption-revised-final
|    |    \--- .clinerules
|    \--- ungasis_T1-T8_final_repo_package
|         \--- ungasis-unified-lossless-repo-v3
+--- blueprints
+--- config
+--- context
+--- dashboard
|    \--- src
|         +--- app
|         \--- lib
+--- data
+--- docs
|    +--- blueprints
|    \--- scratch
+--- graphify-out
|    +--- 2026-06-02
|    +--- 2026-06-03
|    +--- 2026-06-04
|    \--- cache
|         +--- ast
|         \--- semantic
+--- knowledge
|    +--- raw
|    +--- schema
|    +--- sops
|    |    +--- agent-workflows
|    |    +--- daily-workflows
|    |    +--- emergency
|    |    \--- project-lifecycle
|    \--- wiki
|         +--- decisions
|         +--- gotchas
|         +--- metrics
|         \--- patterns
+--- modules
|    +--- chatgpt_ent
|    |    \--- archive
|    +--- m365_copilot_chatgpt
|    |    \--- archive
|    +--- m365_copilot_opus
|    |    \--- archive
|    \--- production-readiness
+--- multi-agents
+--- projects
|    +--- newmont
|    \--- riftcoach
|         +--- .clinerules
|         +--- .git_disabled
|         +--- .github
|         +--- .next
|         +--- data
|         +--- docs
|         +--- public
|         +--- scratch
|         +--- src
|         +--- wr_extractor
|         +--- wr_extractor_v3
|         \--- wr_profile_extractor
+--- scratch
+--- scripts
|    \--- tests
|         \--- __pycache__
+--- source-files
+--- specs
|    \--- _template
\--- templates
     \--- orchestration
```
**Total Files:** 7620
**Total Folders:** 1094

## Section 2: CLAUDE.md Audit
- **Total Lines:** 29
- **Headings:**
  - `## Read First`
  - `## Rules`
  - `## Key Commands`
  - `## Context Decay Protocol (Layer 16)`
- **TODO/FIXME/Placeholder text:** None found.

## Section 3: Agent Rules Inventory
### .agents/rules/
| Filename | Line Count | Key Rules |
|---|---|---|
| .clinerules.md | 31 | - Structured output ONLY — tables, not prose<br>- Max 1 line per file in inventory tables<br>- No explanations unless flagging a gap |
| 00-identity.md | 27 | - 30+ markdown files in this repo<br>- 2 source files (master prompt v4.0 + playbook v3)<br>- 1 blueprint (UNGASIS OS v3.0) |
| 01-token-efficiency.md | 110 | - Use pre-written table structures — don't generate structure from scratch<br>- The mission file (QA-MISSION.md) already contains table templates — fill them in<br>- All 30+ files are ON DISK — read them directly via tool calls |
| 02-output-rules.md | 40 | - Each task (T1-T6) gets its own H2 section in the report<br>- Each table has a summary row at the bottom with counts<br>- Max 1 line per entry — use Notes column for context |
| 03-self-iteration.md | 70 | - [ ] T1: File Inventory table written (all .md files)<br>- [ ] T2: Source Coverage table written (all content sections)<br>- [ ] T3: Count Verification table written (all metrics) |
| 04-reflection.md | 103 | - the requested output exists<br>- acceptance criteria were checked<br>- obvious issues were fixed |
| 05-hygiene.md | 144 |  |
| 07-graphify-query.md | 22 | - User asks: "How does token routing work?"<br>- WRONG: Read all files in modules/ and lib/<br>- RIGHT: `graphify query "token routing" --budget 2000` → read only the 3 returned files |
| 08-skill-observer.md | 40 | - Track sequences of 3+ actions that repeat across 3+ sessions.<br>- Track tool call patterns (same tools used in the same order).<br>- Track file access patterns (same files opened together). |
| 09-skill-generator.md | 48 |  |
| 10-self-healing-loop.md | 48 | - BUILDER calls @graphify-watchdog: "Re-index new files"<br>- BUILDER runs: git add . && git commit && git push<br>- BUILDER moves to next sprint |
| expert-frameworks.md | 73 | - "Are subtasks independent?" → YES = parallel, NO = sequential<br>- "Has this pattern succeeded before?" → YES = reuse prompt, NO = experiment<br>- "Is this a skill issue or model issue?" → Rewrite prompt before switching models |
| graphify.md | 16 | - For codebase or architecture questions, when `graphify-out/graph.json` exists, first run `graphify query "<question>"` (CLI) or `query_graph` (MCP). Use `graphify path "<A>" "<B>"` / `shortest_path` for relationships and `graphify explain "<concept>"` / `get_node` for focused concepts. These return a scoped subgraph, usually much smaller than `GRAPH_REPORT.md` or raw grep output.<br>- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files<br>- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context |
| skill-generator.md | 52 |  |
| skill-observer.md | 44 | - Track sequences of 3+ actions that repeat across 3+ sessions.<br>- Track tool call patterns (same tools used in the same order).<br>- Track file access patterns (same files opened together). |
### .agents/skills/
| Filename | Line Count | Key Rules |
|---|---|---|
| chain-registry.md | 30 |  |
| chain-templates.md | 33 |  |
| skill-chain-rules.md | 34 |  |
| SKILL.md | 47 | - grep_search<br>- list_dir<br>- view_file |
| tag-log.md | 62 | - **TAG:STALE** &#124; `modules/ungasis-token-policy.md` &#124; Review by date passed (stale footer)<br>- **TAG:LARGE_FILE** &#124; `src/components/QuestDetail.tsx` &#124; 287 lines (limit: 200)<br>- **TAG:TODO** &#124; `src/lib/ai-router.ts:42` &#124; "TODO: add fallback for Groq" |
| tag-rules.yml | 59 | - "TODO:"<br>- "FIXME:"<br>- "HACK:" |
| SKILL.md | 19 |  |
| SKILL.md | 27 |  |
| SKILL.md | 31 |  |
| blueprint-request.md | 30 | - **Target**: Architect 📐<br>- When a quest or task requires creating or modifying 3 or more files.<br>- **Project Name**: [PROJECT] |
| build-request.md | 31 | - **Target**: Builder 🏗<br>- When a blueprint design has passed audit and is ready for implementation.<br>- **Sprint**: [SPRINT] |
| fix-request.md | 30 | - **Target**: Surgeon 🔪<br>- When a bug, test failure, or syntax error is detected in 1-2 files.<br>- **Target File**: [FILE] |
| review-request.md | 32 | - **Target**: Auditor 🔍<br>- When files have been written or modified and are ready for verification.<br>- **Sprint Name**: [SPRINT] |
| test-request.md | 29 | - **Target**: Jules/Codex 🧪<br>- When a new module requires test coverage or markdown documentation guides.<br>- **Target Scope**: [SCOPE] |
| SKILL.md | 17 |  |
| SKILL.md | 21 |  |
| SKILL.md | 33 | - Wireframe description or reference image<br>- Design DNA specifications<br>- Component functional requirements |
| SKILL.md | 25 | - Use simple English suitable for an ESL learner.<br>- Use structured tables for details and comparisons.<br>- Use checklists for any procedures. |
| SKILL.md | 20 |  |
| SKILL.md | 20 |  |
| README.md | 14 |  |
| SKILL.md | 34 | - search_web<br>- read_url_content<br>- grep_search |
| SKILL.md | 18 |  |
| README.md | 10 | - Do not manually edit files in this folder.<br>- Use the `/skill-evolution` workflow to review, promote, or retire skills. |
| batch-executor.md | 24 |  |
| README.md | 11 | - Review proposals weekly using the weekly review SOP.<br>- Approve a proposal by moving it to `.agents/skills/_auto/` and renaming its status to `Tested`.<br>- Reject a proposal by deleting it and adding the title/reason to the memory bank under "rejected proposals". |
| README.md | 6 |  |
| effectiveness.md | 15 |  |
| usage-log.jsonl | 1 |  |
### .clinerules/
| Filename | Line Count | Key Rules |
|---|---|---|
| .clinerules.md | 32 |  |
| 00-identity.md | 27 | - 30+ markdown files in this repo<br>- 2 source files (master prompt v4.0 + playbook v3)<br>- 1 blueprint (UNGASIS OS v3.0) |
| 01-token-efficiency.md | 110 | - Use pre-written table structures — don't generate structure from scratch<br>- The mission file (QA-MISSION.md) already contains table templates — fill them in<br>- All 30+ files are ON DISK — read them directly via tool calls |
| 02-output-rules.md | 40 | - Each task (T1-T6) gets its own H2 section in the report<br>- Each table has a summary row at the bottom with counts<br>- Max 1 line per entry — use Notes column for context |
| 03-self-iteration.md | 70 | - [ ] T1: File Inventory table written (all .md files)<br>- [ ] T2: Source Coverage table written (all content sections)<br>- [ ] T3: Count Verification table written (all metrics) |
| 04-reflection.md | 99 | - the requested output exists<br>- acceptance criteria were checked<br>- obvious issues were fixed |
| 05-hygiene.md | 140 |  |
| 07-graphify-query.md | 22 | - User asks: "How does token routing work?"<br>- WRONG: Read all files in modules/ and lib/<br>- RIGHT: `graphify query "token routing" --budget 2000` → read only the 3 returned files |
| 08-skill-observer.md | 40 | - Track sequences of 3+ actions that repeat across 3+ sessions.<br>- Track tool call patterns (same tools used in the same order).<br>- Track file access patterns (same files opened together). |
| 09-skill-generator.md | 48 |  |
| 10-self-healing-loop.md | 45 | - BUILDER calls @graphify-watchdog: "Re-index new files"<br>- BUILDER runs: git add . && git commit && git push<br>- BUILDER moves to next sprint |

**Duplicates Flagged:**
- The following files in `.clinerules/` are exact duplicates of `.agents/rules/`:
  - `00-identity.md`
  - `01-token-efficiency.md`
  - `02-output-rules.md`
  - `03-self-iteration.md`
  - `07-graphify-query.md`
  - `08-skill-observer.md`
  - `09-skill-generator.md`
- Note: Many concepts (Token efficiency, Style guide) overlap with `CLAUDE.md`. `CLAUDE.md` explicitly references `.clinerules/`.

## Section 4: UNGASIS Engine Status
| Engine | File | Last Modified | Empty? |
|---|---|---|---|
| memory | `memory\memory-index.md` | 2026-06-05T09:14:42.442500 | No |
| memory | `memory\memory-inject-log.md` | 2026-06-05T09:14:42.442500 | No |
| memory | `memory\memory-inject-rules.md` | 2026-06-05T09:14:42.442500 | No |
| memory | `memory\memory-queries.md` | 2026-06-05T09:14:42.442500 | No |
| memory | `memory\memory-rules.md` | 2026-06-05T09:14:42.442500 | No |
| bus | `bus\bus-manifest.md` | 2026-06-05T09:14:42.430501 | No |
| bus | `bus\bus-rules.md` | 2026-06-05T09:14:42.430501 | No |
| bus | `bus\event-types.md` | 2026-06-05T09:14:42.431502 | No |
| cortex | `cortex\cortex-index.md` | 2026-06-05T09:14:42.435520 | No |
| cortex | `cortex\inbox.md` | 2026-06-05T09:14:42.435520 | No |
| cortex | `cortex\processing-rules.md` | 2026-06-05T09:14:42.436525 | No |
| cortex | `cortex\contacts\contact-rules.md` | 2026-06-05T09:14:42.435520 | No |
| cortex | `cortex\contacts\contact-template.md` | 2026-06-05T09:14:42.435520 | No |
| cortex | `cortex\ideas\idea-connections.md` | 2026-06-05T09:14:42.435520 | No |
| cortex | `cortex\ideas\idea-lifecycle.md` | 2026-06-05T09:14:42.435520 | No |
| cortex | `cortex\ideas\idea-template.md` | 2026-06-05T09:14:42.435520 | No |
| cortex | `cortex\learnings\learning-rules.md` | 2026-06-05T09:14:42.435520 | No |
| cortex | `cortex\learnings\reading-log.md` | 2026-06-05T09:14:42.436525 | No |
| cortex | `cortex\learnings\skill-progress.md` | 2026-06-05T09:14:42.436525 | No |
| cortex | `cortex\synthesis\monthly-synthesis-template.md` | 2026-06-05T09:14:42.436525 | No |
| cortex | `cortex\synthesis\weekly-synthesis-template.md` | 2026-06-05T09:14:42.436525 | No |
| resources | `resources\api-inventory.md` | 2026-06-05T09:14:42.450555 | No |
| resources | `resources\budget-tracker.md` | 2026-06-05T09:14:42.450555 | No |
| resources | `resources\resource-rules.md` | 2026-06-05T09:14:42.450555 | No |
| comms | `comms\comms-rules.md` | 2026-06-05T09:14:42.432500 | No |
| comms | `comms\comms-templates.md` | 2026-06-05T09:14:42.432500 | No |
| comms | `comms\escalation-matrix.md` | 2026-06-05T09:14:42.432500 | No |
| comms | `comms\notification-rules.md` | 2026-06-05T09:14:42.432500 | No |
| config | `config\multi-agent-protocol.md` | 2026-06-05T09:14:42.433500 | No |
| config | `config\token-efficiency.md` | 2026-06-05T09:14:42.433500 | No |

## Section 5: Scripts Inventory
| Script | Description | Exposes Commands |
|---|---|---|
| bootstrap_project.py | bootstrap_project module. | should_edit, main |
| context_budget_check.py | Rough context budget checker for AI Project OS files.  This is an approximate helper. It counts word | estimate_tokens, main |
| daily-pulse.py | daily-pulse module. | read_file_safe, get_last_session, validate_queue_format, get_queue_status, get_warnings, get_projects, get_scout_discoveries, get_git_status, get_staleness, generate_report |
| energy-close.py | energy-close module. | parse_time, parse_duration, get_time_block, main |
| feedback-close.py | feedback-close module. | main |
| generate_knowledge_index.py | Regenerate a simple knowledge index without altering raw sources. | list_md, section, main |
| generate_llm_context.py | Generate a draft LLM_CONTEXT.md from high-signal project files.  This script is intentionally conser | read_section, main |
| generate_tree.py | generate_tree module. | walk |
| graph-search.py | graph-search module. | main |
| graphify-providers.py | Register alternative AI providers for Graphify.  This script runs the graphify CLI provider add comm | main |
| graphify-run.py | Graphify Multi-Pass Auto-Failover Wrapper v2.  Runs graphify MULTIPLE TIMES with DIFFERENT backends. | load_env, get_available_providers, parse_chunk_failures, run_graphify, main |
| quality-close.py | quality-close module. | guess_prompt_for_file, main |
| quality-score.py | quality-score module. | validate_quality_log, score_file, get_rating, show_usage, run_batch_scoring |
| research-feeds.py | research-feeds module. | parse_date, find_elements_by_tag, get_child_text, get_child_attr, parse_sources, fetch_feed_items, today_str_placeholder, main |
| research-github.py | research-github module. | fetch_json, main |
| research-hn.py | research-hn module. | fetch_json, main |
| research-youtube.py | research-youtube module. | parse_date, find_elements_by_tag, get_child_text, get_child_attr, parse_sources, fetch_youtube_videos, main |
| retro-close.py | retro-close module. | get_existing_items, main |
| routing-close.py | routing-close module. | main |
| tag_sweep.py | tag_sweep module. | run_sweep |
| ungasis-test.py | UNGASIS Smoke Tests — Verify critical files and scripts work correctly. | test_file_exists, test_file_has_footer, test_md_has_table, test_queue_format, test_script_runs, main |
| ungasis.py | UNGASIS CLI — Unified command interface for UNGASIS OS v5.0 Usage: python scripts/ungasis.py [comman | run_script, cmd_health, cmd_test, cmd_backup, cmd_version, main |
| verify_template.py | verify_template module. | rel, sha, check_required, check_json, check_skills, check_agents, check_command_skill_collisions, check_no_legacy_roots, check_duplicates, check_secret_patterns, check_v5_keywords, main |
| warn-check.py | warn-check module. | validate_warning_log, check_warnings, is_logged |

## Section 6: Project Status
### Riftcoach
- Key files:
  - `.env.local.example`
  - `.gitignore`
  - `AGENTS.md`
  - `components.json`
  - `debug-builds.mjs`
  - `debug-items.mjs`
  - `next-env.d.ts`
  - `next.config.ts`
  - `package-lock.json`
  - `package.json`
  - ... and 53364 more.
- **Status:** Needs manual review of phase.
### Newmont
- Key files:
  - `.gitkeep`
- **Status:** Needs manual review of phase.

## Section 7: Config Files
### `package.json`
- **Status:** ⚠️ Missing
### `tsconfig.json`
- **Status:** ⚠️ Missing
### `.gitignore`
- **Size:** 556 bytes
- **Summary:** No old version references found
### `.ungasis/config/token-efficiency.md`
- **Size:** 4040 bytes
- **Summary:** No old version references found
### `.ungasis/config/multi-agent-protocol.md`
- **Size:** 3072 bytes
- **Summary:** No old version references found

## Section 8: Graphify Status
| File | Status | Size | Last Modified |
|---|---|---|---|
| GRAPH_REPORT.md | ⚠️ Missing | N/A | N/A |
| graph.json | ⚠️ Missing | N/A | N/A |
| graph.html | ⚠️ Missing | N/A | N/A |

## Section 9: Gap Analysis for v5.1
### Missing Directories
- [ ] `.ungasis/presets`

### Old Path References (`./` or `./`)
- [ ] `UNGASIS-OS-v5.0-JARVIS-BLUEPRINT.md`
- [ ] `.ungasis\cli-agents\antigravity-agent-manager-setup.md`
- [ ] `.ungasis\cli-agents\CLI_ORCHESTRATION.md`
- [ ] `.ungasis\memory\memory-index.md`
- [ ] `blueprints\UNGASIS-OS-v4.0-MASTER-BLUEPRINT-UPDATED.md`
- [ ] `blueprints\UNGASIS-OS-v5.0-JARVIS-BLUEPRINT.md`
- [ ] `docs\COPILOT-LAUNCHER.md`
- [ ] `docs\REPO_SCAN_v51.md`
- [ ] `docs\UNGASIS-MASTER-CONTEXT-PACK.md`
- [ ] `graphify-out\.graphify_root`
- [ ] `projects\riftcoach\docs\OPUS-ALIGNMENT-ANSWERS.md`
- [ ] `projects\riftcoach\docs\RiftCoach_Handoff_v18.1_Current_State_v15.1_FINAL.md`
- [ ] `projects\riftcoach\docs\RiftCoach_Handoff_v18_Current_State_v15.md`
- [ ] `scratch\check_history.py`
- [ ] `scratch\find_keys.py`
- [ ] `scratch\find_launcher.py`
- [ ] `scratch\read_config_json.py`
- [ ] `scratch\scan_gemini_folder.py`
- [ ] `scratch\search_all_keys.py`
- [ ] `scratch\search_conv_logs.py`
- [ ] `scratch\search_conv_precise.py`
- [ ] `scratch\search_conv_text.py`
- [ ] `scratch\search_more.py`
- [ ] `scratch\view_browser_key.py`
- [ ] `scratch\view_cline_secrets.py`
- [ ] `scratch\view_mcp_config.py`
- [ ] `scripts\graphify-smart.ps1`

### Duplicate Rule Files
- [ ] `00-identity.md` (Duplicate in `.clinerules/` and `.agents/rules/`)
- [ ] `01-token-efficiency.md` (Duplicate in `.clinerules/` and `.agents/rules/`)
- [ ] `02-output-rules.md` (Duplicate in `.clinerules/` and `.agents/rules/`)
- [ ] `03-self-iteration.md` (Duplicate in `.clinerules/` and `.agents/rules/`)
- [ ] `07-graphify-query.md` (Duplicate in `.clinerules/` and `.agents/rules/`)
- [ ] `08-skill-observer.md` (Duplicate in `.clinerules/` and `.agents/rules/`)
- [ ] `09-skill-generator.md` (Duplicate in `.clinerules/` and `.agents/rules/`)

### Empty or Placeholder Files
- No empty engine files found.

### Broken Symlinks
- No broken symlinks found.

---
> Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
