# Safety Gate Rule

[ENFORCED: agent-check]

<!-- ABSORBED: ai_project_os_v5 — Safety Gate Rule -->

## Scope

Use this rule before and during AI-assisted work.

This file owns the **pre-flight gate** and **mid-flight stop rules**. It helps the agent avoid messy context, hidden failures, unsafe edits, and scope creep.

It does **not** replace:

| File | Owns |
|---|---|
| `04-reflection.md` | Self-check after output, file edits, or command sequences |
| `05-hygiene.md` | Rule freshness, duplication, priority, and stale rule handling |

<!-- ABSORBED: ai_project_os_v5 — Beginner Safety Analogy -->

## Simple Meaning

Think of this like a **seatbelt before driving**.

Before the agent edits files or runs commands, it must check:

```text
Do I have enough context?
Did I read before editing?
Will Mel see any risk, failure, or blocker?
Am I still doing only the approved task?
```

If the answer is unclear, the agent must pause and make the problem visible.

<!-- ABSORBED: ai_project_os_v5 — When to Use Safety Gate -->

## When to Use

Use this rule when the agent will:

- edit files
- create new files
- run terminal commands
- change project rules
- update prompts, SOPs, docs, or repo templates
- work across multiple files
- continue after a meaningful change
- recover after an error, failed check, or confusing context

<!-- ABSORBED: ai_project_os_v5 — Pre-Flight Checklist -->

## Pre-Flight Checklist

The agent must pass this checklist before starting meaningful work.

| Gate | Question | Pass means | If not pass |
|---|---|---|---|
| **Token Budget** | Is the task focused enough for one context? | One clear goal. Relevant files only. No giant "do everything" task. | Split the task, compact context, or create a handoff. |
| **Checkpoint** | Have we paused after meaningful changes? | Changes are summarized before the next risky step. | Write a checkpoint before continuing. |
| **Read-Before-Write** | Did we inspect the target files before editing? | Existing files were read first, or missing files were confirmed missing. | Read the file or verify the path before writing. |
| **Fail-Loud** | Are failures, unknowns, and blockers visible? | Errors, assumptions, and gaps are stated clearly. | Stop hiding uncertainty. Report the blocker. |
| **Scope Lock** | Has scope expanded without approval? | Work matches the current requested task only. | Stop and ask for approval before expanding. |

<!-- ABSORBED: ai_project_os_v5 — Pass Criteria -->

## Pass Criteria

The agent may continue only when all are true:

- [ ] The task has one clear goal.
- [ ] The needed files are identified.
- [ ] Existing target files were inspected before editing.
- [ ] Unknowns are marked clearly.
- [ ] The next verification step is known.
- [ ] The work has not expanded beyond Mel's request.

<!-- ABSORBED: ai_project_os_v5 — Stop Conditions -->

## Stop Conditions

Stop immediately if any condition below appears.

| Stop condition | What it looks like | Required action |
|---|---|---|
| **Context is noisy** | Too many files, mixed goals, unclear current task | Compact, summarize, or split the task. |
| **Editing without reading** | Agent writes into a file it has not inspected | Stop. Read the file first. |
| **Verification is missing** | Agent says work is done without a check | Run the simplest available check or mark why it cannot be run. |
| **Failures are hidden** | Errors are skipped, softened, or buried | Report the exact failure and next safe action. |
| **Scope expanded** | Agent adds extra features, files, or architecture | Stop and get approval before continuing. |

<!-- ABSORBED: ai_project_os_v5 — Mid-Flight Checkpoint -->

## Mid-Flight Checkpoint Rule

After any meaningful change, pause and write a short checkpoint.

Use this format:

```text
Checkpoint:
- Changed:
- Why:
- Files touched:
- Check run:
- Result:
- Risk / unknown:
- Next safe action:
```

Meaningful changes include:

- creating or editing a file
- deleting or moving a file
- changing rules or instructions
- running a command that changes the repo
- adding a new workflow, SOP, template, or automation

<!-- ABSORBED: ai_project_os_v5 — Fail-Loud Rule -->

## Fail-Loud Rule

Do not hide problems to sound confident.

Use this format when something fails or is unknown:

```text
Safety Gate: STOP - [short reason]
Evidence: [what was checked]
Blocker: [what prevents safe progress]
Next safe action: [smallest safe fix]
```

Good examples:

| Weak message | Better message |
|---|---|
| "Done." | "Created the file and verified it exists." |
| "Should work." | "Check not run yet because no test command exists. Manual review needed." |
| "I updated the rule." | "Updated `06-safety-gate.md`; footer and absorbed marker confirmed." |
| "No issue." | "No issue found in the inspected lines; full repo audit was not run." |

<!-- ABSORBED: ai_project_os_v5 — Scope Lock Rule -->

## Scope Lock Rule

The agent must protect Mel from accidental overbuilding.

| Allowed | Not allowed without approval |
|---|---|
| Do the requested task | Add unrelated features |
| Create the requested file | Rewrite extra files because they look old |
| Make the smallest safe edit | Refactor the repo silently |
| Report improvement ideas | Apply improvement ideas automatically |
| Mark future work as planned | Pretend future work is already done |

Rule:

```text
If the work grows beyond the current task, stop and ask for approval.
```

<!-- ABSORBED: ai_project_os_v5 — Safety Gate Output Format -->

## Required Output Format for Agents

Before work:

```text
Safety Gate: PASS - task is focused, files identified, scope locked.
```

If the task is too broad:

```text
Safety Gate: NEEDS SPLIT - [reason]
Suggested split:
1. [first safe task]
2. [second safe task]
```

After meaningful work:

```text
Safety Gate Checkpoint: PASS - [what changed] | Check: [what was verified] | Next: [safe next action]
```

If blocked:

```text
Safety Gate: STOP - [reason] | Evidence: [checked item] | Next safe action: [action]
```

<!-- ABSORBED: ai_project_os_v5 — Agent Behavior Rules -->

## Agent Behavior Rules

- Read before writing.
- Work on one task at a time.
- Use the smallest safe change.
- Do not edit source/reference files unless Mel explicitly asks.
- Do not hide errors.
- Do not claim verification without evidence.
- Do not expand scope silently.
- Do not paste or expose secrets.
- Prefer a clear stop over a confident wrong answer.

<!-- ABSORBED: ai_project_os_v5 — Quick Self-Test -->

## Quick Self-Test

Before saying a task is complete, answer:

| Question | Answer |
|---|---|
| Did I inspect the right file before writing? | Yes / No / N/A |
| Did I keep the task small? | Yes / No |
| Did I show failures or unknowns? | Yes / No / N/A |
| Did I verify the created or edited file exists? | Yes / No / N/A |
| Did I avoid scope creep? | Yes / No |

If any answer is **No**, fix or report it before continuing.

## Source Note

This rule absorbs the useful safety-gate idea from AI Project OS v5 and rewrites it in UNGASIS style. It is not a wholesale copy.

Self-check: PASS - safety gate owns pre-flight and mid-flight stop rules without replacing `04-reflection.md` or `05-hygiene.md`.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
