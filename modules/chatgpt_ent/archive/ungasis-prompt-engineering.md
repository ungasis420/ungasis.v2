# UNGASIS Content Module: Prompt Engineering Fundamentals

**Module purpose:** Teach beginner-friendly prompt engineering for ChatGPT, Microsoft 365 Copilot, and VS Code + Cline.  
**Audience:** Mel John Dimat, Filipino beginner / ESL solopreneur / reporting consultant in Manila.  
**Budget posture:** $0 additional upfront spend.  
**Default stage:** Learner → personal prototype.  
**Core idea:** A prompt is not magic. It is an instruction recipe. Better instructions make better AI outputs. 🍳

---

## 0. Start Here: The 1-Minute Prompt Rule

A good prompt should answer five questions:

| Question | Simple meaning | Beginner example |
|---|---|---|
| **1. What job should AI do?** | Tell AI its task. | “Create a project plan.” |
| **2. What background matters?** | Give useful context. | “I am a beginner with $0 budget.” |
| **3. What rules must it follow?** | Set limits and safety. | “Use simple English. Do not use paid tools.” |
| **4. What should the output look like?** | Ask for a table, checklist, prompt, code, etc. | “Output as a 7-step checklist.” |
| **5. How should it check quality?** | Ask AI to verify the result. | “Check for missing steps and safety risks.” |

### Tiny formula

```text
Good prompt = Clear job + Useful context + Rules + Output format + Quality check
```

### Everyday analogy

Ordering from AI is like ordering food.

Weak order:

```text
Make me food.
```

Better order:

```text
Make me a simple Filipino-style chicken meal using only rice, chicken, soy sauce,
garlic, and onion. I am a beginner. Give 6 steps. Include safety checks.
```

Same AI. Better order. Better result.

---

## 1. Data Safety Before Prompting 🔐

Before you paste anything into AI, classify the data.

| Level | Name | Examples | Safe prompt rule |
|---:|---|---|---|
| **0** | Public demo data 🟢 | Fake names, fake app ideas, sample dashboards | Safe for most tools. |
| **1** | Personal non-sensitive 🟡 | Learning notes, non-private plans | Usually okay in trusted tools. Do not publish accidentally. |
| **2** | Private personal 🟠 | Personal finances, journal, private documents | Use only trusted/private tools. Redact when possible. |
| **3** | Company/internal 🔴 | Client reports, employee data, company metrics | Use only approved company/M365 environment. |
| **4** | Secrets/regulated ⛔ | API keys, passwords, tokens, connection strings, PII, health/legal/financial data | **Never paste into AI chats, public repos, screenshots, or frontend code.** |

### Hard rule

```text
Never paste API keys, passwords, tokens, private certificates, service-role keys,
connection strings, or credentials into prompts.
```

### Safe replacement pattern

Instead of this:

```text
My API key is sk-live-123... please debug my app.
```

Use this:

```text
My app uses an API key stored in an environment variable named [API_KEY_NAME].
The exact key is not included. Please debug the setup pattern safely.
```

---

## 2. What Is Prompt Engineering?

**Prompt engineering** means writing clear instructions so AI can produce a useful result.

It is not about “tricking” AI. It is about reducing confusion.

| Prompt engineering is... | Prompt engineering is not... |
|---|---|
| Clear communication | Magic words |
| Giving the right context | Dumping everything |
| Asking for a specific output | Hoping AI guesses correctly |
| Testing and improving | One perfect prompt forever |
| Safe delegation | Letting AI decide risky actions alone |

### Beginner note

You do **not** need to become a professional prompt engineer. You need a repeatable way to ask clearly, test output, and save what works.

---

## 3. The UNGASIS Good Prompt Formula

Use this formula for almost everything:

```text
Role + Goal + Context + Inputs + Constraints + Process + Output Format + Quality Check
```

| Part | What it means | Example |
|---|---|---|
| **Role** | Who should AI act as? | “Act as a patient product coach.” |
| **Goal** | What should be created? | “Create a 7-day validation plan.” |
| **Context** | What background matters? | “I am a beginner in Manila with $0 budget.” |
| **Inputs** | What should AI use? | “My app idea is [IDEA].” |
| **Constraints** | What rules must AI obey? | “Use free tools only. No paid APIs.” |
| **Process** | How should AI think/work? | “First identify assumptions, then make a plan.” |
| **Output format** | What shape should the answer have? | “Use a table with columns: Step, Tool, Time, Output.” |
| **Quality check** | How should AI verify? | “Check for safety, missing steps, and beginner clarity.” |

### Copy-paste master prompt skeleton

```text
Act as [ROLE].

Goal:
[WHAT I WANT CREATED]

Context:
[MY SITUATION, SKILL LEVEL, BUDGET, TOOLS, AUDIENCE]

Inputs:
[PASTE OR DESCRIBE THE MATERIAL AI SHOULD USE]

Constraints:
- Use simple English.
- Assume I am a beginner.
- Use $0/free-first tools unless clearly marked otherwise.
- Do not use secrets, private data, or unsupported claims.
- Ask only blocking questions. If not blocking, make a safe assumption and label it.

Process:
1. Restate the goal in simple words.
2. List assumptions.
3. Create the output.
4. Check for missing steps, risks, and safety issues.

Output format:
[EXACT FORMAT: table/checklist/markdown/code/SOP/etc.]

Quality check:
Before final answer, verify:
- Is this beginner-friendly?
- Is it specific and usable?
- Are unsafe or paid options flagged?
- Are current claims sourced or marked unverified?
```

---

## 4. The 8 Core Prompt Patterns

Use these patterns like LEGO blocks. You can combine them.

| # | Pattern | What it does | Best for |
|---:|---|---|---|
| 1 | **Role** | Gives AI a useful job identity. | Coaching, review, teaching, planning |
| 2 | **Context** | Gives background so AI does not guess. | Personal projects, business plans, debugging |
| 3 | **Constraint** | Sets limits and safety rules. | $0 budget, privacy, simple English |
| 4 | **Example** | Shows what good looks like. | Style, format, naming, tone |
| 5 | **Step-by-step** | Forces a process. | Teaching, setup, debugging, SOPs |
| 6 | **Output Format** | Controls the shape of the answer. | Tables, checklists, JSON, Markdown |
| 7 | **Iteration** | Improves an output in rounds. | Draft → feedback → final |
| 8 | **Decomposition** | Breaks a big task into smaller tasks. | Apps, research, complex documents |

---

## 5. Pattern 1 — Role Pattern

### What it is

You tell AI what expert role to use.

### Why it works

A role gives AI a lens. It helps AI choose the right language, checks, and output style.

| Weak | Better |
|---|---|
| “Help me with my app.” | “Act as a patient product manager and beginner teacher. Help me plan my app.” |
| “Check my code.” | “Act as a careful senior developer. Review this code for bugs, security, and beginner clarity.” |

### Copy-paste template

```text
Act as a [ROLE] who helps a beginner.
Your job is to [TASK].
Use simple English and explain technical words.
```

### Beginner example

```text
Act as a patient Microsoft Excel coach.
Help me clean this messy sales table.
Use simple English and explain each formula.
```

### Warning

Do not stack 20 roles unless needed. Too many roles can create noisy answers.

---

## 6. Pattern 2 — Context Pattern

### What it is

You tell AI the situation.

### Why it works

AI cannot see your life, budget, files, skills, or goal unless you say them.

| Weak | Better |
|---|---|
| “Make a business plan.” | “I am a beginner solopreneur in Manila with $0 budget. I want to validate a small reporting tool before building.” |
| “Make this better.” | “This is for a LinkedIn portfolio post. I want it honest, simple, and not exaggerated.” |

### Copy-paste template

```text
Context:
- Who I am: [BEGINNER / ROLE / LOCATION]
- My goal: [GOAL]
- My tools: [TOOLS]
- My constraints: [BUDGET / TIME / DATA LIMITS]
- My audience: [WHO WILL READ OR USE THIS]
```

### Beginner example

```text
Context:
- I am a beginner, ESL speaker, and visual learner.
- I have ChatGPT Enterprise, M365 Copilot, VS Code, and Cline.
- I have $0 additional budget.
- I want a simple prototype first, not a full SaaS.
```

---

## 7. Pattern 3 — Constraint Pattern

### What it is

You tell AI what it must do and must not do.

### Why it works

Constraints prevent overbuilding, unsafe advice, paid-tool drift, and vague answers.

| Constraint type | Example |
|---|---|
| Budget | “Use free or already-owned tools only.” |
| Skill | “Assume I am not a professional developer.” |
| Safety | “Do not ask me to paste API keys.” |
| Scope | “Only build the MVP, not advanced features.” |
| Tone | “Use simple English and tables.” |
| Evidence | “Mark unverified claims with ⚠️.” |

### Copy-paste template

```text
Constraints:
- Use [FREE / LOCAL-FIRST / MICROSOFT-FIRST] tools where possible.
- Keep the answer beginner-friendly.
- Do not recommend paid tools unless clearly marked: ⚠️ PAID.
- Do not include secrets or real private data.
- Do not add advanced features unless required.
- Mark assumptions as [ASSUMPTION].
```

### Beginner example

```text
Constraints:
- I only want a prototype.
- No payments, no admin panel, no complex automation.
- Use fake data.
- Output as a checklist I can follow today.
```

---

## 8. Pattern 4 — Example Pattern

### What it is

You show AI an example of what you want.

### Why it works

Examples reduce guessing. One short example can be more useful than a long explanation.

| Weak | Better |
|---|---|
| “Write in my style.” | “Use this style: short sentences, clear headings, practical tone, no hype.” |
| “Make a project name.” | “Example names I like: ClientPulse, ReportFlow, InsightPad.” |

### Copy-paste template

```text
Here is an example of the style/format I want:
[PASTE SHORT EXAMPLE]

Please follow the same structure, but create a new version for:
[MY TOPIC]
```

### Beginner example

```text
Example output style:
Step 1: Do this
Why: Simple reason
Check: What I should see

Now write the setup steps for my app using this exact format.
```

### Safety note

Use examples you own or have permission to reuse. Do not ask AI to copy protected brand voice, private documents, or proprietary templates exactly.

---

## 9. Pattern 5 — Step-by-Step Pattern

### What it is

You ask AI to explain or produce work in steps.

### Why it works

Beginners need a path, not a pile of information.

| Weak | Better |
|---|---|
| “Teach me Git.” | “Teach me Git in 7 beginner steps. For each step, say command, what it does, what I should see.” |
| “Debug this.” | “First identify likely cause. Then give one safe fix. Then tell me how to check.” |

### Copy-paste template

```text
Explain this step by step.
For each step, include:
1. What to do
2. Why it matters
3. What I should see
4. What can go wrong
5. How to check it worked
```

### Beginner example

```text
Teach me how to create a GitHub repo step by step.
Use this format:
Step | Action | Why | What I should see | Common mistake
```

---

## 10. Pattern 6 — Output Format Pattern

### What it is

You define the exact shape of the answer.

### Why it works

Output format prevents long messy text.

| Need | Good output format |
|---|---|
| Compare options | Table |
| Follow a process | Checklist |
| Save in repo | Markdown file |
| Analyze risk | Risk register |
| Build app | File tree + steps + test plan |
| Give exact instructions | Numbered steps |
| Create reusable prompt | Code block |

### Copy-paste template

```text
Output format:
1. Short summary
2. Table: [COLUMN 1] | [COLUMN 2] | [COLUMN 3]
3. Checklist
4. Copy-paste prompt
5. Final recommendation
```

### Beginner example

```text
Output as a table with these columns:
Task | Tool | Time | Difficulty 1-5 | What I should check
```

---

## 11. Pattern 7 — Iteration Pattern

### What it is

You improve the answer over multiple rounds.

### Why it works

The first output is usually a draft. The best results come from feedback.

### Simple loop

```text
Draft → Review → Fix one thing → Test → Save version
```

| Iteration type | Prompt |
|---|---|
| Make clearer | “Rewrite this for an ESL beginner.” |
| Make shorter | “Reduce this by 40% without losing steps.” |
| Make safer | “Review this for privacy, secrets, and risky automation.” |
| Make more practical | “Turn this into a checklist I can follow today.” |
| Make more specific | “Replace vague advice with exact actions and examples.” |

### Copy-paste template

```text
Here is version 1:
[PASTE OUTPUT]

What I like:
[LIST]

What is wrong or missing:
[LIST]

Please create version 2.
Rules:
- Keep the good parts.
- Fix only the issues I listed.
- Do not add new complexity.
- Show a short changelog of what changed.
```

### Beginner example

```text
This answer is too technical. Rewrite it for me as a beginner.
Use shorter sentences, define jargon, and add one small example per section.
```

---

## 12. Pattern 8 — Decomposition Pattern

### What it is

You break a big job into smaller jobs.

### Why it works

Big prompts fail because they ask AI to do too much at once.

| Big task | Better small tasks |
|---|---|
| “Build my whole app.” | 1. Validate idea → 2. PRD → 3. UX flow → 4. Data model → 5. Prototype → 6. Test |
| “Make my full business.” | 1. Customer → 2. Pain → 3. Offer → 4. Validation → 5. Pricing test |
| “Fix my codebase.” | 1. Diagnose → 2. List files → 3. Patch one bug → 4. Test → 5. Commit |

### Copy-paste template

```text
Break this big task into small tasks.
For each task, include:
- Goal
- Input needed
- Output expected
- Best tool
- Risk
- Done checklist

Big task:
[TASK]
```

### Beginner example

```text
Break my app idea into a 10-step build plan.
Do not write code yet.
Separate planning, prototype, testing, and deployment.
```

---

## 13. Common Prompt Mistakes and Fixes

| Mistake | Why it fails | Bad prompt | Better prompt |
|---|---|---|---|
| **Too vague** | AI has to guess. | “Help me.” | “Create a 5-step plan to validate my reporting app idea with $0 budget.” |
| **Too long** | Important rules get buried. | Huge wall of text with no structure. | Use headings: Goal, Context, Constraints, Output. |
| **No examples** | AI may choose the wrong style. | “Make it professional.” | “Use this style: short, direct, table-first, beginner-friendly.” |
| **No constraints** | AI may overbuild or recommend paid tools. | “Build me a SaaS.” | “Prototype only. No payments. Use fake data and free tools.” |
| **Conflicting instructions** | AI cannot satisfy both. | “Be very short and fully detailed.” | “Give a short summary, then a detailed checklist.” |
| **No output format** | Answer becomes messy. | “Explain this.” | “Output as: summary, table, checklist, copy-paste prompt.” |
| **Too many goals** | Output becomes shallow. | “Validate, build, deploy, monetize, market everything.” | “First, create a validation plan only.” |
| **No quality check** | Errors slip through. | “Make a plan.” | “Make a plan and check for missing steps, data risks, and cost risks.” |
| **Pasting secrets** | High security risk. | “Here is my API key...” | “The key is stored as [ENV_VAR_NAME]. Do not include real secrets.” |

---

## 14. How to Iterate on Prompts

Use this **Prompt Improvement Loop**.

```text
1. Write prompt v1
2. Run it
3. Score output
4. Identify one problem
5. Revise prompt
6. Run v2
7. Save the better version
```

### Prompt scorecard

Score each item from 1 to 5.

| Score item | Question |
|---|---|
| **Clarity** | Did AI understand the job? |
| **Context** | Did I give enough background? |
| **Constraints** | Did AI follow limits? |
| **Output format** | Did the answer come in the shape I wanted? |
| **Safety** | Did it avoid secrets, risky actions, and fake claims? |
| **Usefulness** | Can I act on it today? |

### Copy-paste prompt: Improve my prompt

```text
Act as a prompt reviewer and beginner teacher.

Review this prompt:
[PASTE PROMPT]

What I want the prompt to achieve:
[GOAL]

Please output:
1. Score /10
2. What is unclear
3. What context is missing
4. What constraints are missing
5. What output format would work better
6. Rebuilt copy-paste prompt
7. One simple explanation of why the new prompt is better

Use simple English.
```

### Copy-paste prompt: Improve the output

```text
Here is the AI output:
[PASTE OUTPUT]

My issue with it:
[TOO LONG / TOO TECHNICAL / NOT SPECIFIC / UNSAFE / WRONG FORMAT]

Please revise it.
Rules:
- Keep the useful parts.
- Fix only the issue I named.
- Use simple English.
- Add a short quality check at the end.
```

---

## 15. How to Save and Version Prompts

Prompts are reusable assets. Treat them like small tools.

### Recommended folder structure

```text
ungasis-prompts/
  00_prompt_index.md
  discovery/
    idea-validation_v1.0.md
    competitor-scan_v1.0.md
  planning/
    prd-lite_v1.0.md
    ux-flow_v1.0.md
  building/
    cline-safe-task_v1.0.md
    debugging_v1.0.md
  safety/
    source-verification_v1.0.md
    secret-check_v1.0.md
  handoff/
    session-handoff_v1.0.md
```

### Prompt file template

```markdown
# Prompt: [NAME]

Version: v1.0
Date: [YYYY-MM-DD]
Owner: Mel John Dimat
Best tool: [ChatGPT / M365 Copilot / Cline / Other]
Max data level: [0-4]
Use when: [WHEN TO USE]
Do not use when: [WHEN TO AVOID]

## Copy-paste prompt

```text
[THE PROMPT]
```

## Inputs to replace

- [PLACEHOLDER 1]
- [PLACEHOLDER 2]

## Expected output

[WHAT GOOD OUTPUT LOOKS LIKE]

## Quality check

- [ ] Clear job
- [ ] Context included
- [ ] Constraints included
- [ ] Output format included
- [ ] Safety check included

## Changelog

| Version | Date | Change | Why |
|---|---|---|---|
| v1.0 | [DATE] | First version | Initial prompt |
```

### Version naming rule

| Version | Meaning |
|---|---|
| **v0.1** | rough draft |
| **v1.0** | first reusable version |
| **v1.1** | small improvement |
| **v2.0** | major rewrite |

### Beginner rule

Do not keep 50 prompt copies with random names like `final_final_REAL.md`. Use clear version numbers.

---

## 16. Prompt Versioning Changelog Template

Use this after improving a prompt.

```markdown
## Prompt Changelog Entry

Prompt name:
Old version:
New version:
Date:
Reason for change:
What changed:
What stayed the same:
Test used:
Result:
Next improvement:
```

### Example

```markdown
## Prompt Changelog Entry

Prompt name: Cline Safe Task
Old version: v1.0
New version: v1.1
Date: 2026-06-01
Reason for change: Cline was editing too many files.
What changed: Added “modify only these files” and “show file plan first.”
What stayed the same: Simple English and test steps.
Test used: Ask Cline to add one button.
Result: Better. Only one file changed.
Next improvement: Add rollback command.
```

---

## 17. Platform-Specific Prompt Tips

### 17.1 ChatGPT / ChatGPT Enterprise

Use ChatGPT when you need planning, research, writing, analysis, app architecture, source checking, prompt building, or long-form thinking.

| Tip | What to do | Why |
|---|---|---|
| Use clear sections | Use `Goal`, `Context`, `Constraints`, `Output format`. | Easier for AI to follow. |
| Use project context carefully | Put durable project rules in Project Instructions or project files. | Reduces repeated setup. |
| Use examples | Add one short example of the output you want. | Reduces style mismatch. |
| Ask for checks | “Check assumptions, risks, and missing steps.” | Reduces hallucination and gaps. |
| Separate stable vs current facts | Use web/source verification for current tool/pricing/legal claims. | Avoids outdated answers. |
| Use data levels | Do not paste Level 4 data. Level 3 only in approved company/workspace context. | Protects sensitive information. |

#### ChatGPT copy-paste project prompt

```text
Act as my UNGASIS project assistant for [PROJECT NAME].

Use this operating style:
- Simple English.
- Beginner-friendly steps.
- Tables and checklists where useful.
- $0/free-first tools unless clearly marked otherwise.
- Ask only blocking questions.
- Label assumptions.
- Mark unverified current claims with ⚠️.
- Do not ask for or expose secrets.

Project context:
[PASTE PRODUCT NORTH STAR, CURRENT STAGE, TOOLS, DATA LEVEL, NEXT GOAL]

Current task:
[TASK]

Output format:
[FORMAT]

Before finalizing, check:
- Does this match my stage?
- Did you avoid overbuilding?
- Are safety risks flagged?
- Is the next action clear?
```

### 17.2 Microsoft 365 Copilot

Use M365 Copilot when the work lives inside Microsoft 365: Word, Excel, PowerPoint, Outlook, Teams, SharePoint, OneDrive, Loop, Planner, Power Automate, Power Apps, or Power BI.

| Tip | What to do | Why |
|---|---|---|
| Mention the app | “In Excel...” or “For Outlook...” | Copilot behavior depends on app context. |
| Point to files carefully | Reference the file, page, meeting, or email thread you are allowed to use. | Reduces guessing. |
| Ask for business output | “Create a summary, action list, table, draft email, slide outline.” | Fits M365 workflows. |
| Respect tenant rules ⚙️ | Feature access can depend on license, admin settings, rollout, and permissions. | Avoids assuming unavailable features. |
| Keep company data inside approved tenant | Do not move Level 3 data into random external tools. | Protects company data. |
| Use Prompt Coach when available ⚙️ | Ask Copilot to analyze and improve your prompt. | Builds better prompt habits. |

#### M365 Copilot copy-paste prompt

```text
I am working in [APP: Word / Excel / PowerPoint / Outlook / Teams / SharePoint].

Goal:
[WHAT I NEED]

Use these sources only:
[FILE / MEETING / EMAIL THREAD / TABLE / DOCUMENT]

Context:
[WHO THIS IS FOR, WHY IT MATTERS, DEADLINE]

Output format:
[SUMMARY / TABLE / EMAIL DRAFT / SLIDE OUTLINE / ACTION LIST]

Rules:
- Keep it concise.
- Use simple English.
- Do not invent facts not found in the source.
- Mark missing information as “Needs confirmation.”
- Do not expose confidential details beyond the intended audience.
```

### 17.3 VS Code + Cline

Use Cline for AI-assisted code work. Treat Cline like a fast apprentice: useful, but it needs supervision.

| Tip | What to do | Why |
|---|---|---|
| Start in Plan mode | Ask Cline to inspect and propose before editing. | Prevents wild changes. |
| Give exact files | Mention relevant files or folders. | Less context waste. |
| Ask for smallest safe change | One task, one patch. | Easier to test and undo. |
| Require file plan first | “Before editing, list files you will modify.” | Gives you control. |
| Use checkpoints | Restore if the patch breaks the app. | Safer experimentation. |
| Avoid YOLO mode for serious work | Do not auto-approve risky edits/commands. | Protects files and data. |
| Never include secrets | Do not paste `.env.local` values or private keys. | Prevents leaks. |

#### Cline Plan Mode prompt

```text
PLAN MODE ONLY. Do not edit files yet.

Project:
[APP NAME]

Goal:
[ONE SMALL CHANGE]

Relevant files/folders:
[LIST FILES OR USE @MENTIONS]

Please:
1. Inspect the relevant files.
2. Explain the current behavior in simple English.
3. List the files you plan to modify.
4. Propose the smallest safe change.
5. List exact test steps.
6. Identify rollback plan.

Rules:
- Do not touch secrets or .env files.
- Do not rewrite unrelated files.
- Ask before making changes.
```

#### Cline Act Mode prompt

```text
ACT MODE. Implement only the approved plan below.

Approved plan:
[PASTE PLAN]

Rules:
- Modify only these files: [FILES]
- Make the smallest safe change.
- Do not touch secrets, .env files, credentials, or unrelated files.
- After editing, summarize changed files.
- Give exact test commands and manual test steps.
- Include rollback advice.
```

#### Cline debugging prompt

```text
Act as a careful senior developer and patient debugger.

Expected behavior:
[WHAT SHOULD HAPPEN]

Actual behavior:
[WHAT HAPPENS]

Error message:
[PASTE ERROR, BUT NO SECRETS]

Recent changes:
[WHAT CHANGED]

Relevant files:
[FILES]

Please:
1. Identify the most likely cause.
2. Explain it in simple English.
3. Propose one safe fix.
4. Show files to modify before editing.
5. Give exact test steps.
6. Do not rewrite unrelated files.
```

---

## 18. Prompt Economics: Better Results With Fewer Tokens 💸

A **token** is a small piece of text the AI reads or writes. Long prompts and long outputs use more context. In API tools, token use can also affect cost. In ChatGPT-style apps, long context can still slow work and make important instructions easier to miss.

### The goal

Use **enough detail to be clear**, but not so much that the important instructions disappear.

| Wasteful habit | Better habit |
|---|---|
| Pasting entire documents without saying what matters | Say which sections matter and what decision you need. |
| Repeating the same context every message | Save stable context in a Project, prompt file, or handoff note. |
| Asking for a huge answer when you need one step | Ask for the next useful step only. |
| Using fancy role stacking | Use one clear role. |
| Asking for code, tests, docs, deployment, and marketing in one prompt | Break into phases. |
| Letting AI output long essays | Request tables, checklists, and concise summaries. |

### Token-efficient prompt pattern

```text
Goal: [ONE TASK]
Context: [ONLY WHAT CHANGES THE ANSWER]
Inputs: [RELEVANT DATA ONLY]
Constraints: [TOP 3-6 RULES]
Output: [EXACT FORMAT]
Check: [WHAT TO VERIFY]
```

### Example: Too much vs better

Too much:

```text
Here is my entire project history, all my ideas, every tool I have, and many notes.
Please tell me what to do.
```

Better:

```text
Goal: Choose my next action for this prototype.
Context: I validated the pain with 8 people. 5 said they would test.
Current blocker: I do not know whether to build in no-code or VS Code.
Constraints: $0 budget, beginner, use fake data only.
Output: Decision table + recommended next 3 actions.
```

---

## 19. Prompt Quality Checklist ✅

Before running a prompt, check:

| Check | Question |
|---|---|
| Clear job | Did I say exactly what I want? |
| Context | Did I give only relevant background? |
| Constraints | Did I include budget, safety, stage, and style rules? |
| Output format | Did I say table, checklist, code, Markdown, etc.? |
| Data safety | Did I remove secrets and private data? |
| Current facts | Did I ask for official sources if facts may be current? |
| Human approval | Did I require approval for send/delete/pay/publish/update actions? |
| Beginner fit | Will I understand and act on the answer? |

### Fast self-check prompt

```text
Before answering, check whether my prompt has:
1. Clear job
2. Enough context
3. Clear constraints
4. Output format
5. Safety rules

If something important is missing, make a safe assumption and label it.
Ask only if the missing info blocks the task.
```

---

## 20. Prompt Debugging: When AI Gives a Bad Answer

| Bad output symptom | Likely prompt problem | Fix |
|---|---|---|
| Too generic | Not enough context | Add user, goal, stage, tools, constraints. |
| Too complex | No stage/rigor limit | Say “personal prototype only” or “do not overbuild.” |
| Too long | No output length/format | Ask for table/checklist and max sections. |
| Wrong tool | Tool context missing | Say available tools and $0 budget. |
| Unsafe suggestion | Safety rule missing | Add data level and approval gates. |
| Fake facts | Source requirement missing | Ask for official sources or mark unverified. |
| Code changes too much | Scope too broad | Ask for smallest safe patch and files to modify. |

### Copy-paste prompt: Fix the bad answer

```text
The previous answer was not useful because:
[WHY]

Please redo it with these rules:
- Focus only on [SPECIFIC GOAL].
- Keep it beginner-friendly.
- Use this output format: [FORMAT].
- Do not add unrelated advice.
- Mark assumptions.
- Add one quality check at the end.
```

---

## 21. Source Verification Prompt

Use this when the answer includes pricing, legal/tax/privacy, software behavior, tool limits, current features, or statistics.

```text
Act as a source-first research checker.

Claims to verify:
[PASTE CLAIMS]

Rules:
- Use official sources first.
- Do not invent citations.
- If a claim cannot be verified, mark it: ⚠️ Unverified.
- Separate facts, assumptions, and uncertainty.
- Include date accessed.

Output format:
| Claim | Source | Verified? | Confidence | Notes | Action |
```

---

## 22. Human Approval Prompt for Risky AI Actions ✋

Use before any automation or AI action that sends, deletes, updates, publishes, charges, refunds, changes permissions, or affects users.

```text
Before doing this action, create an approval summary.

Action:
[WHAT WILL HAPPEN]

Output format:
| Item | Answer |
|---|---|
| Who/what is affected? | |
| What data is involved? | |
| Can it be undone? | |
| Risk level | |
| What could go wrong? | |
| Rollback plan | |
| Approval needed from | |

Do not perform the action. Only prepare the approval summary.
```

---

## 23. Mini Prompt Library for Daily Use

### A. Explain like a beginner

```text
Explain [TOPIC] to me as a beginner.
Use:
1. Simple meaning
2. Everyday analogy
3. Tiny example
4. Common mistake
5. One practice task
```

### B. Turn notes into an SOP

```text
Turn these messy notes into a beginner-friendly SOP.

Notes:
[PASTE NOTES]

Output:
- Purpose
- When to use
- Steps
- Tools
- Output
- Safety warning
- Done checklist
- Max data level
```

### C. Turn an idea into a project brief

```text
Turn this idea into a project brief.

Idea:
[IDEA]

Output:
1. Product North Star
2. Target user
3. Pain solved
4. MVP scope: max 3 features
5. NOT-building list
6. Data level
7. Best first tool
8. Next 3 actions
```

### D. Ask for a beginner checklist

```text
Create a checklist for [TASK].
For each item, include:
- What to do
- Why it matters
- What I should see
- Common mistake

Use simple English.
```

### E. Ask for a safe code task

```text
Act as a careful senior developer.

Task:
[ONE SMALL CHANGE]

Rules:
- Make the smallest safe change.
- Do not touch secrets.
- Do not rewrite unrelated files.
- Show files to modify first.
- Give test steps and rollback advice.
```

### F. Create a session handoff

```text
Create a compact handoff for my next AI session.

Include:
1. Project name
2. Current stage
3. Goal
4. Decisions made
5. Files created/changed
6. Known issues
7. Next 3 actions
8. Safety notes
9. Copy-paste prompt to continue
```

---

## 24. Beginner Practice: 5-Minute Prompt Workout

Use this once a week.

| Minute | Task |
|---:|---|
| 1 | Pick one messy prompt you used. |
| 2 | Add role, goal, and context. |
| 3 | Add constraints and output format. |
| 4 | Add one example or quality check. |
| 5 | Save it as `prompt-name_v1.1.md`. |

### Practice prompt

```text
Review my old prompt and improve it for beginner use.

Old prompt:
[PASTE]

Goal:
[GOAL]

Rules:
- Use the UNGASIS Good Prompt Formula.
- Keep it simple.
- Add output format.
- Add safety check.
- Show v1 and v2 differences.
```

---

## 25. When to Use Which Prompt Style

| Situation | Best prompt style | Example |
|---|---|---|
| I am exploring an idea | Discovery prompt | “Help me validate this problem.” |
| I am planning | Structured planning prompt | “Create a PRD-lite.” |
| I am learning | Beginner explanation prompt | “Explain this with analogy and example.” |
| I am building with Cline | Safe task prompt | “Plan only. Do not edit files yet.” |
| I am debugging | Expected/actual/error prompt | “Here is what I expected and what happened.” |
| I need current facts | Source verification prompt | “Use official sources first.” |
| I need repeatable process | SOP prompt | “Turn this into a checklist.” |
| I am ending a session | Handoff prompt | “Summarize decisions and next 3 actions.” |

---

## 26. Red Flags: Stop and Rewrite the Prompt

Stop if your prompt contains:

- “Make everything”
- “Build the full SaaS now”
- “Use any tool you want”
- “Here is my API key...”
- “Just do it automatically” for sending/deleting/paying/publishing
- “Make it perfect” with no definition of perfect
- “Be short and explain everything in detail”
- “Use the latest pricing” without asking for current sources
- Ten unrelated tasks in one message

### Recovery prompt

```text
My prompt is too big. Break it into smaller prompts.

Goal:
[GOAL]

Please output:
1. Prompt 1: discovery
2. Prompt 2: planning
3. Prompt 3: build
4. Prompt 4: review
5. Prompt 5: handoff

For each prompt, include when to use it and max safe data level.
```

---

## 27. Prompt Engineering Rules for Solopreneur App Building

| Stage | Prompt goal | Do not ask for yet |
|---|---|---|
| Idea | Find user and pain | Code, payments, scaling |
| Validation | Survey, interview, evidence | Full app build |
| Prototype | Clickable demo with fake data | Real secrets or customer data |
| MVP | One core workflow | Admin panel, complex automation |
| Private beta | Feedback and bugs | Public marketing blitz |
| Public MVP | Launch readiness and monitoring | High-risk claims or unreviewed legal/tax decisions |
| Monetization test | Offer, payment flow, support | Subscription complexity before demand |
| Commercial | QA, privacy, security, support, legal/tax review | Casual “ship and hope” behavior |

### Best first prompt for any app idea

```text
Act as a startup product strategist and beginner teacher.

My app idea:
[IDEA]

Target user:
[WHO]

Current workaround:
[HOW THEY SOLVE IT TODAY]

Help me validate before building.

Output:
1. Product North Star
2. Pain x Frequency x Willingness-to-Pay score
3. Top 5 assumptions that may be wrong
4. 10 customer interview questions
5. 7 survey questions
6. Pass/fail validation threshold
7. MVP features: exactly 3
8. NOT-building list: at least 5 items
9. Best next action today

Use simple English. Do not encourage me to build before proving pain.
```

---

## 28. Beginner Cheat Sheet

```text
When in doubt, ask AI this:

Act as a beginner-friendly coach.
My goal is [GOAL].
My context is [CONTEXT].
My constraints are [CONSTRAINTS].
Please give me [OUTPUT FORMAT].
Use simple English.
Ask only blocking questions.
Before finalizing, check for safety, missing steps, and overbuilding.
```

### Best default output formats

| Need | Ask for this |
|---|---|
| Decide | Decision table |
| Learn | Simple lesson + example |
| Build | Step checklist |
| Fix | Diagnosis + one safe fix |
| Save | Markdown file |
| Compare | Table with recommendation |
| Research | Claim/source/confidence table |

---

## 29. Source Ledger

| Claim / Topic | Source name | Source link | Date accessed | Confidence | Notes / Limitations |
|---|---|---|---|---|---|
| E6 must cover good prompts, 8 patterns, common mistakes, iteration, versioning, platform tips, and prompt economics. | AI Builder's Master Workflow Prompt v4.0, Section 27 | Uploaded source file | 2026-06-01 | 🟢 High | Direct source requirement for this module. |
| Good prompt formula uses clear job, background/context, rules, output shape, and quality check. | UNGASIS Framework Kernel, Good Prompt Formula | Uploaded UNGASIS kernel file | 2026-06-01 | 🟢 High | Adapted into beginner language. |
| Beginner/ESL/$0 context needs fewer tools, simple English, examples, checklists, and free-first guidance. | Unified Beginner Solopreneur App Building Workflow Playbook v3 | Uploaded source file | 2026-06-01 | 🟢 High | Used to calibrate style and examples. |
| Data levels and no-secret rule: never paste API keys/tokens/passwords/connection strings into AI chats, repos, screenshots, or frontend code. | Unified Beginner Solopreneur App Building Workflow Playbook v3 | Uploaded source file | 2026-06-01 | 🟢 High | Core safety rule. |
| OpenAI prompt guidance supports structured instructions, examples, context, and task decomposition for agentic/coding work. | OpenAI Developer Docs — Prompt Engineering / Prompting | https://developers.openai.com/api/docs/guides/prompt-engineering and https://developers.openai.com/api/docs/guides/prompting | 2026-06-01 | 🟢 High | Official OpenAI documentation. Exact product UI may change. |
| OpenAI Prompt Dashboard supports creating, saving, versioning, sharing, using variables, and rollback/history for prompts. | OpenAI Developer Docs — Prompting | https://developers.openai.com/api/docs/guides/prompting | 2026-06-01 | 🟢 High | API/product-builder oriented, but useful for prompt versioning principles. |
| Microsoft offers task-based and app-specific Copilot prompt examples. | Microsoft 365 Copilot Prompts | https://m365.cloud.microsoft/copilot-prompts | 2026-06-01 | 🟢 High | Official Microsoft Copilot prompt gallery. Availability can depend on account/tenant. ⚙️ |
| Microsoft’s Copilot learning guide includes prompt examples and a Prompt Coach-style practice prompt. | Microsoft 365 Copilot Daily Prompt Guide | https://www.microsoft.com/en-us/microsoft-365-copilot/learn-copilot-today | 2026-06-01 | 🟢 High | Official Microsoft learning resource. Availability may vary. ⚙️ |
| Cline is an AI coding agent that can read/write files, run commands, and requires approval for actions. | Cline Docs — Overview | https://docs.cline.bot/ | 2026-06-01 | 🟢 High | Official Cline documentation. |
| Cline Plan & Act separates planning from file/command execution. | Cline Docs — Plan and Act | https://docs.cline.bot/core-workflows/plan-and-act | 2026-06-01 | 🟢 High | Used for safe Cline prompt patterns. |
| Cline supports adding relevant context through file/folder references and terminal output. | Cline Docs — Adding Context | https://docs.cline.bot/core-workflows/working-with-files | 2026-06-01 | 🟢 High | Used for “right context, not more context.” |
| Cline Checkpoints support restore/rollback of changes. | Cline Docs — Checkpoints | https://docs.cline.bot/core-workflows/checkpoints | 2026-06-01 | 🟢 High | Used for rollback advice. |
| Cline Auto Approve / YOLO settings can bypass safety checks and should be used carefully. | Cline Docs — Auto Approve | https://docs.cline.bot/features/auto-approve | 2026-06-01 | 🟢 High | Used for YOLO warning. |
| Cline Memory Bank uses structured Markdown files to preserve project context across sessions. | Cline Docs — Memory Bank | https://docs.cline.bot/best-practices/memory-bank | 2026-06-01 | 🟢 High | Used for prompt/context continuity advice. |
| Current tool behavior, pricing, feature availability, and laws can change and should use current sources. | UNGASIS Guardrails / Source Freshness | Uploaded UNGASIS guardrail file | 2026-06-01 | 🟢 High | General operating rule. |

---

## 30. UNGASIS Trace

| Field | Selection |
|---|---|
| **Mode** | Execution / Artifact Build |
| **Rigor** | Learner → personal prototype, with public/commercial safety notes |
| **Domain** | Prompt engineering, AI workflow, solopreneur app building |
| **Dimensions** | Router, Rigor, Frameworks, Guardrails, Templates, Artifacts, Evaluation |
| **Lenses** | Prompt architect, beginner teacher, AI workflow coach, security-aware builder |
| **Intelligences** | Learning, Context, Constraint, Risk, Execution, Instruction Following |
| **Frameworks** | Good Prompt Formula, Decomposition, Iteration Loop, Source Quality, Rigor Dial |
| **Engines** | Prompt Architect, Student Teacher, Workflow Designer, QA/Security |
| **Tools/Files** | Uploaded v4.0 workflow prompt, beginner playbook, UNGASIS kernels, official OpenAI/Microsoft/Cline docs |
| **Guardrails** | No secrets, data levels, source freshness, human approval, no fake citations |
| **Template** | Standalone Markdown learning module |

---

## 31. QA Checklist

- [x] Starts with required module title.
- [x] Uses simple English, tables, checklists, analogies, and copy-paste prompts.
- [x] Covers what makes good prompts.
- [x] Covers all 8 required prompt patterns.
- [x] Covers common prompt mistakes.
- [x] Covers how to iterate prompts.
- [x] Covers how to save and version prompts.
- [x] Covers ChatGPT, M365 Copilot, and VS Code + Cline tips.
- [x] Covers prompt economics.
- [x] Includes data safety levels and secret warnings.
- [x] Includes source ledger.
- [x] Marks tenant/admin/workspace dependencies with ⚙️ where relevant.
- [x] Avoids paid-tool dependency.
- [x] Avoids real secrets, private data, and fake citations.

---

## Version Footer

**Version:** 1.0  
**Date:** 2026-06-01  
**File:** `ungasis-prompt-engineering.md`  
**Status:** Ready to add to UNGASIS repo  
**Created for:** Mel John Dimat / UNGASIS OS  
**Next module:** E7 — Beginner Glossary
