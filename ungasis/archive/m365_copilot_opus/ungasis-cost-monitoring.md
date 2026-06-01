# UNGASIS Content Module: Cost & Usage Monitoring

> 💰 Module ID: O9  
> 📂 File: `ungasis-cost-monitoring.md`  
> 🔗 Sources: Master Prompt §32 (Cost & Usage Monitoring) + Playbook §21 (Cost and Limit Tracker)  
> 🎯 Audience: Beginner / not tech-savvy / ESL / $0 budget  

---

## 📖 Table of Contents

1. [Why Even Free Tools Have Limits](#1--why-even-free-tools-have-limits)
2. [What to Track — The Master Monitoring List](#2--what-to-track--the-master-monitoring-list)
3. [The Tracker Table](#3--the-tracker-table)
4. [How to Track — Three Methods](#4--how-to-track--three-methods)
5. [Warning Signs — When to Worry](#5--warning-signs--when-to-worry)
6. [What Happens When You Hit a Limit](#6--what-happens-when-you-hit-a-limit)
7. [How to Optimize to Stay Free Longer](#7--how-to-optimize-to-stay-free-longer)
8. [Cost Projection Ranges If Upgrade Needed](#8--cost-projection-ranges-if-upgrade-needed)
9. [Simple Weekly Tracking Template](#9--simple-weekly-tracking-template)
10. [Weekly Review Checklist](#10--weekly-review-checklist)

---

## 1. 🍽️ Why Even Free Tools Have Limits

### The Free Buffet Analogy

Free tools are like a **free buffet** at a hotel grand opening:

| Free Buffet | Free Tool Tier |
|---|---|
| You can eat for free | You can use the tool for free |
| But you only get **one plate** at a time | But you only get a **limited number of requests / storage / tokens** |
| If you pile too much on one plate, it falls | If you use too much, the tool **slows down, blocks, or pauses** |
| The restaurant hopes you will come back and pay | The tool hopes you will **upgrade to a paid plan** |
| Some dishes have a limit ("2 shrimps per person") | Some features have hard limits ("500 MB database max") |
| If you go every day, they might ask you to become a member | If you use it heavily, you will hit the free ceiling |

### Why This Matters for You

Even though your UNGASIS stack is **$0 upfront**, every single tool has limits:

- **Supabase** pauses your database after 7 days of inactivity
- **Cloudflare Pages** limits you to 500 builds per month
- **PostHog** gives you 1M analytics events per month — sounds like a lot, but a busy app can eat through it
- **Bolt.new** gives you 1M tokens/month with a 300K daily cap
- **Lovable** gives you only 5 credits per day (30 per month)
- **ChatGPT Enterprise** may have workspace-level usage policies ⚙️
- **Power Platform** has request limits depending on your license ⚙️

If you do not track these, one day your app will **just stop working** and you will not know why.

### The Bottom Line

> **Free does not mean unlimited.**  
> Track your usage weekly. Catch problems before your users do.

---

## 2. 📊 What to Track — The Master Monitoring List

This is the complete list from both sources, merged losslessly. Every item from Master Prompt §32 and Playbook §21 appears here.

### Category A: AI Builders & AI Tools

| # | What to Track | Why It Matters | Where to Check |
|---|---|---|---|
| 1 | **ChatGPT message limits** | Your workspace may have daily/monthly caps ⚙️ | ChatGPT usage dashboard (workspace admin) |
| 2 | **Bolt.new token usage** | Free: 1M tokens/month, 300K/day limit | Bolt.new account dashboard |
| 3 | **Lovable credit usage** | Free: 5 credits/day, 30 credits/month | Lovable account dashboard |
| 4 | **AI API token cost** (OpenRouter, Groq, etc.) | Each API call has a token cost; surprise bills possible | Provider billing dashboard |
| 5 | **Model token usage** (per-request) | Bigger prompts = more tokens = faster limit burn | API response headers or dashboard |
| 6 | **Ollama local resource usage** | Uses your RAM and VRAM; can slow your PC | Task Manager (Windows) or `nvidia-smi` (GPU) |

### Category B: Database & Storage

| # | What to Track | Why It Matters | Where to Check |
|---|---|---|---|
| 7 | **Supabase database size** | Free: 500 MB per project (includes data + indexes + system tables) | Supabase dashboard → Settings → Usage |
| 8 | **Supabase storage usage** | Free: 1 GB total | Supabase dashboard → Storage |
| 9 | **General storage usage** | File uploads, images, backups can fill storage fast | Each tool's storage panel |

### Category C: Authentication & Users

| # | What to Track | Why It Matters | Where to Check |
|---|---|---|---|
| 10 | **Auth active users (MAUs)** | Supabase free: 50K MAUs; Clerk free: 10K MAUs | Supabase Auth dashboard / Clerk dashboard |

### Category D: Hosting & Deployment

| # | What to Track | Why It Matters | Where to Check |
|---|---|---|---|
| 11 | **Cloudflare Pages build count** | Free: 500 builds/month | Cloudflare dashboard → Pages → project |
| 12 | **Netlify bandwidth & build minutes** | Free: 100 GB bandwidth, 300 build minutes/month | Netlify dashboard → Usage |
| 13 | **Free hosting quotas** (general) | Every host has bandwidth, build, or request limits | Each host's usage page |

### Category E: Analytics & Monitoring

| # | What to Track | Why It Matters | Where to Check |
|---|---|---|---|
| 14 | **PostHog event count** | Free: 1M events/month; pay-as-you-go after | PostHog → Billing |
| 15 | **Analytics event volume** (general) | High event volume = surprise charges or data loss | Each analytics tool's billing page |

### Category F: Automation & Workflows

| # | What to Track | Why It Matters | Where to Check |
|---|---|---|---|
| 16 | **Automation tasks/ops** | Make.com free: 1,000 ops/month; Power Automate has request limits ⚙️ | Make.com dashboard / Power Platform admin center |
| 17 | **Power Platform request limits** | Depends on license type; daily limits apply ⚙️ | Power Platform admin center |

### Category G: Payments & Revenue

| # | What to Track | Why It Matters | Where to Check |
|---|---|---|---|
| 18 | **Lemon Squeezy transaction fees** | 5% + $0.50 per sale, plus ⚠️ ~1% international payout fee (Philippines) | Lemon Squeezy dashboard → Payouts |
| 19 | **Payment fees & refunds** | Fees eat into revenue; refunds can cost double | Payment provider dashboard |

### Category H: Support

| # | What to Track | Why It Matters | Where to Check |
|---|---|---|---|
| 20 | **Support messages / time** | Too many support requests = unsustainable workload | Crisp dashboard / email inbox / support tracker |

### 📊 Quick Count

- **Total items to monitor: 20**
- You do NOT need to track all 20 from day one
- Start tracking when you have real users or use a tool heavily

### When to Start Tracking Each

| Stage | What to Track |
|---|---|
| **Learner / Prototype** | Only: Bolt.new tokens, Lovable credits, Ollama resources |
| **Private Beta (5-20 users)** | Add: Supabase DB size, Supabase MAUs, hosting builds |
| **Public MVP** | Add: PostHog events, hosting bandwidth, support volume |
| **Monetized MVP** | Add: Payment fees, refunds, all API costs, automation ops |
| **Commercial SaaS** | Track everything weekly |

---

## 3. 📋 The Tracker Table

This is the complete tracker table from **Playbook §21**, preserved exactly.

| Tool Area | Track | Warning Sign | Action |
|---|---|---|---|
| **AI builders** | tokens / credits | Running out daily | Move serious work to GitHub / VS Code |
| **Hosting** | builds, bandwidth / credits | Site pauses or build fails | Optimize / build less / upgrade if justified |
| **Database** | DB size, storage, MAUs | Near quota | Clean data / export / upgrade |
| **Auth** | active users | Approaching free cap | Review pricing / security |
| **Analytics** | events / session replays | High event volume | Reduce events / set billing limit |
| **Automation** | tasks / ops | Workflows fail | Simplify or upgrade |
| **Payments** | fees, refunds, disputes | High fee percent | Compare processors |
| **Support** | messages / time | Too many support requests | Improve onboarding / docs |
| **AI APIs** | token / call cost | Surprise usage | Add caching, batching, limits |

### How to Read This Table

- **Track** = what number or metric to watch
- **Warning Sign** = the red flag that says "you are running out"
- **Action** = what to do before it becomes a crisis

---

## 4. 🔍 How to Track — Three Methods

### Method 1: Built-In Dashboards (Free, Easiest)

Every tool has its own usage dashboard. Check these weekly.

| Tool | Where to Find Usage | What to Look For |
|---|---|---|
| **Supabase** | Dashboard → Settings → Usage (or Billing) | Database size (MB), storage (GB), MAUs, API requests |
| **Cloudflare Pages** | Dashboard → Pages → your project → Builds | Build count vs. 500/month limit |
| **Netlify** | Dashboard → Team → Usage | Bandwidth (GB) vs. 100 GB limit, build minutes vs. 300 min |
| **PostHog** | PostHog → Settings → Billing | Events used vs. 1M/month limit |
| **Bolt.new** | Account → Usage or Billing | Tokens used vs. 1M/month and 300K/day limits |
| **Lovable** | Account → Credits | Credits used vs. 5/day and 30/month limits |
| **Lemon Squeezy** | Dashboard → Payouts | Transaction fees, payout status, fee totals |
| **Make.com** | Dashboard → Organization → Operations | Operations used vs. 1,000/month limit |
| **ChatGPT Enterprise** | Usage dashboard (if available) ⚙️ | Messages sent, workspace usage |
| **Ollama (local)** | Task Manager (Ctrl+Shift+Esc) or `nvidia-smi` in terminal | RAM usage, GPU VRAM usage, CPU load |
| **Clerk** | Dashboard → Settings → Usage | MAUs vs. 10,000 free limit |
| **Crisp** | Dashboard → Analytics | Support messages, response time |

### Method 2: Simple Spreadsheet Tracker (Free, Recommended)

Create a simple spreadsheet to record your numbers each week. Use Google Sheets, Excel, or even a Markdown table.

**Template: UNGASIS Cost Tracker Spreadsheet**

| Week | Supabase DB (MB) | Supabase MAUs | CF Builds | PostHog Events | Bolt Tokens | Lovable Credits | LS Fees ($) | API Cost ($) | Support Msgs | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| 2026-W22 | 12 | 0 | 8 | 0 | 45K | 6 | $0 | $0 | 0 | Prototype only |
| 2026-W23 | 18 | 5 | 14 | 120 | 80K | 12 | $0 | $0 | 2 | Private beta started |
| 2026-W24 | 25 | 12 | 22 | 450 | 110K | 15 | $0 | $0.30 | 5 | — |
| 2026-W25 | — | — | — | — | — | — | — | — | — | — |

**How to use this:**
1. Copy this table into Google Sheets, Excel, or a `.md` file in your project
2. Fill it in every Sunday evening (takes 10 minutes)
3. Highlight any cell that is above 70% of the limit in **yellow**
4. Highlight any cell that is above 90% of the limit in **red**

### Method 3: Automated Alerts (If Safe and Allowed)

Some tools let you set up alerts that email you when you approach a limit.

| Tool | Alert Feature | How to Set Up |
|---|---|---|
| **PostHog** | Billing alerts | PostHog → Settings → Billing → set a spending limit |
| **Supabase** | Email notifications | Supabase → Settings → check notification preferences |
| **Netlify** | Usage notifications | Netlify → Team → Billing → notification settings |
| **Cloudflare** | Build failure alerts | Cloudflare → Notifications → add notification |
| **Lemon Squeezy** | Payout notifications | Enabled by default |
| **Make.com** | Operation limit warnings | Make → Organization → enabled by default |
| **GitHub Actions** | Workflow failure emails | Enabled by default for failed CI/CD runs |

> 💡 **Tip:** Even if you set up automated alerts, still do a manual weekly check. Alerts can miss things or be delayed.

---

## 5. ⚠️ Warning Signs — When to Worry

### Per-Tool Warning Indicators

| Tool | 🟢 Healthy | 🟡 Watch Closely | 🔴 Act Now |
|---|---|---|---|
| **Supabase DB** | < 300 MB | 300–450 MB | > 450 MB (limit: 500 MB) |
| **Supabase MAUs** | < 30K | 30K–45K | > 45K (limit: 50K) |
| **Supabase Storage** | < 600 MB | 600–900 MB | > 900 MB (limit: 1 GB) |
| **Cloudflare Builds** | < 300/month | 300–450/month | > 450/month (limit: 500) |
| **Netlify Bandwidth** | < 60 GB | 60–90 GB | > 90 GB (limit: 100 GB) |
| **Netlify Build Min** | < 200 min | 200–270 min | > 270 min (limit: 300) |
| **PostHog Events** | < 600K/month | 600K–900K | > 900K (limit: 1M) |
| **Bolt.new Tokens** | < 200K/day | 200K–270K/day | > 270K/day (limit: 300K) |
| **Bolt.new Monthly** | < 600K/month | 600K–900K | > 900K (limit: 1M) |
| **Lovable Credits** | < 3/day avg | 3–4/day avg | 5/day consistently (limit: 5/day) |
| **Make.com Ops** | < 600/month | 600–900 | > 900 (limit: 1,000) |
| **Clerk MAUs** | < 6K | 6K–9K | > 9K (limit: 10K) |
| **Ollama RAM** | < 60% used | 60–80% used | > 80% — PC will slow down |
| **Ollama VRAM** | < 12 GB used | 12–14 GB used | > 14 GB — model may crash (16 GB card) |
| **LS Fee %** | < 3% of revenue | 3–5% | > 6% — consider Stripe |

### General Warning Signs (From Playbook §21)

| Warning Category | Specific Sign | Immediate Action |
|---|---|---|
| **AI builders — running out daily** | You hit the daily cap before finishing work | Switch to VS Code + Cline for serious building; reserve AI builder tokens for prototyping |
| **Hosting — site pauses or build fails** | Build fails with "limit exceeded" or site goes offline | Reduce build frequency; only push when tested locally; upgrade if justified |
| **Database — near quota** | Dashboard shows > 80% of storage used | Clean unused data; export old records to CSV; consider upgrade |
| **Auth — approaching free cap** | MAU count climbing toward limit | Review if all users are real (bots?); plan for paid tier |
| **Analytics — high event volume** | Event count spiking faster than expected | Reduce tracked events; remove noisy events; set billing limit |
| **Automation — workflows fail** | Make/Power Automate shows "operation limit reached" | Simplify workflows; combine steps; upgrade if critical |
| **Payments — high fee percent** | Transaction fees > 6% of revenue | Compare Lemon Squeezy vs. Stripe vs. PayMongo; batch payouts |
| **Support — too many requests** | You spend > 2 hours/day on support | Improve onboarding; add FAQ; improve error messages; add docs |
| **AI APIs — surprise usage** | Bill or usage spikes unexpectedly | Add caching; batch requests; review what is triggering calls |

---

## 6. 💥 What Happens When You Hit a Limit

This is what actually happens when each free tier limit is reached. No sugarcoating.

| Tool | What Happens at the Limit | User Impact | Recovery |
|---|---|---|---|
| **Supabase (500 MB DB)** | Cannot insert new data; queries may fail | App breaks for users trying to save/edit data | Clean data or upgrade to Pro ($25/mo) |
| **Supabase (7-day pause)** | Database pauses completely; API returns errors | App is completely broken — all data operations fail | Manually unpause in dashboard; set up keep-alive GitHub Action |
| **Supabase (50K MAUs)** | New user signups may be blocked | New users cannot create accounts | Upgrade to Pro ($25/mo) |
| **Cloudflare (500 builds)** | New deploys are rejected | You cannot push updates until next month | Deploy less often; test locally first; upgrade to Workers Paid ($5/mo) |
| **Netlify (100 GB bandwidth)** | Site pauses until next billing cycle or you pay overage | Users see an error page instead of your app | Optimize images/assets; upgrade to Pro ($19/mo) |
| **PostHog (1M events)** | Pay-as-you-go billing kicks in | No app impact, but surprise charges on your card | Set billing limit in PostHog settings to cap spending |
| **Bolt.new (300K/day)** | Cannot generate or edit code until next day | You cannot continue building until tomorrow | Switch to VS Code + Cline for the rest of the day |
| **Bolt.new (1M/month)** | Cannot generate or edit code until next month | Building completely stops for the rest of the month | Switch to VS Code permanently; only return to Bolt for quick prototypes |
| **Lovable (5/day)** | Cannot make more edits until tomorrow | Limited to 5 iterations per day | Plan each credit carefully; bulk your changes |
| **Make.com (1,000 ops)** | Workflows stop running | Automations stop — emails not sent, data not synced, etc. | Simplify workflows; upgrade ($10.59/mo) |
| **Clerk (10K MAUs)** | Login may stop working for new users | New users cannot access your app | Upgrade ($25/mo) or switch to Supabase Auth |
| **Ollama (RAM/VRAM full)** | Model crashes or responses are extremely slow | AI features stop working; PC becomes sluggish | Use smaller model; close other apps; restart Ollama |
| **ChatGPT Enterprise** | Depends on workspace policy ⚙️ | May hit rate limits or daily caps | Wait for reset or use alternative AI tools |
| **Power Platform** | Request throttling or failure | Flows stop running; apps become slow | Reduce unnecessary triggers; check license limits ⚙️ |

### 🍳 Analogy

Hitting a free limit is like **running out of gas on the highway**. You do not get a warning light if you do not check the gauge. That is why you track weekly.

---

## 7. ⚡ How to Optimize to Stay Free Longer

These are **legitimate** strategies to reduce usage and stay within free tiers. All sourced from Master Prompt §23 and §32.

> ⚠️ **Ethics rule:** These are legal usage-reduction techniques. Do NOT use API key rotation to bypass limits, free-trial abuse, account duplication, or any Terms of Service violation.

### Strategy 1: 💾 Caching

| What It Means | Example |
|---|---|
| Save results so you do not ask the same question twice | If your app shows the same weather for a city, save it for 1 hour instead of calling the API every time |

**Simple implementation:**
```text
Before calling an API:
1. Check: "Do I already have this data saved recently?"
2. If YES → use the saved version (no API call needed)
3. If NO → call the API, then save the result for later
```

### Strategy 2: 📦 Batching

| What It Means | Example |
|---|---|
| Combine multiple small requests into one big request | Instead of sending 10 database queries one by one, send 1 query that gets all 10 results |

**Impact:** Can reduce API calls by 50–90%.

### Strategy 3: 🤏 Smaller Models

| What It Means | Example |
|---|---|
| Use a lighter, cheaper AI model for simple tasks | Use `qwen2.5-coder:14b` (local, free) instead of GPT-4 (cloud, paid) for basic code edits |

**Your local models (via Ollama):**
- `devstral` — general coding
- `qwen2.5-coder:14b` — code generation
- `qwen3:14b` — general AI tasks

**Rule of thumb:** Use local models for autocomplete and simple tasks. Use cloud models only for complex, multi-file work.

### Strategy 4: 🏠 Local Models via Ollama

| What It Means | Example |
|---|---|
| Run AI on your own computer — zero API cost | Use Ollama + devstral for code suggestions instead of paying for cloud API calls |

**Benefit:** Unlimited usage. Zero cost. No rate limits. Private.

**Trade-off:** Slower than cloud; limited by your GPU VRAM (16 GB RTX 5060 Ti).

**Monitor:** Check VRAM usage with `nvidia-smi` in terminal. If > 14 GB used, switch to a smaller model.

### Strategy 5: ✍️ Better Prompts (Fewer Tokens)

| What It Means | Example |
|---|---|
| Write shorter, clearer prompts so AI uses fewer tokens per request | Instead of pasting your entire codebase, paste only the relevant file/function |

**Token-saving tips:**
- Be specific: "Fix the login button in `Header.tsx` line 42" beats "My app has a bug somewhere"
- Remove unnecessary context from prompts
- Use system instructions instead of repeating rules in every message
- Ask for concise output: "Reply in under 200 words"

### Strategy 6: 🔄 Response Caching

| What It Means | Example |
|---|---|
| Save AI responses so identical questions do not cost tokens again | If 100 users ask "What does this app do?", cache the answer after the first call |

**Where this helps most:** AI chatbots, FAQ features, repetitive queries.

### Strategy 7: 📚 Retrieval Before Generation

| What It Means | Example |
|---|---|
| Look up existing data before asking AI to generate new data | Check your FAQ database first; only call AI if the question is not already answered |

**Simple pattern:**
```text
User asks a question
→ Search your docs/FAQ/knowledge base
→ If found → return existing answer (free!)
→ If not found → call AI API (costs tokens)
```

### Strategy 8: 📴 Offline Demo Mode

| What It Means | Example |
|---|---|
| Use fake/demo data when showing or testing your app | During demos, use sample data instead of live API calls |

**How:** Create a `/demo-data/` folder with sample JSON/CSV files. Load those instead of hitting APIs during demos and testing.

### Strategy 9: 🎛️ User-Controlled API Calls

| What It Means | Example |
|---|---|
| Let the user decide when to trigger expensive actions | Instead of auto-generating with AI on every keystroke, add a "Generate" button the user clicks |

**Impact:** Dramatically reduces unnecessary API calls from accidental triggers, page reloads, or bots.

### Optimization Summary Table

| Strategy | Effort | Token/Cost Savings | Best For |
|---|---|---|---|
| Caching | Medium | 50–90% | API-heavy apps |
| Batching | Low | 30–70% | Database queries |
| Smaller models | Low | 60–80% | AI features |
| Local models (Ollama) | Low (already set up) | 100% | Dev/autocomplete |
| Better prompts | Low | 20–50% | All AI usage |
| Response caching | Medium | 50–90% | Chatbots, FAQ |
| Retrieval before generation | Medium | 40–80% | Knowledge bases |
| Offline demo mode | Low | 100% during demos | Testing, demos |
| User-controlled API calls | Low | 30–60% | Any AI feature |

---

## 8. 💸 Cost Projection Ranges If Upgrade Needed

If you outgrow a free tier, here is what upgrading costs. These are general ranges — always check the official pricing page before committing.

| Tool | Free Limit | Paid Tier | Monthly Cost | When to Upgrade |
|---|---|---|---|---|
| **Supabase** | 500 MB DB, 2 projects, 50K MAUs | Pro | $25/mo per project | DB approaching 400 MB or need no-pause |
| **Cloudflare Pages** | 500 builds/mo, unlimited bandwidth | Workers Paid | $5/mo | Consistently hitting 500 builds |
| **Netlify** | 100 GB bandwidth, 300 build min | Pro | $19/mo per member | Bandwidth consistently > 80 GB |
| **PostHog** | 1M events/mo | Pay-as-you-go | ~$0.00031/event after 1M | Set billing limit; only upgrade if analytics critical |
| **Bolt.new** | 1M tokens/mo, 300K/day | Pro | $25/mo (10M tokens) | Need more than prototype work |
| **Lovable** | 5 credits/day (30/mo) | Starter | $25/mo (100 credits) | Need private repos or more daily iterations |
| **Make.com** | 1,000 ops/mo | Core | ~$10.59/mo | Automations are business-critical |
| **Clerk** | 10K MAUs | Pro | $25/mo | Approaching 10K users |
| **Vercel** | Free Hobby (non-commercial) | Pro | $20/user/mo | ⚠️ ANY commercial use requires Pro |
| **Crisp** | 2 agents | Pro | $25/mo | Need more than 2 support agents |
| **Umami Cloud** | 100K events, 3 websites | Pro | $20/mo | Need more sites or events |
| **Domain name** | N/A (no free .com) | Cloudflare Registrar | ~$10/year | When ready for public launch |

### 🍳 Analogy

This is like knowing the price of upgrading from the **free buffet to the premium buffet**. You do not pay until you are ready — but know the price so you are not surprised.

### Total Monthly Cost at Different Stages

| Stage | Likely Monthly Cost | What You Pay For |
|---|---|---|
| **Prototype (0 users)** | **$0** | Everything is free |
| **Private Beta (5–20 users)** | **$0** | Still within free limits |
| **Public MVP (100 users)** | **$0** | Likely still free |
| **Growing (1,000 users)** | **$0–$25/mo** | Supabase Pro if DB is big |
| **Scaling (10,000 users)** | **$25–$50/mo** | Supabase Pro + maybe Cloudflare Workers |
| **Revenue ($5K/mo)** | **$25/mo** + ~5.5% per sale | Supabase Pro + Lemon Squeezy fees |

---

## 9. 📝 Simple Weekly Tracking Template

Copy-paste this into your project's `docs/` folder or a Google Sheet. Fill it in every Sunday.

### Template: `docs/COST_TRACKER.md`

```markdown
# UNGASIS Weekly Cost & Usage Tracker

## Current Limits Quick Reference

| Tool | Free Limit | My Current Usage | % Used | Status |
|---|---|---|---|---|
| Supabase DB | 500 MB | ___ MB | ___% | 🟢🟡🔴 |
| Supabase Storage | 1 GB | ___ MB | ___% | 🟢🟡🔴 |
| Supabase MAUs | 50,000 | ___ | ___% | 🟢🟡🔴 |
| Cloudflare Builds | 500/mo | ___ | ___% | 🟢🟡🔴 |
| Netlify Bandwidth | 100 GB | ___ GB | ___% | 🟢🟡🔴 |
| PostHog Events | 1M/mo | ___ | ___% | 🟢🟡🔴 |
| Bolt.new Tokens | 1M/mo | ___ | ___% | 🟢🟡🔴 |
| Lovable Credits | 30/mo | ___ | ___% | 🟢🟡🔴 |
| Make.com Ops | 1,000/mo | ___ | ___% | 🟢🟡🔴 |
| API Costs | $0 target | $___ | — | 🟢🟡🔴 |
| Support Messages | — | ___ | — | 🟢🟡🔴 |

## Weekly Log

### Week of: [YYYY-MM-DD]

**Supabase DB size:** ___ MB
**Supabase MAUs:** ___
**Cloudflare builds used:** ___
**PostHog events used:** ___
**Bolt.new tokens used:** ___
**Lovable credits used:** ___
**API costs this week:** $___
**Lemon Squeezy fees this week:** $___
**Support messages:** ___
**Biggest concern:** ___
**Action taken:** ___

---

### Week of: [YYYY-MM-DD]

(copy the block above for each new week)
```

### How to Use This Template

1. Create the file `docs/COST_TRACKER.md` in your project
2. Every Sunday, open each tool's dashboard and record the numbers
3. Color the status:
   - 🟢 = under 60% of limit
   - 🟡 = 60–85% of limit
   - 🔴 = over 85% of limit
4. If anything is 🔴, take action THIS week — do not wait
5. Takes about **10 minutes** per week

---

## 10. ✅ Weekly Review Checklist

Do this every Sunday evening. It takes 10–15 minutes and prevents surprise outages.

### The Checklist

- [ ] **Supabase:** Check DB size — is it under 400 MB? Is the project still active (not paused)?
- [ ] **Cloudflare / Netlify:** Check build count and bandwidth — any close to limits?
- [ ] **PostHog:** Check event count — set billing limit if not already set
- [ ] **Bolt.new / Lovable:** Check remaining tokens/credits — enough for the week?
- [ ] **API costs:** Check OpenRouter / Groq / any AI API dashboards — any surprise charges?
- [ ] **Lemon Squeezy:** Check payout history — fees in line with expectations?
- [ ] **Make.com / Power Automate:** Check operation count — any workflows failing?
- [ ] **Ollama:** Is your PC running smoothly? Check RAM / VRAM if using local models
- [ ] **Support:** How many support messages this week? More than last week? Why?
- [ ] **Update tracker:** Record this week's numbers in `docs/COST_TRACKER.md`
- [ ] **Flag risks:** If anything is at 🟡 or 🔴, write an action plan

### Decision Framework: When to Upgrade

```text
Ask yourself these questions:

1. Is the free limit actually blocking my users?
   → If NO: do not upgrade yet. Optimize first.
   → If YES: continue to question 2.

2. Can I reduce usage with optimization (Section 7)?
   → If YES: try optimization first. Give it 1 week.
   → If NO: continue to question 3.

3. Is the upgrade cost justified by revenue or user growth?
   → If YES: upgrade. Document in DECISIONS.md.
   → If NO: consider pivoting, simplifying, or pausing the feature.

4. Can I switch to a cheaper alternative?
   → Example: Supabase Auth → Clerk (or vice versa)
   → Example: PostHog → Umami (simpler, self-hosted = free)
   → Example: Netlify → Cloudflare Pages (unlimited bandwidth)
```

### After Your Review

```text
Every week, write one sentence:

"This week, my biggest cost/limit concern is: ___________
My action is: ___________"

Put this in your COST_TRACKER.md or DECISIONS.md.
```

---

## 🏁 Summary: Your Cost Monitoring Survival Kit

```text
WEEKLY ROUTINE (Every Sunday, 10 min):
  1. Check each tool's dashboard
  2. Record numbers in COST_TRACKER.md
  3. Flag anything at 🟡 or 🔴
  4. Take action on 🔴 items immediately

OPTIMIZATION ORDER (try these first before paying):
  1. Better prompts (fewer tokens)
  2. Use local Ollama models when possible
  3. Cache responses and data
  4. Batch requests
  5. Use smaller models
  6. Add "Generate" buttons instead of auto-triggers
  7. Use demo/offline mode for testing
  8. Only upgrade when the limit truly blocks users

GOLDEN RULES:
  ✅ Free does not mean unlimited
  ✅ Track before you need to — not after you crash
  ✅ Optimize before you pay
  ✅ Set billing limits on pay-as-you-go tools (PostHog!)
  ✅ Never abuse free tiers — it violates ToS and is unethical
```

---

> **UNGASIS Content Module: Cost & Usage Monitoring**  
> Module ID: O9  
> Version: 1.0  
> Date: 2026-05-31  
> Sources: AI Builder's Master Workflow Prompt v4.0 §32 + Unified Beginner Solopreneur App Building Workflow Playbook v3.0 §21  
> Author: UNGASIS Content Absorption Pipeline  
> Status: ✅ Complete  
