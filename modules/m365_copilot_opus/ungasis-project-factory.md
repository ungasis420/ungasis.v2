# UNGASIS Content Module: Effortless AI Project Factory

> ⚡ Module ID: R4  
> 📂 File: `ungasis-project-factory.md`  
> 🔗 Sources: Master Prompt §12 (12A–12G) + Playbook §13 (Effortless AI Project Factory) + Playbook §14 (One True Dashboard) + Playbook §15–16 (Project Folder & PROJECT_WORKFLOW.md)  
> 🎯 Audience: Beginner / not tech-savvy / ESL / $0 budget  

---

## 📖 Table of Contents

1. [What Is the Project Factory?](#1--what-is-the-project-factory)
2. [The 6-Step Effortless Project Loop](#2--the-6-step-effortless-project-loop)
3. [One-Prompt Project Kickoff Template](#3--one-prompt-project-kickoff-template)
4. [AI Delegation Matrix](#4--ai-delegation-matrix)
5. [Reusable Project Scaffold](#5--reusable-project-scaffold)
6. [Decision Fatigue Reducer](#6--decision-fatigue-reducer)
7. [Quality Gate Automation](#7--quality-gate-automation)
8. [Context Continuity Protocol](#8--context-continuity-protocol)
9. [One True Dashboard](#9--one-true-dashboard)
10. [Putting It All Together — Factory in Action](#10--putting-it-all-together--factory-in-action)

---

## 1. 🏭 What Is the Project Factory?

### The Assembly Line Analogy

Imagine a **factory assembly line** that makes cars:

```text
Raw metal → Cut → Weld → Paint → Inspect → Ship
```

Every car goes through the **same stations**, in the **same order**, with the **same quality checks**. The factory does not reinvent its process for every car.

Your AI projects should work the same way:

```text
Raw idea → Structure → Build → Check → Ship → Learn
```

### Why This Matters for You

| Without a Factory | With a Factory |
|---|---|
| Every project starts from scratch | Every project follows the same loop |
| You forget steps and make mistakes | Steps are automatic — nothing is skipped |
| You spend 30 minutes deciding where to save files | Defaults are pre-decided — just start |
| AI gives inconsistent results | AI gets the same context every time |
| You lose progress between sessions | Handoff templates preserve everything |
| Each project feels overwhelming | Each project feels like filling in a template |

### The Core Idea

> **You do NOT need to think about HOW to start a project every time.**  
> You need a repeatable system that does the thinking for you.  
> The Project Factory IS that system.

---

## 2. 🔄 The 6-Step Effortless Project Loop

```text
🎯 CAPTURE → 📐 SCAFFOLD → 🔨 BUILD → ✅ CHECK → 📦 SHIP → 🎓 LEARN
     │                                                           │
     └───────────────────────── loop ◀──────────────────────────┘
```

Use this loop for **every** project — from a simple SOP document to a full SaaS MVP.

---

### Step 1: 🎯 CAPTURE — Brain Dump the Idea

| Field | Detail |
|---|---|
| **What it is** | You dump everything in your head about the idea. AI structures it into a clean project brief |
| **🤖 What AI does** | Extracts problem, audience, goal, scope, constraints, assumptions, risks from your raw brain dump |
| **👀 What I do** | Provide the raw idea. Review the structured brief. Correct anything wrong |
| **Output** | Structured project brief: Product North Star, target user, pain, assumptions, validation test |
| **Tools** | ChatGPT Enterprise (Projects), M365 Copilot Chat, Notion |
| **Time estimate** | 15–30 minutes |

#### Copy-Paste CAPTURE Prompt

```text
I have a project idea. Here is my brain dump:

[PASTE YOUR RAW IDEA, MESSY IS FINE]

Please structure this into:
1. Product North Star (one sentence: "This helps [WHO] do [WHAT] so they [BENEFIT]")
2. Target user (specific person, not "everyone")
3. Pain point (what problem they have today)
4. Current workaround (how they solve it now)
5. Assumptions (what I'm guessing is true but haven't proven)
6. Risks (top 3 reasons this might fail)
7. Validation test (how to prove/disprove in 48 hours for $0)
8. Suggested scope (3 features max for MVP)
9. NOT-building list (5+ things to skip for now)

Use simple English. I am a beginner.
```

<!-- ADDED: mattpocock/skills absorption — Grilling Before Building -->

##### 🔥 Grilling Gate (Mandatory Before SCAFFOLD)

Before you move to SCAFFOLD, you MUST complete the Grilling Gate. No exceptions for new projects.

**What is it?**
AI interrogates your idea for 15–45 minutes with hard questions. AI must challenge your assumptions — not just agree. The goal is to catch bad ideas, weak assumptions, and missing pieces BEFORE you invest time scaffolding and building.

**🍳 Analogy:** The CAPTURE step is like writing your restaurant idea on a napkin. The Grilling Gate is like showing that napkin to a tough business advisor who pokes holes in your plan BEFORE you sign the lease.

**Gate Rules:**
1. AI asks minimum 10 hard questions about the idea
2. AI must challenge assumptions, not just agree
3. AI must identify the single riskiest assumption
4. AI must confirm shared understanding before proceeding
5. Output is a Grilling Brief — NOT code, NOT designs, NOT a scaffold

**Gate Outcome:**

| Result | What Happens Next |
|---|---|
| ✅ PROCEED | Move to SCAFFOLD with confidence |
| 🟡 REVISE | Go back to CAPTURE. Rewrite the idea based on what grilling revealed. Then grill again. |
| 🔴 KILL | Archive the idea. Move to your next idea. No shame — you saved days of wasted work. |

**Copy-Paste Grilling Gate Prompt:**

```text
Act as a tough but fair product interrogator for the UNGASIS Project Factory.
I just completed CAPTURE for this project:

[PASTE YOUR CAPTURE OUTPUT — Product North Star, target user, pain, assumptions, risks]

GRILLING RULES:
1. Ask at least 10 hard questions, one at a time.
2. Challenge my assumptions — do NOT be agreeable.
3. After grilling, produce a GRILLING BRIEF:
   - Idea summary (in YOUR words)
   - Questions + my answers
   - Top 3 risks
   - Single riskiest assumption
   - Verdict: PROCEED / REVISE / KILL
4. Do NOT create any scaffold, code, or designs yet.

Start grilling. One question at a time.
```

**Grilling Gate Checklist:**

- [ ] 10+ questions asked and answered
- [ ] At least 2 assumptions challenged
- [ ] Riskiest assumption identified
- [ ] Grilling Brief saved
- [ ] Verdict: PROCEED / REVISE / KILL
- [ ] If PROCEED → move to SCAFFOLD

**Updated Factory Flow:**
```
🎯 CAPTURE → 🔥 GRILLING GATE → 📐 SCAFFOLD → 🔨 BUILD → ✅ CHECK → 📦 SHIP → 🎓 LEARN
```

<!-- END ADDED: mattpocock/skills absorption — Grilling Before Building -->

---

### Step 2: 📐 SCAFFOLD — AI Generates the Project Skeleton

| Field | Detail |
|---|---|
| **What it is** | AI creates the full project scaffold: folders, files, data model, task list, screen list, safety checks |
| **🤖 What AI does** | Generates folder structure, file list, PRD-lite, tech stack, UX flow, data model, task breakdown |
| **👀 What I do** | Review the scaffold. Adjust scope. Confirm tech stack. Create the actual folders/files |
| **Output** | PRD-lite, screen list, data model, folder structure, task list, safety checks |
| **Tools** | ChatGPT Enterprise, VS Code (create folders), GitHub (create repo) |
| **Time estimate** | 30–60 minutes |

#### Copy-Paste SCAFFOLD Prompt

```text
Based on this project brief:

[PASTE YOUR STRUCTURED BRIEF FROM STEP 1]

Please generate the project scaffold:
1. Folder structure (use the standard project folder template)
2. List of files to create (README.md, PROJECT_WORKFLOW.md, etc.)
3. PRD-lite (Product Requirements Document — max 1 page)
4. Screen list (max 5 screens with descriptions)
5. Data model (tables and fields for Supabase)
6. Task breakdown (numbered list, ordered by priority)
7. Tech stack recommendation (from my tools: Next.js, Tailwind, Supabase, Cloudflare Pages)
8. Safety checklist (secrets, data level, RLS needed?)
9. Estimated time for each task

Use simple English. Mark anything I need to decide with [DECISION NEEDED].
```

---

### Step 3: 🔨 BUILD — AI Builds While I Review

| Field | Detail |
|---|---|
| **What it is** | AI builds one small piece at a time. You review each piece before moving on. No giant rewrites |
| **🤖 What AI does** | Generates code, creates screens, writes components, connects database |
| **👀 What I do** | Review each piece. Test it. Approve or request changes. Commit working versions |
| **Output** | Working screen, working form, working save/read flow — one at a time |
| **Tools** | VS Code + Cline, GitHub Copilot, ChatGPT (for planning), Supabase |
| **Time estimate** | 1–10 days depending on scope |

#### Build Rules

1. **Make the smallest safe change** — one screen, one feature, one fix at a time
2. **Before editing** — list files you plan to modify
3. **After editing** — show changed files and how to test
4. **Do not rewrite unrelated files** — stay focused
5. **Do not touch secrets** — never modify .env files through AI
6. **Commit after each working piece** — save points, not save-all-at-once

#### Copy-Paste BUILD Prompt (for Cline)

```text
Act as a careful senior developer.
Project: [APP NAME]
Goal for this task: [ONE SMALL CHANGE]
Relevant files: [LIST FILES IF KNOWN]

Rules:
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Do not touch secrets or .env files.
- Before editing, say which files you plan to modify.
- After editing, summarize changed files.
- Give exact test steps.
- Include rollback advice.

Task:
[DESCRIBE THE ONE THING TO BUILD]
```

---

### Step 4: ✅ CHECK — Quality Gates

| Field | Detail |
|---|---|
| **What it is** | You and AI review the built piece against a quality checklist. Catch problems BEFORE sharing |
| **🤖 What AI does** | Runs the quality gate checklist. Flags issues. Suggests fixes |
| **👀 What I do** | Review flagged issues. Approve fixes. Test manually |
| **Output** | Test results, bug list, security checks confirmed, rollback readiness confirmed |
| **Tools** | Browser (manual testing), VS Code, ChatGPT (review code) |
| **Time estimate** | 30–60 minutes per check cycle |

> Full Quality Gate Checklist is in [Section 7](#7--quality-gate-automation) below.

---

### Step 5: 📦 SHIP — Package and Deploy

| Field | Detail |
|---|---|
| **What it is** | You deploy the app (or share the document/tool) publicly or to testers |
| **🤖 What AI does** | Generates README, deployment instructions, feedback form setup |
| **👀 What I do** | Push to GitHub. Connect to Cloudflare Pages. Set up analytics. Share the link |
| **Output** | Public/private link, README, feedback form, analytics (if needed) |
| **Tools** | GitHub, Cloudflare Pages, Tally.so, PostHog/Umami |
| **Time estimate** | 1–3 hours |

#### Ship Checklist

- [ ] Code pushed to GitHub (private repo)
- [ ] Deployed to Cloudflare Pages (or Netlify)
- [ ] README exists and is accurate
- [ ] Feedback form created (Tally.so)
- [ ] Analytics added (PostHog or Umami) — if public
- [ ] Support/contact method exists
- [ ] Rollback plan documented

---

### Step 6: 🎓 LEARN — Improve from Evidence

| Field | Detail |
|---|---|
| **What it is** | You review what happened. What worked? What broke? What do users want? Then you start the loop again |
| **🤖 What AI does** | Analyzes feedback, suggests priorities, identifies patterns |
| **👀 What I do** | Decide: continue (next feature), pivot (change direction), or kill (stop the project) |
| **Output** | Top problems identified, next sprint planned, continue/pivot/kill decision |
| **Tools** | Tally.so (feedback), PostHog (analytics), Notion (planning), ChatGPT (analysis) |
| **Time estimate** | 1–2 hours weekly |

#### Copy-Paste LEARN Prompt

```text
Here is the feedback from my latest round of testing:

[PASTE FEEDBACK SUMMARY, ANALYTICS DATA, OR USER COMMENTS]

Please help me:
1. Identify the top 3 problems users reported
2. Rank them by impact (which affects the most users?)
3. Suggest the simplest fix for each
4. Recommend: should I continue, pivot, or kill this project?
5. If continue: what should my next 3 tasks be?
6. If pivot: what direction should I explore?

Use simple English. Be honest — if the data says stop, tell me.
```

---

### The Loop Visual

```text
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   🎯 CAPTURE ──▶ 📐 SCAFFOLD ──▶ 🔨 BUILD            │
│       │                              │                  │
│       │                              ▼                  │
│   🎓 LEARN ◀──── 📦 SHIP ◀──── ✅ CHECK               │
│       │                                                 │
│       └──── (loop back to CAPTURE for next feature) ───┘│
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 3. 📋 One-Prompt Project Kickoff Template

This is the **single prompt** that starts ANY project. Copy it, fill in the blanks, and paste it into ChatGPT, Claude, or Copilot Chat.

```text
═══════════════════════════════════════════════
ONE-PROMPT PROJECT KICKOFF
═══════════════════════════════════════════════

I want to start a new project. Here are the details:

IDEA:
[Describe your idea in 2–5 sentences. Be as specific as possible.]

WHO IS IT FOR:
[Describe the specific person who has this problem. Age, job, situation.]

WHAT PROBLEM DOES IT SOLVE:
[Describe the pain point. What is frustrating about their current method?]

DESIRED OUTCOME:
[What should the user be able to do after using your tool/app?]

MY CONSTRAINTS:
- Budget: $0 upfront
- Tools: ChatGPT Enterprise, M365 Copilot, VS Code + Cline, GitHub, Supabase, Cloudflare Pages
- Timeline: [X days/weeks]
- Skill level: Beginner (AI does the heavy lifting, I review)
- Data sensitivity: [Level 0 demo / Level 1 personal / Level 2 private]

Please generate:
1. Product North Star (one sentence)
2. Target user persona (1 paragraph)
3. Problem validation questions (5 questions to ask real users)
4. Tech stack recommendation (using my tools)
5. MVP scope (exactly 3 features)
6. NOT-building list (5+ items)
7. Screen list (max 5 screens with descriptions)
8. Data model (tables and fields)
9. Build plan (numbered tasks in priority order)
10. Estimated effort per task (for a beginner)
11. Top 3 risks and how to mitigate them
12. First action I should take TODAY

Use simple English. I am not a native English speaker.
```

### What You Get Back

| Output | What It Is |
|---|---|
| Product North Star | One sentence that defines your project's purpose |
| Target user persona | Who exactly you're building for |
| Validation questions | Questions to ask real people before building |
| Tech stack | Which tools to use and why |
| MVP scope | Exactly 3 features — no more |
| NOT-building list | Features to deliberately skip |
| Screen list | 3–5 screens with descriptions |
| Data model | Database tables and fields |
| Build plan | Ordered task list |
| Effort estimates | Time estimate per task |
| Risks | What might go wrong and how to handle it |
| First action | What to do right now |

---

## 4. 🤖 AI Delegation Matrix

Which AI tool should you use for which task? Do not use the wrong tool for the job.

| Task Type | Primary AI Tool | Backup Tool | Why This Primary |
|---|---|---|---|
| **Research & analysis** | ChatGPT Enterprise (Deep Research) | M365 Copilot (Researcher agent ⚙️) | Deep Research can search multiple sources systematically |
| **Planning & architecture** | ChatGPT Enterprise (Projects) | M365 Copilot Chat | Projects keep context across sessions |
| **Document drafting** | M365 Copilot (Word) | ChatGPT Enterprise (Canvas) | Word integration preserves formatting and exports cleanly |
| **Code generation** | VS Code + Cline | GitHub Copilot | Cline can read, write, and edit multiple files across a project |
| **Code editing / fixing** | VS Code + Cline | GitHub Copilot (inline) | Cline handles multi-file edits; Copilot handles single-line completions |
| **Data analysis** | ChatGPT Enterprise (Data Analysis) | M365 Copilot (Excel) | ChatGPT can process uploads and create charts |
| **Visual design** | Figma + v0.dev | ChatGPT (describe → Bolt.new) | v0.dev generates React+Tailwind code from descriptions |
| **Automation building** | Power Automate ⚙️ | Make.com (free tier) | Already included in M365. Power Automate integrates natively |
| **Testing & QA** | ChatGPT (review code) | Manual browser testing | AI reviews code logic; you test the actual app in a browser |
| **Presentation creation** | M365 Copilot (PowerPoint) | ChatGPT (outline) → manual build | Copilot in PowerPoint creates slides from outlines |

### The Multi-AI Workflow

```text
PLANNER AI ──▶ BUILDER AI ──▶ REVIEWER AI ──▶ OWNER (YOU)
   │                │               │              │
ChatGPT          Cline/         ChatGPT        Decisions,
Enterprise       Copilot        (review)       approvals,
(strategy)       (code)         (QA check)     testing,
                                               final say
```

| Role | Who | Responsibility |
|---|---|---|
| **Planner** | ChatGPT Enterprise / M365 Copilot | Strategy, requirements, roadmap, risk review |
| **Builder** | VS Code + Cline / GitHub Copilot | Code, automations, documents, dashboards, prototypes |
| **Reviewer** | ChatGPT Enterprise / Claude | QA, security, accuracy, completeness, beginner clarity |
| **Owner** | **YOU** | Decisions, approvals, testing, final publishing |

> **Rule:** Maintain a **single source of truth** (GitHub for code, Notion for plans). Do not let different AIs create conflicting versions.

---

## 5. 📁 Reusable Project Scaffold

Use this folder structure for every coded or serious project. Copy it. Do not reinvent it.

### Standard Folder Structure

```text
my-app/
  README.md
  PROJECT_WORKFLOW.md
  .env.example
  .gitignore
  CHANGELOG.md
  docs/
    DECISIONS.md
    TEST_PLAN.md
    DEPLOYMENT.md
    SECURITY_CHECKLIST.md
    DATA_MODEL.md
    USER_FEEDBACK.md
  demo-data/
    sample-data.csv
  screenshots/
  src/
  tests/
  .github/
    workflows/
      ci.yml
```

### File Purpose Table

| File | Purpose | AI Generates? | Never Put Here |
|---|---|---|---|
| **README.md** | How to understand/run the project | ✅ AI drafts, you review | Real secrets |
| **PROJECT_WORKFLOW.md** | Project control page (goal, status, next tasks) | ✅ AI drafts, you fill in | Passwords |
| **.env.example** | Fake names of required environment variables | ✅ AI generates | Real keys! |
| **.gitignore** | Files Git should ignore (node_modules, .env.local) | ✅ AI generates | Do not ignore source files blindly |
| **CHANGELOG.md** | What changed and when | 🟡 You update after each milestone | Private customer data |
| **DECISIONS.md** | Why choices were made (tech stack, design, scope) | 🟡 You write, AI helps structure | Private credentials |
| **TEST_PLAN.md** | What to test and how | ✅ AI drafts, you review | Production secrets |
| **DEPLOYMENT.md** | How to deploy the app | ✅ AI drafts | Live secret values |
| **SECURITY_CHECKLIST.md** | Safety checks for the project | ✅ AI drafts, you verify | Actual passwords |
| **DATA_MODEL.md** | Tables, fields, and relationships | ✅ AI generates from your description | Regulated data |
| **USER_FEEDBACK.md** | Anonymized feedback from testers/users | 🟡 You update | Names/emails unless approved |
| **demo-data/** | Fake safe data for testing and demo | ✅ AI generates | Real user data |
| **screenshots/** | App screenshots for portfolio/README | ❌ You take them | Screenshots with real secrets visible |

---

## 6. 🧠 Decision Fatigue Reducer

Stop wasting energy on decisions that already have good defaults. Use these. Override only when you have a specific reason.

| Decision | Default Choice | Why | When to Override |
|---|---|---|---|
| **Where to store project files?** | GitHub (private repo) | Free, version-controlled, rollback-safe, industry standard | Never — always use GitHub for code |
| **Where to plan the project?** | Notion (free) | Fast, flexible, free for personal use | If your employer requires SharePoint |
| **Which AI to start with?** | ChatGPT Enterprise (Projects) | Best for sustained multi-session planning | Use M365 Copilot for Office document tasks |
| **Which AI for coding?** | VS Code + Cline (with cloud model) | Reads/writes multiple files, understands project context | Use GitHub Copilot for quick inline completions |
| **Which framework for web apps?** | Next.js + Tailwind CSS + shadcn/ui | Modern, free, massive ecosystem, AI knows it well | Astro for static-only sites, Vite for simpler SPAs |
| **Where to host for free?** | Cloudflare Pages | Unlimited bandwidth, commercial use OK, free | Netlify if Cloudflare setup is confusing. ⚠️ NOT Vercel Hobby for commercial |
| **How to store data?** | Supabase (free tier) | PostgreSQL + Auth + Storage + API, all free | Firebase if you need Firestore-style NoSQL |
| **Which font?** | Inter (or system font stack) | Clean, readable, free, professional | Never override for MVP |
| **Which design system?** | shadcn/ui + Tailwind | Production-quality, accessible, copy-paste | Never override for MVP |
| **Which payment processor?** | Lemon Squeezy | Merchant of Record, handles global taxes, $0/mo | Stripe when revenue >$5K/mo and you can handle tax compliance |
| **Which analytics?** | PostHog (free: 1M events/mo) | Product analytics + session replays, generous free tier | Umami for simpler, privacy-first tracking |
| **Which form builder?** | Tally.so (free: unlimited) | Beautiful, free, unlimited forms and submissions | Google Forms if you need spreadsheet integration |
| **Which error tracker?** | Sentry (free tier) | Industry standard, good free tier | App logs for very simple projects |
| **Which uptime monitor?** | UptimeRobot (free) | Monitors up to 50 URLs for free | Not needed until you have a public link |

> 🧠 **The point:** Make these decisions ONCE. Use these defaults for EVERY project. Only override when you have a clear, specific reason.

---

## 7. ✅ Quality Gate Automation

Run this checklist **before** sharing or deploying ANYTHING. This is your "quality inspector" at the factory.

### The Quality Gate Checklist

| # | Gate | What to Verify | How to Verify | Pass Criteria | Quick Fix if Fail |
|---|---|---|---|---|---|
| 1 | **Functionality** | Does the main workflow work end to end? | Open app → sign up → do main action → see result | User can complete the core flow without errors | Debug the broken step. Do not move forward until the core flow works |
| 2 | **Security** | Are secrets safe? Is RLS enabled? No keys in frontend? | Check `.env.local` exists. Search code for `service_role`. Check GitHub for accidentally committed `.env` | No secrets in public code. RLS enabled on all Supabase tables | Remove secrets immediately. Rotate exposed keys. Enable RLS |
| 3 | **Data** | Is the right data level being used? Is demo data clearly fake? | Review data classification. Check that test data does not contain real names/emails | Data level matches project stage. Demo data is obviously fake | Replace real data with fake data. Update data classification |
| 4 | **Accessibility** | Color contrast ≥4.5:1? Labels on inputs? Keyboard navigation? | Use browser DevTools contrast checker. Tab through the app | Basic accessibility passes (contrast, labels, focus rings) | Add labels, fix contrast, add focus rings. See R1 checklist |
| 5 | **Mobile** | Works on phone? No horizontal scroll? Touch targets ≥44px? | Open on real phone or resize browser to 375px | All content visible. Main flow completable on mobile | Use Tailwind responsive classes. Stack elements vertically |
| 6 | **Performance** | Page loads in <3 seconds? No giant images? | Open browser DevTools → Network tab. Check load time | Main page loads in <3 seconds on normal connection | Compress images. Remove unused imports. Check for heavy libraries |
| 7 | **Documentation** | README exists? PROJECT_WORKFLOW updated? Deployment instructions clear? | Check GitHub repo for files | README + PROJECT_WORKFLOW exist and are current | Generate with AI. Use templates from Section 5 |
| 8 | **Portfolio-ready** | Screenshots exist? Demo data? No real secrets? Honest attribution? | Review `/screenshots/`. Check for exposed data | Project is safe and presentable | Take screenshots. Remove real data. Add AI attribution note |

### Quick Reference Card

```text
Before sharing ANYTHING, verify:
  ✅ Core flow works
  ✅ Secrets are safe
  ✅ Data is appropriate
  ✅ Accessible basics pass
  ✅ Mobile works
  ✅ Loads fast
  ✅ Docs exist
  ✅ Portfolio-safe (no real data, honest about AI)
```

---

## 8. 🔗 Context Continuity Protocol

AI tools forget everything between sessions. This system preserves your project context so you never lose progress.

### Session Start Template

Paste this at the beginning of every new AI session:

```text
═══════════════════════════════════════
SESSION START — CONTEXT RESTORE
═══════════════════════════════════════

Project: [APP NAME]
Current goal: [WHAT YOU'RE WORKING ON RIGHT NOW]
Current stage: [Idea / Prototype / MVP / Beta / Public / etc.]
Stack: [Next.js + Tailwind + Supabase + Cloudflare Pages]
Last session summary:
- [WHAT YOU COMPLETED LAST TIME]
- [DECISIONS MADE]
- [FILES CREATED OR MODIFIED]

Known bugs/issues:
- [LIST ANY CURRENT PROBLEMS]

Next 3 tasks:
1. [TASK 1]
2. [TASK 2]
3. [TASK 3]

Safety notes:
- [DATA LEVEL, SECRETS STATUS, RLS STATUS]

Please continue from where we left off. Start with task 1.
```

### Session End Template

Paste this at the end of every session to generate a handoff:

```text
Create a handoff summary for my next AI session.

Include:
1. Project name
2. Current goal
3. Current stage
4. Stack/tools
5. Decisions made today
6. Files created or modified today
7. Known bugs
8. Next 3 actions
9. Safety notes (secrets, data level, RLS)
10. Copy-paste prompt to continue next session

Keep it compact and beginner-friendly.
```

### PROJECT_WORKFLOW.md Template

This is your **project state file** — the single source of truth for every project. Copy this into every project:

```markdown
# Project Workflow

Project name:
Goal:
Main user:
Pain solved:
Current stage:
Rigor level:
Data level:
Tools used:
GitHub repo:
Live app link:
Database:
How to run locally:
How to deploy:
Known bugs:
Next 3 tasks:
What not to build yet:
Rollback plan:
Last updated:
```

### Cross-Tool Sync Strategy

| Tool | What It Stores | Sync Method |
|---|---|---|
| **GitHub** | Code + PROJECT_WORKFLOW.md + docs | Push after every working change |
| **Notion** | Plans, ideas, feedback, dashboard | Update manually after each session |
| **ChatGPT Projects** | Conversation history + project instructions | Keep project instructions updated |
| **Supabase** | Database, auth, storage | Auto-synced (cloud service) |
| **Cloudflare Pages** | Deployed app | Auto-deploys from GitHub push |

### Single Source of Truth

```text
CODE        → GitHub (always)
PLANS       → Notion (or Markdown in GitHub)
STATE       → PROJECT_WORKFLOW.md in the repo
DATABASE    → Supabase dashboard
DEPLOYMENT  → Cloudflare Pages dashboard
FEEDBACK    → Tally.so responses + USER_FEEDBACK.md
METRICS     → PostHog dashboard
```

> **Rule:** When in doubt about the current state of any project, open `PROJECT_WORKFLOW.md`. It should always be current.

---

## 9. 📊 One True Dashboard

Keep **one** project tracker for ALL your projects. Do not scatter project info across 10 different tools.

### Dashboard Fields (Merged from All Sources)

| Field | Example | Why Track This |
|---|---|---|
| Project name | Tutor Notes MVP | Quick identification |
| Stage | Prototype | Know your rigor level (see R3) |
| Main user | Solo tutor | Stay focused on who you're building for |
| Problem | Loses lesson notes | Remember the pain you're solving |
| Current status | Testing with 5 users | Know where you are right now |
| Next action | Create Tally feedback form | Know what to do next |
| Stack | Figma + Bolt + Supabase | Track tools per project |
| GitHub repo | link | Quick access to code |
| Live link | link | Quick access to deployed app |
| Data level | Level 0/1 | Know security requirements |
| Risk level | Low / Medium / High | Know rigor requirements |
| Monetization status | Not yet / Paid pilot / Active | Track revenue progress |
| Blocker | Unclear auth | Surface problems |
| Last updated | 2026-05-31 | Know if info is stale |

### Copy-Paste Markdown Dashboard Template

```markdown
# 📊 My Project Dashboard

Last updated: [DATE]

| Project | Stage | User | Problem | Status | Next Action | Stack | GitHub | Live | Data | Risk | Revenue | Blocker | Updated |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Name] | [Stage] | [Who] | [Pain] | [Status] | [Next] | [Stack] | [Link] | [Link] | [Level] | [L/M/H] | [Status] | [Issue] | [Date] |
| [Name] | [Stage] | [Who] | [Pain] | [Status] | [Next] | [Stack] | [Link] | [Link] | [Level] | [L/M/H] | [Status] | [Issue] | [Date] |
```

### Where to Store the Dashboard

| Option | Best For | Effort |
|---|---|---|
| **Markdown file** (`PROJECT_INDEX.md`) | Simplest. Store in a GitHub repo or on your desktop | ⭐ Easiest |
| **Notion page** | Best if you already use Notion daily | ⭐ Easy |
| **Excel in OneDrive** | Best if you want filtering and sorting | ⭐⭐ Medium |
| **SharePoint List** | Best if you want to connect to Power Automate/Power BI | ⭐⭐⭐ More setup |

> **Default recommendation:** Start with a **Markdown file** or **Notion page**. Upgrade to Excel or SharePoint List only when you have 5+ active projects.

---

## 10. 🎬 Putting It All Together — Factory in Action

Let's walk through the entire Factory loop for a real example: the **"Tutor Notes"** app.

### The Idea

> A solo tutor who gives private lessons loses track of what each student learned, what homework was assigned, and what to do next session.

### Step 1: 🎯 CAPTURE

You paste the brain dump into ChatGPT. AI returns:

| Field | Output |
|---|---|
| **North Star** | Tutor Notes helps solo tutors track student progress so they never forget what happened last session |
| **Target user** | Solo tutor, 3–10 students, manages lessons on phone |
| **Pain** | Uses scattered notes (paper, WhatsApp, memory). Forgets details. Wastes first 5 minutes of each session catching up |
| **MVP scope** | 1) Add student 2) Record session note 3) View student history |
| **NOT building** | Scheduling, payments, AI lesson plans, multi-tutor teams, mobile app, analytics |

### Step 2: 📐 SCAFFOLD

AI generates the folder structure, data model, and task list:

```text
tutor-notes/
  README.md
  PROJECT_WORKFLOW.md
  .env.example
  .gitignore
  src/
  docs/
  demo-data/
    students.json
    notes.json
```

**Data model:** `students` table (id, name, subject, created_at) + `notes` table (id, student_id, content, date, next_action)

**Tasks:** 1) Set up Next.js project 2) Create Supabase tables 3) Build student list page 4) Build add-note form 5) Build student detail page 6) Connect to Supabase 7) Test 8) Deploy

### Step 3: 🔨 BUILD

You work through the task list one item at a time using Cline:

- Day 1: Task 1–2 (project setup + database)
- Day 2–3: Task 3–4 (student list + add-note form)
- Day 4: Task 5–6 (student detail + Supabase connection)
- Day 5: Task 7 (manual testing)

### Step 4: ✅ CHECK

You run the Quality Gate:

| Gate | Result |
|---|---|
| Functionality | ✅ Can add student, record note, view history |
| Security | ✅ RLS enabled, no secrets in code |
| Data | ✅ Using demo data only |
| Accessibility | 🟡 Missing labels on 2 inputs — fixed |
| Mobile | ✅ Cards stack correctly on phone |
| Performance | ✅ Loads in 1.2 seconds |
| Documentation | ✅ README + PROJECT_WORKFLOW exist |
| Portfolio-ready | ✅ Screenshots taken, demo data only |

### Step 5: 📦 SHIP

- Push to GitHub → Connect to Cloudflare Pages → Auto-deploys
- Create Tally feedback form → Share link with 5 tutor friends
- Add PostHog snippet for basic analytics

### Step 6: 🎓 LEARN

After 1 week:
- 3/5 tutors used it. 2 said they love it. 1 said "I need to see next session date"
- **Decision:** Continue. Add a "next session" field to notes
- **Next sprint:** Add next-session date, improve mobile nav, collect more feedback

```text
🎯 CAPTURE ──▶ 📐 SCAFFOLD ──▶ 🔨 BUILD ──▶ ✅ CHECK ──▶ 📦 SHIP ──▶ 🎓 LEARN
                                                                          │
     Loop! Add "next session" feature ◀───────────────────────────────────┘
```

---

## 🏁 Summary: The Factory Mantra

> **Every project. Same loop. Same quality. Less thinking. More shipping.**

```text
🎯 CAPTURE  — Dump the idea. AI structures it.
📐 SCAFFOLD — AI builds the skeleton. You approve.
🔨 BUILD    — AI codes. You review. One piece at a time.
✅ CHECK    — Run the quality gates. Fix before sharing.
📦 SHIP     — Deploy. Share. Collect feedback.
🎓 LEARN    — Review evidence. Decide: continue, pivot, or kill.
             Then loop back to CAPTURE for the next feature.
```

---

> **UNGASIS Content Module: Effortless AI Project Factory**  
> Module ID: R4  
> Version: 1.0  
> Date: 2026-05-31  
> Sources: AI Builder's Master Workflow Prompt v4.0 §12 (12A–12G) + Unified Beginner Solopreneur App Building Workflow Playbook v3.0 §13–16  
> Author: UNGASIS Content Absorption Pipeline  
> Status: ✅ Complete  
