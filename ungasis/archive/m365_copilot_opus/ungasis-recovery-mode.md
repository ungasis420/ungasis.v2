# UNGASIS Content Module: Beginner Recovery Mode

> **Part of:** UNGASIS OS — Your AI-Powered Personal Operating System
> **Who this is for:** Beginners, non-tech-savvy solopreneurs, ESL speakers
> **Purpose:** When something breaks or you are stuck, this mode helps you fix it step by step — without panic, without overbuilding, and without making things worse

---

## 📖 Table of Contents

1. [What Is Recovery Mode?](#1-what-is-recovery-mode)
2. [Trigger Phrases — When to Activate](#2-trigger-phrases--when-to-activate)
3. [The 10 Recovery Mode Rules](#3-the-10-recovery-mode-rules)
4. [The Diagnostic Structure Template](#4-the-diagnostic-structure-template)
5. [Common Beginner Problems — Quick Fix Guide](#5-common-beginner-problems--quick-fix-guide)
6. ["What to Send Me" Template — Minimum Info for Debugging](#6-what-to-send-me-template--minimum-info-for-debugging)
7. [Copy-Paste Recovery Prompts](#7-copy-paste-recovery-prompts)
8. [Recovery Mode Checklist — Step-by-Step Process](#8-recovery-mode-checklist--step-by-step-process)
9. [Do NOT Do This When Stuck](#9-do-not-do-this-when-stuck)
10. [When to Stop and Ask for Human Help](#10-when-to-stop-and-ask-for-human-help)
11. [Recovery Mode Exit — How to Know You Are Fixed](#11-recovery-mode-exit--how-to-know-you-are-fixed)

---

## 1. What Is Recovery Mode?

### 🍳 The Kitchen Analogy: Stop Cooking, Find the Flame

Imagine you are cooking dinner. Suddenly, smoke comes from the pan. What do you do?

❌ **Wrong:** Keep adding ingredients and hope the smoke goes away.
❌ **Wrong:** Start cooking a different dish at the same time.
❌ **Wrong:** Turn up the heat to "cook faster."

✅ **Right:**
1. **Stop cooking** — put down the spoon
2. **Find where the smoke is coming from** — is it the oil? burnt food? wrong burner?
3. **Fix that one thing** — remove the pan, lower the heat, scrape the burnt part
4. **Check if the smoke stopped**
5. **Only then continue cooking**

**Recovery Mode works exactly the same way.**

When your app breaks, your code has errors, or you are stuck — do NOT keep building. Stop. Find the one broken thing. Fix it. Check if it worked. Then move on.

### 💡 What Recovery Mode IS

| Recovery Mode IS | Recovery Mode IS NOT |
|-----------------|---------------------|
| A calm, step-by-step process to fix one problem | A reason to panic |
| Focused on the SIMPLEST cause first | Guessing random things to try |
| One fix at a time | Changing 10 things at once |
| Checking after each fix | Hoping it magically works |
| Using copy-paste commands | Rewriting everything from scratch |
| Asking for minimum info | Pasting your entire codebase |
| Pausing new features until fixed | Adding more features to "fix" the problem |

---

## 2. Trigger Phrases — When to Activate

When you feel ANY of these, you are in Recovery Mode territory. Use these exact phrases when talking to AI and it should switch to careful, step-by-step help.

| # | 🗣️ Trigger Phrase | 🧠 What It Signals | 🎯 What AI Should Do |
|---|-------------------|-------------------|--------------------|
| 1 | **"I am stuck"** | You do not know what to do next | AI should ask what you were trying to do, then give one clear next step |
| 2 | **"It is blank"** | Screen is empty, nothing shows up | AI should ask: browser or terminal? Then diagnose rendering/loading issues |
| 3 | **"It did not work"** | You tried something and it failed | AI should ask: what did you try? What happened instead? Any error message? |
| 4 | **"I cannot follow"** | The instructions are too complex or confusing | AI should simplify, use shorter steps, add examples, use simpler English |
| 5 | **"I got an error"** | There is an error message on screen | AI should ask you to paste the EXACT error message — then explain and fix |
| 6 | **"I am confused"** | You do not understand what is happening or why | AI should explain the concept using an analogy, then restate the steps simply |
| 7 | **"Try again smaller"** | The AI gave too much at once, or the change was too big | AI should break the task into the smallest possible sub-steps |

### 🍳 Cooking Translation

| Phrase | Kitchen Equivalent |
|--------|--------------------|
| "I am stuck" | "I do not know what to cook next" |
| "It is blank" | "I turned on the stove but nothing is happening" |
| "It did not work" | "I followed the recipe but it tastes wrong" |
| "I cannot follow" | "This recipe has too many steps and I am lost" |
| "I got an error" | "The smoke alarm went off" |
| "I am confused" | "I do not understand what 'blanch' means" |
| "Try again smaller" | "Just tell me ONE step — what do I do with this egg?" |

---

## 3. The 10 Recovery Mode Rules

When you are in Recovery Mode, follow ALL of these rules. Paste them to AI if needed.

| # | Rule | Why | Analogy |
|---|------|-----|---------|
| 1 | **🛑 Stop adding features** | New features on top of broken code = more broken code | Do not add toppings to a burnt pizza |
| 2 | **🔍 Diagnose the SIMPLEST cause first** | 80% of bugs are simple mistakes: typos, missing files, wrong paths | Check if the stove is turned on before calling the gas company |
| 3 | **❓ Ask for only the MINIMUM info needed** | AI should ask 1–3 questions, not 10 | A doctor asks "where does it hurt?" not "describe your entire medical history" |
| 4 | **1️⃣ One fix at a time** | If you change 5 things, you will not know which one fixed it (or broke it more) | Change one ingredient, taste, then decide |
| 5 | **📋 Copy-paste commands** | Typing commands from memory causes typos and errors | Use the exact recipe, do not improvise when you are already in trouble |
| 6 | **🗣️ Explain simply** | AI should use simple English — no jargon without a definition | A good teacher says "the save button" not "the persistence layer endpoint" |
| 7 | **✅ Check step after EACH fix** | Confirm the fix worked before moving to the next one | Taste after each adjustment, do not wait until the dish is served |
| 8 | **⏸️ Do NOT continue until the issue is resolved** | Building on broken code creates deeper problems | Do not build the second floor when the first floor has cracks |
| 9 | **📝 Write down what happened** | So you can avoid it next time and explain it to others | Keep a cooking journal: "last time I burned the garlic because the heat was too high" |
| 10 | **🆘 Escalate if 3 fixes did not work** | If Fix 1, Fix 2, and Fix 3 all failed, the problem might be deeper | If the third recipe attempt fails, call someone who cooks that dish well |

---

## 4. The Diagnostic Structure Template

**Copy-paste this template into AI when you need structured help.** Fill in the `[brackets]` with your info.

```
## 🆘 Recovery Mode Request

**What I was trying to do:**
[describe in simple words — e.g., "I was trying to add a login page"]

**What happened instead:**
[describe what you see — e.g., "the page is blank" or "I see a red error"]

**Exact error message (if any):**
[paste the EXACT message from browser console or terminal]

**What I changed recently:**
[list the last 1–3 things you changed before it broke]

**My tools:**
[e.g., VS Code, Next.js, Supabase, Cloudflare]

Please use Recovery Mode:
1. Tell me WHAT likely happened (simple explanation)
2. Tell me WHY it happened (root cause)
3. Give me Fix Step 1 (copy-paste commands or exact changes)
4. Tell me HOW TO CHECK if it worked
5. If still broken, give me Fix Step 2
6. If STILL broken, tell me WHAT INFORMATION TO SEND YOU
```

### 🧩 AI Should Respond Using This Structure

```
## 🔧 Recovery Diagnosis

### What likely happened:
[Simple explanation — one or two sentences max]

### Why it happened:
[Root cause in plain English — like explaining to a friend]

### Fix Step 1 (try this first):
[Exact file to open]
[Exact line to change or command to run]
[Copy-paste ready]

### How to check:
[What to do after the fix to see if it worked]
[What you should see if it IS fixed]
[What you should see if it is NOT fixed]

### If still broken → Fix Step 2:
[Next most likely cause]
[Exact fix]
[How to check]

### If STILL broken → Send me this:
- Screenshot of the error
- Contents of [specific file]
- Output of [specific command]
- Browser console errors (right-click → Inspect → Console tab)
```

---

## 5. Common Beginner Problems — Quick Fix Guide

These are the problems beginners hit the MOST. Find yours and try the fix.

### 🖥️ Problem 1: Blank Page — Nothing Shows Up

| | Details |
|---|--------|
| **Symptoms** | Browser shows white/blank page. No errors visible. |
| **Likely cause** | ① App is not running ② Wrong URL ③ JavaScript error hiding content ④ Component is not rendering |
| **First fix** | Check your terminal — is the dev server running? Look for `ready` or `localhost:3000`. If not running, type: `npm run dev` |
| **How to check** | Open browser → go to `http://localhost:3000` → right-click → Inspect → Console tab → look for red errors |

### 🔴 Problem 2: Error in Terminal — Red Text

| | Details |
|---|--------|
| **Symptoms** | Red or yellow text in your terminal/command line after running a command |
| **Likely cause** | ① Missing package ② Syntax error in code ③ Wrong Node.js version ④ Missing environment variable |
| **First fix** | Read the LAST line of the error — it usually tells you what is wrong. Look for words like `Cannot find`, `SyntaxError`, `is not defined` |
| **How to check** | Fix what the error says → run the command again → if no red text, it worked |

### ❌ Problem 3: "npm: command not found"

| | Details |
|---|--------|
| **Symptoms** | Terminal says `npm` is not recognized or not found |
| **Likely cause** | Node.js is not installed, or it is not in your system PATH |
| **First fix** | Download and install Node.js from https://nodejs.org (LTS version). Restart your terminal after install. |
| **How to check** | Type: `node --version` and `npm --version` — you should see version numbers like `v20.x.x` |

### 📦 Problem 4: "Module not found" or "Cannot find module"

| | Details |
|---|--------|
| **Symptoms** | Error says `Cannot find module 'xxx'` or `Module not found` |
| **Likely cause** | ① Package not installed ② Wrong import path ③ Typo in file name |
| **First fix** | Run: `npm install [package-name]` — replace `[package-name]` with the module name from the error |
| **How to check** | Run `npm run dev` again. If the error is gone, it worked. If it says a different module, install that one too. |

### 👻 Problem 5: App Runs But Nothing Shows on Screen

| | Details |
|---|--------|
| **Symptoms** | Terminal says the app is running. Browser shows blank or white. |
| **Likely cause** | ① Component returns `null` or empty ② CSS is hiding content ③ Conditional rendering is missing data ④ Wrong route/URL |
| **First fix** | Open your main page file (e.g., `app/page.tsx` or `pages/index.tsx`). Add a simple test: `return <h1>Hello</h1>` temporarily. |
| **How to check** | Refresh the browser. If you see "Hello", the issue is in your component content — not in the setup. |

### 🔘 Problem 6: Button Does Nothing When Clicked

| | Details |
|---|--------|
| **Symptoms** | You click a button and nothing happens. No error either. |
| **Likely cause** | ① No `onClick` handler ② Function has a typo ③ Function runs but has no visible effect ④ State not updating |
| **First fix** | Add `console.log("button clicked")` inside your onClick handler. Open browser → Inspect → Console → click button. |
| **How to check** | If "button clicked" appears in console → the button works, the problem is in the function logic. If nothing appears → the onClick is not connected. |

### 🗄️ Problem 7: Database Not Connecting (Supabase)

| | Details |
|---|--------|
| **Symptoms** | Data does not load. Errors about `supabase` or `fetch` or `CORS`. |
| **Likely cause** | ① `.env.local` file is missing or has wrong values ② Supabase project is paused (7-day inactivity) ③ RLS policy blocking access ④ Wrong table/column name |
| **First fix** | Check `.env.local` — make sure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct. Go to Supabase dashboard → check if your project is paused. |
| **How to check** | Go to Supabase dashboard → Table Editor → can you see your data? If yes, the database is fine — the problem is in your code connection. |

### 🔐 Problem 8: Login Not Working

| | Details |
|---|--------|
| **Symptoms** | Signup or login button does nothing, or shows an error about authentication. |
| **Likely cause** | ① Auth not enabled in Supabase ② Wrong redirect URL configured ③ Email confirmations blocking login ④ Code uses wrong Supabase auth function |
| **First fix** | Supabase Dashboard → Authentication → Providers → check Email is enabled. Then check URL Configuration → make sure `http://localhost:3000` is in the allowed redirect URLs. |
| **How to check** | Try signing up with a test email. Check Supabase Dashboard → Authentication → Users → does the user appear? |

### 🚀 Problem 9: Deployment Failed (Cloudflare/Netlify)

| | Details |
|---|--------|
| **Symptoms** | Build fails when deploying. Error messages in the deploy log. |
| **Likely cause** | ① Build command is wrong ② Environment variables not set in hosting ③ Code works locally but fails in production ④ Node.js version mismatch |
| **First fix** | Read the deploy log (Cloudflare → Pages → your project → Deployments → click the failed one). Look for the FIRST red error. |
| **How to check** | Fix the error → push to GitHub → the deploy will auto-restart. Check the deploy log again. |

### 🔀 Problem 10: Git Push Rejected

| | Details |
|---|--------|
| **Symptoms** | `git push` says `rejected` or `failed to push` |
| **Likely cause** | ① Remote has changes you do not have locally ② Branch protection rules ③ Wrong remote URL |
| **First fix** | Run: `git pull origin main --rebase` then try `git push` again |
| **How to check** | If push succeeds with no errors, it worked. Check GitHub → your repo → you should see your latest commit. |

### 🔑 Problem 11: Environment Variable Not Loading

| | Details |
|---|--------|
| **Symptoms** | App runs but values like API keys come back as `undefined` |
| **Likely cause** | ① `.env.local` file is in the wrong folder ② Variable name does not start with `NEXT_PUBLIC_` (for client-side) ③ Dev server was not restarted after changing `.env.local` |
| **First fix** | Make sure `.env.local` is in the ROOT of your project (same level as `package.json`). Make sure the variable starts with `NEXT_PUBLIC_` if used in the browser. **Restart the dev server** (Ctrl+C then `npm run dev`). |
| **How to check** | Add `console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)` in your code. It should show your URL, not `undefined`. |

### 🤖 Problem 12: AI Overwrote Too Much / Broke Working Code

| | Details |
|---|--------|
| **Symptoms** | You asked AI (Cline, Copilot, ChatGPT) to make a small change, but it rewrote the entire file and now things are broken |
| **Likely cause** | AI agents sometimes rewrite full files instead of making targeted edits. They may remove working code, rename variables, or change imports. |
| **First fix** | **Do NOT panic.** If you committed before the change: `git diff` (see what changed), then `git checkout -- [filename]` to restore the file. If you did not commit: check if your editor has Undo history (Ctrl+Z many times) or File → Timeline in VS Code. |
| **How to check** | After restoring the file, run `npm run dev` and test your main flow. If it works again, you are back to safe ground. |

### ⚡ Problem 13: App Is Very Slow

| | Details |
|---|--------|
| **Symptoms** | Pages take a long time to load. Clicking things feels laggy. |
| **Likely cause** | ① Loading too much data at once ② Images not optimized ③ Too many re-renders (React) ④ No pagination for large lists |
| **First fix** | Open browser → Inspect → Network tab → reload page → look for large requests (anything over 1MB). Also check Console for warnings. |
| **How to check** | Fix the largest/slowest request first. Reload and see if the page feels faster. |

### 🔄 Problem 14: Infinite Loop / Page Keeps Refreshing

| | Details |
|---|--------|
| **Symptoms** | Page keeps reloading, or browser tab becomes unresponsive. Terminal might show repeated logs. |
| **Likely cause** | ① `useEffect` without proper dependencies ② State update that triggers re-render which triggers another state update ③ Redirect loop |
| **First fix** | Check your `useEffect` hooks — make sure the dependency array `[]` is correct. If your effect calls a state setter, make sure it does not trigger the same effect again. |
| **How to check** | Add `console.log("render")` at the top of your component. If it logs hundreds of times per second, you have an infinite loop. |

---

## 6. "What to Send Me" Template — Minimum Info for Debugging

When asking AI (or a human) for help, give them this info. **Not more. Not less.**

```
## 🆘 Help Request — Minimum Info

**1. What I was trying to do (one sentence):**
[e.g., "Add a save button that writes to Supabase"]

**2. What happened instead (one sentence):**
[e.g., "Clicking the button does nothing — no error, no response"]

**3. Exact error message (copy-paste):**
[paste the red text from terminal OR browser console]
[if no error: write "No error message visible"]

**4. Last thing I changed before it broke:**
[e.g., "I edited app/dashboard/page.tsx and added an onClick handler"]

**5. My stack:**
[e.g., Next.js 14, Tailwind, Supabase, Cloudflare Pages]

**6. What I already tried:**
[e.g., "Restarted dev server, checked console, no errors"]
```

### 🍳 Why This Template Works

| Info Piece | Why AI Needs It | Kitchen Analogy |
|-----------|----------------|-----------------|
| What you were trying to do | So AI knows your goal | "I was trying to fry an egg" |
| What happened instead | So AI knows what went wrong | "The egg stuck to the pan" |
| Exact error message | The most important debugging clue | "The smoke alarm number/code" |
| Last change before it broke | Narrows down where the bug is | "I just switched to a different pan" |
| Your stack | So AI gives the right syntax | "I am using a gas stove, not electric" |
| What you already tried | So AI does not repeat your attempts | "I already added oil and lowered the heat" |

### 🚫 What NOT to Send

| ❌ Do NOT send | Why |
|---------------|-----|
| Your entire codebase | AI gets confused with too much code — send only the relevant file/section |
| API keys or passwords | Never paste secrets — replace them with `[YOUR_KEY_HERE]` |
| Screenshots of code | Text is easier for AI to read — copy-paste code as text |
| "It does not work" with no details | AI needs specifics to help — use the template above |
| Multiple problems at once | Fix one thing at a time — send one request per problem |

---

## 7. Copy-Paste Recovery Prompts

Use these prompts when you are stuck. Replace everything in `[brackets]` with your info.

### 🆘 Prompt 1: "I Am Stuck — General"
```
I am stuck and need help. Please use Recovery Mode.

What I was trying to do: [describe your goal in one sentence]
What happened: [describe what went wrong]
My tools: [e.g., Next.js, Supabase, VS Code]
My skill level: beginner

Please:
1. Tell me what likely went wrong (simple explanation)
2. Give me ONE fix to try (copy-paste command or exact code change)
3. Tell me how to check if it worked
4. If it did not work, give me the next fix
5. Use simple English — I am not a native English speaker
```

### 🔴 Prompt 2: "I Got an Error"
```
I got an error and I do not understand it. Please use Recovery Mode.

The exact error message is:
[paste the EXACT error text here]

This happened when I tried to: [what you were doing]
The file I was editing: [file name and path]
My tools: [e.g., Next.js, Supabase, VS Code]

Please:
1. Explain this error like I am 12 years old
2. Tell me the most likely cause
3. Give me the exact fix (which file, which line, what to change)
4. Tell me how to check if it is fixed
5. Tell me how to prevent this error in the future
```

### 📄 Prompt 3: "It Is Blank — Nothing Shows"
```
My app shows a blank/white page. Please use Recovery Mode.

My app uses: [e.g., Next.js, React, Tailwind]
Is the dev server running? [yes/no — check your terminal]
Do I see any errors in the terminal? [yes — paste them / no]
Did I change any files recently? [list files you changed]

Please:
1. Walk me through checking the 5 most common causes of a blank page
2. Give me one test at a time
3. Wait for my result before suggesting the next test
4. Use simple English
```

### 🤖 Prompt 4: "AI Broke My Code"
```
I asked AI (Cline/Copilot/ChatGPT) to make a small change, but it 
rewrote too much and now my app is broken. Please use Recovery Mode.

What I asked AI to do: [describe the task you gave]
What AI did instead: [e.g., "It rewrote the entire file"]
What is broken now: [describe what stopped working]

Did I commit to Git before the change?
[yes — I can restore / no — I need to find another way]

Please:
1. Help me restore my working version
2. Then help me make the SMALL change I originally wanted
3. Show me the safest way to ask AI for small changes in the future
4. Give me a rule I can follow to prevent this
```

### 🛑 Prompt 5: "I Tried 3 Fixes and Nothing Works"
```
I have been stuck on this problem and tried 3 fixes already. 
None of them worked. Please use Recovery Mode — escalation level.

The problem: [describe it]
Fix 1 I tried: [what you did] → Result: [what happened]
Fix 2 I tried: [what you did] → Result: [what happened]
Fix 3 I tried: [what you did] → Result: [what happened]

My tools: [stack]
My file: [the main file involved]

Please:
1. Look at this from a completely different angle
2. What did I possibly miss?
3. Should I roll back to a working version and start the change over?
4. Is this a problem I should ask a human developer about?
5. Give me the exact information I should share if I ask for human help
```

---

## 8. Recovery Mode Checklist — Step-by-Step Process

Follow this checklist IN ORDER every time something breaks.

### Phase 1: Stop and Breathe 🛑

- [ ] **Stop making changes.** Do not add more code or try random things.
- [ ] **Save your current state.** If you have unsaved files, save them. If you can commit to Git, do it: `git add . && git commit -m "broken state — before recovery"`
- [ ] **Read the error.** Read the exact error message carefully. If there is no error, describe what you see (blank page, wrong data, etc.)

### Phase 2: Diagnose 🔍

- [ ] **Check the terminal.** Is the dev server running? Any red/yellow text?
- [ ] **Check the browser console.** Right-click → Inspect → Console tab. Any red errors?
- [ ] **Check what you changed last.** What was the last thing you edited before it broke?
- [ ] **Check the simplest cause first.** See the Common Problems table above.

### Phase 3: Fix (One at a Time) 🔧

- [ ] **Apply Fix 1.** Make the smallest possible change.
- [ ] **Check if it worked.** Run the app, test the specific thing that was broken.
- [ ] **If fixed → document it.** Write in CHANGELOG.md or your notes: "Bug: [what broke]. Fix: [what I did]."
- [ ] **If NOT fixed → try Fix 2.** One more small change.
- [ ] **Check again.** Test the same thing.
- [ ] **If still NOT fixed → try Fix 3.** Last attempt before escalating.

### Phase 4: Escalate If Needed 🆘

- [ ] **If 3 fixes failed → roll back.** Use `git checkout -- [filename]` or restore from your last commit.
- [ ] **Use the "What to Send Me" template** to ask for help.
- [ ] **Ask another AI** (ChatGPT, Copilot, Claude) — different AIs sometimes catch different problems.
- [ ] **Consider asking a human** — see Section 10 below.

### Phase 5: Exit Recovery Mode ✅

- [ ] **The specific broken thing now works.**
- [ ] **No new errors were introduced.**
- [ ] **Commit the working fix:** `git add . && git commit -m "fix: [describe what you fixed]"`
- [ ] **Write down what happened** so you can avoid it next time.
- [ ] **Return to your regular workflow.**

---

## 9. Do NOT Do This When Stuck

These are the most common mistakes beginners make when something breaks. **Avoid all of them.**

| # | ❌ Do NOT | Why It Makes Things Worse | ✅ Do This Instead |
|---|----------|--------------------------|-------------------|
| 1 | Add more features to "work around" the bug | You are building on a broken foundation — it will collapse later | Fix the bug FIRST, then continue building |
| 2 | Change 5 things at once | You will not know which change fixed it (or broke it more) | Change ONE thing, check, then change the next |
| 3 | Rewrite the entire file | You lose working code and introduce new bugs | Make the smallest targeted change possible |
| 4 | Ask AI to "fix everything" | AI will rewrite everything and probably break more things | Ask AI to fix ONE specific problem |
| 5 | Ignore the error message | The error message IS the clue — it tells you exactly what is wrong | Read the last line of the error first — then Google that exact text |
| 6 | Copy code from a random blog/tutorial | Different versions, different setups — it may not fit your project | Use official docs for your exact tool version |
| 7 | Delete files you do not understand | You might delete something important | Ask AI "what does this file do?" before deleting anything |
| 8 | Skip the "check" step | You THINK it is fixed but it is not — and now you build more on broken code | Always test after every fix |
| 9 | Keep going when frustrated | Frustration leads to bad decisions — you will make more mistakes | Take a 5-minute break, drink water, then try again |
| 10 | Paste API keys into AI chat for debugging | Security risk — your keys could be exposed | Replace keys with `[YOUR_KEY_HERE]` before pasting code |

### 🍳 The Kitchen Version

| ❌ Do NOT | 🍳 Kitchen Version |
|-----------|-------------------|
| Add more features on a bug | Do not add toppings to a burnt pizza |
| Change 5 things at once | Do not add salt, sugar, pepper, AND chili all at once |
| Rewrite the entire file | Do not throw away the whole dish — just remove the burnt part |
| Ask AI to "fix everything" | Do not tell the chef "make everything better" — say "the rice is too salty" |
| Ignore the error message | Do not ignore the smoke — it is telling you WHERE the fire is |

---

## 10. When to Stop and Ask for Human Help

AI is powerful, but it has limits. Here is when to ask a human for help.

### 🚨 Ask a Human When:

| # | Situation | Why AI Cannot Help |
|---|-----------|-------------------|
| 1 | **Same error after 3+ AI-assisted fix attempts** | AI might be stuck in a loop of wrong suggestions |
| 2 | **Security or credential problems** | Do NOT paste secrets into AI — ask a trusted developer |
| 3 | **Production is broken and users are affected** | You need fast, verified help — not AI guesses |
| 4 | **Legal, tax, or financial questions** | AI is not a lawyer or accountant |
| 5 | **You do not understand the explanation** even after AI simplified it | A human can show you on a screen call |
| 6 | **Third-party service is down** (Supabase, Cloudflare, etc.) | Check their status page — this is not your code's fault |
| 7 | **AI keeps contradicting itself** | AI is confused — a fresh human perspective will help |

### 📨 Where to Ask for Human Help (Free)

| Source | Best For | How |
|--------|---------|-----|
| **Stack Overflow** | Specific code errors | Search first, then post with error + code |
| **Reddit** (r/webdev, r/nextjs, r/supabase) | General questions | Post with clear description |
| **Discord communities** | Quick answers | Join the tool's Discord (Supabase, Next.js, etc.) |
| **GitHub Issues** | Bugs in a specific tool/library | Search existing issues first, then create one |
| **A developer friend** | Personalized help | Screen share and show the problem |

### 📋 What to Send a Human

Use this template when asking a human for help:

```
Hi! I'm a beginner building a web app and I'm stuck.

**My stack:** [e.g., Next.js 14, Tailwind, Supabase]
**The problem:** [one sentence — what is broken]
**Error message:** [paste exact error]
**What I tried:** 
1. [Fix 1 — did not work]
2. [Fix 2 — did not work]  
3. [Fix 3 — did not work]

**My code (relevant section only):**
[paste the specific file or function — NOT your entire codebase]

I would really appreciate any help. Thank you!
```

---

## 11. Recovery Mode Exit — How to Know You Are Fixed

You can leave Recovery Mode when ALL of these are true:

- [ ] ✅ The specific thing that was broken **now works**
- [ ] ✅ You tested the **main flow** of your app (not just the fixed area)
- [ ] ✅ There are **no new red errors** in the terminal or browser console
- [ ] ✅ You **committed the fix** to Git: `git add . && git commit -m "fix: [describe fix]"`
- [ ] ✅ You **wrote down** what happened (in CHANGELOG.md, DECISIONS.md, or your notes)
- [ ] ✅ You understand **why** it broke (so you can avoid it next time)

### 🎉 Congratulations Prompt

When you exit Recovery Mode, paste this into your next AI message:

```
Recovery complete. The issue was: [describe].
The fix was: [describe].
I am ready to continue building.
My next task is: [describe your next task].
```

This tells AI to switch back to normal building mode.

---

> **Sources for this module:**
> - Master Workflow Prompt v4.0 — §26.5 (Beginner Recovery Mode), §0.5 (Response Behavior), §20 (AI Quality Control)
> - Unified Playbook v3 — Prompt 5 (Debugging), SOP 2 (Review AI Code), §17 (Git and Rollback), §18 (AI Coding Safety Rules)
> - General best practices for beginner debugging and error recovery

---

*UNGASIS Content Module: Beginner Recovery Mode*
*Version: 1.0*
*Date: 2026-05-31*
*Author: Mel John Dimat (via UNGASIS OS)*
*Status: Complete*
