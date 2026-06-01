# UNGASIS Content Module: Verified Source Ledger

**File:** `ungasis-source-ledger.md`  
**Purpose:** A source-first research methodology and verified source ledger for UNGASIS OS tool claims, pricing claims, limits, feature availability, and commercial-use cautions.  
**Audience:** Mel John Dimat — beginner, ESL, visual learner, $0 budget, AI-assisted solopreneur builder.  
**Mode:** Deep / Source-First Research Module.  

> 🔎 **Simple analogy:** This source ledger is your “receipt folder.”  
> If AI says a tool is free, commercial-safe, or has a limit, the ledger should show the receipt.  
> No receipt = mark it as ⚠️ unverified.

---

## 1. Why This Source Ledger Exists

AI can be useful, but it can also sound confident while being wrong.

This file prevents:
- fake citations
- outdated pricing claims
- wrong free-tier limits
- risky commercial-use assumptions
- unsupported payment/tax claims
- tool feature hallucinations

### Beginner rule

```text
If a claim affects money, launch, privacy, security, or tool choice, verify it from an official source first.
```

---

## 2. Source-First Research Mode

Use this mode when checking:
- pricing
- free limits
- commercial-use rules
- feature availability
- deployment behavior
- API/model behavior
- privacy/security/data handling
- payment fees
- supported countries/regions
- Microsoft tenant/admin dependencies
- licensing requirements

---

## 3. Source Priority Order

| Priority | Source type | Trust level | Example |
|---:|---|---|---|
| 1 | Official documentation | Highest | Microsoft Learn, GitHub Docs, Firebase Docs |
| 2 | Official pricing / limits page | High | Vercel pricing, Netlify pricing |
| 3 | Official terms / privacy / security page | High | Stripe availability, Microsoft privacy |
| 4 | Official product blog / release notes | Medium-high | Microsoft 365 blog |
| 5 | Reputable technical publication | Medium | Established tech publication |
| 6 | Community source | Low-medium | Forums, Reddit, independent blogs |
| 7 | AI memory only | Lowest | Use only as draft hypothesis |

---

## 4. Citation Rules

### Required rule

Do not invent citations.

### For every important claim, record:

| Field | Meaning |
|---|---|
| Claim | What is being claimed |
| Official source | Name of official source |
| Link | Direct source link |
| Date accessed | Date you checked it |
| Confidence | 🟢🟡🟠🔴 |
| Notes | Limits, caveats, region/license/admin issues |

---

## 5. Confidence Levels

| Confidence | Meaning | Use when |
|---|---|---|
| 🟢 High | Official source verified | Official docs/pricing clearly support the claim |
| 🟡 Medium | Likely correct but needs re-check | Official source supports part of it, or details can change quickly |
| 🟠 Low | Weak support | Community/source parsing unclear |
| 🔴 Unverified | No official confirmation found | Keep as caution, do not rely on it |

---

## 6. Claim Labeling Rules

Use these labels in UNGASIS files:

```text
✅ Verified — official source checked.
⚠️ Unverified — needs manual confirmation.
🔶 Assumption — reasonable but not proven.
💭 Hypothesis — idea to test, not fact.
🗣️ Opinion — recommendation, not a factual claim.
```

---

## 7. Verification Workflow

```text
1. Write the claim.
2. Search official source first.
3. Open the official source.
4. Check whether the source directly supports the claim.
5. Add the link and date accessed.
6. Assign confidence level.
7. If not verified, mark ⚠️ Unverified.
8. Re-check before paid/public launch.
```

---

## 8. Verified Source Ledger Table

> **Date accessed default:** 2026-05-31.  
> **Important:** Pricing, limits, and terms change. Re-check before public launch, paid launch, or business planning.

| Claim | Official source | Link | Date accessed | Confidence | Notes |
|---|---|---|---|---|---|
| Google AI Studio Build mode supports app-building workflows and related build/deploy documentation | Google AI for Developers | [Google AI Studio Build mode docs](https://ai.google.dev/gemini-api/docs/aistudio-build-mode) | 2026-05-31 | 🟢 High | Use as prototype/build acceleration. Re-check feature scope before production use. |
| Gemini API / AI Studio billing has free and paid tiers; billing behavior depends on API/project setup | Google AI for Developers | [Gemini API billing docs](https://ai.google.dev/gemini-api/docs/billing) | 2026-05-31 | 🟢 High | Official billing source. Do not assume production API use is free. |
| Firebase Studio has official pricing, quotas, and limits documentation | Firebase Docs | [Firebase Studio pricing, quotas, and limits](https://firebase.google.com/docs/studio/pricing) | 2026-05-31 | 🟢 High | Official source states no-cost access and notes paid-service/billing situations. |
| Firebase Studio documentation is the official source for Firebase Studio status and usage | Firebase Docs | [Firebase Studio docs](https://firebase.google.com/docs/studio) | 2026-05-31 | 🟢 High | Use this for current Firebase Studio status. Re-check before new project decisions. |
| Vercel has Hobby, Pro, and Enterprise pricing plans | Vercel Pricing | [Vercel pricing](https://vercel.com/pricing) | 2026-05-31 | 🟢 High | Official pricing page. Commercial-use constraints should be verified from Vercel terms/pricing before monetized use. |
| Cloudflare Pages has official platform limits documentation | Cloudflare Docs | [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/) | 2026-05-31 | 🟢 High | Use for build/file/project/custom-domain limits. Re-check commercial and bandwidth terms separately if needed. |
| Netlify has official pricing and plan information | Netlify Pricing | [Netlify pricing](https://www.netlify.com/pricing/) | 2026-05-31 | 🟢 High | Official pricing source. Watch usage/credit limits. |
| Supabase has official organization-based billing documentation | Supabase Docs | [Supabase org-based billing](https://supabase.com/docs/guides/platform/org-based-billing) | 2026-05-31 | 🟢 High | Use for free plan quotas and billing behavior. Re-check before relying on limits. |
| Supabase free inactivity pause claim needs manual confirmation from official source | Not verified | N/A | 2026-05-31 | 🔴 Unverified | Do not build decisions around a “7-day pause” claim until verified from official Supabase docs. |
| Bolt has an official pricing page | Bolt Pricing | [Bolt pricing](https://bolt.new/pricing) | 2026-05-31 | 🟢 High | Use for current token/plan limits. Re-check before heavy usage. |
| Lovable has an official pricing page | Lovable Pricing | [Lovable pricing](https://lovable.dev/pricing) | 2026-05-31 | 🟠 Low | Exact free-credit details were not fully verified from parsed official text in the source playbook. Manual check needed. |
| v0 has an official pricing page | v0 Pricing | [v0 pricing](https://v0.dev/pricing) | 2026-05-31 | 🟢 High | Use for current credits/limits. Re-check before relying on volume. |
| Lemon Squeezy has official pricing and Merchant of Record positioning | Lemon Squeezy Pricing | [Lemon Squeezy pricing](https://www.lemonsqueezy.com/pricing) | 2026-05-31 | 🟢 High | Official pricing source. Re-check payout/country details before business planning. |
| Lemon Squeezy international payout fee for Philippines needs manual confirmation | Not verified | N/A | 2026-05-31 | 🔴 Unverified | Do not rely on a specific extra payout fee unless official source confirms it. |
| Stripe supported countries/regions are listed by Stripe | Stripe Global | [Stripe global availability](https://stripe.com/global) | 2026-05-31 | 🟢 High | Use to verify whether Philippines or any country/entity is supported at the time of setup. |
| PayMongo has official pricing for Philippines payment options | PayMongo Pricing | [PayMongo pricing](https://www.paymongo.com/pricing) | 2026-05-31 | 🟢 High | Official PH payment pricing source. Check business requirements before launch. |
| PostHog has official pricing information | PostHog Pricing | [PostHog pricing](https://posthog.com/pricing) | 2026-05-31 | 🟢 High | Use for product analytics pricing and free-tier details. Set billing limits where available. |
| Tally has official pricing information | Tally Pricing | [Tally pricing](https://tally.so/pricing) | 2026-05-31 | 🟢 High | Official form tool pricing source. Good for validation forms, but re-check fair-use terms. |
| Figma has official pricing information | Figma Pricing | [Figma pricing](https://www.figma.com/pricing/) | 2026-05-31 | 🟢 High | Official design tool pricing source. Re-check free plan limits before team use. |
| Notion has official pricing information | Notion Pricing | [Notion pricing](https://www.notion.com/pricing) | 2026-05-31 | 🟢 High | Official planning/docs tool pricing source. Re-check free/team limits. |
| GitHub Codespaces has official billing documentation | GitHub Docs | [GitHub Codespaces billing](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces) | 2026-05-31 | 🟢 High | Use to monitor free quota and avoid accidental usage issues. |
| GitHub Actions has official billing documentation | GitHub Docs | [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions) | 2026-05-31 | 🟢 High | Use for CI/CD minutes/storage billing and free allowances. |
| UptimeRobot has official pricing information | UptimeRobot Pricing | [UptimeRobot pricing](https://uptimerobot.com/pricing/) | 2026-05-31 | 🟢 High | Use when public link exists. Re-check monitor limits. |

---

## 9. Microsoft / M365 Source Ledger Starters

| Claim | Official source | Link | Date accessed | Confidence | Notes |
|---|---|---|---|---|---|
| Microsoft 365 Copilot Chat can add work content, uploaded files/images, and OneDrive cloud files in prompts, depending on license and context | Microsoft Support | [Add content to Copilot Chat prompts](https://support.microsoft.com/en-us/topic/add-content-to-copilot-chat-prompts) | 2026-05-31 | 🟢 High | Exact UI and capability may vary by license and rollout. |
| Microsoft 365 Copilot Chat can create content such as documents, presentations, spreadsheets, email drafts, images, charts, and lightweight app-like Pages examples | Microsoft Support | [Create content using Microsoft 365 Copilot Chat](https://support.microsoft.com/en-us/topic/create-content-using-microsoft-365-copilot-chat) | 2026-05-31 | 🟢 High | Always review output before sharing or publishing. |
| Copilot features differ by free, individual, business, and Microsoft 365 Copilot license configurations | Microsoft Support | [Understand Microsoft Copilot in Microsoft 365](https://support.microsoft.com/en-us/topic/understand-microsoft-copilot-in-microsoft-365) | 2026-05-31 | 🟢 High | Tenant/admin/license settings can change available features. |
| Word, Excel, and PowerPoint Agents can create files from prompts in Microsoft 365 Copilot | Microsoft Support / Learn | [Word, Excel, and PowerPoint Agents](https://learn.microsoft.com/en-us/microsoft-365/copilot/wordexcelppt-agents) | 2026-05-31 | 🟢 High | Admin enablement and model/provider settings can affect availability. |
| Copilot Chat can work in Microsoft 365 apps like Outlook, Word, PowerPoint, Excel, and OneNote with capabilities depending on license | Microsoft Support | [Copilot Chat in Microsoft 365 apps](https://support.microsoft.com/en-us/topic/copilot-chat-in-microsoft-365-apps) | 2026-05-31 | 🟢 High | Use M365 Copilot work environment for work data. |
| Copilot Notebooks are official Microsoft 365 Copilot workspaces for references and project content | Microsoft Support | [Get started with Microsoft 365 Copilot Notebooks](https://support.microsoft.com/en-us/Microsoft-365-Copilot/get-started-with-microsoft-365-copilot-notebooks) | 2026-05-31 | 🟢 High | Requires applicable license/service availability. |
| Power Platform official documentation covers Copilot Studio, Power Apps, Power Automate, Power BI, and Power Pages | Microsoft Learn | [Power Platform documentation](https://learn.microsoft.com/en-us/power-platform/) | 2026-05-31 | 🟢 High | Use for official Power Platform capability and training references. |
| Copilot in Power Automate supports natural-language assistance for automation scenarios | Microsoft Learn | [Copilot in Power Automate](https://learn.microsoft.com/en-us/power-automate/copilot-overview) | 2026-05-31 | 🟢 High | Region/admin settings and preview limitations may apply. |
| Copilot in Power Apps lets makers build apps using natural language and has prerequisites/availability considerations | Microsoft Learn | [Copilot in Power Apps overview](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/ai-overview) | 2026-05-31 | 🟢 High | Feature availability, preview status, and geography can vary. |
| Microsoft Learn has an official Copilot for Power Platform learning path | Microsoft Learn | [Get started with Copilot for Microsoft Power Platform](https://learn.microsoft.com/en-us/training/paths/copilot-power-platform/) | 2026-05-31 | 🟢 High | Useful for beginner learning route. |

---

## 10. Unverified / Needs Manual Confirmation List

These claims appeared in source material or prior notes but should not be treated as verified until checked again.

| Claim | Status | Action |
|---|---|---|
| Supabase free projects pause after 7 days inactive | 🔴 Unverified | Check current official Supabase docs before adding keep-alive workflow. |
| Lemon Squeezy extra international payout fee for Philippines | 🔴 Unverified | Confirm from official Lemon Squeezy payout/country documentation. |
| Exact Lovable free credit count | 🟠 Low confidence | Manually inspect current Lovable pricing page before planning usage. |
| Cloudflare Pages “commercial OK” wording | 🟡 Needs terms check | Verify from Cloudflare official terms/pricing if monetizing. |
| Netlify commercial-use conditions | 🟡 Needs terms check | Verify current Netlify terms before paid/commercial launch. |
| Vercel Hobby commercial-use restriction | 🟡 Needs direct terms check | Check Vercel official terms/pricing before monetized use. |

---

## 11. Source Verification Prompt Template

Use this whenever you add a new claim.

```text
Act as a source-first research checker.

Claims to verify:
[PASTE CLAIMS]

Rules:
- Use official sources first.
- Do not invent citations.
- If not verified, mark ⚠️ Unverified.
- Separate facts from assumptions.
- Include date accessed.

Output table:
| Claim | Official source | Link | Date accessed | Confidence | Notes |
```

---

## 12. Tool Claim Safety Checklist

Before adding a tool claim to UNGASIS, check:

| Question | Yes/No |
|---|---|
| Is the source official? | ☐ |
| Does the source directly support the claim? | ☐ |
| Did I capture the exact link? | ☐ |
| Did I add date accessed? | ☐ |
| Did I mark confidence? | ☐ |
| Did I mark caveats like region/license/admin? | ☐ |
| Did I avoid adding unsupported extra details? | ☐ |
| If unverified, did I mark ⚠️? | ☐ |

---

## 13. When to Re-Check Sources

Re-check before:
- public launch
- paid launch
- adding payments
- choosing hosting
- relying on free-tier limits
- uploading user data
- using company/internal data
- adding automation actions
- publishing a portfolio claim
- making legal/tax/security/privacy claims

---

## 14. Final Rule

> **A source ledger is not decoration. It is your trust system.**

```text
If the claim can affect cost, privacy, security, launch, or revenue, it needs a source.
If there is no source, mark it unverified.
If it is unverified, do not build decisions around it.
```

---

## Source Notes

This module merges the Playbook’s verified source ledger and the Master Prompt’s Source-First Research Mode, source priority order, citation rules, confidence levels, and no-fake-citation requirements. It keeps unverified items clearly labeled instead of pretending they are confirmed.

---

**Version:** v1.0  
**Date:** 2026-05-31  
**Module:** `ungasis-source-ledger.md`  
**Status:** Generated standalone UNGASIS content module.
