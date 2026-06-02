# UNGASIS Content Module: AI Hallucination Detection Protocol

> **Part of:** UNGASIS OS — Your AI-Powered Personal Operating System
> **Who this is for:** Beginners, non-tech-savvy solopreneurs, ESL speakers
> **Purpose:** Learn how to catch when AI makes things up — before it costs you time, money, or credibility

---

## 📖 Table of Contents

1. [What Is AI Hallucination?](#1-what-is-ai-hallucination)
2. [Why Should You Care?](#2-why-should-you-care)
3. [The 8 High-Risk Categories](#3-the-8-high-risk-categories)
4. [Verification Checklist — By Category](#4-verification-checklist--by-category)
5. [Red Flags — Warning Signs That AI Is Making Things Up](#5-red-flags--warning-signs-that-ai-is-making-things-up)
6. [Your Verification Toolbox](#6-your-verification-toolbox)
7. [Beginner Examples — Hallucination vs. Verified Fact](#7-beginner-examples--hallucination-vs-verified-fact)
8. [Quick Reference Card](#8-quick-reference-card)
9. [Copy-Paste Prompts for Verification](#9-copy-paste-prompts-for-verification)
10. [Source Ledger Template](#10-source-ledger-template)
11. [When In Doubt — The Golden Rule](#11-when-in-doubt--the-golden-rule)

---

## 1. What Is AI Hallucination?

### 🗺️ The Simple Analogy: Confident Wrong Directions

Imagine you are in a new city. You ask someone for directions to the museum. They smile confidently and say:

> *"Go straight two blocks, turn left at the red building, then it is the third door on the right."*

You follow every step perfectly. But there is no museum. There is no red building. **They made it all up** — but they sounded so sure you believed them.

**That is AI hallucination.**

AI hallucination is when an AI tool (like ChatGPT, Copilot, Claude, Gemini) **generates information that sounds correct, is stated confidently, but is partially or completely wrong.** The AI is not "lying" — it does not know what is true. It is predicting the next most likely word based on patterns. Sometimes those patterns produce fake facts.

### 🧠 Why Does This Happen?

| Reason | What It Means (Simple) |
|--------|----------------------|
| **Pattern matching, not knowing** | AI predicts words that "sound right" — it does not check if they ARE right |
| **Training data has gaps** | AI was not trained on everything — it fills gaps with guesses |
| **Training data has errors** | If wrong information was in the training data, AI learned it |
| **No real-time access** | Most AI does not browse the web live (unless it has search tools) |
| **Pressure to answer** | AI is designed to be helpful — so it answers even when it should say "I don't know" |
| **Context window limits** | In long conversations, AI can "forget" earlier details and start making things up |

### 🎯 Key Takeaway

> **AI does not know what it does not know. It will never say "I have no idea" unless specifically trained to. Your job is to be the fact-checker.**

---

## 2. Why Should You Care?

As a solopreneur building tools with AI, hallucinations can:

| Risk | Example |
|------|---------|
| 💸 **Cost you money** | AI says a tool is free, but it actually costs $20/month |
| ⏰ **Waste your time** | AI gives you code for a library function that does not exist |
| 😳 **Embarrass you** | Your portfolio says you used a feature that the tool never had |
| ⚖️ **Get you in legal trouble** | AI says "this license allows commercial use" but it does not |
| 🔨 **Break your app** | AI says an API endpoint exists, but the URL is fake |
| 📉 **Hurt your credibility** | You publish AI-generated statistics that are wrong |

---

## 3. The 8 High-Risk Categories

These are the areas where AI lies the most. **Always double-check these.**

| # | Category | Risk Level | Why AI Gets This Wrong | Example of a Lie |
|---|----------|-----------|----------------------|-----------------|
| 1 | **📊 Statistics & Numbers** | 🔴 Very High | AI invents convincing-sounding numbers | "73.2% of startups fail in Year 1" (real number is different) |
| 2 | **🔗 URLs & Links** | 🔴 Very High | AI generates URLs that look real but lead nowhere | "See docs at https://api.stripe.com/v4/guide" (this URL does not exist) |
| 3 | **⚖️ Legal Claims** | 🔴 Very High | AI oversimplifies or invents legal rules | "MIT license allows you to remove attribution" (it does not) |
| 4 | **💰 API Details & Pricing** | 🔴 Very High | Pricing changes constantly; AI has outdated data | "Supabase free tier gives 10GB storage" (may be outdated) |
| 5 | **📅 Dates & Timelines** | 🟠 High | AI confuses release dates, version dates | "React 19 was released in March 2024" (may be wrong date) |
| 6 | **👤 People & Attributions** | 🟠 High | AI mixes up who said/did/created what | "Linus Torvalds created Git and Linux" (Git yes, but details get muddled) |
| 7 | **💻 Code Behavior & Library Functions** | 🔴 Very High | AI invents function names, wrong parameters | "Use `fs.readFileAsync()` to read files" (this function does not exist) |
| 8 | **🛠️ Tool Features & Availability** | 🟠 High | AI says a tool can do something it cannot | "Canva free plan includes background remover" (may require Pro) |

---

## 4. Verification Checklist — By Category

Use these checklists **every time** AI gives you information in these categories.

### ✅ 4.1 Statistics & Numbers

- [ ] Does the AI say WHERE this number comes from? (study name, organization, year)
- [ ] Can I find this exact number on the original source website?
- [ ] Is the year of the data recent enough to be relevant?
- [ ] Does the number seem reasonable compared to other sources?
- [ ] If I ask the AI "where did you get this number?", does it give a real source or say "based on general knowledge"?

**🚨 If AI says "approximately" or gives a very specific decimal (like 73.2%), be extra suspicious.**

### ✅ 4.2 URLs & Links

- [ ] Did I actually click the URL and confirm it loads a real page?
- [ ] Does the domain name match the official website of the company/tool?
- [ ] Is the URL path structure realistic? (e.g., `/docs/api/v2` vs `/supercool/magic/endpoint`)
- [ ] Does the page content match what AI said it would show?

**🚨 NEVER trust a URL from AI without clicking it. AI is notorious for generating fake URLs that look perfectly real.**

### ✅ 4.3 Legal Claims

- [ ] Did I check the actual license text (not AI's summary of it)?
- [ ] Did I read the official Terms of Service of the tool/platform?
- [ ] Am I relying on AI for legal advice? (You should not — consult a professional for important decisions)
- [ ] Is the AI giving country-specific legal info? (Laws vary by country — Philippines laws differ from US laws)

**🚨 AI is NOT a lawyer. For anything involving money, contracts, or legal risk, verify with official sources or a professional.**

### ✅ 4.4 API Details & Pricing

- [ ] Did I check the official pricing page of the tool TODAY?
- [ ] Did I check the official API documentation for the exact endpoint/function AI mentioned?
- [ ] Is the free tier limit AI mentioned still current? (Free tiers change often)
- [ ] Did I check if the API version AI mentioned actually exists?
- [ ] Did I test the API call in a sandbox before using it in my app?

**🚨 Pricing and API details change frequently. AI's training data may be months or years old.**

### ✅ 4.5 Dates & Timelines

- [ ] Did I verify the date on the official website, changelog, or release notes?
- [ ] Does the date make logical sense? (e.g., a tool released in 2025 cannot have a feature from 2027)
- [ ] Is AI confusing announcement date vs. actual release date?
- [ ] Is AI mixing up dates from different versions?

### ✅ 4.6 People & Attributions

- [ ] Did I verify the person's role/title on their official profile (LinkedIn, company website)?
- [ ] Did I check if the quote AI attributed to someone was actually said by them?
- [ ] Is AI mixing up people with similar names?
- [ ] Can I find the original source of the quote or attribution?

### ✅ 4.7 Code Behavior & Library Functions

- [ ] Did I check the official documentation for the function/method AI suggested?
- [ ] Did I verify the function exists in the version of the library I am using?
- [ ] Did I test the code in a sandbox/dev environment before using it in production?
- [ ] Do the function parameters match what the official docs say?
- [ ] Does the function return what AI says it returns?

**🚨 AI frequently invents function names that sound logical but do not exist. ALWAYS check the docs.**

### ✅ 4.8 Tool Features & Availability

- [ ] Did I check the tool's official feature page for the feature AI mentioned?
- [ ] Is the feature available on the FREE plan or only on paid plans?
- [ ] Is the feature available in my country/region (Philippines)?
- [ ] Is the feature still available? (Features get removed or changed)
- [ ] Did I actually try the feature myself to confirm it works as described?

---

## 5. Red Flags — Warning Signs That AI Is Making Things Up

When you see these warning signs, **stop and verify before trusting the information.**

| # | 🚩 Red Flag | What It Looks Like | Example |
|---|------------|-------------------|---------|
| 1 | **Overly specific unsourced numbers** | AI gives a very precise number but does not say where it came from | "Exactly 67.3% of Filipino SMEs use social media for marketing" — where did 67.3% come from? |
| 2 | **Confident claims about recent events** | AI talks about something that happened recently as if it has perfect knowledge | "As of last week, Vercel announced free bandwidth is now 1TB" — AI may not have this data |
| 3 | **Fake-looking URLs** | URL looks official but has suspicious paths or made-up subdomains | `https://docs.supabase.com/guides/ai-vector-v3/setup` — looks real, but the path may not exist |
| 4 | **Too-good-to-be-true features** | AI describes a feature that sounds amazing and exactly what you need | "GitHub Copilot free plan includes unlimited completions for all languages" — verify the actual limits |
| 5 | **Contradictions within the same response** | AI says two things that cannot both be true | "The free plan includes 5 projects" then later "you can create up to 3 projects on the free plan" |
| 6 | **Vague attribution** | AI says "research shows" or "experts say" without naming anyone | "Studies have shown that AI-built apps have 40% fewer bugs" — which studies? |
| 7 | **Outdated information stated as current** | AI presents old facts as if they are still true | "Heroku offers a free tier for hobby projects" — Heroku removed free tiers in 2022 |
| 8 | **Invented technical terms** | AI uses a term that sounds official but does not exist | "Use the `quantum-parse` method for faster JSON processing" — this is not a real thing |
| 9 | **Seamless mixing of fact and fiction** | Most of the response is correct, but one detail is wrong | "React uses JSX, was created by Facebook, and version 19 introduced Server Actions in January 2024" — the date may be wrong even though the rest is true |
| 10 | **Excessive confidence with no hedging** | AI does not say "I think" or "I believe" — it states everything as absolute fact | This is normal AI behavior, but be more suspicious when combined with other red flags |

### 📊 Red Flag Severity Guide

| Severity | What to Do |
|----------|------------|
| 🟢 **Low — probably fine** | General concepts, well-known facts, basic explanations | Quick sanity check |
| 🟡 **Medium — verify before using** | Tool features, pricing, code suggestions, dates | Check one official source |
| 🔴 **High — must verify** | Statistics, URLs, legal claims, API details, code functions | Check official docs + test it yourself |
| ⚫ **Critical — get expert help** | Legal decisions, financial claims, security configurations | Consult a professional |

---

## 6. Your Verification Toolbox

These are your weapons against hallucination. All are **free**.

| # | Tool | What It Does | When to Use It | How to Use It |
|---|------|-------------|----------------|---------------|
| 1 | **📄 Official Documentation** | The #1 source of truth for any tool | ANY claim about a tool's features, pricing, API, or limits | Go to the tool's official website → search for the specific feature or claim |
| 2 | **🧪 Sandbox Testing** | Test code/API calls in a safe environment | Any code or API suggestion from AI | Use the tool's playground, a Replit project, or a local dev environment to test before using in production |
| 3 | **🔍 Deep Research / Web Search** | Find current information from multiple sources | Statistics, dates, recent changes, pricing | Use Copilot Deep Research, Perplexity, or Google to find multiple sources that confirm the claim |
| 4 | **📋 Ask for Citations** | Force AI to show its sources | Any factual claim | Ask: "Where did you get this information? Give me the exact source URL" — then CHECK the URL |
| 5 | **🤖 Compare with Another AI** | Cross-check by asking a different AI the same question | Important claims you are unsure about | Ask ChatGPT AND Copilot AND Claude the same question — if they disagree, dig deeper |
| 6 | **📒 Source Ledger** | A tracking table you maintain for all verified/unverified claims | When building your app or writing documentation | Use the Source Ledger template below to track what you've verified |

### 🔍 Source Quality Ranking

When checking sources, prefer them in this order:

| Rank | Source Type | Example | Trust Level |
|------|-----------|---------|-------------|
| 1 | **Official documentation** | stripe.com/docs, supabase.com/docs | 🟢 High |
| 2 | **Official blog/changelog** | blog.github.com, nextjs.org/blog | 🟢 High |
| 3 | **Official GitHub repo** | github.com/vercel/next.js | 🟢 High |
| 4 | **Reputable tech publication** | dev.to, smashingmagazine.com | 🟡 Medium |
| 5 | **Community forums** | Stack Overflow, Reddit, Discord | 🟡 Medium (check date of post) |
| 6 | **Personal blogs, tutorials** | Random blog posts | 🟠 Low-Medium (may be outdated) |
| 7 | **AI-generated content** | ChatGPT, Copilot, Claude responses | 🔴 Low (unverified until checked) |

---

## 7. Beginner Examples — Hallucination vs. Verified Fact

These are realistic examples of things AI might tell you. Learn to spot the difference.

### Example 1: Statistics & Numbers

| | What AI Said | What Is Actually True |
|---|---|---|
| ❌ **Hallucination** | "According to a 2024 World Bank study, 78.4% of Filipino micro-enterprises use AI tools for daily operations." | ⚠️ This study likely does not exist. The specific percentage is suspiciously precise and unsourced. Always search the World Bank website directly. |
| ✅ **Verified Approach** | Ask AI: "Link me to that World Bank study." If AI cannot provide a working link, the statistic is likely fabricated. Search worldbank.org yourself. | You become the fact-checker. |

### Example 2: URLs & Links

| | What AI Said | What Is Actually True |
|---|---|---|
| ❌ **Hallucination** | "You can find the setup guide at https://docs.supabase.com/guides/functions/edge-ai-setup" | This URL looks real but may return a 404 page. AI generates URL structures that LOOK right but point to nothing. |
| ✅ **Verified Approach** | Go to supabase.com/docs → use the search bar → find the real guide page yourself. Copy the REAL URL. | Only trust URLs you have clicked yourself. |

### Example 3: Legal Claims

| | What AI Said | What Is Actually True |
|---|---|---|
| ❌ **Hallucination** | "The MIT License allows you to use, modify, and sell the software with no restrictions whatsoever." | MIT License DOES allow commercial use, BUT it requires you to include the original copyright notice and license text. "No restrictions whatsoever" is an oversimplification that could get you in trouble. |
| ✅ **Verified Approach** | Read the actual MIT License text at opensource.org/licenses/MIT. It is short (about 170 words). Read it yourself. | Always read the actual license, not AI's summary. |

### Example 4: API Details & Pricing

| | What AI Said | What Is Actually True |
|---|---|---|
| ❌ **Hallucination** | "Supabase free tier includes 500MB database, 5GB bandwidth, 50MB file storage, and unlimited API calls." | These numbers may have been true at some point but could be outdated. Supabase changes limits periodically. | 
| ✅ **Verified Approach** | Go to supabase.com/pricing RIGHT NOW and check. Screenshot the current limits for your records. | Pricing pages are the only source of truth for current limits. |

### Example 5: Dates & Timelines

| | What AI Said | What Is Actually True |
|---|---|---|
| ❌ **Hallucination** | "Next.js 15 was released on October 15, 2024, with built-in React Server Components support." | The month might be right but the exact day could be wrong. AI often gets approximate dates right but exact dates wrong. |
| ✅ **Verified Approach** | Check the Next.js blog (nextjs.org/blog) or GitHub releases page for the exact release date. | Official changelogs are the source of truth for dates. |

### Example 6: People & Attributions

| | What AI Said | What Is Actually True |
|---|---|---|
| ❌ **Hallucination** | "As Supabase CEO Paul Copplestone said in his 2024 keynote: 'We will make PostgreSQL the database of the AI era.'" | Paul Copplestone IS the CEO of Supabase, but this exact quote may be fabricated. AI creates plausible-sounding quotes. |
| ✅ **Verified Approach** | Search for the exact quote in Google with quotation marks: "We will make PostgreSQL the database of the AI era". If no results, the quote is likely fake. | Exact quotes from AI should always be verified with a search. |

### Example 7: Code Behavior & Library Functions

| | What AI Said | What Is Actually True |
|---|---|---|
| ❌ **Hallucination** | "Use `supabase.storage.uploadFile('bucket', file, { upsert: true })` to upload files." | The method might be `supabase.storage.from('bucket').upload(path, file, { upsert: true })`. AI often gets the general idea right but the exact syntax wrong — especially method chaining and parameter order. |
| ✅ **Verified Approach** | Check Supabase Storage docs at supabase.com/docs/reference. Copy the exact code from the docs. Test in a sandbox. | Official docs + sandbox testing = safe code. |

### Example 8: Tool Features & Availability

| | What AI Said | What Is Actually True |
|---|---|---|
| ❌ **Hallucination** | "Vercel's free tier allows unlimited serverless function invocations with no cold start on the Hobby plan." | Vercel's free (Hobby) plan has limits on function execution time, invocations, and bandwidth. "Unlimited" claims about free tiers are almost always wrong. ⚠️ |
| ✅ **Verified Approach** | Go to vercel.com/pricing. Check the Hobby plan column. Look for the specific limits on serverless functions. | If AI says "unlimited" for a free tier, that is a red flag. Check the pricing page. |

---

## 8. Quick Reference Card

**Print this or keep it open while you work with AI.**

```
┌─────────────────────────────────────────────────────┐
│         🛡️ HALLUCINATION QUICK CHECK                │
│                                                     │
│  Before trusting AI output, ask yourself:           │
│                                                     │
│  1. 📊 Is this a NUMBER?     → Find the source      │
│  2. 🔗 Is this a URL?        → Click it NOW         │
│  3. ⚖️ Is this LEGAL info?   → Read the real doc     │
│  4. 💰 Is this PRICING?      → Check pricing page    │
│  5. 📅 Is this a DATE?       → Check changelog       │
│  6. 👤 Is this a QUOTE?      → Google the quote      │
│  7. 💻 Is this CODE?         → Check docs + test it  │
│  8. 🛠️ Is this a FEATURE?    → Try it yourself       │
│                                                     │
│  🚩 Red flags:                                      │
│  • Suspiciously precise numbers (67.3%)             │
│  • "Unlimited" on free tiers                        │
│  • URLs you have not clicked                        │
│  • "No restrictions" for licenses                   │
│  • Claims about "last week" or "just announced"     │
│                                                     │
│  🛠️ Verify with:                                    │
│  • Official docs (BEST)                             │
│  • Sandbox testing                                  │
│  • Web search / Deep Research                       │
│  • Ask another AI                                   │
│  • Ask for citations → then CHECK them              │
│                                                     │
│  💡 Golden Rule:                                    │
│  "If it matters, verify it. If it costs money       │
│   or affects users, DEFINITELY verify it."          │
└─────────────────────────────────────────────────────┘
```

---

## 9. Copy-Paste Prompts for Verification

Use these prompts to challenge AI when you suspect hallucination.

### 🔍 Prompt 1: Ask for Sources
```
Where did you get this information? Give me the exact source URL 
so I can verify it myself. If you are not sure, say "I am not sure 
about this — please verify."
```

### 🔍 Prompt 2: Confidence Check
```
How confident are you about this information? Rate it:
- 🟢 High — I found this in official documentation
- 🟡 Medium — I believe this is correct but cannot cite a source
- 🔴 Low — I am guessing based on patterns

Be honest. I would rather know you are unsure than get wrong information.
```

### 🔍 Prompt 3: Challenge a Specific Claim
```
You said [paste the specific claim here]. I want to verify this. 
Can you:
1. Tell me the exact official source for this claim?
2. Tell me if this might be outdated?
3. Tell me what the alternative/correct answer might be if you are wrong?
```

### 🔍 Prompt 4: Code Verification
```
Before I use this code, please confirm:
1. Does the function [function name] actually exist in [library name] version [version]?
2. Are the parameters in the correct order?
3. What is the official documentation URL for this function?
4. Is there a breaking change I should know about?
```

### 🔍 Prompt 5: Pricing/Feature Verification
```
You mentioned that [tool name] [feature/pricing claim]. 
This is important for my project budget. Please:
1. Tell me where to find this on their official website
2. Flag if this information might be outdated
3. Suggest what I should check when I visit their pricing page
```

### 🔍 Prompt 6: Cross-Verification Request
```
I want to make sure this is correct. Can you give me:
1. Your answer
2. What you think other AI tools might say differently
3. What a beginner should verify before trusting this

Mark anything you are not 100% sure about with ⚠️.
```

---

## 10. Source Ledger Template

Keep this table in your project notes. Update it every time AI gives you a claim that matters.

| # | Claim | Source Name | Source URL | Date Checked | Confidence | Notes |
|---|-------|------------|-----------|-------------|------------|-------|
| 1 | "Supabase free tier has 500MB database" | Supabase Pricing Page | supabase.com/pricing | 2026-05-31 | 🟢 High — checked official page | Confirmed current as of today |
| 2 | "MIT License requires attribution" | OSI Website | opensource.org/licenses/MIT | 2026-05-31 | 🟢 High — read actual license text | Yes, must include copyright notice |
| 3 | "73% of startups fail in Year 1" | ??? | ??? | Not checked | 🔴 Low — AI gave no source | Could not find this stat — likely hallucinated |

### Confidence Levels

| Emoji | Level | Meaning |
|-------|-------|---------|
| 🟢 | **High** | Checked on official documentation or verified source |
| 🟡 | **Medium** | Found on reputable source, likely current |
| 🟠 | **Low** | Community source, might be outdated, unverified |
| 🔴 | **Not Verified** | AI claim with no source — treat as possibly false |

---

## 11. When In Doubt — The Golden Rule

> ### 💡 "If it matters, verify it. If it costs money or affects users, DEFINITELY verify it."

### The 30-Second Habit

Every time AI gives you a claim that you plan to use in your app, your portfolio, or a decision:

1. ⏱️ **Take 30 seconds** to check one official source
2. ✅ **If confirmed** — add it to your Source Ledger with 🟢
3. ❌ **If not found** — mark it ⚠️ and do not use it until verified
4. 🤷 **If unsure** — ask another AI or use Deep Research

**This one habit will save you from 90% of hallucination problems.**

### Remember

- AI is your **assistant**, not your encyclopedia
- AI is your **first draft writer**, not your fact-checker
- AI is your **brainstorming partner**, not your legal advisor
- **YOU** are the quality gate. **YOU** decide what is true enough to use.

---

> **Sources for this module:**
> - Master Workflow Prompt v4.0 — §25 (Hallucination Detection Protocol), §6 (Research & Source Ledger), §6.5 (Source-First Research Mode), §20 (AI Quality Control)
> - Unified Playbook v3 — §31 (Source Ledger concepts), §7 (AI Quality Control)
> - General best practices for AI verification

---

*UNGASIS Content Module: AI Hallucination Detection Protocol*
*Version: 1.0*
*Date: 2026-05-31*
*Author: Mel John Dimat (via UNGASIS OS)*
*Status: Complete*
