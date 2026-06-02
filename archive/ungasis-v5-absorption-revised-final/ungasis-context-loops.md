# UNGASIS Content Module: Context Loops

**Module ID:** CTX-LOOPS-001  
**Audience:** Mel John Dimat - beginner, ESL, visual learner, $0 budget  
**Purpose:** Keep AI context small, useful, current, and safe.  
**Use when:** Starting a project, continuing a project, onboarding an AI assistant, or doing complex work that may overflow one chat.

<!-- ABSORBED: ai_project_os_v5 — Context Loop Overview -->

## 0. Simple Idea

AI works better when it reads the **right small map**, not the whole library.

### Beginner analogy: travel bag

| Bad context | Good context |
|---|---|
| Packing the whole house for a 1-day trip | Packing one small bag with only what you need today |
| AI sees too many old notes and gets confused | AI sees the current goal, key files, risks, and test step |
| Chat becomes noisy | Work stays focused |

**Rule:** Context is not memory dumping. Context is choosing what the AI needs for the next useful action.

---

<!-- ABSORBED: ai_project_os_v5 — Context Loop Choice Table -->

## 1. Which Loop Should I Use?

| Situation | Use this workflow | Simple meaning |
|---|---|---|
| New project | **Karpathy Loop** | Create or refresh the project map. |
| Existing repo but AI keeps missing obvious facts | **Karpathy Loop** | Fix the main context file instead of repeating yourself in chat. |
| Public or docs-heavy project | **Karpathy Loop** | Keep `LLM_CONTEXT.md` and safe `llms.txt` useful. |
| Complex task with many files | **Context Engineering Loop** | Build a small context pack for one task. |
| Debugging, research, refactor, or multi-step task | **Context Engineering Loop** | Gather only what matters, act, verify, then shed old context. |
| Chat feels messy or too long | **Context Engineering Loop** | Compress, hand off, or clear stale context. |

### Short version

```text
Project memory problem -> Karpathy Loop
Task context problem   -> Context Engineering Loop
```

---

<!-- ABSORBED: ai_project_os_v5 — Karpathy Loop -->

## 2. Workflow 1: Karpathy Loop

**Goal:** Keep `LLM_CONTEXT.md` current so any AI assistant can understand the project quickly.

```text
Gather -> Curate -> Write -> Use -> Verify -> Refresh
```

### Karpathy Loop: When to use

Use this when:

- starting a new AI-assisted project
- onboarding Cline, Copilot, Claude Code, ChatGPT, Gemini CLI, or another AI assistant
- the assistant keeps asking the same questions
- the assistant keeps missing project rules
- important files, stack, commands, or risks changed
- you need a clean handoff before the next work session

### Karpathy Loop: Step-by-step

| Step | Action | Output |
|---:|---|---|
| 1 | **Gather** only high-signal facts | Project purpose, stack, key files, commands, milestone, risks |
| 2 | **Curate** what is still true and useful | Remove stale notes, duplicates, and noisy history |
| 3 | **Write** or update `LLM_CONTEXT.md` | One compact context file |
| 4 | **Use** it at the start of AI sessions | Assistant reads the same project map |
| 5 | **Verify** the assistant understood it | Ask the assistant to summarize the project and rules |
| 6 | **Refresh** after meaningful changes | Update context before the next build/research session |

### What goes into `LLM_CONTEXT.md`

| Section | What to write | Keep it short? |
|---|---|---|
| Project name | Name of the project | Yes |
| Purpose | What the project is for | Yes |
| Current phase | Personal, prototype, beta, public, commercial, etc. | Yes |
| Stack/tools | Main tools and runtime | Yes |
| Key files | Files AI should inspect first | Yes |
| Current goals | What matters now | Yes |
| Constraints | Budget, skill, safety, data level, no-go items | Yes |
| Verification | Commands or manual checks | Yes |
| Risks | What can go wrong | Yes |
| Out of scope | What not to build or change | Yes |

### `llms.txt` rule

Use `llms.txt` only when the project is public, shared, or documentation-heavy.

| Rule | Why |
|---|---|
| Keep it public-safe | `llms.txt` may be shared or indexed. |
| Link to safe entry points only | It should guide, not expose private work. |
| Do not include secrets | No API keys, tokens, private URLs, client data, or internal notes. |
| Keep it shorter than full docs | It is a map, not the whole library. |

### Karpathy Loop: Done criteria

The Karpathy Loop is done when:

- [ ] `LLM_CONTEXT.md` exists or was updated.
- [ ] It contains only current, high-signal context.
- [ ] It has no secrets or private data.
- [ ] `llms.txt` is updated only if public-safe and useful.
- [ ] An AI assistant can summarize the project correctly from the context file.
- [ ] Repeated mistakes are fixed in the context file, not only in chat.

---

<!-- ABSORBED: ai_project_os_v5 — Context Engineering Loop -->

## 3. Workflow 2: Context Engineering Loop

**Goal:** Give the AI the right context for **one complex task**, then remove stale context before it causes confusion.

```text
Acquire -> Curate -> Compress -> Act -> Verify -> Persist -> Shed
```

### Context Engineering Loop: When to use

Use this when the task is:

- complex
- multi-file
- ambiguous
- risky
- research-heavy
- debugging-heavy
- likely to exceed a small chat context
- likely to create stale assumptions if the session continues too long

### Context Engineering Loop: Step-by-step

| Step | Action | Beginner meaning | Output |
|---:|---|---|---|
| 1 | **Acquire** | Collect only the needed files, specs, errors, docs, and examples | Raw task material |
| 2 | **Curate** | Pick what matters for the next action | Relevant notes only |
| 3 | **Compress** | Turn the notes into a small context pack | Context pack |
| 4 | **Act** | Work on one focused goal | File edit, plan, research, test, or answer |
| 5 | **Verify** | Run the strongest simple check available | Pass/fail evidence |
| 6 | **Persist** | Save durable lessons to docs, context, wiki, or decisions | Reusable project memory |
| 7 | **Shed** | Remove stale context with clear handoff or fresh chat | Cleaner next session |

### What "shed" means

Shedding means removing context that no longer helps.

| Shed this | Keep this |
|---|---|
| Old errors already fixed | Final decision |
| Long chat arguments | Current goal |
| Dead options | Chosen option and why |
| Repeated copied prompts | Reusable rule, skill, or SOP |
| Obsolete file paths | Current file paths |
| Unverified guesses | Verified facts and open questions |

### Context Engineering Loop: Done criteria

The Context Engineering Loop is done when:

- [ ] The task has one focused goal.
- [ ] The context pack is short enough to read quickly.
- [ ] Relevant files and decisions are listed.
- [ ] Constraints and out-of-scope items are clear.
- [ ] Verification was run or clearly marked as not available.
- [ ] Durable lessons were saved to the correct file.
- [ ] Stale context was shed, cleared, or moved into a handoff.

---

<!-- ABSORBED: ai_project_os_v5 — Context Pack Template -->

## 4. Output Template: Context Pack

Use this before any complex task.

```markdown
# Context Pack

## Goal
[One focused task.]

## Current phase / rigor
[Personal / private / prototype / private beta / public MVP / commercial / high-risk]

## Relevant files
| File | Why it matters | Read before edit? |
|---|---|---|
| [path] | [reason] | Yes/No |

## Relevant decisions
| Decision | Source / file | Still true? |
|---|---|---|
| [decision] | [source] | Yes/No/Unknown |

## Constraints
- Budget:
- Data level:
- Tools allowed:
- Tools not allowed:
- Style rules:
- Safety rules:

## Risks / stop rules
- Stop if:
- Ask approval before:
- Mark uncertain if:

## Verification
| Check | Command or manual step | Pass condition |
|---|---|---|
| [check] | [command/step] | [expected result] |

## Out of scope
- [what not to do]

## Persist after work
- Save durable lesson to:
- Update decision log? Yes/No
- Update context file? Yes/No

## Shed after work
- Remove old errors:
- Clear stale assumptions:
- Create handoff? Yes/No
```

---

<!-- ABSORBED: ai_project_os_v5 — Beginner Workflow Example -->

## 5. Tiny Example

### Situation

Mel asks AI to fix a dashboard bug.

### Bad way

```text
Read my whole repo and fix everything.
```

### Better way

```text
Use the Context Engineering Loop.
Goal: fix the dashboard blank page only.
Relevant files: package.json, src/App.tsx, src/routes/dashboard.tsx.
Recent error: [redacted error].
Out of scope: redesign, new features, database changes.
Verification: run app locally and open dashboard.
```

### Why this works

| Reason | Benefit |
|---|---|
| Small goal | Less AI drift |
| Relevant files only | Less noise |
| Out of scope stated | Less overbuilding |
| Verification listed | Less fake confidence |
| Handoff after fix | Cleaner next session |

---

<!-- ABSORBED: ai_project_os_v5 — Agent Rules for Context Loops -->

## 6. Agent Rules

| Rule | Agent behavior |
|---|---|
| Read before writing | Inspect relevant files before editing them. |
| Small context first | Do not load the whole project when a few files are enough. |
| One goal at a time | Do not combine unrelated tasks. |
| Fail loud | Show missing files, failed checks, and uncertain assumptions. |
| Verify before done | Report the exact check and result. |
| Persist durable lessons | Save repeated lessons to context, SOPs, wiki, rules, or decisions. |
| Shed stale context | Use handoff or fresh chat when the session gets noisy. |

---

<!-- ABSORBED: ai_project_os_v5 — Quick Checklists -->

## 7. Quick Checklists

### Before work

- [ ] Do I know the one goal?
- [ ] Do I know which files matter?
- [ ] Did I avoid loading irrelevant history?
- [ ] Did I state constraints and out-of-scope work?
- [ ] Did I define how to verify the result?

### During work

- [ ] Am I still on the same goal?
- [ ] Did new risk appear?
- [ ] Did scope expand?
- [ ] Should I checkpoint now?
- [ ] Should I stop and ask for approval?

### After work

- [ ] What changed?
- [ ] What check was run?
- [ ] What passed or failed?
- [ ] What lesson should be saved?
- [ ] What context should be shed?

---

<!-- ABSORBED: ai_project_os_v5 — Staleness and Refresh Rules -->


## 8. Copy-Paste Helper Prompts

<!-- ABSORBED: ai_project_os_v5 — Context pack prompts -->

### Prompt 1: Update `LLM_CONTEXT.md`

```text
Act as a careful context librarian.

Goal:
Update LLM_CONTEXT.md so a new AI assistant can understand this project quickly.

Rules:
- Keep it compact.
- Use simple English.
- Include project purpose, current phase, key files, constraints, verification, risks, and out of scope.
- Do not include secrets or private data.
- Mark uncertain or stale items with ⚠️.
- End with the staleness footer.

Output:
A revised LLM_CONTEXT.md file.
```

### Prompt 2: Build a task context pack

```text
Act as a context engineer.

Task:
[ONE COMPLEX TASK]

Please create a context pack with:
1. Goal
2. Current phase / rigor
3. Relevant files
4. Relevant decisions
5. Constraints
6. Risks / stop rules
7. Verification
8. Out of scope
9. What to persist after work
10. What to shed after work

Use only the context needed for this task. Do not load the whole repo if not needed.
```

## 9. Staleness Rules

Context is stale when it is no longer safe to trust.

| Staleness signal | Action |
|---|---|
| File path changed | Update context pack or `LLM_CONTEXT.md`. |
| Tool behavior changed | Check current official source or mark as warning. |
| Goal changed | Start a new context pack. |
| Decision reversed | Update decision log and context. |
| Errors fixed | Remove old error logs from active context. |
| Chat is too long or noisy | Create handoff, then start fresh. |
| Repeated mistake happened | Patch the context file or create a rule/SOP. |

---

<!-- ABSORBED: ai_project_os_v5 — UNGASIS Trace -->

## 10. UNGASIS Trace

| Field | Value |
|---|---|
| Mode | Execution / Module Build |
| Rigor | Prototype / repo knowledge module |
| Domain | Context engineering, AI-assisted project workflow |
| Dimensions | Knowledge, Memory, Guardrails, Evaluation, Maintenance |
| Lenses | Beginner teacher, workflow designer, context librarian, safety reviewer |
| Intelligences | Context, instruction-following, execution, risk, learning |
| Frameworks | Karpathy Loop, Context Engineering Loop, Minimum Viable Rigor, Self-Correction Loop |
| Engines | Workflow Designer, Artifact Builder, QA/Security |
| Tools/Files | v5 reference files, UNGASIS project rules |
| Guardrails | No secrets, public-safe `llms.txt`, read-before-write, verify-before-done |
| Template | Markdown knowledge module |

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
