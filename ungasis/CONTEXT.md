# CONTEXT.md — Current Session State

Last Updated: June 1, 2026
Current Phase: QA Audit
Current Sprint: Content Absorption complete → QA in progress

## Purpose

This file is the quick-load snapshot for any new AI session. It tells the agent where the UNGASIS quest is right now, so Mel does not need to explain the same context again.

Simple analogy: this is the **whiteboard photo** before leaving the room. A new agent can look at it and continue the work.

## Active Goals

| Goal | Status | Notes |
|---|---:|---|
| Run autonomous QA audit via Cline in GitHub Codespaces | 🟡 In progress | Use `QA-MISSION.md` as the audit mission brief. |
| Verify 100% lossless coverage of source files | 🟡 Pending | Compare generated modules against the 2 source prompts. |
| Fix known bug: `67 tools` → `88 tools` | 🔴 Pending | Verify first, then patch only after audit confirms affected files. |
| Fix known duplicate blocks in Blueprint §26 | 🔴 Pending | Verify exact duplicate blocks before editing. |
| Keep repo beginner-friendly and $0 budget | ✅ Active | No paid tools, no local installs, no complex setup. |

## Blockers

| Blocker | Status | Action |
|---|---:|---|
| ⚠️ 5 recovery files may still be missing | 🟡 Needs verification | Confirm file inventory before QA scoring. |
| QA audit has not produced final scorecard yet | 🔴 Pending | Run Cline audit and write `QA-AUDIT-REPORT.md`. |
| Repo may still contain old `ungasis-os/` folder | 🟡 Needs cleanup | Archive old folder only after confirming current repo has all files. |

## Files Being Worked On

| File | Purpose | Current State |
|---|---|---:|
| `QA-MISSION.md` | Mission brief for audit agent | 🟡 Input file |
| `QA-AUDIT-REPORT.md` | Output target for audit results | 🔴 Pending final report |
| `memory-bank/activeContext.md` | Current project focus | ✅ Created in T1 |
| `memory-bank/progress.md` | Project status and known issues | ✅ Created in T1 |
| `MEMORY.md` | Cross-session learning log | ✅ Created in T3 |
| `CONTEXT.md` | Current session snapshot | ✅ This file |

## Recent Decisions

| Decision | Why | Status |
|---|---|---:|
| ⚠️ Use DeepSeek V4 Flash as primary model | User reported it is the best free reasoning/audit option for this quest. | ✅ Active |
| ⚠️ Use Gemini 3 Flash as backup model | User reported it as backup via Google AI Studio. | ✅ Active |
| Adopt Cline Memory Bank for persistence | Reduces context loss across Cline sessions. | ✅ Active |
| Keep old `ungasis-os/` folder archived, not mixed | Prevents duplicate or stale files from confusing agents. | 🟡 Pending cleanup |
| Use file checkpoints, not chat-only memory | Files persist when chat context is lost. | ✅ Active |

## Domain Language

| Term | Means |
|---|---|
| quest | a project |
| chapter | lifecycle stage |
| shield | data level from L0 to L4 |
| module | standalone `.md` file |
| mana | token budget |
| codex | reference wiki or knowledge base |
| kernel | core instruction files for ChatGPT Projects |
| forge | build or development stage |
| gate | human approval checkpoint |

## Next Actions

| Step | Action | Owner | Check |
|---:|---|---|---|
| 1 | Push repo to private GitHub repository | Mel | ✅ Repo exists in GitHub |
| 2 | Open GitHub Codespace | Mel | ✅ Codespace loads without local install |
| 3 | Install and configure Cline | Mel | ✅ Cline can read repo files |
| 4 | Run QA audit with `QA-MISSION.md` | Cline | ✅ `QA-AUDIT-REPORT.md` updated |
| 5 | Fix confirmed gaps and known bugs | Cline + Mel approval | ✅ Only audited gaps patched |
| 6 | Version bump to v4 | Mel | ✅ Changelog and README updated |

## Fast Start Prompt For New Agent

```text
Read CONTEXT.md, AGENTS.md, .clinerules/, memory-bank/, and QA-MISSION.md.
Then run the QA audit exactly as instructed.
Write results to QA-AUDIT-REPORT.md.
Do not edit source-files/.
Do not push changes without Mel's approval.
Use simple tables and mark uncertain claims with ⚠️.
```

## Safety Rules For This Session

| Rule | Status |
|---|---:|
| Never expose API keys, tokens, or credentials | ✅ Active |
| Never modify `source-files/` | ✅ Active |
| Never push to GitHub without human approval | ✅ Active |
| Use free-tier tools only | ✅ Active |
| Mark unverified claims with ⚠️ | ✅ Active |
| Use pass/fail checks for every task | ✅ Active |

## Self-check

| Check | Result |
|---|---:|
| File starts with requested title | ✅ PASS |
| Current phase and sprint included | ✅ PASS |
| Active goals included | ✅ PASS |
| Blockers included | ✅ PASS |
| Files being worked on included | ✅ PASS |
| Recent decisions included | ✅ PASS |
| Domain language included | ✅ PASS |
| Next actions included | ✅ PASS |
| Unverified claims marked with ⚠️ | ✅ PASS |
| No empty table cells | ✅ PASS |

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
