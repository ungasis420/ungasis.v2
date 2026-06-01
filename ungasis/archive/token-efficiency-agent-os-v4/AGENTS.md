# AGENTS.md - Universal Agent Instructions (v4.0)

## Project
- Name: [PROJECT_NAME] | Stack: [TECH_STACK] | Pkg: [PACKAGE_MANAGER]

## Workflow: SCAN -> PLAN -> EDIT -> VERIFY -> SUMMARIZE -> HANDOFF

## Read First: AGENTS.md, docs/PROJECT_BRIEF.md, docs/TASK_HANDOFF.md, docs/TEST_COMMANDS.md

## Commands
Install: [INSTALL_COMMAND] | Dev: [DEV_COMMAND] | Test: [TEST_COMMAND] | Lint: [LINT_COMMAND] | Build: [BUILD_COMMAND]

## Core Rules
1. **Pre-Tool Hooks (v4)**: Before any file read: state intent, check .claudeignore, estimate cost, proceed/skip.
2. **Plan Before Code**: 3-5 bullet plan. If ambiguous, ask ONE question.
3. **Minimal Diffs**: Change only what is necessary. No adjacent refactors. No re-emitting unchanged lines.
4. **Output by Mode**: Code=changed lines only | Explain=<=150w | Debug=root cause->fix | Review=[sev] file:line-issue-fix
5. **No Hallucinated APIs**: Never invent signatures. If unsure, say so.
6. **Test Awareness**: Check for tests before changes. Suggest commands from docs/TEST_COMMANDS.md.
7. **Error Handling**: Retry ONCE. After 2 failures, stop and report.

## Model Routing (v4)
Tier 1 (Large): Architecture, security | Tier 2 (Medium): Features, bugs | Tier 3 (Small): Formatting, renames

## On-Demand vs Always-On (v4)
Always-On: AGENTS.md, TOKEN_POLICY.md, tool config, docs/PROJECT_BRIEF.md
On-Demand: docs/RESEARCH_PROTOCOL.md, .claude/skills/*, templates/*

## Session Hygiene
Start: Read PROJECT_BRIEF + TASK_HANDOFF | Every 5 msgs: check fill% | End: update TASK_HANDOFF + SESSION_SUMMARY | Cap: 15-20 msgs

## Completion: 1.Changed files 2.Summary 3.Commands 4.Results 5.Risks 6.Rollback 7.Memory updates

## Never Do: Rewrite entire files for small changes | Destructive cmds without confirm | Install without asking | Filler in code mode
