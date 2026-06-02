# UNGASIS Content Module: 10-Phase Build Workflow

> 🔄 Module ID: R2  
> 📂 File: `ungasis-build-workflow.md`  
> 🔗 Sources: Playbook §11 (The 10-Phase Workflow) + Master Prompt §24.5E (10-Phase Step-by-Step Workflow)  
> 🎯 Audience: Beginner / not tech-savvy / ESL / $0 budget  

---

## 📖 Table of Contents

1. [The Big Picture — Phase Flow Diagram](#1--the-big-picture--phase-flow-diagram)
2. [Week-by-Week Progress Visual](#2--week-by-week-progress-visual)
3. [Phase 1 — Pick and Narrow the Idea](#3--phase-1--pick-and-narrow-the-idea)
4. [Phase 2 — Validate Customer Pain](#4--phase-2--validate-customer-pain)
5. [Phase 3 — Design Simple MVP](#5--phase-3--design-simple-mvp)
6. [Phase 4 — Build Clickable Prototype](#6--phase-4--build-clickable-prototype)
7. [Phase 5 — Build Functional MVP](#7--phase-5--build-functional-mvp)
8. [Phase 6 — Test with Real Users](#8--phase-6--test-with-real-users)
9. [Phase 7 — Deploy Publicly](#9--phase-7--deploy-publicly)
10. [Phase 8 — Add Monetization](#10--phase-8--add-monetization)
11. [Phase 9 — Track Metrics](#11--phase-9--track-metrics)
12. [Phase 10 — Improve and Scale](#12--phase-10--improve-and-scale)
13. [Summary: 10 Phases at a Glance](#13--summary-10-phases-at-a-glance)
14. [Common Mistakes by Phase](#14--common-mistakes-by-phase)

---

## 1. 🗺️ The Big Picture — Phase Flow Diagram

```text
┌────────────────┐    ┌────────────────┐    ┌────────────────┐
│   PHASE 1      │    │   PHASE 2      │    │   PHASE 3      │
│  💡 Pick Idea  │───▶│  🔍 Validate   │───▶│  🎨 Design     │
│  (Days 1–2)    │    │     Pain       │    │   Simple MVP   │
│                │    │  (Days 3–5)    │    │  (Days 6–7)    │
└────────────────┘    └───────┬────────┘    └────────────────┘
                              │                      │
                      ❌ Pain not real?               │
                      ◀── Go back to                 ▼
                          Phase 1            ┌────────────────┐
                                             │   PHASE 4      │
                                             │  🖱️ Build      │
                                             │   Prototype    │
                                             │  (Days 8–10)   │
                                             └────────────────┘
                                                     │
                                                     ▼
┌────────────────┐    ┌────────────────┐    ┌────────────────┐
│   PHASE 7      │    │   PHASE 6      │    │   PHASE 5      │
│  🚀 Deploy     │◀───│  🧪 Test with  │◀───│  🔧 Build      │
│   Publicly     │    │   Real Users   │    │ Functional MVP │
│  (Days 24–25)  │    │  (Days 21–23)  │    │  (Days 11–20)  │
└────────────────┘    └────────────────┘    └────────────────┘
        │
        ▼
┌────────────────┐    ┌────────────────┐    ┌────────────────┐
│   PHASE 8      │    │   PHASE 9      │    │   PHASE 10     │
│  💰 Add        │───▶│  📈 Track      │───▶│  🔄 Improve    │
│ Monetization   │    │   Metrics      │    │   and Scale    │
│  (Days 26–28)  │    │  (Day 29)      │    │  (Day 30+)     │
└────────────────┘    └────────────────┘    └───────┬────────┘
                                                    │
                                              ◀─────┘
                                          (Weekly loop forever)
```

### Key Decision Points in the Flow

| After Phase | Decision | If YES | If NO |
|---|---|---|---|
| Phase 2 | Is the pain real? (≥7/10 confirm) | Continue to Phase 3 | Go back to Phase 1, pick different idea |
| Phase 4 | Do people want to use the prototype? | Continue to Phase 5 | Revisit Phase 2 or Phase 3 |
| Phase 6 | Do testers succeed with the app? | Continue to Phase 7 | Fix top problems, re-test |
| Phase 8 | Are people willing to pay? | Continue to Phase 9 | Stay free, re-validate value |
| Phase 10 | Is usage growing? | Scale carefully | Pivot, simplify, or kill |

---

## 2. 📅 Week-by-Week Progress Visual

From Master Prompt §24.5E:

```text
Week 1: 💡→🔍→📋     VALIDATE idea (talk to humans, not code)
Week 2: 🎨→🖱️→📚     PROTOTYPE with AI + learn your tools
Week 3: 🔧→🗄️→🧪     BUILD the real MVP with AI assistance
Week 4: 🚀→💰→📈     DEPLOY, monetize, and launch publicly
```

| Week | Focus | Phases | Key Output |
|---|---|---|---|
| **Week 1** | Validate | Phase 1 + Phase 2 | Validated problem + survey results |
| **Week 2** | Prototype & Learn | Phase 3 + Phase 4 | Clickable prototype + tool familiarity |
| **Week 3** | Build | Phase 5 | Working functional MVP |
| **Week 4** | Deploy & Monetize | Phase 6 + 7 + 8 + 9 + 10 | Live app + payment + metrics + improvement loop |

---

## 3. 💡 Phase 1 — Pick and Narrow the Idea

**Days 1–2**

### 🎯 Goal

Choose **one** painful problem to solve. Do not try to solve many problems at once.

### 💡 Analogy

> 🍳 You are picking which dish to put on the menu. Do not open a full restaurant — start with **one signature dish** people are already hungry for.

### 📋 Key Actions

| Step | Action | Tool | Time |
|---|---|---|---|
| 1.1 | Write down 3–5 app ideas | Notion or paper | 30 min |
| 1.2 | For each idea, answer: "Who has this pain? How bad? Will they pay?" | ChatGPT / Copilot Chat | 30 min |
| 1.3 | Check Google Trends — is anyone searching for this? | Google Trends (free) | 15 min |
| 1.4 | Search Reddit/X — are people complaining about this problem? | Reddit, X (free) | 30 min |
| 1.5 | Pick ONE idea using the Pain × Frequency × Willingness-to-Pay score | Your brain + AI | 15 min |

### Idea Scoring Table

Write three ideas in this format:

> I help **[specific user]** who struggles with **[specific pain]** achieve **[specific result]** without **[current frustration]**.

Score each idea 1–10 on these five dimensions:

| Score | Question | What 10 Means |
|---|---|---|
| **Pain** | How painful is this problem? | Extremely painful — people actively complain about it |
| **Frequency** | How often does it happen? | Daily or multiple times per day |
| **Willingness to pay** | Would someone pay, save time, or use it repeatedly? | They already pay for bad alternatives |
| **Access** | Can I reach these users? | I know exactly where they are (communities, groups) |
| **Simplicity** | Can I build the first version in 30 days? | Very straightforward — 3 features max |

**Pick the idea with the highest total score.**

### 📦 Output

- 3–5 ideas scored
- ONE idea selected
- One-sentence problem statement

### 🛠️ Tools

Notion, ChatGPT / M365 Copilot, Google Trends, Reddit, X

### ⏱️ Time Estimate

~2 hours total (Days 1–2)

### 🚫 What NOT to Do Yet

- Do NOT start coding
- Do NOT pick a framework or database
- Do NOT design screens
- Do NOT buy a domain name
- Do NOT tell everyone your idea before validating it

### 🚦 Decision Point

Have you picked ONE idea with a clear target user and painful problem?
- ✅ YES → Move to Phase 2
- ❌ NO → Keep brainstorming. Ask 3 friends or colleagues what annoys them daily

---

## 4. 🔍 Phase 2 — Validate Customer Pain

**Days 3–5**

### 🎯 Goal

**Prove the problem is real** before building anything. Talk to real humans.

### 📋 Key Actions

| Step | Action | Tool | Time |
|---|---|---|---|
| 2.1 | Write a 1-sentence problem statement: "**[WHO]** struggles with **[WHAT]** because **[WHY]**" | Notion | 15 min |
| 2.2 | Find 5–10 people who have this problem | Reddit, Facebook groups, Discord | 1 hr |
| 2.3 | Create a 5–7 question survey | Google Forms or Tally.so (free) | 30 min |
| 2.4 | Share survey, get at least 10 responses | DM or post in communities | 2 days |
| 2.5 | Analyze: Do ≥7/10 people confirm the pain is real? | ChatGPT (paste responses) | 30 min |

### Interview Questions (from Playbook §11)

Ask potential users:
- What problem are you trying to solve?
- How do you solve it today?
- What is annoying about your current method?
- How often does this happen?
- What would a better solution do?
- Would you test a rough version?
- Would you pay later if it saves time/money?

### Minimum Validation Criteria

| Criteria | Minimum Threshold |
|---|---|
| Real people contacted | 5–10 |
| Survey responses | 10+ |
| People who agree to test | 3+ |
| Payment or strong usage signal | 1+ person |

### 📦 Output

- Problem statement (one sentence)
- Survey results
- GO / NO-GO decision

### 🛠️ Tools

Notion, Tally.so / Google Forms, Reddit, Facebook Groups, Discord, WhatsApp, ChatGPT

### ⏱️ Time Estimate

~4–5 hours active work + 2 days waiting for survey responses

### 🚫 What NOT to Do Yet

- Do NOT start building
- Do NOT design screens
- Do NOT choose a tech stack
- Do NOT create a GitHub repo
- Do NOT spend money on ads or domains

### 🚦 Decision Point — STOP GATE

🛑 **This is the most important gate in the entire workflow.**

| Survey Result | Decision |
|---|---|
| ≥7/10 confirm the pain is real | ✅ **GO** — Continue to Phase 3 |
| 4–6/10 confirm the pain | 🟡 **MAYBE** — Refine the idea, re-survey a different audience |
| <4/10 confirm the pain | ❌ **NO-GO** — Go back to Phase 1, pick a different idea |

> **Do not build something nobody wants.** Stop if the pain is weak. Pivot early. This saves you weeks of wasted effort.

---

## 5. 🎨 Phase 3 — Design Simple MVP

**Days 6–7**

### 🎯 Goal

Define the **smallest useful version** of your app. Design 3–5 screens maximum.

### 💡 The MVP Rule

```text
One target user.
One main workflow.
One useful result.
Three must-have features max.
```

Example:
> User signs up → adds one client → records one note → sees next action.

### 📋 Key Actions

| Step | Action | Tool | Time |
|---|---|---|---|
| 3.1 | List the **3 core screens** your app needs (no more!) | Notion | 15 min |
| 3.2 | Sketch rough wireframes (boxes and arrows) | Paper or Excalidraw (free) | 30 min |
| 3.3 | Define your **ONE core user flow**: User opens app → does X → gets Y | Notion | 15 min |
| 3.4 | Write the "NOT building" list (features you deliberately skip) | Notion | 15 min |
| 3.5 | Create polished wireframe or generate UI with v0.dev | Figma (free) or v0.dev | 2 hrs |

### The "NOT Building" List Template

Write this explicitly. It prevents scope creep:

```text
Not building now:
- admin panel
- marketplace
- teams / multi-user collaboration
- mobile native app
- AI agent / chatbot features
- payment system (yet)
- complex analytics dashboard
- multi-language support
- dark mode
- social features (likes, comments, shares)
```

### Screen States to Define

For each of the 3–5 screens, define what happens in all four states:

| State | Meaning | What to show |
|---|---|---|
| **Empty** | No data yet | Friendly message + action button |
| **Loading** | Waiting for data | Spinner or skeleton |
| **Error** | Something failed | Clear message + retry option |
| **Success** | Action completed | Confirmation toast or redirect |

### 📦 Output

- 3–5 screen designs (sketches or wireframes)
- One core user flow documented
- NOT-building list
- Screen states defined

### 🛠️ Tools

Notion, Paper, Excalidraw, Figma, v0.dev

### ⏱️ Time Estimate

~3–4 hours (Days 6–7)

### 🚫 What NOT to Do Yet

- Do NOT build the app
- Do NOT connect a database
- Do NOT write code
- Do NOT add "nice-to-have" features
- Do NOT design more than 5 screens
- Do NOT spend more than 2 days on design

### 🚦 Decision Point

Can you explain your MVP in one sentence: "The user does [X] and gets [Y]"?
- ✅ YES → Move to Phase 4
- ❌ NO → Simplify further. Remove features until you can say it in one sentence

---

## 6. 🖱️ Phase 4 — Build Clickable Prototype

**Days 8–10**

### 🎯 Goal

Build a **clickable prototype** with fake data that people can actually try. Not a real app yet — a working demo.

### 📋 Key Actions

| Step | Action | Tool | Time |
|---|---|---|---|
| 4.1 | Use **Bolt.new** or **Lovable** — describe your app in plain English | Bolt.new or Lovable (free tier) | 2 hrs |
| 4.2 | Iterate 3–5 times with follow-up prompts to refine | Same tool | 2 hrs |
| 4.3 | Add sample/fake data so it looks real | Same tool | 1 hr |
| 4.4 | Deploy the prototype (Bolt → bolt.host, Lovable → lovable.app) | Built-in deployment | 15 min |
| 4.5 | Share the link with 5 people for feedback | WhatsApp / Messenger / Email | 1 day |

### Prototype Checklist (from Playbook §11)

- [ ] Uses fake data (not real user data)
- [ ] No real secrets or API keys
- [ ] Works on mobile size
- [ ] User can complete the main flow
- [ ] Shared with 3–5 people
- [ ] Feedback captured in Tally / Notion

### 📦 Output

- Clickable prototype with shareable link
- Feedback notes from 3–5 people

### 🛠️ Tools

Bolt.new, Lovable, v0.dev, Figma (prototype mode), Google AI Studio, Tally.so (for feedback)

### ⏱️ Time Estimate

~6–8 hours + 1 day waiting for feedback

### 🚫 What NOT to Do Yet

- Do NOT add real payments
- Do NOT connect a real database
- Do NOT use real user data
- Do NOT spend more than 3 days on the prototype
- Do NOT try to make it perfect — it is a demo, not a product

### 🚦 Decision Point

Did at least 3 people try the prototype and give useful feedback?
- ✅ YES → Move to Phase 5
- ❌ NO → Share with more people or revisit Phase 2 (is the problem real?)

---

## 7. 🔧 Phase 5 — Build Functional MVP

**Days 11–20**

### 🎯 Goal

Build the **real, working app** that saves data, has login (if needed), and completes the core workflow.

### 📋 Key Actions

| Step | Action | Tool | Time |
|---|---|---|---|
| 5.1 | Set up project: `npx create-next-app@latest my-app` | VS Code + Terminal | 30 min |
| 5.2 | Set up Supabase: create project, create tables, enable auth | Supabase dashboard (free) | 1 hr |
| 5.3 | Use **Cline + Copilot** to build each screen one by one | VS Code | 5–7 days |
| 5.4 | Connect frontend to Supabase (database, login) | VS Code + Supabase docs | 2 days |
| 5.5 | Test every user flow manually | Your browser | 1 day |

### Evidence-Based Route Selection (from Playbook §11)

Choose the build route based on what you learned in Phases 2 and 4:

| Evidence | Build Route |
|---|---|
| People are curious but not committed | No-code MVP (Softr, Glide, stay in Bolt) |
| People test and give useful feedback | AI-assisted custom MVP (VS Code + Cline + Supabase) |
| People ask to pay or use repeatedly | GitHub + Supabase + monitored deploy |
| Problem still unclear | Return to validation (Phase 2) |

### Functional MVP Checklist (from Playbook §11)

- [ ] Signup/login only if needed
- [ ] Data save/edit/delete works
- [ ] One main workflow works end to end
- [ ] Simple mobile layout works
- [ ] README exists
- [ ] PROJECT_WORKFLOW.md exists
- [ ] .env.example exists (with fake placeholder values)
- [ ] No secrets in GitHub

### 🔒 Security Checkpoint

> **Never put Supabase keys in public/frontend code.** Use environment variables (`.env.local` file). Supabase `anon` key is designed to be public when Row Level Security is correctly configured, but your `service_role` key must NEVER be exposed.

### 📦 Output

- Working app with core workflow functional
- Data saves/loads correctly
- Login works (if needed)
- Code pushed to GitHub (private repo)

### 🛠️ Tools

VS Code, Cline, GitHub Copilot, Supabase, Next.js, Tailwind CSS, shadcn/ui, GitHub

### ⏱️ Time Estimate

~10 days (Days 11–20)

### 🚫 What NOT to Do Yet

- Do NOT add payments
- Do NOT add complex analytics
- Do NOT add an admin panel
- Do NOT add multiple user roles
- Do NOT try to make it "production-ready" — just make it work

### 🚦 Decision Point

Does the main workflow work end to end? Can a user sign up → do the main action → see the result?
- ✅ YES → Move to Phase 6
- ❌ NO → Fix the broken parts first. Do not move forward with a broken core flow

---

## 8. 🧪 Phase 6 — Test with Real Users

**Days 21–23**

### 🎯 Goal

Invite 3–10 real testers. Watch them use the app. Fix the top 3 problems.

### 📋 Key Actions

| Step | Action | Tool | Time |
|---|---|---|---|
| 6.1 | Invite 10–20 beta testers | Email / social media | 1 day |
| 6.2 | Watch them use your app (screen share or Loom recordings) | Loom (free) or Zoom | 2 hrs |
| 6.3 | Collect feedback with a simple form | Tally.so (free) | 30 min |
| 6.4 | Fix the top 3 problems they found | VS Code + Cline | 2 days |
| 6.5 | Decide: pivot, persist, or kill? | Your judgment + data | 1 hr |

### Testing Metrics to Track (from Playbook §11)

| Metric | Simple Meaning | What to Look For |
|---|---|---|
| **Activation** | Did the user reach the first useful result? | If not, setup is too hard |
| **Completion** | Did they finish the main workflow? | If not, flow is confusing |
| **Confusion** | Where did they get stuck? | Note exact moments of hesitation |
| **Repeat use** | Did they come back? | If yes, product has value |
| **Payment signal** | Did they ask about price or say they would pay? | Strongest signal of all |

### How to Test (from Playbook §11)

> **Watch behavior. Do not defend the app.** Fix the top 3 problems.

- Sit quietly while they use the app
- Ask them to "think aloud" — say what they are thinking as they navigate
- Do not explain features — if they need an explanation, the design failed
- Take notes on every moment of confusion
- After the session, ask: "What was the hardest part?"

### 📦 Output

- Feedback from 3–10 real testers
- Top 3 problems identified and fixed
- Pivot / persist / kill decision made

### 🛠️ Tools

Loom, Zoom, Tally.so, VS Code + Cline

### ⏱️ Time Estimate

~3 days (Days 21–23)

### 🚫 What NOT to Do Yet

- Do NOT launch publicly
- Do NOT add payments based on one tester's request
- Do NOT add features — fix bugs first
- Do NOT over-polish the UI

### 🚦 Decision Point

| What Happened | Decision |
|---|---|
| Most testers completed the core flow | ✅ Continue to Phase 7 |
| Most testers got stuck at the same point | 🟡 Fix that point, re-test with 3 more users |
| Most testers did not understand the purpose | ❌ Go back to Phase 2 or Phase 3 |
| Nobody came back or cared | ❌ Consider killing the project or pivoting |

---

## 9. 🚀 Phase 7 — Deploy Publicly

**Days 24–25**

### 🎯 Goal

Make the app live on the internet with a public link. Set up basic monitoring.

### 📋 Key Actions

| Step | Action | Tool | Time |
|---|---|---|---|
| 7.1 | Push code to GitHub (private repo) | GitHub (free) | 15 min |
| 7.2 | Connect GitHub to **Cloudflare Pages** (NOT Vercel for commercial) | Cloudflare Pages (free) | 30 min |
| 7.3 | Set up custom domain (optional, ~$10/year from Cloudflare) | Cloudflare Registrar | 30 min |
| 7.4 | Set up basic analytics | PostHog or Umami (free) | 30 min |
| 7.5 | Announce on social media / communities | X, Reddit, Product Hunt | 1 hr |

### Pre-Launch Checklist (from Playbook §11)

Before public sharing, verify:

- [ ] Main flow tested and working
- [ ] Mobile layout tested
- [ ] Privacy note/page exists (if collecting data)
- [ ] No secrets exposed
- [ ] Basic error handling exists
- [ ] Rollback plan exists
- [ ] Support/contact method exists
- [ ] Analytics or feedback form exists

### Deployment Options Table (from Playbook §11)

| App Type | Good Default Host |
|---|---|
| Static landing page | Netlify / Cloudflare Pages |
| React/Next app (learning only) | Vercel Hobby / Netlify / Cloudflare |
| Monetized app | Netlify / Cloudflare / commercial-suitable host after terms check |
| Firebase app | Firebase Hosting |
| AI Studio prototype | Export to GitHub/ZIP, then verify local run |

> ⚠️ **CRITICAL:** Vercel Hobby (free) **explicitly forbids commercial use**. Use **Cloudflare Pages** or **Netlify** for monetized apps.

### 📦 Output

- Live app with public URL
- Basic analytics tracking
- Social media announcement

### 🛠️ Tools

GitHub, Cloudflare Pages, PostHog / Umami, GitHub Actions (for Supabase keep-alive)

### ⏱️ Time Estimate

~3–4 hours (Days 24–25)

### 🚫 What NOT to Do Yet

- Do NOT add payments before the app is stable
- Do NOT announce on 10 platforms simultaneously — pick 2–3
- Do NOT skip the pre-launch checklist

### 🚦 Decision Point

Is the app live and accessible via URL? Can at least one person other than you use it?
- ✅ YES → Move to Phase 8
- ❌ NO → Debug the deployment. Check build logs in Cloudflare

---

## 10. 💰 Phase 8 — Add Monetization

**Days 26–28**

### 🎯 Goal

Add a payment system — but only if value has been validated. Start with the simplest possible payment.

> **Do not monetize too early.** Validate willingness to pay first.

### Monetization Progression (from Playbook §11)

Start with the lightest option and move up only when proven:

1. Waitlist (interest signal)
2. Manual demo (concierge MVP)
3. Paid pilot (charge one person manually)
4. One-time digital product
5. Subscription (only after repeated use is proven)

### 📋 Key Actions

| Step | Action | Tool | Time |
|---|---|---|---|
| 8.1 | Choose model: one-time, subscription, or freemium | Decision framework | 30 min |
| 8.2 | Set up **Lemon Squeezy** account | Lemon Squeezy (free) | 1 hr |
| 8.3 | Create your product/plan in Lemon Squeezy | Same | 30 min |
| 8.4 | Add checkout link/button to your app | VS Code | 2 hrs |
| 8.5 | Test purchase with test mode | Lemon Squeezy test mode | 30 min |

### Payment Options Table (from Playbook §11)

| Option | Best For | Notes |
|---|---|---|
| **Lemon Squeezy** | Global digital products, SaaS, Merchant of Record | Higher fee (5% + $0.50), simpler tax handling. ⚠️ ~1% international payout fee (Philippines — unverified) |
| **PayMongo** | Philippines local payments | Good PH option, check business requirements |
| **Stripe** | Supported countries/entities | Lower fees (2.9% + $0.30), but YOU handle tax compliance. ⚠️ Philippines not listed as supported country |
| **Manual invoice / bank transfer** | First paid pilots | Simple, but track legally/tax-wise |

> 💡 **Why Lemon Squeezy first (not Stripe)?** As a solopreneur selling globally from the Philippines, Lemon Squeezy is your **Merchant of Record** — they handle all tax compliance (VAT, GST, sales tax) in every country. You just get paid. With Stripe, YOU handle filing taxes in every jurisdiction.

> ⚠️ This is general planning, not legal/tax/accounting advice. Before real commercial launch, get qualified local review.

### 📦 Output

- Payment flow working (in test mode)
- Checkout button in app
- Pricing page or section

### 🛠️ Tools

Lemon Squeezy, PayMongo (PH alternative), VS Code

### ⏱️ Time Estimate

~5–6 hours (Days 26–28)

### 🚫 What NOT to Do Yet

- Do NOT add complex subscription tiers
- Do NOT add enterprise pricing
- Do NOT skip test-mode testing
- Do NOT launch payments without a refund policy
- Do NOT add payments if no one has expressed willingness to pay

### 🚦 Decision Point

Has at least one person tested the payment flow successfully (in test mode)?
- ✅ YES → Move to Phase 9
- ❌ NO → Fix the payment flow before going live

---

## 11. 📈 Phase 9 — Track Metrics

**Day 29**

### 🎯 Goal

Set up tracking for the numbers that tell you if your app is working. Only track what matters.

### Metrics Table (from Master Prompt §24.5E)

| Metric | What It Tells You | Tool | Target |
|---|---|---|---|
| **Visitors** | How many people find your app | PostHog / Umami | Growing week over week |
| **Signups** | How many create accounts | Supabase Auth dashboard | >10% of visitors |
| **Active users** | How many come back | PostHog | >30% return in 7 days |
| **Paying users** | How many actually pay | Lemon Squeezy dashboard | >2% of active users |
| **Churn** | How many cancel | Lemon Squeezy | <5% monthly |

### Product Events to Track (from Playbook §24)

Start with **only five** product events:

| Event | Meaning |
|---|---|
| `visited_landing` | User saw app |
| `signed_up` | User created account / joined waitlist |
| `completed_core_action` | User got first value |
| `returned_later` | User came back |
| `clicked_pricing_or_paid` | User showed payment signal |

### 📦 Output

- Analytics dashboard set up (PostHog or Umami)
- 5 key events tracked
- Baseline numbers recorded

### 🛠️ Tools

PostHog (free: 1M events/month), Umami (free: open source), Supabase Auth dashboard, Lemon Squeezy dashboard

### ⏱️ Time Estimate

~2 hours (Day 29)

### 🚫 What NOT to Do Yet

- Do NOT create a big analytics dashboard before users exist
- Do NOT track 50 events — 5 is enough
- Do NOT optimize for metrics before you have at least 100 users

### 🚦 Decision Point

Can you see how many people visited, signed up, and completed the core action?
- ✅ YES → Move to Phase 10
- ❌ NO → Fix the analytics setup first

---

## 12. 🔄 Phase 10 — Improve and Scale

**Day 30+**

### 🎯 Goal

Enter the **weekly improvement loop**. Fix problems. Add features only when real users ask. Scale only when numbers justify it.

### The Weekly Loop (from Playbook §11)

```text
Review feedback → Fix top bug → Improve main workflow → Measure usage → Decide next feature
```

### 📋 Key Actions

| Step | Action | When |
|---|---|---|
| 10.1 | Review feedback weekly, fix top 1–2 issues | Every week |
| 10.2 | Add ONE new feature per 2-week sprint | When users request it |
| 10.3 | Upgrade Supabase to Pro when DB hits 400MB | Approaching 500MB limit |
| 10.4 | Consider Stripe when revenue >$5K/mo | When Lemon Squeezy's 5% fee becomes significant |
| 10.5 | Add team members / hire help when revenue justifies | When you cannot keep up alone |

### Feature Addition Rules (from Playbook §11)

Do NOT add random features. Add features **only** when:

- Multiple users ask for the same thing
- The feature improves activation or retention
- It supports payment or support burden reduction
- It does not break the simple core flow

### 📦 Output

- Weekly improvement cycle running
- Bug fixes shipped
- Features added based on evidence
- Usage growing (or decision to pivot/kill)

### 🛠️ Tools

VS Code + Cline, GitHub, Tally.so (ongoing feedback), PostHog (metrics review), Notion (planning)

### ⏱️ Time Estimate

Ongoing — 2–5 hours per week for maintenance and improvement

### 🚫 What NOT to Do

- Do NOT add features nobody asked for
- Do NOT rebuild the entire app from scratch
- Do NOT scale infrastructure before you have users
- Do NOT ignore user feedback
- Do NOT stop tracking metrics

### 🚦 Decision Point (Weekly)

| What's Happening | Decision |
|---|---|
| Users growing, feedback positive, revenue starting | ✅ Continue — add next feature |
| Users plateau, no new sign-ups | 🟡 Try new marketing channels or simplify onboarding |
| Users leave, bad feedback, no payment signals | ❌ Pivot (change approach) or Kill (stop and start new idea) |
| You're burned out and alone | 🟡 Automate support, improve docs, consider a co-founder |

---

## 13. 📊 Summary: 10 Phases at a Glance

| Phase | Name | Days | Goal | Key Output | Tools |
|---|---|---|---|---|---|
| 1 | 💡 Pick Idea | 1–2 | Choose one painful problem | Scored ideas, one selected | Notion, ChatGPT |
| 2 | 🔍 Validate Pain | 3–5 | Prove problem is real | Survey results, GO/NO-GO | Tally, Reddit |
| 3 | 🎨 Design MVP | 6–7 | Define smallest useful version | 3–5 screens, NOT-building list | Figma, Excalidraw |
| 4 | 🖱️ Build Prototype | 8–10 | Clickable demo with fake data | Shareable prototype link | Bolt.new, Lovable |
| 5 | 🔧 Build MVP | 11–20 | Real working app | Functional app on GitHub | VS Code, Cline, Supabase |
| 6 | 🧪 Test Users | 21–23 | Watch real users, fix top 3 bugs | Feedback + fixed MVP | Loom, Tally |
| 7 | 🚀 Deploy | 24–25 | Put app live on internet | Public URL + analytics | Cloudflare Pages, PostHog |
| 8 | 💰 Monetize | 26–28 | Add payment flow | Working checkout | Lemon Squeezy |
| 9 | 📈 Track | 29 | Measure what matters | 5 events tracked | PostHog / Umami |
| 10 | 🔄 Scale | 30+ | Weekly improve loop | Continuous growth | All tools |

---

## 14. ⚠️ Common Mistakes by Phase

| Phase | Common Mistake | Why It Hurts | How to Avoid |
|---|---|---|---|
| 1 | Trying to solve 5 problems at once | You build something nobody needs | Pick ONE problem. Score it. Commit |
| 2 | Skipping validation ("I know it's a good idea") | You waste weeks building something nobody wants | Always survey ≥10 real people first |
| 3 | Designing 20 screens | Scope creep — you never finish | Max 5 screens. Write the NOT-building list |
| 4 | Making the prototype perfect | You spend weeks polishing a demo | Prototype = rough and fast. 2-3 days max |
| 5 | Trying to build everything at once | Giant builds break. AI can't handle huge requests | Build one screen at a time. Test after each |
| 6 | Defending the app during testing | You miss critical feedback | Shut up and watch. Take notes. Fix later |
| 7 | Deploying on Vercel Hobby for a paid app | ⚠️ Vercel Hobby forbids commercial use | Use Cloudflare Pages or Netlify |
| 8 | Adding payments before validating willingness to pay | Complex payment code for zero customers | Start with waitlist or manual paid pilot |
| 9 | Tracking 50 metrics | Analysis paralysis. You optimize nothing | Track exactly 5 events. Review weekly |
| 10 | Adding features nobody asked for | Feature bloat kills simple apps | Only add when multiple users request the same thing |

---

## 🏁 The Golden Rule of This Workflow

```text
VALIDATE before you BUILD.
BUILD before you POLISH.
POLISH before you MONETIZE.
MONETIZE before you SCALE.
```

Each phase earns the right to start the next one. If you skip a phase, you build on a shaky foundation.

---

> **UNGASIS Content Module: 10-Phase Build Workflow**  
> Module ID: R2  
> Version: 1.0  
> Date: 2026-05-31  
> Sources: Unified Beginner Solopreneur App Building Workflow Playbook v3.0 §11 + AI Builder's Master Workflow Prompt v4.0 §24.5E  
> Author: UNGASIS Content Absorption Pipeline  
> Status: ✅ Complete  
