# UNGASIS Content Module: Decision Matrix

**File:** `ungasis-decision-matrix.md`  
**Purpose:** A beginner-friendly decision matrix for choosing the right stack, AI feature, Microsoft 365 feature, and free/no-code tool by project type.  
**Audience:** Mel John Dimat — beginner, ESL, visual learner, $0 budget, AI-assisted solopreneur builder.  
**Mode:** Deep / Reference Module.  

> 🍳 **Simple analogy:** This matrix is your “menu board.”  
> If you want soup, do not order a whole buffet.  
> If you need a simple SOP, do not build a full SaaS app.  
> Pick the smallest safe tool that gets the job done.

---

## 1. How to Read This Matrix

| Column | Simple meaning |
|---|---|
| Use case | What you are trying to build |
| Lifecycle stage | Where this fits: idea, prototype, dashboard, MVP, etc. |
| Recommended stack | Best practical tool combination |
| ChatGPT feature | Best ChatGPT-style capability to use |
| M365 feature | Best Microsoft 365 feature to use |
| No-code/free tool | Free-first tool option |
| Why | Why this mix is recommended |
| Free/paid risk 🟢🟡🔴 | 🟢 low risk, 🟡 watch limits, 🔴 likely paid or risky later |
| Difficulty 1-5 | 1 = easiest, 5 = hardest |
| AI automation % | Approximate help AI can provide, but you still review |
| Lock-in risk | How hard it may be to move later |
| Data/privacy risk | Risk of exposing private/company/sensitive data |
| Data level | Max recommended data level at beginner stage |
| Portfolio value | How useful this is to show publicly |
| Revenue potential | Whether it can become paid later |
| Upgrade path | What to use when it grows |
| When to avoid | When this route is the wrong choice |

---

## 2. Scoring Legend

### Free/Paid Risk

| Score | Meaning |
|---|---|
| 🟢 Low | Can usually start with tools you already have or free tiers |
| 🟡 Medium | Free now, but limits/licensing may matter later |
| 🔴 High | Likely paid, limited, or needs careful commercial review |

### Difficulty

| Score | Beginner meaning |
|---|---|
| 1 | Easy: mostly writing, forms, or simple templates |
| 2 | Beginner-friendly with some structure |
| 3 | Medium: needs careful setup or tool learning |
| 4 | Hard: needs data/app/security thinking |
| 5 | Advanced: production, SaaS, payments, scaling, compliance |

### Data Level

| Level | Name | Beginner rule |
|---|---|---|
| 0 | Public demo data | Safe for public examples |
| 1 | Personal non-sensitive | OK for personal notes and learning |
| 2 | Private personal | Use carefully; do not publish |
| 3 | Company/internal | Use only approved company/M365 environment |
| 4 | Secrets/regulated | Never paste into AI chats or public repos |

---

## 3. UNGASIS Decision Matrix

| Use case | Lifecycle stage | Recommended stack | ChatGPT feature | M365 feature | No-code/free tool | Why | Free/paid risk 🟢🟡🔴 | Difficulty 1-5 | AI automation % | Lock-in risk | Data/privacy risk | Data level | Portfolio value | Revenue potential | Upgrade path | When to avoid |
|---|---|---|---|---|---|---|---|---:|---:|---|---|---:|---|---|---|---|
| Document / SOP | Idea → Personal use → Team reference | ChatGPT/Copilot + Markdown/Word + OneDrive/SharePoint | Canvas / document drafting / project instructions | Word + Copilot, Pages, SharePoint | Markdown, Word web, Google Docs | Fastest way to turn messy notes into repeatable instructions | 🟢 | 1 | 80% | Low | Low-medium if private info is included | 1-3 | Medium | Low direct revenue; high support value | Publish to SharePoint knowledge base or HTML manual | Avoid if you need live app logic or database workflows |
| Dashboard / Report | Analysis → Portfolio → Business reporting | Excel + Power BI + SharePoint/OneDrive | Data analysis / chart explanation | Excel + Copilot, Power BI, SharePoint Lists | Excel, Power BI Desktop/free where available | Best for insights, KPIs, reporting, and visual decision-making | 🟡 | 3 | 60% | Medium | Medium-high if using company/client data | 1-3 | High | Medium for portfolio/consulting | Move to governed Power BI semantic model | Avoid if data is tiny and a simple table is enough |
| Personal OS | Personal prototype → Daily system | Markdown/OneNote/Notion + Copilot Chat + OneDrive | Projects / memory / custom instructions | Notebooks, OneNote, OneDrive, Loop | Notion free, Markdown, Obsidian local | Best for organizing thinking, prompts, SOPs, projects, and learning | 🟢 | 2 | 70% | Medium | Medium if you store private life data | 1-2 | Medium | Indirect: can become portfolio/manual/template | Upgrade to local-first HTML manual or SharePoint site | Avoid if you keep adding features instead of using it |
| Automation | Personal workflow → Operations | Power Automate + Forms/Lists/Outlook/Teams | Workflow design prompt / QA prompt | Power Automate, Forms, Lists, Outlook | Make free tier, n8n self-hosted, Power Automate if licensed | Saves repeated copy-paste work after process is clear | 🟡 | 3 | 65% | Medium | Medium-high if actions affect real users/data | 1-3 | Medium | Medium if packaged as business process demo | Add approvals, monitoring, managed solution | Avoid before the manual process is stable |
| Internal tool | Prototype → Internal operations | SharePoint Lists + Power Apps + Power Automate | Product spec / screen planning / test plan | Power Apps, Lists, Power Automate, Teams | AppSheet/Glide/Softr free tiers where suitable | Fast way to create form-based internal tools without full code | 🟡 | 4 | 55% | Medium-high | High if company data is used | 1-3 | High if demo data used | Medium as consulting/internal ops asset | Dataverse, role-based apps, Power BI | Avoid for public SaaS or highly custom consumer UX |
| Static site | Portfolio → Public demo | Markdown/HTML + GitHub + Cloudflare Pages/Netlify | Copywriting / page structure / HTML drafting | Word/Pages for draft content, OneDrive for assets | GitHub Pages, Cloudflare Pages, Netlify | Great for portfolio, landing pages, manuals, public documentation | 🟢 | 2 | 75% | Low | Low if using demo data | 0-1 | High | Medium: lead magnet, template, waitlist | Add analytics, forms, CMS, custom domain | Avoid if users need accounts, saved data, or complex app logic |
| Interactive app | Prototype → MVP | AI builder prototype → GitHub + Next.js/React + Supabase | Build prompt / debugging / code review | Copilot Chat for planning, Excel for data prep | Bolt, Lovable, v0, GitHub, Supabase free | Good path when users need to click, save, and interact | 🟡 | 4 | 65% | Low-medium if code owned | Medium if user data exists | 0-2 | High | High if problem is validated | Cloudflare/Netlify deploy, auth, RLS, monitoring | Avoid before validating pain with real users |
| AI chatbot | Prototype → Assistant / internal helper | Copilot agent or custom GPT + approved knowledge sources | Custom GPT / agent instructions / knowledge files | Copilot Agents, Copilot Studio, SharePoint | ChatGPT custom GPT if available, Copilot Studio if licensed | Useful when users repeatedly ask similar questions | 🟡 | 4 | 70% | Medium-high | Medium-high depending knowledge source | 0-3 | High if source-safe | Medium-high if niche and validated | Add actions, analytics, human approval, Power Automate | Avoid if source content is weak, outdated, or sensitive |
| Data analysis | Research → Decision support | CSV/Excel + ChatGPT analysis + Excel/Power BI | Data analysis / Advanced Data Analysis | Excel + Copilot, Analyst Agent, Power BI | Excel, Google Sheets, Python locally if needed | Best for finding patterns before building anything | 🟢 | 3 | 70% | Low | Medium if raw data includes personal/company info | 0-3 | High | Medium for reporting/data services | Power BI dashboard or automated refresh | Avoid if data is not cleaned or source is unknown |
| Power Platform app | Internal app → Business process | Power Apps + Dataverse/Lists + Power Automate + Power BI | App spec / formula helper / QA checklist | Power Apps, Power Automate, Power BI, Lists | Power Platform developer environment if available | Best Microsoft-first path for internal business systems | 🟡🔴 | 4 | 55% | High | High if production company data | 1-3 | High with demo data | Medium as enterprise portfolio | Dataverse, ALM, environments, DLP, managed solutions | Avoid if tenant/license/admin support is unclear |
| Public SaaS MVP | Validated idea → Public MVP | GitHub + Next.js/React + Supabase + Cloudflare/Netlify + analytics | Architecture / build / debug / launch checklist | M365 for docs, planning, support, reporting | Supabase, Cloudflare Pages, Netlify, GitHub | Best for owned code and lower lock-in after validation | 🟡🔴 | 5 | 55% | Low-medium | High if users/payments are involved | 0-2 initially | Very high | High but not guaranteed | Add auth, RLS, monitoring, support, payment, legal review | Avoid if no validated pain or no support plan |
| Monetization experiment | Revenue test → Paid pilot | Waitlist + landing page + payment link/manual invoice + feedback | Offer design / landing copy / pricing research | Forms, Outlook, Excel tracker, PowerPoint pitch | Tally, Forms, Lemon Squeezy/PayMongo links ⚠️ transaction fees | Tests willingness to pay before building too much | 🟡🔴 | 3 | 60% | Low-medium | Medium-high due to payment/customer data | 0-2 | High | High if validated | Add proper checkout, support, refund/privacy pages | Avoid if users have not shown serious interest |
| Research guide | Idea → Research → Learning asset | Researcher-style workflow + Markdown + Source Ledger | Deep research / web search / source checker | Researcher Agent, Notebooks, Word | Markdown, Notion, Word | Best for source-first learning and avoiding fake claims | 🟢🟡 | 2 | 75% | Low | Low-medium depending sources | 0-1 | High | Medium as template/guide product | Convert to HTML manual or course-style guide | Avoid if you cannot verify sources |
| Portfolio case study | Portfolio → Career asset | Markdown/Word + screenshots + static site | Case study writer / before-after story | PowerPoint, Word, Designer/Create, SharePoint/OneDrive | GitHub Pages, Cloudflare Pages, Netlify | Converts work into visible proof of skill and decision-making | 🟢 | 2 | 70% | Low | Medium if project used real data | 0 only for public | Very high | Medium: consulting or job opportunities | Add demo video, public site, LinkedIn post | Avoid using real company/client data without approval |
| Learning dashboard | Learning → Skill growth | Excel/Lists + Power BI/Markdown + Planner | Study plan / skill tracker / reflection prompts | Planner/To Do, Excel, Power BI, Viva Learning | Excel, Notion, Markdown | Helps you learn slowly and track progress visually | 🟢🟡 | 2 | 65% | Low-medium | Low if personal learning only | 1-2 | Medium | Low direct, high long-term | Add Power BI dashboard or SharePoint tracker | Avoid if tracking becomes more work than learning |
| Knowledge base / Prompt library | Personal OS → Reusable system | Markdown docs + OneDrive/SharePoint + Notebook | Prompt library generation / SOP generator | Notebooks, SharePoint, Pages, Word | Markdown, Notion, OneNote | Stores reusable prompts, SOPs, and decision rules | 🟢 | 2 | 80% | Low-medium | Medium if prompts contain private info | 1-3 | High if sanitized | Medium as digital product/template | Publish as HTML manual or SharePoint site | Avoid if content is not curated and becomes a dump |

---

## 4. Best Default Choice by Situation

| Situation | Best default | Why |
|---|---|---|
| “I only need instructions or a guide.” | Markdown / Word / Pages | Fast, simple, portable |
| “I need to organize source files.” | Copilot Notebook / OneDrive / SharePoint | Keeps context grounded |
| “I need a tracker.” | SharePoint Lists or Excel | Easy data table first |
| “I need a simple internal app.” | Power Apps + Lists | Microsoft-first and low-code |
| “I need a public landing page.” | Static site + Cloudflare/Netlify | Low cost and portfolio-friendly |
| “I need a real app users can log into.” | GitHub + React/Next.js + Supabase | More ownership and flexibility |
| “I need to test if people will pay.” | Landing page + waitlist + manual paid pilot | Validates demand before overbuilding |

---

## 5. Recommended Beginner Routing Flow

```text
START
  ↓
Is this mostly words/docs?
  → Yes: Word / Markdown / Pages / SharePoint
  → No:
      ↓
Is this mostly tracking rows of data?
  → Yes: Excel / SharePoint Lists
  → No:
      ↓
Is this an internal workflow?
  → Yes: Power Apps + Power Automate
  → No:
      ↓
Is this public portfolio or landing page?
  → Yes: Static site
  → No:
      ↓
Is this a real interactive product?
  → Yes: Validate first → prototype → GitHub-owned MVP
```

---

## 6. Anti-Bloat Decision Test

Before choosing a bigger stack, ask:

| Question | If answer is “No” |
|---|---|
| Does this help me build faster? | Defer it |
| Does this reduce risk? | Defer it |
| Does this improve quality? | Defer it |
| Does this help portfolio or monetization later? | Defer it |
| Is this needed at my current stage? | Mark as Blueprint / Not needed now |

### Beginner Rule

> If a document solves the problem, do not build an app.  
> If a form solves the problem, do not build a SaaS.  
> If a manual process proves demand, automate later.

---

## 7. Human Approval Gates

Require human review before any workflow:

- Sends messages or emails
- Deletes records
- Updates production data
- Changes permissions
- Publishes public content
- Contacts customers/users
- Charges, refunds, or moves money
- Handles legal, tax, health, financial, regulated, or sensitive data

Use this mini-template:

```text
Action:
Who/what is affected:
Data involved:
Risk level:
Can it be undone?
Rollback plan:
Human approval: Yes / No
```

---

## 8. UNGASIS Recommendation

For your current UNGASIS stage, the best default order is:

```text
1. Markdown modules
2. Source ledger
3. Decision matrix
4. HTML manual specification
5. Local-first HTML manual
6. Optional SharePoint/Power Platform version later
7. Optional SaaS/app version only after clear user demand
```

Why:

| Reason | Meaning |
|---|---|
| Fastest | Markdown modules are quick to create and easy to version |
| Cheapest | No paid tools required |
| Safest | No production user data needed |
| Portable | Works in GitHub, OneDrive, SharePoint, local folders |
| Reusable | Can feed future HTML manual, agents, notebooks, and apps |

---

## 9. Source Notes

This module was generated from the uploaded UNGASIS methodology files, especially the Master Prompt sections on Project Type Router, Decision Matrix, Free-First Stack Lanes, Output Depth Control, Source-First Research, Anti-Bloat Rule, Data Classification, and Human Approval Gates. It also uses the Playbook’s practical stack routing, tool map, stage-based workflow, 30-day roadmap logic, and free-first app-building recommendations.

⚠️ Pricing, feature limits, licensing, and commercial-use rules can change. Before public launch, paid launch, or production use, verify current official sources and update `ungasis-source-ledger.md`.

---

**Version:** v1.0  
**Date:** 2026-05-31  
**Module:** `ungasis-decision-matrix.md`  
**Status:** Generated standalone UNGASIS content module.
