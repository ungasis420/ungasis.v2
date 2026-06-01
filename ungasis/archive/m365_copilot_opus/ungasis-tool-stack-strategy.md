# UNGASIS Content Module: Tool Stack & Free-First Strategy

> **Part of:** UNGASIS OS — Your AI-Powered Personal Operating System
> **Who this is for:** Beginners, non-tech-savvy solopreneurs, ESL speakers
> **Purpose:** Know EXACTLY which tool to use for which job, pay NOTHING until you must, and never get overwhelmed by too many options

---

## 📖 Table of Contents

1. [The "Pick One Per Job" Rule](#1-the-pick-one-per-job-rule)
2. [Three Build Lanes Explained](#2-three-build-lanes-explained)
3. [Recommended Hybrid Strategy: Lane A + C](#3-recommended-hybrid-strategy-lane-a--c)
4. [Default Tool Stack by Stage](#4-default-tool-stack-by-stage)
5. [The Master Tool Map — Pick One Per Job](#5-the-master-tool-map--pick-one-per-job)
6. [Project Type Router](#6-project-type-router)
7. [Recommended Stacks — Validator + Builder](#7-recommended-stacks--validator--builder)
8. [Cost Guardrails & Upgrade Triggers](#8-cost-guardrails--upgrade-triggers)
9. [Critical Warnings](#9-critical-warnings)
10. [The "Never Pay a Peso You Didn't Plan" Rule](#10-the-never-pay-a-peso-you-didnt-plan-rule)
11. [Tool Decision Flowchart](#11-tool-decision-flowchart)

---

## 1. The "Pick One Per Job" Rule

### 🍳 The Kitchen Analogy

Imagine you walk into a kitchen supply store. There are 500 different gadgets — garlic presses, avocado slicers, banana hangers, electric egg peelers...

**You do NOT need all of them.**

To cook a great meal, you need:
- ✅ One good knife
- ✅ One good pan
- ✅ One good pot
- ✅ A cutting board
- ✅ A stove

That is it. The fancy gadgets come LATER — if you ever need them at all.

### The Rule

> **For every job your app needs done, pick ONE tool. Use it until it breaks or you outgrow it. Then — and only then — switch.**

### Why This Matters

| Without This Rule | With This Rule |
|-------------------|---------------|
| You spend weeks researching tools instead of building | You pick one, start building in minutes |
| You sign up for 15 services you never use | You use 5–7 tools that each do one job well |
| You get confused switching between similar tools | You know exactly where everything is |
| You pay for subscriptions you forgot about | You pay $0 until you have clear reason to upgrade |
| You feel overwhelmed and quit | You feel focused and make progress |

---

## 2. Three Build Lanes Explained

There are three ways to build an app. Each has tradeoffs.

### Full Comparison Table

| Aspect | 🅰️ Lane A: No-Code / AI Builders | 🅱️ Lane B: Low-Code | 🅲️ Lane C: AI-Assisted Coding |
|--------|-----------------------------------|---------------------|-------------------------------|
| **Speed to first version** | ⚡ Hours (fastest) | 🕐 Days | 🕐 Days–weeks |
| **Primary tools** | Bolt.new, Lovable, v0 | Bubble, Retool, FlutterFlow | Next.js + Copilot + Cline |
| **Backend included?** | ✅ Usually built-in | ✅ Usually built-in | You connect your own (Supabase) |
| **Hosting included?** | ✅ Usually built-in | ✅ Usually built-in | You choose (Cloudflare, Netlify) |
| **Payments** | ⚠️ Limited or manual | ⚠️ Platform-dependent | ✅ Full control (Lemon Squeezy, PayMongo) |
| **Code ownership** | ⚠️ Can export, but limited or messy | ⚠️ Platform-specific format | ✅ Full — you own every line |
| **Vendor lock-in** | 🔴 High — tied to the builder platform | 🔴 High — tied to the platform | 🟢 Low — open-source stack |
| **Scalability** | ⚠️ Limited by platform caps | ⚠️ Limited by platform | ✅ Full — scales with your code |
| **Learning curve** | ⭐ Very easy — prompt-based | ⭐⭐ Medium — UI builder | ⭐⭐⭐ Steeper — but AI helps a LOT |
| **Cost at 0 users** | Free (limited credits) | Free tier or trial | Free |
| **Cost at 100 users** | $0–$20/mo | $25–$100/mo | $0 (free hosting tiers) |
| **Cost at 1,000 users** | $20–$50/mo | $100–$500/mo | $0–$25/mo |
| **Cost at 10,000 users** | $50–$200/mo (may need upgrade) | $500–$2,000/mo | $25–$100/mo |
| **Best for** | Quick validation, MVPs, testing ideas | Internal tools, business apps with forms/workflows | Products you want to scale, sell, or fully own |
| **Worst for** | Complex custom logic, unique UX, long-term products | Highly custom UX, performance-critical apps | People who want zero coding (even with AI) |
| **Fit for UNGASIS** | ✅ Week 1–2 validation | ⚠️ Optional — usually skip | ✅ Week 3+ serious building |

### When to Use Each Lane

| Situation | Best Lane |
|-----------|-----------|
| "I just have an idea — I want to see if it makes sense" | 🅰️ Lane A |
| "I want a working prototype to show people in 48 hours" | 🅰️ Lane A |
| "I need a custom app I can grow, sell, or monetize" | 🅲️ Lane C |
| "I want to learn real coding skills while building" | 🅲️ Lane C |
| "I need an internal business tool quickly" | 🅱️ Lane B |
| "I want both — fast prototype AND owned code" | 🅰️ → 🅲️ Hybrid |

---

## 3. Recommended Hybrid Strategy: Lane A + C

### The Two-Phase Approach

> **Week 1–2: Validate with Lane A (No-Code/AI Builders)**
> **Week 3+: Build with Lane C (AI-Assisted Coding)**

This is the UNGASIS recommended strategy. You get the speed of no-code AND the ownership of real code.

### Week-by-Week Flow

| Week | What You Do | Lane | Tools | Output |
|------|-----------|------|-------|--------|
| 1 | Validate the problem: surveys, interviews | — | Tally, ChatGPT | Validated problem + user insights |
| 1–2 | Build a quick prototype to test the solution | 🅰️ A | Bolt.new or Lovable | Clickable prototype you can show people |
| 2 | Show prototype to 5–10 target users, get feedback | — | In person, Zoom, WhatsApp | Feedback notes, pivot decisions |
| 3 | Set up real project: Next.js + Supabase + Tailwind | 🅲️ C | VS Code, GitHub, Copilot | Professional project structure |
| 3–4 | Build the MVP with AI-assisted coding | 🅲️ C | Next.js, Copilot, Cline | Working MVP with real database |
| 4 | Deploy to Cloudflare Pages, test with beta users | 🅲️ C | Cloudflare Pages, Supabase | Live app on the internet |

### Why NOT Go Straight to Code?

| Reason | Explanation |
|--------|------------|
| You might build the wrong thing | Without validation, you waste weeks coding something nobody wants |
| A prototype takes 2 hours, not 2 weeks | Lane A lets you fail fast and cheap |
| You learn what users actually need | Showing a prototype reveals which features matter |
| You save emotional energy | It hurts less to throw away a 2-hour prototype than 2 weeks of code |

### Why NOT Stay in No-Code?

| Reason | Explanation |
|--------|------------|
| Vendor lock-in | If the platform changes pricing or shuts down, you are trapped |
| Limited customization | No-code tools cannot do everything |
| Higher costs at scale | No-code platforms charge more as your users grow |
| No code ownership | You depend on the platform for your entire business |
| Less learning | You do not build transferable skills |

---

## 4. Default Tool Stack by Stage

| Stage | Primary Purpose | Key Tools | Cost |
|-------|----------------|-----------|------|
| 💡 **Idea / Validation** | Confirm the problem is real and worth solving | Tally (survey), ChatGPT (research), Excalidraw (wireframe) | $0 |
| 🎨 **Prototype** | Build a quick visual version to show people | Bolt.new or Lovable (Lane A prompt-to-app) | $0 (credit-limited) |
| 🔧 **No-Code MVP** | Test with 5–20 users using the prototype | Bolt.new export, manual processes for backend | $0 |
| 💻 **Owned MVP** | Build the real version you own and control | Next.js, Tailwind, shadcn/ui, Supabase, VS Code, GitHub Copilot | $0 |
| 🚀 **Public Beta** | Open to 50+ users, start collecting real feedback | + Cloudflare Pages, PostHog, Sentry, UptimeRobot | $0 |
| 💰 **Monetization Test** | Test revenue with first paying customers | + Lemon Squeezy or PayMongo | $0 (transaction fees only) |

### The Cost Pattern

```
💡 Idea ────── $0
🎨 Prototype ─ $0
🔧 No-Code ── $0
💻 Owned MVP ─ $0
🚀 Beta ───── $0
💰 Revenue ── $0 base + transaction fees when money flows

Total cost until first revenue: $0
```

> **You do not pay a single peso until you are already making money.** This is the Free-First principle.

---

## 5. The Master Tool Map — Pick One Per Job

> **For each job, the "Best Default" is the recommended UNGASIS choice. Only switch if you have a specific reason.**

### 📋 Planning & Validation

| Job | Best Default | Good Alternatives | Free Tier | When to Use | Beginner Difficulty | Commercial OK? | Lock-In |
|-----|-------------|-------------------|-----------|------------|-------------------|--------------|---------| 
| **Project HQ / Notes** | Markdown files in VS Code | Notion, Obsidian, OneNote | ✅ All free | From day 1 — project planning, decisions, changelogs | ⭐ Easy | ✅ Yes | 🟢 Low |
| **Validation / Surveys / Forms** | Tally | Google Forms, Typeform | ✅ Tally: unlimited forms + responses | Problem validation, user surveys, feedback collection | ⭐ Easy | ✅ Yes | 🟢 Low |
| **Design / Wireframes** | Excalidraw | Figma (free 3 projects), Whimsical, paper sketches | ✅ Excalidraw: 100% free | User flows, wireframes, architecture diagrams | ⭐ Easy | ✅ Yes | 🟢 Low |
| **AI Research / Planning** | ChatGPT (free/Plus) | Claude, Gemini, M365 Copilot | ✅ Free tier available | Brainstorming, research, prompt drafting, planning | ⭐ Easy | ✅ Yes | 🟡 Med |

### 🎨 Prototyping & No-Code

| Job | Best Default | Good Alternatives | Free Tier | When to Use | Beginner Difficulty | Commercial OK? | Lock-In |
|-----|-------------|-------------------|-----------|------------|-------------------|--------------|---------| 
| **AI Prototype / Prompt-to-App** | Bolt.new | Lovable, v0 (Vercel) | ✅ Limited free credits | Quick validation — build a prototype in 1–2 hours | ⭐ Easy | ⚠️ Check terms | 🟢 Low (exportable) |
| **No-Code App Builder** | Bolt.new export → hand off to Lane C | Bubble, Softr, Glide | ✅ Free tiers available | Only if you are staying in no-code (not recommended long-term) | ⭐⭐ Medium | ⚠️ Platform-dependent | 🔴 High |

### 💻 Development — Frontend

| Job | Best Default | Good Alternatives | Free Tier | When to Use | Beginner Difficulty | Commercial OK? | Lock-In |
|-----|-------------|-------------------|-----------|------------|-------------------|--------------|---------| 
| **Frontend Framework** | Next.js (React) | Remix, Nuxt (Vue), Astro, SvelteKit | ✅ Open source — always free | Building the actual app interface users see and use | ⭐⭐⭐ Medium (AI helps) | ✅ Yes | 🟢 Low |
| **UI Component Library** | shadcn/ui | Radix UI, Chakra UI, MUI, DaisyUI | ✅ Open source — always free | Pre-built buttons, forms, modals — saves design time | ⭐⭐ Medium | ✅ Yes | 🟢 Low |
| **CSS / Styling** | Tailwind CSS | Plain CSS, Bootstrap, Styled Components | ✅ Open source — always free | Making things look good — colors, spacing, responsive design | ⭐⭐ Medium | ✅ Yes | 🟢 Low |

### 🗄️ Development — Backend

| Job | Best Default | Good Alternatives | Free Tier | When to Use | Beginner Difficulty | Commercial OK? | Lock-In |
|-----|-------------|-------------------|-----------|------------|-------------------|--------------|---------| 
| **Database + Auth + Storage** | Supabase | Firebase, Neon, PlanetScale, Appwrite | ✅ 2 projects, 500MB DB, 1GB storage | Storing user data, login, file uploads | ⭐⭐ Medium | ✅ Yes | 🟡 Med |
| **Backend Logic / API** | Next.js API Routes | Express.js, Fastify, Supabase Edge Functions | ✅ Built into Next.js | Server-side logic, API endpoints, data validation | ⭐⭐⭐ Medium | ✅ Yes | 🟢 Low |

### 🚀 Deployment & Hosting

| Job | Best Default | Good Alternatives | Free Tier | When to Use | Beginner Difficulty | Commercial OK? | Lock-In |
|-----|-------------|-------------------|-----------|------------|-------------------|--------------|---------| 
| **Hosting / Deployment** | Cloudflare Pages | Netlify, Vercel (⚠️ non-commercial only on Hobby) | ✅ CF: unlimited bandwidth, 500 builds/mo | Putting your app on the internet | ⭐⭐ Medium | ✅ **Yes** (CF + Netlify) | 🟢 Low |
| **Version Control** | GitHub | GitLab, Bitbucket | ✅ Unlimited public repos | Code backup, collaboration, deploy triggers | ⭐⭐ Medium | ✅ Yes | 🟢 Low |
| **Code Editor** | VS Code | Cursor, Zed, Sublime Text | ✅ VS Code: 100% free | Writing and editing code every day | ⭐⭐ Medium | ✅ Yes | 🟢 Low |
| **AI Code Assistant** | GitHub Copilot (Free), Cline | Cursor (built-in AI), Codeium, Tabnine | ✅ Copilot Free: limited; Cline: free with API keys | Autocomplete, code suggestions, multi-file edits | ⭐⭐ Medium | ✅ Yes | 🟢 Low |

### 💰 Business & Monetization

| Job | Best Default | Good Alternatives | Free Tier | When to Use | Beginner Difficulty | Commercial OK? | Lock-In |
|-----|-------------|-------------------|-----------|------------|-------------------|--------------|---------| 
| **Payments (Global)** | Lemon Squeezy | Stripe (if PH-supported — check), Paddle | ✅ $0/mo, 5%+$0.50 per sale | Accepting payments for digital products or SaaS | ⭐⭐ Medium | ✅ Yes (MoR) | 🟡 Med |
| **Payments (PH Local)** | PayMongo | Manual bank/GCash transfers | ✅ No setup/monthly fees | Accepting payments from Filipino customers | ⭐⭐ Medium | ✅ Yes | 🟡 Med |

### 📊 Monitoring & Analytics

| Job | Best Default | Good Alternatives | Free Tier | When to Use | Beginner Difficulty | Commercial OK? | Lock-In |
|-----|-------------|-------------------|-----------|------------|-------------------|--------------|---------| 
| **Analytics** | PostHog | Plausible, Umami, Google Analytics | ✅ PostHog: 1M events/mo free | Track what users do in your app | ⭐⭐ Medium | ✅ Yes | 🟢 Low |
| **Error Tracking** | Sentry | LogRocket, Bugsnag | ✅ Sentry: 5K errors/mo free | Know when your app crashes before users tell you | ⭐⭐ Medium | ✅ Yes | 🟢 Low |
| **Uptime Monitoring** | UptimeRobot | Better Stack, Pingdom | ✅ 50 monitors free | Alert when your site goes down | ⭐ Easy | ✅ Yes | 🟢 Low |

### 📝 Documentation & Support

| Job | Best Default | Good Alternatives | Free Tier | When to Use | Beginner Difficulty | Commercial OK? | Lock-In |
|-----|-------------|-------------------|-----------|------------|-------------------|--------------|---------| 
| **Documentation** | Markdown (README.md) | Docusaurus, GitBook, Notion | ✅ Always free | Project docs, user help, internal knowledge | ⭐ Easy | ✅ Yes | 🟢 Low |
| **Customer Support** | Email + Tally form | Crisp (free 2 seats), Intercom | ✅ Email: free; Tally: free | Handling user questions and bug reports | ⭐ Easy | ✅ Yes | 🟢 Low |
| **API Testing** | Thunder Client (VS Code) | Postman, Insomnia, curl | ✅ All free tiers | Testing your API endpoints during development | ⭐⭐ Medium | ✅ Yes | 🟢 Low |

---

## 6. Project Type Router

> **"What kind of thing do I want to build?"** → This table tells you the simplest safe route.

| # | Project Type | Simplest Safe Route | Coding Needed? | Hosting Needed? | Max Data Level | Recommended Lane |
|---|-------------|--------------------|--------------|-----------------|--------------|-----------------| 
| 1 | **Personal tool** (just for me) | Bolt.new → export → local or deploy | Minimal | Optional | Level 2 (private personal) | 🅰️ A or hybrid |
| 2 | **Portfolio project** | Next.js + Supabase + Cloudflare Pages | Yes (AI-assisted) | Yes (free) | Level 0 (demo data only) | 🅲️ C |
| 3 | **Prototype to show investors/clients** | Bolt.new or Lovable (fastest) | No | Built-in | Level 0–1 | 🅰️ A |
| 4 | **Simple landing page** | HTML + Tailwind or Next.js static | Minimal | Yes (GitHub Pages or CF) | Level 0 | 🅲️ C (simple) |
| 5 | **Survey / feedback tool** | Tally (no code needed) | No | Built-in | Level 1–2 | No-code |
| 6 | **SaaS app** (for paying customers) | Next.js + Supabase + Lemon Squeezy + CF Pages | Yes (AI-assisted) | Yes (free) | Level 0–3 | 🅲️ C |
| 7 | **E-commerce / digital product store** | Lemon Squeezy or Gumroad storefront | No | Built-in | Level 0–1 | No-code |
| 8 | **Blog / content site** | Next.js + Markdown (or Astro) | Minimal | Yes (CF Pages) | Level 0 | 🅲️ C |
| 9 | **Internal business dashboard** | Next.js + Supabase | Yes (AI-assisted) | Yes (private) | Level 2–3 | 🅲️ C |
| 10 | **Mobile app** | React Native or Flutter (or PWA with Next.js) | Yes | App stores or PWA | Level 0–3 | 🅲️ C |
| 11 | **API / backend service** | Next.js API routes or standalone Express | Yes | Yes (CF Workers, Railway) | Level 0–4 | 🅲️ C |
| 12 | **Automation workflow** | Manual first → then n8n or Zapier | No → Minimal | Cloud-hosted | Level 0–2 | Manual → Low-code |
| 13 | **AI-powered tool** | Next.js + OpenAI API + Supabase | Yes (AI-assisted) | Yes (free) | Level 0–2 | 🅲️ C |
| 14 | **Notion template / digital product** | Notion → sell on Gumroad or Lemon Squeezy | No | Built-in | Level 0 | No-code |

---

## 7. Recommended Stacks — Validator + Builder

### Stack 1: "The Validator" (Lane A — Validation Phase)

> **Goal:** Prove the idea has value before writing a single line of code.

| Job | Tool | Cost |
|-----|------|------|
| Research & Planning | ChatGPT / M365 Copilot | $0 |
| User Surveys | Tally | $0 |
| Wireframes | Excalidraw | $0 |
| Quick Prototype | Bolt.new or Lovable | $0 (credit-limited) |
| Notes & Docs | Markdown files | $0 |
| **Total** | | **$0** |

### Stack 2: "The Builder" (Lane C — Build Phase)

> **Goal:** Build a real, owned, scalable app.

| Job | Tool | Cost |
|-----|------|------|
| Code Editor | VS Code | $0 |
| AI Coding Assistant | GitHub Copilot Free + Cline | $0 |
| Frontend | Next.js + Tailwind + shadcn/ui | $0 |
| Backend/Database/Auth | Supabase | $0 |
| Hosting | Cloudflare Pages | $0 |
| Version Control | GitHub | $0 |
| Analytics | PostHog | $0 |
| Error Tracking | Sentry | $0 |
| Uptime | UptimeRobot | $0 |
| Payments (global) | Lemon Squeezy | $0/mo + 5%+$0.50 per sale |
| Payments (PH local) | PayMongo | $0/mo + per-transaction fees |
| **Total** | | **$0/mo until first sale** |

### Cost Comparison at Scale

| Users | Revenue (est.) | Stack 1 Cost | Stack 2 Cost | Lane B Cost (Bubble etc.) |
|-------|---------------|-------------|-------------|-------------------------|
| 0 | $0 | $0 | $0 | $0 |
| 100 | $0–$500 | $0 | $0 | $25–$100/mo |
| 1,000 | $500–$5,000 | N/A (validate only) | $0–$25/mo | $100–$500/mo |
| 10,000 | $5,000–$50,000 | N/A | $25–$100/mo | $500–$2,000/mo |
| $5K/mo revenue | — | N/A | ~$100–$200/mo + tx fees | ~$500–$1,000/mo |

> **Key insight:** The UNGASIS Lane C stack stays nearly free even at 10,000 users because it uses open-source code and free-tier hosting.

---

## 8. Cost Guardrails & Upgrade Triggers

> **Rule: Never upgrade a tool until you hit the specific trigger condition.**

| Tool | Free Tier Limit | Warning Sign | What Happens If Exceeded | Upgrade Cost | Escape Plan |
|------|----------------|-------------|-------------------------|-------------|-------------|
| **Supabase** | 2 projects, 500MB DB, 1GB storage, 50K auth users | DB approaching 400MB; project pausing after 7 days inactive | ⚠️ Project pauses (free); data still exists but app stops | Pro: $25/mo per project | pg_dump → Neon or self-hosted |
| **Cloudflare Pages** | Unlimited bandwidth, 500 builds/mo | Build count approaching 400/mo | Builds fail until next month | Pro: $20/mo | Move to Netlify (code on GitHub) |
| **Netlify** | 100GB bandwidth, 300 build min/mo | Bandwidth approaching 80GB | Site may throttle or show error | Pro: $19/mo | Move to Cloudflare Pages |
| **Vercel** | Generous hobby tier | ⚠️ **Commercial use = TOS violation** | Account suspension risk | Pro: $20/mo | Move to Cloudflare Pages |
| **PostHog** | 1M events/mo | Events approaching 800K/mo | Events stop recording | Paid: usage-based | Switch to Plausible or Umami |
| **Sentry** | 5K errors/mo | Errors approaching 4K/mo | Errors stop recording | Paid: $26/mo team | Check code quality — 5K errors/mo means bugs to fix |
| **UptimeRobot** | 50 monitors | Monitors approaching 45 | Cannot add more monitors | Pro: $7/mo | Better Stack free tier |
| **GitHub** | Unlimited public repos, 2K Actions min/mo | Actions minutes running out | CI/CD stops | Pro: $4/mo | GitLab (free CI/CD) |
| **Bolt.new** | Limited free generations | Credits running low | Cannot generate new prototypes | Subscription plans | Export code → continue in VS Code |
| **Lovable** | Limited free generations | Credits running low | Cannot generate new prototypes | Subscription plans | Export code → continue in VS Code |
| **Tally** | Unlimited forms + responses | — | — (very generous free) | Pro: $29/mo for extra features | Google Forms |
| **ChatGPT** | Free tier (limited model access) | Rate limits hit frequently | Slower responses, less capable model | Plus: $20/mo | Claude free tier, Gemini free tier |

### The Upgrade Decision Framework

```
Am I hitting the free tier limit?
├── NO → Do NOT upgrade. Keep using free.
└── YES → Is there a free alternative that works?
    ├── YES → Switch to the free alternative.
    └── NO → Is this tool critical for revenue?
        ├── YES → Upgrade. Budget it as a business expense.
        └── NO → Can I work around the limit?
            ├── YES → Work around it.
            └── NO → Upgrade to lowest paid tier only.
```

---

## 9. Critical Warnings

These are the most important "gotchas" that catch beginners. Review before choosing any tool.

| # | ⚠️ Warning | Details | Impact | Action |
|---|-----------|---------|--------|--------|
| 1 | **Vercel Hobby: NO commercial use** | Vercel's free Hobby plan prohibits commercial use. If you charge money for your app on Vercel Hobby, your account can be suspended. | 🔴 High — your live app goes down | **Use Cloudflare Pages** for any app that will make money |
| 2 | **Supabase 7-day pause** | ⚠️ Free Supabase projects may pause after 7 days of inactivity. Data is preserved but the app stops working. | 🟡 Medium — app goes offline until you unpause | Visit Supabase dashboard weekly for active projects. ⚠️ Verify current policy on supabase.com |
| 3 | **Lemon Squeezy PH payout fee** | ⚠️ A 1% international payout fee for Philippines was mentioned in the Master Prompt. **This was NOT verified from official Lemon Squeezy sources.** | 🟡 Medium — affects revenue calculations | Budget for ~6–6.5% effective fee until manually verified on lemonsqueezy.com |
| 4 | **PostHog event limits** | 1M events/mo sounds like a lot — but if you track many events per page, you can burn through it fast | 🟡 Medium — analytics stop working | Track only essential events. Do not track every mouse movement. |
| 5 | **Bolt.new / Lovable credit limits** | Free generations are limited. Once credits run out, you cannot generate new prototypes. | 🟢 Low — export code and continue in VS Code | Export code BEFORE credits run out. Do not depend on the builder long-term. |
| 6 | **Stripe PH availability** | Stripe's official page did NOT list the Philippines as a supported country (checked May 2026). | 🟡 Medium — cannot use Stripe from PH | Use Lemon Squeezy (global) or PayMongo (PH local) instead |
| 7 | **API keys in GitHub** | If you accidentally push `.env.local` to GitHub, your API keys are exposed to the entire internet. | 🔴 High — security breach | Add `.env.local` to `.gitignore` BEFORE first commit. Always check. |

---

## 10. The "Never Pay a Peso You Didn't Plan" Rule

### The Framework

> **Every tool starts at $0. It stays at $0 until a specific trigger forces an upgrade. Every upgrade is a conscious decision, not an accident.**

### The 5 Cost Protection Rules

| # | Rule | What It Means | Kitchen Analogy |
|---|------|--------------|-----------------|
| 1 | **Start with free tier ALWAYS** | Never sign up for a paid plan first | Cook at home before renting a restaurant kitchen |
| 2 | **Track your usage monthly** | Know how close you are to free tier limits | Check your pantry before buying groceries |
| 3 | **Know the escape plan before depending on a tool** | If a tool becomes expensive, know the alternative | Know another grocery store in case your usual one raises prices |
| 4 | **Budget upgrades as % of revenue** | Tools should cost < 20% of revenue | Ingredients should cost < 30% of your dish price |
| 5 | **Review tool costs quarterly** | Cancel unused subscriptions, optimize spending | Clean out your kitchen — throw away expired ingredients |

### Cost Tracking Template

Save this as `TOOL_COSTS.md` in your project:

```markdown
# 💰 Tool Cost Tracker

| Tool | Plan | Monthly Cost | Free Limit | Current Usage | Upgrade Trigger | Next Review |
|------|------|-------------|-----------|--------------|----------------|-------------|
| Supabase | Free | $0 | 500MB DB | 45MB | >400MB | 2026-07-01 |
| Cloudflare Pages | Free | $0 | 500 builds | 12 builds | >400 builds | 2026-07-01 |
| PostHog | Free | $0 | 1M events | 5K events | >800K events | 2026-07-01 |
| ... | ... | ... | ... | ... | ... | ... |
| **TOTAL** | | **$0/mo** | | | | |
```

---

## 11. Tool Decision Flowchart

Use this text-based decision tree BEFORE adding any new tool to your stack.

```
🤔 "Should I use this tool?"

Step 1: DO I NEED THIS JOB DONE?
├── NO → STOP. Do not add the tool.
└── YES ↓

Step 2: IS THERE ALREADY A TOOL IN MY STACK THAT DOES THIS JOB?
├── YES → Use the existing tool. Do not add another.
└── NO ↓

Step 3: IS THIS JOB NEEDED AT MY CURRENT STAGE?
├── NO → Add to DECISIONS.md as "future — revisit at [stage]". STOP.
└── YES ↓

Step 4: IS THERE A FREE OPTION?
├── YES → Use the free option. 
│   ├── Is the free option in the UNGASIS default stack? 
│   │   ├── YES → Use it. ✅ DONE.
│   │   └── NO → Compare with default. Use default unless the alternative 
│   │           is clearly better for your case. Document why in DECISIONS.md.
└── NO → Is this job critical enough to pay for?
    ├── NO → Find a manual workaround. Document it.
    └── YES → Find the cheapest option. Budget it. Track it in TOOL_COSTS.md.

Step 5: FINAL CHECK
├── Does this tool have an export/escape plan? 
│   ├── YES → ✅ Safe to use.
│   └── NO → ⚠️ High lock-in risk. Consider alternatives.
└── Does this tool allow commercial use on the free tier?
    ├── YES → ✅ Safe to use.
    └── NO → ⚠️ If you plan to monetize, switch to a commercial-safe alternative NOW.
```

---

> **Sources for this module:**
> - Master Workflow Prompt v4.0 — §3 (Tools & Resources), §16 (Free-First Stack Lanes), §16.5 (Project Type Router), §17 (Stack Lane Details), §18 (Recommended Ranked Stacks), §24.5C (Master Tool Map), §24.5D (Three Build Lanes), §24.5G (Recommended Stacks)
> - Unified Playbook v3 — §6–§7 (Three Build Lanes + Hybrid Strategy), §8 (Default Tool Stack by Stage), §9 (Tool Map)
> - General best practices for free-first development and solopreneur cost management
> - ⚠️ Unverified claims flagged inline with ⚠️

---

*UNGASIS Content Module: Tool Stack & Free-First Strategy*
*Version: 1.0*
*Date: 2026-05-31*
*Author: Mel John Dimat (via UNGASIS OS)*
*Status: Complete — Lossless merge*
