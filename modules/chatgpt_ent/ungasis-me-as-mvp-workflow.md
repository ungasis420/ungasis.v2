# UNGASIS Content Module: Me as MVP Workflow
**Module ID:** E4  
**Audience:** Mel John Dimat — beginner, ESL, Filipino solopreneur, visual/doer learner  
**Default stage:** Learner → personal/prototype unless you explicitly choose public/commercial launch  
**Budget posture:** $0 additional upfront spend  
**Core idea:** You are the product owner. AI drafts, builds, reviews, and organizes. You decide, approve, test, and publish.
---
## How to use this module

Use this as a repeatable workflow for any app, dashboard, AI tool, document system, automation, portfolio project, or solopreneur MVP. Work one step at a time. Do not skip validation and safety checks just because AI can build fast.

**Simple analogy:** You are the restaurant owner. AI is the kitchen team. AI can prep, cook, plate, and clean fast — but you choose the menu, taste the food, approve what goes to customers, and handle business risk. 🍳
## Hard rules

- **Use dummy data first.** Real user data comes later and only with consent.
- **Never paste secrets** such as API keys, passwords, tokens, service-role keys, connection strings, or private certificates into AI chats, screenshots, public docs, or frontend code.
- **Human approval is required** before sending messages, publishing, changing permissions, deleting/updating records, taking payments, issuing refunds, deploying publicly, or affecting real users.
- **Payments and monetization are not proof of safety.** Before real commercial launch, get qualified legal/tax/privacy/security review where needed.
- **Do not overbuild.** For the first version: one target user, one workflow, one useful result, three must-have features max.
## Data level key

| Level | Name | Use in this workflow |
|---|---|---|
| Level 0 🟢 | Public demo data | Fake names, sample tasks, dummy dashboards, public screenshots. |
| Level 1 🟡 | Personal non-sensitive | Learning notes, simple project notes, non-sensitive personal planning. |
| Level 2 🟠 | Private personal | Private notes, beta feedback, private project files. Use trusted tools only. |
| Level 3 🔴 | Company/internal | Client/company data. Use only approved company/M365 environment. |
| Level 4 ⛔ | Secrets/regulated | API keys, passwords, PII, health/legal/financial data. Never paste into AI chats or public repos. |
## Workflow map

```text
Idea -> Select Problem -> Validate -> Research -> Specify -> Design -> Prototype -> Test -> Improve -> Package -> Demo/Beta -> Monetize Carefully -> Maintain -> Decide
```
## Step index

| # | Step | Stage | Expected output | Max data level | Time |
|---:|---|---|---|---|---|
| 1 | Idea capture | Idea | Idea inventory with 3 strongest candidates, each with user, pain, desired outcome, and first assumption. | Level 0-1. Use public or personal non-sensitive notes only. | 30-60 minutes. |
| 2 | Problem selection | Idea -> Validation | Ranked opportunity table and one selected problem statement. | Level 0-1. Do not use confidential company/client data. | 45-90 minutes. |
| 3 | Validation | Validation | Validation plan, survey form draft, outreach message, and pass/fail criteria. | Level 0-1. Level 2 only with consent and only in trusted tools. | 1-3 hours setup plus 1-7 days waiting for responses. |
| 4 | Competitive analysis | Validation -> Planning | Alternative/competitor matrix and opportunity gap. | Level 0-1. Use public/permissioned information only. | 1-3 hours. |
| 5 | Requirements | Planning | MVP requirements summary with must-have features, non-goals, and acceptance criteria. | Level 0-2. Keep sensitive data out of random tools. | 1-2 hours. |
| 6 | Research | Planning | Research memo with facts, assumptions, source ledger, contradictions, and next checks. | Level 0-1 by default. Level 3 only inside approved company/M365 environment. Never Level 4 in AI chat. | 1-4 hours depending on risk. |
| 7 | Persona | Planning | Persona card and anti-persona card. | Level 0-1. Anonymize real feedback. | 45-90 minutes. |
| 8 | Spec/PRD | Planning | PRD-lite Markdown file. | Level 0-2. Do not include secrets or sensitive production data. | 1-2 hours. |
| 9 | User stories | Planning | Prioritized user story backlog. | Level 0-1. | 45-90 minutes. |
| 10 | UX flow | Design | UX flow, screen list, and state checklist. | Level 0-1. Use fake examples in screens. | 1-3 hours. |
| 11 | Data model | Design -> Build | Data model table, dummy data plan, and permission notes. | Level 0-2. Never paste Level 4 secrets/regulated data. | 1-2 hours. |
| 12 | No-code prototype | Prototype | Clickable prototype with fake data and test checklist. | Level 0 only. Public demo/fake data. | 2-6 hours. |
| 13 | Coded prototype | Prototype -> MVP | Working local coded prototype with README, .env.example, and test steps. | Level 0-1. Use dummy/test data. No secrets in prompts or frontend code. | 1-5 days depending on app size. |
| 14 | Testing | MVP | TEST_PLAN.md and test results log. | Level 0-1. | 1-3 hours per test round. |
| 15 | QA | MVP | QA report with prioritized fix list. | Level 0-1. | 1-3 hours. |
| 16 | Accessibility | MVP -> Public demo | Accessibility checklist and fix list. | Level 0-1. | 1-2 hours. |
| 17 | Security | MVP -> Public demo | SECURITY_CHECKLIST.md and blocker list. | Level 0-2. Never paste Level 4 secrets/regulated data into AI chat or public code. | 1-3 hours; longer if auth/database exists. |
| 18 | Feedback | Prototype -> Beta | Feedback form, interview script, and feedback log. | Level 0-2 with consent. Anonymize before sharing. | 1 hour setup plus interviews/testing time. |
| 19 | Iteration | Prototype -> MVP | Iteration backlog and next sprint plan. | Level 0-2. Remove names/emails when summarizing feedback. | 1-3 hours per iteration planning round. |
| 20 | Portfolio packaging | Portfolio | Portfolio pack: README, case study, demo screenshots list, and public-safe story. | Level 0 only for public portfolio. | 2-5 hours. |
| 21 | Public demo prep | Public demo | Public demo checklist and go/no-go decision. | Level 0 only. | 2-4 hours. |
| 22 | Beta testing | Private beta | Beta plan, onboarding message, feedback form, support plan. | Level 0-2 with consent. Avoid company/internal and regulated data. | 2-4 hours setup plus beta period. |
| 23 | Beta feedback analysis | Private beta -> Decision | Beta report and decision recommendation. | Level 0-2. Anonymize beta feedback. | 2-4 hours. |
| 24 | Monetization experiment | Revenue test | Monetization experiment plan and go/no-go gate. | Level 0-1. Payment data should stay inside payment provider tools. Do not paste financial or customer PII into AI. | 2-6 hours setup plus 1-2 weeks test. |
| 25 | AI optimization | Improve workflow | AI workflow improvement plan and updated prompt snippets. | Level 0-1. Do not include secrets or confidential context in reusable prompts. | 1-3 hours. |
| 26 | Deployment | Local use -> Public demo/Beta | Deployment plan, live/private link or local run guide, smoke test, rollback plan. | Level 0-2. No Level 4. Use environment variables for secrets; never frontend code. | 1-4 hours for simple static/demo app; longer for full-stack. |
| 27 | Feedback loop | After release | Weekly feedback loop template and project dashboard fields. | Level 0-2. Anonymize user feedback. | 30-90 minutes weekly. |
| 28 | Maintenance | Operate | Maintenance checklist and update schedule. | Level 0-2. | 30-120 minutes weekly or monthly. |
| 29 | Documentation | All stages | Documentation pack: README.md, PROJECT_STATE.md, TEST_PLAN.md, SECURITY_CHECKLIST.md, and user guide if needed. | Level 0 for public docs; Level 1-2 for private docs. Never include real secrets. | 1-4 hours. |
| 30 | Evolution log | All stages | CHANGELOG.md and DECISIONS.md entries. | Level 0-2. Do not include private user details in public changelog. | 15-45 minutes per change batch. |
| 31 | Scale/pivot/archive decision | Decision gate | Decision memo and next 7 actions. | Level 0-2. If Level 3-4 data or regulated/commercial risk appears, use approved systems and professional review. | 1-2 hours. |

---

# Detailed workflow

## Step 01 — Idea capture

| Field | Details |
|---|---|
| **What to do** | Brain dump every app, dashboard, automation, document, or personal OS idea. Do not judge yet. Capture pain, user, outcome, and why it matters. |
| **What AI does 🤖** | Organizes messy notes into idea cards. Extracts target user, problem, outcome, assumptions, and possible risks. |
| **What I review 👀** | Check if the idea is specific or still too broad. Look for repeated pains and ideas that can be tested with fake/demo data. |
| **What I decide 🧠** | Choose the top 3 ideas worth scoring. Park the rest in a later list. |
| **What needs human approval ✋** | You approve which ideas enter the workflow. AI should not choose your life direction alone. |
| **Expected output** | Idea inventory with 3 strongest candidates, each with user, pain, desired outcome, and first assumption. |
| **Tools** | ChatGPT Enterprise Project, M365 Copilot Chat, OneNote/Notion/Markdown, Excel idea tracker. |
| **Data level** | Level 0-1. Use public or personal non-sensitive notes only. |
| **Estimated time** | 30-60 minutes. |

### Copy-paste prompt

```text
Act as a beginner-friendly product discovery coach.

My raw ideas are:
[PASTE IDEA BRAIN DUMP]

My constraints:
- I am a beginner / not a professional developer.
- I have $0 additional upfront budget.
- I want simple, useful, safe projects first.
- I prefer AI to do heavy lifting while I decide.

Please convert this into an idea inventory table:
| Idea | Target user | Pain | Desired outcome | Why it matters | First assumption | Risk | Simple first test |

Then pick the top 3 ideas to score next. Use simple English.
```

<!-- ADDED: mattpocock/skills absorption — Grilling Before Building -->

#### Step 01-B — Grilling Phase (Mandatory Before Step 02)

| Field | Details |
|---|---|
| **What it is** | Before you move to Step 02 (Problem Selection), AI must interrogate your idea with hard questions. AI is NOT allowed to be agreeable — it must challenge your assumptions, poke holes in your plan, and find what you missed. Think of it like a building inspector checking the foundation before you start building walls. 🏗️ |
| **Why this matters** | Most failed projects fail because the builder skipped hard questions. AI can build fast, but building the WRONG thing fast is worse than building nothing. Grilling catches bad assumptions early — when fixing is free. |
| **What AI does 🤖** | Asks minimum 10 tough questions about your idea. Challenges your assumptions (not just agrees). Identifies the riskiest assumption. Forces you to think about edge cases, users, scope, and constraints you forgot. |
| **What I do 👀** | Answer honestly. Do not get defensive. If you cannot answer a question, that is a signal — not a failure. Write down what you learned. |
| **What I decide 🧠** | After grilling: proceed to Step 02, revise the idea, or kill it. |
| **What needs human approval ✋** | You decide when the grilling is done. AI cannot skip the grilling or declare it complete — only you can. |
| **Expected output** | A structured Grilling Brief with: answers to all questions, identified risks, the single riskiest assumption, and a confirmed shared understanding. |
| **Rules** | AI must ask at least 10 questions. AI must NOT be agreeable — it must challenge. AI must identify the riskiest assumption. AI must confirm shared understanding before you proceed. The output is a brief, NOT code or designs. |
| **Time estimate** | 15–45 minutes. |
| **Data level** | Level 0–1. Do not share company/client data during grilling. |

##### When to Grill vs When to Skip

| Situation | Grill? | Why |
|---|---|---|
| Brand new idea, never tested | ✅ Yes, full grill | You have the most assumptions and the least evidence |
| Returning to a paused project | ✅ Yes, quick grill (5–10 questions) | Your assumptions may have changed since you paused |
| Adding a feature to an existing app | 🟡 Mini-grill (3–5 questions) | Scope creep is the #1 feature killer |
| Following an existing SOP step-by-step | ❌ No | The SOP already has built-in checks |
| Emergency bug fix | ❌ No | Fix first, then grill if the bug reveals a deeper problem |

##### Before/After Comparison

| Without Grilling | With Grilling |
|---|---|
| "I have an idea! Let’s build it!" → 3 days wasted on wrong feature | "I have an idea! Let me stress-test it first." → 45 min grilling saves 3 days |
| AI agrees with everything you say | AI challenges your weakest assumptions |
| You discover the problem AFTER building | You discover the problem BEFORE building |
| Sunk-cost bias keeps you going | Evidence-based go/no-go decision |

##### Copy-Paste Grill Me Prompt

```text
Act as a tough but fair product interrogator. Your job is to CHALLENGE my idea, 
NOT agree with it. You are a building inspector, not a cheerleader.

My idea:
[PASTE YOUR IDEA — MESSY IS FINE]

My target user:
[WHO IS THIS FOR]

My constraints:
- I am a beginner, not tech-savvy, ESL speaker.
- $0 budget.
- Tools: ChatGPT Enterprise, M365 Copilot, VS Code + Cline, GitHub.

GRILLING RULES:
1. Ask me at least 10 hard questions, one at a time.
2. Do NOT be agreeable. Challenge my assumptions.
3. If my answer is vague, push harder.
4. After all questions, identify the SINGLE RISKIEST ASSUMPTION.
5. Do NOT write any code, designs, or plans yet.
6. After grilling, produce a GRILLING BRIEF with:
   - Summary of my idea (in your words, not mine)
   - All questions asked and my answers
   - Top 3 risks identified
   - The single riskiest assumption
   - Your honest assessment: PROCEED / REVISE / KILL
   - What must be validated before building

Start grilling. Ask one question at a time. Wait for my answer before asking the next.
```

##### Grilling Done Checklist

- [ ] AI asked at least 10 tough questions
- [ ] AI challenged at least 2 of my assumptions
- [ ] AI identified the single riskiest assumption
- [ ] I answered honestly (not defensively)
- [ ] Grilling Brief is saved
- [ ] Decision made: PROCEED / REVISE / KILL
- [ ] If PROCEED: move to Step 02 (Problem Selection)

##### 🍳 Analogy: The Grilling Phase

Imagine you want to open a restaurant. Before you sign a lease, buy equipment, and hire staff, a smart friend sits you down and asks:

- "Who exactly is eating here?"
- "Why would they choose you over the place next door?"
- "What if nobody comes on weekday lunches?"
- "Can you afford 3 months of zero customers?"

That friend is NOT being mean. That friend is saving you from a ₱500,000 mistake. **The Grilling Phase is that friend.** 🍳➡️🏗️

<!-- END ADDED: mattpocock/skills absorption — Grilling Before Building -->

## Step 02 — Problem selection

| Field | Details |
|---|---|
| **What to do** | Score the top ideas by pain, frequency, willingness-to-pay/use, access to users, and simplicity. Pick one painful problem first. |
| **What AI does 🤖** | Creates a scoring table and explains the tradeoffs in plain English. |
| **What I review 👀** | Check if AI is guessing. Look for weak assumptions, fake certainty, and ideas that depend on users you cannot reach. |
| **What I decide 🧠** | Select one primary problem and one backup problem. |
| **What needs human approval ✋** | You approve the chosen problem before doing research or building. |
| **Expected output** | Ranked opportunity table and one selected problem statement. |
| **Tools** | ChatGPT Enterprise, Excel/SharePoint List, M365 Copilot, One True Dashboard. |
| **Data level** | Level 0-1. Do not use confidential company/client data. |
| **Estimated time** | 45-90 minutes. |

### Copy-paste prompt

```text
Act as a practical startup advisor and beginner teacher.

Here are my top ideas:
[PASTE TOP 3 IDEAS]

Score each idea from 1-10 on:
1. Pain severity
2. Frequency
3. Willingness to pay or use repeatedly
4. My access to users
5. Build simplicity for a beginner
6. Portfolio value
7. Risk level

Output:
1. Ranked scoring table
2. Best idea to validate first
3. Why this idea wins
4. What assumption could make this idea fail
5. One-sentence problem statement:
   [TARGET USER] struggles with [PROBLEM] because [CAUSE].

Use simple English. Label guesses as assumptions.
```

## Step 03 — Validation

| Field | Details |
|---|---|
| **What to do** | Talk to real people or collect survey answers before building. Test whether the problem is painful and repeated. |
| **What AI does 🤖** | Drafts interview questions, survey questions, outreach messages, and a pass/fail validation threshold. |
| **What I review 👀** | Make sure questions are not leading. Check privacy, consent, and whether the survey is short enough. |
| **What I decide 🧠** | Set a validation gate, such as 5-10 user conversations, 10+ responses, or 3 testers willing to try a rough version. |
| **What needs human approval ✋** | You approve before contacting people, posting publicly, or collecting personal data. |
| **Expected output** | Validation plan, survey form draft, outreach message, and pass/fail criteria. |
| **Tools** | Tally, Microsoft Forms, Google Forms, ChatGPT, M365 Copilot, communities you are allowed to contact. |
| **Data level** | Level 0-1. Level 2 only with consent and only in trusted tools. |
| **Estimated time** | 1-3 hours setup plus 1-7 days waiting for responses. |

### Copy-paste prompt

```text
Act as a customer discovery coach.

Problem statement:
[PASTE PROBLEM STATEMENT]

Target user:
[DESCRIBE TARGET USER]

Create a $0 validation plan.

Output:
1. 5 interview questions
2. 7 short survey questions
3. A polite outreach message
4. Where I might find 5-10 target users
5. Pass/fail threshold
6. What answers mean GO, PIVOT, or KILL
7. Privacy note I should include

Rules:
- Do not write manipulative questions.
- Keep it beginner-friendly.
- Do not ask for sensitive data unless truly needed.
```

## Step 04 — Competitive analysis

| Field | Details |
|---|---|
| **What to do** | Find current alternatives: manual workarounds, spreadsheets, existing apps, communities, templates, and services. |
| **What AI does 🤖** | Researches and creates a comparison matrix. Separates direct competitors from substitute solutions. |
| **What I review 👀** | Verify sources. Watch for outdated pricing, fake tool claims, and competitor descriptions that are too confident. |
| **What I decide 🧠** | Choose your positioning: faster, simpler, cheaper, more local, more beginner-friendly, or more focused. |
| **What needs human approval ✋** | You approve any public claims about competitors before using them in a portfolio, landing page, or sales material. |
| **Expected output** | Alternative/competitor matrix and opportunity gap. |
| **Tools** | ChatGPT Web Search/Deep Research, browser, official websites, spreadsheet. |
| **Data level** | Level 0-1. Use public/permissioned information only. |
| **Estimated time** | 1-3 hours. |

### Copy-paste prompt

```text
Act as a source-first market researcher.

Problem:
[PASTE PROBLEM]

Target user:
[PASTE TARGET USER]

Research alternatives and competitors. Use current sources if web search is available.

Output a table:
| Alternative | Type | Who it serves | Strength | Weakness | Price/limit if verified | Source | Confidence |

Then answer:
1. What problem is already well solved?
2. What gap still exists?
3. What simple angle can I test?
4. What claims are unverified and need checking?

Do not invent citations or pricing. Mark unverified claims with ⚠️.
```

## Step 05 — Requirements

| Field | Details |
|---|---|
| **What to do** | Turn the validated problem into clear requirements. Keep one target user, one workflow, one useful result, and three must-have features max. |
| **What AI does 🤖** | Converts notes into must-haves, nice-to-haves, non-goals, constraints, and risks. |
| **What I review 👀** | Check if the requirements are too big. Remove features that do not prove the core value. |
| **What I decide 🧠** | Approve the MVP boundary and the NOT-building list. |
| **What needs human approval ✋** | You approve scope before AI creates designs, code, or prototypes. |
| **Expected output** | MVP requirements summary with must-have features, non-goals, and acceptance criteria. |
| **Tools** | ChatGPT Project, M365 Copilot, Word/Loop/OneNote, Markdown PRD file. |
| **Data level** | Level 0-2. Keep sensitive data out of random tools. |
| **Estimated time** | 1-2 hours. |

### Copy-paste prompt

```text
Act as a product manager for a beginner solopreneur.

Validated problem:
[PASTE PROBLEM]

Target user:
[PASTE USER]

Evidence collected:
[PASTE SHORT VALIDATION SUMMARY]

Create lightweight MVP requirements.

Output:
1. Product North Star sentence
2. Must-have features, exactly 3
3. Nice-to-have features, max 5
4. NOT-building list, at least 7 items
5. Main workflow
6. Acceptance criteria
7. Risks and assumptions
8. Data needed, with data level

Keep it small. Do not overbuild.
```

## Step 06 — Research

| Field | Details |
|---|---|
| **What to do** | Research only what affects decisions: tools, user pain, regulations, platform limits, security, and examples. Do not research forever. |
| **What AI does 🤖** | Creates research questions, collects sources, builds a source ledger, and labels confidence. |
| **What I review 👀** | Check whether sources are official, current, and relevant. Mark weak claims with ⚠️. |
| **What I decide 🧠** | Choose which facts are strong enough to guide the project. |
| **What needs human approval ✋** | You approve decisions based on research, especially tool choice, public claims, pricing, or legal/tax/privacy assumptions. |
| **Expected output** | Research memo with facts, assumptions, source ledger, contradictions, and next checks. |
| **Tools** | ChatGPT Web Search/Deep Research, official docs, M365 Copilot for internal approved docs, Markdown source ledger. |
| **Data level** | Level 0-1 by default. Level 3 only inside approved company/M365 environment. Never Level 4 in AI chat. |
| **Estimated time** | 1-4 hours depending on risk. |

### Copy-paste prompt

```text
Act as a source-first research assistant.

Decision I need to make:
[PASTE DECISION]

Project context:
[PASTE APP CONTEXT]

Research only what affects this decision.

Output:
1. Research questions
2. Findings table: Claim | Source | Confidence | Notes
3. Contradictions or uncertainty
4. What is safe to assume now
5. What must be checked again before public/paid launch
6. Recommendation

Rules:
- Prefer official sources.
- Do not invent citations.
- Mark unverified claims with ⚠️.
- Keep the answer practical.
```

## Step 07 — Persona

| Field | Details |
|---|---|
| **What to do** | Create one primary user persona from evidence. Keep it specific and useful, not a fake marketing character. |
| **What AI does 🤖** | Turns validation notes into user goals, pains, current workaround, triggers, objections, and success criteria. |
| **What I review 👀** | Check stereotypes and assumptions. Make sure the persona matches real feedback. |
| **What I decide 🧠** | Choose the primary persona and one anti-persona who is not the target. |
| **What needs human approval ✋** | You approve the persona before designing screens or writing copy. |
| **Expected output** | Persona card and anti-persona card. |
| **Tools** | ChatGPT, M365 Copilot, Notion/OneNote/Markdown, validation notes. |
| **Data level** | Level 0-1. Anonymize real feedback. |
| **Estimated time** | 45-90 minutes. |

### Copy-paste prompt

```text
Act as a UX researcher.

Validation notes:
[PASTE ANONYMIZED NOTES]

Create one evidence-based persona.

Output:
1. Persona name, role, situation
2. Main goal
3. Top 3 pains
4. Current workaround
5. What success looks like
6. Objections or fears
7. Accessibility or language needs
8. Anti-persona: who this app is NOT for
9. Design implications

Rules:
- Do not invent demographics unless evidence supports them.
- Use simple English.
- Label assumptions.
```

## Step 08 — Spec/PRD

| Field | Details |
|---|---|
| **What to do** | Write a lightweight Product Requirements Document. This becomes the project contract between you and AI. |
| **What AI does 🤖** | Drafts problem, users, goals, non-goals, features, data, risks, tests, and success criteria. |
| **What I review 👀** | Check if the PRD is clear enough for another AI or developer to build from. |
| **What I decide 🧠** | Approve PRD version 0.1 or send it back for simplification. |
| **What needs human approval ✋** | You approve the PRD before build work starts. |
| **Expected output** | PRD-lite Markdown file. |
| **Tools** | ChatGPT Canvas/Project, Word with Copilot, Markdown, GitHub repo docs. |
| **Data level** | Level 0-2. Do not include secrets or sensitive production data. |
| **Estimated time** | 1-2 hours. |

### Copy-paste prompt

```text
Act as a senior product manager and beginner teacher.

Use this context:
Product North Star: [PASTE]
Persona: [PASTE]
MVP features: [PASTE]
Main workflow: [PASTE]
Constraints: [PASTE]

Create a PRD-lite in Markdown with:
1. Problem
2. Target user
3. Goals
4. Non-goals
5. MVP scope
6. User stories
7. Data model summary
8. Security/privacy notes
9. Acceptance criteria
10. Risks and assumptions
11. First build tasks

Keep it practical and small.
```

## Step 09 — User stories

| Field | Details |
|---|---|
| **What to do** | Convert the PRD into small user stories that can be built and tested one by one. |
| **What AI does 🤖** | Writes user stories with acceptance criteria and priority. |
| **What I review 👀** | Check if each story is testable and tied to the main workflow. |
| **What I decide 🧠** | Choose the first 3-7 stories for MVP build. |
| **What needs human approval ✋** | You approve backlog priority before AI starts coding or building. |
| **Expected output** | Prioritized user story backlog. |
| **Tools** | ChatGPT, Excel/Planner/Notion/GitHub Issues. |
| **Data level** | Level 0-1. |
| **Estimated time** | 45-90 minutes. |

### Copy-paste prompt

```text
Act as an agile product owner.

PRD-lite:
[PASTE PRD]

Create user stories in this format:
| Priority | User story | Why it matters | Acceptance criteria | Data needed | Test method |

Rules:
- Use “As a [user], I want [action], so that [benefit].”
- Keep stories small.
- Mark anything that is not MVP as Later.
- Include acceptance criteria I can manually test.
```

## Step 10 — UX flow

| Field | Details |
|---|---|
| **What to do** | Map the user journey and screens. Design 3-5 screens first, with empty, loading, error, and success states. |
| **What AI does 🤖** | Creates the happy path, edge cases, screen list, navigation, and state checklist. |
| **What I review 👀** | Check if a beginner user would know what to do next. Look for too many buttons or confusing labels. |
| **What I decide 🧠** | Approve the screen list and navigation. |
| **What needs human approval ✋** | You approve UX flow before prototype generation. |
| **Expected output** | UX flow, screen list, and state checklist. |
| **Tools** | Excalidraw, Figma, ChatGPT, M365 Whiteboard/Loop. |
| **Data level** | Level 0-1. Use fake examples in screens. |
| **Estimated time** | 1-3 hours. |

### Copy-paste prompt

```text
Act as a senior UX designer for mobile-first beginner-friendly apps.

Product North Star:
[PASTE]

Primary persona:
[PASTE]

Main workflow:
[PASTE]

Design the UX flow.

Output:
1. Happy path: step-by-step
2. Screen list, max 5 screens
3. What each screen shows
4. Primary action button for each screen
5. Empty/loading/error/success states
6. Navigation map
7. Accessibility notes
8. What not to design yet

Use simple labels. Avoid clutter.
```

## Step 11 — Data model

| Field | Details |
|---|---|
| **What to do** | List what data the app needs to store. Keep only the minimum fields needed for the main workflow. |
| **What AI does 🤖** | Drafts entities, fields, relationships, permissions, retention notes, and dummy data. |
| **What I review 👀** | Check if the app is collecting unnecessary personal data. Confirm no secrets are included. |
| **What I decide 🧠** | Choose the simplest storage path: spreadsheet, local file, SharePoint List, Supabase, or other database. |
| **What needs human approval ✋** | You approve any personal-data fields, database design, or permission model. |
| **Expected output** | Data model table, dummy data plan, and permission notes. |
| **Tools** | ChatGPT, Excel, SharePoint List, Supabase/Firebase docs, GitHub docs folder. |
| **Data level** | Level 0-2. Never paste Level 4 secrets/regulated data. |
| **Estimated time** | 1-2 hours. |

### Copy-paste prompt

```text
Act as a data model designer who avoids overbuilding.

App purpose:
[PASTE]

Main workflow:
[PASTE]

Screens:
[PASTE]

Create a simple data model.

Output:
| Entity/table | Purpose | Fields | Example dummy data | Who can see/edit | Data level | Keep/delete rule |

Then recommend the simplest storage option for my current stage.

Rules:
- Collect the least data possible.
- Use dummy data.
- No secrets.
- Flag any field that may be sensitive.
```

## Step 12 — No-code prototype

| Field | Details |
|---|---|
| **What to do** | Create a fast clickable prototype using fake data. This tests the idea and UX before serious coding. |
| **What AI does 🤖** | Writes a prompt for Bolt/Lovable/v0/Figma/AI Studio and helps iterate the prototype. |
| **What I review 👀** | Check if the main workflow works, looks clear on mobile, uses fake data, and contains no API keys. |
| **What I decide 🧠** | Choose whether the prototype is good enough to show to 3-5 testers. |
| **What needs human approval ✋** | You approve before sharing the prototype link or collecting feedback. |
| **Expected output** | Clickable prototype with fake data and test checklist. |
| **Tools** | Bolt, Lovable, v0, Figma, Google AI Studio, Tally for feedback. ⚠️ Check current limits before relying on any free tier. |
| **Data level** | Level 0 only. Public demo/fake data. |
| **Estimated time** | 2-6 hours. |

### Copy-paste prompt

```text
Act as an AI app builder prompt writer.

Create a prompt I can paste into [BOLT / LOVABLE / V0 / FIGMA / AI STUDIO].

App name: [APP NAME]
Product North Star: [PASTE]
Target user: [PASTE]
MVP features: [PASTE 3 FEATURES]
Screens: [PASTE SCREEN LIST]
Data model: [PASTE DATA MODEL]
Design style: clean, mobile-first, simple, trustworthy

Rules:
- Use fake/demo data only.
- Do not include real API keys or secrets.
- Include empty/loading/error/success states.
- Make the main workflow clickable.
- Add a short testing checklist.

Output only the builder-ready prompt.
```

## Step 13 — Coded prototype

| Field | Details |
|---|---|
| **What to do** | Build the first owned-code version only after the workflow is clear. Use small safe coding tasks, not giant rewrites. |
| **What AI does 🤖** | Generates file plan, edits small chunks, explains changes, writes tests/check steps, and gives rollback guidance. |
| **What I review 👀** | Review changed files, run locally, test the main workflow, and check for secrets. |
| **What I decide 🧠** | Commit, revert, or ask for a smaller fix. |
| **What needs human approval ✋** | You approve before AI edits files, pushes to GitHub, deploys, or touches environment variables. |
| **Expected output** | Working local coded prototype with README, .env.example, and test steps. |
| **Tools** | VS Code + Cline, GitHub Copilot, ChatGPT, GitHub, local terminal, Ollama for local non-sensitive assistance. |
| **Data level** | Level 0-1. Use dummy/test data. No secrets in prompts or frontend code. |
| **Estimated time** | 1-5 days depending on app size. |

### Copy-paste prompt

```text
Act as a careful senior developer using small safe changes.

Project:
[APP NAME]

Current goal:
[ONE SMALL BUILD TASK]

Relevant files if known:
[LIST FILES]

Rules:
- Before editing, list files you plan to change.
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Do not touch .env files or secrets.
- After editing, summarize changed files.
- Give exact local test steps.
- Give rollback advice.

Task:
[DESCRIBE TASK]
```

## Step 14 — Testing

| Field | Details |
|---|---|
| **What to do** | Manually test the core workflow from start to finish. Test like a confused first-time user. |
| **What AI does 🤖** | Creates test cases, edge cases, expected results, and a test log template. |
| **What I review 👀** | Check each test result honestly. Do not ignore failed tests because the app “mostly works.” |
| **What I decide 🧠** | Pass, fix, or reduce scope. |
| **What needs human approval ✋** | You approve using any real user data. Default to dummy data. |
| **Expected output** | TEST_PLAN.md and test results log. |
| **Tools** | Browser, mobile phone, ChatGPT, Cline, GitHub Issues, Markdown/Excel test log. |
| **Data level** | Level 0-1. |
| **Estimated time** | 1-3 hours per test round. |

### Copy-paste prompt

```text
Act as a QA tester for a beginner-built MVP.

App purpose:
[PASTE]

Main workflow:
[PASTE]

Screens/features to test:
[PASTE]

Create a manual test plan.

Output:
| Test ID | Scenario | Steps | Expected result | Data to use | Pass/fail | Notes |

Include:
1. Happy path tests
2. Empty state tests
3. Error state tests
4. Mobile tests
5. Data save/read/edit/delete tests if relevant
6. Regression checks

Use dummy data only.
```

## Step 15 — QA

| Field | Details |
|---|---|
| **What to do** | Run a broader quality check: function, data, mobile, performance, accessibility, security, documentation, and portfolio readiness. |
| **What AI does 🤖** | Audits the app against checklists and ranks issues by blocker, must-fix, and later. |
| **What I review 👀** | Look at blockers first. Check if AI is overreacting or missing obvious user problems. |
| **What I decide 🧠** | Fix now, defer, or remove feature. |
| **What needs human approval ✋** | You approve before release, public demo, or beta invite. |
| **Expected output** | QA report with prioritized fix list. |
| **Tools** | ChatGPT, Cline, browser devtools, mobile device, Lighthouse if available, TEST_PLAN.md. |
| **Data level** | Level 0-1. |
| **Estimated time** | 1-3 hours. |

### Copy-paste prompt

```text
Act as a strict but practical QA reviewer.

App:
[APP NAME]

Stage:
[PERSONAL / PROTOTYPE / PRIVATE BETA / PUBLIC DEMO]

What works now:
[PASTE SUMMARY]

Known issues:
[PASTE ISSUES]

Create a QA report with:
1. Launch/blocker issues
2. Must-fix before sharing
3. Nice-to-fix later
4. Test cases to rerun
5. Risks if I ignore each issue
6. Recommendation: pass / fix / stop

Keep it practical. Do not overbuild.
```

## Step 16 — Accessibility

| Field | Details |
|---|---|
| **What to do** | Check whether users can read, tap, navigate, and understand the app. Include keyboard focus, labels, contrast, and mobile readability. |
| **What AI does 🤖** | Creates an accessibility checklist and suggests simple fixes. |
| **What I review 👀** | Manually inspect screens. Check color contrast, labels, font size, button size, and form errors. |
| **What I decide 🧠** | Choose minimum accessibility fixes before sharing. |
| **What needs human approval ✋** | You approve before public demo or beta. |
| **Expected output** | Accessibility checklist and fix list. |
| **Tools** | ChatGPT, browser, keyboard-only navigation, Lighthouse/accessibility checker if available, Figma. |
| **Data level** | Level 0-1. |
| **Estimated time** | 1-2 hours. |

### Copy-paste prompt

```text
Act as an accessibility reviewer for a beginner-friendly web app.

Screens/components:
[PASTE SCREEN LIST OR SCREENSHOT DESCRIPTIONS]

Review for:
1. Readable text
2. Good contrast
3. Keyboard navigation
4. Form labels
5. Error messages
6. Button size on mobile
7. Not relying only on color
8. Empty/loading/error/success states

Output:
| Issue | Why it matters | Simple fix | Priority |

Use plain English. Focus on practical improvements.
```

## Step 17 — Security

| Field | Details |
|---|---|
| **What to do** | Check secrets, permissions, authentication, database rules, public/private data, and rollback. This is a stop gate before public use. |
| **What AI does 🤖** | Creates a security checklist and flags risks such as exposed keys, weak permissions, or unsafe automations. |
| **What I review 👀** | Verify no real API keys, tokens, service role keys, passwords, or connection strings are in code, prompts, screenshots, or GitHub. |
| **What I decide 🧠** | Decide whether the app is safe enough to share privately/publicly or should stay local. |
| **What needs human approval ✋** | You approve before deployment, public sharing, database changes, permission changes, or using real user data. |
| **Expected output** | SECURITY_CHECKLIST.md and blocker list. |
| **Tools** | ChatGPT, Cline, GitHub secret scanning, .gitignore, .env.example, hosting env vars, database dashboard. |
| **Data level** | Level 0-2. Never paste Level 4 secrets/regulated data into AI chat or public code. |
| **Estimated time** | 1-3 hours; longer if auth/database exists. |

### Copy-paste prompt

```text
Act as a security reviewer for a beginner MVP.

App stack:
[PASTE STACK]

Data stored:
[PASTE DATA MODEL]

Deployment plan:
[PASTE PLAN]

Review security/privacy before sharing.

Check:
1. Secrets in code or GitHub
2. .env and .env.example safety
3. Frontend/public exposure
4. Database permissions / RLS if relevant
5. Auth/login need
6. Sensitive data risk
7. Backup and rollback
8. Risky automations

Output:
| Risk | Severity | Evidence to check | Fix | Blocker? |

Do not ask me to paste real secrets.
```

## Step 18 — Feedback

| Field | Details |
|---|---|
| **What to do** | Collect user feedback with a short form or interview. Watch behavior, not just opinions. |
| **What AI does 🤖** | Drafts feedback questions, interview guide, and analysis template. |
| **What I review 👀** | Make sure questions are simple and non-leading. Remove personal data questions unless needed. |
| **What I decide 🧠** | Choose testers and feedback channels. |
| **What needs human approval ✋** | You approve before contacting users or collecting feedback. |
| **Expected output** | Feedback form, interview script, and feedback log. |
| **Tools** | Tally, Microsoft Forms, Google Forms, ChatGPT, Teams/Zoom/Meet, Notion/Excel feedback log. |
| **Data level** | Level 0-2 with consent. Anonymize before sharing. |
| **Estimated time** | 1 hour setup plus interviews/testing time. |

### Copy-paste prompt

```text
Act as a UX researcher.

Prototype/app:
[PASTE DESCRIPTION OR LINK]

Target tester:
[PASTE]

Create a feedback plan.

Output:
1. 5 task-based usability questions
2. 5 feedback form questions
3. Short tester invitation message
4. Consent/privacy note
5. Feedback log table
6. How to identify the top 3 issues

Rules:
- Keep questions simple.
- Do not collect sensitive data unless necessary.
- Focus on behavior and confusion points.
```

## Step 19 — Iteration

| Field | Details |
|---|---|
| **What to do** | Improve the app based on evidence. Fix the top problems first; do not add random features. |
| **What AI does 🤖** | Clusters feedback, finds themes, ranks fixes, and proposes a small next sprint. |
| **What I review 👀** | Check if suggested changes are based on real feedback or AI imagination. |
| **What I decide 🧠** | Pick the next 1-3 changes only. |
| **What needs human approval ✋** | You approve before AI edits files, changes user flows, or deploys updates. |
| **Expected output** | Iteration backlog and next sprint plan. |
| **Tools** | ChatGPT, Cline, GitHub Issues/Projects, Excel/Notion/Planner. |
| **Data level** | Level 0-2. Remove names/emails when summarizing feedback. |
| **Estimated time** | 1-3 hours per iteration planning round. |

### Copy-paste prompt

```text
Act as a product owner and UX analyst.

Feedback collected:
[PASTE ANONYMIZED FEEDBACK]

Current MVP scope:
[PASTE]

Analyze feedback and create an iteration plan.

Output:
1. Top themes
2. Top 3 user pain points
3. Must-fix issues
4. Feature requests to defer
5. Next sprint: max 3 changes
6. Test plan after changes
7. Continue / pivot / pause recommendation

Do not add features unless evidence supports them.
```

## Step 20 — Portfolio packaging

| Field | Details |
|---|---|
| **What to do** | Turn the project into a clean portfolio asset without exposing private data or pretending AI did not help. |
| **What AI does 🤖** | Drafts README, case study, screenshots checklist, demo script, and honest AI-assisted work statement. |
| **What I review 👀** | Check that no real names, company data, secrets, private screenshots, or misleading claims are included. |
| **What I decide 🧠** | Choose what becomes public and what stays private. |
| **What needs human approval ✋** | You approve before publishing GitHub repo, screenshots, case study, or LinkedIn post. |
| **Expected output** | Portfolio pack: README, case study, demo screenshots list, and public-safe story. |
| **Tools** | ChatGPT, GitHub, Markdown, PowerPoint/Canva/Figma for visuals, screenshots folder. |
| **Data level** | Level 0 only for public portfolio. |
| **Estimated time** | 2-5 hours. |

### Copy-paste prompt

```text
Act as a portfolio strategist.

Project:
[APP NAME]

What it solves:
[PASTE]

What I built:
[PASTE]

Evidence/results:
[PASTE SAFE RESULTS]

Create a public-safe portfolio pack:
1. README outline
2. Case study: Problem -> Process -> Solution -> Result
3. Screenshot list using dummy data
4. Short demo script
5. Honest AI-assisted work statement
6. What must stay private
7. Final safety checklist before publishing

Use simple English and do not exaggerate.
```

## Step 21 — Public demo prep

| Field | Details |
|---|---|
| **What to do** | Prepare a public-safe demo with dummy data, privacy notes, support contact, and rollback plan. |
| **What AI does 🤖** | Creates a pre-demo checklist and identifies blockers. |
| **What I review 👀** | Check links, mobile layout, screenshots, dummy data, privacy statements, and deployment settings. |
| **What I decide 🧠** | Go public, stay private, or fix blockers first. |
| **What needs human approval ✋** | You approve before making a link public or posting about the demo. |
| **Expected output** | Public demo checklist and go/no-go decision. |
| **Tools** | GitHub, Cloudflare Pages/Netlify/GitHub Pages, ChatGPT, browser/mobile testing, feedback form. |
| **Data level** | Level 0 only. |
| **Estimated time** | 2-4 hours. |

### Copy-paste prompt

```text
Act as a strict public demo reviewer.

App/demo:
[PASTE DESCRIPTION OR LINK]

Stage:
Public demo, not commercial launch.

Review readiness.

Output:
1. Public demo score /100
2. Blockers
3. Must-fix before public link
4. Safe dummy data checklist
5. Privacy/security checklist
6. Mobile/accessibility checklist
7. Feedback form checklist
8. Rollback plan
9. Final recommendation: GO / FIX / DO NOT SHARE YET

Be direct. Do not assume it is safe.
```

## Step 22 — Beta testing

| Field | Details |
|---|---|
| **What to do** | Invite a small group of testers after the app is stable enough. Keep expectations clear: it is a beta, not a finished product. |
| **What AI does 🤖** | Drafts beta onboarding, tester instructions, feedback cadence, and support notes. |
| **What I review 👀** | Check that beta testers understand risks, data limits, and how to report issues. |
| **What I decide 🧠** | Choose who enters beta and how long the beta runs. |
| **What needs human approval ✋** | You approve invitations, data collection, support commitments, and any real-user access. |
| **Expected output** | Beta plan, onboarding message, feedback form, support plan. |
| **Tools** | Tally/Microsoft Forms, email/Teams/WhatsApp, ChatGPT, GitHub Issues, analytics only if appropriate. |
| **Data level** | Level 0-2 with consent. Avoid company/internal and regulated data. |
| **Estimated time** | 2-4 hours setup plus beta period. |

### Copy-paste prompt

```text
Act as a private beta launch manager.

App:
[APP NAME]

Target beta users:
[PASTE]

What users can do now:
[PASTE]

Create a private beta plan:
1. Beta goal
2. Who to invite and who not to invite
3. Tester onboarding message
4. Known limitations warning
5. Feedback form
6. Support process
7. Data/privacy rules
8. Success metrics
9. End-of-beta decision gate

Keep it small: 5-20 testers max.
```

## Step 23 — Beta feedback analysis

| Field | Details |
|---|---|
| **What to do** | Analyze feedback, usage, bugs, support burden, and willingness-to-pay signals. |
| **What AI does 🤖** | Groups feedback, creates metrics summary, identifies blockers, and recommends continue/pivot/kill. |
| **What I review 👀** | Check if results are biased by small sample size. Verify actual behavior against opinions. |
| **What I decide 🧠** | Choose the next stage: improve, repeat beta, monetize experiment, pivot, or archive. |
| **What needs human approval ✋** | You approve roadmap changes, public claims, or monetization moves based on beta results. |
| **Expected output** | Beta report and decision recommendation. |
| **Tools** | ChatGPT, Excel/Power BI if useful, feedback forms, product analytics, support log. |
| **Data level** | Level 0-2. Anonymize beta feedback. |
| **Estimated time** | 2-4 hours. |

### Copy-paste prompt

```text
Act as a product analyst.

Beta feedback:
[PASTE ANONYMIZED FEEDBACK]

Usage metrics if available:
[PASTE METRICS]

Known bugs/support issues:
[PASTE]

Create a beta analysis report:
1. What users liked
2. Where users got stuck
3. Top 5 bugs/issues
4. Repeated feature requests
5. Payment or repeat-use signals
6. Support burden
7. Risks
8. Recommendation: continue / improve / pivot / archive
9. Next 7 actions

Separate facts, assumptions, and opinions.
```

## Step 24 — Monetization experiment

| Field | Details |
|---|---|
| **What to do** | Test willingness to pay before building a payment system. Use waitlist, paid pilot, manual invoice, landing page, or checkout link only when justified. |
| **What AI does 🤖** | Drafts pricing hypothesis, offer options, waitlist copy, paid-pilot script, and risk checklist. |
| **What I review 👀** | Check legal/tax/privacy/payment obligations. Confirm that value is validated before charging. |
| **What I decide 🧠** | Choose the smallest ethical revenue test. |
| **What needs human approval ✋** | You approve before asking for money, adding checkout, sending invoices, taking payments, refunds, or making revenue claims. |
| **Expected output** | Monetization experiment plan and go/no-go gate. |
| **Tools** | ChatGPT, Tally/waitlist, landing page, Lemon Squeezy/PayMongo/Stripe only after terms/country check, spreadsheet tracker. |
| **Data level** | Level 0-1. Payment data should stay inside payment provider tools. Do not paste financial or customer PII into AI. |
| **Estimated time** | 2-6 hours setup plus 1-2 weeks test. |

### Copy-paste prompt

```text
Act as a monetization strategist and risk-aware beginner teacher.

Product:
[PASTE]

Evidence of user value:
[PASTE]

Target user:
[PASTE]

Create a $0-upfront monetization experiment.

Output:
1. Should I monetize now? yes/no/conditional
2. Best test: waitlist / paid pilot / manual service / template / checkout link
3. Offer hypothesis
4. Pricing research questions
5. Trust assets needed
6. Legal/tax/privacy/payment warnings
7. Success metrics
8. Stop/pivot criteria

Make clear this is general planning, not legal/tax/accounting advice.
```

## Step 25 — AI optimization

| Field | Details |
|---|---|
| **What to do** | Improve how you use AI: better prompts, smaller tasks, clearer context, less token waste, safer handoffs. |
| **What AI does 🤖** | Audits prompts, project instructions, Cline instructions, handoff notes, and tool routing. |
| **What I review 👀** | Check if changes reduce confusion and risk. Avoid making global instructions too long or conflicting. |
| **What I decide 🧠** | Choose which prompts, instructions, or SOPs to update. |
| **What needs human approval ✋** | You approve before changing global custom instructions, project instructions, custom GPTs, coding-agent rules, or automation rules. |
| **Expected output** | AI workflow improvement plan and updated prompt snippets. |
| **Tools** | ChatGPT Project, Custom Instructions, Project Instructions, Cline rules, GitHub Copilot, M365 Copilot Notebook. |
| **Data level** | Level 0-1. Do not include secrets or confidential context in reusable prompts. |
| **Estimated time** | 1-3 hours. |

### Copy-paste prompt

```text
Act as an AI workflow auditor.

My current AI workflow:
[PASTE HOW I USE CHATGPT / COPILOT / CLINE]

Problems I notice:
[PASTE]

Review and improve it.

Output:
1. What is working
2. What causes confusion or rework
3. Better tool routing
4. Better prompt patterns
5. Safer Cline/code instructions
6. Context handoff template
7. What NOT to automate
8. Versioning plan for prompts

Keep changes simple and beginner-friendly.
```

## Step 26 — Deployment

| Field | Details |
|---|---|
| **What to do** | Deploy only when the app passes basic tests and has no exposed secrets. Local use is also a valid deployment. |
| **What AI does 🤖** | Creates a deployment checklist, build commands, environment variable plan, smoke tests, and rollback steps. |
| **What I review 👀** | Check build logs, environment variables, public/private settings, and whether current host terms allow your intended use. |
| **What I decide 🧠** | Deploy locally, privately, publicly, or delay. |
| **What needs human approval ✋** | You approve before public deployment, DNS/domain changes, environment variable changes, or production data migration. |
| **Expected output** | Deployment plan, live/private link or local run guide, smoke test, rollback plan. |
| **Tools** | GitHub, Cloudflare Pages/Netlify/GitHub Pages, local machine, Supabase/Firebase if needed, ChatGPT/Cline. ⚠️ Re-check current host terms before commercial use. |
| **Data level** | Level 0-2. No Level 4. Use environment variables for secrets; never frontend code. |
| **Estimated time** | 1-4 hours for simple static/demo app; longer for full-stack. |

### Copy-paste prompt

```text
Act as a deployment engineer and beginner teacher.

App stack:
[PASTE STACK]

Current stage:
[LOCAL / PRIVATE TEST / PUBLIC DEMO / BETA]

Repository/deployment target:
[PASTE]

Create a deployment plan.

Output:
1. Pre-deploy checklist
2. Build command
3. Environment variables needed, using placeholder names only
4. Deployment steps
5. Smoke tests after deploy
6. Rollback plan
7. Common beginner errors
8. Security warnings

Do not ask me to paste real secrets.
```

## Step 27 — Feedback loop

| Field | Details |
|---|---|
| **What to do** | Create a weekly loop: review metrics, feedback, bugs, support, costs, and next action. Keep one source of truth. |
| **What AI does 🤖** | Summarizes feedback and metrics into a weekly decision memo. |
| **What I review 👀** | Check trends, repeated pain, and whether metrics are enough to decide. |
| **What I decide 🧠** | Pick the next weekly action: fix, improve, research, pause, or pivot. |
| **What needs human approval ✋** | You approve before automating messages, contacting users, changing records, or publishing updates. |
| **Expected output** | Weekly feedback loop template and project dashboard fields. |
| **Tools** | Excel/SharePoint List/Notion/Markdown PROJECT_INDEX, Tally, PostHog/Umami if appropriate, ChatGPT. |
| **Data level** | Level 0-2. Anonymize user feedback. |
| **Estimated time** | 30-90 minutes weekly. |

### Copy-paste prompt

```text
Act as my weekly product operations assistant.

Project:
[APP NAME]

This week’s feedback:
[PASTE]

Metrics:
[PASTE]

Bugs/support:
[PASTE]

Create a weekly feedback loop memo:
1. What changed
2. What users did
3. Top 3 issues
4. Top 3 opportunities
5. Risk/cost notes
6. Recommended next action
7. Owner and deadline
8. What to update in the One True Dashboard

Keep it short and decision-ready.
```

## Step 28 — Maintenance

| Field | Details |
|---|---|
| **What to do** | Keep the app usable: update dependencies, fix bugs, back up data, monitor limits, and document changes. |
| **What AI does 🤖** | Creates maintenance checklist, bug triage, and update plan. |
| **What I review 👀** | Check if updates could break the app. Test before committing or deploying. |
| **What I decide 🧠** | Choose update cadence and what to patch now. |
| **What needs human approval ✋** | You approve package upgrades, database migrations, delete actions, permission changes, and public release updates. |
| **Expected output** | Maintenance checklist and update schedule. |
| **Tools** | GitHub, VS Code+Cline, package manager, hosting dashboard, database dashboard, Excel/Markdown maintenance log. |
| **Data level** | Level 0-2. |
| **Estimated time** | 30-120 minutes weekly or monthly. |

### Copy-paste prompt

```text
Act as a maintenance planner for a small MVP.

App:
[APP NAME]

Current status:
[PASTE]

Known bugs:
[PASTE]

Recent changes:
[PASTE]

Create a maintenance plan:
1. Weekly checks
2. Monthly checks
3. Backup/export routine
4. Dependency update rules
5. Bug triage method
6. Cost/usage limit checks
7. Security checks
8. Rollback steps

Keep it beginner-friendly and do not overbuild.
```

## Step 29 — Documentation

| Field | Details |
|---|---|
| **What to do** | Document how the project works so future you, AI, and reviewers can understand it. |
| **What AI does 🤖** | Writes README, PROJECT_STATE, setup guide, user guide, test plan, and handoff summary. |
| **What I review 👀** | Check accuracy and remove secrets/private data. Confirm commands and links work. |
| **What I decide 🧠** | Choose which docs are public and which are private. |
| **What needs human approval ✋** | You approve before publishing docs or sharing project files. |
| **Expected output** | Documentation pack: README.md, PROJECT_STATE.md, TEST_PLAN.md, SECURITY_CHECKLIST.md, and user guide if needed. |
| **Tools** | ChatGPT, Markdown, GitHub, Word with Copilot, OneDrive/SharePoint. |
| **Data level** | Level 0 for public docs; Level 1-2 for private docs. Never include real secrets. |
| **Estimated time** | 1-4 hours. |

### Copy-paste prompt

```text
Act as a documentation writer for a beginner-built project.

Project context:
[PASTE]

Files/features:
[PASTE]

Create documentation.

Output:
1. README.md draft
2. PROJECT_STATE.md draft
3. Setup/run instructions
4. Test checklist
5. Security notes
6. Known limitations
7. Next actions
8. What must stay private

Rules:
- Use simple English.
- Do not include real secrets.
- Use placeholder environment variable names only.
```

## Step 30 — Evolution log

| Field | Details |
|---|---|
| **What to do** | Record what changed, why it changed, who/what approved it, and what happened after. |
| **What AI does 🤖** | Summarizes changes into changelog entries and decision records. |
| **What I review 👀** | Check dates, version numbers, reasons, and whether rollback is possible. |
| **What I decide 🧠** | Keep, revert, or continue experimenting. |
| **What needs human approval ✋** | You approve releases, tags, archived decisions, and major roadmap changes. |
| **Expected output** | CHANGELOG.md and DECISIONS.md entries. |
| **Tools** | GitHub, Markdown, ChatGPT, project dashboard, release notes. |
| **Data level** | Level 0-2. Do not include private user details in public changelog. |
| **Estimated time** | 15-45 minutes per change batch. |

### Copy-paste prompt

```text
Act as a changelog and decision-log assistant.

Changes made:
[PASTE]

Reason for changes:
[PASTE]

Test results:
[PASTE]

Create:
1. CHANGELOG.md entry
2. DECISIONS.md entry
3. Version label suggestion
4. Risk/rollback note
5. Next check

Use this format:
Date:
Version:
Changed:
Why:
Result:
Known issues:
Next action:
```

## Step 31 — Scale/pivot/archive decision

| Field | Details |
|---|---|
| **What to do** | Make the hard call: scale, pivot, maintain, pause, or archive. Use evidence, not ego. |
| **What AI does 🤖** | Builds a decision memo using validation, usage, feedback, cost, risk, support burden, and monetization signals. |
| **What I review 👀** | Check if the recommendation is grounded. Look for sunk-cost bias and false optimism. |
| **What I decide 🧠** | Final decision: scale up, pivot, maintain, or archive. |
| **What needs human approval ✋** | You make the final decision. Professional review is needed before commercial/high-risk/legal/tax/security-heavy expansion. |
| **Expected output** | Decision memo and next 7 actions. |
| **Tools** | ChatGPT, Excel/Power BI if useful, project dashboard, source ledger, feedback log, financial/cost tracker. |
| **Data level** | Level 0-2. If Level 3-4 data or regulated/commercial risk appears, use approved systems and professional review. |
| **Estimated time** | 1-2 hours. |

### Copy-paste prompt

```text
Act as a blunt but fair product strategy reviewer.

Project:
[APP NAME]

Evidence:
- User validation: [PASTE]
- Usage/feedback: [PASTE]
- Bugs/support burden: [PASTE]
- Costs/limits: [PASTE]
- Monetization signals: [PASTE]
- Risks: [PASTE]

Create a decision memo.

Output:
1. Recommendation: scale / pivot / maintain / pause / archive
2. Evidence supporting the recommendation
3. Evidence against it
4. Biggest risk
5. What would change the decision
6. Next 7 actions
7. What NOT to do yet

Be direct. Do not flatter the idea.
```

---

# Quick approval checklist ✋

Before moving forward, ask:

- [ ] Am I using the safest data level for this step?
- [ ] Did I remove secrets and private data?
- [ ] Did I personally approve public sharing, user contact, deployment, payment, or automation?
- [ ] Is the next step tied to evidence, not excitement only?
- [ ] Can I undo the change if it breaks?
- [ ] Did I document what changed and why?

---

# Beginner recovery mode

Use this when you feel stuck, confused, or overwhelmed.

```text
I am stuck at Step [NUMBER]: [STEP NAME].

What I expected:
[PASTE]

What happened instead:
[PASTE]

What I already tried:
[PASTE]

Please help me in Beginner Recovery Mode:
1. Explain the simplest likely cause.
2. Give one fix at a time.
3. Tell me exactly what to check after each fix.
4. Do not add new features.
5. Use simple English.
```

---

# UNGASIS Trace

Mode: Execution / Artifact Build  
Rigor: Learner → personal/prototype, with public/beta/revenue guardrails  
Domain: Solopreneur app building, AI-assisted workflow, product operations  
Dimensions: Router, Rigor Dial, Systems, Tools, Templates, Guardrails, Artifacts, Evaluation  
Lenses: Product owner, beginner teacher, AI workflow architect, UX/product designer, QA/security reviewer  
Intelligences: Product, technical, risk, practical, learning, execution, anti-overengineering  
Frameworks: Me-as-MVP, Rigor Dial, Good Prompt Formula, Universal Gold Skeleton, Active/Stub/Blueprint/Deferred, Human Approval Gates  
Engines: Workflow Designer, Product/MVP/UX, App Builder, QA/Security/Deployment, Prompt Architect, Documentation  
Tools/Files: ChatGPT Enterprise, M365 Copilot, VS Code + Cline, GitHub Copilot, GitHub, local files, forms, spreadsheet/project tracker  
Guardrails: No secrets in prompts/frontend/public repos; dummy data first; human approval before public/user/payment/destructive actions; professional review for commercial/high-risk areas  
Template: Step-by-step workflow cards with copy-paste prompts

---

# QA checklist for this module

- [x] Starts with required title format.
- [x] Includes all 31 requested workflow steps.
- [x] Each step includes: What to do, AI role, review, decision, approval, output, prompt, tools, data level, time.
- [x] Uses beginner-friendly English.
- [x] Uses tables, checklists, and copy-paste prompts.
- [x] Includes data level 0-4 guidance.
- [x] Includes human approval gates.
- [x] Avoids real secrets and private data.
- [x] Marks current tool availability/limits as needing verification where relevant.

---

# Source basis

This module was generated from the UNGASIS app-builder workflow requirements and the beginner solopreneur playbook concepts supplied by the user. It intentionally keeps the workflow beginner-friendly, $0-upfront, validation-first, AI-assisted, human-approved, and safe for portfolio/beta/monetization progression.

---

**Version:** v1.0  
**Date:** 2026-06-01  
**Module:** E4 — Me as MVP Workflow  
**Status:** Ready to add to UNGASIS repo
