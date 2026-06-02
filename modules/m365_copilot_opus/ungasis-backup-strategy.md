# UNGASIS Content Module: Backup, Export & Migration Strategy

> **Part of:** UNGASIS OS — Your AI-Powered Personal Operating System
> **Who this is for:** Beginners, non-tech-savvy solopreneurs, ESL speakers
> **Purpose:** Protect everything you build — your code, data, prompts, and knowledge — so you never lose your work, and are never trapped by any single platform

---

## 📖 Table of Contents

1. [Why Backups Matter](#1-why-backups-matter)
2. [What to Backup Regularly](#2-what-to-backup-regularly)
3. [How to Export from Each Platform](#3-how-to-export-from-each-platform)
4. [Vendor Lock-In Risk Assessment](#4-vendor-lock-in-risk-assessment)
5. [What Happens If Free Tier Becomes Paid](#5-what-happens-if-free-tier-becomes-paid)
6. [Exit Plan for Each Critical Tool](#6-exit-plan-for-each-critical-tool)
7. [Keep Data in Portable Formats](#7-keep-data-in-portable-formats)
8. [Backup Schedule Recommendation](#8-backup-schedule-recommendation)
9. [Disaster Recovery Plan](#9-disaster-recovery-plan)
10. [What to Do First If a Platform Goes Down — Emergency Card](#10-what-to-do-first-if-a-platform-goes-down--emergency-card)
11. [The UNGASIS Backup Checklist](#11-the-ungasis-backup-checklist)

---

## 1. Why Backups Matter

### 🏠 The House Analogy

> **Your project is a house. Backups are fire insurance.**
> You hope you never need them — but if the fire comes and you have none, you lose everything.

It does not matter how beautiful your house is. It does not matter how many months you spent building it. Without insurance (backups), one bad event can erase it all.

### What Can Go Wrong (And It WILL — Eventually)

| # | Disaster | What Happens | How Common | Backup Saves You? |
|---|----------|-------------|------------|-------------------|
| 1 | **Platform goes down** | Supabase, Cloudflare, GitHub — any service can have outages | 🟡 Common (temporary) | ✅ Yes — you have a local copy |
| 2 | **Free tier removed or changed** | Service changes pricing, removes free features, or limits usage | 🟡 Common | ✅ Yes — you can migrate |
| 3 | **Accidental deletion** | You delete a file, database table, or entire project by mistake | 🔴 Very common | ✅ Yes — you restore from backup |
| 4 | **Account locked or suspended** | Violation of TOS, billing issue, or security breach locks your account | 🟠 Uncommon but devastating | ✅ Yes — your code and data are safe locally |
| 5 | **Data corruption** | Database migration goes wrong, bad code overwrites data | 🟡 Common | ✅ Yes — you restore clean data |
| 6 | **API key revoked or compromised** | Key leaked to GitHub, expired, or provider revokes it | 🟡 Common | ⚠️ Partially — you need the key inventory to know what to regenerate |
| 7 | **Vendor shuts down** | A startup tool you depend on closes (it happens) | 🟠 Uncommon | ✅ Yes — if data is in portable formats |
| 8 | **AI overwrites working code** | Cline or Copilot rewrites a file and breaks things | 🔴 Very common for beginners | ✅ Yes — Git history lets you restore |
| 9 | **Laptop stolen or crashes** | Hardware failure, theft, or damage | 🟠 Uncommon | ✅ Yes — if code is on GitHub and data is exported |
| 10 | **You forget how something works** | Months later, you cannot remember your setup | 🔴 Very common | ✅ Yes — if docs and configs are backed up |

### 🍳 Kitchen Analogy

> **Imagine you spent 3 days perfecting a wedding cake. Then someone bumps the table and it falls.**
> Without a backup (the recipe + your notes), you start from zero.
> With a backup, you are sad — but you can rebuild it in hours, not days.

---

## 2. What to Backup Regularly

### Complete Backup Inventory

| # | Category | What to Backup | Where It Lives | Backup To |
|---|----------|---------------|---------------|-----------|
| 1 | **🤖 ChatGPT conversations** | Important planning sessions, architecture decisions, research threads | chat.openai.com | Export → local folder `backups/chatgpt/` |
| 2 | **🤖 Custom GPT configs** | System prompts, knowledge files, settings for any custom GPTs you built | ChatGPT GPT Builder | Copy system prompt → save as `.md` file; download knowledge files |
| 3 | **📝 Project instructions** | Master Prompt, Playbook, Content Modules (like this one) | M365 / local files | Save to `UNGASIS/prompts/` folder + GitHub repo |
| 4 | **📚 Knowledge files** | PDFs, datasets, reference docs uploaded to AI tools | ChatGPT, Copilot, local | Keep originals in local `UNGASIS/knowledge/` folder |
| 5 | **☁️ M365 files** | Word docs, Excel sheets, PowerPoint, OneNote — synced via OneDrive | OneDrive / SharePoint | Already synced — but also keep critical files in a separate local backup |
| 6 | **💻 Code repos** | All project source code | GitHub | `git clone` to local machine; GitHub is also a backup of your local |
| 7 | **🔑 Environment variables** | `.env.local` — your API keys, database URLs, secrets | Local machine only | Copy `.env.local` to a secure password manager (Bitwarden, 1Password) — NOT to GitHub |
| 8 | **📋 Prompt library** | Your best prompts, templates, recovery prompts | Local files, Notion, M365 | Save as `.md` files in `UNGASIS/prompts/` |
| 9 | **📊 Evolution logs** | CHANGELOG.md, DECISIONS.md, learning notes | Project repos | Already in Git — verify they exist |
| 10 | **📘 SOPs and workflows** | Standard operating procedures, workflow checklists | Local files, Notion | Save as `.md` in `UNGASIS/sops/` |
| 11 | **🗄️ Database exports** | Supabase tables, user data, app data | Supabase dashboard | Export as CSV or `pg_dump` → local `backups/db/` |
| 12 | **⚙️ Hosting configs** | Cloudflare Pages / Netlify settings, custom domains, redirects | Platform dashboards | Screenshot settings + save as text notes |
| 13 | **🔐 API keys inventory** | List of WHICH keys you have and WHERE they are used (NOT the key values) | Your memory / scattered | Create `API_KEY_INVENTORY.md` — see template below |
| 14 | **🎨 Design files** | Figma designs, Excalidraw wireframes, logos, screenshots | Figma, local | Export from Figma as `.fig` or PNG/SVG; keep local copies |

### API Key Inventory Template

Save this as `API_KEY_INVENTORY.md` in your secure notes (NOT in a public repo):

```markdown
# 🔐 API Key Inventory

> ⚠️ This file lists WHERE keys are used — NOT the key values themselves.
> Key values are stored in: [your password manager name]

| # | Service | Key Name | Used In | Created | Last Rotated | Notes |
|---|---------|----------|---------|---------|-------------|-------|
| 1 | Supabase | SUPABASE_URL | .env.local | 2026-01 | — | Project: Tutor Notes |
| 2 | Supabase | SUPABASE_ANON_KEY | .env.local | 2026-01 | — | Project: Tutor Notes |
| 3 | Lemon Squeezy | LEMONSQUEEZY_API_KEY | .env.local | 2026-03 | — | Payment integration |
| 4 | PostHog | POSTHOG_KEY | .env.local | 2026-02 | — | Analytics |
```

---

## 3. How to Export from Each Platform

### 🤖 ChatGPT

| Action | How | Output |
|--------|-----|--------|
| **Export all conversations** | Settings → Data Controls → Export Data → Confirm in email → Download ZIP | `conversations.json` — all your chat history |
| **Save a specific conversation** | Copy-paste the important parts into a `.md` file manually | Markdown file in `backups/chatgpt/` |
| **Export Custom GPT config** | Open GPT Builder → copy the System Prompt → save as `.md` → download Knowledge files | Markdown + downloaded files |

### ☁️ M365 / OneDrive / SharePoint

| Action | How | Output |
|--------|-----|--------|
| **Sync to local** | Install OneDrive app → files sync automatically to your local folder | Local copies of all OneDrive files |
| **Download specific files** | OneDrive web → select files → Download | ZIP file with selected files |
| **Export OneNote** | OneNote → File → Export → choose format (PDF or .one) | Local export file |

### 💻 GitHub

| Action | How | Output |
|--------|-----|--------|
| **Clone a repo** | `git clone https://github.com/username/repo.git` | Full local copy with history |
| **Download as ZIP** | Repo page → Code → Download ZIP | ZIP file (no git history) |
| **Fork a repo** | Fork button → creates a copy in your GitHub account | Backup copy on GitHub |
| **Mirror all repos** | Use a script to clone all repos locally (advanced) | Full local backup |

### 🗄️ Supabase

| Action | How | Output |
|--------|-----|--------|
| **Export table as CSV** | Dashboard → Table Editor → select table → Export → CSV | CSV file per table |
| **Full database dump** | Settings → Database → Connection string → use `pg_dump` command | Full SQL backup file |
| **Export schema only** | `pg_dump --schema-only` | SQL file with table structures |
| **Backup RLS policies** | Dashboard → Authentication → Policies → screenshot or copy each | Documentation of access rules |

**`pg_dump` command (copy-paste):**
```bash
# Replace [YOUR_CONNECTION_STRING] with your Supabase connection string
pg_dump "[YOUR_CONNECTION_STRING]" > backup_$(date +%Y%m%d).sql
```

### ⚡ Cloudflare Pages / Netlify

| Action | How | Output |
|--------|-----|--------|
| **Backup settings** | Dashboard → take screenshots of: build settings, env vars, custom domains, redirects | Screenshot files |
| **Export env vars** | Dashboard → Settings → Environment Variables → manually copy to secure notes | Text notes (NOT in code) |
| **Note custom domain config** | Dashboard → Custom Domains → note DNS records | Text notes |

### 📝 Notion

| Action | How | Output |
|--------|-----|--------|
| **Export workspace** | Settings → Export All Workspace Content → Markdown & CSV or HTML | ZIP file with all pages |
| **Export single page** | Page → ··· menu → Export → Markdown & CSV | Single file export |

### 🎨 Figma

| Action | How | Output |
|--------|-----|--------|
| **Export design file** | File → Save local copy (.fig) | .fig file |
| **Export frames as images** | Select frames → Export panel → choose PNG/SVG/PDF | Image files |

### 📊 Tally (Forms)

| Action | How | Output |
|--------|-----|--------|
| **Export responses** | Form → Submissions → Export (CSV) | CSV file with all responses |
| **Backup form structure** | Currently no direct export — screenshot form builder or recreate | Screenshots / notes |

---

## 4. Vendor Lock-In Risk Assessment

> **Lock-in** = how difficult it is to leave a platform and take your data/work with you.

| Tool | Lock-In Risk | What You Lose If You Leave | Export Options | Migration Difficulty | Best Alternative |
|------|-------------|---------------------------|----------------|---------------------|-----------------|
| **GitHub** | 🟢 Low | Nothing — Git is portable | `git clone` = full export | ⭐ Easy | GitLab, Bitbucket |
| **VS Code** | 🟢 Low | Extensions/settings (minor) | Settings sync, export extensions list | ⭐ Easy | Cursor, Zed, Sublime |
| **Next.js** | 🟢 Low | Nothing — it is open-source code | Your code IS the export | ⭐ Easy | Remix, Nuxt, Astro |
| **Tailwind CSS** | 🟢 Low | Nothing — CSS utility classes in your code | Your code IS the export | ⭐ Easy | Plain CSS, Bootstrap |
| **Supabase** | 🟡 Medium | Managed hosting, auth magic links, RLS | `pg_dump` for data; auth rules need manual migration | ⭐⭐ Medium | Firebase, Neon, PlanetScale |
| **Cloudflare Pages** | 🟢 Low | Free hosting, CDN, Workers | Code is on GitHub; env vars manual export | ⭐ Easy | Netlify, Vercel, Render |
| **Netlify** | 🟢 Low | Free hosting, serverless functions | Code is on GitHub; env vars manual export | ⭐ Easy | Cloudflare Pages, Vercel |
| **Vercel** | 🟡 Medium | Optimized Next.js hosting, serverless | Code is on GitHub; some Vercel-specific features | ⭐⭐ Medium | Cloudflare Pages, Netlify |
| **Lemon Squeezy** | 🟡 Medium | Payment history, subscriber management, MoR | Export customer data as CSV; payment history | ⭐⭐ Medium | Stripe (if supported), PayMongo |
| **PayMongo** | 🟡 Medium | PH payment processing, transaction history | Dashboard exports | ⭐⭐ Medium | Lemon Squeezy, manual |
| **ChatGPT** | 🟡 Medium | Conversation history, custom GPT configs | Export data (JSON); copy system prompts | ⭐⭐ Medium | Claude, Gemini, local LLMs |
| **Notion** | 🟡 Medium | Linked databases, relation properties, views | Export as Markdown/CSV | ⭐⭐ Medium | Obsidian, Coda, Markdown files |
| **Figma** | 🟡 Medium | Collaborative design features | Export .fig + frames as images | ⭐⭐ Medium | Penpot (open source), Sketch |
| **PostHog** | 🟢 Low | Analytics data (less critical) | Dashboard exports | ⭐ Easy | Plausible, Umami |
| **Bolt.new / Lovable** | 🟢 Low | Prototyping environment | Download / export generated code | ⭐ Easy | v0, manual coding |
| **Tally** | 🟢 Low | Form builder UI | Export responses as CSV | ⭐ Easy | Google Forms, Typeform |

### The Lock-In Rule

> **If you cannot export your data in a standard format (CSV, JSON, Markdown, SQL), that tool has high lock-in risk. Be cautious.**

---

## 5. What Happens If Free Tier Becomes Paid

| Tool | Current Free Tier | What Could Change | Warning Signs | Your Escape Plan |
|------|------------------|------------------|---------------|-----------------|
| **Supabase** | 2 projects, 500MB DB, 1GB storage | Reduce limits, require payment for auth/RLS | Email from Supabase about pricing changes; projects pausing after 7 days inactive | `pg_dump` data backup → migrate to Neon or self-hosted PostgreSQL |
| **Cloudflare Pages** | Unlimited bandwidth, 500 builds/mo | Reduce build limits, add bandwidth caps | Pricing page changes; blog announcements | Move to Netlify; code is on GitHub |
| **Netlify** | 100GB bandwidth, 300 build min | Reduce bandwidth, stricter limits | Email notifications; blog announcements | Move to Cloudflare Pages; code is on GitHub |
| **Vercel** | Generous hobby tier (non-commercial) | Already restricts commercial use on free | Terms of Service changes | Move to Cloudflare Pages (commercial OK) |
| **GitHub** | Unlimited public repos, limited private | Reduce Actions minutes, limit features | Pricing page changes | `git clone` everything → GitLab or Bitbucket |
| **Bolt.new** | Limited generations | Further reduce free generations | Credit usage increasing; UI warnings | Export generated code → continue in VS Code |
| **Lovable** | Limited generations | Further reduce free generations | Credit usage increasing; UI warnings | Export generated code → continue in VS Code |
| **PostHog** | 1M events/mo free | Reduce event limits | Dashboard warnings about usage | Switch to Plausible or Umami (both have free tiers) |
| **Notion** | Free for individual use | Restrict features, require team plan | Feature restrictions appearing | Export as Markdown → move to Obsidian |
| **Tally** | Free forms (generous) | Limit submissions or features | Pricing page changes | Export responses as CSV → Google Forms |
| **ChatGPT** | Free tier (GPT-3.5 level) | Restrict conversation length, reduce model quality | Usage caps appearing; slower responses | Export data → use Claude, Gemini, or local LLMs |
| **Figma** | Free for 3 projects | Reduce projects, restrict features | Project limit warnings | Export .fig files → move to Penpot |

### The Escape Plan Rule

> **For every tool you use, know HOW to leave BEFORE you need to.** When a crisis hits, you will not have time to research export options.

---

## 6. Exit Plan for Each Critical Tool

### 🗄️ Supabase → Alternative PostgreSQL

| Step | Action | Time |
|------|--------|------|
| 1 | Export data: `pg_dump` full database | 10 min |
| 2 | Export RLS policies: screenshot or copy from dashboard | 15 min |
| 3 | Export storage files: download from Supabase Storage | Varies |
| 4 | Set up new PostgreSQL (Neon, Railway, or self-hosted) | 30 min |
| 5 | Import data: `psql < backup.sql` | 10 min |
| 6 | Recreate RLS policies on new platform | 30–60 min |
| 7 | Update `.env.local` with new connection strings | 5 min |
| 8 | Update auth flow (if using Supabase Auth → switch to NextAuth or Clerk) | 2–4 hours |

### ⚡ Cloudflare Pages → Netlify

| Step | Action | Time |
|------|--------|------|
| 1 | Code is already on GitHub — no migration needed | 0 min |
| 2 | Create Netlify account, connect GitHub repo | 10 min |
| 3 | Set build command and output directory | 5 min |
| 4 | Copy environment variables to Netlify | 10 min |
| 5 | Update custom domain DNS records | 15 min |
| 6 | Test deployment | 10 min |

### 🤖 ChatGPT → Claude / Gemini / Local

| Step | Action | Time |
|------|--------|------|
| 1 | Export all conversations (Settings → Data Controls) | 5 min |
| 2 | Copy Custom GPT system prompts to `.md` files | 15 min per GPT |
| 3 | Download all knowledge files | 10 min |
| 4 | Set up Claude / Gemini account | 10 min |
| 5 | Upload knowledge files to new platform | 10 min |
| 6 | Paste system prompts into new platform's custom instructions | 10 min |

### 💳 Lemon Squeezy → PayMongo / Stripe

| Step | Action | Time |
|------|--------|------|
| 1 | Export customer list and payment history | 15 min |
| 2 | Notify customers about payment platform change | 30 min |
| 3 | Set up new payment processor account | 30–60 min |
| 4 | Update checkout integration in your app | 2–4 hours |
| 5 | Test payment flow in test mode | 30 min |
| 6 | Switch to live mode | 5 min |

---

## 7. Keep Data in Portable Formats

### Why Portable Formats Matter

> **Portable format** = a file format that any tool can read, not just the tool that created it.

🍳 **Analogy:** Imagine writing your recipes in a special code that only ONE specific cookbook app can read. If that app shuts down, all your recipes are gone. Instead, write your recipes in plain text — any notebook, any app, any device can read them forever.

### Format Comparison Table

| Format | Portability | Human-Readable | Use For | Tools That Read It |
|--------|------------|----------------|---------|-------------------|
| **Markdown (.md)** | 🟢 Excellent | ✅ Yes | Documentation, notes, prompts, READMEs | Every text editor, GitHub, Notion, Obsidian |
| **JSON (.json)** | 🟢 Excellent | ⚠️ Somewhat | Configuration, structured data, API data | Every programming language, any text editor |
| **CSV (.csv)** | 🟢 Excellent | ✅ Yes | Tabular data, spreadsheets, database exports | Excel, Google Sheets, any text editor, databases |
| **HTML (.html)** | 🟢 Excellent | ⚠️ Somewhat | Web pages, formatted documents | Every browser, text editors |
| **SQL (.sql)** | 🟢 Excellent | ⚠️ Somewhat | Database backups | Any PostgreSQL/MySQL database |
| **Plain text (.txt)** | 🟢 Excellent | ✅ Yes | Simple notes, logs | Everything |
| **PNG/SVG** | 🟢 Excellent | ❌ No (images) | Screenshots, logos, icons | Every device and browser |
| **PDF (.pdf)** | 🟢 Excellent | ✅ Yes | Final documents, reports | Every device |

### What to AVOID for Long-Term Storage

| ❌ Avoid | Why | ✅ Use Instead |
|----------|-----|---------------|
| Proprietary database formats | Cannot open without specific software | `pg_dump` → SQL file |
| Platform-specific exports only | If platform dies, format may be unreadable | Also export as CSV/JSON |
| Storing data only in the cloud | Cloud account can be locked/deleted | Keep a local copy too |
| Binary blobs without documentation | Nobody knows what the data means 6 months later | Add a README explaining the data |
| Screenshots of code | Cannot copy-paste, cannot search | Save code as text files |

### The Portability Rule

> **If you can open it in Notepad/TextEdit and read it, it is portable. If you need special software, it is not.**

---

## 8. Backup Schedule Recommendation

### For Active Projects (Currently Building)

| Frequency | What to Backup | How |
|-----------|---------------|-----|
| **Every session** | Git commit your code changes | `git add . && git commit -m "[what you changed]"` |
| **Daily** | Push to GitHub | `git push origin main` |
| **Weekly** | Database export (if app has real users) | Supabase CSV export or `pg_dump` |
| **Weekly** | Check that env vars are in password manager | Quick review — 2 minutes |
| **Monthly** | Full backup: all files, configs, screenshots of settings | Download ZIP of backups folder |
| **Monthly** | ChatGPT export (if using heavily for planning) | Settings → Export Data |
| **Quarterly** | Vendor lock-in review — is anything at risk? | Review Section 4 table |

### For Inactive Projects (Completed/Paused)

| Frequency | What to Backup | How |
|-----------|---------------|-----|
| **Monthly** | Verify GitHub repo still exists and is accessible | Open repo URL in browser |
| **Monthly** | Verify live demo still works (if deployed) | Open the demo URL |
| **Quarterly** | Check that Supabase project is not paused | Supabase dashboard — free projects pause after 7 days inactive |
| **Quarterly** | Verify backup files are still accessible | Open your backup folder |

### Simple Backup Calendar

```
📅 Every coding session:
   → git commit + push

📅 Sunday evening (Weekly):
   → Export database (pg_dump or CSV)
   → Quick env var check
   → Update CHANGELOG.md if needed

📅 First Saturday of the month (Monthly):
   → Full backup download
   → ChatGPT export (if needed)
   → Check inactive project deployments
   → Verify API key inventory is current

📅 Jan 1, Apr 1, Jul 1, Oct 1 (Quarterly):
   → Vendor lock-in review
   → Free tier status check for all tools
   → Update backup documentation
   → Test one restore from backup (see Section 9)
```

---

## 9. Disaster Recovery Plan

### 🔴 Scenario 1: Platform Goes Down (Temporary Outage)

| Priority | Action | Time |
|----------|--------|------|
| 1 | **Do NOT panic.** Most outages resolve in minutes to hours. | — |
| 2 | Check the platform's status page (e.g., status.supabase.com, cloudflarestatus.com) | 2 min |
| 3 | Check Twitter/X for reports from other users | 2 min |
| 4 | If you need to work NOW, switch to your local backup | 5 min |
| 5 | Wait for recovery, then verify your data is intact | — |

### 🔴 Scenario 2: You Lose Account Access

| Priority | Action | Time |
|----------|--------|------|
| 1 | Try password reset immediately | 5 min |
| 2 | Check if 2FA backup codes work | 5 min |
| 3 | Contact platform support with proof of ownership | 15 min |
| 4 | While waiting: verify your local backups are intact | 10 min |
| 5 | If you cannot regain access: start migration to alternative (use local backups) | Hours |

### 🔴 Scenario 3: Data Corruption / Accidental Deletion

| Priority | Action | Time |
|----------|--------|------|
| 1 | **STOP making changes.** Do not write more data on top of corruption. | — |
| 2 | Check Git history: `git log --oneline` — find the last good commit | 2 min |
| 3 | Restore from Git: `git checkout [commit-hash] -- [filename]` | 2 min |
| 4 | If database: restore from your latest `pg_dump` or CSV backup | 15 min |
| 5 | Verify restored data is correct | 10 min |
| 6 | Commit the restored version: `git commit -m "restore: [what you restored]"` | 2 min |

### 🔴 Scenario 4: AI Overwrites Your Code

| Priority | Action | Time |
|----------|--------|------|
| 1 | **STOP the AI agent** (cancel Cline, close Copilot suggestion) | — |
| 2 | Check VS Code Timeline: File → Timeline (bottom panel) → restore previous version | 2 min |
| 3 | Or check Git: `git diff` to see what changed → `git checkout -- [filename]` to restore | 2 min |
| 4 | If multiple files affected: `git stash` (saves current state) → `git checkout [last good commit]` | 5 min |
| 5 | Test that the restored version works | 5 min |
| 6 | Rule: Always `git commit` before letting AI make changes | — |

### 🔴 Scenario 5: Laptop Lost / Stolen / Crashed

| Priority | Action | Time |
|----------|--------|------|
| 1 | Your code is safe on GitHub (if you pushed regularly) | — |
| 2 | Your files are safe on OneDrive (if synced) | — |
| 3 | Your env vars are safe in password manager | — |
| 4 | Get a new machine → install tools → `git clone` → copy `.env.local` from password manager | 1–2 hours |
| 5 | **Change all passwords and API keys** (assume old laptop is compromised) | 30 min |
| 6 | Revoke any API keys stored on the old machine → generate new ones | 30 min |

### Restore Test: Do This Quarterly

**Why:** Backups that cannot be restored are not backups. Test your restore process.

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Pick one project | — |
| 2 | Delete the local copy (after confirming GitHub is up to date) | Local folder empty |
| 3 | `git clone` from GitHub | Full code restored |
| 4 | Copy `.env.local` from password manager | Secrets restored |
| 5 | `npm install && npm run dev` | App starts and works |
| 6 | If using Supabase: verify database connection | Data loads correctly |
| 7 | If restore works → ✅ your backup process is healthy | Confidence boost |
| 8 | If restore fails → 🔴 fix the gap in your backup process | Update checklist |

---

## 10. What to Do First If a Platform Goes Down — Emergency Card

> **Print this or save it on your phone.** When something goes wrong, you will not have time to read a long document.

### 🚨 EMERGENCY QUICK REFERENCE

```
╔═══════════════════════════════════════════════════════════════╗
║                    🚨 PLATFORM DOWN — QUICK CARD             ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  1. BREATHE. Most outages fix themselves in < 1 hour.         ║
║                                                               ║
║  2. CHECK STATUS PAGE:                                        ║
║     → Supabase:   status.supabase.com                        ║
║     → Cloudflare: cloudflarestatus.com                       ║
║     → GitHub:     githubstatus.com                           ║
║     → Netlify:    netlifystatus.com                          ║
║     → Vercel:     vercel-status.com                          ║
║                                                               ║
║  3. IF OUTAGE CONFIRMED:                                      ║
║     → Wait. Do not try to "fix" by rebuilding.               ║
║     → Work on docs, planning, or other projects.             ║
║                                                               ║
║  4. IF ACCOUNT LOCKED:                                        ║
║     → Password reset → 2FA backup codes → Contact support    ║
║     → Check local backups while waiting                      ║
║                                                               ║
║  5. IF DATA LOST:                                             ║
║     → STOP making changes                                    ║
║     → Check git log for last good commit                     ║
║     → Restore from backup (git checkout or pg_dump)          ║
║                                                               ║
║  6. BACKUPS LOCATION:                                         ║
║     → Code: GitHub + local clones                            ║
║     → Data: backups/db/ folder                               ║
║     → Secrets: Password manager                              ║
║     → Configs: backups/configs/ folder                       ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 11. The UNGASIS Backup Checklist

Complete this checklist for every project. Review monthly.

### 💻 Code & Version Control

- [ ] Code is in a GitHub repository
- [ ] All changes are committed with clear messages
- [ ] Code is pushed to GitHub (not just local)
- [ ] `.gitignore` includes `.env.local`, `node_modules/`, etc.
- [ ] Git history is clean (no secrets in past commits)

### 🗄️ Data

- [ ] Database exported (CSV or `pg_dump`) at least weekly (if active)
- [ ] Database export stored locally in `backups/db/` with date in filename
- [ ] Demo data separated from real data
- [ ] Data stored in portable formats (CSV, JSON, SQL)

### 🔑 Secrets & Keys

- [ ] `.env.local` values are in a password manager (NOT in code, NOT on GitHub)
- [ ] API Key Inventory exists (which keys, where used — not the values)
- [ ] All keys have been rotated in the last 6 months (or noted as OK)
- [ ] No secrets in git history (check with `git log --all -- "*.env"`)

### 📝 Documentation

- [ ] README exists and is up to date
- [ ] CHANGELOG.md documents major changes
- [ ] DECISIONS.md explains key choices
- [ ] Hosting configuration is documented (build command, env vars list, custom domain)
- [ ] Architecture and stack choices are documented

### 🤖 AI & Prompts

- [ ] Master Prompt / Playbook saved locally as `.md` files
- [ ] Custom GPT system prompts saved as `.md` files
- [ ] Knowledge files downloaded and stored locally
- [ ] Important ChatGPT conversations exported or key parts saved
- [ ] Prompt library saved in `UNGASIS/prompts/`

### ☁️ Cloud & Hosting

- [ ] Hosting platform settings documented (screenshots or text)
- [ ] Environment variables exist in BOTH hosting platform AND password manager
- [ ] Custom domain DNS records documented
- [ ] Free tier limits known for every tool (review quarterly)
- [ ] Exit plan known for every critical tool (Section 6)

### 🔄 Restore Readiness

- [ ] Tested a full restore in the last 3 months
- [ ] Can rebuild from GitHub + password manager + backups in < 2 hours
- [ ] Emergency quick card is saved (phone or printed)
- [ ] Backup schedule is being followed

---

> **Sources for this module:**
> - Master Workflow Prompt v4.0 — §28 (Backup, Export & Migration Strategy), §19 (API Key & Secret Management), §4 (Hard Constraints — data portability)
> - Unified Playbook v3 — §15 (Standard Project Folder), §17 (Git and Rollback Rules), §19 (API Key / Secret Policy), §21 (Cost and Limit Tracker)
> - General best practices for data portability, disaster recovery, and vendor independence

---

*UNGASIS Content Module: Backup, Export & Migration Strategy*
*Version: 1.0*
*Date: 2026-05-31*
*Author: Mel John Dimat (via UNGASIS OS)*
*Status: Complete*
