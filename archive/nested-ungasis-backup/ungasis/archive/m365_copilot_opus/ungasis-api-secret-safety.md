# UNGASIS Content Module: API Key & Secret Safety

> 🔐 Module ID: R5  
> 📂 File: `ungasis-api-secret-safety.md`  
> 🔗 Sources: Master Prompt §23 (Safe API / Key Policy) + Playbook §19 (API Key and Secret Policy) + Playbook SOP 5 (Emergency Key Exposure)  
> 🎯 Audience: Beginner / not tech-savvy / ESL / $0 budget  

---

## 📖 Table of Contents

1. [Why This Matters — The Unlocked Safe Analogy](#1--why-this-matters--the-unlocked-safe-analogy)
2. [The "Never Do This" List](#2--the-never-do-this-list)
3. [How to Store Keys Safely — The Safer Pattern](#3--how-to-store-keys-safely--the-safer-pattern)
4. [Supabase Key Rules](#4--supabase-key-rules)
5. [.gitignore Template](#5--gitignore-template)
6. [Env Variables vs .env Files vs Secret Managers](#6--env-variables-vs-env-files-vs-secret-managers)
7. [When to Avoid APIs Entirely](#7--when-to-avoid-apis-entirely)
8. [How to Reduce API Usage Legally](#8--how-to-reduce-api-usage-legally)
9. [Demo Mode vs Real API Mode](#9--demo-mode-vs-real-api-mode)
10. [Mock API Responses](#10--mock-api-responses)
11. [Key Rotation & Hygiene](#11--key-rotation--hygiene)
12. [What to Do If a Key Is Exposed — Emergency SOP](#12--what-to-do-if-a-key-is-exposed--emergency-sop)
13. [What NEVER to Paste into AI Chats](#13--what-never-to-paste-into-ai-chats)
14. [Complete Secret Safety Checklist](#14--complete-secret-safety-checklist)

---

## 1. 🔓 Why This Matters — The Unlocked Safe Analogy

### The Analogy

> **API keys are like the keys to your house.** If you leave them under the doormat (in your code), anyone can walk in.

An API key gives you access to a service — a database, a payment processor, an AI model. If someone else gets your key, they can:

- **Use your API on your account** → you get a surprise bill (sometimes hundreds or thousands of dollars)
- **Access your users' data** → privacy breach, legal trouble, loss of trust
- **Get your account banned** → the service provider sees unusual activity and locks you out
- **Modify or delete your data** → your database gets wiped

### This Is the #1 Beginner Mistake

```text
❌ "I'll just paste my API key directly in my React code — it's faster."
❌ "I'll commit .env.local to GitHub — nobody looks at my repo anyway."
❌ "I'll paste the key into ChatGPT to get help debugging."

ALL THREE are dangerous. ALL THREE happen to beginners every day.
```

### Real Consequences

| What You Did | What Happens |
|---|---|
| Put key in React component | Anyone can view-source your page and steal the key |
| Committed .env.local to GitHub | Bots scan GitHub 24/7 for exposed keys. They find yours in minutes |
| Pasted key into AI chat | The key may appear in training data or logs |
| Did not enable RLS on Supabase | Anyone with your anon key can read ALL data in your database |
| Used service_role key in frontend | Full admin access to your database from any visitor's browser |

---

## 2. 🚫 The "Never Do This" List

These are the **specific things you must NEVER do** with API keys and secrets:

### Never #1: Put API Key Inside a React/Frontend Component

```text
❌ DANGEROUS:  const apiKey = "sk-abc123..."
```

**Why it's dangerous:** Frontend code is sent to every user's browser. Anyone can open Developer Tools (F12) → Sources tab → find your key in plain text.

**What happens:** Your key is stolen. Bots or malicious users use it. You get billed.

**Fix:** Use environment variables. Only server-side code should access private keys.

---

### Never #2: Paste API Key into ChatGPT / Claude / Any AI Chat

```text
❌ DANGEROUS:  "Here's my code: const key = 'sk-abc123...'"
```

**Why it's dangerous:** AI conversations may be logged, reviewed by humans, or used for training. Your key could be exposed.

**What happens:** Someone sees your key in training data or logs. They use your API.

**Fix:** Replace real keys with `[YOUR_API_KEY_HERE]` or `sk-REDACTED` before pasting code into any AI tool.

---

### Never #3: Commit .env.local to GitHub

```text
❌ DANGEROUS:  git add .env.local && git commit
```

**Why it's dangerous:** GitHub repos (even private ones) can be shared, forked, or exposed. Automated bots scan public repos for exposed secrets within seconds.

**What happens:** Your keys are found within minutes. Services like AWS, Stripe, and Supabase have automated scanners that may notify you — but the damage may already be done.

**Fix:** Add `.env.local` to `.gitignore` BEFORE your first commit. Use `.env.example` with fake placeholder names.

---

### Never #4: Screenshot a Dashboard Showing Keys

```text
❌ DANGEROUS:  Taking a screenshot of your Supabase/Stripe dashboard with keys visible
```

**Why it's dangerous:** Screenshots get shared in chat, posted to forums, uploaded to cloud storage. Keys are visible in plain text.

**What happens:** Anyone who sees the screenshot has your keys.

**Fix:** Blur or redact keys in screenshots. Better: don't screenshot dashboards with visible keys at all.

---

### Never #5: Store service_role Key in NEXT_PUBLIC_ Variable

```text
❌ DANGEROUS:  NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=...
```

**Why it's dangerous:** In Next.js, any variable starting with `NEXT_PUBLIC_` is bundled into frontend JavaScript. This means the `service_role` key — which gives FULL ADMIN ACCESS to your Supabase database — is visible to every visitor.

**What happens:** Anyone can read, write, and delete ALL data in your database. RLS is bypassed completely.

**Fix:** Never start a private key variable with `NEXT_PUBLIC_`. The service_role key goes in server-side env vars ONLY (never in frontend code).

---

### Quick Reference Card

```text
🚫 NEVER put keys in frontend code
🚫 NEVER paste keys into AI chats
🚫 NEVER commit .env.local to Git
🚫 NEVER screenshot dashboards with visible keys
🚫 NEVER use NEXT_PUBLIC_ for private keys
```

---

## 3. 🔒 How to Store Keys Safely — The Safer Pattern

### The Architecture

```text
YOUR MACHINE                    GITHUB                      HOSTING (Cloudflare/Netlify)
─────────────                   ──────                      ────────────────────────────
.env.local                      .env.example                Environment Variables
(REAL secrets)                  (FAKE placeholders)         (REAL secrets, set in dashboard)
  │                               │                           │
  ▼                               ▼                           ▼
Server-side code                Public repo                 Production server
reads secrets                   shows structure             reads secrets
  │                               │                           │
  ▼                               ▼                           ▼
API calls made                  Developers know             App works in
FROM the server                 which vars are needed       production safely
  │
  ▼
Frontend NEVER                  .gitignore blocks
sees private keys               .env.local from
                                being committed
```

### Step-by-Step Setup

| Step | What to Do | File | Command/Action |
|---|---|---|---|
| 1 | Create `.env.local` in your project root | `.env.local` | `touch .env.local` |
| 2 | Add your real secrets to `.env.local` | `.env.local` | `SUPABASE_SERVICE_ROLE_KEY=your_real_key` |
| 3 | Create `.env.example` with FAKE names | `.env.example` | `SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here` |
| 4 | Add `.env.local` to `.gitignore` | `.gitignore` | Add line: `.env.local` |
| 5 | Commit `.env.example` to GitHub | Terminal | `git add .env.example && git commit` |
| 6 | In hosting dashboard, add each secret as an environment variable | Cloudflare/Netlify dashboard | Settings → Environment Variables → Add |

### The Two-File Pattern

| File | Contains | In GitHub? | Contains Real Keys? |
|---|---|---|---|
| `.env.local` | Real secret values | ❌ NEVER | ✅ Yes — only on your machine |
| `.env.example` | Fake placeholder names | ✅ Yes | ❌ Never |

### Example

**.env.local** (NEVER committed):
```text
NEXT_PUBLIC_SUPABASE_URL=https://abc123.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...real_anon_key
SUPABASE_SERVICE_ROLE_KEY=eyJ...real_service_role_key
```

**.env.example** (committed to GitHub):
```text
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

---

## 4. 🔑 Supabase Key Rules

Supabase gives you TWO keys. They are NOT equal:

| Key | Name | Safe for Frontend? | What It Can Do | RLS Applies? |
|---|---|---|---|---|
| `anon` key | Anonymous key | ✅ Yes (ONLY if RLS is enabled) | Can only access data that RLS policies allow | ✅ Yes — RLS controls what this key can see/do |
| `service_role` key | Service role key | ❌ NEVER | Full admin access — bypasses ALL RLS policies | ❌ No — it bypasses RLS completely |

### The Rules

```text
✅ anon key + NEXT_PUBLIC_ prefix = OK (but ONLY with RLS enabled!)
❌ anon key + NO RLS = DANGEROUS (anyone can read your entire database)
❌ service_role key + NEXT_PUBLIC_ prefix = CATASTROPHIC
❌ service_role key + frontend code = CATASTROPHIC
✅ service_role key + server-side only (.env.local, API routes) = SAFE
```

### What Is RLS (Row Level Security)?

RLS is a Supabase feature that controls **which rows** each user can see. Without RLS:

- The `anon` key gives access to **everything** in your tables
- Anyone with the key can read, write, and delete all data

With RLS enabled + proper policies:

- Each user can only see their own data
- The `anon` key is safely limited by the policies you define

> **Rule:** If your Supabase tables have ANY user data, enable RLS. No exceptions. Even for prototypes.

### How to Enable RLS

1. Go to Supabase dashboard → Table Editor
2. Click each table → RLS tab
3. Enable RLS
4. Add at least one policy (e.g., "Users can only read their own rows")

---

## 5. 📄 .gitignore Template

Use this `.gitignore` for every Next.js + Supabase project:

```text
# Dependencies
node_modules/

# Environment variables (NEVER commit real secrets)
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Next.js build output
.next/
out/

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/settings.json
.idea/

# Supabase local config (if using Supabase CLI)
supabase/.temp/

# Coverage reports
coverage/
```

### Line-by-Line Explanation

| Line | Why It's Ignored |
|---|---|
| `node_modules/` | Dependencies are too large for Git. Install from `package.json` instead |
| `.env.local` | Contains your REAL secrets. Never commit |
| `.env` | Some tools use this instead of `.env.local`. Ignore both |
| `.next/` | Build artifacts. Regenerated on every build |
| `out/` | Static export output. Regenerated |
| `npm-debug.log*` | Debug logs can contain sensitive info |
| `.DS_Store` | macOS system file. Not needed in repo |
| `Thumbs.db` | Windows thumbnail cache. Not needed |
| `.vscode/settings.json` | May contain personal settings or paths |
| `coverage/` | Test coverage reports. Generated, not committed |

---

## 6. 📊 Env Variables vs .env Files vs Secret Managers

| Method | What It Is | When to Use | Security Level | Beginner Difficulty |
|---|---|---|---|---|
| **Hardcoded in code** | Key directly in your source code | ❌ NEVER | ⛔ None — exposed to everyone | N/A — never do this |
| **.env.local file** | Local file with key=value pairs | ✅ Local development | 🟡 Medium — safe if .gitignore works | ⭐ Easy |
| **Hosting env vars** | Set in Cloudflare/Netlify dashboard | ✅ Production deployment | 🟢 Good — encrypted at rest by provider | ⭐ Easy |
| **CI/CD secrets** | Set in GitHub Actions secrets | ✅ Automated deployments | 🟢 Good — masked in logs | ⭐⭐ Medium |
| **Secret manager** | AWS Secrets Manager, Vault, etc. | ✅ Enterprise/commercial products | 🟢🟢 Very good — audit trails, rotation | ⭐⭐⭐ Advanced |

> **Default for beginners:** Use `.env.local` for development + hosting dashboard env vars for production. That's enough until Stage 9+ on the Lifecycle Ladder.

---

## 7. 🚫 When to Avoid APIs Entirely

Not every project needs a real API. Consider avoiding APIs when:

| Situation | Why Avoid API | What to Do Instead |
|---|---|---|
| **You're prototyping** | APIs cost money and add complexity | Use demo data from `/demo-data/` folder |
| **You're learning** | API errors distract from learning the framework | Use hardcoded sample data |
| **The API is expensive** | GPT-4 costs real money per call | Use local models (Ollama), cheaper models, or mock responses |
| **Data is local/simple** | No need for network calls | Use local JSON/CSV files |
| **You haven't validated the idea** | Don't pay for APIs before validating demand | Use mock data until Phase 5+ |

> **Rule of thumb:** If you haven't passed Phase 2 (Validate Pain), you probably don't need a real API yet.

---

## 8. 💡 How to Reduce API Usage Legally

9 strategies to minimize API costs without violating terms of service:

| # | Strategy | What It Means | Savings Potential |
|---|---|---|---|
| 1 | **Caching** | Store API responses locally; reuse instead of re-calling | ⭐⭐⭐ High |
| 2 | **Batching** | Combine multiple requests into one | ⭐⭐ Medium |
| 3 | **Smaller/cheaper models** | Use GPT-4o-mini instead of GPT-4o; use Haiku instead of Opus | ⭐⭐⭐ High |
| 4 | **Local models (Ollama)** | Run models on your machine — zero API cost | ⭐⭐⭐ Highest |
| 5 | **Better prompts** | Shorter, clearer prompts use fewer tokens | ⭐⭐ Medium |
| 6 | **Response caching** | Cache AI responses for identical/similar queries | ⭐⭐⭐ High |
| 7 | **Retrieval before generation** | Search local data FIRST, only call AI when needed | ⭐⭐⭐ High |
| 8 | **Demo mode** | Use fake responses during development and testing | ⭐⭐⭐ Highest |
| 9 | **User-controlled calls** | Only call API when user clicks a button, not on every keystroke | ⭐⭐ Medium |

> 📎 For detailed cost monitoring and budget alerts, see module **O9 — Cost Monitoring & Budget Guardrails**.

---

## 9. 🎭 Demo Mode vs Real API Mode

### The Pattern

Create a simple toggle that switches between demo data and real API calls:

```text
Environment variable:
NEXT_PUBLIC_DEMO_MODE=true    ← uses local data (free, fast, safe)
NEXT_PUBLIC_DEMO_MODE=false   ← uses real API (costs money, real data)
```

### How It Works

```text
IF DEMO_MODE is true:
  → Load data from /demo-data/sample-data.json
  → No API calls made
  → No secrets needed
  → Works offline
  → Safe to share publicly

IF DEMO_MODE is false:
  → Call real API (Supabase, OpenAI, etc.)
  → Requires real secrets in .env.local
  → Costs money
  → Requires internet
  → Requires proper security
```

### Setting Up Demo Data

1. Create a `/demo-data/` folder in your project
2. Add sample JSON or CSV files with realistic but FAKE data
3. In your code, check the DEMO_MODE flag before making API calls

```text
demo-data/
  students.json        ← 5 fake students with fake names
  notes.json           ← 10 fake lesson notes
  analytics.json       ← fake chart data
```

### When to Use Each Mode

| Situation | Mode | Why |
|---|---|---|
| Local development | Demo | Save API costs, work offline |
| Showing prototype to people | Demo | No secrets needed, always works |
| Portfolio showcase | Demo | Safe, no real data |
| Testing with real users | Real | Need real data interactions |
| Production | Real | Real features for real users |

---

## 10. 🎪 Mock API Responses

### What They Are

Mock responses are **fake API answers** that you create yourself, so your app can function without calling a real API.

### When to Use

- Building the frontend before the backend is ready
- Testing error handling (you can mock error responses)
- Prototyping without API costs
- Offline development

### Simple Example

Instead of:
```text
[calling real API] → response
```

You use:
```text
[load local file] → same response shape
```

Create a file like `demo-data/mock-response.json`:
```json
{
  "students": [
    { "id": 1, "name": "Ana Garcia", "subject": "Math" },
    { "id": 2, "name": "Ben Smith", "subject": "Science" }
  ],
  "total": 2
}
```

Your code loads this file instead of calling the API. The frontend works exactly the same — it doesn't know the data is fake.

---

## 11. 🔄 Key Rotation & Hygiene

### How Often to Rotate Keys

| Situation | Rotation Frequency |
|---|---|
| Personal/learning project | When you suspect exposure |
| Beta app with real users | Every 90 days |
| Commercial app with payments | Every 30–60 days |
| After a team member leaves | Immediately |
| After ANY suspected exposure | Immediately |

### Safe Rotation Procedure

```text
Step 1: Generate NEW key in the provider dashboard
Step 2: Update .env.local with the NEW key
Step 3: Update hosting env vars (Cloudflare/Netlify) with the NEW key
Step 4: Test everything works with the NEW key
Step 5: Revoke the OLD key in the provider dashboard
Step 6: Confirm app still works (the old key is no longer valid)
Step 7: Document the rotation in SECURITY_CHECKLIST.md
```

> ⚠️ **Critical order:** Generate new FIRST, then update, then test, then revoke old. If you revoke first, your app breaks.

### Hygiene Checklist

- [ ] All keys are in `.env.local`, not in code
- [ ] `.env.local` is in `.gitignore`
- [ ] `.env.example` has fake placeholder names
- [ ] No keys in chat history (ChatGPT, Copilot, Slack, Teams)
- [ ] No keys in screenshots
- [ ] No keys in commit messages
- [ ] `service_role` key is NEVER in frontend code
- [ ] RLS is enabled on all Supabase tables with user data
- [ ] Hosting env vars are set (not hardcoded in deployment scripts)
- [ ] Last rotation documented

---

## 12. 🚨 What to Do If a Key Is Exposed — Emergency SOP

If you accidentally commit, paste, screenshot, or share a key, follow this procedure **immediately**:

### Emergency Procedure

```text
🚨 KEY EXPOSED — EMERGENCY RESPONSE
═══════════════════════════════════════

Step 1: STOP using the exposed key immediately
        Do NOT wait. Do NOT "hope nobody saw it."

Step 2: REVOKE/ROTATE the key in the provider dashboard
        → Supabase: Settings → API → Regenerate
        → Stripe: Developers → API Keys → Roll Key
        → OpenAI: API Keys → Revoke → Create New
        → Cloudflare: Profile → API Tokens → Roll

Step 3: REMOVE the key from your code
        → Delete from any file that contains it
        → Move real keys to .env.local (if not already)

Step 4: CHECK Git history
        ⚠️ CRITICAL: Deleting the key from the latest file is NOT enough.
        If it was ever committed, it exists in Git history forever.
        → Use: git log --all --full-history -- "**/[filename]"
        → Consider: git filter-branch or BFG Repo Cleaner to remove from history
        → Or: delete the repo and create a fresh one (simplest for beginners)

Step 5: CHECK hosting environment
        → Cloudflare/Netlify: update env vars with the new key
        → Redeploy with the new key

Step 6: CREATE a new key
        → Generate new key in provider dashboard
        → Add to .env.local
        → Add to hosting env vars
        → Test everything works

Step 7: DOCUMENT what happened
        → Add entry to SECURITY_CHECKLIST.md:
          "Date: [DATE]. Key: [WHICH KEY]. Exposure: [HOW]. Resolution: [WHAT YOU DID]."
```

### The Cardinal Rule

> **If a key was committed to Git — even once, even for one second — assume it was exposed.** Automated scanners work in real-time. Deleting the file does not delete Git history. You must either clean the history or rotate the key.

---

## 13. 🤖 What NEVER to Paste into AI Chats

These items should **NEVER** be pasted into ChatGPT, Claude, Copilot Chat, or any AI tool:

| Category | Examples | Why |
|---|---|---|
| **API keys / secrets** | `sk-abc123...`, `eyJ...`, service role keys | May be logged, trained on, or visible to operators |
| **Passwords** | Database passwords, admin passwords, user passwords | Same as above |
| **Private user data** | Real names, emails, phone numbers, addresses | Privacy violation. May violate GDPR/CCPA/PDPA |
| **Financial data** | Credit card numbers, bank accounts, SSN/TIN | Extremely sensitive. Never share electronically |
| **Health/medical data** | Patient records, diagnoses, prescriptions | Regulated data (HIPAA, etc.) |
| **Internal business data** | Proprietary code, trade secrets, unreleased products | Intellectual property risk |
| **Access tokens / session tokens** | JWT tokens, OAuth tokens, refresh tokens | Can be used to impersonate users |
| **Database connection strings** | `postgresql://user:pass@host:port/db` | Full database access |

### What to Do Instead

| Instead of Pasting... | Do This |
|---|---|
| Real API key | Replace with `[YOUR_API_KEY_HERE]` or `sk-REDACTED` |
| Real password | Replace with `password_placeholder` |
| Real user name | Replace with `John Doe` or `[USER_NAME]` |
| Real email | Replace with `user@example.com` |
| Real database URL | Replace with `postgresql://user:pass@localhost:5432/mydb` |
| Full production code with secrets | Remove secrets first, then paste the code |

---

## 14. ✅ Complete Secret Safety Checklist

Copy this into your project's `docs/SECURITY_CHECKLIST.md`:

```markdown
# Security Checklist

## Project: [PROJECT NAME]
## Last reviewed: [DATE]
## Reviewer: [YOUR NAME]

### 🔑 Secret Management
- [ ] All secrets stored in .env.local (NOT in code)
- [ ] .env.local is listed in .gitignore
- [ ] .env.example exists with fake placeholder values
- [ ] No secrets in commit history (or history cleaned)
- [ ] No secrets in commit messages
- [ ] Hosting env vars set (Cloudflare/Netlify dashboard)

### 🗄️ Supabase Security
- [ ] RLS enabled on ALL tables with user data
- [ ] At least one RLS policy per table
- [ ] service_role key is NEVER in frontend code
- [ ] service_role key is NEVER in NEXT_PUBLIC_ variable
- [ ] anon key is only used with RLS enabled

### 🔐 Authentication
- [ ] Login/signup works correctly
- [ ] Password reset works (if applicable)
- [ ] Users can only see their own data
- [ ] No admin endpoints exposed to regular users

### 🌐 Frontend Security
- [ ] No hardcoded secrets in .js/.ts/.jsx/.tsx files
- [ ] No secrets visible in browser DevTools
- [ ] No secrets in console.log() statements
- [ ] No secrets in error messages shown to users

### 🤖 AI Tool Safety
- [ ] No real secrets pasted into ChatGPT/Claude/Copilot
- [ ] No real user data pasted into AI tools
- [ ] API keys redacted before sharing code with AI

### 📸 Screenshot / Sharing Safety
- [ ] No screenshots with visible API keys
- [ ] No screen recordings with visible secrets
- [ ] README uses demo data, not real data

### 🔄 Key Rotation Log
| Date | Key Rotated | Reason | New Key Verified? |
|---|---|---|---|
| [DATE] | [WHICH KEY] | [WHY] | ✅ / ❌ |

### 🚨 Incident Log
| Date | What Happened | Severity | Resolution |
|---|---|---|---|
| [DATE] | [DESCRIPTION] | [Low/Med/High/Critical] | [WHAT YOU DID] |
```

---

## 🏁 The Golden Rules of Secret Safety

```text
1. 🔑 Secrets go in .env.local — NEVER in code.
2. 📄 .env.example goes in GitHub — .env.local NEVER does.
3. 🖥️ Private keys stay server-side — NEVER in frontend.
4. 🤖 NEVER paste real keys into AI chats.
5. 📸 NEVER screenshot dashboards with visible keys.
6. 🚨 If exposed: revoke IMMEDIATELY, don't wait.
7. 📜 Git history remembers everything — deletion is not enough.
8. 🔄 Rotate keys regularly and after any team change.
9. 🛡️ RLS on Supabase is mandatory for user data.
10. 🎭 Use Demo Mode to avoid needing keys during development.
```

---

> **UNGASIS Content Module: API Key & Secret Safety**  
> Module ID: R5  
> Version: 1.0  
> Date: 2026-05-31  
> Sources: AI Builder's Master Workflow Prompt v4.0 §23 + Unified Beginner Solopreneur App Building Workflow Playbook v3.0 §19 + SOP 5  
> Author: UNGASIS Content Absorption Pipeline  
> Status: ✅ Complete  
