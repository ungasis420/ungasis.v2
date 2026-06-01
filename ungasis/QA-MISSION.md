# 🎯 QA MISSION: UNGASIS OS v3.0 — Final Lossless Audit

> **Objective:** Verify 100% lossless coverage of the UNGASIS OS ecosystem.
> Every content section from the 2 source files must be covered by a generated module file.

---

## Success Criteria (ALL must be met to pass)

| # | Criterion | Target |
|---|---|---|
| 1 | File Inventory | All expected ~30 .md files exist and are non-empty |
| 2 | Source Coverage | ≥95% of content sections have ✅ coverage |
| 3 | Count Consistency | All metrics match (especially "88 tools" not "67") |
| 4 | No harmful duplicates | 0 intra-file duplicate blocks |
| 5 | mattpocock/skills | All 4 concepts absorbed |
| 6 | Final Scorecard | Overall % calculated, gap list written |

## Agent Instructions
- Follow ALL rules in `.clinerules/`
- Read files from disk — never ask for paste
- Write ALL results to `QA-AUDIT-REPORT.md`
- Do NOT stop between tasks — complete T1→T6 autonomously
- Tables only — no prose

---

## T1: File Inventory

List every .md file in this repo (recursive). For each:

| # | File | Location | ~Words | First H1 | Status |
|---|---|---|---|---|---|

Expected: ~30 files (2 source + 1 blueprint + 1 multi-agent + ~24 modules).
Mark missing expected files as 🔴.

**How to execute:**
1. `Glob("**/*.md")` to find all files
2. For each file: read first 5 lines to get H1 heading
3. Estimate word count from file size (~5 chars/word)

---

## T2: Source Coverage Check

### Source 1: AI_Builders_Master_Workflow_Prompt_v4.0.md

**Skip these meta-instruction sections (mark N/A):**
§0, §0.5, §1, §2, §4, §7, §7.5, §7.6, §8, §26.5, §35, §36, §36.5, §37, §37.5, §38

**For each CONTENT section:**

| § | Section Title | Expected Module | Status | Notes |
|---|---|---|---|---|
| §3 | Tools & Resources | ungasis-tool-stack-strategy.md | | |
| §5 | Data Classification | ungasis-gold-skeleton.md | | |
| §6 | Source Ledger | ungasis-source-ledger.md | | |
| §6.5 | Source-First Research | ungasis-source-ledger.md | | |
| §9 | Rigor Dial | (check playbook or modules) | | |
| §10 | Lifecycle Ladder | (check playbook or modules) | | |
| §11 | Me as MVP | ungasis-me-as-mvp-workflow.md | | |
| §12 | Project Factory | (check playbook or modules) | | |
| §13 | ChatGPT Feature Router | ungasis-chatgpt-feature-router.md | | |
| §14 | M365 Feature Router | ungasis-m365-feature-router.md | | |
| §15 | Instruction Hierarchy | ungasis-instruction-hierarchy.md | | |
| §16 | Stack Lanes | ungasis-stack-lanes.md | | |
| §16.5 | Project Type Router | ungasis-decision-matrix.md | | |
| §17 | Stack Lane Details | ungasis-stack-lanes.md | | |
| §18 | Ranked Stacks | ungasis-tool-stack-strategy.md | | |
| §19 | Decision Matrix | ungasis-decision-matrix.md | | |
| §20 | AI Operating Model | ungasis-ai-operating-model.md | | |
| §21 | Portfolio Strategy | ungasis-portfolio-strategy.md | | |
| §22 | Monetization | ungasis-monetization-strategy.md | | |
| §23 | API Safety | (check modules) | | |
| §24 | Gold Skeleton | ungasis-gold-skeleton.md | | |
| §24.5 | Solopreneur Playbook | playbook v3 (self-contained) | | |
| §25 | Hallucination | ungasis-hallucination-guide.md | | |
| §26 | Version Control | ungasis-version-control.md | | |
| §27 | Prompt Engineering | ungasis-prompt-engineering.md | | |
| §28 | Backup Strategy | ungasis-backup-strategy.md | | |
| §29 | Prompt Library | ungasis-prompt-library.md | | Count templates |
| §30 | SOP Library | ungasis-sop-library.md | | Count SOPs |
| §31 | Glossary | ungasis-glossary.md | | Count terms |
| §32 | Cost Monitoring | ungasis-cost-monitoring.md | | |
| §33 | HTML Manual Spec | ungasis-html-manual-spec.md | | |
| §34 | HTML Manual QA | ungasis-html-manual-spec.md | | |

**IMPORTANT:** Verify by READING actual module content, not just filename matching.

### Source 2: playbook v3
Verify all 33 sections present (self-contained file).

### Source 3: multi-agent guide v4
Verify all 13 parts intact.

---

## T3: Count Verification

Search the Blueprint (m365-opus version) for these numbers:

| Metric | Expected | Found? | Consistent? | Notes |
|---|---|---|---|---|
| Tools | 88 | | | Search for "67" — known bug |
| API Keys | 30 | | | |
| Auto-gen files | 30 | | | |
| Token layers | 12 | | | |
| Sprints | 14 | | | |
| AI layers | 7+7 | | | |
| Data entities | 11 | | | |
| Widgets | 10 | | | |
| Screens | 8 | | | |
| Quest scenarios | 7 | | | |
| MCP servers | 5 | | | |
| Monthly cost | $0 | | | |

**How to execute:** `Grep("67 tools", "blueprints/*.md")` — if found, it's the known bug.

---

## T4: Duplicate Detection

Search for content appearing TWICE in the SAME file (Blueprint only).

Known suspects:
| Content | Search Term | Expected Locations |
|---|---|---|
| Prompt OS / 7 Kernel | "7 Kernel" or "Prompt OS" | §8 + §26 |
| Post-Sprint 14 roadmap | "SKILL-ROS" or "Post-Sprint 14" | §12 + §26 |
| MCP config JSON | "mcp-config" or "mcpServers" | §11 + §26 |
| Git Branch heading | "Git Branch Workflow" | §16 (duplicated heading) |

**How to execute:** `Grep("SKILL-ROS", "blueprints/*.md")` — count occurrences.

---

## T5: mattpocock/skills Absorption

| # | Concept | Search Terms | File | Found? | Context |
|---|---|---|---|---|---|
| 1 | Grilling | "grill" "interrogat" "validate pain" | ungasis-me-as-mvp-workflow.md | | |
| 2 | Caveman Mode | "caveman" "simplest" "token reduction" | ungasis-prompt-engineering.md | | |
| 3 | Ubiquitous Language | "ubiquitous" "CONTEXT.md" "shared vocab" | ungasis-sop-library.md | | |
| 4 | Progressive Disclosure | "progressive" "incremental" "on demand" | ungasis-instruction-hierarchy.md | | |

**How to execute:** `Grep("caveman", "modules/ungasis-prompt-engineering.md")`

---

## T6: Final Scorecard

| Dimension | Score | Max | % | Notes |
|---|---|---|---|---|
| T1: Files found | | ~30 | | |
| T2: Sections covered | | ~32 | | |
| T3: Counts consistent | | 12 | | |
| T4: Duplicates found | | 0 ideal | | |
| T5: Skills absorbed | | 4 | | |
| **OVERALL** | | | **%** | |

### Gap List

| # | Gap | Priority | Fix Recommendation |
|---|---|---|---|

### Known Bugs

| Bug | Status |
|---|---|
| "67 tools" in Blueprint §1 | |
| Duplicate blocks in Blueprint §26 | |
| Duplicate Git heading in §16 | |

---

## Mission Complete Checklist
- [ ] QA-AUDIT-REPORT.md exists and is non-empty
- [ ] T1 table complete
- [ ] T2 table complete (with content verification)
- [ ] T3 table complete
- [ ] T4 table complete
- [ ] T5 table complete
- [ ] T6 Final Scorecard has overall %
- [ ] Gap List present
- [ ] "🏰 MISSION COMPLETE" at bottom

**When ALL boxes are checked → write `🏰 MISSION COMPLETE` at the bottom of QA-AUDIT-REPORT.md.**
