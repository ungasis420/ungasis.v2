# UNGASIS Content Module: Version Control for Beginners

> 🗂️ Module ID: O8  
> 📂 File: `ungasis-version-control.md`  
> 🔗 Sources: Master Prompt §26 (Version Control for Beginners) + Playbook §17 (Git and Rollback Rules)  
> 🎯 Audience: Beginner / not tech-savvy / ESL / $0 budget  

---

## 📖 Table of Contents

1. [What is Version Control?](#1--what-is-version-control)
2. [Why You Need It](#2--why-you-need-it)
3. [Git Basics in Simple English](#3--git-basics-in-simple-english)
4. [GitHub Basics](#4--github-basics)
5. [What to NEVER Commit](#5--what-to-never-commit)
6. [.gitignore Template for My Projects](#6--gitignore-template-for-my-projects)
7. [Beginner Git Workflow](#7--beginner-git-workflow)
8. [How to Recover from Mistakes](#8--how-to-recover-from-mistakes)
9. [How to Use GitHub Pages for Free Hosting](#9--how-to-use-github-pages-for-free-hosting)
10. [How VS Code Makes Git Easier](#10--how-vs-code-makes-git-easier)
11. [Commit Message Format](#11--commit-message-format)
12. [Rollback Plan Template](#12--rollback-plan-template)
13. [Simple Commands Cheat Sheet](#13--simple-commands-cheat-sheet)
14. [Common Beginner Mistakes and Fixes](#14--common-beginner-mistakes-and-fixes)

---

## 1. 🎮 What is Version Control?

### The Video Game Analogy

Think of version control like **save points in a video game**.

| Video Game | Version Control (Git) |
|---|---|
| You save before fighting the boss | You **commit** before making a big change |
| If you die, you reload the save | If code breaks, you **revert** to the last working commit |
| You can have multiple save slots | You can have multiple **branches** (safe side paths) |
| Save file records your progress | Git records every change you ever made |
| You can see when you saved | Git shows the date, time, and description of each save |

### Simple Definition

**Version control** = a system that tracks every change you make to your files, so you can:
- See what changed, when, and why
- Go back to any previous version if something breaks
- Work on new features without risking your working code
- Collaborate with others without overwriting each other's work

**Git** is the most popular version control tool. It is free and open source.

**GitHub** is a website where you store your Git projects online — like a cloud safe box for your code.

---

## 2. 💡 Why You Need It

Even if you are building alone, version control saves you from disasters.

| # | Reason | What Happens WITHOUT Git | What Happens WITH Git |
|---|---|---|---|
| 1 | **Undo mistakes** | You accidentally delete important code and cannot get it back | You run one command and restore the old version |
| 2 | **Track changes** | You forget what you changed last week | Git shows you exactly what changed, when, and why |
| 3 | **Safe experiments** | You try something new and it breaks everything | You create a branch, experiment safely, and merge only if it works |
| 4 | **Backup your work** | Your laptop crashes and everything is gone | Your code is safely stored on GitHub |
| 5 | **Portfolio proof** | You say "I built this" but have no evidence | Your GitHub profile shows your commit history — real proof of work |

### 🍳 Cooking Analogy

Git is like writing down every recipe change you make in a notebook. If your new version of adobo tastes bad, you can flip back to the page where it tasted great and start from there.

---

## 3. 🔧 Git Basics in Simple English

Git has a small set of commands you use every day. Here is each one explained simply.

### 3.1 `git init` — Start Tracking

| Detail | Info |
|---|---|
| **What it does** | Creates a new Git project in your folder. Tells Git: "Start watching this folder." |
| **Analogy** | Opening a brand-new notebook to start writing your recipe changes |
| **When to use** | Once, at the very beginning of a new project |
| **Copy-paste command** | See below |

```bash
git init
```

> 📝 You only run this once per project. After that, Git is always watching.

### 3.2 `git add` — Stage Your Changes

| Detail | Info |
|---|---|
| **What it does** | Tells Git which files you want to include in your next save point |
| **Analogy** | Putting ingredients on the counter before cooking — you are preparing what goes in |
| **When to use** | After you change files and before you commit |
| **Copy-paste command** | See below |

```bash
# Add ALL changed files (most common for beginners)
git add .

# Add just one specific file
git add src/components/Header.tsx
```

> 📝 The dot (`.`) means "everything that changed." This is the easiest option for beginners.

### 3.3 `git commit` — Save a Checkpoint

| Detail | Info |
|---|---|
| **What it does** | Creates a permanent save point with a description of what you changed |
| **Analogy** | Pressing the "Save Game" button with a note: "Defeated the first boss" |
| **When to use** | After `git add`, when your changes are tested and working |
| **Copy-paste command** | See below |

```bash
git commit -m "Add login page with email and password form"
```

> 📝 The `-m` means "message." Always write a clear message about WHAT you changed and WHY.

### 3.4 `git push` — Upload to GitHub

| Detail | Info |
|---|---|
| **What it does** | Sends your local commits to GitHub (the online safe box) |
| **Analogy** | Uploading your recipe notebook to the cloud so it is safe even if your kitchen burns down |
| **When to use** | After committing, to back up your work online |
| **Copy-paste command** | See below |

```bash
git push
```

> 📝 If it is your first push, you may need: `git push -u origin main`

### 3.5 `git pull` — Download Latest Changes

| Detail | Info |
|---|---|
| **What it does** | Downloads the latest version from GitHub to your computer |
| **Analogy** | Syncing your phone with the cloud to get the latest photos |
| **When to use** | Before starting work (especially if you work from multiple computers or with others) |
| **Copy-paste command** | See below |

```bash
git pull
```

### 3.6 `git branch` — Create a Safe Side Path

| Detail | Info |
|---|---|
| **What it does** | Creates a separate copy of your project where you can experiment without breaking the main version |
| **Analogy** | Photocopying your recipe so you can try changes on the copy — if it fails, the original is still perfect |
| **When to use** | Before trying something risky or adding a new feature |
| **Copy-paste commands** | See below |

```bash
# See all branches (the * shows which one you are on)
git branch

# Create a new branch
git branch feature/new-dashboard

# Switch to that branch
git checkout feature/new-dashboard

# Shortcut: create AND switch in one command
git checkout -b feature/new-dashboard
```

### 3.7 `git merge` — Combine Branches

| Detail | Info |
|---|---|
| **What it does** | Takes changes from one branch and adds them into another branch |
| **Analogy** | After your experimental recipe worked, you write the changes into your main recipe book |
| **When to use** | After your feature branch is tested and working |
| **Copy-paste commands** | See below |

```bash
# First, switch to the main branch
git checkout main

# Then merge your feature branch into main
git merge feature/new-dashboard

# After merge, push the updated main to GitHub
git push
```

> ⚠️ **Merge conflicts** can happen when two branches change the same line. VS Code will show you both versions and let you pick which one to keep. Do not panic — it is normal.

---

## 4. 🌐 GitHub Basics

GitHub is where your code lives online. Think of it as **Google Drive for code, but with superpowers**.

### Key Concepts

| Concept | Simple Meaning | Analogy |
|---|---|---|
| **Repository (repo)** | A project folder on GitHub | A recipe binder for one dish |
| **README.md** | A file that explains what your project is and how to use it | The cover page of your recipe binder |
| **.gitignore** | A file that tells Git which files to NOT track | A "do not photograph" list for files with secrets |
| **GitHub Pages** | Free hosting for static websites directly from your repo | A free display shelf in a mall to show your dish |
| **Private repo** | Only you can see it | A locked recipe binder |
| **Public repo** | Anyone can see it | A recipe binder on a public shelf |
| **Fork** | Copying someone else's repo to your account | Photocopying someone else's recipe to try your own version |
| **Pull Request (PR)** | Asking to merge your changes into a project | Submitting your improved recipe for the head chef to review |
| **Issues** | A to-do list / bug tracker built into GitHub | Sticky notes on your recipe binder: "Fix the sauce" |

### How to Create a New Repository

```bash
# Option 1: Create on GitHub website
# 1. Go to github.com → click "+" → "New repository"
# 2. Name it (e.g., "my-app")
# 3. Choose Private
# 4. Check "Add a README file"
# 5. Click "Create repository"

# Option 2: From your terminal (after git init)
git remote add origin https://github.com/YOUR-USERNAME/my-app.git
git branch -M main
git push -u origin main
```

---

## 5. 🚫 What to NEVER Commit

This is a **safety-critical** section. Getting this wrong can expose your secrets to the entire internet.

### ⛔ The NEVER List

| File / Folder | Why NEVER Commit | What Happens If You Do |
|---|---|---|
| `.env` / `.env.local` | Contains real API keys, passwords, tokens | Anyone who sees your repo can steal your keys and use your accounts |
| `node_modules/` | Contains thousands of downloaded library files (huge!) | Makes your repo enormous and slow; these can be re-downloaded anytime with `npm install` |
| `.next/` | Next.js build output (auto-generated) | Clutters your repo with files that change every build |
| `dist/` / `build/` | Compiled output files | Same as above — auto-generated, not source code |
| `*.log` | Error log files | May contain sensitive paths or data |
| `.DS_Store` | macOS hidden system file | Useless clutter |
| `Thumbs.db` | Windows hidden system file | Useless clutter |
| `service_role` keys | Supabase powerful admin key | Full database access — extremely dangerous if exposed |
| Private certificates | SSL/TLS certs, SSH keys | Can impersonate your server or account |
| Connection strings | Database URLs with passwords | Full database access |

### 🔑 The Golden Rule

> **If it is a secret, it does NOT go in Git. Period.**
>
> Put secrets in `.env.local` (on your machine only).  
> Put fake placeholder names in `.env.example` (in Git).  
> Put real secrets in your hosting platform's environment variables (Netlify, Cloudflare, etc.).

---

## 6. 📄 .gitignore Template for My Projects

Copy-paste this into a file called `.gitignore` at the root of your project.

This template works for: **Next.js + Supabase + Tailwind + Node.js projects**.

```gitignore
# ═══════════════════════════════════════════
# UNGASIS .gitignore Template v1.0
# For: Next.js + Supabase + Tailwind + Node
# ═══════════════════════════════════════════

# --- Dependencies ---
node_modules/
.pnp/
.pnp.js

# --- Build outputs ---
.next/
out/
dist/
build/
.turbo/

# --- Environment variables (SECRETS!) ---
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# --- Debug / logs ---
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# --- OS files ---
.DS_Store
Thumbs.db
Desktop.ini

# --- IDE / Editor ---
.vscode/settings.json
.idea/
*.swp
*.swo

# --- Testing ---
coverage/
.nyc_output/

# --- Misc ---
*.tsbuildinfo
next-env.d.ts
```

> 📝 **Important:** Create this file BEFORE your first commit. If you already committed `node_modules` or `.env`, see Section 8 for how to fix it.

---

## 7. 🔄 Beginner Git Workflow

### 7A. Daily Workflow (The 4-Command Routine)

Do this every time you finish a working change:

```bash
# Step 1: Check what changed
git status

# Step 2: Stage all changes
git add .

# Step 3: Save with a clear message
git commit -m "Add user profile page with avatar upload"

# Step 4: Back up to GitHub
git push
```

🍳 **Analogy:** This is like: Check your work → Put it in the box → Label the box → Ship the box to storage.

### 7B. Before Big Changes (From Playbook §17)

**GitHub is your safe box.** Before any big or risky change, follow this workflow:

```text
Before big change:
1. Commit the current working version    ← save your progress first!
2. Write what you plan to change          ← in DECISIONS.md or a comment
3. Make the change                        ← do the work
4. Test                                   ← check it works
5. Commit again ONLY if it works          ← save only good changes
```

Copy-paste version:

```bash
# 1. Save current working state
git add .
git commit -m "Working state before [describe planned change]"
git push

# 2. (Write your plan in DECISIONS.md or a notebook)

# 3. Make your changes...

# 4. Test in the browser — does it work?

# 5. If YES — commit the new version:
git add .
git commit -m "[Describe what you changed and why]"
git push

# 5b. If NO — undo everything and go back:
git checkout .
```

### 7C. Workflow Checklist

- [ ] Before starting: `git pull` (get latest)
- [ ] Make small changes (not giant rewrites)
- [ ] Test after each change
- [ ] Commit only working code
- [ ] Write clear commit messages
- [ ] Push at least once per day
- [ ] Never commit secrets

---

## 8. 🔙 How to Recover from Mistakes

Everyone makes mistakes with Git. Here is how to fix the most common ones.

### Decision Table: Which Recovery Command?

| Situation | Command | What It Does | Risk Level |
|---|---|---|---|
| **I changed files but did NOT commit yet — I want to undo** | `git checkout .` | Throws away all uncommitted changes | 🟡 Medium — changes are gone forever |
| **I committed but did NOT push — I want to undo the commit** | `git reset --soft HEAD~1` | Undoes the commit but keeps your file changes | 🟢 Safe — nothing is lost |
| **I committed AND pushed — I want to undo** | `git revert HEAD` | Creates a NEW commit that undoes the last one | 🟢 Safe — history is preserved |
| **I want to go back to a specific old commit** | `git checkout <commit-hash>` | Switches to that old version temporarily | 🟡 Medium — you are in "detached HEAD" state |
| **I committed a secret file (.env)** | See "Emergency" below | Remove file + remove from Git history | 🔴 High — act immediately |

### Recovery Commands (Copy-Paste Ready)

**Undo uncommitted changes (throw away all edits):**
```bash
git checkout .
```

**Undo the last commit (keep the file changes):**
```bash
git reset --soft HEAD~1
```

**Undo the last commit AND throw away the changes:**
```bash
git reset --hard HEAD~1
```
> ⚠️ **WARNING:** `--hard` deletes your changes permanently. Use only if you are sure.

**Undo a pushed commit (safe — creates a new "undo" commit):**
```bash
git revert HEAD
git push
```

**See your commit history (find the commit hash you want):**
```bash
git log --oneline
```
This shows something like:
```
a1b2c3d Add login page
e4f5g6h Fix header alignment
i7j8k9l Initial commit
```
The letters/numbers on the left (like `a1b2c3d`) are commit hashes — your save point IDs.

### 🚨 Emergency: I Committed a Secret!

If you accidentally committed `.env` or an API key:

```text
EMERGENCY STEPS:
1. STOP — do not push if you have not pushed yet
2. Revoke/rotate the exposed key IMMEDIATELY in the provider dashboard
3. Remove the file from Git tracking:
   git rm --cached .env
4. Add .env to .gitignore (if not already there)
5. Commit the fix:
   git add .gitignore
   git commit -m "Remove .env from tracking, add to .gitignore"
6. If you already pushed, the secret is exposed — assume it was seen
7. Create a new key in the provider dashboard
8. Store the new key in .env.local (not in Git)
9. Document what happened in DECISIONS.md or CHANGELOG.md
```

> ⚠️ **Important:** Just deleting the file from the latest commit is NOT enough. If it was pushed, it exists in Git history. Assume it was exposed and rotate the key.

---

## 9. 🌍 How to Use GitHub Pages for Free Hosting

GitHub Pages lets you host a static website (HTML/CSS/JS) directly from your GitHub repo — **for free**.

### What GitHub Pages Can Host

| ✅ Can Host | ❌ Cannot Host |
|---|---|
| Static HTML/CSS/JS sites | Apps that need a backend/server |
| Landing pages | Apps with database connections |
| Portfolio sites | Next.js apps (need Cloudflare/Netlify instead) |
| Documentation sites | Apps with server-side API routes |
| Simple demos | Apps with real-time features |

### How to Set Up GitHub Pages

```text
Step 1: Go to your repository on github.com
Step 2: Click "Settings" tab (top menu)
Step 3: In the left sidebar, click "Pages"
Step 4: Under "Source", select "Deploy from a branch"
Step 5: Choose "main" branch and "/ (root)" folder
Step 6: Click "Save"
Step 7: Wait 1-2 minutes
Step 8: Your site is live at: https://YOUR-USERNAME.github.io/REPO-NAME/
```

### ⚠️ Important Notes

- GitHub Pages is **free for public repositories**
- ⚠️ For private repos, GitHub Pages requires a paid plan (GitHub Pro or higher) — needs manual verification
- For Next.js or React apps, use **Cloudflare Pages** or **Netlify** instead (both free, support dynamic apps)
- GitHub Pages works great for simple HTML sites, documentation, and portfolio pages

---

## 10. 🖥️ How VS Code Makes Git Easier

VS Code has a built-in **Source Control panel** that lets you do Git without typing commands. It is like having a visual dashboard for your save points.

### Where to Find It

```text
Left sidebar → click the branch icon (3rd icon from top)
Or press: Ctrl + Shift + G
```

### What You Can Do in the Source Control Panel

| Action | How in VS Code | Same as Terminal Command |
|---|---|---|
| **See changed files** | Files appear in the "Changes" list | `git status` |
| **Stage files (add)** | Click the `+` icon next to a file | `git add filename` |
| **Stage all files** | Click the `+` icon next to "Changes" header | `git add .` |
| **Write commit message** | Type in the message box at the top | `-m "message"` part of commit |
| **Commit** | Click the ✓ checkmark button | `git commit` |
| **Push** | Click `...` menu → Push (or use status bar) | `git push` |
| **Pull** | Click `...` menu → Pull | `git pull` |
| **See diff (what changed)** | Click on any changed file | `git diff` |
| **Undo changes to a file** | Right-click file → Discard Changes | `git checkout -- filename` |
| **Switch branch** | Click branch name in bottom-left status bar | `git checkout branch-name` |
| **Create new branch** | Click branch name → Create new branch | `git checkout -b name` |

### VS Code Git Workflow (Visual Steps)

```text
1. Make changes to your files
2. Press Ctrl + Shift + G to open Source Control
3. You see changed files listed under "Changes"
4. Click + to stage them (or click + next to "Changes" to stage all)
5. Type a message in the text box: "Add user dashboard layout"
6. Click the ✓ checkmark to commit
7. Click ... → Push to upload to GitHub
```

### 💡 Pro Tips

- **GitLens extension** — shows who changed each line and when (free extension)
- **Colored indicators** — VS Code shows colored dots next to changed files in the file explorer:
  - 🟢 Green = new file (untracked)
  - 🟡 Yellow/Orange = modified file
  - 🔴 Red = deleted file
- **Inline diff** — click any changed file to see exactly what lines were added (green) or removed (red)

---

## 11. 📝 Commit Message Format

Good commit messages help you (and future you) understand what happened and why.

### The Formula

```
[What changed] + [Why] (optional)
```

### Good vs. Bad Examples

| ❌ Bad Message | ✅ Good Message | Why Better |
|---|---|---|
| `update` | `Update header logo to new brand version` | Tells WHAT was updated |
| `fix` | `Fix login button not responding on mobile` | Tells WHAT was fixed and WHERE |
| `changes` | `Add dark mode toggle to settings page` | Tells WHAT was added and WHERE |
| `asdfgh` | `Remove unused CSS classes from dashboard` | Actually describes the change |
| `WIP` | `WIP: Start building user profile page (not complete)` | At least says what you are working on |

### Message Templates (Copy-Paste)

```bash
# Adding something new
git commit -m "Add [feature] to [location]"

# Fixing a bug
git commit -m "Fix [problem] in [location]"

# Updating something
git commit -m "Update [thing] to [new state/version]"

# Removing something
git commit -m "Remove [thing] because [reason]"

# Refactoring (changing structure without changing behavior)
git commit -m "Refactor [component] for better readability"

# Work in progress (use sparingly)
git commit -m "WIP: [what you are working on]"
```

### Rules for Commit Messages

- [ ] Start with a verb: Add, Fix, Update, Remove, Refactor
- [ ] Keep it under 72 characters
- [ ] Write in present tense ("Add feature" not "Added feature")
- [ ] Be specific (say WHERE and WHAT)
- [ ] Do not just write "fix" or "update" — say what you fixed or updated

---

## 12. 🔄 Rollback Plan Template

This template comes from **Playbook §17**. Use it every time a change breaks your app.

### The 5-Step Rollback Process

```text
╔══════════════════════════════════════════════════╗
║         ROLLBACK PLAN — EMERGENCY STEPS          ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  1. 🛑 STOP                                     ║
║     → Stop adding more changes immediately       ║
║     → Do not try to "fix forward" in a panic     ║
║                                                  ║
║  2. 🔍 IDENTIFY last working commit              ║
║     → Run: git log --oneline                     ║
║     → Find the commit where everything worked    ║
║                                                  ║
║  3. 🔙 RESTORE to that commit                   ║
║     → Run: git revert HEAD (if 1 commit back)    ║
║     → Or: git checkout <hash> (to inspect)       ║
║     → Or: git reset --hard <hash> (nuclear)      ║
║                                                  ║
║  4. 🚀 REDEPLOY                                 ║
║     → Push the restored version to GitHub         ║
║     → Verify the live site works again            ║
║                                                  ║
║  5. 📝 DOCUMENT what failed                      ║
║     → Write in DECISIONS.md or CHANGELOG.md:     ║
║       - What change broke the app                ║
║       - Why it broke                             ║
║       - How you fixed it                         ║
║       - What you will do differently next time   ║
║                                                  ║
╚══════════════════════════════════════════════════╝
```

### Rollback Template (Copy-Paste into DECISIONS.md)

```markdown
## Rollback Record — [Date]

**What happened:** [Describe the change that broke the app]
**When it broke:** [Date and time]
**Symptoms:** [What went wrong — error message, blank page, etc.]
**Root cause:** [Why it broke — wrong file, missing import, etc.]
**Recovery action:** [git revert HEAD / git reset --hard abc1234 / etc.]
**Commit restored to:** [commit hash and message]
**Redeployed:** Yes / No
**Verified working:** Yes / No
**Lesson learned:** [What to do differently next time]
**Time to recover:** [How long it took]
```

---

## 13. 📋 Simple Commands Cheat Sheet

Print this. Tape it next to your monitor. Use it every day.

### Everyday Commands

| Command | What It Does | When to Use |
|---|---|---|
| `git status` | Shows which files changed | Before committing — check what is new |
| `git add .` | Stages all changes | After making changes you want to keep |
| `git commit -m "message"` | Saves a checkpoint with a description | After staging, when changes are tested |
| `git push` | Uploads commits to GitHub | After committing — back up your work |
| `git pull` | Downloads latest from GitHub | Before starting work each session |
| `git log --oneline` | Shows commit history (short version) | When you need to find an old save point |

### Branch Commands

| Command | What It Does | When to Use |
|---|---|---|
| `git branch` | Lists all branches | To see what branches exist |
| `git branch feature/name` | Creates a new branch | Before starting a new feature |
| `git checkout feature/name` | Switches to a branch | To work on a specific feature |
| `git checkout -b feature/name` | Creates AND switches (shortcut) | Most common way to start a feature |
| `git checkout main` | Switches back to main branch | When done with feature work |
| `git merge feature/name` | Merges feature into current branch | After feature is tested and working |

### Recovery Commands

| Command | What It Does | Risk Level |
|---|---|---|
| `git checkout .` | Undo all uncommitted changes | 🟡 Changes gone forever |
| `git reset --soft HEAD~1` | Undo last commit, keep changes | 🟢 Safe |
| `git reset --hard HEAD~1` | Undo last commit, DELETE changes | 🔴 Permanent |
| `git revert HEAD` | Create "undo" commit (safe for pushed code) | 🟢 Safest |
| `git stash` | Temporarily hide uncommitted changes | 🟢 Safe — get them back with `git stash pop` |

### Setup Commands (One-Time)

| Command | What It Does | When to Use |
|---|---|---|
| `git init` | Start tracking a folder | Once, at project start |
| `git clone <url>` | Download a repo from GitHub | To get an existing project |
| `git remote add origin <url>` | Connect local folder to GitHub repo | Once, when linking to GitHub |
| `git push -u origin main` | First push to set default remote | Once, on first push |

---

## 14. 🐛 Common Beginner Mistakes and Fixes

| # | Mistake | What Happens | How to Fix |
|---|---|---|---|
| 1 | **Committing `.env` with real API keys** | Your secrets are exposed on GitHub for anyone to see | Immediately rotate the key, add `.env` to `.gitignore`, use `git rm --cached .env` |
| 2 | **Committing `node_modules/`** | Your repo becomes enormous (hundreds of MB) | Add `node_modules/` to `.gitignore`, run `git rm -r --cached node_modules/` |
| 3 | **Writing vague commit messages** ("fix", "update") | You cannot find what changed when something breaks later | Use the formula: `[What] + [Where] + [Why]` |
| 4 | **Never branching — working only on `main`** | Every experiment risks breaking your working app | Create a branch before risky changes: `git checkout -b feature/experiment` |
| 5 | **Making huge commits with many unrelated changes** | Impossible to undo just one part if something breaks | Commit small and often — one logical change per commit |
| 6 | **Forgetting to pull before starting work** | You work on an outdated version and get merge conflicts | Always start your session with `git pull` |
| 7 | **Panicking during merge conflicts** | You randomly delete code trying to fix it | Open the file in VS Code — it highlights both versions. Pick the right one calmly |
| 8 | **Using `git reset --hard` without understanding it** | You permanently delete uncommitted work | Use `--soft` first (safe). Only use `--hard` when you truly want to throw away changes |
| 9 | **Not creating `.gitignore` before first commit** | Secret files or junk files get tracked from the start | Create `.gitignore` FIRST, before `git add .` on a new project |
| 10 | **Forgetting to push** | Your work is only on your laptop — no backup | Push at least once per day. Make it a habit after every commit |

### 🛡️ Prevention Checklist

Before EVERY commit, ask yourself:

- [ ] Did I run `git status` to see what is being committed?
- [ ] Is `.env` or any secret file in the list? (If yes, STOP!)
- [ ] Is `node_modules/` in the list? (If yes, STOP!)
- [ ] Did I test that the app still works?
- [ ] Is my commit message clear and specific?
- [ ] Am I committing only one logical change?

---

## 🏁 Summary: Your Git Survival Kit

```text
DAILY ROUTINE:
  git pull                    ← get latest
  (make changes, test)
  git add .                   ← stage changes
  git commit -m "clear msg"  ← save checkpoint
  git push                   ← back up to GitHub

BEFORE RISKY CHANGES:
  git add . && git commit -m "Working state before [change]" && git push
  (make changes, test)
  If works → git add . && git commit -m "[what changed]" && git push
  If broken → git checkout .  (undo everything)

EMERGENCY:
  1. Stop
  2. git log --oneline (find last good commit)
  3. git revert HEAD (undo safely)
  4. git push (redeploy)
  5. Document in CHANGELOG.md
```

---

> **UNGASIS Content Module: Version Control for Beginners**  
> Module ID: O8  
> Version: 1.0  
> Date: 2026-05-31  
> Sources: AI Builder's Master Workflow Prompt v4.0 §26 + Unified Beginner Solopreneur App Building Workflow Playbook v3.0 §17  
> Author: UNGASIS Content Absorption Pipeline  
> Status: ✅ Complete  
