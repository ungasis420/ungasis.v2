# UNGASIS OS — Claude Code Instructions

## Read First
Read [LLM_CONTEXT.md](file:///c:/Users/63905/Downloads/ungasis/LLM_CONTEXT.md) for full project context.

## Rules
- Follow `.clinerules/` rules (same as `.agents/rules/` but for Cline/Claude)
- Token efficiency: batch edits, tables over prose, skip pleasantries
- Safety: read before write, never expose secrets
- Style: simple English, analogies, staleness footers
- `source-files/` and `archive/` are READ ONLY

## Key Commands
- After every session: update [CONTEXT.md](file:///c:/Users/63905/Downloads/ungasis/CONTEXT.md) with what changed
- Before editing: read the target file first (safety gate)
- After editing: verify output matches requirements (reflection)

## Context Decay Protocol (Layer 16)
- After completing a tool call, summarize the result in 1-2 sentences.
- Drop raw tool output from working memory after summarizing.
- Keep only: file path + what changed + any errors.
- After 5+ steps in a multi-step task, discard results from steps 1-3 unless still referenced.
- Never carry forward file contents that have already been edited — re-read if needed.
- Goal: working context stays under 4,000 tokens regardless of step count.

### Token Efficiency & Investigation Limits
<!-- merged from .ungasis/config/token-efficiency.md and expert-frameworks.md -->
- Investigation Limit Protocol: Apply the 3-Strike Rule (stop and ask after 3 failed lookups), Ask-First Threshold for secrets, Cost Check (>5 commands = ask first), and Marathon Detection (3+ scratch scripts = ask).
- Session length: Max 15 exchanges before triggering a handoff summary and fresh session. Max 200 lines per new file.

### Multi-Agent Protocol
<!-- merged from .ungasis/config/multi-agent-protocol.md -->
- "Orchestrate, don't write": Use parallel agents via Agent Manager for independent tasks.
- Spawning Rules: Explicit file boundaries (no overlapping edits), each agent gets 1 task scope, max 5 parallel agents.

### Graphify Usage
<!-- merged from .agents/rules/07-graphify-query.md -->
- Before reading project files for architecture questions, run `graphify query "<question>"`. Use returned nodes to read only relevant files. Fallback to `GRAPH_REPORT.md` if no results.

### QA & Self-Healing
<!-- merged from .agents/rules/10-self-healing-loop.md and 02-output-rules.md -->
- Blueprint-First: For ANY task creating 3+ new files, call @blueprint-architect first.
- Self-Healing Loop: After sprint completion, call @quality-auditor. Re-index new files (`graphify update .`) and commit only AFTER audit PASS.
- Output Rules: Write QA audits to `QA-AUDIT-REPORT.md` using structured tables and status markers (✅/🟡/🔴/⚠️).

### Autonomous & Reflection Protocols
<!-- merged from .agents/rules/03-self-iteration.md and 04-reflection.md -->
- Self-Iteration: Do not stop or ask for permission between tasks. Keep going until "MISSION COMPLETE".
- Reflection Loop: PAUSE, CHECK, VERIFY, FIX, LOG. Always write a `Self-check: PASS/FAIL` log after checking file output, counts, and safety.

### Hygiene & Skills
<!-- merged from .agents/rules/05-hygiene.md, 08-skill-observer.md, and 09-skill-generator.md -->
- Rule Priority: Safety > User request > Mission files > Numbered rules > Cross-tool > Memory.
- Skill Observer: Track sequences of 3+ actions repeating across 3+ sessions to propose new skills in `.agents/skills/_auto/_proposals/`. Promote skills through Draft → Tested → Proven → Optimized.

### --- v5.1 AUTONOMY ADDITIONS ---

### SDD Methodology
- Complexity check: ≤3 files = fast path, 4-10 = light spec, 10+ = full SDD
- Spec location: specs/[feature-name].md
- Flow: Spec → Plan → Implement → Verify
- NEVER skip spec for 10+ file changes

### Decision Memory
- All architectural decisions logged in .ungasis/decisions/ADR-NNN-slug.md
- Template: .ungasis/decisions/TEMPLATE.md
- Review before making similar decisions

### Presets
- Available presets: builder, research, debug, design, founder
- Activate via: ungasis preset [name]
- Each preset configures: model routing, token budget, output format

### Agent Routing (Foreman Protocol)
- Tier 1 Free: Google AI Pro, Cerebras, Groq → use for drafts, research, fast iteration
- Tier 2 Paid: Claude Pro → use for architecture, complex reasoning, multi-file changes
- Tier 3 Async: Jules (GitHub PRs), GitHub Actions (scheduled tasks)
- Rule: ALWAYS try Tier 1 first. Escalate to Tier 2 only when Tier 1 insufficient.

### Mobile Pipeline
- Claude Dispatch: terminal commands from phone
- Claude Remote Control: approve/reject from phone
- Claude Channels: Telegram/iMessage/Discord quick commands (P2)

### Anti-Patterns
- NEVER have 2+ files containing the same rule (single source of truth = THIS FILE)
- NEVER skip backup before major changes
- NEVER use local LLMs for coding tasks (cloud-first)
- NEVER exceed 3 retry attempts without asking user
---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
