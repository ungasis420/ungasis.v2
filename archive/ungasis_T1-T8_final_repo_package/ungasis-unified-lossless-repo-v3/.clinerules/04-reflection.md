# Reflection Protocol (Self-Critique Loop)

[ENFORCED: agent-check]

## Scope

Use this rule after every task, file edit, artifact, report section, or command sequence before moving forward.

This file owns task-level self-review. It does not own rule freshness, rule priority, or stale-rule handling. Use `05-hygiene.md` for those.

## Purpose

Make the agent behave like a careful builder:

```text
Create output -> inspect output -> compare to request -> fix gaps -> log result
```

## Reflection Loop

| Step | Action | Pass check |
|---|---|---|
| 1. PAUSE | Re-read the user request and the created output | Main task is still the target |
| 2. CHECK | Compare output against acceptance criteria | Every requested item is covered or marked ⚠️ |
| 3. VERIFY | Check files, tables, counts, names, links, and claims | Evidence or clear assumption is present |
| 4. FIX | Repair issues before the next task | Same issue is not left unresolved |
| 5. LOG | Add the required self-check line | Pass or fail is visible |

## Acceptance Snapshot

Before finalizing a task, identify these four items:

| Item | Required check |
|---|---|
| Requested output | File, answer, table, report, code, or package exists |
| Constraints | User rules, repo rules, and safety rules were followed |
| Location | Output is saved or referenced in the expected path |
| Verification | A pass or fail check was run or clearly described |

## Quality Gate

| Area | Rule |
|---|---|
| File output | Created or updated files must exist at the stated path |
| Tables | No empty cells; use ✅, 🟡, 🔴, ⚠️, or N/A where status is needed |
| Placeholders | No unfinished placeholder markers in final output |
| Counts | Verify with file search, shell command, or mark ⚠️ if estimated |
| File references | Existing-file references must match real filenames; planned files must be labeled planned |
| Claims | Unverified or fast-changing claims must be marked ⚠️ or cited when research is used |
| Safety | No secrets, credentials, private keys, or unsafe instructions |
| Source files | Do not modify read-only `source-files/` content |
| Footers | For rule and memory files, apply footer rules from `05-hygiene.md` |
| Memory | If project state changed, update `activeContext.md` or `progress.md` when Memory Bank rules are active |

## Suggested Verification Commands

Use the cheapest check that proves the point.

| Need | Example command |
|---|---|
| Confirm file exists | `test -f .clinerules/04-reflection.md` |
| Count matching files | `find . -name "*.md" -type f | wc -l` |
| Find repeated phrase | `grep -R "phrase" .clinerules/` |
| Check footer | `tail -n 3 .clinerules/04-reflection.md` |
| Check changed files | `git diff --name-only` |

## Failure Handling

| Situation | Action |
|---|---|
| Small issue found | Fix immediately and re-run reflection |
| Larger issue found | Fix only the affected file or section |
| Count cannot be verified | Mark ⚠️ and explain the missing evidence |
| File missing | Log 🔴 with filename and continue only if safe |
| Rule conflict found | Pause reflection and apply `05-hygiene.md` conflict handling |
| Two fix attempts fail | Log fail clearly, preserve partial work, then stop or continue only if safe |

## Required Log Format

```text
Self-check: PASS — [what was checked]
Self-check: FAIL — [issue found] | Action: [fixed or logged]
```

## Completion Rule

A task is complete only when:

- the requested output exists
- acceptance criteria were checked
- obvious issues were fixed
- unsafe or uncertain items were flagged
- the self-check line was written

Self-check: PASS — rule scope, quality gate, failure handling, and log format are defined without duplicating `05-hygiene.md`.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
