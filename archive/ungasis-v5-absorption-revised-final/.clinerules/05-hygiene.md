# Rule Hygiene & Staleness Detection

[ENFORCED: agent-check]

## Scope

Use this rule to keep `.clinerules/`, `AGENTS.md`, `CLAUDE.md`, Memory Bank files, `MEMORY.md`, context files, skills, and workflow notes fresh, non-conflicting, and lean.

This file owns rule freshness, priority, duplication control, review dates, session-end improvement, and anti-pattern detection.

It does not own task-level self-review. Use `04-reflection.md` for task acceptance checks, file-write checks, and verification evidence.

## Simple Analogy

Think of this file like cleaning the kitchen after cooking.

During the work, `04-reflection.md` checks the food before serving. After the work, this file checks the kitchen: what got messy, what should be stored, what should be thrown away, and what rule needs a label.

## Footer Standard

Every rule and memory file must end with this footer pattern:

```text
Last reviewed: [Month YYYY] | Review by: [Month YYYY] | Owner: Mel
```

Current footer:

```text
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
```

## Rule Ownership Map

Only one file should own each concern.

| File | Owns | Does not own |
|---|---|---|
| `00-identity.md` | Agent role and repo identity | Token rules or QA output format |
| `01-token-efficiency.md` | Mana saving and file-reading strategy | Rule priority |
| `02-output-rules.md` | Report format, status markers, file output | Autonomous stopping rules |
| `03-self-iteration.md` | Continue-until-done task loop | Reflection quality checks |
| `04-reflection.md` | Self-check after each task, file-write checks, verification evidence | Staleness, priority, or expiry dates |
| `05-hygiene.md` | Freshness, conflicts, duplication, review cycle, continuous improvement, anti-patterns | Per-task acceptance checking |
| `06-safety-gate.md` | Pre-flight stop rules, scope lock, fail-loud, read-before-write | Staleness review or session-end lessons |
| `.clinerules/memory-bank.md` | How to read and update Memory Bank | General QA output rules |

## Staleness Signals

A rule is stale when any signal below is true.

| Signal | Example | Action |
|---|---|---|
| Missing tool or model | A named model no longer exists | Mark WARNING and verify before following |
| Missing path | Rule points to a file not in repo | Treat path-specific instruction as stale |
| Phase mismatch | Rule says QA audit but sprint moved to build | Prefer current mission or context file |
| Conflict | Two rules give opposite instructions | Apply priority order below |
| Old review date | Review date is 90 days past | Mark for refresh before reuse |
| Repeated failure | Same rule causes two bad outputs | Add to `MEMORY.md` mistakes section |
| Overlap | New rule repeats an existing rule | Merge instead of duplicating |
| Instruction bloat | A core rule file becomes too long to scan | Split deep procedure into SOP, skill, or module |
| Context mess | The chat or context pack has too much stale detail | Shed, compact, or create a handoff |

## Rule Priority

Project convention for conflicts, highest to lowest:

| Priority | Source | Rule |
|---|---|---|
| 1 | Safety and security guardrails | Never expose secrets or unsafe instructions |
| 2 | Current user request | Follow the latest explicit instruction if safe |
| 3 | Current mission files | `QA-MISSION.md`, active task brief, or sprint brief |
| 4 | `.clinerules/` numbered files | Lower number wins within project rules |
| 5 | Cross-tool files | `AGENTS.md`, `CLAUDE.md`, root instructions |
| 6 | Project memory | `memory-bank/*.md`, `CONTEXT.md`, `LLM_CONTEXT.md` |
| 7 | Learning log | `MEMORY.md` lessons and patterns |

When same-priority rules conflict, follow the newest, most specific, and safest rule.

## Stale Rule Response

When a stale rule appears, write this log line:

```text
WARNING STALE RULE: [file] - [reason]
```

Then:

1. Do not follow the stale part.
2. Follow the highest-priority valid rule.
3. Patch the rule only when the current task allows file edits.
4. Add a short note to `MEMORY.md` under Mistakes & Corrections if the stale rule caused real work loss.
5. Run `04-reflection.md` before moving on.

## Duplication Control

| Check | Rule |
|---|---|
| Same owner | Do not create a new rule if an existing file already owns the concern |
| Same instruction | Keep the clearer version and remove or avoid the weaker copy |
| Same footer | Footer duplication is allowed only as the final footer line |
| Same table | Merge tables if both explain the same decision |
| Same warning | Keep one warning in the most relevant file |
| One-time instruction | Remove or archive after completion, unless it remains useful |
| Same repeated prompt | Convert it into a skill, SOP, checklist, or reusable module |
| Same mistake twice | Patch the rule, context file, or test that should catch it next time |

<!-- ABSORBED: ai_project_os_v5 — Continuous Improvement End-of-Session Questions -->

## Enforcement Tags

Use tags only when they reduce confusion. Do not tag every sentence.

| Tag | Meaning |
|---|---|
| `[ENFORCED: agent-check]` | Agent must check this during the task. |
| `[ENFORCED: CI]` | Future automated check can enforce this. |
| `[ADVISORY]` | Helpful practice, not required every time. |
| `[DEPRECATED]` | Do not follow unless Mel restores it. |

## End-of-Session 5 Questions

Use this after every meaningful work session, especially after code edits, prompt-system edits, research, file generation, or debugging.

Do not turn this into a long report. Answer the five questions fast. The goal is to make the next session cleaner.

| # | Question | If yes, do this |
|---:|---|---|
| 1 | Did the same mistake happen twice? | Add or update a rule, checklist, test, or memory note. |
| 2 | Did we paste the same prompt twice? | Turn it into a skill, SOP, prompt template, or reusable snippet. |
| 3 | Did a verification step catch an issue? | Keep that verification step. It protected the project. |
| 4 | Did context become messy? | Shed, compact, clear, or write a handoff before continuing. |
| 5 | Did a rule become stale? | Update it, mark it WARNING, or delete it if it no longer helps. |

### Session-End Output Format

Use this compact log when hygiene was checked:

```text
Session hygiene: PASS/NEEDS PATCH
Mistake repeated twice: Yes/No - [note]
Repeated prompt found: Yes/No - [action]
Verification caught issue: Yes/No - [keep/change]
Context messy: Yes/No - [shed/compact/handoff]
Stale rule found: Yes/No - [update/delete/mark]
Next hygiene action: [one small action]
```

<!-- ABSORBED: ai_project_os_v5 — Continuous Improvement Targets -->
## Improvement Targets

When a lesson should be saved, put it in the right place. Do not dump everything into one giant instruction file.

| Lesson type | Best place to save it | Beginner rule |
|---|---|---|
| Durable project fact | `AGENTS.md`, `LLM_CONTEXT.md`, or `PROJECT_STATE.md` | Save facts where future agents read first. |
| Project rule | `.clinerules/*.md` | Keep rules short and focused. |
| Repeated procedure | Skill or SOP file | If you repeat it, package it. |
| Human routine | `workflows/` or SOP library | Make a recipe people can follow. |
| Evidence or source lesson | `knowledge/` or `SOURCE_LEDGER.md` | Keep sources traceable. |
| Decision | `DECISIONS.md` | Record why, not just what. |
| One-time note | `MEMORY.md` or session handoff | Do not bloat permanent rules. |

<!-- ABSORBED: ai_project_os_v5 — Anti-Patterns -->
## Seven Anti-Patterns to Catch Early

An anti-pattern is a bad habit that looks useful at first but creates problems later.

| # | Anti-pattern | What it looks like | Better move |
|---:|---|---|---|
| 1 | Giant instruction files that become unreadable | One massive rule file tries to explain everything | Keep core rules short. Move deep steps into SOPs, skills, or modules. |
| 2 | Coding before scope and verification are clear | Agent starts editing before goal, files, and checks are known | Write the goal, allowed files, stop rules, and test first. |
| 3 | One agent builds AND grades its own work | Builder says its own work is done without fresh review | Use `04-reflection.md`, then get a second reviewer for serious work. |
| 4 | Repeating prompts instead of turning them into skills | Same prompt/checklist is pasted again and again | Convert repeated prompts into reusable skill/SOP/template. |
| 5 | Letting context accumulate until constraints are forgotten | Chat gets long, noisy, and old instructions fight new ones | Shed stale context, compact, update `LLM_CONTEXT.md`, or start a handoff. |
| 6 | Automating external side effects before manual workflow is safe | Flow sends, deletes, updates, charges, publishes, or changes permissions too early | Run manual first. Add approval, logs, rollback, and dummy-data tests. |
| 7 | Treating AI output as done without evidence | Agent says "done" but no file check, test, source, or manual review exists | Require evidence: what changed, what check ran, what result happened. |

<!-- ABSORBED: ai_project_os_v5 — Anti-Pattern Stop Rules -->
## Anti-Pattern Stop Rules

Stop and fix hygiene before continuing when any of these appear:

- A rule file is too long to scan quickly.
- A coding task begins without scope and verification.
- The same AI that built the work is the only judge for high-impact output.
- The same prompt is pasted for the third time.
- Context is noisy enough that constraints are being missed.
- Automation can affect real people, money, files, records, permissions, messages, or public content without approval.
- Output is marked done without evidence.

## Rule Review Workflow

| Step | Action | Output |
|---|---|---|
| 1. Inventory | List `.clinerules/*.md`, `AGENTS.md`, `CLAUDE.md`, Memory Bank, and root memory files | File list |
| 2. Footer check | Confirm each target file has the current footer | PASS or FAIL |
| 3. Path check | Verify referenced paths exist or are labeled planned | PASS, WARNING, or FAIL |
| 4. Conflict check | Compare against priority order | Conflict log |
| 5. Duplication check | Find repeated instructions across rule files | Merge note |
| 6. Anti-pattern check | Scan for the seven anti-patterns above | Risk list |
| 7. Patch | Apply smallest safe edit | Changed files list |
| 8. Reflect | Run `04-reflection.md` | Self-check line |

## Suggested Verification Commands

Use the cheapest check that proves the point.

| Check need | Command |
|---|---|
| List rule files | `find .clinerules -maxdepth 1 -name "*.md" -type f | sort` |
| Check footer on rules | `for f in .clinerules/*.md; do tail -n 1 "$f"; done` |
| Find path references | `grep -R "source-files/\|memory-bank/\|modules/" .clinerules/` |
| Find repeated warnings | `grep -R "Never expose secrets" .clinerules/ AGENTS.md CLAUDE.md` |
| Find repeated prompts | `grep -R "Act as" .clinerules/ docs/ workflows/` |
| Show changed files | `git diff --name-only` |
| Confirm this file exists | `test -f .clinerules/05-hygiene.md` |
| Check absorbed markers | `grep -c "ABSORBED: ai_project_os_v5" .clinerules/05-hygiene.md` |
| Check footer | `tail -n 1 .clinerules/05-hygiene.md` |

## Maintenance Log Format

Use this compact format when hygiene work changes rules:

```text
Rule hygiene: PASS - files checked: [count] | stale: [count] | duplicates: [count] | anti-patterns: [count] | patched: [count]
Rule hygiene: FAIL - issue: [short reason] | action: [fixed or logged]
```

## Done Checklist

Before calling hygiene work complete:

- [ ] Output file exists at `.clinerules/05-hygiene.md`.
- [ ] Footer is present and current.
- [ ] End-of-session five questions are present.
- [ ] Seven anti-patterns are present.
- [ ] Additions are marked with `<!-- ABSORBED: ai_project_os_v5 — ... -->`.
- [ ] No secrets or private data were added.
- [ ] `04-reflection.md` still owns task-level self-review.
- [ ] This file still owns freshness, duplication, review cycle, continuous improvement, and anti-pattern detection.

Self-check: PASS - hygiene owns freshness, priority, duplication, review workflow, continuous improvement, and anti-pattern detection without replacing the task reflection protocol.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
