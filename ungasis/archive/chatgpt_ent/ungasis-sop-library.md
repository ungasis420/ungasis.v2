# UNGASIS Content Module: Full SOP Library

**Module ID:** E3
**Audience:** Mel John Dimat - beginner, ESL, Filipino reporting consultant, visual learner, solopreneur builder
**Rigor default:** Personal/prototype first, with private beta, public MVP, and monetization guardrails
**Budget posture:** $0 upfront, free-first, use existing tools
**Last updated:** 2026-06-01

## How to Use This SOP Library

An **SOP** means **Standard Operating Procedure**. Think of it like a cooking recipe for work: follow the steps, check the result, then improve next time.

Use this library when you feel stuck, confused, or tempted to overbuild. Pick the SOP that matches the current task. Do not try to do all SOPs in one day.

### The 5-step beginner loop

```text
Pick one SOP -> Follow steps -> Check done list -> Save result -> Update PROJECT_STATE.md
```

## Data Level Quick Guide

| Level | Name | Simple meaning | Rule of thumb |
|---|---|---|---|
| 0 | Public demo data | Fake/sample data safe for portfolio screenshots | Safe for public examples. |
| 1 | Personal non-sensitive data | Notes, learning tasks, non-sensitive plans | Keep private unless reviewed. |
| 2 | Private personal data | Personal finances, private journal, private files | Use trusted/local tools only. |
| 3 | Company/internal data | Client, employee, internal business data | Use only in approved company/M365 tools. |
| 4 | Secrets/regulated data | API keys, passwords, tokens, PII, medical/legal/financial data | Never paste into AI chats, public repos, screenshots, or frontend code. |

**Beginner rule:** when unsure, downgrade the data. Use dummy data first.

## Universal Safety Rules

- Use **dummy data first**.
- Never paste API keys, tokens, passwords, service-role keys, private certificates, or connection strings into AI chats.
- Never put secrets in frontend/public code.
- Require human approval before automation sends messages, deletes/updates records, changes permissions, publishes content, submits forms, moves money, charges money, or contacts users.
- Mark unverified tool, pricing, menu, or feature claims with **⚠️**.
- For Microsoft and ChatGPT Enterprise features, assume **⚙️ admin/workspace/tenant/license settings may affect availability**.
- Before real monetization, get qualified local legal/tax/accounting/privacy review. This module is general planning, not professional advice.

## Universal SOP Helper Prompt

Use this when you want ChatGPT, Copilot, or another AI tool to help you follow any SOP below.

```text
Act as my patient project assistant.

I am following this SOP:
[SOP NAME]

My project:
[PROJECT NAME]

Current stage:
[IDEA / PERSONAL PROTOTYPE / PRIVATE BETA / PUBLIC MVP / MONETIZATION TEST]

My tools:
[TOOLS I AM USING]

My data level:
[0 / 1 / 2 / 3 / 4]

Please help me complete this SOP step by step.
Rules:
- Use simple English.
- Ask only blocking questions.
- Do not ask me to paste API keys, passwords, tokens, company secrets, or private customer data.
- Use dummy data if possible.
- Give me a checklist I can follow.
- End with a done checklist.
```

## SOP Index

| # | SOP | Best stage | Max data level |
|---:|---|---|---|
| 1 | Starting a New Project | Prototype | Level 1 by default. Use Level 0 while validating. Level 3 only inside approved work/M365 tools. |
| 2 | Naming Files and Folders | Prototype | Level 1 for personal names. Level 3 only in approved company storage. Never put Level 4 secrets in file names. |
| 3 | Creating a Project Brief | Prototype | Level 1. Use Level 0 if making a public portfolio example. |
| 4 | Setting Up a ChatGPT Project | Prototype | Level 1 by default. Level 3 only if your Enterprise workspace/admin allows it. Never paste Level 4 secrets. |
| 5 | Setting Up an M365 Copilot Notebook | Prototype | Level 3 only inside approved company tenant. Level 4 only if your policy explicitly allows it; do not paste secrets into prompts. |
| 6 | Saving and Organizing Sources | Prototype | Level 1 by default. Level 3 only in approved company storage. |
| 7 | Creating Dummy/Demo Data | Prototype | Level 0 only. Dummy data must be public-safe. |
| 8 | Creating a Lightweight PRD | Prototype | Level 1. Use Level 0 for public portfolio PRDs. |
| 9 | Creating a UX Flow | Prototype | Level 1. Use Level 0 for public examples. |
| 10 | Creating a Prototype | Prototype | Level 0 only for public prototypes. Level 1 for private personal prototype. |
| 11 | Asking Cline to Edit Files Safely | Prototype | Level 2 for private code. Never include Level 4 secrets in prompts or screenshots. |
| 12 | Reviewing AI-Generated Code | Prototype | Level 2 for private code. Level 4 only in provider dashboard/env manager, not in AI prompts. |
| 13 | Testing Locally | Prototype | Level 2. Use fake accounts/data unless testing in approved environment. |
| 14 | Debugging Blank Page Errors | Prototype | Level 2 for code/errors. Remove secrets from logs before pasting to AI. |
| 15 | Checking Responsive Design | Prototype | Level 0 for screenshots. Do not capture private data. |
| 16 | Checking Accessibility | Prototype | Level 0 for screenshots. Use dummy data. |
| 17 | Checking for Exposed Secrets | Prototype | Level 4 exists in this workflow, but never paste Level 4 into AI. Store only in local `.env` or provider secret manager. |
| 18 | Preparing Portfolio Screenshots | Prototype | Level 0 only. |
| 19 | Writing a README | Prototype | Level 0 for public README. Level 1-2 for private README. Never Level 4. |
| 20 | Publishing a Static Demo | Prototype | Level 0 only. |
| 21 | Preparing Private Beta | Private beta | Level 0-1. Level 2 only if essential and protected. Avoid Level 3/4 unless formally approved. |
| 22 | Collecting Beta Feedback | Private beta | Level 1-2. Remove names/emails before using external AI. Level 3 only in approved company tenant. |
| 23 | Reviewing Automation Safety | Prototype | Level 2 by default. Level 3 only in approved tenant. Level 4 only in secret managers/provider dashboards. |
| 24 | Preparing a Monetization Test | Revenue test | Level 0-1 for offer tests. Payment/financial data is Level 4 and belongs only in approved payment systems. |
| 25 | Creating a Changelog / Evolution Log Entry | Prototype | Level 1 for public changelog. Level 2-3 only in private/internal docs. |
| 26 | Archiving a Project | Prototype | Depends on project data level. Archive Level 3 only in approved company storage. Never publish Level 4. |
| 27 | Emergency: Key/Secret Accidentally Exposed | Emergency | Level 4 is involved, but do not paste the secret into AI. Work in provider dashboards and local env files only. |
| 28 | Starting a New AI Session with Context Restore | Prototype | Level 1 by default. Redact Level 2-4 before pasting into general AI chats. |
| 29 | Setting Up Supabase Keep-Alive GitHub Action | Deployment | Level 2 for config. Secrets stay in GitHub Secrets/provider dashboard only. Do not paste Level 4 into AI. |
| 30 | Deploying to Cloudflare Pages from GitHub | Deployment | Level 0 for public app/demo. Level 2 configs may exist in environment variables. Never publish Level 4. |
| 31 | Setting Up Lemon Squeezy Checkout | Revenue test | Payment data is Level 4 and belongs only inside approved payment systems. App prompts should stay Level 0-1. |
<!-- ADDED: mattpocock/skills absorption — Ubiquitous Language -->
| 32 | Creating Ubiquitous Language / CONTEXT.md | Prototype | Level 0–1. Do not put secrets or private codenames in public CONTEXT.md files. |
<!-- END ADDED: mattpocock/skills absorption — Ubiquitous Language -->

---

# SOPs

## SOP 01 - Starting a New Project

**Source merge note:** Merged from Playbook SOP: Start new project

| Field | Guidance |
|---|---|
| Purpose | Start with one clear problem, one safe project folder, and one next action. |
| When to use | Use this whenever you start an app, dashboard, automation, document system, or portfolio project. |
| Tools | ChatGPT Project, Notion/OneNote/Markdown, Tally/Microsoft Forms, GitHub if code is involved. |
| Output | A safe project home with a clear goal, folder, brief, and next 3 actions. |
| Max data level | Level 1 by default. Use Level 0 while validating. Level 3 only inside approved work/M365 tools. |

### Steps

1. Write one Product North Star: `My project helps [WHO] do [WHAT] so they can [BENEFIT].`
2. Create one project folder using the naming SOP.
3. Create `PROJECT_BRIEF.md` or a Notion/OneNote page.
4. Create a validation form if the idea needs user feedback.
5. If code is involved, create a private GitHub repo and add `README.md`, `PROJECT_STATE.md`, `.env.example`, and `.gitignore`.
6. List the next 3 tasks only. Do not plan 100 tasks yet.
7. Record the data level and safety risks.
<!-- ADDED: mattpocock/skills absorption — Ubiquitous Language -->
8. Create a CONTEXT.md file that defines project-specific terms (see SOP 32 — Creating Ubiquitous Language / CONTEXT.md). This prevents AI from guessing your vocabulary across sessions.
<!-- END ADDED: mattpocock/skills absorption — Ubiquitous Language -->

### Safety Warning

⚠️ Do not use real client/company data at project start. Use dummy data until the tool is safe.

### Done Checklist

- [ ] Project has a name.
- [ ] Project has a Product North Star.
- [ ] Project has a folder or workspace.
- [ ] Data level is written down.
- [ ] Next 3 actions are clear.
<!-- ADDED: mattpocock/skills absorption — Ubiquitous Language -->
- [ ] CONTEXT.md created with at least 5 project terms defined (or marked as TODO for next session).
<!-- END ADDED: mattpocock/skills absorption — Ubiquitous Language -->

### Copy-Paste Helper Prompt

```text
Create a beginner-friendly project start checklist for [PROJECT IDEA]. Output Product North Star, folder name, first files, next 3 tasks, data level, and safety warnings.
```

---

## SOP 02 - Naming Files and Folders

**Source merge note:** Expanded from Master Workflow SOP list

| Field | Guidance |
|---|---|
| Purpose | Keep files easy to find, sort, and hand off to AI without confusion. |
| When to use | Use before creating folders, screenshots, source files, documents, exports, or backups. |
| Tools | Windows File Explorer, OneDrive/SharePoint, GitHub, Markdown. |
| Output | A clean folder/file naming pattern that AI and humans can understand. |
| Max data level | Level 1 for personal names. Level 3 only in approved company storage. Never put Level 4 secrets in file names. |

### Steps

1. Use lowercase words separated by hyphens: `client-feedback-summary.md`.
2. Start dated files with ISO date: `2026-06-01-user-feedback.md`.
3. Use version names only when needed: `v1`, `v2`, `final-reviewed`, not `final-final-final`.
4. Use folders by purpose: `/docs`, `/demo-data`, `/screenshots`, `/src`, `/tests`.
5. Avoid private names, customer names, passwords, or secret values in file names.
6. Keep one source of truth file: `PROJECT_STATE.md`.

### Safety Warning

⚠️ File names can leak private information in screenshots, GitHub, and shared links.

### Done Checklist

- [ ] Names are readable.
- [ ] No spaces or weird symbols in coded project files.
- [ ] No secrets or private names in file names.
- [ ] Folders follow the standard project structure.

### Copy-Paste Helper Prompt

```text
Suggest safe file and folder names for this project: [PROJECT]. Avoid private names and secrets. Output a folder tree and naming rules.
```

---

## SOP 03 - Creating a Project Brief

**Source merge note:** Expanded from Master Workflow SOP list

| Field | Guidance |
|---|---|
| Purpose | Create a short control document so the project does not drift. |
| When to use | Use after picking an idea and before designing or building. |
| Tools | ChatGPT, Word, OneNote, Notion, Markdown file `PROJECT_BRIEF.md`. |
| Output | `PROJECT_BRIEF.md` or equivalent page. |
| Max data level | Level 1. Use Level 0 if making a public portfolio example. |

### Steps

1. Write the problem in one sentence.
2. Write the target user in one sentence.
3. List exactly 3 MVP features.
4. Write a NOT-building list with at least 5 items.
5. List assumptions that may be wrong.
6. List success criteria: how you know this project worked.
7. Add data level, tools, and owner.

### Safety Warning

⚠️ Do not include private customer data or secrets. A brief is often shared or pasted into AI.

### Done Checklist

- [ ] Problem is clear.
- [ ] User is specific.
- [ ] MVP scope is tiny.
- [ ] NOT-building list exists.
- [ ] Success criteria are measurable.

### Copy-Paste Helper Prompt

```text
Create a lightweight project brief for [PROJECT IDEA]. Include problem, target user, Product North Star, 3 MVP features, NOT-building list, assumptions, risks, data level, and success criteria.
```

---

## SOP 04 - Setting Up a ChatGPT Project

**Source merge note:** Expanded from Master Workflow SOP list

| Field | Guidance |
|---|---|
| Purpose | Use ChatGPT Projects as a focused workspace for one long-running project. |
| When to use | Use when a project will have repeated chats, files, decisions, prompts, or drafts. |
| Tools | ChatGPT Projects, project instructions, uploaded files, Canvas, Web Search if enabled. |
| Output | A ChatGPT Project with focused instructions, safe files, and reusable context. |
| Max data level | Level 1 by default. Level 3 only if your Enterprise workspace/admin allows it. Never paste Level 4 secrets. |

### Steps

1. Open ChatGPT and create a new Project. UI names may change.
2. Name it with the project name and lifecycle stage, like `tutor-notes-prototype`.
3. Add project instructions: role, output style, data rules, and what not to do.
4. Upload only safe files: brief, README, dummy data, prompt library excerpts, screenshots without secrets.
5. Start one chat for planning, one for building help, one for QA/review if useful.
6. Save important outputs back into project sources when available.
7. Review sharing settings before inviting anyone.

### Safety Warning

⚠️ Admin/workspace settings can disable tools, memory, sharing, or file upload. Do not rely on project memory for secrets.

### Done Checklist

- [ ] Project exists.
- [ ] Instructions are added.
- [ ] Only safe files are uploaded.
- [ ] Data level is written.
- [ ] Sharing is private unless intentionally enabled.

### Copy-Paste Helper Prompt

```text
Help me write ChatGPT Project instructions for [PROJECT]. Use simple English. Include role, goals, style, data level, safety rules, output format, and no-secret rules.
```

---

## SOP 05 - Setting Up an M365 Copilot Notebook

**Source merge note:** Expanded from Master Workflow SOP list

| Field | Guidance |
|---|---|
| Purpose | Create a Microsoft 365 project notebook for work files, meetings, sources, and Copilot-assisted drafting. |
| When to use | Use when the project lives in Microsoft 365, SharePoint, OneDrive, Teams, Word, Excel, or PowerPoint. |
| Tools | Microsoft 365 Copilot, OneDrive, SharePoint, Teams, Word, Excel, PowerPoint. ⚙️ Tenant/license/admin dependent. |
| Output | A focused M365 Copilot workspace/notebook connected to approved project files. |
| Max data level | Level 3 only inside approved company tenant. Level 4 only if your policy explicitly allows it; do not paste secrets into prompts. |

### Steps

1. Create a notebook/workspace for one project only. ⚠️ Exact menu names may change by rollout and license.
2. Add only approved files: project brief, meeting notes, source documents, safe datasets.
3. Write notebook instructions: audience, style, data sensitivity, and output needs.
4. Keep a source list with file names, owners, and dates.
5. Use Copilot to summarize, compare, draft, and create action lists.
6. Before sharing, check permissions on every file and folder.
7. If Copilot cannot see a file, check permissions first, not the prompt.

### Safety Warning

⚠️ M365 access follows tenant permissions. If permissions are messy, Copilot may surface files people can technically access but should not casually use. Review sharing carefully.

### Done Checklist

- [ ] Notebook/workspace exists.
- [ ] Approved files are attached or linked.
- [ ] Instructions are set.
- [ ] Permissions are checked.
- [ ] Sensitive data rules are clear.

### Copy-Paste Helper Prompt

```text
Create custom instructions for an M365 Copilot Notebook for [PROJECT]. Include purpose, files to use, files to ignore, writing style, data sensitivity, and approval rules.
```

---

## SOP 06 - Saving and Organizing Sources

**Source merge note:** Expanded from Master Workflow SOP list

| Field | Guidance |
|---|---|
| Purpose | Keep evidence, links, files, screenshots, and decisions traceable. |
| When to use | Use during research, competitor checks, tool pricing checks, legal/tax/privacy reading, or app planning. |
| Tools | Markdown `SOURCE_LEDGER.md`, Excel table, OneNote/Notion, browser bookmarks, SharePoint/OneDrive. |
| Output | A source ledger that explains where claims came from. |
| Max data level | Level 1 by default. Level 3 only in approved company storage. |

### Steps

1. Create `SOURCE_LEDGER.md` or an Excel source table.
2. For each source, record title, link/file path, date accessed, claim supported, confidence, and notes.
3. Separate official sources from blogs, forums, and AI-generated notes.
4. Save screenshots only when allowed and useful.
5. Never store private credentials, access tokens, or confidential documents in a public source folder.
6. Refresh sources before launch, pricing decisions, or legal/payment decisions.

### Safety Warning

⚠️ Do not copy paywalled or private content into public docs. Track source rights and permissions.

### Done Checklist

- [ ] Every key claim has a source or is marked unverified.
- [ ] Dates are included.
- [ ] Official sources are prioritized.
- [ ] Unverified claims are marked with ⚠️.

### Copy-Paste Helper Prompt

```text
Create a source ledger table for these claims: [PASTE CLAIMS]. Use columns: Claim, Source, Link/File, Date Accessed, Confidence, Notes, Action. Mark unverified claims with ⚠️.
```

---

## SOP 07 - Creating Dummy/Demo Data

**Source merge note:** Expanded from Master Workflow SOP list

| Field | Guidance |
|---|---|
| Purpose | Create fake but realistic data for testing, screenshots, and portfolio demos. |
| When to use | Use before prototyping, testing, posting screenshots, or building a public demo. |
| Tools | ChatGPT, Excel, CSV, JSON, Faker-style generators, manual sample rows. |
| Output | A safe demo dataset for building and portfolio use. |
| Max data level | Level 0 only. Dummy data must be public-safe. |

### Steps

1. List the data fields your app needs.
2. Create fake names, fake emails, fake companies, fake amounts, and fake dates.
3. Use clearly fake examples like `sample.customer@example.com`.
4. Avoid real customer names, real IDs, real phone numbers, or copied company records.
5. Add edge cases: blank value, very long text, zero amount, duplicate row, error row.
6. Save as `/demo-data/sample-data.csv` or `/demo-data/sample-data.json`.

### Safety Warning

⚠️ Never anonymize real sensitive data by only changing names. True anonymization is hard. Use fake data instead.

### Done Checklist

- [ ] All data is fake.
- [ ] Edge cases exist.
- [ ] File is saved in `/demo-data`.
- [ ] No private identifiers remain.

### Copy-Paste Helper Prompt

```text
Generate Level 0 dummy data for [APP]. Fields: [FIELDS]. Create 20 rows plus edge cases. Make it realistic but clearly fake. Output CSV.
```

---

## SOP 08 - Creating a Lightweight PRD

**Source merge note:** Expanded from Master Workflow SOP list

| Field | Guidance |
|---|---|
| Purpose | Turn the idea into clear requirements before building. |
| When to use | Use before asking Cline, Copilot, Bolt, Lovable, or a developer to build. |
| Tools | ChatGPT, Word, Markdown `PRD.md`, Notion/OneNote. |
| Output | `PRD.md` with requirements, user stories, and acceptance criteria. |
| Max data level | Level 1. Use Level 0 for public portfolio PRDs. |

### Steps

1. Copy the project brief into a PRD document.
2. Add user stories: `As a [USER], I want [ACTION], so I can [BENEFIT].`
3. List functional requirements: what the app must do.
4. List non-goals: what the app will not do now.
5. Add data model notes, screens, and acceptance criteria.
6. Add risks and safety checks.
7. Keep it short. A beginner PRD can be 1-3 pages.

### Safety Warning

⚠️ Do not include secrets or private data samples. Use placeholders.

### Done Checklist

- [ ] PRD states problem and target user.
- [ ] 3 MVP features max.
- [ ] Acceptance criteria are testable.
- [ ] Risks are included.

### Copy-Paste Helper Prompt

```text
Create a lightweight PRD for [PROJECT]. Include problem, target user, goals, non-goals, user stories, requirements, data model, screens, acceptance criteria, risks, and NOT-building list.
```

---

## SOP 09 - Creating a UX Flow

**Source merge note:** Expanded from Master Workflow SOP list

| Field | Guidance |
|---|---|
| Purpose | Map what the user does from first visit to first useful result. |
| When to use | Use before designing screens or building UI. |
| Tools | Paper, Excalidraw, Figma, Mermaid diagram, ChatGPT. |
| Output | A simple user flow and screen list. |
| Max data level | Level 1. Use Level 0 for public examples. |

### Steps

1. Write the user's main goal in one sentence.
2. Map the happy path: start -> action -> saved/result -> confirmation.
3. List 3-5 screens max.
4. For each screen, define main button, data shown, and user decision.
5. Add empty, loading, error, and success states.
6. Find confusing steps and remove them.
7. Save as `/docs/UX_FLOW.md` or a screenshot in `/screenshots`.

### Safety Warning

⚠️ Do not design around dark patterns, hidden charges, or confusing consent.

### Done Checklist

- [ ] One main workflow is mapped.
- [ ] 3-5 screens max.
- [ ] States are listed.
- [ ] Next action is obvious on each screen.

### Copy-Paste Helper Prompt

```text
Design a beginner-friendly UX flow for [APP]. Output happy path, 3-5 screens, button labels, data shown, empty/loading/error/success states, and what not to design yet.
```

---

## SOP 10 - Creating a Prototype

**Source merge note:** Expanded from Master Workflow SOP list

| Field | Guidance |
|---|---|
| Purpose | Make a quick version people can understand or click before you build the real thing. |
| When to use | Use after the UX flow and before serious coding. |
| Tools | Figma, Excalidraw, Bolt/Lovable/v0 if available, Google AI Studio, Power Apps for internal tools, simple HTML. |
| Output | A prototype link, screenshot, or local demo file. |
| Max data level | Level 0 only for public prototypes. Level 1 for private personal prototype. |

### Steps

1. Choose prototype type: sketch, clickable mockup, AI-generated app, or no-code demo.
2. Use only dummy data.
3. Build the one core workflow first.
4. Add only 3 MVP features.
5. Share with 3-5 testers and watch where they get confused.
6. Capture feedback in a form or notes.
7. Do not add payments, admin panels, or complex auth yet.

### Safety Warning

⚠️ Prototype tools are not automatically secure. Do not upload secrets or sensitive data.

### Done Checklist

- [ ] Core workflow is clickable or visible.
- [ ] Dummy data only.
- [ ] Feedback path exists.
- [ ] Known limitations are listed.

### Copy-Paste Helper Prompt

```text
Create a prototype plan for [APP]. Include prototype type, screens, dummy data, build tool, test script, feedback questions, and what not to build yet.
```

---

## SOP 11 - Asking Cline to Edit Files Safely

**Source merge note:** Expanded from Playbook Cline safe-task pattern

| Field | Guidance |
|---|---|
| Purpose | Get AI coding help without uncontrolled rewrites or secret exposure. |
| When to use | Use every time Cline or a coding agent edits a project. |
| Tools | VS Code + Cline, GitHub Copilot, Git, terminal, test commands. |
| Output | A small safe code change with clear test steps and rollback path. |
| Max data level | Level 2 for private code. Never include Level 4 secrets in prompts or screenshots. |

### Steps

1. Commit or save the current working version first.
2. Give Cline one small task only.
3. List relevant files, expected behavior, and test command.
4. Tell Cline not to touch `.env`, secrets, unrelated files, or large rewrites.
5. Ask Cline to state planned files before editing.
6. After edits, review changed files and run tests.
7. Commit only if the app still works.

### Safety Warning

⚠️ Never paste API keys, service-role keys, tokens, or production credentials into Cline chat.

### Done Checklist

- [ ] Working version saved first.
- [ ] Task is small.
- [ ] Changed files are known.
- [ ] Tests were run.
- [ ] Rollback path exists.

### Copy-Paste Helper Prompt

```text
Act as a careful senior developer. Make the smallest safe change for [TASK]. Before editing, list files you plan to modify. Do not touch secrets, `.env`, unrelated files, or rewrite the whole project. After editing, summarize changes, give test steps, and rollback advice.
```

---

## SOP 12 - Reviewing AI-Generated Code

**Source merge note:** Merged from Playbook SOP: Review AI-generated code

| Field | Guidance |
|---|---|
| Purpose | Check AI code before trusting it. |
| When to use | Use after Cline, Copilot, ChatGPT, Bolt, Lovable, or any AI tool creates or changes code. |
| Tools | VS Code diff, Git, terminal, browser console, test checklist, SECURITY_CHECKLIST.md. |
| Output | Reviewed code with test notes and safe commit decision. |
| Max data level | Level 2 for private code. Level 4 only in provider dashboard/env manager, not in AI prompts. |

### Steps

1. Read the changed files list.
2. Check that no secrets were added.
3. Run the app locally.
4. Test the main workflow end to end.
5. Check mobile layout.
6. Check browser console and terminal for errors.
7. Commit only if working and document what changed.

### Safety Warning

⚠️ AI code can look correct and still fail. Do not deploy without testing the main workflow.

### Done Checklist

- [ ] No secrets in code.
- [ ] App runs locally.
- [ ] Main flow works.
- [ ] Errors checked.
- [ ] Git commit exists if accepted.

### Copy-Paste Helper Prompt

```text
Review this AI-generated code change. Check for secrets, broken logic, overbuilding, security issues, mobile issues, and test gaps. Output must-fix, nice-to-fix, and exact test steps.
```

---

## SOP 13 - Testing Locally

**Source merge note:** Expanded from Master Workflow SOP list

| Field | Guidance |
|---|---|
| Purpose | Confirm the app works on your machine before sharing or deploying. |
| When to use | Use after every meaningful code change and before deployment. |
| Tools | Terminal, browser, VS Code, test account, demo data, Git. |
| Output | Local test result and bug list. |
| Max data level | Level 2. Use fake accounts/data unless testing in approved environment. |

### Steps

1. Start from a clean saved Git state.
2. Install dependencies if needed: `npm install`.
3. Run the app: usually `npm run dev`.
4. Open the local URL in browser.
5. Test the main workflow: create -> save -> edit -> delete/log out if relevant.
6. Check terminal and browser console errors.
7. Write results in `TEST_PLAN.md` or `PROJECT_STATE.md`.

### Safety Warning

⚠️ Do not test with real payments, real customer records, or production secrets unless you are in a safe test environment.

### Done Checklist

- [ ] App starts.
- [ ] Main workflow works.
- [ ] No major console errors.
- [ ] Bugs are recorded.
- [ ] Working version is committed.

### Copy-Paste Helper Prompt

```text
Create a local testing checklist for [APP STACK]. Include setup, run command, main workflow tests, browser checks, terminal checks, and pass/fail table.
```

---

## SOP 14 - Debugging Blank Page Errors

**Source merge note:** Expanded from Master Workflow SOP list and Playbook debugging prompt

| Field | Guidance |
|---|---|
| Purpose | Recover calmly when the app loads a blank page. |
| When to use | Use when the browser is white/blank, page does not render, or app crashes immediately. |
| Tools | Browser console, terminal, VS Code, Git diff, Cline/ChatGPT debugging prompt. |
| Output | Root cause, smallest fix, and working page again. |
| Max data level | Level 2 for code/errors. Remove secrets from logs before pasting to AI. |

### Steps

1. Stop adding new features.
2. Open browser DevTools -> Console and copy the first error only.
3. Check terminal for compile/runtime errors.
4. Check the last files changed with Git diff.
5. Try the safest first fix: undo recent change or fix missing import/env variable.
6. Restart dev server.
7. If still broken, ask AI with expected behavior, actual behavior, error, and recent changes.

### Safety Warning

⚠️ Do not paste `.env` contents or full logs with tokens. Redact secrets first.

### Done Checklist

- [ ] First error captured.
- [ ] Recent change identified.
- [ ] Smallest fix tried.
- [ ] Page loads again.
- [ ] Cause documented.

### Copy-Paste Helper Prompt

```text
Act as a patient senior debugger. Expected: [EXPECTED]. Actual: blank page. Error: [PASTE REDACTED ERROR]. Recent changes: [LIST]. Explain likely cause, safest first fix, exact files/lines to check, test steps, and rollback plan.
```

---

## SOP 15 - Checking Responsive Design

**Source merge note:** Expanded from Master Workflow SOP list

| Field | Guidance |
|---|---|
| Purpose | Make sure the app works on phone, tablet, and desktop. |
| When to use | Use before sharing prototypes, portfolio screenshots, beta tests, or deployment. |
| Tools | Browser responsive mode, real phone if possible, screenshots, Figma/devtools. |
| Output | Responsive design checklist and screenshots. |
| Max data level | Level 0 for screenshots. Do not capture private data. |

### Steps

1. Open the app in browser.
2. Test mobile width around 390px.
3. Test tablet width around 768px.
4. Test desktop width around 1280px.
5. Check buttons, forms, tables, menus, modals, and long text.
6. Fix overflow, tiny tap targets, hidden content, and unreadable text.
7. Save public-safe screenshots.

### Safety Warning

⚠️ Screenshots can leak private data. Use dummy data and blur anything private.

### Done Checklist

- [ ] Mobile works.
- [ ] Tablet works.
- [ ] Desktop works.
- [ ] No horizontal overflow.
- [ ] Buttons are easy to tap.

### Copy-Paste Helper Prompt

```text
Review my app for responsive design. Screens: [SCREENS]. Find mobile/tablet/desktop issues, then give exact UI fixes using simple English.
```

---

## SOP 16 - Checking Accessibility

**Source merge note:** Expanded from Master Workflow SOP list

| Field | Guidance |
|---|---|
| Purpose | Make the app easier to use for more people. |
| When to use | Use before portfolio, beta, public demo, or launch. |
| Tools | Keyboard, browser accessibility checker, Lighthouse, manual review, color contrast checker. |
| Output | Accessibility issue list and fixes. |
| Max data level | Level 0 for screenshots. Use dummy data. |

### Steps

1. Try using the app with keyboard only: Tab, Enter, Escape.
2. Check readable font size and spacing.
3. Check contrast between text and background.
4. Make buttons and links have clear labels.
5. Add labels to inputs and alt text to meaningful images.
6. Do not rely only on color for errors/success.
7. Record issues and fix the biggest blockers first.

### Safety Warning

⚠️ Accessibility is not decoration. A working app can still fail if people cannot read or navigate it.

### Done Checklist

- [ ] Keyboard navigation works.
- [ ] Text is readable.
- [ ] Inputs have labels.
- [ ] Errors are clear.
- [ ] Color is not the only signal.

### Copy-Paste Helper Prompt

```text
Run an accessibility review for this UI: [DESCRIBE OR PASTE SAFE CODE]. Check keyboard, labels, contrast, alt text, focus states, error messages, and beginner clarity.
```

---

## SOP 17 - Checking for Exposed Secrets

**Source merge note:** Expanded from Master Workflow SOP list and secret policy

| Field | Guidance |
|---|---|
| Purpose | Find and remove API keys, tokens, passwords, and sensitive values before sharing code. |
| When to use | Use before every GitHub push, deployment, screenshot, or handoff. |
| Tools | VS Code search, Git diff, `.gitignore`, `.env.example`, GitHub secret scanning, provider dashboards. |
| Output | Secret exposure check result and remediation list. |
| Max data level | Level 4 exists in this workflow, but never paste Level 4 into AI. Store only in local `.env` or provider secret manager. |

### Steps

1. Search the codebase for `key`, `secret`, `token`, `password`, `service_role`, `connectionString`, and provider names.
2. Check `.env.local` is in `.gitignore`.
3. Check `.env.example` contains fake placeholders only.
4. Check frontend code for secret-like values.
5. Check screenshots for visible keys or admin dashboards.
6. If anything was committed, treat it as leaked and follow the emergency leaked secret SOP.
7. Document the result in `SECURITY_CHECKLIST.md`.

### Safety Warning

⚠️ Deleting a secret from the latest file is not enough if it was already committed or shared. Rotate it.

### Done Checklist

- [ ] `.env.local` ignored.
- [ ] No real keys in repo.
- [ ] No secrets in screenshots.
- [ ] `.env.example` has placeholders.
- [ ] Emergency SOP triggered if needed.

### Copy-Paste Helper Prompt

```text
Help me create a no-secrets checklist for my project. Do not ask me to paste actual secrets. Tell me what words/files to search and how to verify `.env` safety.
```

---

## SOP 18 - Preparing Portfolio Screenshots

**Source merge note:** Expanded from Master Workflow SOP list

| Field | Guidance |
|---|---|
| Purpose | Create public-safe images that show your work clearly and honestly. |
| When to use | Use before adding a project to LinkedIn, GitHub README, portfolio page, or case study. |
| Tools | Browser, screenshot tool, Figma/Canva if available, `/screenshots` folder. |
| Output | A safe screenshot pack for portfolio use. |
| Max data level | Level 0 only. |

### Steps

1. Switch the app to dummy/demo data.
2. Hide or blur user emails, admin screens, keys, URLs with tokens, and company names.
3. Capture 3-5 key screens: landing, dashboard, core action, result, mobile view.
4. Name files clearly: `2026-06-01-dashboard-mobile.png`.
5. Add short captions: problem, action, result.
6. Save screenshots in `/screenshots`.
7. Review the images before publishing.

### Safety Warning

⚠️ Screenshots are public evidence. One exposed key or client name can cause real harm.

### Done Checklist

- [ ] Dummy data only.
- [ ] Secrets hidden.
- [ ] Captions written.
- [ ] Mobile screenshot included.
- [ ] Files stored in `/screenshots`.

### Copy-Paste Helper Prompt

```text
Create a portfolio screenshot checklist for [PROJECT]. Include which screens to capture, safe dummy data, captions, file names, and privacy checks.
```

---

## SOP 19 - Writing a README

**Source merge note:** Expanded from Master Workflow SOP list

| Field | Guidance |
|---|---|
| Purpose | Explain what the project is, how to run it, and what is safe to share. |
| When to use | Use for every coded, portfolio, or serious project. |
| Tools | Markdown `README.md`, ChatGPT, GitHub. |
| Output | `README.md` ready for private repo or public portfolio. |
| Max data level | Level 0 for public README. Level 1-2 for private README. Never Level 4. |

### Steps

1. Start with project name and one-sentence purpose.
2. Explain the problem and target user.
3. List features and current stage.
4. Add screenshots using dummy data.
5. Add setup/run instructions with placeholder env vars.
6. Add test instructions.
7. Add AI assistance honesty note if used.

### Safety Warning

⚠️ Never put real API keys, private URLs, customer details, or internal business context in public README files.

### Done Checklist

- [ ] Purpose clear.
- [ ] Run steps included.
- [ ] Screenshots safe.
- [ ] Env vars are placeholders.
- [ ] AI contribution note is honest.

### Copy-Paste Helper Prompt

```text
Write a beginner-friendly README for [PROJECT]. Include purpose, problem, features, screenshots section, tech stack, setup steps, env placeholder list, test steps, known limits, and AI-assisted work note.
```

---

## SOP 20 - Publishing a Static Demo

**Source merge note:** Expanded from Master Workflow SOP list

| Field | Guidance |
|---|---|
| Purpose | Share a safe public demo without exposing private data or live risky systems. |
| When to use | Use for portfolio demos, landing pages, simple docs, or static prototypes. |
| Tools | GitHub Pages, Cloudflare Pages, Netlify, static HTML/CSS/JS, README. |
| Output | A public demo URL using safe demo data. |
| Max data level | Level 0 only. |

### Steps

1. Confirm the app can run with dummy data only.
2. Remove or disable real API calls unless safe and needed.
3. Check no secrets are in code or build logs.
4. Create a public demo branch or folder if useful.
5. Deploy to a free static host allowed for your use case. Re-check commercial terms before money is involved.
6. Open the public URL and test main screens.
7. Add the live link to README and project tracker.

### Safety Warning

⚠️ Static demos are public. Do not connect to production databases or expose hidden admin routes.

### Done Checklist

- [ ] Dummy data only.
- [ ] No secrets found.
- [ ] Public URL works.
- [ ] README link added.
- [ ] Commercial-use terms checked if monetized.

### Copy-Paste Helper Prompt

```text
Create a static demo publishing checklist for [PROJECT]. Include no-secret checks, dummy data checks, host options, smoke tests, README update, and rollback plan.
```

---

## SOP 21 - Preparing Private Beta

**Source merge note:** Merged from Playbook SOP: Prepare private beta

| Field | Guidance |
|---|---|
| Purpose | Let a small trusted group test safely before a public launch. |
| When to use | Use when the prototype works and you want 3-20 real testers. |
| Tools | Tally/Microsoft Forms, email/Teams/WhatsApp, private link, README, feedback tracker. |
| Output | Private beta plan, tester list, feedback form, and safety checks. |
| Max data level | Level 0-1. Level 2 only if essential and protected. Avoid Level 3/4 unless formally approved. |

### Steps

1. Use dummy/demo data by default.
2. Create a feedback form.
3. Add a contact/support method.
4. Test the main flow yourself.
5. Add basic monitoring if the link is public.
6. Invite 3-10 trusted testers first.
7. Track feedback, bugs, and decisions.

### Safety Warning

⚠️ Do not collect more personal data than needed. Tell testers it is a test version.

### Done Checklist

- [ ] Main flow works.
- [ ] Feedback form exists.
- [ ] Testers know it is beta.
- [ ] Support/contact path exists.
- [ ] Privacy risk reviewed.

### Copy-Paste Helper Prompt

```text
Prepare a private beta plan for [APP]. Include tester profile, invite message, feedback form questions, safety warnings, support path, test tasks, and success criteria.
```

---

## SOP 22 - Collecting Beta Feedback

**Source merge note:** Expanded from Master Workflow SOP list

| Field | Guidance |
|---|---|
| Purpose | Turn tester reactions into useful product decisions. |
| When to use | Use during private beta, public demo, or early revenue test. |
| Tools | Tally/Microsoft Forms, Excel/SharePoint List, Notion/OneNote, ChatGPT for analysis using safe/anonymized data. |
| Output | Beta feedback summary and next iteration plan. |
| Max data level | Level 1-2. Remove names/emails before using external AI. Level 3 only in approved company tenant. |

### Steps

1. Ask testers to complete one specific task.
2. Ask what confused them, what helped, and what they expected.
3. Ask if they would use it again and why.
4. Separate bugs, UX issues, feature requests, and payment signals.
5. Anonymize feedback before analysis.
6. Pick the top 3 fixes only.
7. Write continue/pivot/kill decision notes.

### Safety Warning

⚠️ Feedback may include personal data. Do not paste raw names/emails into random AI tools.

### Done Checklist

- [ ] Feedback collected.
- [ ] Data anonymized.
- [ ] Top 3 fixes chosen.
- [ ] Decision recorded.
- [ ] Testers thanked.

### Copy-Paste Helper Prompt

```text
Analyze this anonymized beta feedback for [APP]. Separate bugs, UX confusion, feature requests, praise, payment signals, and top 3 fixes. Use simple English.
```

---

## SOP 23 - Reviewing Automation Safety

**Source merge note:** Expanded from Master Workflow SOP list and human approval rules

| Field | Guidance |
|---|---|
| Purpose | Prevent automations from sending, deleting, charging, or changing things without review. |
| When to use | Use before Power Automate, Zapier/Make/n8n, Agent Mode, GPT Actions, scripts, or scheduled tasks affect real systems. |
| Tools | Power Automate, Office Scripts, ChatGPT Tasks, agent/action configs, approval checklist, logs. |
| Output | Automation safety review and approval map. |
| Max data level | Level 2 by default. Level 3 only in approved tenant. Level 4 only in secret managers/provider dashboards. |

### Steps

1. Write the trigger: what starts the automation?
2. Write every action: what changes, sends, deletes, creates, or publishes?
3. Mark risky actions: send message, update/delete record, change permissions, submit forms, move/charge/refund money.
4. Add human approval before risky actions.
5. Add logs: what happened, when, who approved.
6. Test with dummy data first.
7. Create a rollback/stop plan.

### Safety Warning

⚠️ Never fully automate high-impact actions without human approval and logs.

### Done Checklist

- [ ] Trigger documented.
- [ ] Actions documented.
- [ ] Risky actions have approval.
- [ ] Dummy test passed.
- [ ] Rollback/stop plan exists.

### Copy-Paste Helper Prompt

```text
Review this automation for safety. Trigger: [TRIGGER]. Actions: [ACTIONS]. Data: [DATA]. Output approval gates, risks, logs, test plan, rollback plan, and what should never be automated.
```

---

## SOP 24 - Preparing a Monetization Test

**Source merge note:** Merged from Playbook SOP: Monetization readiness

| Field | Guidance |
|---|---|
| Purpose | Test willingness to pay without overbuilding payments too early. |
| When to use | Use after user pain is validated and people show repeated interest or payment signal. |
| Tools | Landing page, waitlist form, manual invoice, Lemon Squeezy/PayMongo/Stripe if supported and reviewed, analytics. |
| Output | Monetization test plan with offer, validation signal, and safety checklist. |
| Max data level | Level 0-1 for offer tests. Payment/financial data is Level 4 and belongs only in approved payment systems. |

### Steps

1. Confirm pain is real from user feedback.
2. Confirm repeated use or willingness-to-pay signal.
3. Write one offer: who it helps, result, price hypothesis, what is included.
4. Start with waitlist, manual demo, paid pilot, or payment link only if justified.
5. Write refund/support/privacy basics.
6. Test payment flow in test mode if using a processor.
7. Review tax/legal/privacy with qualified help before serious commercial launch.

### Safety Warning

⚠️ This is general planning, not legal/tax/accounting/financial advice. Do not collect payments until you understand support, refunds, privacy, and local obligations.

### Done Checklist

- [ ] Pain validated.
- [ ] Offer written.
- [ ] Payment method chosen carefully.
- [ ] Refund/support note exists.
- [ ] Commercial readiness gaps listed.

### Copy-Paste Helper Prompt

```text
Assess monetization readiness for [APP]. Include validation evidence, offer, price hypothesis, payment options, support/refund/privacy checklist, risks, and next safest test.
```

---

## SOP 25 - Creating a Changelog / Evolution Log Entry

**Source merge note:** Expanded from Master Workflow SOP list

| Field | Guidance |
|---|---|
| Purpose | Record what changed and why so future you can understand the project. |
| When to use | Use after feature changes, bug fixes, architecture decisions, prompt updates, or SOP changes. |
| Tools | `CHANGELOG.md`, `DECISIONS.md`, `EVOLUTION_LOG.md`, Git commit messages. |
| Output | A clear changelog or evolution log entry. |
| Max data level | Level 1 for public changelog. Level 2-3 only in private/internal docs. |

### Steps

1. Write the date and version/change label.
2. List what changed in plain English.
3. Explain why it changed.
4. List files affected or decisions made.
5. List tests run and result.
6. List known gaps or follow-up tasks.
7. Link to related issue/feedback if safe.

### Safety Warning

⚠️ Do not include private customer details, passwords, or unreleased sensitive business information in public changelogs.

### Done Checklist

- [ ] Date included.
- [ ] Change described.
- [ ] Reason included.
- [ ] Tests included.
- [ ] Next action included.

### Copy-Paste Helper Prompt

```text
Create a changelog entry for this change: [CHANGE]. Include date, version, changed files, why, tests run, result, risks, and next action.
```

---

## SOP 26 - Archiving a Project

**Source merge note:** Expanded from Master Workflow SOP list

| Field | Guidance |
|---|---|
| Purpose | Close a project cleanly without losing useful learning. |
| When to use | Use when a project is paused, killed, replaced, or completed. |
| Tools | GitHub archive, OneDrive/SharePoint, local backup, README, PROJECT_STATE.md. |
| Output | Archived project with final state, backup, and lessons learned. |
| Max data level | Depends on project data level. Archive Level 3 only in approved company storage. Never publish Level 4. |

### Steps

1. Write archive reason: completed, paused, pivoted, killed, replaced.
2. Update `PROJECT_STATE.md` with final status.
3. Save final README, screenshots, source ledger, and decisions.
4. Export data if needed and allowed.
5. Remove/rotate unused secrets if the app is no longer maintained.
6. Mark repo/folder as archived.
7. Write lessons learned and reusable pieces.

### Safety Warning

⚠️ Old projects can leak secrets or outdated dependencies. Do not leave live keys connected to abandoned code.

### Done Checklist

- [ ] Final status written.
- [ ] Useful files saved.
- [ ] Secrets reviewed.
- [ ] Live links disabled or documented.
- [ ] Lessons learned captured.

### Copy-Paste Helper Prompt

```text
Create an archive checklist for [PROJECT]. Include final status, backups, data export, secret cleanup, live link decision, lessons learned, and reuse opportunities.
```

---

## SOP 27 - Emergency: Key/Secret Accidentally Exposed

**Source merge note:** Merged from Playbook SOP: Emergency leaked secret

| Field | Guidance |
|---|---|
| Purpose | Respond fast when an API key, token, password, or private credential is exposed. |
| When to use | Use immediately if a secret appears in GitHub, screenshots, AI chat, logs, frontend code, or shared documents. |
| Tools | Provider dashboard, GitHub, secret scanner, `.env.local`, hosting environment variables, incident note. |
| Output | Revoked/rotated secret, cleaned project, incident note, and prevention checklist. |
| Max data level | Level 4 is involved, but do not paste the secret into AI. Work in provider dashboards and local env files only. |

### Steps

1. Stop using the exposed key.
2. Revoke or rotate it in the provider dashboard.
3. Remove it from code, screenshots, docs, and shared files.
4. Check Git history, hosting environment variables, and logs.
5. Create a new key only after cleanup.
6. Store the new key in `.env.local` or provider secret manager, not frontend code.
7. Document what happened and how to prevent it.

### Safety Warning

⚠️ Assume a committed or shared secret is exposed. Deleting the file is not enough.

### Done Checklist

- [ ] Old key revoked.
- [ ] New key created if needed.
- [ ] Code cleaned.
- [ ] Git/history risk checked.
- [ ] Incident documented.

### Copy-Paste Helper Prompt

```text
Help me handle a leaked secret without seeing the actual secret. Give me a checklist to revoke, rotate, clean code, check Git history, update environment variables, and prevent recurrence.
```

---

## SOP 28 - Starting a New AI Session with Context Restore

**Source merge note:** Expanded from Master Workflow SOP list and Playbook session handoff prompt

| Field | Guidance |
|---|---|
| Purpose | Continue a project in a new AI chat without losing context. |
| When to use | Use when context window is full, starting a new ChatGPT/Copilot/Cline session, or switching tools. |
| Tools | `PROJECT_STATE.md`, `SESSION_HANDOFF.md`, ChatGPT Project, Copilot Notebook, Cline task prompt. |
| Output | A compact handoff prompt for continuing work safely. |
| Max data level | Level 1 by default. Redact Level 2-4 before pasting into general AI chats. |

### Steps

1. Open `PROJECT_STATE.md` or create a short handoff note.
2. Summarize current goal, stage, stack, decisions, files created, known bugs, and next 3 actions.
3. Add safety notes: data level, secrets, what not to touch.
4. Paste the handoff into the new AI session.
5. Ask AI to restate the plan before acting.
6. Correct any misunderstanding before building.
7. Save the new outcome back to project state.

### Safety Warning

⚠️ Do not paste raw secrets, customer data, private logs, or company files into unapproved AI sessions.

### Done Checklist

- [ ] Handoff includes current state.
- [ ] Next 3 actions are clear.
- [ ] Safety notes included.
- [ ] AI restated understanding.
- [ ] Project state updated after session.

### Copy-Paste Helper Prompt

```text
Create a handoff summary for my next AI session. Include project name, goal, stage, stack, decisions, files created, known bugs, next 3 actions, data level, safety notes, and a prompt to continue.
```

---

## SOP 29 - Setting Up Supabase Keep-Alive GitHub Action

**Source merge note:** Added from Master Workflow v4.0 SOP list. ⚠️ Some Supabase inactivity/pause details were marked unverified in the Playbook cross-check.

| Field | Guidance |
|---|---|
| Purpose | Keep a free-tier backend from becoming inactive only if your provider rules require or allow it. |
| When to use | Use only after checking current Supabase/project rules and deciding a keep-alive is allowed and useful. |
| Tools | Supabase dashboard, GitHub Actions, GitHub Secrets, cron schedule, simple health endpoint. |
| Output | A documented, policy-safe keep-alive workflow if needed. |
| Max data level | Level 2 for config. Secrets stay in GitHub Secrets/provider dashboard only. Do not paste Level 4 into AI. |

### Steps

1. Verify current Supabase free-tier inactivity behavior from official docs/account dashboard. ⚠️ Do not rely on old claims.
2. Create a harmless health-check endpoint or query that does not expose data.
3. Store any required keys in GitHub Secrets, not the repository.
4. Create a scheduled GitHub Action only if allowed by terms and needed.
5. Run it manually once and check logs.
6. Add failure notification if possible.
7. Document the action in `DEPLOYMENT.md`.

### Safety Warning

⚠️ Do not abuse free tiers or bypass provider limits. This SOP is for legitimate availability checks only.

### Done Checklist

- [ ] Official current rules checked.
- [ ] No sensitive data queried.
- [ ] Secrets stored safely.
- [ ] Action tested.
- [ ] Documentation updated.

### Copy-Paste Helper Prompt

```text
Design a safe Supabase keep-alive check for [PROJECT]. First remind me to verify current official Supabase rules. Do not include real secrets. Output GitHub Actions plan, security notes, and test steps.
```

---

## SOP 30 - Deploying to Cloudflare Pages from GitHub

**Source merge note:** Added from Master Workflow v4.0 SOP list

| Field | Guidance |
|---|---|
| Purpose | Deploy a static or frontend app from GitHub to a public URL. |
| When to use | Use after local testing passes and demo data/privacy checks are complete. |
| Tools | GitHub, Cloudflare Pages, build command, environment variables, README/DEPLOYMENT.md. |
| Output | Live Cloudflare Pages URL and deployment notes. |
| Max data level | Level 0 for public app/demo. Level 2 configs may exist in environment variables. Never publish Level 4. |

### Steps

1. Push the working app to GitHub.
2. In Cloudflare Pages, connect the GitHub repo.
3. Set framework/build command/output folder based on your app.
4. Add environment variables in Cloudflare settings, not in code.
5. Deploy and watch build logs.
6. Open the public URL and run smoke tests.
7. Document build settings, env vars names, URL, and rollback plan in `DEPLOYMENT.md`.

### Safety Warning

⚠️ Build logs and public bundles can expose mistakes. Check for secrets before and after deploy.

### Done Checklist

- [ ] GitHub repo pushed.
- [ ] Build succeeds.
- [ ] Public URL works.
- [ ] Env vars stored in platform settings.
- [ ] Smoke test passed.
- [ ] Rollback notes exist.

### Copy-Paste Helper Prompt

```text
Create a Cloudflare Pages deployment checklist for [APP STACK]. Include GitHub setup, build command, output folder, environment variable safety, smoke tests, and rollback plan.
```

---

## SOP 31 - Setting Up Lemon Squeezy Checkout

**Source merge note:** Added from Master Workflow v4.0 SOP list

| Field | Guidance |
|---|---|
| Purpose | Add a simple checkout path for a validated digital product or SaaS test. |
| When to use | Use only after monetization readiness passes and you understand support, refund, privacy, and local obligations. |
| Tools | Lemon Squeezy account, product/variant setup, test mode, checkout link/button, docs, analytics. |
| Output | Checkout test plan or safe payment link implementation. |
| Max data level | Payment data is Level 4 and belongs only inside approved payment systems. App prompts should stay Level 0-1. |

### Steps

1. Confirm monetization readiness first: real pain, repeat use, payment signal.
2. Create product and price in Lemon Squeezy. ⚠️ Re-check current fees, payout availability, and terms before using.
3. Use test mode or test checkout where available.
4. Add checkout link/button to a safe page.
5. Write refund/support/contact notes.
6. Do not store card/payment data in your app.
7. Document payment flow, webhook plan if any, and manual fulfillment process.

### Safety Warning

⚠️ This is not legal/tax/accounting advice. Before real commercial launch, get qualified local review, especially for Philippines tax/payment obligations.

### Done Checklist

- [ ] Readiness passed.
- [ ] Terms/fees checked.
- [ ] Test checkout works.
- [ ] Support/refund note exists.
- [ ] No card data stored in app.
- [ ] Documentation updated.

### Copy-Paste Helper Prompt

```text
Create a safe Lemon Squeezy checkout setup plan for [PRODUCT]. Include readiness gate, product setup, test checkout, app button/link, refund/support notes, privacy notes, and what not to store.
```


<!-- ADDED: mattpocock/skills absorption — Ubiquitous Language -->

### SOP 32 - Creating Ubiquitous Language / CONTEXT.md

**Source:** mattpocock/skills `/grill-with-docs` concept + Domain-Driven Design

| Field | Guidance |
|---|---|
| Purpose | Create a shared vocabulary file (CONTEXT.md) so AI uses YOUR exact terms — no guessing, no synonyms, no verbose re-explanations every session. This cuts AI verbosity, prevents misunderstanding, and creates consistency across multiple AI tools and sessions. |
| When to use | Use when starting any project that will span multiple AI sessions, multiple tools (ChatGPT + Copilot + Cline), or has domain-specific terms that AI keeps getting wrong or explaining unnecessarily. |
| Tools | Any text editor, Markdown file, ChatGPT Project files, Cline memory bank, M365 Copilot attached files. |
| Output | A CONTEXT.md file in the project root or /docs folder. |
| Max data level | Level 0–1. Do not put secrets, API keys, or private customer terms in CONTEXT.md if the repo is public. |

#### 🍳 Analogy: The Restaurant Menu

Imagine you open a restaurant and your menu says "Signature Dish #7." Every waiter explains it differently to customers — one says "it’s like adobo," another says "it’s a stew," another says "it’s braised pork." Customers get confused.

**Fix:** You write on the menu: "Signature Dish #7 = Slow-braised pork belly in soy-vinegar sauce. Do NOT call it: stew, adobo, or roast."

Now every waiter says the same thing. Every customer understands the same thing. **CONTEXT.md does this for AI.**

#### Why This Matters

| Without CONTEXT.md | With CONTEXT.md |
|---|---|
| AI calls your project phases "steps," "stages," "levels," "milestones" randomly | AI uses ONLY the term you defined: "chapter" |
| Every new AI session, you re-explain your vocabulary | AI reads CONTEXT.md once and uses your terms instantly |
| Different AI tools (ChatGPT, Copilot, Cline) use different words for the same thing | All tools use the same vocabulary from the same file |
| AI wastes tokens re-defining terms you already know | AI skips definitions and gets to work |
| You get confused by AI’s synonym soup | You get clear, consistent, predictable output |

#### Steps

1. **List your project’s key terms** — what words do you use repeatedly? (aim for 5–15 terms to start)
2. **Define each term in one short sentence** — what does it mean IN YOUR PROJECT?
3. **Add a "Do NOT say instead" column** — what synonyms should AI avoid?
4. **Save as CONTEXT.md** in the project root or /docs folder.
5. **Attach CONTEXT.md** to every AI session for this project:
   - **ChatGPT Enterprise:** Upload to Project files
   - **M365 Copilot:** Attach as a cloud file at session start
   - **Cline:** Place in project root so Cline can read it, or add key terms to .clinerules
6. **Update CONTEXT.md** when you add new terms or change definitions.
7. **Add this instruction** to your session prompt: `"Use ONLY the terms defined in CONTEXT.md. Do not use synonyms or alternatives."`

#### CONTEXT.md Template

```text
# CONTEXT.md — Shared Domain Vocabulary
# Project: [PROJECT NAME]
# Last updated: [YYYY-MM-DD]
# Rule: AI must use ONLY these terms. No synonyms. No alternatives.

## Domain Terms

| Term | Means | Do NOT say instead |
|---|---|---|
| [term 1] | [one-sentence definition] | [banned synonyms] |
| [term 2] | [one-sentence definition] | [banned synonyms] |
| [term 3] | [one-sentence definition] | [banned synonyms] |
| [term 4] | [one-sentence definition] | [banned synonyms] |
| [term 5] | [one-sentence definition] | [banned synonyms] |

## Roles

| Role name | Who/what it refers to | Do NOT say instead |
|---|---|---|
| [role 1] | [definition] | [banned synonyms] |
| [role 2] | [definition] | [banned synonyms] |

## File/Folder Names That Matter

| Name | What it is | Notes |
|---|---|---|
| [file/folder] | [purpose] | [any rules] |

## Abbreviations

| Short form | Full meaning |
|---|---|
| [abbrev] | [meaning] |
```

#### Example: UNGASIS OS CONTEXT.md

```text
# CONTEXT.md — Shared Domain Vocabulary
# Project: UNGASIS OS
# Last updated: 2026-06-01
# Rule: AI must use ONLY these terms. No synonyms. No alternatives.

## Domain Terms

| Term | Means | Do NOT say instead |
|---|---|---|
| quest | A project from idea to completion | project, initiative, task, assignment |
| chapter | A lifecycle stage within a quest | phase, step, level, milestone, sprint |
| shield | A data classification level (0–4) | security level, clearance, tier |
| forge | The build/development phase of a quest | development phase, coding phase, build stage |
| gate | A human approval checkpoint — AI stops and waits | checkpoint, review point, approval step |
| grilling | Pre-build interrogation to challenge assumptions | discovery, exploration, brainstorming |
| caveman mode | Ultra-compressed AI output to save tokens | short mode, brief mode, compact mode |
| factory | The repeatable 6-step project loop (CAPTURE→SHIP→LEARN) | workflow, pipeline, process, methodology |
| north star | One-sentence project purpose statement | mission, vision, goal statement |
| stub | A placeholder section marked for future completion | draft, skeleton, placeholder, TODO |

## Roles

| Role name | Who/what it refers to | Do NOT say instead |
|---|---|---|
| owner | Mel (the human decision-maker) | user, admin, developer, operator |
| builder | AI agent doing code/design work (Cline, Copilot) | assistant, helper, bot |
| inspector | AI agent doing QA/review work | reviewer, checker, auditor |
| planner | AI agent doing strategy/architecture | architect, advisor, consultant |

## Abbreviations

| Short form | Full meaning |
|---|---|
| MVP | Minimum Viable Product — the smallest useful version |
| SOP | Standard Operating Procedure — a step-by-step recipe |
| PRD | Product Requirements Document — what to build and why |
| RLS | Row Level Security — database permission rules |
| PII | Personally Identifiable Information — names, emails, IDs |
```

#### How to Use CONTEXT.md Across Your Tools

| Tool | How to Load CONTEXT.md | When to Load |
|---|---|---|
| **ChatGPT Enterprise** | Upload to Project files. Add to Project instructions: "Use ONLY terms from CONTEXT.md." | Once per project setup. Update when terms change. |
| **M365 Copilot** | Attach as a cloud file at session start. Reference it in your prompt. | Every session for this project. |
| **Cline** | Place CONTEXT.md in project root. Add key terms to .clinerules. | Automatically available every Cline session. |
| **New AI session (any tool)** | Paste the Domain Terms table into your session-start handoff prompt. | Every new session if file attachment is not available. |

#### Copy-Paste Helper Prompt

```text
Act as a domain vocabulary designer.
My project is:
[PROJECT NAME]

Here are the words I use often in this project:
[PASTE A LIST OF TERMS, OR DESCRIBE YOUR PROJECT AND LET AI SUGGEST TERMS]

Create a CONTEXT.md file using this format:
| Term | Means | Do NOT say instead |

Rules:
- Keep definitions to one sentence.
- Include at least 5 domain terms, 2 roles, and 3 abbreviations.
- The "Do NOT say instead" column must have at least 2 banned synonyms per term.
- Use simple English.
- Output as a copy-paste-ready Markdown file.
```

#### Safety Warning

⚠️ Do not include secrets, API key names, internal company codenames, or private customer terms in CONTEXT.md if the file will be in a public repo. Use Level 0–1 terms only for public projects.

#### Done Checklist

- [ ] CONTEXT.md file created.
- [ ] At least 5 domain terms defined with "Do NOT say instead" column.
- [ ] File saved in project root or /docs folder.
- [ ] File loaded into primary AI tool (ChatGPT Project / M365 Copilot / Cline).
- [ ] Session prompt includes: "Use ONLY terms from CONTEXT.md."
- [ ] Team/collaborators informed (if applicable).

<!-- END ADDED: mattpocock/skills absorption — Ubiquitous Language -->


---

# Reusable Files Mentioned in the SOPs

| File | Purpose | Never put here |
|---|---|---|
| `README.md` | Explains what the project does and how to run it. | Real secrets, private customer data, confidential company context. |
| `PROJECT_STATE.md` | Single source of truth for current status, stage, next actions. | Passwords, tokens, private logs. |
| `PROJECT_BRIEF.md` | Short project control document. | Private user records or sensitive samples. |
| `PRD.md` | Requirements and acceptance criteria. | Secrets, real regulated data. |
| `CHANGELOG.md` | What changed and why. | Private customer details. |
| `DECISIONS.md` | Decision history and tradeoffs. | Credentials or confidential legal/tax details. |
| `TEST_PLAN.md` | Manual tests and results. | Production secrets or private test data. |
| `SECURITY_CHECKLIST.md` | Secret and safety checks. | Actual passwords or tokens. |
| `.env.example` | Fake placeholder names for environment variables. | Real key values. |
| `.env.local` | Real local secrets on your machine only. | Do not commit this file to GitHub. |
| `SOURCE_LEDGER.md` | Sources, claims, links, dates, confidence. | Copied private/paywalled content unless allowed. |
| `SESSION_HANDOFF.md` | Compact handoff for new AI sessions. | Raw secrets, private customer rows, company confidential files. |
<!-- ADDED: mattpocock/skills absorption — Ubiquitous Language -->
| `CONTEXT.md` | Shared domain vocabulary so AI uses your exact terms — no synonyms, no guessing. | Secrets, internal codenames, or private customer terms in public repos. |
<!-- END ADDED: mattpocock/skills absorption — Ubiquitous Language -->

# Source Ledger

| Source | Used for | Verification status | Notes |
|---|---|---|---|
| AI Builder's Master Workflow Prompt v4.0 | Required SOP fields and full SOP topic list, including v4.0 additions | Source file provided by user | No external citation invented. |
| Unified Beginner Solopreneur App Building Workflow Playbook v3.0 | Starter SOPs for start project, review code, private beta, monetization readiness, leaked secret | Source file provided by user | Merged into expanded SOPs. |
| OpenAI Help: Projects in ChatGPT | ChatGPT Project SOP safety and availability notes | Verified from official source during E3 creation | Menu names and workspace settings can change. |
| Microsoft 365 Copilot Notebook current UI | M365 Copilot Notebook SOP | ⚠️ Not fully verified from official Microsoft support docs in this pass | Marked as tenant/license/admin dependent. |
| Supabase inactivity / keep-alive behavior | Supabase keep-alive SOP | ⚠️ Not verified from official source in this pass | SOP tells user to verify current official rules before building. |
| Lemon Squeezy fees/payout/current terms | Checkout SOP | ⚠️ Not verified from official source in this pass | SOP tells user to re-check fees, payout, and terms before real use. |

# QA Checklist for This Module

- [x] Starts with required title format.
- [x] Includes all requested SOP fields: Purpose, When to use, Steps, Tools, Output, Safety warning, Done checklist, Max data level.
- [x] Includes all requested E3 SOPs.
- [x] Merges the 5 Playbook starter SOPs.
- [x] Includes v4.0 extra SOPs from the master workflow.
- [x] Uses simple English and checklists.
- [x] Includes copy-paste helper prompts.
- [x] Marks unverified/current claims with ⚠️.
- [x] Does not include real secrets or private data.

# UNGASIS Trace

| Field | Value |
|---|---|
| Mode | Execution / Artifact Build |
| Rigor | Prototype default with beta, deployment, monetization, and emergency guardrails |
| Domain | SOPs, AI-assisted app building, solopreneur workflow, Microsoft/ChatGPT workspace safety |
| Dimensions | Router, Rigor, Knowledge, Templates, Guardrails, Artifacts, Evaluation |
| Lenses | Beginner teacher, workflow designer, app/product operator, safety reviewer |
| Intelligences | Practicality, product, technical, risk, learning, instruction-following |
| Frameworks | Rigor Dial, Minimum Viable Rigor, SOP workflow, source-first caution, human approval gates |
| Engines | Workflow Designer, Student Master Teacher, QA/Security, Artifact Builder |
| Tools/Files | Uploaded master workflow, uploaded Playbook, official OpenAI Projects help page, generated Markdown file |
| Guardrails | No secrets, no unsafe automation, no fake citations, data level 0-4, admin/tenant dependency flags |
| Template | SOP Library Module |

---

Version: 1.0 | Date: 2026-06-01 | Module: E3 Full SOP Library | Owner: Mel John Dimat | Status: Ready to add to UNGASIS repo