# Rule Hygiene & Staleness Detection

[ENFORCED: agent-check]

## Scope

Use this rule to keep `.clinerules/`, `AGENTS.md`, `CLAUDE.md`, Memory Bank files, and `MEMORY.md` fresh, non-conflicting, and lean.

This file owns rule freshness, priority, duplication control, and review dates. It does not own task self-review. Use `04-reflection.md` for task-level self-checks.

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
| `04-reflection.md` | Self-check after each task | Staleness, priority, or expiry dates |
| `05-hygiene.md` | Freshness, conflicts, duplication, review cycle | Per-task acceptance checking |
| `.clinerules/memory-bank.md` | How to read and update Memory Bank | General QA output rules |

## Staleness Signals

A rule is stale when any signal below is true.

| Signal | Example | Action |
|---|---|---|
| Missing tool or model | A named model no longer exists | Mark ⚠️ and verify before following |
| Missing path | Rule points to a file not in repo | Treat path-specific instruction as stale |
| Phase mismatch | Rule says QA audit but sprint moved to build | Prefer current mission or context file |
| Conflict | Two rules give opposite instructions | Apply priority order below |
| Old review date | Review date is 90 days past | Mark for refresh before reuse |
| Repeated failure | Same rule causes two bad outputs | Add to `MEMORY.md` mistakes section |
| Overlap | New rule repeats an existing rule | Merge instead of duplicating |

## Rule Priority

Project convention for conflicts, highest to lowest:

| Priority | Source | Rule |
|---|---|---|
| 1 | 🛡️ Safety and security guardrails | Never expose secrets or unsafe instructions |
| 2 | 👤 Current user request | Follow the latest explicit instruction if safe |
| 3 | 🎯 Current mission files | `QA-MISSION.md`, active task brief, or sprint brief |
| 4 | 📁 `.clinerules/` numbered files | Lower number wins within project rules |
| 5 | 🌐 Cross-tool files | `AGENTS.md`, `CLAUDE.md`, root instructions |
| 6 | 📖 Project memory | `memory-bank/*.md`, `CONTEXT.md` |
| 7 | 🧠 Learning log | `MEMORY.md` lessons and patterns |

When same-priority rules conflict, follow the newest, most specific, and safest rule.

## Stale Rule Response

When a stale rule appears, write this log line:

```text
⚠️ STALE RULE: [file] — [reason]
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

## Enforcement Tags

| Tag | Meaning |
|---|---|
| `[ENFORCED: agent-check]` | Agent verifies compliance during the task |
| `[ENFORCED: CI]` | Future automated check can enforce this |
| `[ADVISORY]` | Helpful practice, not required every time |
| `[DEPRECATED]` | Do not follow unless user restores it |

## Rule Review Workflow

| Step | Action | Output |
|---|---|---|
| 1. Inventory | List `.clinerules/*.md`, `AGENTS.md`, `CLAUDE.md`, Memory Bank, and root memory files | File list |
| 2. Footer check | Confirm each target file has the current footer | ✅ or 🔴 |
| 3. Path check | Verify referenced paths exist or are labeled planned | ✅, ⚠️, or 🔴 |
| 4. Conflict check | Compare against priority order | Conflict log |
| 5. Duplication check | Find repeated instructions across rule files | Merge note |
| 6. Patch | Apply smallest safe edit | Changed files list |
| 7. Reflect | Run `04-reflection.md` | Self-check line |

## Suggested Verification Commands

| Check need | Command |
|---|---|
| List rule files | `find .clinerules -maxdepth 1 -name "*.md" -type f | sort` |
| Check footer on rules | `for f in .clinerules/*.md; do tail -n 1 "$f"; done` |
| Find path references | `grep -R "source-files/\|memory-bank/\|modules/" .clinerules/` |
| Find repeated warnings | `grep -R "Never expose secrets" .clinerules/ AGENTS.md CLAUDE.md` |
| Show changed files | `git diff --name-only` |

## Maintenance Log Format

Use this compact format when hygiene work changes rules:

```text
Rule hygiene: PASS — files checked: [count] | stale: [count] | duplicates: [count] | patched: [count]
Rule hygiene: FAIL — issue: [short reason] | action: [fixed or logged]
```

Self-check: PASS — hygiene owns freshness, priority, duplication, and review workflow without repeating the task reflection protocol.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
