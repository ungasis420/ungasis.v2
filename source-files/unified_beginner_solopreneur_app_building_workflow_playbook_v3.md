# Unified Beginner Solopreneur App Building Workflow & Playbook v3.0

**Date prepared:** 2026-05-31  
**Audience:** beginner / no-code learner / ESL founder / aspiring solopreneur  
**Budget posture:** $0 upfront where possible  
**Primary strategy:** validate with no-code and AI builders first, then build owned code only when the problem is proven  
**Location note:** Manila / Philippines context included for payments and tax caution  
**Format:** Markdown playbook you can reuse as your personal app-building manual

---

## 0. What this merged playbook is

This is the unified version of three sources:

1. The previous **Beginner App Building Tool Stack and Workflow Guide**.
2. The previously merged **Unified Beginner Solopreneur App Building Playbook**.
3. The newly attached **AI Builder's Master Workflow Prompt & Solopreneur App Playbook v4.0**.

The new v4.0 file is strong because it adds a full AI builder operating system: source-first research, data classification, phased delivery, output-depth control, no-fake-completion rule, beginner recovery mode, project type routing, free-first stack lanes, Universal Gold Skeleton, prompt libraries, SOPs, glossary, and a solopreneur app builder playbook.

The earlier beginner guide is strong because it keeps the workflow simple:

```text
Idea -> Plan -> Build first version -> Save to GitHub -> Edit/debug -> Test -> Deploy -> Monitor -> Improve
```

This merged playbook keeps the best of both:

- simple enough to use today
- structured enough to grow into real apps
- safe enough for public launch later
- not overloaded with enterprise complexity too early

---

## 1. Key corrections from the cross-check

Some claims in the attached files were useful but needed tightening. Tool pricing and terms change often, so treat this table as a decision guide, not legal or financial advice.

| Area | Correction / merge decision | Confidence | Action for you |
|---|---|---:|---|
| Firebase Studio | Firebase Studio is being sunset on **2027-03-22**. Existing deployed apps continue, and core Firebase products continue. | High | Use Firebase Studio only for legacy/migration. Prefer Google AI Studio, Bolt, Replit, or VS Code for new work. |
| Google AI Studio Build | Good for fast app prototypes. Current docs describe natural-language app building, web apps with React frontend and Node.js runtime, native Android generation, server-side secrets, ZIP/GitHub export, and Cloud Run deployment. | High | Use as acceleration, not as your permanent runtime. Export to GitHub when serious. |
| Vercel Hobby | Vercel Hobby is for personal, non-commercial use. | High | Fine for learning. Do not use it as your default monetized app host. |
| Cloudflare Pages | Official docs verified Free plan limits like 500 builds/month and file/custom-domain/project limits. I did **not** verify every commercial-use/bandwidth claim in this pass. | Medium-high | Good candidate for public apps, but re-check terms before paid launch. |
| Netlify Free | Official pricing confirms Free plan with deploys, custom domains with SSL, Functions/AI/database/storage options, and monthly credits/hard limits. | High | Strong beginner hosting choice. Watch credit limits. |
| Supabase Free | Official billing docs verified two free projects, 500 MB database per project, 50k monthly active users, 1 GB storage, and other quotas. | High | Good default backend. Monitor database size and auth users. |
| Supabase inactivity pause | The attached file claimed 7-day inactivity pause. I could not verify this from official Supabase docs in this pass. | Low / unverified | Do not build decisions around this until manually confirmed. |
| Bolt.new Free | Official pricing verified Free plan with 300K tokens/day and 1M tokens/month. | High | Great for fast prototypes; not your long-term source of truth. |
| Lovable Free credits | The official pricing page parsed in this pass clearly showed Pro details, but the exact free credit claim in the file was not verified from parsed official text. | Low / needs manual check | Treat Lovable free-credit numbers as manual-check before relying. |
| v0 Free | Official pricing verified Free plan with $5 monthly credits and daily message limits. | High | Use for UI components, not full backend product. |
| Lemon Squeezy | Official pricing verified $0/month and 5% + $0.50 transaction fee, with Merchant of Record and tax handling language. | High | Strong for global digital product revenue tests. Re-check payout/country details. |
| Lemon Squeezy 1% international payout fee | The attached file claimed this for Philippines impact. I did not verify it from an official source in this pass. | Low / unverified | Manually confirm before financial planning. |
| Stripe in Philippines | Stripe global availability page did not list the Philippines as a supported country/region in the checked official source. | High | Use Stripe only if you have a supported country/entity/account. Consider PayMongo for PH local payments. |
| PayMongo | Official pricing verified no setup/monthly/hidden fees language and PH payment method rates. | High | Good PH-local payment option; compare with Lemon Squeezy based on product type. |
| PostHog | Official pricing verified usage-based pricing and first 1M events/month free for product analytics. | High | Add after private beta or public link, not day one. |
| Tally | Official pricing verified unlimited forms and submissions under fair-use guidelines. | High | Best free-first validation form tool. |
| Notion / Figma | Official pricing verified useful free plans for individuals/Starter use. | High | Use for planning and design. |

---

## 2. The simple mental model

Think of app building like opening a small food stall before a full restaurant.

| Startup step | Food stall analogy | App action |
|---|---|---|
| Idea | Pick one dish | Pick one painful problem |
| Validation | Let people taste | Ask 5-10 real users |
| Prototype | Food sample | Clickable mockup or AI-generated prototype |
| MVP | Small menu | Working app with one main workflow |
| Launch | Open the stall | Share public/private link |
| Monetize | Charge for best dish | Paid pilot, subscription, one-time fee |
| Scale | Better kitchen | Better backend, monitoring, support, security |

Your first goal is **not** to build a huge SaaS.

Your first goal is to prove this:

```text
A real person has a painful problem.
My small app helps them.
They use it again, recommend it, or pay for it.
```

---

## 3. Your recommended path

### The default path

```text
No-code validation
-> AI-generated clickable prototype
-> GitHub-backed owned code if users care
-> small public MVP
-> monetization test
-> improve from real usage
```

### Why this path fits you

| Your context | What it means | Best response |
|---|---|---|
| Beginner / not tech-savvy yet | You need fewer tools and clear steps | Use a repeatable workflow |
| No-code experience | You can validate without code | Start with Tally, Notion, Figma, Softr/Glide/Bolt |
| ESL / Filipino learner | Avoid jargon and giant tool dumps | Simple English, examples, checklists |
| Solopreneur | You need leverage | AI drafts, you decide |
| $0 upfront | You need free-first tools | Free tiers, open source, already-owned tools |
| Wants monetization | You need real validation and payment caution | Do not add payments too early |
| Wants scale | You need ownership later | GitHub + portable code + documented decisions |

---

## 4. Rigor Dial: choose the right strictness

Use the lightest safe rigor for your stage.

| Stage | Goal | Data allowed | Build now | Do not build yet | Payment? | Security level |
|---|---|---|---|---|---|---|
| Learner | Learn tools | Demo data only | toy app, task tracker | real users, payments | No | Basic secret safety |
| Personal prototype | Use it yourself | Level 0-1 | simple app, local data | complex auth, subscriptions | No | Basic |
| Private prototype | Test with trusted few | Level 0-1, maybe limited Level 2 | login if needed, feedback | public launch, ads | No | Stronger privacy |
| Private beta | 5-20 users | Level 0-2 | auth, monitoring, support path | high-risk automations | Maybe manual paid pilot | RLS, backups, logs |
| Public MVP | Public users | Level 0-2 only unless reviewed | privacy page, terms, monitoring | regulated claims | Yes, carefully | review + rollback |
| Monetized MVP | Real payments | Depends on app | payments, refund policy, support | advanced scale infra | Yes | stronger legal/tax/privacy check |
| Commercial SaaS | Repeatable business | Controlled production data | observability, support, CI/CD | casual manual processes | Yes | formal QA/security/pro review |
| High-risk/regulated | Legal/medical/finance/etc. | strict only | expert-reviewed product | DIY public launch | Only after review | professional review required |

**Default assumption:** you are at **Learner -> Personal Prototype** until you explicitly launch publicly or charge money.

---

## 5. Data classification rules

Use these levels in every project.

| Level | Name | Examples | Allowed tools |
|---|---|---|---|
| Level 0 | Public demo data | fake users, sample tasks, dummy orders | any normal app builder, public repo |
| Level 1 | Personal non-sensitive | learning notes, simple to-do list | trusted tools, private repo preferred |
| Level 2 | Private personal | personal finances, private journal, personal docs | local files, trusted private tools only |
| Level 3 | Company/internal | client data, internal reports, employee data | approved work/M365 environment only |
| Level 4 | Secrets/regulated | API keys, passwords, tokens, PII, medical, legal, financial data | never paste into AI chats, public repos, frontend code, screenshots |

### Hard rule

```text
Never paste API keys, tokens, passwords, private certificates, service-role keys, or connection strings into AI chats, public GitHub repos, screenshots, HTML manuals, or frontend code.
```

---

## 6. Three build lanes

### Lane A - No-code / AI-builder validation

Best when you want speed and minimum technical stress.

| Layer | Recommended tools | Use for |
|---|---|---|
| Planning | ChatGPT / UNGASIS, Notion | idea, scope, validation plan |
| Forms | Tally / Google Forms | waitlist, survey, feedback |
| Design | Figma / Excalidraw | simple screens and flows |
| Prototype | Bolt, Google AI Studio, Lovable, v0 | clickable prototype / first draft |
| Simple app | Softr, Glide, Bubble | portal, directory, dashboard, form app |
| Data | Airtable, Google Sheets, Softr DB | simple records |

**Use when:** you are validating the idea.  
**Avoid when:** you need owned code, custom backend, lower cost at scale, or complex logic.  
**Upgrade trigger:** users prove demand and ask for repeated use or payment.

---

### Lane B - Low-code visual builder

Best when you need more structure but still prefer visual building.

| Layer | Recommended tools | Use for |
|---|---|---|
| App UI | FlutterFlow, Softr, Power Apps | visual app building |
| Database | Supabase, Firebase, Dataverse/SharePoint Lists | user data |
| Automation | Make, Zapier, Power Automate | workflow connections |
| Analytics | PostHog, Umami, Power BI | usage and reporting |

**Use when:** your project is business-process-heavy, mobile-friendly, or Microsoft/Power Platform fits better.  
**Avoid when:** you want full custom-code ownership or zero platform lock-in.  
**Upgrade trigger:** repeated business use, multiple users, role permissions, or real operations.

---

### Lane C - AI-assisted custom app

Best when you want a real app you can own and scale.

| Layer | Recommended tools | Use for |
|---|---|---|
| Source of truth | GitHub | code history and rollback |
| Editor | VS Code Desktop / vscode.dev / Codespaces | editing and running code |
| AI coding | GitHub Copilot, Cline, ChatGPT, local Ollama | code help |
| Frontend | Next.js / React / Tailwind / shadcn/ui | app screens |
| Backend | Supabase / Firebase / Neon | database, auth, storage |
| Hosting | Netlify / Cloudflare Pages / commercial-suitable host | public link |
| Monitoring | Sentry / UptimeRobot / PostHog | errors, uptime, product usage |

**Use when:** you have validation and want ownership.  
**Avoid when:** you cannot yet test, review, or rollback AI-generated code.  
**Upgrade trigger:** real users, private data, payments, or app reliability needs.

---

## 7. Recommended hybrid strategy: Lane A + Lane C

This is the best path for you.

```text
Week 1: Validate pain with no-code.
Week 2: Build clickable prototype with AI builder.
Week 3: If people care, create GitHub repo and start owned MVP.
Week 4: Deploy small, test with users, add payment only if value is proven.
```

### Why not go straight to code?

Because code is expensive in time and attention, even when AI helps.

A bad product with good code is still a bad product.

### Why not stay forever in no-code?

Because serious apps may hit limits:

- user limits
- record limits
- workflow limits
- design limits
- export limits
- monthly cost growth
- vendor lock-in

### Correct balance

```text
No-code proves the demand.
AI builders show the experience.
GitHub-backed custom code gives long-term ownership.
```

---

## 8. Default tool stack by stage

### Stage 1 - Idea and validation

```text
ChatGPT / UNGASIS + Notion + Tally + Figma / Excalidraw
```

Use this to define the problem and talk to users.

### Stage 2 - Clickable prototype

```text
Bolt or Google AI Studio or Lovable + Figma + Tally
```

Use this to show the idea to testers.

### Stage 3 - Simple no-code MVP

```text
Softr or Glide or Bubble + Airtable / Google Sheets / Softr DB + Tally
```

Use this for portals, directories, form apps, dashboards, or simple marketplaces.

### Stage 4 - Owned MVP

```text
GitHub + VS Code / Codespaces + Next.js + Tailwind + Supabase + Netlify / Cloudflare Pages
```

Use this when users prove demand and you want code ownership.

### Stage 5 - Public beta

```text
GitHub Actions + Sentry + UptimeRobot + PostHog + privacy page + feedback form
```

Use this before more users see the app.

### Stage 6 - Monetization test

```text
Lemon Squeezy / PayMongo / Stripe-if-supported + refund policy + support channel + analytics
```

Use payment only when value is validated.

---

## 9. Tool map: ranked and practical

Do not use every tool. Pick one per job.

| Job | Best default | Good alternatives | Use when | Watch out |
|---|---|---|---|---|
| Project HQ | Notion | OneNote, Google Docs, Markdown | planning, notes, roadmap | keep it simple |
| Validation form | Tally | Google Forms, Microsoft Forms | survey, waitlist, feedback | do not ask too many questions |
| Simple design | Figma | Excalidraw, paper | screens, wireframes | do not spend weeks designing |
| AI prototype | Google AI Studio / Bolt | Lovable, Replit, v0 | fast draft | export/save to GitHub when serious |
| No-code app | Softr | Glide, Bubble | portals, directories | platform lock-in |
| Code home | GitHub | GitLab | rollback, history | never commit secrets |
| Editor | VS Code Desktop | vscode.dev, Codespaces | edit/run code | Codespaces has quotas |
| Frontend | Next.js + Tailwind | React/Vite, Astro | custom web app | too technical before validation |
| Backend | Supabase | Firebase, Neon | auth, DB, storage | secure RLS and monitor quotas |
| Hosting | Netlify / Cloudflare Pages | Firebase Hosting, Vercel Pro | public app | verify commercial terms |
| Payments PH/global | Lemon Squeezy / PayMongo | Stripe if supported | revenue test | taxes/legal/refunds |
| Analytics | PostHog | Umami, Plausible, simple logs | product usage | event volume can cost later |
| Error tracking | Sentry | Logtail, app logs | bugs after launch | do not add too early |
| Uptime | UptimeRobot | Better Stack, Checkly | check public link | not needed for private draft |
| Automation | Make / Power Automate | Zapier, n8n | connect tools | human approval for risky actions |
| API testing | Postman | Thunder Client, Hoppscotch | test backend | not needed for simple no-code |

---

## 10. Project type router

Before choosing tools, classify the project.

| Project type | Simplest safe route | Coding needed? | Hosting needed? | Max safe data level at start |
|---|---|---:|---:|---|
| Document / SOP | ChatGPT + Notion/Word | No | No | Level 1 |
| Research guide | ChatGPT + web sources + Notion | No | No | Level 1 unless approved |
| Dashboard/report | Excel/Power BI first | Usually no | Maybe | Level 1-3 depending tenant |
| Personal OS | Notion/OneNote/Markdown | No | No | Level 1-2 |
| Simple landing page | Figma + Netlify/Cloudflare | Light | Yes | Level 0 |
| Interactive app | AI prototype -> GitHub app | Yes eventually | Yes | Level 0-1 |
| Internal business tool | Power Apps / Softr / Glide | Maybe | Maybe | Level 1-3 with approvals |
| AI chatbot/tool | Google AI Studio / custom app | Maybe | Yes | Level 0-1 only unless reviewed |
| SaaS MVP | GitHub + Supabase + Netlify/Cloudflare | Yes | Yes | Level 0-2 after review |
| Monetization experiment | Waitlist / paid pilot / payment link | Light | Maybe | Level 0-1 |

---

## 11. The 10-phase workflow

### Phase 1 - Pick and narrow the idea

**Goal:** choose one painful problem.

Write three ideas in this format:

```text
I help [specific user] who struggles with [specific pain] achieve [specific result] without [current frustration].
```

Score each idea:

| Score | Question |
|---:|---|
| Pain | How painful is this problem? |
| Frequency | How often does it happen? |
| Willingness to pay | Would someone pay, save time, or use it repeatedly? |
| Access | Can I reach these users? |
| Simplicity | Can I build the first version in 30 days? |

Pick the highest total.

---

### Phase 2 - Validate customer pain

**Goal:** prove the problem is real before building.

Minimum validation:

```text
5-10 real people contacted
10+ survey responses if possible
3+ people agree to test
1+ person shows payment or strong usage signal
```

Ask:

1. What problem are you trying to solve?
2. How do you solve it today?
3. What is annoying about your current method?
4. How often does this happen?
5. What would a better solution do?
6. Would you test a rough version?
7. Would you pay later if it saves time/money?

Stop if the pain is weak. Pivot early.

---

### Phase 3 - Define the MVP

**MVP means:** smallest useful version.

Use the rule:

```text
One target user.
One main workflow.
One useful result.
Three must-have features max.
```

Example:

```text
User signs up -> adds one client -> records one note -> sees next action.
```

Write a **NOT-building list**:

```text
Not building now:
- admin panel
- marketplace
- teams
- mobile app
- AI agent
- payment system
- complex analytics
- multi-language support
```

---

### Phase 4 - Design simple screens

Use paper, Excalidraw, or Figma.

Build only 3-5 screens:

1. Landing / welcome
2. Login or start screen
3. Dashboard
4. Main action screen
5. Result/detail screen

For each screen, define:

| State | Meaning |
|---|---|
| Empty | no data yet |
| Loading | waiting |
| Error | something failed |
| Success | action completed |

---

### Phase 5 - Build clickable prototype

Use Bolt, Google AI Studio, Lovable, v0, Softr, Glide, or Figma prototype.

Prototype checklist:

- uses fake data
- no real secrets
- works on mobile size
- user can complete the main flow
- shared with 3-5 people
- feedback captured in Tally/Notion

Do not add real payments yet.

---

### Phase 6 - Build functional MVP

Choose the route based on evidence.

| Evidence | Build route |
|---|---|
| People are curious but not committed | no-code MVP |
| People test and give useful feedback | AI-assisted custom MVP |
| People ask to pay or use repeatedly | GitHub + Supabase + monitored deploy |
| Problem still unclear | return to validation |

Functional MVP checklist:

- signup/login only if needed
- data save/edit/delete works
- one main workflow works
- simple mobile layout works
- README exists
- PROJECT_WORKFLOW.md exists
- .env.example exists
- no secrets in GitHub

---

### Phase 7 - Test with real users

Invite 3-10 testers first.

Track:

| Metric | Simple meaning |
|---|---|
| Activation | Did the user reach the first useful result? |
| Completion | Did they finish the main workflow? |
| Confusion | Where did they get stuck? |
| Repeat use | Did they come back? |
| Payment signal | Did they ask about price or say they would pay? |

Watch behavior. Do not defend the app. Fix the top 3 problems.

---

### Phase 8 - Deploy publicly

Before public sharing:

- main flow tested
- mobile layout tested
- privacy note/page exists if collecting data
- no secrets exposed
- basic error handling exists
- rollback plan exists
- support/contact method exists
- analytics or feedback form exists

Deployment options:

| App type | Good default |
|---|---|
| static landing page | Netlify / Cloudflare Pages |
| React/Next app learning only | Vercel Hobby / Netlify / Cloudflare |
| monetized app | Netlify / Cloudflare / commercial-suitable host after terms check |
| Firebase app | Firebase Hosting |
| AI Studio prototype | export to GitHub/ZIP, then verify local run |

---

### Phase 9 - Monetization test

Do not monetize too early. Validate willingness to pay first.

Start with:

1. waitlist
2. manual demo
3. concierge MVP (you manually deliver some value)
4. paid pilot
5. one-time digital product
6. subscription only after repeated use

Payment options:

| Option | Best for | Notes |
|---|---|---|
| Lemon Squeezy | global digital products, SaaS, Merchant of Record | higher fee, simpler tax handling language |
| PayMongo | Philippines local payments | good PH option, check business requirements |
| Stripe | supported countries/entities | not default for PH unless supported |
| Manual invoice / bank transfer | first paid pilots | simple, but track legally/tax-wise |

This is general planning, not legal/tax/accounting advice. Before real commercial launch, get qualified local review.

---

### Phase 10 - Measure, improve, and scale

Weekly loop:

```text
Review feedback -> fix top bug -> improve main workflow -> measure usage -> decide next feature
```

Do not add random features.

Add features only when:

- multiple users ask for the same thing
- the feature improves activation or retention
- it supports payment or support burden reduction
- it does not break the simple core flow

---

## 12. Universal Gold Skeleton for your stage

Status key:

- Active = build/specify now
- Stub = placeholder now, build later
- Blueprint = document for later
- Deferred = ignore for now

| Layer | Status now | Beginner meaning | Tool / output | Next action |
|---|---|---|---|---|
| Product north star | Active | one clear promise | Notion | write one sentence |
| User and pain | Active | exact person + problem | Tally/interviews | talk to 5 people |
| Research/discovery | Active | proof before build | web/user research | collect evidence |
| MVP scope | Active | smallest useful version | Notion | max 3 features |
| What not to build | Active | anti-overbuild list | Notion | list 5 no-now items |
| User flow | Active | steps to value | Excalidraw/Figma | draw one happy path |
| Screens | Active | visible app pages | Figma/Bolt | create 3-5 screens |
| Design system | Stub | colors, font, components | Tailwind/shadcn/Figma | use simple defaults |
| Data model | Active | what data is saved | Notion/Supabase | list tables/fields |
| Database/storage | Active if app saves data | memory of app | Supabase/Firebase/Airtable | choose simple DB |
| Auth/login | Stub/Active if private data | user identity | Supabase/Firebase/Clerk | add only if needed |
| Backend/services | Stub | hidden logic | Supabase/API routes | document services |
| API/action bridge | Blueprint | future connections | API contract notes | no build yet |
| AI/RAG/vector | Blueprint/Deferred | future smart features | service adapter notes | skip unless core |
| Automation | Stub | repeated work | Make/Power Automate | manual first |
| Orchestration | Deferred | many tools coordinated | none | too early |
| Connectors | Blueprint | integrations | docs | list future connectors |
| Observability/logs | Stub -> Active at beta | bug visibility | Sentry/logs | add before public beta |
| Uptime monitoring | Stub -> Active public | is site online? | UptimeRobot | add for public link |
| Analytics | Stub -> Active at beta | user behavior | PostHog/Umami | track 5 events |
| BI/dashboard | Blueprint | business reporting | Excel/Power BI | later |
| Human approval gates | Active | confirm risky actions | checklist | require approval before send/delete/pay |
| QA/testing | Active | prove it works | TEST_PLAN.md | manual checklist |
| Security/privacy | Active | protect data | SECURITY_CHECKLIST.md | no secrets, RLS, privacy note |
| Deployment | Blueprint -> Active | make public link | Netlify/Cloudflare | deploy after tests |
| Monetization | Blueprint -> Active after proof | charge money | Lemon Squeezy/PayMongo | paid pilot first |
| Legal/tax/privacy/support | Blueprint | responsibilities | checklist/pro review | before real public money |
| Documentation | Active | project memory | README/PROJECT_WORKFLOW | create starter docs |
| Evolution log | Active | what changed and why | CHANGELOG/DECISIONS | update weekly |
| Backup/export/migration | Active | escape plan | GitHub/CSV/export | backup project weekly |

---

## 13. Effortless AI Project Factory

Use this loop for every project.

```text
CAPTURE -> SCAFFOLD -> BUILD -> CHECK -> SHIP -> LEARN
```

### CAPTURE

You brain dump the idea. AI structures it.

Output:

- product north star
- target user
- pain
- assumptions
- validation test

### SCAFFOLD

AI creates the project skeleton.

Output:

- PRD-lite
- screen list
- data model
- folder structure
- tasks
- safety checks

### BUILD

AI helps build one small piece at a time.

Output:

- working screen
- working form
- working save/read flow
- no giant rewrites

### CHECK

You and AI review.

Output:

- test results
- bug list
- security checks
- rollback readiness

### SHIP

You deploy or share.

Output:

- public/private link
- README
- feedback form
- analytics/support if needed

### LEARN

You improve from evidence.

Output:

- top problems
- next sprint
- continue/pivot/kill decision

---

## 14. One True Dashboard

Keep one project tracker. Use Notion, Excel, SharePoint List, or a Markdown table.

| Field | Example |
|---|---|
| Project name | Tutor Notes MVP |
| Stage | Prototype |
| Main user | Solo tutor |
| Problem | loses lesson notes |
| Current status | testing with 5 users |
| Next action | create Tally feedback form |
| Stack | Figma + Bolt + Supabase |
| GitHub repo | link |
| Live link | link |
| Data level | Level 0/1 |
| Risk level | low/medium/high |
| Monetization status | not yet / paid pilot / active |
| Blocker | unclear auth |
| Last updated | date |

---

## 15. Standard project folder

For coded or serious projects, use this folder.

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

### What each file is for

| File | Purpose | Never put here |
|---|---|---|
| README.md | how to understand/run the project | real secrets |
| PROJECT_WORKFLOW.md | project control page | passwords |
| .env.example | fake names of required env vars | real keys |
| .gitignore | files Git should ignore | do not ignore source files blindly |
| CHANGELOG.md | what changed | private customer data |
| DECISIONS.md | why choices were made | private credentials |
| TEST_PLAN.md | what to test | production secrets |
| DEPLOYMENT.md | how to deploy | live secret values |
| SECURITY_CHECKLIST.md | safety checks | actual passwords |
| DATA_MODEL.md | tables/fields/relationships | regulated data |
| USER_FEEDBACK.md | anonymized feedback | names/emails unless approved |

---

## 16. PROJECT_WORKFLOW.md template

Copy this into every project.

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

---

## 17. Git and rollback rules

GitHub is your safe box.

Simple workflow:

```text
Before big change:
1. commit working version
2. write what you plan to change
3. make the change
4. test
5. commit again only if it works
```

Simple commands:

```bash
git status
git add .
git commit -m "Describe the useful change"
git push
```

Rollback plan:

```text
If new change breaks the app:
1. stop adding more changes
2. identify last working commit
3. restore/revert
4. redeploy
5. write what failed in DECISIONS.md or CHANGELOG.md
```

---

## 18. AI coding safety rules

AI coding tools are apprentices. Useful, fast, but not final judges.

Always check:

```text
Does the app run?
Does the main workflow work?
Do tests pass?
Are secrets safe?
Can I undo the change?
Did the AI delete or rewrite too much?
```

Do not ask AI to change the whole project at once.

Use this safer pattern:

```text
Make the smallest safe change.
Before editing, list files you plan to modify.
After editing, show changed files and how to test.
Do not rewrite unrelated files.
Do not touch secrets.
```

---

## 19. API key and secret policy

### Never do this

```text
Put API key inside React component.
Paste API key into ChatGPT.
Commit .env.local to GitHub.
Screenshot a dashboard showing keys.
Store service_role key in NEXT_PUBLIC variable.
```

### Safer pattern

```text
.env.local        -> real secrets on your machine only
.env.example      -> fake placeholder names in GitHub
hosting secrets   -> environment variables in Netlify/Cloudflare/etc.
server-side code  -> uses secrets
frontend code     -> never sees private secrets
```

### Supabase note

Supabase `anon` key is designed for client use when Row Level Security is correctly configured. The `service_role` key is powerful and must stay server-side only.

---

## 20. Human approval gates

Require human approval before automation or AI does any of these:

- sends messages to users
- deletes records
- updates production data
- changes permissions
- submits forms
- publishes content
- charges money
- refunds money
- moves money
- contacts customers
- changes legal/tax/security/health/financial state

Use this approval template:

```text
Action:
Who/what is affected:
Data involved:
Can it be undone?
Risk level:
Approval needed from:
Rollback plan:
Approved? Yes/No
```

---

## 21. Cost and limit tracker

Even free tools have limits. Track them weekly once you have users.

| Tool area | Track | Warning sign | Action |
|---|---|---|---|
| AI builders | tokens/credits | running out daily | move serious work to GitHub/VS Code |
| Hosting | builds, bandwidth/credits | site pauses or build fails | optimize/build less/upgrade if justified |
| Database | DB size, storage, MAUs | near quota | clean data/export/upgrade |
| Auth | active users | approaching free cap | review pricing/security |
| Analytics | events/session replays | high event volume | reduce events/set billing limit |
| Automation | tasks/ops | workflows fail | simplify or upgrade |
| Payments | fees, refunds, disputes | high fee percent | compare processors |
| Support | messages/time | too many support requests | improve onboarding/docs |
| AI APIs | token/call cost | surprise usage | add caching, batching, limits |

---

## 22. Philippines / Manila monetization notes

This is general planning, not tax/legal/accounting advice.

### Payment options

| Option | Best use | Caveat |
|---|---|---|
| Lemon Squeezy | global digital products/SaaS, Merchant of Record flow | transaction fee; confirm payout/country details |
| PayMongo | Philippines local cards/e-wallets | check business requirements and fees |
| Stripe | if you have a supported country/entity | Philippines was not listed in checked official availability page |
| Manual invoice/bank transfer | first paid pilots | needs clean records and local compliance |

### Before charging money

- know your refund policy
- know support channel
- know data collected
- know privacy obligations
- keep sales records
- check local tax/legal requirements
- avoid promising guaranteed results

---

## 23. Design Excellence checklist

A working app can still fail if the design feels confusing.

Before sharing:

- [ ] Main action is obvious
- [ ] Mobile layout works
- [ ] Text is readable
- [ ] Buttons are easy to tap
- [ ] Empty states explain what to do
- [ ] Error states explain what happened
- [ ] Success states confirm completion
- [ ] Colors are consistent
- [ ] No clutter
- [ ] App looks trustworthy enough for the stage

Simple design defaults:

| Item | Beginner default |
|---|---|
| Layout | mobile-first cards |
| Font | one clean sans-serif |
| Colors | one primary, neutral background, success/error colors |
| Components | shadcn/ui or tool default components |
| Motion | tiny, useful only |
| Accessibility | readable contrast, keyboard focus, labels |

---

## 24. Metrics to track

Start with only five product events.

| Event | Meaning |
|---|---|
| visited_landing | user saw app |
| signed_up | user created account / joined waitlist |
| completed_core_action | user got first value |
| returned_later | user came back |
| clicked_pricing_or_paid | user showed payment signal |

Do not create a big analytics dashboard before users exist.

---

## 25. 30-day roadmap

### Week 1 - Validate

| Day | Action | Output |
|---:|---|---|
| 1 | Write 3 app ideas | idea list |
| 2 | Pick 1 user + pain | problem statement |
| 3 | Create Tally survey | validation form |
| 4 | Message 10 people | outreach list |
| 5 | Analyze responses | go/pivot/kill decision |
| 6 | Write MVP scope | 3 features + not-building list |
| 7 | Sketch screens | 3-5 wireframes |

### Week 2 - Prototype and learn

| Day | Action | Output |
|---:|---|---|
| 8 | Build with Bolt/AI Studio/Figma | clickable prototype |
| 9 | Show 3-5 people | feedback notes |
| 10 | Improve prototype | version 2 |
| 11 | Create GitHub repo | project safe box |
| 12 | Create README/PROJECT_WORKFLOW | project docs |
| 13 | Learn Supabase basics | one test table |
| 14 | Learn deploy basics | simple public link |

### Week 3 - Build MVP

| Day | Action | Output |
|---:|---|---|
| 15 | Finalize data model | tables/fields |
| 16 | Build screen 1 | first page |
| 17 | Build screen 2 | core workflow start |
| 18 | Build screen 3 | result/detail page |
| 19 | Connect save/read data | functional app |
| 20 | Add basic auth if needed | login flow |
| 21 | Manual test checklist | bug list |

### Week 4 - Test, deploy, monetize carefully

| Day | Action | Output |
|---:|---|---|
| 22 | Fix top bugs | stable MVP |
| 23 | Deploy private test | test link |
| 24 | Add feedback form | feedback loop |
| 25 | Invite 5-10 testers | real usage |
| 26 | Add monitoring if public | Sentry/UptimeRobot |
| 27 | Decide monetization test | offer hypothesis |
| 28 | Add payment link only if justified | paid pilot option |
| 29 | Review metrics | continue/pivot/kill |
| 30 | Write next sprint plan | next 7 actions |

---

## 26. Your next 7 actions

Do these first.

1. Create a Notion or Markdown page called `My App Ideas`.
2. Write 3 ideas using the one-sentence formula.
3. Pick the idea with strongest pain and easiest user access.
4. Create a 7-question Tally validation form.
5. Share it with 10 people or communities.
6. Sketch 3 screens on paper or Excalidraw.
7. Use Bolt or Google AI Studio to make a rough prototype with fake data.

Do not build payments, admin panels, or complex dashboards yet.

---

## 27. Prompt pack

### Prompt 1 - Idea validation

```text
Act as a startup product strategist and beginner teacher.

My app idea:
[describe idea]

Target user:
[who has the problem]

Current workaround:
[how they solve it today]

Help me validate before building.

Output:
1. One-sentence Product North Star
2. Pain x Frequency x Willingness-to-Pay score
3. Top 5 assumptions that may be wrong
4. 10 customer interview questions
5. 7 Tally survey questions
6. Pass/fail validation threshold
7. MVP features: exactly 3
8. NOT-building list: at least 5 items
9. Best next action today

Use simple English. Do not encourage me to build before proving pain.
```

### Prompt 2 - UX design

```text
Act as a senior UX designer for beginner-friendly mobile-first apps.

Product North Star:
[one sentence]

Target user:
[user]

Main workflow:
[user does A -> B -> C -> gets result]

Design the simple MVP experience.

Output:
1. User journey
2. Screen list, max 5 screens
3. What each screen shows
4. Main button on each screen
5. Empty/loading/error/success states
6. Simple design system
7. Mobile-first notes
8. Accessibility basics
9. What not to design yet

Use simple English.
```

### Prompt 3 - AI app builder

```text
Build a beginner-friendly web app prototype.

App name:
[name]

Purpose:
[Product North Star]

Target user:
[user]

MVP scope:
[3 features only]

Screens:
1. Landing / welcome
2. Dashboard
3. Main action
4. Result/detail
5. Settings/help if needed

Data model:
[list entities and fields]

Design:
Clean, mobile-first, modern, simple, trustworthy. Include empty, loading, error, and success states.

Technical rules:
- Use fake/demo data first.
- Do not include real API keys.
- Keep provider/API logic isolated.
- Add README instructions.
- Make it easy to export to ZIP or GitHub.

After building, explain:
1. File structure
2. How to run
3. Where data is stored
4. What to test
5. Known limitations
```

### Prompt 4 - Cline / AI coding safe task

```text
Act as a careful senior developer.

Project:
[app name]

Goal for this task:
[one small change]

Relevant files:
[list files if known]

Rules:
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Do not touch secrets or .env files.
- Before editing, say which files you plan to modify.
- After editing, summarize changed files.
- Give exact test steps.
- Include rollback advice.

Task:
[describe change]
```

### Prompt 5 - Debugging

```text
Act as a patient senior full-stack developer.

App stack:
[tools]

Expected behavior:
[what should happen]

Actual behavior:
[what happens instead]

Error message:
[paste exact error]

Recent changes:
[what changed before it broke]

Please:
1. Explain likely cause in simple English
2. Give the safest first fix
3. Show exact lines/files to check
4. Give test steps
5. Give rollback plan
6. Tell me what not to change yet

Do not rewrite everything unless necessary.
```

### Prompt 6 - Launch checklist

```text
Act as a strict but practical launch reviewer.

App:
[app name]

Target user:
[user]

Current stage:
[private beta / public MVP / monetized MVP]

Stack:
[tools]

Review launch readiness.

Output:
1. Launch readiness score /100
2. Blockers
3. Must-fix before launch
4. Nice-to-fix later
5. Privacy/security checklist
6. Payment checklist if monetized
7. Analytics checklist
8. Support checklist
9. Backup/export checklist
10. First 7 days after launch plan

Use simple English and be direct.
```

### Prompt 7 - Source verification

```text
Act as a source-first research checker.

Claims to verify:
[paste claims]

Please verify using official sources first.

Output:
| Claim | Official source | Verified? | Confidence | Notes | Action |

Rules:
- Do not invent citations.
- If not verified, say unverified.
- Separate facts from assumptions.
- Use current sources.
```

### Prompt 8 - Session handoff

```text
Create a handoff summary for my next AI session.

Include:
1. Project name
2. Current goal
3. Current stage
4. Stack/tools
5. Decisions made
6. Files created
7. Known bugs
8. Next 3 actions
9. Safety notes
10. Prompt to continue next session

Keep it compact and beginner-friendly.
```

---

## 28. SOP starter library

### SOP 1 - Start a new project

1. Write Product North Star.
2. Create Notion/Markdown project page.
3. Create validation form.
4. Create GitHub repo if code is involved.
5. Add README, PROJECT_WORKFLOW, .env.example.
6. Build smallest prototype.
7. Test one core workflow.
8. Record next 3 tasks.

Done when: project has clear goal, safe storage, and one next action.

---

### SOP 2 - Review AI-generated code

1. Read changed files list.
2. Check no secrets were added.
3. Run app locally.
4. Test main workflow.
5. Check mobile layout.
6. Commit only if working.
7. Write what changed.

Done when: app runs and rollback exists.

---

### SOP 3 - Prepare private beta

1. Use dummy/demo data.
2. Create feedback form.
3. Add contact/support method.
4. Test main flow.
5. Add basic monitoring if public link.
6. Invite 3-10 testers.
7. Track feedback.

Done when: testers can use the app safely.

---

### SOP 4 - Monetization readiness

1. Validate pain with users.
2. Validate repeated usage or willingness to pay.
3. Define offer and price hypothesis.
4. Choose payment method.
5. Add refund/support policy.
6. Check privacy/tax/legal requirements.
7. Test payment flow in test mode.

Done when: payment is not guessing; it is tied to value.

---

### SOP 5 - Emergency: leaked secret

1. Stop using the exposed key.
2. Revoke/rotate it in the provider dashboard.
3. Remove it from code.
4. Check Git history and hosting environment.
5. Create a new key.
6. Store it safely in env variables.
7. Document what happened.

Do not just delete the key from the latest file. If it was committed, assume it was exposed.

---

## 29. Beginner glossary

| Term | Simple meaning |
|---|---|
| App | software people use to do something |
| Web app | app opened in a browser |
| SaaS | software people use online, often paid monthly |
| MVP | smallest useful version |
| Prototype | rough version to test idea |
| Frontend | visible screens/buttons |
| Backend | hidden logic/data side |
| Database | place where app saves data |
| Auth | login and identity |
| API | way apps talk to each other |
| Endpoint | one API address/action |
| Environment variable | safe setting outside code |
| Secret | private key/password/token |
| Git | tool that tracks code history |
| GitHub | online safe box for code |
| Repo | project folder in GitHub |
| Commit | saved checkpoint |
| Branch | safe side path for changes |
| Deploy | put app online |
| Hosting | place where app lives online |
| CI/CD | automatic check/deploy process |
| Test | check that app works |
| Debugging | finding/fixing errors |
| Monitoring | watching app after launch |
| Error tracking | collecting app crashes/bugs |
| Uptime | how often site is online |
| Rollback | return to last working version |
| Wireframe | rough screen sketch |
| Design system | reusable colors, fonts, components |
| Component | reusable UI piece |
| Responsive | works on phone/tablet/desktop |
| Accessibility | usable by more people, including disabilities |
| Local-first | works with your own/local data first |
| Provider-agnostic | not locked to one vendor |
| Vendor lock-in | hard to leave a tool |
| Token | small text unit AI counts |
| Rate limit | usage speed limit |
| Free tier | free plan with limits |
| RLS | row-level security; users see only allowed rows |
| Merchant of Record | seller-of-record that can handle tax/payment obligations |
| Analytics | measuring user behavior |
| Churn | users who stop using/paying |
| Activation | user reaches first useful result |
| Retention | users come back |
| Conversion | user takes desired action |
| Dummy data | fake safe data for testing |
| Beta | test version with real users |
| Privacy policy | page explaining data collection/use |
| Terms | rules for using your app |

---

## 30. Final pre-build checklist

Do not build until these are mostly true.

### Problem

- [ ] I know the exact target user.
- [ ] I know the painful problem.
- [ ] I know current workaround.
- [ ] I contacted real users.
- [ ] At least 3 people agreed to test.

### MVP

- [ ] One main workflow.
- [ ] Three features max.
- [ ] 3-5 screens max.
- [ ] Clear NOT-building list.
- [ ] Fake/demo data ready.

### Tools

- [ ] One stack chosen.
- [ ] GitHub repo exists if code is involved.
- [ ] README exists.
- [ ] PROJECT_WORKFLOW.md exists.
- [ ] .env.example exists.

### Safety

- [ ] No secrets in frontend/public code.
- [ ] No secrets in GitHub.
- [ ] No sensitive data in random AI tools.
- [ ] RLS/auth considered if user data exists.
- [ ] Rollback plan exists.

### Launch

- [ ] Main flow works.
- [ ] Mobile works.
- [ ] Error states exist.
- [ ] Support/contact path exists.
- [ ] Feedback form exists.
- [ ] Privacy/payment readiness checked if public/paid.

---

## 31. Source ledger

Accessed 2026-05-31. Re-check before paid launch.

| Claim / topic | Official source | Confidence | Notes |
|---|---|---:|---|
| Google AI Studio Build supports full-stack web apps, Android app generation, server-side secrets, export/deploy paths | https://ai.google.dev/gemini-api/docs/aistudio-build-mode | High | Use as prototype acceleration, not mandatory runtime |
| Firebase Studio sunset on 2027-03-22 | https://firebase.google.com/docs/studio | High | Legacy/migration only for new planning |
| Vercel Hobby is personal/non-commercial | https://vercel.com/pricing | High | Do not default to Hobby for monetized apps |
| Supabase free quotas include two projects, 500 MB DB/project, 50k MAU, 1 GB storage | https://supabase.com/docs/guides/platform/org-based-billing | High | Monitor usage |
| Supabase 7-day inactivity pause | Not verified from official source in this pass | Low | Manual check required |
| Cloudflare Pages free limits include 500 builds/month and file/custom-domain limits | https://developers.cloudflare.com/pages/platform/limits/ | High | Terms/bandwidth/commercial use should be checked before paid launch |
| Netlify Free plan and monthly credits/hard limits | https://www.netlify.com/pricing/ | High | Watch site pause/credit limits |
| Bolt free token limits | https://bolt.new/pricing | High | Good for prototypes |
| Lovable free credits | https://lovable.dev/pricing | Low from parsed source | Manual check exact free tier before relying |
| v0 free monthly credits | https://v0.dev/pricing | High | UI generation, not full app backend |
| Lemon Squeezy fees and Merchant of Record positioning | https://www.lemonsqueezy.com/pricing | High | Re-check country/payout details |
| Lemon Squeezy international payout fee for Philippines | Not verified from official source in this pass | Low | Manual check required |
| Stripe supported countries/regions | https://stripe.com/global | High | Philippines not listed in checked source |
| PayMongo pricing / PH local payment options | https://www.paymongo.com/pricing | High | Useful for PH payment flows |
| PostHog free product analytics event tier | https://posthog.com/pricing | High | First 1M events/month listed free in checked source |
| Tally unlimited forms/submissions under fair use | https://tally.so/pricing | High | Excellent validation tool |
| Figma Starter free | https://www.figma.com/pricing/ | High | Good design starter |
| Notion free plan for individuals | https://www.notion.com/pricing | High | Good project HQ |
| GitHub Codespaces personal free quotas | https://docs.github.com/en/billing/concepts/product-billing/github-codespaces | High | Monitor free monthly quota |
| GitHub Actions free allowances | https://docs.github.com/en/billing/concepts/product-billing/github-actions | High | Useful for simple CI |
| UptimeRobot free plan | https://uptimerobot.com/pricing/ | High | Add when public link exists |

---

## 32. Final recommendation

Your best default operating system is:

```text
ChatGPT / UNGASIS for planning
+ Notion for project memory
+ Tally for validation
+ Figma / Excalidraw for screens
+ Bolt or Google AI Studio for fast prototype
+ GitHub as source of truth when code exists
+ VS Code / Codespaces for owned app building
+ Supabase for backend when needed
+ Netlify or Cloudflare Pages for deploy after terms check
+ Sentry/UptimeRobot/PostHog only when real users arrive
+ Lemon Squeezy or PayMongo for payment tests depending market
```

Your next move is not to learn every tool.

Your next move is to validate one painful problem and build one tiny useful app.

---

## 33. UNGASIS Trace

Mode: Execution / Artifact Build  
Rigor: Learner -> personal prototype, with public MVP and monetization guardrails  
Domain: no-code, low-code, AI-assisted app building, solopreneur workflow  
Dimensions: Router, Rigor Dial, Research, Tools, Artifacts, Guardrails, Evaluation  
Lenses: senior app developer, no-code builder, product strategist, UX designer, startup operator, beginner teacher  
Intelligences: product, technical, business, risk, learning, practicality, anti-overengineering  
Frameworks: Universal Gold Skeleton, Design Excellence, Best-for-Stage Stack, Source-First Research, Active/Stub/Blueprint/Deferred  
Engines: App Builder, Workflow Designer, Tool Recommendation, QA/Security/Deployment, Artifact Builder  
Tools/Files: uploaded playbooks, current official web sources, generated Markdown artifact  
Guardrails: no frontend secrets, no sensitive data in random tools, commercial-use caution, source freshness, privacy/cost safety  
Template: unified workflow and downloadable Markdown playbook
