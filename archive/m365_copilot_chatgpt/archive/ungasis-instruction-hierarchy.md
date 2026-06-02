# UNGASIS Content Module: Instruction Hierarchy Map

**File:** `ungasis-instruction-hierarchy.md`  
**Purpose:** A beginner-friendly map for where instructions should live across ChatGPT, M365 Copilot, agents, notebooks, and code projects.  
**Audience:** Mel John Dimat — beginner, ESL, visual learner, $0 budget, AI-assisted builder.  
**Mode:** Deep / Reference Module.  

> 🍳 **Simple analogy:** Think of instructions like a restaurant kitchen.  
> - **Global rules** = restaurant house rules.  
> - **Project rules** = recipe book for today’s dish.  
> - **Agent rules** = job description for one cook.  
> - **Chat rules** = today’s customer order.  
> - **Code rules** = labels on ingredients and machines.  
>
> If rules conflict, safety wins first.

---

## 1. The 5-Layer Instruction Stack

```text
Layer 1 — Global / System
   ↓
Layer 2 — Project / Workspace
   ↓
Layer 3 — Agent / GPT
   ↓
Layer 4 — Session / Conversation
   ↓
Layer 5 — Code / Development
```

### Quick Meaning

| Layer | Simple meaning | Best for | Danger if misused |
|---|---|---|---|
| 1. Global / System | Your permanent personal defaults | Learning style, safety defaults, tone | Too broad; can conflict with projects |
| 2. Project / Workspace | Rules for one project | UNGASIS, RiftCoach, Newmont, QIM | Outdated project rules cause wrong work |
| 3. Agent / GPT | Job description for one AI worker | Research agent, QA agent, coding agent | Agent tries to do too many jobs |
| 4. Session / Conversation | Current task order | “Generate M2 now” | Context can disappear or become messy |
| 5. Code / Development | Instructions inside repo/files | README, `.clinerules`, tests, SOPs | AI edits wrong files or exposes secrets |

---

## 2. Conflict Resolver Priority

When instructions fight each other, use this order:

```text
🛡️ Safety / security / legal constraints
   beats
🎯 Current explicit request
   beats
📁 Project-specific instructions
   beats
🔧 Tool-specific instructions
   beats
🌐 Global preferences
   beats
🎨 Style preferences
   beats
✨ Nice-to-have enhancements
```

### Beginner Example

| Situation | Conflict | Correct decision |
|---|---|---|
| You ask: “Make this public portfolio page using my real client data.” | Current request says publish, but safety says protect client data | 🛡️ Safety wins. Use dummy data instead. |
| Global preference says “give full code,” but current request says “quick answer only.” | Global wants complete output; current request wants short output | 🎯 Current request wins. Give quick answer. |
| Project rule says “do not rewrite `index.html` directly,” but Cline wants to edit it. | Tool tries risky shortcut; repo rule says surgical edits only | 📁 Project/code rule wins. Use script-based edit workflow. |
| Style says “make it cinematic,” but task is a security checklist. | Style wants polish; task needs clarity/safety | 🛡️ Safety and clarity win. Keep it simple. |

---

## 3. Layer 1 — Global / System Level

Examples:
- ChatGPT global custom instructions
- M365 Copilot custom instructions
- Copilot memory / personalization, if available
- Your stable personal learning preferences

| Field | Guidance |
|---|---|
| What belongs | Durable preferences that apply across most work: simple English, tables, step-by-step teaching, no secrets, beginner-friendly explanations, visual aids. |
| What NEVER goes there | API keys, passwords, client data, private company data, temporary project details, one-time instructions, exact file paths that only matter for one project. |
| Good example | “Use simple English. Explain jargon. Use tables and checklists. Mark unverified claims. Never include secrets.” |
| Bad example | “For the Newmont dashboard, always edit `C:\Projects\KF\newmont\index.html` directly.” |
| Conflict avoidance | Keep global rules short and universal. Do not put project-specific instructions here. |
| Update safely | Review monthly. Remove outdated preferences. Keep only rules that help almost every project. |
| Priority order | Lower than current request, project rules, and safety. Higher than style/nice-to-have preferences. |
| Beginner note | This is your “default personality and safety card,” not your project manual. |

### Layer 1 Copy-Paste Template

```text
Use simple English and explain jargon.
Assume I am a beginner and ESL speaker.
Use tables, checklists, and step-by-step instructions.
Mark assumptions and unverified claims.
Do not include secrets, API keys, passwords, or private/company data.
If a task is risky, add a safety check and ask for human approval before action.
```

---

## 4. Layer 2 — Project / Workspace Level

Examples:
- ChatGPT project instructions
- ChatGPT project memory / project-only memory, if available
- Copilot Notebook instructions
- Copilot agent project instructions
- Project-specific source files and source ledgers

| Field | Guidance |
|---|---|
| What belongs | Project goal, current stage, source of truth, tech stack, folder structure, naming rules, roadmap, sprint plan, project constraints, known bugs, safety rules for that project. |
| What NEVER goes there | Real secrets, payment credentials, service-role keys, unrelated projects, broad life preferences that belong globally. |
| Good example | “UNGASIS OS is a browser-first personal operating system for solopreneurs. Use free-first tools. Build modules as standalone Markdown files.” |
| Bad example | “Always use Next.js for every project forever.” |
| Conflict avoidance | Keep one project = one workspace. Do not mix RiftCoach, Newmont, QIM, and UNGASIS in the same project instructions unless it is a cross-project audit. |
| Update safely | Update after each sprint. Add date, version, changed decisions, and next actions. |
| Priority order | Beats tool-specific and global preferences, but loses to safety and current explicit request. |
| Beginner note | This is the “recipe book” for one dish. Do not put every dish in one recipe book. |

### Layer 2 Copy-Paste Template

```text
Project name: [PROJECT]
Current stage: [IDEA / PROTOTYPE / BUILD / AUDIT / LAUNCH]
Goal: [ONE SENTENCE]
Source of truth: [FILES / NOTEBOOK / REPO / SHAREPOINT]
Current stack: [TOOLS]
Hard constraints:
- $0 upfront
- no secrets in chat or repo
- use dummy data unless approved
- do not overbuild
Output style:
- simple English
- tables/checklists
- copy-paste-ready files when needed
Next actions:
1. [ACTION]
2. [ACTION]
3. [ACTION]
```

---

## 5. Layer 3 — Agent / GPT Level

Examples:
- Custom GPT system instructions
- Custom GPT knowledge files
- Custom GPT Actions rules and schemas
- Copilot agent knowledge sources and instructions
- Copilot Studio agent instructions

| Field | Guidance |
|---|---|
| What belongs | One agent role, allowed sources, allowed actions, blocked actions, fallback behavior, output format, review rules, escalation rules, data limit. |
| What NEVER goes there | Broad project strategy for all agents, unrestricted production actions, secrets, vague “do everything” instructions. |
| Good example | “You are the UNGASIS Source Checker. Verify claims only from official sources. If not verified, mark ⚠️ Unverified.” |
| Bad example | “You are an all-powerful builder. Edit files, publish, send emails, and make payments without asking.” |
| Conflict avoidance | One agent = one clear job. Use separate agents for planner, builder, reviewer, researcher, and QA. |
| Update safely | Change one behavior at a time. Test using dummy data. Keep a version log. |
| Priority order | Agent rules guide that agent, but safety, current user request, and project rules can override. |
| Beginner note | An agent is like one employee. If you give one employee ten jobs, quality drops. |

### Layer 3 Copy-Paste Template

```text
Agent name: [NAME]
Role: [ONE JOB ONLY]
Allowed sources:
- [SOURCE 1]
- [SOURCE 2]
Allowed actions:
- [ACTION]
Blocked actions:
- sending messages without approval
- deleting data without approval
- changing permissions without approval
- using secrets
Fallback rule:
If the answer is not in the approved sources, say: “I could not verify this from the approved sources.”
Output format:
- Summary
- Evidence/source
- Risks
- Next action
Max data level: [0-4]
```

---

## 6. Layer 4 — Session / Conversation Level

Examples:
- Current chat instructions
- Per-chat context
- Canvas/Page context
- Current uploaded files
- One-time task constraints

| Field | Guidance |
|---|---|
| What belongs | The task you want now, exact output requested, temporary context, pasted source sections, current constraints, “say next” sequence. |
| What NEVER goes there | Permanent rules that should be saved globally/project-level, secrets, private keys, unapproved sensitive data. |
| Good example | “Start with M1. Deliver one task per response. End with ‘Say next for M2.’” |
| Bad example | “Here are my API keys. Use them to build the app.” |
| Conflict avoidance | Be specific: filename, task number, output format, what to include, what to skip. |
| Update safely | Use compact handoff summaries when context grows. Move stable rules to project files. |
| Priority order | Current explicit request beats project/global/style preferences, unless unsafe. |
| Beginner note | This is today’s order ticket. It should be clear, but it is not permanent memory. |

### Layer 4 Copy-Paste Template

```text
Current task: [TASK]
Output file name: [FILENAME]
Use these sources: [SOURCE NAMES]
Must include: [REQUIRED SECTIONS]
Must avoid: [AVOID]
Style: simple English, tables, checklists
Safety: mark unverified claims and do not invent citations
Delivery: one task per response; end with “Say next.”
```

---

## 7. Layer 5 — Code / Development Level

Examples:
- `README.md`
- `.clinerules`
- `package.json`
- `.env.example`
- `TEST_PLAN.md`
- `SECURITY_CHECKLIST.md`
- `PROJECT_WORKFLOW.md`
- SOPs, changelog, decisions log

| Field | Guidance |
|---|---|
| What belongs | Repo-specific build instructions, file structure, commands, test steps, coding rules, safe edit rules, environment variable names, rollback plan, known bugs. |
| What NEVER goes there | Real API keys, passwords, service-role keys, production secrets, private user data, client data, unrestricted agent permissions. |
| Good example | “Cline must list files before editing. Make smallest safe change. Do not rewrite unrelated files. Do not touch `.env`.” |
| Bad example | “Put the real Groq API key inside `app/page.tsx`.” |
| Conflict avoidance | Put repo rules in `.clinerules` and project state in `PROJECT_WORKFLOW.md`. Keep README for humans. |
| Update safely | Update after working commits. Keep `.env.example` fake. Keep `CHANGELOG.md` factual. |
| Priority order | For coding tasks, repo rules are strong because they prevent breakage. Still below safety and current explicit user request. |
| Beginner note | This is the label on your tools and ingredients. It tells AI where it can safely cut, cook, and clean. |

### Layer 5 Recommended Repo Files

| File | Purpose | Never put here |
|---|---|---|
| `README.md` | What the project is and how to run it | Secrets, private data |
| `PROJECT_WORKFLOW.md` | Current stage, tasks, blockers, next actions | Passwords, private keys |
| `.clinerules` | Cline/AI coding behavior rules | Real credentials |
| `.env.example` | Fake placeholder env variable names | Real values |
| `TEST_PLAN.md` | Manual and automated test checklist | Private production data |
| `SECURITY_CHECKLIST.md` | Secret, auth, permission, data checks | Actual secrets |
| `CHANGELOG.md` | What changed and when | Confidential customer data |
| `DECISIONS.md` | Why choices were made | Private credentials |

### Layer 5 `.clinerules` Starter

```text
You are working inside this repository only.
Before editing, list the files you plan to modify.
Make the smallest safe change.
Do not rewrite unrelated files.
Do not touch .env, secrets, API keys, passwords, or credentials.
Do not rename existing classes/components unless explicitly requested.
After editing, summarize changed files and provide exact test steps.
If a change is risky, stop and explain the risk first.
If the app breaks, recommend rollback to the last working commit.
```

---

## 8. Cross-Layer Conflict Examples

| Conflict | Which layer says what? | Winner | Why |
|---|---|---|---|
| Global says “always be detailed,” current task says “quick summary.” | Layer 1 vs Layer 4 | Layer 4 | Current explicit request wins unless unsafe. |
| Project says “free-first,” tool suggests paid platform. | Layer 2 vs Tool suggestion | Layer 2 | Project constraint controls stack decisions. |
| Agent wants to delete records automatically. | Layer 3 action vs Safety | Safety | Risky actions need human approval. |
| Cline wants to rewrite whole file. Repo says surgical edits only. | Agent behavior vs Layer 5 | Layer 5 | Repo safety rule prevents breakage. |
| Style says “make cinematic,” accessibility says “keep readable.” | Style vs Safety/quality | Safety/quality | Readability and accessibility matter more. |

---

## 9. Safe Update Workflow

Use this whenever you change instructions.

```text
1. Identify the layer.
2. Ask: Is this rule global, project, agent, session, or repo-specific?
3. Put it in the smallest correct place.
4. Remove duplicates from wrong layers.
5. Add date/version if it affects a project or repo.
6. Test with one small task.
7. Keep or revise based on result.
```

### Example

| New rule | Correct layer | Why |
|---|---|---|
| “Use simple English and tables.” | Layer 1 | Applies to almost every conversation. |
| “UNGASIS modules must start with `# UNGASIS Content Module:`.” | Layer 2 | Specific to UNGASIS. |
| “Research agent must cite official sources first.” | Layer 3 | Specific to one agent role. |
| “Generate M2 now.” | Layer 4 | Current task only. |
| “Cline must not rewrite `index.html` directly.” | Layer 5 | Repo-specific coding safety rule. |

---

## 10. Beginner Checklist — Where Should This Instruction Go?

Ask these questions:

| Question | If yes, put it in... |
|---|---|
| Does this apply to almost everything I do? | Layer 1 — Global |
| Does this apply only to one project? | Layer 2 — Project |
| Does this describe one AI worker’s job? | Layer 3 — Agent/GPT |
| Does this apply only to today’s request? | Layer 4 — Session |
| Does this protect or guide a code repo? | Layer 5 — Code/Development |

---

## 11. Recommended UNGASIS Instruction Files

For your UNGASIS repo, use these files:

```text
ungasis/
  README.md
  PROJECT_WORKFLOW.md
  docs/
    ungasis-instruction-hierarchy.md
    ungasis-output-control-rules.md
    ungasis-source-ledger.md
    ungasis-decision-matrix.md
  agents/
    researcher-agent.md
    builder-agent.md
    qa-agent.md
    source-checker-agent.md
  prompts/
    kickoff-prompts.md
    handoff-prompts.md
  .clinerules
  .env.example
```

### Why this structure works

| Folder/file | Why it helps |
|---|---|
| `docs/` | Stores stable UNGASIS methodology modules |
| `agents/` | Keeps agent roles separate, so they do not become messy |
| `prompts/` | Saves reusable kickoff and handoff prompts |
| `.clinerules` | Controls AI coding behavior safely |
| `.env.example` | Shows needed settings without exposing secrets |

---

## 12. Final Golden Rule

> **Put instructions where they are smallest, safest, and most specific.**

```text
Global = how I like to work
Project = what this project is
Agent = what this AI worker does
Session = what I need now
Code = how this repo must be changed safely
```

If unsure, do **not** put it globally. Put it in the project/session first, then promote it later if it proves useful across many projects.

---

## Source Notes

This module was generated from the uploaded UNGASIS methodology files, especially the Master Prompt sections about instruction hierarchy, phased delivery, output depth control, no-fake-completion, anti-bloat rules, source-first research, data safety, and code/development guardrails. It also follows the Playbook’s beginner-first safety patterns around project folders, `.env.example`, Git/rollback, AI coding safety, human approval gates, and data classification.

---

**Version:** v1.0  
**Date:** 2026-05-31  
**Module:** `ungasis-instruction-hierarchy.md`  
**Status:** Generated standalone UNGASIS content module.
