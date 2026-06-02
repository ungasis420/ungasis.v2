# Reflection Protocol (Self-Critique Loop)

[ENFORCED: agent-check]

## Scope

Use this rule after every task, file edit, artifact, report section, or command sequence before moving forward.

This file owns task-level self-review. It does not own rule freshness, rule priority, or stale-rule handling. Use `05-hygiene.md` for those.

## Purpose

Make the agent behave like a careful builder:

```text
Create output -> inspect output -> compare to request -> verify -> fix gaps -> report evidence
```

Simple analogy:

```text
If you repair a light switch, you do not just say "done."
You flip the switch and check if the light turns on.
AI work is the same: write -> check -> show proof.
```

---

## Reflection Loop

| Step | Action | Pass check |
|---|---|---|
| 1. PAUSE | Re-read the user request and the created output | Main task is still the target |
| 2. CHECK | Compare output against acceptance criteria | Every requested item is covered or marked ⚠️ |
| 3. VERIFY | Check files, tables, counts, names, links, and claims | Evidence or clear assumption is present |
| 4. FIX | Repair issues before the next task | Same issue is not left unresolved |
| 5. LOG | Add the required self-check line | Pass or fail is visible |

<!-- ABSORBED: ai_project_os_v5 — Auto-Verify Loop -->

## Auto-Verify Rule

After every file write, the agent must run the simplest available check.

No "trust me it works." No silent verification. No fake green check.

| Output type | Simplest useful check | Stronger check when available |
|---|---|---|
| Markdown rule or SOP | Confirm file exists, required headings exist, footer exists | Search for required keywords and duplicate/conflicting sections |
| Code file | Confirm file exists and changed file list is expected | Run lint, typecheck, unit test, or app start |
| Config file | Check syntax or required keys | Run build/test that reads the config |
| Data file | Check row/column count or schema | Run validation script or sample import |
| Prompt/template | Check required sections are present | Run a small test prompt or reviewer pass |
| Research note | Check sources, dates, and uncertainty labels | Re-open official/current source and compare claims |
| No tool available | Run manual checklist and say it is manual | Ask for the missing command only if truly blocking |

### Auto-Verify ladder

Use the cheapest check that proves the point.

| Level | Check | Use when |
|---:|---|---|
| 1 | File exists / path check | Any file write |
| 2 | Required text check | Markdown, rules, prompts, templates |
| 3 | Syntax check | JSON, YAML, config, code |
| 4 | Lint / typecheck | Code project has these commands |
| 5 | Unit / integration test | Behavior changed |
| 6 | Build / app start / smoke test | App or deployable output changed |
| 7 | Manual checklist | No automated test is available |


### What does NOT count as verification

<!-- ABSORBED: ai_project_os_v5 — Verification Evidence Rule -->

| Not enough | Why it fails | Better evidence |
|---|---|---|
| `Verified ✅` | It does not say what was checked | `Ran grep for required headings; all found.` |
| `Should work` | It is a prediction, not proof | Run the app, test, build, or file check. |
| `Looks good` | Visual review alone can miss broken paths or missing sections | Say exactly what was inspected. |
| `No issues found` | Too vague | Name the checked risk: secrets, footer, duplicate heading, required marker, etc. |
| `I updated the file` | Editing is not the same as validating | Confirm file path, required content, and footer. |

### Auto-Verify stop rule

Stop and report clearly when:

- no check was run
- the check failed
- the check is unavailable
- the file was written to the wrong path
- the result depends on an assumption
- the agent cannot inspect the changed file

Do not continue as if the task passed.

<!-- ABSORBED: ai_project_os_v5 — Auto-Research Loop -->

## Auto-Research Rule

Before making claims about tools, APIs, prices, model behavior, platform behavior, laws, policies, quotas, limits, or current UI steps, check an official or current source first.

If the source cannot be checked, mark the claim with ⚠️ and say what is missing.

| Claim type | Preferred source | If not available |
|---|---|---|
| Tool feature | Official docs or product help page | Mark ⚠️ and say "not verified from official docs" |
| API behavior | Official API docs, changelog, SDK docs | Mark ⚠️ and avoid exact claims |
| Pricing / quota / limits | Official pricing or limits page | Mark ⚠️ and tell user to re-check before spending money |
| Platform UI step | Official help docs or current product UI | Mark ⚠️ because menus can change |
| Legal / tax / regulation | Official government or regulator source | Mark ⚠️ and recommend qualified review |
| Security / privacy | Official security, trust, or admin docs | Mark ⚠️ and use conservative wording |
| Repo-specific rule | Local repo file | Cite or name the exact file inspected |

### Auto-Research wording

Use this pattern when research is needed:

```text
Source checked: [official source or local file]
Claim supported: [short claim]
Limit: [what may change or what was not verified]
```

Use this pattern when research is not possible:

```text
⚠️ Unverified: I could not check an official/current source for [claim]. Treat this as a working assumption, not final truth.
```

<!-- ABSORBED: ai_project_os_v5 — Verification Evidence Rule -->

## Verification Evidence Rule

The agent must report what check was run and what the result was.

Bad evidence:

```text
Verified ✅
Looks good.
Should work now.
```

Good evidence:

```text
Verification: PASS — ran `test -f .clinerules/04-reflection.md`; file exists.
Verification: PASS — searched for `Auto-Verify Rule`, `Auto-Research Rule`, and `Verification Evidence Rule`; all present.
Verification: ⚠️ PARTIAL — no project test command found, so I used a manual checklist.
Verification: FAIL — `npm test` failed with [short error]; fixed [file] and re-ran.
```

### Required evidence table

For file tasks, include this table in the final report or task log.

| Check | What was run or inspected | Result |
|---|---|---|
| File path | Exact file path | PASS / FAIL |
| Required content | Keywords, headings, or sections checked | PASS / FAIL |
| Safety | Secret/private-data check | PASS / FAIL / N/A |
| Verification | Command, test, or manual checklist | PASS / FAIL / ⚠️ PARTIAL |
| Gaps | Anything not checked | None / ⚠️ listed |

---

## Acceptance Snapshot

Before finalizing a task, identify these four items:

| Item | Required check |
|---|---|
| Requested output | File, answer, table, report, code, or package exists |
| Constraints | User rules, repo rules, and safety rules were followed |
| Location | Output is saved or referenced in the expected path |
| Verification | A pass or fail check was run and evidence was reported |

---

## Quality Gate

| Area | Rule |
|---|---|
| File output | Created or updated files must exist at the stated path |
| Tables | No empty cells; use ✅, 🟡, 🔴, ⚠️, or N/A where status is needed |
| Placeholders | No unfinished placeholder markers in final output unless intentionally labeled TODO |
| Counts | Verify with file search, shell command, or mark ⚠️ if estimated |
| File references | Existing-file references must match real filenames; planned files must be labeled planned |
| Claims | Unverified or fast-changing claims must be marked ⚠️ or cited when research is used |
| Current facts | Tool, API, price, law, model, or platform claims require official/current source check |
| Safety | No secrets, credentials, private keys, or unsafe instructions |
| Source files | Do not modify read-only `source-files/` content |
| Footers | For rule and memory files, apply footer rules from `05-hygiene.md` |
| Memory | If project state changed, update `activeContext.md` or `progress.md` when Memory Bank rules are active |

---

## Suggested Verification Commands

Use the cheapest check that proves the point.

| Need | Example command |
|---|---|
| Confirm file exists | `test -f .clinerules/04-reflection.md` |
| List rule files | `find .clinerules -maxdepth 1 -name "*.md" -type f | sort` |
| Check required heading | `grep -n "Auto-Verify Rule" .clinerules/04-reflection.md` |
| Check footer | `tail -n 1 .clinerules/04-reflection.md` |
| Check changed files | `git diff --name-only` |
| Search for secret words | `grep -R "api_key\|password\|token\|secret" . --exclude-dir=.git` |
| Run lint if available | `npm run lint` |
| Run tests if available | `npm test` |
| Run build if available | `npm run build` |

Do not run destructive commands as verification.

---

## Failure Handling

| Situation | Action |
|---|---|
| Small issue found | Fix immediately and re-run reflection |
| Larger issue found | Fix only the affected file or section |
| Count cannot be verified | Mark ⚠️ and explain the missing evidence |
| File missing | Log 🔴 with filename and continue only if safe |
| Official source unavailable | Mark ⚠️ and avoid exact current claims |
| Verification command unavailable | Run manual checklist and report it as manual |
| Verification failed | Report the failure, fix if in scope, and re-run the check |
| Rule conflict found | Pause reflection and apply `05-hygiene.md` conflict handling |
| Two fix attempts fail | Log fail clearly, preserve partial work, then stop or continue only if safe |

---

## Required Log Format

Use one of these lines after every meaningful task.

```text
Self-check: PASS — [what was checked] | Evidence: [command/check + result]
Self-check: PARTIAL — [what was checked] | Gap: [what could not be verified]
Self-check: FAIL — [issue found] | Action: [fixed or logged]
```

---

## Completion Rule

A task is complete only when:

- the requested output exists
- acceptance criteria were checked
- every file write has at least one verification check
- tool/API/price/platform/current claims were checked against official/current sources or marked ⚠️
- obvious issues were fixed
- unsafe or uncertain items were flagged
- the self-check line includes evidence, not just a green check

Self-check: PASS — rule scope, Auto-Verify, Auto-Research, evidence reporting, failure handling, and completion rules are defined without taking over `05-hygiene.md` staleness ownership.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
