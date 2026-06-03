# UNGASIS Content Module: Rigor Dial & Lifecycle Ladder

> 🪜 Module ID: R3  
> 📂 File: `ungasis-lifecycle-ladder.md`  
> 🔗 Sources: Master Prompt §9 (Rigor Dial Classification) + §10 (Lifecycle Ladder) + Playbook §4 (Rigor Dial)  
> 🎯 Audience: Beginner / not tech-savvy / ESL / $0 budget  

---

## 📖 Table of Contents

1. [The Food Stall to Restaurant Analogy](#1--the-food-stall-to-restaurant-analogy)
2. [What Is the Rigor Dial?](#2--what-is-the-rigor-dial)
3. [Visual Lifecycle Ladder](#3--visual-lifecycle-ladder)
4. [Stage 1 — 💡 Idea](#4--stage-1--idea)
5. [Stage 2 — 🏠 Personal Use](#5--stage-2--personal-use)
6. [Stage 3 — 🔒 Private (Trusted Few)](#6--stage-3--private-trusted-few)
7. [Stage 4 — 🔧 Prototype](#7--stage-4--prototype)
8. [Stage 5 — 📁 Portfolio Project](#8--stage-5--portfolio-project)
9. [Stage 6 — 🌐 Public Demo](#9--stage-6--public-demo)
10. [Stage 7 — 🧪 Private Beta](#10--stage-7--private-beta)
11. [Stage 8 — 💰 Revenue Test](#11--stage-8--revenue-test)
12. [Stage 9 — 🚀 Public MVP](#12--stage-9--public-mvp)
13. [Stage 10 — 🏢 Commercial SaaS](#13--stage-10--commercial-saas)
14. [Stage 11 — ⚖️ High-Risk / Regulated](#14--stage-11--high-risk--regulated)
15. [Quick Reference: Rigor Dial Summary Table](#15--quick-reference-rigor-dial-summary-table)
16. [How to Use This: Decision Flowchart](#16--how-to-use-this-decision-flowchart)
17. [Default Assumption](#17--default-assumption)

---

## 1. 🍳 The Food Stall to Restaurant Analogy

Your app journey is like going from a **food sample to a full restaurant**. At each stage, you add more rigor — more rules, more safety, more polish — because the stakes get higher.

| Stage | Food Analogy | App Equivalent | Rigor Level |
|---|---|---|---|
| 💡 Idea | Thinking about a recipe | Brainstorming app ideas | Almost zero |
| 🏠 Personal Use | Cooking for yourself | Using the app alone | Minimal |
| 🔒 Private (Trusted Few) | Cooking for close friends | Sharing app with 2–3 trusted people | Low |
| 🔧 Prototype | Making a food sample for tasting | Clickable demo with fake data | Low |
| 📁 Portfolio | Taking a photo of your food for Instagram | Screenshot + README for your portfolio | Low–Medium |
| 🌐 Public Demo | Setting up a free tasting booth | Public link anyone can try | Medium |
| 🧪 Private Beta | Inviting 10–20 people to pre-opening dinner | Beta testers with real accounts | Medium–High |
| 💰 Revenue Test | Charging one table of customers | First paid pilot or waitlist | High |
| 🚀 Public MVP | Opening the food stall for business | Public app with real users + payments | High |
| 🏢 Commercial SaaS | Running a full restaurant | Repeatable business with support, billing, ops | Very High |
| ⚖️ High-Risk | Running a hospital cafeteria | Medical, legal, or financial app | Maximum |

### The Key Insight

> **You do NOT need restaurant-level rigor for a food sample.**  
> But you DO need restaurant-level rigor before charging customers and handling their health data.  
> The Rigor Dial tells you how much rigor is enough — for RIGHT NOW.

---

## 2. 🎛️ What Is the Rigor Dial?

### Not a Switch — A Dial

The Rigor Dial is **NOT** a binary on/off switch. It is like a **volume knob** that you turn up gradually as your project becomes more serious.

```text
LOW ◄──────────────────────────────────────► HIGH

  💡        🏠   🔒   🔧   📁   🌐   🧪   💰   🚀   🏢   ⚖️
 Idea    Personal Priv Proto Port Demo Beta Rev  MVP  SaaS Risk
  │         │    │    │    │    │    │    │    │    │    │
  ▼         ▼    ▼    ▼    ▼    ▼    ▼    ▼    ▼    ▼    ▼
 zero    basic  low  low  med  med  m-h  high high v-hi max

  Less rigor ◄────────────────────────────► More rigor
  Less risk  ◄────────────────────────────► More risk
  Less docs  ◄────────────────────────────► More docs
  Less tests ◄────────────────────────────► More tests
  Less legal ◄────────────────────────────► More legal
```

### Why This Matters

- **Too little rigor** = your app breaks, leaks data, or gets you in legal trouble
- **Too much rigor too early** = you spend weeks on security, legal, and testing for an app nobody uses
- **Right rigor** = you match the safety level to the actual risk level at your current stage

### The Rule

> **Use the lightest safe rigor for your stage.**  
> Do not over-engineer a prototype. Do not under-protect a commercial product.

---

## 3. 🪜 Visual Lifecycle Ladder

```text
    ⚖️  HIGH-RISK / REGULATED
    │   ↑ Expert-reviewed product. Professional legal/security review required
    │   │ Unlock: regulated domain requires it
    │
    🏢  COMMERCIAL SAAS
    │   ↑ Repeatable business. CI/CD, observability, formal QA, support
    │   │ Unlock: repeatable revenue + growing users + sustainable ops
    │
    🚀  PUBLIC MVP
    │   ↑ Public users + payments. Privacy page, terms, monitoring, rollback
    │   │ Unlock: beta tests pass + payment validated + legal/tax reviewed
    │
    💰  REVENUE TEST
    │   ↑ First paid pilot or waitlist with payment signal
    │   │ Unlock: ≥3 users show willingness to pay
    │
    🧪  PRIVATE BETA
    │   ↑ 5–20 real users with auth, monitoring, support path
    │   │ Unlock: prototype feedback positive + functional MVP works
    │
    🌐  PUBLIC DEMO
    │   ↑ Public link with demo data. Anyone can try it
    │   │ Unlock: portfolio-ready + demo data + basic error handling
    │
    📁  PORTFOLIO PROJECT
    │   ↑ Screenshot + README + case study. Shows your skills
    │   │ Unlock: working prototype + README + screenshots
    │
    🔧  PROTOTYPE
    │   ↑ Clickable demo with fake data. Testable by 3–5 people
    │   │ Unlock: pain validated + 3–5 screens designed
    │
    🔒  PRIVATE (TRUSTED FEW)
    │   ↑ Shared with 2–3 trusted people for early feedback
    │   │ Unlock: working personal tool + trusted testers identified
    │
    🏠  PERSONAL USE
    │   ↑ Use it yourself. Local data. No sharing
    │   │ Unlock: idea selected + basic tool built
    │
    💡  IDEA
        Starting point. Brainstorm. Research. Validate.
        Unlock: curiosity + a painful problem
```

---

## 4. 💡 Stage 1 — Idea

### Overview

| Field | Detail |
|---|---|
| **Goal** | Brainstorm, discover, and select a painful problem to solve |
| **Risk level** | 🟢 None |
| **Data allowed** | Level 0 — Demo data only, fake examples |
| **Build now** | Idea list, problem statement, validation survey, competitive research |
| **Don't build yet** | Anything. No code, no screens, no tools, no database |
| **Payment?** | ❌ No |
| **Security level** | None needed |
| **Public access?** | ❌ No |

### Detail Table

| Field | Detail |
|---|---|
| **Required documentation** | None — just notes (Notion, paper) |
| **Required testing** | None |
| **Allowed automation** | None |
| **Legal/tax/privacy review?** | ❌ No |
| **Best ChatGPT feature** | Chat for brainstorming, Deep Research for competitive analysis |
| **Best M365 Copilot feature** | Copilot Chat for brainstorming, Researcher agent ⚙️ |
| **Deliverables** | 3–5 scored ideas, one selected, problem statement |
| **Success criteria** | One idea selected with clear target user and painful problem |
| **Common mistake** | Falling in love with an idea before talking to real users |
| **Time-box** | 1–2 days maximum |
| **When to move** | You picked ONE idea and can describe the user + pain in one sentence |
| **When to stop/pivot** | You cannot find anyone who has this problem |

### Lifecycle Ladder Fields

| Field | Detail |
|---|---|
| **What unlocks next rung** | Selecting one idea with a clear user and pain |
| **Tools that activate** | Notion, ChatGPT, Google Trends, Reddit |
| **Risks that increase** | None — there is no risk at this stage |
| **New responsibilities** | None |
| **Best data storage** | Notion page or local Markdown file |
| **Decision point** | Continue (idea chosen) or repeat (no strong idea yet) |

---

## 5. 🏠 Stage 2 — Personal Use

### Overview

| Field | Detail |
|---|---|
| **Goal** | Build a simple tool for yourself. Learn the tools. Use it daily |
| **Risk level** | 🟢 Low |
| **Data allowed** | Level 0–1 — Demo data + personal non-sensitive data (to-do lists, notes) |
| **Build now** | Toy app, task tracker, personal dashboard, simple calculator |
| **Don't build yet** | Real users, payments, complex auth, subscriptions, public launch |
| **Payment?** | ❌ No |
| **Security level** | Basic secret safety (no keys in code) |
| **Public access?** | ❌ No |

### Detail Table

| Field | Detail |
|---|---|
| **Required documentation** | README.md (even for personal projects) |
| **Required testing** | Manual — does the main feature work? |
| **Allowed automation** | Simple local scripts only |
| **Legal/tax/privacy review?** | ❌ No |
| **Best ChatGPT feature** | Canvas for code drafting, Projects for organizing |
| **Best M365 Copilot feature** | Copilot in Word/Excel for docs, Copilot Chat for planning |
| **Deliverables** | Working personal tool you actually use |
| **Success criteria** | You use the tool at least 3 times in one week |
| **Common mistake** | Over-engineering a personal tool with enterprise features |
| **Time-box** | 3–5 days maximum |
| **When to move** | You use it yourself and think "others might want this too" |
| **When to stop/pivot** | You built it and never use it — the tool is not useful |

### Lifecycle Ladder Fields

| Field | Detail |
|---|---|
| **What unlocks next rung** | You use the tool yourself + identify someone who might benefit |
| **Tools that activate** | VS Code, Cline, GitHub (private repo), Supabase (if data needed) |
| **Risks that increase** | Minimal — only your own data |
| **New responsibilities** | Keep secrets out of code |
| **Best data storage** | Local files or Supabase (free tier, Level 0–1 data) |
| **Decision point** | Continue (useful for you) or kill (not useful) |

---

## 6. 🔒 Stage 3 — Private (Trusted Few)

### Overview

| Field | Detail |
|---|---|
| **Goal** | Share with 2–3 trusted people for early, honest feedback |
| **Risk level** | 🟢 Low |
| **Data allowed** | Level 0–1, maybe limited Level 2 (personal private data — only if trusted tester agrees) |
| **Build now** | Login if needed, basic feedback mechanism, fix obvious bugs |
| **Don't build yet** | Public launch, ads, analytics, payment system |
| **Payment?** | ❌ No |
| **Security level** | Stronger privacy — trusted access only, no public links |
| **Public access?** | ❌ No — invite only |

### Detail Table

| Field | Detail |
|---|---|
| **Required documentation** | README + basic usage instructions |
| **Required testing** | Manual testing of main workflow by you AND one other person |
| **Allowed automation** | Simple notifications (email on feedback submission) |
| **Legal/tax/privacy review?** | ❌ No (trusted context) |
| **Best ChatGPT feature** | Projects for organizing feedback, Agent Mode for quick iterations |
| **Best M365 Copilot feature** | Loop for shared feedback notes, Forms for quick surveys |
| **Deliverables** | Working tool + feedback from 2–3 trusted people |
| **Success criteria** | At least 2 people use it and give actionable feedback |
| **Common mistake** | Sharing too broadly too early — you want honest feedback, not public scrutiny |
| **Time-box** | 3–5 days of feedback collection |
| **When to move** | Feedback is positive + you identified concrete improvements |
| **When to stop/pivot** | Trusted friends say "I wouldn't use this" — reconsider the idea |

### Lifecycle Ladder Fields

| Field | Detail |
|---|---|
| **What unlocks next rung** | Positive feedback from trusted testers + concrete improvements identified |
| **Tools that activate** | Tally.so (feedback forms), Loom (screen recordings) |
| **Risks that increase** | Other people's data (even small amounts) |
| **New responsibilities** | Communicate how their data is used. Don't share their feedback publicly |
| **Best data storage** | Supabase (private project) or local files shared securely |
| **Decision point** | Continue (feedback positive) or pivot (feedback negative) or kill |

---

## 7. 🔧 Stage 4 — Prototype

### Overview

| Field | Detail |
|---|---|
| **Goal** | Build a clickable demo with fake data. Show to 5–10 people. Validate the concept visually |
| **Risk level** | 🟢 Low |
| **Data allowed** | Level 0 — Demo/fake data ONLY. No real user data |
| **Build now** | Clickable screens, fake data, shareable prototype link |
| **Don't build yet** | Real database, real auth, real backend, payment, analytics |
| **Payment?** | ❌ No |
| **Security level** | Basic — no secrets in prototype code |
| **Public access?** | 🟡 Semi-public — shareable link, but not actively promoted |

### Detail Table

| Field | Detail |
|---|---|
| **Required documentation** | None for prototype; optional one-liner description |
| **Required testing** | Does the main flow work in the prototype? Can a user complete it? |
| **Allowed automation** | None |
| **Legal/tax/privacy review?** | ❌ No (demo data only) |
| **Best ChatGPT feature** | Prompt 3 (AI App Builder) from prompt library |
| **Best M365 Copilot feature** | Copilot Chat to brainstorm UI copy and user flows |
| **Deliverables** | Clickable prototype + shareable link + feedback from 5 people |
| **Success criteria** | ≥3/5 people understand the main action within 10 seconds |
| **Common mistake** | Spending too long polishing the prototype — it is a DEMO, not a product |
| **Time-box** | 2–3 days maximum |
| **When to move** | People "get it" and ask when the real version is ready |
| **When to stop/pivot** | People are confused by the concept — not just the design, but the purpose |

### Lifecycle Ladder Fields

| Field | Detail |
|---|---|
| **What unlocks next rung** | Positive prototype feedback + decision to build the real thing |
| **Tools that activate** | Bolt.new, Lovable, v0.dev, Figma (prototype mode) |
| **Risks that increase** | Low — prototype uses fake data only |
| **New responsibilities** | Collect and organize user feedback |
| **Best data storage** | No real data stored. Prototype hosted on bolt.host or lovable.app |
| **Decision point** | Continue (people want this) or pivot (wrong concept) or kill |

---

## 8. 📁 Stage 5 — Portfolio Project

### Overview

| Field | Detail |
|---|---|
| **Goal** | Package the project for your portfolio. Show skills, process, and results |
| **Risk level** | 🟢 Low |
| **Data allowed** | Level 0 — Demo data + screenshots. NEVER real client/user data |
| **Build now** | README, screenshots, case study (Problem → Process → Solution → Result) |
| **Don't build yet** | Complex backend, real users, payment, production monitoring |
| **Payment?** | ❌ No |
| **Security level** | Basic — no secrets in public repo. Use .gitignore |
| **Public access?** | ✅ Yes — public repo or hosted demo with demo data |

### Detail Table

| Field | Detail |
|---|---|
| **Required documentation** | README.md, screenshots, optional case study |
| **Required testing** | Main flow works end-to-end with demo data |
| **Allowed automation** | CI/CD for auto-deploy (optional, nice to show) |
| **Legal/tax/privacy review?** | ❌ No |
| **Best ChatGPT feature** | Canvas for writing README and case study |
| **Best M365 Copilot feature** | Word with Copilot for case study, PowerPoint for project presentation |
| **Deliverables** | Public README + screenshots + working demo link + case study |
| **Success criteria** | A hiring manager or peer can understand what you built and why in 2 minutes |
| **Common mistake** | Exposing real secrets, real data, or claiming you hand-coded everything when AI helped |
| **Time-box** | 1–2 days to package |
| **When to move** | Someone asks to use it for real (not just as a portfolio piece) |
| **When to stop** | Portfolio is complete. Archive unless real demand emerges |

### Lifecycle Ladder Fields

| Field | Detail |
|---|---|
| **What unlocks next rung** | Real interest from potential users who want to use it |
| **Tools that activate** | GitHub Pages (for hosting demo), Cloudflare Pages |
| **Risks that increase** | Public code = anyone can see it. Check for exposed secrets |
| **New responsibilities** | Honest attribution (Portfolio Honesty Rule — if AI helped, say so) |
| **Best data storage** | Demo data in `/demo-data/` folder. No real data |
| **Decision point** | Archive (done) or continue (real demand exists) |

---

## 9. 🌐 Stage 6 — Public Demo

### Overview

| Field | Detail |
|---|---|
| **Goal** | Public link that anyone can try. Uses demo data. Showcases the concept |
| **Risk level** | 🟡 Medium |
| **Data allowed** | Level 0 — Demo data only. If users can input data: Level 0–1 max |
| **Build now** | Error handling, basic mobile layout, demo mode, privacy note |
| **Don't build yet** | Payments, complex auth with real user data, admin panel |
| **Payment?** | ❌ No |
| **Security level** | Medium — basic error handling, no exposed secrets, HTTPS |
| **Public access?** | ✅ Yes — anyone can visit |

### Detail Table

| Field | Detail |
|---|---|
| **Required documentation** | README + privacy note (if any data is collected) |
| **Required testing** | Main flow works on mobile and desktop. Error states exist |
| **Allowed automation** | Auto-deploy from GitHub. Basic monitoring optional |
| **Legal/tax/privacy review?** | 🟡 Basic — privacy note if collecting any data (even analytics) |
| **Best ChatGPT feature** | Data Analysis for testing, web search for competitive positioning |
| **Best M365 Copilot feature** | Copilot in Word for privacy note drafting |
| **Deliverables** | Public URL + working demo + basic error handling + privacy note |
| **Success criteria** | 10+ unique visitors. ≥50% can complete the main flow without help |
| **Common mistake** | Launching publicly without testing error states — first real user hits a crash |
| **Time-box** | 2–3 days to add polish and error handling |
| **When to move** | People sign up, come back, or ask for real features |
| **When to stop/pivot** | No traffic, no interest, no feedback after 2 weeks of promotion |

### Lifecycle Ladder Fields

| Field | Detail |
|---|---|
| **What unlocks next rung** | Real interest from users + willingness to create accounts |
| **Tools that activate** | Cloudflare Pages, PostHog/Umami (analytics), UptimeRobot |
| **Risks that increase** | Public visibility. Anyone can try (and break) your app |
| **New responsibilities** | Monitor uptime. Respond to public feedback. Check for abuse |
| **Best data storage** | Supabase (demo data). PostHog for analytics |
| **Decision point** | Continue (interest exists) or pivot (no traction) |

---

## 10. 🧪 Stage 7 — Private Beta

### Overview

| Field | Detail |
|---|---|
| **Goal** | 5–20 real users with real accounts. Test the full workflow with real (but limited) data |
| **Risk level** | 🟡 Medium–High |
| **Data allowed** | Level 0–2 — Demo + personal non-sensitive + some private personal data |
| **Build now** | Auth/login, monitoring, support path, feedback mechanism, RLS, backups |
| **Don't build yet** | High-risk automations, complex multi-role permissions, payment (maybe manual paid pilot) |
| **Payment?** | 🟡 Maybe — manual paid pilot only |
| **Security level** | RLS enabled, backups configured, logs reviewed, no secrets exposed |
| **Public access?** | ❌ Invite-only |

### Detail Table

| Field | Detail |
|---|---|
| **Required documentation** | README + PROJECT_WORKFLOW.md + TEST_PLAN.md + SECURITY_CHECKLIST.md |
| **Required testing** | Full workflow tested by you AND beta users. Security review. Mobile tested |
| **Allowed automation** | Notifications, simple workflows (with human approval for risky actions) |
| **Legal/tax/privacy review?** | 🟡 Recommended — especially if collecting personal data |
| **Best ChatGPT feature** | Agent Mode for rapid bug fixes, Tasks for scheduled check-ins |
| **Best M365 Copilot feature** | Power Automate for feedback notifications ⚙️, Excel for tracking |
| **Deliverables** | Working app with real users + feedback log + bug tracker |
| **Success criteria** | ≥60% of beta testers complete the core flow. ≥3 say they would pay |
| **Common mistake** | Inviting too many people too early. Beta = controlled, small group |
| **Time-box** | 1–2 weeks of beta testing |
| **When to move** | Beta feedback is positive + ≥3 people show willingness to pay |
| **When to stop/pivot** | Beta testers churn (leave) or give consistently negative feedback |

### Lifecycle Ladder Fields

| Field | Detail |
|---|---|
| **What unlocks next rung** | Positive beta feedback + payment signals from ≥3 users |
| **Tools that activate** | Sentry (error tracking), Supabase RLS, Crisp (support chat) |
| **Risks that increase** | Real user data. Real expectations. Real support requests |
| **New responsibilities** | Monitor errors daily. Respond to beta users within 24 hrs. Protect their data |
| **Best data storage** | Supabase with RLS enabled. Backups configured |
| **Decision point** | Continue (ready for revenue test) or pivot or kill |

---

## 11. 💰 Stage 8 — Revenue Test

### Overview

| Field | Detail |
|---|---|
| **Goal** | Test if people will actually pay. First real revenue. Validate the business model |
| **Risk level** | 🔴 High |
| **Data allowed** | Depends on app — Level 0–2 typically |
| **Build now** | Payment flow, refund policy, support channel, pricing page |
| **Don't build yet** | Advanced scale infrastructure, complex subscription tiers, enterprise features |
| **Payment?** | ✅ Yes — carefully, with test mode first |
| **Security level** | Stronger — legal/tax/privacy check needed |
| **Public access?** | ✅ Yes (or invite-only with payment link) |

### Detail Table

| Field | Detail |
|---|---|
| **Required documentation** | All previous docs + refund policy + terms of service (basic) + privacy policy |
| **Required testing** | Payment flow tested in test mode. Full workflow tested. Security reviewed |
| **Allowed automation** | Payment notifications, receipt emails (automated via payment provider) |
| **Legal/tax/privacy review?** | ✅ Yes — before accepting real money, review tax, refund, and privacy obligations |
| **Best ChatGPT feature** | Deep Research for pricing research, Canvas for terms/privacy page drafts |
| **Best M365 Copilot feature** | Word with Copilot for legal page drafts, Excel for revenue tracking |
| **Deliverables** | Working payment flow + first revenue + refund policy + support channel |
| **Success criteria** | ≥1 paying customer. Revenue > $0. Refund rate < 20% |
| **Common mistake** | Not having a refund policy. Getting real money without understanding tax implications |
| **Time-box** | 1–2 weeks to set up + 2–4 weeks to observe |
| **When to move** | Consistent revenue + growing users + manageable support burden |
| **When to stop/pivot** | Nobody pays. Or everyone pays once and churns (cancels) |

### Lifecycle Ladder Fields

| Field | Detail |
|---|---|
| **What unlocks next rung** | Consistent revenue + positive user feedback + sustainable operations |
| **Tools that activate** | Lemon Squeezy / PayMongo, refund system, support (Crisp) |
| **Risks that increase** | Real money = real legal obligations. Taxes. Refunds. Disputes |
| **New responsibilities** | Track revenue and fees. Handle refunds. Monitor support load. Tax compliance |
| **Best data storage** | Supabase (Pro if approaching limits). Lemon Squeezy for payment data |
| **Decision point** | Continue (revenue grows) or simplify (reduce scope) or kill (no traction) |

---

## 12. 🚀 Stage 9 — Public MVP

### Overview

| Field | Detail |
|---|---|
| **Goal** | Public app with real users, real payments, and real responsibilities |
| **Risk level** | 🔴 High |
| **Data allowed** | Level 0–2 only unless reviewed and approved for Level 3 |
| **Build now** | Privacy page, terms, monitoring, error tracking, rollback plan, support |
| **Don't build yet** | Regulated claims, multi-tenant enterprise features, advanced analytics |
| **Payment?** | ✅ Yes |
| **Security level** | Review + rollback + monitoring. RLS enforced. Secrets safe. HTTPS. Backups |
| **Public access?** | ✅ Yes — fully public |

### Detail Table

| Field | Detail |
|---|---|
| **Required documentation** | Full doc set: README, PROJECT_WORKFLOW, DECISIONS, TEST_PLAN, SECURITY_CHECKLIST, DEPLOYMENT, privacy page, terms |
| **Required testing** | Automated or thorough manual testing. Security review. Load tested if high traffic expected |
| **Allowed automation** | Full automation with human approval gates for risky actions |
| **Legal/tax/privacy review?** | ✅ Required. Privacy policy, terms of service, tax compliance |
| **Best ChatGPT feature** | Agent Mode for rapid fixes, Tasks for daily monitoring prompts |
| **Best M365 Copilot feature** | Power BI for metrics dashboard ⚙️, Power Automate for alerts ⚙️ |
| **Deliverables** | Production app + monitoring + support + legal pages + payment + analytics |
| **Success criteria** | DAU/MAU growing. Revenue growing. Churn <5%. Support manageable. No security incidents |
| **Common mistake** | Launching without a rollback plan. First major bug = no way to recover |
| **Time-box** | Ongoing — this is your live product |
| **When to move** | Revenue is repeatable. Operations are sustainable. You need to scale |
| **When to stop/pivot** | Revenue stagnates for 3+ months. User growth flatlines. You are burned out |

### Lifecycle Ladder Fields

| Field | Detail |
|---|---|
| **What unlocks next rung** | Repeatable revenue + sustainable operations + need to formalize |
| **Tools that activate** | Sentry, UptimeRobot, PostHog (full analytics), CI/CD (GitHub Actions) |
| **Risks that increase** | Real users depend on you. Downtime = lost trust. Security = critical |
| **New responsibilities** | SLAs (informal), uptime commitment, user communication, regular updates |
| **Best data storage** | Supabase Pro ($25/mo). Cloudflare Pages (production) |
| **Decision point** | Scale (growing) or maintain (stable) or simplify (shrinking) |

---

## 13. 🏢 Stage 10 — Commercial SaaS

### Overview

| Field | Detail |
|---|---|
| **Goal** | Repeatable, sustainable business. Not a side project — a real company |
| **Risk level** | 🔴 Very High |
| **Data allowed** | Controlled production data — Level 0–3 with proper governance |
| **Build now** | Observability, formal support, CI/CD, staging environment, team processes |
| **Don't build yet** | Casual manual processes. Ad-hoc deployments. Unmonitored changes |
| **Payment?** | ✅ Yes — fully operational |
| **Security level** | Formal QA. Security reviews. Professional audit if handling sensitive data |
| **Public access?** | ✅ Yes |

### Detail Table

| Field | Detail |
|---|---|
| **Required documentation** | Full professional documentation. Internal SOPs. Runbooks. Incident response plan |
| **Required testing** | Automated tests (unit, integration). Staging environment. Rollback tested |
| **Allowed automation** | Full automation — but with audit trails and human approval for critical actions |
| **Legal/tax/privacy review?** | ✅ Professional review required. Business entity may be needed |
| **Best ChatGPT feature** | Custom GPTs for internal ops, Deep Research for competitive intelligence |
| **Best M365 Copilot feature** | Full Power Platform stack ⚙️, Power BI for business metrics ⚙️ |
| **Deliverables** | Business operations + team processes + scalable infrastructure + legal compliance |
| **Success criteria** | MRR growing. Multiple paying customers. Support handled. Legal compliant |
| **Common mistake** | Still doing everything manually. No delegation, no automation, no processes |
| **Time-box** | Ongoing — this is a business |
| **When to move** | Only if entering a regulated domain (health, finance, legal) |
| **When to stop** | Business is no longer viable. Revenue cannot cover costs |

### Lifecycle Ladder Fields

| Field | Detail |
|---|---|
| **What unlocks next rung** | Entering a regulated domain (medical, financial, legal data) |
| **Tools that activate** | Professional tools — may include paid tiers, enterprise hosting, dedicated support |
| **Risks that increase** | Business risk. Employee/contractor risk. Compliance risk. Financial risk |
| **New responsibilities** | Business operations. Tax filing. Legal compliance. Team management. Customer SLAs |
| **Best data storage** | Production-grade database with backups, monitoring, and access controls |
| **Decision point** | Grow (revenue justifies) or sell or wind down |

---

## 14. ⚖️ Stage 11 — High-Risk / Regulated

### Overview

| Field | Detail |
|---|---|
| **Goal** | Build and operate in a regulated domain: medical, legal, financial, government, children's data, etc. |
| **Risk level** | ⛔ Critical / Maximum |
| **Data allowed** | Strict — Level 3–4 only with full governance, encryption, access control |
| **Build now** | Expert-reviewed product. Professional security audit. Compliance documentation |
| **Don't build yet** | DIY public launch without professional review |
| **Payment?** | ✅ Only after full review |
| **Security level** | Professional review required. Encryption at rest. Audit trails. Access logs |
| **Public access?** | ✅ Only after professional review and compliance certification |

### Detail Table

| Field | Detail |
|---|---|
| **Required documentation** | Full compliance documentation. Audit trails. Data Processing Agreements. Incident response plan |
| **Required testing** | Professional QA. Penetration testing. Compliance testing. Third-party audit |
| **Allowed automation** | Fully governed automation with audit trails, access controls, and human approval |
| **Legal/tax/privacy review?** | ✅ Mandatory professional review. Legal counsel required |
| **Best ChatGPT feature** | Deep Research for regulatory requirements (but NEVER rely solely on AI for legal/medical/financial advice) |
| **Best M365 Copilot feature** | Microsoft Purview (if available) ⚙️, Power Platform with compliance features ⚙️ |
| **Deliverables** | Professionally reviewed, compliant, auditable product |
| **Success criteria** | Passes professional security/compliance audit. Zero data breaches. Full regulatory compliance |
| **Common mistake** | Building a health/finance/legal app without professional review — "it works" is not enough |
| **Time-box** | No rush. Compliance is more important than speed |
| **When to move** | N/A — this is the highest rung |
| **When to stop** | If you cannot meet regulatory requirements, do not launch in this domain |

### Lifecycle Ladder Fields

| Field | Detail |
|---|---|
| **What unlocks this stage** | Entering a regulated domain that requires compliance |
| **Tools that activate** | Professional legal review, compliance tools, enterprise-grade infrastructure |
| **Risks that increase** | Legal liability. Regulatory fines. User harm. Reputational damage |
| **New responsibilities** | Full regulatory compliance. Professional legal/security team. Data protection officer (in some jurisdictions) |
| **Best data storage** | Enterprise-grade, encrypted, compliant database with full audit trails |
| **Decision point** | Only proceed with professional guidance. Do NOT DIY |

> ⚠️ **UNGASIS is NOT designed for this stage.** If your project requires regulated data handling, get professional legal, security, and compliance review. AI tools (including ChatGPT, Copilot, and this playbook) cannot provide professional legal, medical, financial, or compliance advice.

---

## 15. 📊 Quick Reference: Rigor Dial Summary Table

| # | Stage | Goal | Risk | Data Level | Build Now | Don't Build Yet | Payment? | Security | Time-box |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 💡 Idea | Pick a problem | 🟢 None | 0 | Ideas, research | Everything | ❌ | None | 1–2 days |
| 2 | 🏠 Personal | Use it yourself | 🟢 Low | 0–1 | Simple tool | Users, payments | ❌ | Basic secrets | 3–5 days |
| 3 | 🔒 Private | Trusted few | 🟢 Low | 0–1 (limited 2) | Login, feedback | Public, ads | ❌ | Stronger privacy | 3–5 days |
| 4 | 🔧 Prototype | Clickable demo | 🟢 Low | 0 | Fake data, screens | Real DB, auth | ❌ | Basic | 2–3 days |
| 5 | 📁 Portfolio | Show skills | 🟢 Low | 0 | README, screenshots | Complex backend | ❌ | .gitignore | 1–2 days |
| 6 | 🌐 Demo | Public link | 🟡 Med | 0 (0–1) | Error handling, mobile | Payments, complex auth | ❌ | Medium | 2–3 days |
| 7 | 🧪 Beta | 5–20 real users | 🟡 M-H | 0–2 | Auth, RLS, monitoring | High-risk automation | 🟡 Maybe | RLS, backups | 1–2 weeks |
| 8 | 💰 Revenue | First payment | 🔴 High | 0–2 | Payment, refund, support | Advanced scale | ✅ Carefully | Legal/tax review | 1–4 weeks |
| 9 | 🚀 MVP | Public + payment | 🔴 High | 0–2 (3 reviewed) | Privacy, terms, monitoring | Regulated claims | ✅ Yes | Full review | Ongoing |
| 10 | 🏢 SaaS | Real business | 🔴 V-High | 0–3 governed | CI/CD, formal QA, ops | Manual-only processes | ✅ Yes | Formal audit | Ongoing |
| 11 | ⚖️ Regulated | Compliance required | ⛔ Critical | 3–4 strict | Expert-reviewed | DIY launch | ✅ After review | Pro review required | No rush |

---

## 16. 🧭 How to Use This: Decision Flowchart

Use this flowchart to figure out your current stage:

```text
START HERE
    │
    ▼
Do you have an app idea?
    │
    ├── NO  → You are at Stage 1: 💡 Idea
    │
    ├── YES
    │     │
    │     ▼
    │   Have you built anything yet?
    │     │
    │     ├── NO  → You are at Stage 1: 💡 Idea
    │     │
    │     ├── YES
    │     │     │
    │     │     ▼
    │     │   Do you use it yourself?
    │     │     │
    │     │     ├── NO  → You are at Stage 4: 🔧 Prototype
    │     │     │
    │     │     ├── YES
    │     │     │     │
    │     │     │     ▼
    │     │     │   Have other people used it?
    │     │     │     │
    │     │     │     ├── NO  → You are at Stage 2: 🏠 Personal Use
    │     │     │     │
    │     │     │     ├── YES, 2–3 trusted → Stage 3: 🔒 Private
    │     │     │     │
    │     │     │     ├── YES, 5–20 beta → Stage 7: 🧪 Private Beta
    │     │     │     │
    │     │     │     ├── YES, public link → Stage 6: 🌐 Demo
    │     │     │     │          or Stage 9: 🚀 MVP (if payments exist)
    │     │     │     │
    │     │     │     ▼
    │     │     │   Are people paying?
    │     │     │     │
    │     │     │     ├── NO  → Stage 6–7
    │     │     │     │
    │     │     │     ├── TESTING → Stage 8: 💰 Revenue Test
    │     │     │     │
    │     │     │     ├── YES, growing → Stage 9: 🚀 Public MVP
    │     │     │     │
    │     │     │     ├── YES, repeatable → Stage 10: 🏢 Commercial SaaS
    │     │     │     │
    │     │     │     └── Regulated domain → Stage 11: ⚖️ High-Risk
    │     │
    │     │
    │     ▼
    │   Is this for your portfolio only (no real users)?
    │     │
    │     ├── YES → Stage 5: 📁 Portfolio Project
    │     │
    │     └── NO  → Continue above flow
    │
    └── (loop back to start)
```

---

## 17. 📌 Default Assumption

> **You are at Stage 1 (💡 Idea) → Stage 2 (🏠 Personal Use) until you explicitly launch publicly or charge money.**

This means:
- You use **light rigor** by default
- You do NOT need privacy policies, terms of service, payment flows, or security audits yet
- You DO need basic secret safety (no keys in code, no secrets in GitHub)
- You focus on **building something useful**, not on enterprise infrastructure

**When your stage changes, your rigor must change too.** Come back to this document and check the requirements for your new stage before proceeding.

---

> **UNGASIS Content Module: Rigor Dial & Lifecycle Ladder**  
> Module ID: R3  
> Version: 1.0  
> Date: 2026-05-31  
> Sources: AI Builder's Master Workflow Prompt v4.0 §9 + §10 + Unified Beginner Solopreneur App Building Workflow Playbook v3.0 §4  
> Author: UNGASIS Content Absorption Pipeline  
> Status: ✅ Complete  
