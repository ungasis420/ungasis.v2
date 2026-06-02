# UNGASIS Content Module: AI Operating Model

> **Purpose:** This module tells Mel John Dimat how to use multiple AI tools without chaos. It defines what AI can do, what Mel must review, what Mel must decide, and what must never be automated.
>
> **Beginner analogy:** Treat AI like a kitchen team. AI can chop ingredients, suggest recipes, and clean up drafts. You are still the restaurant owner. You approve the menu, taste the food, handle money, and decide what gets served.

---

## 0. Quick Start

Use this operating model when you are building, researching, writing, coding, analyzing data, or preparing portfolio/monetization work with AI.

### The simple rule

```text
AI can prepare.
AI can draft.
AI can check.
I decide.
I approve risky actions.
Professionals review high-stakes matters.
```

### My default AI chain

| Step | Role | Best tool | Output |
|---|---|---|---|
| 1 | Planner | ChatGPT Enterprise | Clear plan, scope, risks, next actions |
| 2 | Builder | VS Code + Cline, GitHub Copilot, M365 Copilot, or ChatGPT | Draft, code, doc, workflow, dashboard, or checklist |
| 3 | Reviewer | ChatGPT Enterprise, Claude, GitHub Copilot, or local Ollama | Mistakes, risks, tests, simpler fix |
| 4 | Owner | Mel | Final decision, approval, publish, charge, delete, send |
| 5 | Log keeper | PROJECT_STATE.md, CHANGELOG.md, OneNote, Notion, Excel, or SharePoint | What changed, why, and what to do next |

### My current default stage

| Item | Recommendation |
|---|---|
| Rigor stage | Personal / prototype unless public launch or monetization is stated |
| Budget posture | $0 upfront |
| Data posture | Use Level 0 demo data by default |
| Automation posture | Manual first, automate later |
| Coding posture | Small edits only, test before committing |
| Monetization posture | Validate willingness to pay before payments |

---

## 1. Non-Negotiable Rules

These rules override speed, convenience, and AI suggestions.

| Rule | Simple meaning | Why it matters |
|---|---|---|
| **No secrets in prompts** | Do not paste API keys, passwords, tokens, connection strings, private certificates, service-role keys, or tenant secrets into AI chats. | AI tools can store context, logs, or history depending on settings. Secrets must stay in `.env`, secret managers, or approved admin tools. |
| **No secrets in frontend code** | Never place private keys in React/Vite/Next.js browser code. | Anything shipped to the browser can be seen by users. |
| **No risky automation without approval** | AI must not send, delete, update, publish, charge, refund, or change permissions without your approval. | These actions affect real people, money, records, or reputation. |
| **No fake citations** | If a fact is not verified, mark it as ⚠️ unverified. | Fake certainty is dangerous. |
| **No build-before-validation** | Do not code a big app before validating the problem with real people. | A beautiful app nobody wants is still a failed product. |
| **No professional replacement** | Legal, tax, accounting, medical, security, and finance decisions need qualified review. | AI can help prepare questions and checklists, not replace professionals. |
| **Small changes only** | For code, ask AI to change one small thing at a time. | Easier testing, safer rollback, fewer mystery bugs. |
| **Human owner stays accountable** | AI can recommend. Mel decides. | You own the consequences. |

---

## 2. Data Safety Levels

Use this table before choosing a tool.

| Level | Name | Example | Default AI rule |
|---:|---|---|---|
| 0 | Public demo data 🟢 | Fake customers, sample app tasks, dummy screenshots | Safe for normal AI chats, public repos, portfolio demos |
| 1 | Personal non-sensitive 🟡 | Learning notes, simple to-do list, non-private ideas | Usually okay in trusted tools; review before sharing |
| 2 | Private personal 🟠 | Private journal, personal finances, personal documents | Use only trusted/private tools; prefer local or approved workspaces |
| 3 | Company/internal 🔴 | Client data, internal reports, employee data, business metrics | Use only approved company/M365/enterprise tools and policies |
| 4 | Secrets/regulated ⛔ | API keys, passwords, tokens, PII, health/legal/financial regulated data | Do not paste into AI chats, public repos, screenshots, or frontend code |

### Tool data defaults

| Tool | Default max data level | Notes |
|---|---:|---|
| ChatGPT Enterprise | Level 2 by default; Level 3 only if workspace/admin policy allows | ⚙️ Workspace settings matter. Never Level 4 secrets. |
| M365 Copilot | Level 3 inside approved tenant if permissions allow | ⚙️ Tenant, license, region, sensitivity labels, and admin policy matter. Never paste secrets. |
| VS Code + Cline | Level 1-2 for personal projects; Level 3 only if company-approved | Cline can read/write files and run commands with approval. Keep `.env` protected. |
| GitHub Copilot | Level 1-2 for personal repos; Level 3 only if enterprise policy allows | Keep secrets out of code and prompts. Use private repos for serious work. |
| Ollama local models | Level 2 local by default; Level 3 only if approved and fully local | Local is safer for privacy, but output can still be wrong. Never feed secrets casually. |
| Claude / Claude Code | Level 1-2 by default; Level 3 only if policy allows | Cloud tool unless using approved enterprise setup. Never paste secrets. |
| Public AI app builders | Level 0 only by default | Use fake/demo data unless official data handling is approved. |

---

## 3. AI Capability Tiers

Use these tiers to decide how much control AI gets.

| Tier | Name | Meaning | Examples | Human action | Max data level |
|---|---|---|---|---|---:|
| 🟢 | **AI solo** | AI can do it alone because impact is low and easy to check. | Brainstorm names, format notes, create dummy data, rewrite simple text, summarize public info. | Quick scan only. | 0-1 |
| 🟡 | **AI drafts, I review** | AI makes first version, but you review before use. | PRD, SOP, README, checklist, UX flow, survey questions, launch post, presentation outline. | Read, edit, approve. | 0-2 |
| 🟠 | **AI assists, I drive** | You give detailed direction. AI helps with parts. | App architecture, database schema, debugging, code edits, analytics plan, automation design. | Guide, test, compare, decide. | 0-2, Level 3 if approved |
| 🔴 | **I decide** | AI can advise, but final call is yours. | Pricing, launch timing, pivot/kill decision, hiring, spending money, public claims, publishing. | Decide and own outcome. | Depends on approved context |
| ⛔ | **Professional needed** | AI can prepare questions, but a qualified expert should review. | Legal terms, tax obligations, accounting setup, medical claims, formal security review, regulated data. | Consult professional before action. | Depends on expert/approved tool |
| 🚫 | **Never automate** | Do not let AI do this without explicit human control. | Secret handling, bypassing limits, payment avoidance, deleting production data, sending mass messages, manipulating users, illegal actions. | Refuse or stop. | N/A |

---

## 4. Task Delegation Matrix

This is your “who should do what?” table.

| Task | Tier | Best primary AI | Backup AI | What Mel reviews |
|---|---|---|---|---|
| Brain dump an idea | 🟢 AI solo | ChatGPT Enterprise | Claude | Does it match the real problem? |
| Turn messy notes into a project brief | 🟡 Draft/review | ChatGPT Enterprise | M365 Copilot in Word/Loop | Accuracy, missing context, scope |
| Create validation survey questions | 🟡 Draft/review | ChatGPT Enterprise | Claude | Bias, clarity, length, simple English |
| Summarize public research | 🟡 Draft/review | ChatGPT Deep Research / Web Search | Claude / M365 Copilot | Sources, confidence, contradictions |
| Summarize internal M365 files | 🟡 Draft/review | M365 Copilot | ChatGPT only if allowed and sanitized | Permissions, sensitivity, source accuracy |
| Create PRD / product spec | 🟡 Draft/review | ChatGPT Enterprise | Claude | Scope, user pain, acceptance criteria |
| Design UX flow | 🟡 Draft/review | ChatGPT Enterprise | Claude / M365 Copilot | Number of screens, friction, accessibility |
| Create dummy data | 🟢 AI solo | ChatGPT Enterprise | Ollama | No real names, no sensitive info |
| Generate simple app code | 🟠 AI assists, I drive | Cline | GitHub Copilot / Claude Code | Files changed, test result, secrets |
| Autocomplete code while coding | 🟡 Draft/review | GitHub Copilot | Cline | Whether suggestion is correct/safe |
| Edit multiple files | 🟠 AI assists, I drive | Cline | Claude Code | Diff, tests, rollback, scope creep |
| Run terminal commands | 🟠 AI assists, I drive | Cline / Claude Code | Manual terminal | Command purpose, safety, reversibility |
| Debug blank page | 🟠 AI assists, I drive | ChatGPT + Cline | Claude | Error message, exact fix, test step |
| Code security review | 🟠 AI assists, I drive | ChatGPT Enterprise / Claude | GitHub Copilot review tools | Secrets, auth, input validation, RLS |
| Analyze spreadsheet/report | 🟡 Draft/review | M365 Copilot / Excel | ChatGPT Data Analysis if allowed | Data quality, formula logic, assumptions |
| Build Power Automate flow plan | 🟠 AI assists, I drive | M365 Copilot / ChatGPT | Claude | Trigger, actions, approvals, logs |
| Send emails or Teams messages | 🔴 I decide | M365 Copilot drafts | ChatGPT draft | Recipient, tone, content, timing |
| Delete/update production records | 🚫 Never automate without approval | None | None | Manual approval and backup first |
| Publish public demo | 🔴 I decide | ChatGPT launch checklist | Claude review | Privacy, secrets, README, screenshots |
| Add payment button | 🔴 I decide + expert review if needed | ChatGPT planning | Claude review | Legal/tax/privacy/support readiness |
| Tax/legal/privacy policy | ⛔ Professional needed | AI prepares questions | None | Qualified review required |
| Handle API keys | 🚫 Never automate casually | None | None | Use `.env`, secret manager, provider dashboard |

---

## 5. Multi-AI Coordination Protocol

### The 4-role system

| Role | Job | Primary tool | Why this tool | What not to do |
|---|---|---|---|---|
| **Planner AI** | Scope, strategy, architecture, risks, tasks | ChatGPT Enterprise | Best as command center for long project context, files, instructions, and reasoning | Do not let it directly edit files or publish output without review |
| **Builder AI** | Create code/docs/dashboards/workflows | VS Code + Cline, GitHub Copilot, M365 Copilot | Builder tools live close to the work: code editor, Office files, M365 data | Do not allow broad rewrites or risky commands without approval |
| **Reviewer AI** | Red-team output, check logic, find bugs, verify sources | ChatGPT Enterprise, Claude, GitHub Copilot, Ollama | Separate reviewer reduces blind spots | Do not ask the same model that built it to be the only reviewer for serious work |
| **Owner Me** | Final decision, approval, testing, publishing, money | Mel | Only human can judge context, risk, ethics, public reputation | Do not outsource final judgment |

### Beginner analogy

| Project role | Kitchen analogy |
|---|---|
| Planner AI | Writes the recipe and shopping list |
| Builder AI | Cooks the dish |
| Reviewer AI | Tastes and checks if food is safe |
| Owner Me | Decides what gets served and what the customer pays for |

---

## 6. Specific Tool Roles

| Tool | Main role | Best for | Weak for | Safety note |
|---|---|---|---|---|
| **ChatGPT Enterprise** | Command center / planner / reviewer | Project planning, prompts, PRDs, SOPs, data analysis, source review, decision tables | Direct codebase editing unless file/code workflow is set up | ⚙️ Project memory, file limits, tools, and sharing depend on workspace settings. |
| **M365 Copilot** | Microsoft work assistant | Word, Excel, PowerPoint, Outlook, Teams, SharePoint, internal docs, meeting summaries | Public web app code or non-Microsoft app building | ⚙️ Tenant permissions decide what it can access. It may reflect wrong permissions or stale files if sources are messy. |
| **VS Code + Cline** | Active code builder | Editing files, running commands, implementing features, debugging | Product strategy, legal/tax/privacy decisions | Requires approval. Never let it touch `.env` or secrets casually. |
| **GitHub Copilot** | Pair programmer | Inline code suggestions, quick snippets, tests, refactors, comments | Full product strategy and final security approval | Treat suggestions as drafts. Test everything. |
| **Ollama** | Local privacy/helper lane | Local brainstorming, code explanation, offline drafting, lower-risk private notes | Current web facts, official citations, guaranteed correctness | Local does not mean correct. Use for privacy and drafts, not final truth. |
| **Claude / Claude Code** | Strong reviewer / coding agent | Codebase reasoning, refactoring, bug analysis, second opinion | Tenant-specific M365 context unless connected/approved | Cloud unless configured otherwise. Do not paste secrets. |

### Simple routing rule

```text
Planning? Use ChatGPT Enterprise.
Microsoft work file? Use M365 Copilot.
Editing real code? Use Cline + GitHub Copilot.
Need second opinion? Use Claude or ChatGPT.
Need private local draft? Use Ollama.
Need final approval? Use Mel.
```

---

## 7. Keep One Source of Truth

Too many AI tools can create version confusion. Use one project control file.

### Recommended source of truth

| Project type | Best source of truth | Why |
|---|---|---|
| Simple learning project | `PROJECT_STATE.md` | Portable, simple, works with GitHub |
| Serious code project | GitHub repo + `PROJECT_STATE.md` + `CHANGELOG.md` | Clear history and rollback |
| M365 / reporting project | SharePoint folder + OneNote/Loop + Excel tracker | Fits Microsoft ecosystem |
| Personal OS / many projects | Excel/SharePoint project dashboard | Easy tracking and filtering |

### Minimum `PROJECT_STATE.md` template

```markdown
# Project State

Project name:
Current stage:
Goal:
Target user:
Problem solved:
Current stack:
Data level:
Last working version:
Live link:
GitHub repo:
Current task:
Next 3 actions:
Known bugs:
What NOT to build yet:
Decisions made:
Safety notes:
Last updated:
```

### Cross-tool rule

```text
Before using a new AI tool, paste only the latest safe PROJECT_STATE summary.
Never paste secrets.
Never paste sensitive/company data unless the tool is approved.
```

---

## 8. Standard Multi-AI Workflow

Use this loop for serious work.

```text
PLAN -> BUILD -> REVIEW -> DECIDE -> LOG
```

| Step | What happens | Tool | Output |
|---|---|---|---|
| PLAN | Define task, limits, data level, acceptance criteria | ChatGPT Enterprise | Small task plan |
| BUILD | Create the draft/code/doc/change | Cline, GitHub Copilot, M365 Copilot, ChatGPT | Draft or patch |
| REVIEW | Check for bugs, hallucinations, security, scope creep | ChatGPT, Claude, GitHub Copilot, Ollama | Review notes |
| DECIDE | Approve, reject, revise, test, publish, or stop | Mel | Decision |
| LOG | Record what changed and why | `CHANGELOG.md`, OneNote, Excel, Notion | Project memory |

### The “3-AI max” rule

Do not ask 5 different AIs for every decision. That creates noise.

Use:

```text
1 Planner + 1 Builder + 1 Reviewer
```

Only add another reviewer when:

- the work is public
- money is involved
- sensitive data is involved
- security is involved
- sources conflict
- the answer feels too confident

---

## 9. AI Operating Models by Work Type

### A. App building

| Phase | Planner | Builder | Reviewer | Owner approval |
|---|---|---|---|---|
| Idea validation | ChatGPT Enterprise | Tally / Forms / manual outreach | Claude / ChatGPT | Pick problem or kill idea |
| PRD / UX | ChatGPT Enterprise | ChatGPT / Figma / Excalidraw | Claude / ChatGPT | Approve scope |
| Prototype | ChatGPT Enterprise | Bolt/Lovable/v0 or Cline | ChatGPT / user testing | Share only fake data |
| Code build | ChatGPT Enterprise | Cline + GitHub Copilot | Claude / ChatGPT | Commit only after local test |
| Deployment | ChatGPT checklist | Manual + hosting docs | ChatGPT / Claude | Publish only after privacy/security check |
| Monetization | ChatGPT planning | Manual payment setup | Professional review if needed | Charge money only after validation |

### B. Research

| Step | Tool | Rule |
|---|---|---|
| Define research question | ChatGPT Enterprise | Ask what decision this supports |
| Gather current sources | Web Search / Deep Research | Prefer official sources |
| Summarize | ChatGPT Enterprise | Separate facts, assumptions, opinions |
| Cross-check | Claude or ChatGPT second pass | Check contradictions |
| Decide | Mel | Use evidence, not AI confidence |

### C. Coding

| Step | Tool | Rule |
|---|---|---|
| Plan | ChatGPT Enterprise | One small task, list files, test steps |
| Edit | Cline | Must ask before file edits and commands |
| Assist | GitHub Copilot | Use suggestions as drafts |
| Review | Claude / ChatGPT | Check changed files only |
| Test | Browser/terminal/manual | Run app and main flow |
| Save | GitHub | Commit only working version |

### D. Microsoft 365 work

| Task | Tool | Rule |
|---|---|---|
| Draft Word doc | M365 Copilot | Use approved internal docs only |
| Clean Excel data | Excel + Power Query + M365 Copilot | Keep original file copy |
| Dashboard plan | Power BI / Excel + ChatGPT planner | Define decision before visuals |
| Teams summary | M365 Copilot | Check names, dates, action owners |
| Email draft | Outlook Copilot | Human approves before sending |
| Flow plan | Power Automate + ChatGPT | Approval required before updates/sends/deletes |

---

## 10. AI Quality Control

### A. Hallucination spotting

A hallucination is when AI says something false or unsupported with confidence.

**Analogy:** AI sometimes acts like a student who did not study but still answers confidently.

| Red flag | What it looks like | What to do |
|---|---|---|
| Very specific number, no source | “This tool gives exactly 10,000 credits” | Ask for official source |
| Current feature claim | “This feature is available to all users” | Verify in official docs/admin panel |
| Fake-looking URL | Link looks real but fails | Open/check source |
| Legal/tax certainty | “You do not need to register” | Ask professional / official government source |
| Code confidence without tests | “This will work now” | Run tests locally |
| Too-good-to-be-true tool | “Free unlimited commercial hosting forever” | Check pricing/terms |
| Contradiction | Two AI answers disagree | Use source ledger and decide from evidence |

### Hallucination check prompt

```text
Act as a source-first fact checker.

Claim to verify:
[PASTE CLAIM]

Please check:
1. Is this a fact, assumption, opinion, or hypothesis?
2. What official source would verify it?
3. What part is unverified?
4. What could be outdated?
5. What is the safest wording?
6. What should I do before relying on it?

Use a table. Mark unverified items with ⚠️.
Do not invent citations.
```

---

### B. Code verification

AI-generated code is not trusted until tested.

| Check | What to do | Pass/fail |
|---|---|---|
| Scope check | Did AI change only requested files? | Pass if no unrelated rewrites |
| Secret check | Search for `key`, `token`, `secret`, `.env`, `service_role`, `password` | Pass if no real secret appears |
| Run check | Start app locally | Pass if no terminal error |
| Browser check | Open main pages | Pass if no blank screen |
| Main flow check | Do the core user action | Pass if expected result happens |
| Mobile check | Resize browser / use phone | Pass if readable and usable |
| Error check | Try empty/invalid input | Pass if user sees helpful message |
| Rollback check | Confirm latest commit exists before risky change | Pass if you can return to last version |

### Safe code task prompt for Cline / Claude Code

```text
Act as a careful senior developer.

Project:
[PROJECT NAME]

Current goal:
[ONE SMALL TASK]

Relevant files:
[LIST FILES OR SAY UNKNOWN]

Rules:
- Make the smallest safe change.
- Before editing, list the files you plan to modify.
- Do not rewrite unrelated files.
- Do not touch `.env`, secrets, keys, tokens, or connection strings.
- Do not delete files unless I explicitly approve.
- After editing, summarize changed files.
- Give exact test steps.
- Give rollback advice.

Task:
[DESCRIBE THE CHANGE]
```

---

### C. Cross-verification technique

Use this when the answer matters.

| Level | Technique | Use when |
|---|---|---|
| 1 | Ask AI to critique its own answer | Low-risk draft |
| 2 | Ask a second AI to review | Code, strategy, important docs |
| 3 | Check official docs/source | Tool capability, pricing, laws, current facts |
| 4 | Test in sandbox/local app | Code, automation, deployment |
| 5 | Professional review | Legal, tax, accounting, medical, security, regulated topics |

### Cross-check prompt

```text
Act as a skeptical reviewer.

Here is the output to review:
[PASTE OUTPUT]

My goal:
[GOAL]

Review it for:
1. Incorrect facts
2. Missing assumptions
3. Safety risks
4. Scope creep
5. Beginner confusion
6. Overbuilding
7. Better simpler option
8. What I must verify manually

Output:
- Top 5 issues
- Fixes ranked by priority
- What is safe to keep
- What needs source checking
- Final recommendation
```

---

## 11. Human Approval Gates

AI may prepare these actions, but Mel approves before execution.

| Action | Approval needed? | Why |
|---|---:|---|
| Send email/message | ✅ Yes | Affects real people |
| Post publicly | ✅ Yes | Affects reputation |
| Delete records/files | ✅ Yes | Can lose data |
| Update production database | ✅ Yes | Can break real user data |
| Change permissions | ✅ Yes | Security risk |
| Submit forms | ✅ Yes | Legal/business record risk |
| Charge/refund money | ✅ Yes | Financial/legal risk |
| Deploy public app | ✅ Yes | Public risk |
| Change DNS/domain/payment settings | ✅ Yes | Business continuity risk |
| Install package/script from unknown source | ✅ Yes | Security risk |
| Use Level 3 company data | ✅ Yes | Privacy/compliance risk |
| Use Level 4 secrets | 🚫 No AI prompt | Store securely, never paste |

### Approval template

```text
Action to approve:
Who/what is affected:
Data level involved:
Can this be undone? Yes/No
Risk level:
What AI recommends:
What I checked:
Backup/rollback plan:
Final decision: Approve / Reject / Revise
Approved by:
Date:
```

---

## 12. Copy-Paste Prompt Pack

### Prompt 1 — Planner AI

```text
Act as my AI project planner and beginner teacher.

Project:
[PROJECT NAME]

Current stage:
[IDEA / PERSONAL / PROTOTYPE / PRIVATE BETA / PUBLIC MVP / MONETIZATION TEST]

Goal for today:
[GOAL]

Constraints:
- I am a beginner and ESL speaker.
- I have $0 upfront budget.
- Use simple English.
- Use dummy data unless I say otherwise.
- Do not recommend paid tools unless marked ⚠️ PAID.
- Do not ask non-blocking questions.

Output:
1. One-sentence goal
2. Best next 3 actions
3. Tools to use
4. Data level
5. Risks
6. What not to do yet
7. Copy-paste prompt for the Builder AI
```

### Prompt 2 — Builder AI

```text
Act as the Builder AI.

Task:
[ONE SMALL TASK]

Planner instruction:
[PASTE PLAN]

Rules:
- Build only this task.
- Keep it beginner-friendly.
- Do not add extra features.
- Do not use real secrets or private data.
- Show what changed.
- Provide test steps.

Output format:
1. What I built
2. Files/content created or changed
3. How to test
4. Known limitations
5. What needs human review
```

### Prompt 3 — Reviewer AI

```text
Act as the Reviewer AI.

Review this work:
[PASTE OUTPUT OR DIFF]

Check for:
- Incorrect facts
- Missing steps
- Security problems
- Secrets exposure
- Scope creep
- Beginner confusion
- Broken logic
- What should be tested manually

Output:
1. Pass/fail verdict
2. Critical issues
3. Recommended fixes
4. Safe to proceed? Yes/No
5. Human approval needed? Yes/No
```

### Prompt 4 — Owner decision memo

```text
Act as my decision assistant.

Decision needed:
[DECISION]

Options:
[OPTIONS]

Evidence:
[EVIDENCE]

Constraints:
[CONSTRAINTS]

Help me decide, but do not decide for me.

Output:
1. Recommendation
2. Why
3. Risks
4. What would make this decision wrong
5. Safe next action
6. My final decision line: "I choose ____ because ____."
```

### Prompt 5 — Session handoff

```text
Create a compact handoff summary for my next AI session.

Include:
1. Project name
2. Current stage
3. Goal
4. Tools used
5. Decisions made
6. Files created/changed
7. Known bugs
8. Safety notes
9. Next 3 actions
10. Copy-paste prompt to continue

Keep it beginner-friendly and short.
```

### Prompt 6 — AI confusion recovery

```text
I am confused. Switch to Beginner Recovery Mode.

Context:
[WHAT I WAS TRYING TO DO]

What happened:
[WHAT WENT WRONG]

Please:
1. Stop adding new ideas.
2. Explain the likely issue in simple English.
3. Give one fix only.
4. Tell me exactly what to click/type/check.
5. Tell me what I should see if it worked.
6. Tell me what to send you if it is still broken.
```

---

## 13. Daily AI Usage Checklist

Use this before and after an AI work session.

### Before using AI

- [ ] I know the task goal.
- [ ] I know the data level.
- [ ] I removed secrets and sensitive data.
- [ ] I chose the right AI role: Planner, Builder, Reviewer, or Owner.
- [ ] I asked for one small task, not everything.
- [ ] I stated what not to do.

### After AI gives output

- [ ] I checked if it answered the actual task.
- [ ] I checked for fake facts or unsupported claims.
- [ ] I checked for scope creep.
- [ ] I checked for safety issues.
- [ ] For code, I tested locally.
- [ ] For public content, I reviewed tone and privacy.
- [ ] For risky actions, I used the approval template.
- [ ] I logged the result in the source of truth.

---

## 14. Beginner Mistakes to Avoid

| Mistake | Why it hurts | Better move |
|---|---|---|
| Asking every AI the same big question | Creates conflicting answers and confusion | Use Planner -> Builder -> Reviewer |
| Letting AI edit too many files | Hard to debug and rollback | One small change per task |
| Trusting AI code without running it | Code can look correct but fail | Test locally |
| Using real data too early | Privacy and safety risk | Use dummy data |
| Adding payments too early | Legal/tax/support burden | Validate willingness to pay first |
| Ignoring source quality | AI may invent facts | Use official sources and source ledger |
| Not saving project state | Context gets lost | Maintain `PROJECT_STATE.md` |
| Using AI as final authority | AI can be wrong | Mel decides |

---

## 15. Upgrade Path

| Stage | Operating model |
|---|---|
| Personal learning | ChatGPT planner + manual work + dummy data |
| Prototype | ChatGPT planner + Cline builder + simple reviewer + GitHub commits |
| Portfolio demo | Add README, screenshots, demo data, security checklist |
| Private beta | Add user feedback form, monitoring, privacy review, rollback plan |
| Public MVP | Add stronger QA, terms/privacy, support path, analytics |
| Monetization test | Add payment readiness, refund/support process, professional tax/legal review |
| Commercial product | Add formal security, monitoring, backups, governance, documentation, incident process |

---

## 16. Source Ledger

| Claim / topic | Source name | Source link | Date accessed | Confidence | Notes / limitations |
|---|---|---|---|---|---|
| ChatGPT Projects group chats, files, instructions, memory, and tools; Enterprise settings/admin controls can affect availability. | OpenAI Help — Projects in ChatGPT | https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt | 2026-06-01 | 🟢 High | Workspace settings and rollout can change. |
| Custom GPTs can be created/edited with instructions, knowledge, capabilities, and optional actions. | OpenAI Help — Creating and editing GPTs | https://help.openai.com/en/articles/8554397-creating-a-gpt | 2026-06-01 | 🟢 High | Availability depends on plan/workspace settings. |
| Deep Research and ChatGPT Search are current ChatGPT research/search tools. | OpenAI Help — Deep Research / ChatGPT Search | https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt and https://help.openai.com/en/articles/9237897-chatgpt-search | 2026-06-01 | 🟢 High | Limits and availability can change. |
| GitHub Copilot supports code suggestions, chat, agents, code review, CLI, and enterprise controls. | GitHub Docs — What is GitHub Copilot? | https://docs.github.com/en/copilot/get-started/what-is-github-copilot | 2026-06-01 | 🟢 High | Details depend on plan and editor integration. |
| Cline can read files, write code, run commands, use a browser, and requires explicit user approval. | Cline Docs — Cline Overview | https://docs.cline.bot/cline-overview | 2026-06-01 | 🟢 High | User approval settings and provider setup matter. |
| Claude Code can read codebases, edit files, run commands, and integrate with development tools. | Anthropic / Claude Code Docs — Overview | https://code.claude.com/docs/en/overview | 2026-06-01 | 🟢 High | Most surfaces require subscription/account or third-party provider. |
| Claude Code has permission-based security and user responsibility for reviewing commands/code. | Anthropic / Claude Code Docs — Security | https://code.claude.com/docs/en/security | 2026-06-01 | 🟢 High | Security controls do not remove the need for human review. |
| Ollama helps run large language models locally and offers CLI/API/libraries/integrations. | Ollama Docs | https://docs.ollama.com/ | 2026-06-01 | 🟢 High | Model quality and hardware performance vary. |
| Microsoft 365 Copilot feature availability, connectors, and access depend on tenant/license/admin settings. | ⚠️ Tenant-specific; verify in your Microsoft admin/M365 documentation | ⚠️ Manual tenant verification required | 2026-06-01 | 🟠 Needs tenant check | This module uses conservative rules and avoids exact unverified UI paths. |

---

## 17. UNGASIS Trace

| Field | Value |
|---|---|
| Mode | Execution / Artifact Build |
| Rigor | Personal / prototype default, with public/commercial guardrails |
| Domain | AI operating model, app building, multi-AI coordination, quality control |
| Dimensions | Router, Rigor Dial, Systems, Tools, Guardrails, Evaluation, Artifacts |
| Lenses | AI workflow architect, product owner coach, security-aware app builder, beginner teacher |
| Intelligences | AI, product, technical, risk, execution, learning, anti-overengineering |
| Frameworks | Rigor Dial, Planner/Builder/Reviewer, Decision Matrix, Source Quality, Human Approval Gates |
| Engines | Workflow Designer, QA/Security, App Builder, Source Quality, Student Teacher |
| Tools/Files | AI Builder Master Workflow Prompt v4.0; Unified Beginner Solopreneur App Building Workflow Playbook v3.0; official source checks listed above |
| Guardrails | No secrets, no unsafe automation, no fake citations, professional review for high-stakes matters, data level controls |
| Template | Standalone Markdown content module |

---

## 18. QA Checklist

- [x] Starts with required title format.
- [x] Defines all six AI capability tiers.
- [x] Assigns Planner / Builder / Reviewer / Owner roles.
- [x] Maps specific tools: ChatGPT Enterprise, M365 Copilot, VS Code + Cline, GitHub Copilot, Ollama, Claude.
- [x] Includes hallucination spotting.
- [x] Includes code verification.
- [x] Includes cross-verification technique.
- [x] Includes human approval gates.
- [x] Uses simple English and tables.
- [x] Includes copy-paste prompts.
- [x] Marks unverified Microsoft tenant-specific claims with ⚠️.
- [x] Avoids secrets and private data.

---

**Version:** 1.0  
**Date:** 2026-06-01  
**Module:** E5 — AI Operating Model  
**File:** `ungasis-ai-operating-model.md`
