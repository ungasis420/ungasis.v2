# Beginner App Building Tool Stack and Workflow Guide

**Version:** 1.0  
**Date checked:** 2026-05-31  
**Best for:** beginners, learners, personal projects, prototypes, and private MVPs

---

## 0. Read this first

This guide gives you a simple tool setup you can use for most app projects.

The goal is not to use every tool.

The goal is to use a small repeatable workflow:

```text
Idea
→ Plan
→ Build first version
→ Save to GitHub
→ Edit and debug
→ Test
→ Deploy
→ Monitor
→ Improve
```

Simple rule:

> Use the fewest tools that help you finish the project safely.

---

## 1. My recommended default workflow

Use this for most beginner app projects:

```text
ChatGPT / UNGASIS
→ GitHub
→ VS Code Desktop or vscode.dev
→ GitHub Codespaces when you need a cloud computer
→ Google AI Studio or Replit/Bolt for fast first drafts
→ Supabase or Neon when you need a database
→ Vercel or Netlify when you need a public link
→ Sentry when you need error reports
→ UptimeRobot when you need uptime checks
```

### Simple analogy

Think of this like a small workshop:

| Workshop item | App tool |
|---|---|
| Notebook | ChatGPT / UNGASIS |
| Storage cabinet | GitHub |
| Work table | VS Code |
| Rented workshop | Codespaces |
| Helper/apprentice | AI coding tool |
| Filing cabinet | Database |
| Delivery truck | Vercel / Netlify |
| Smoke alarm | Sentry / UptimeRobot |

---

## 2. Fast answer: use this starter stack

For your next 3 to 5 projects, use this:

| Need | Tool |
|---|---|
| Plan the app | ChatGPT / UNGASIS |
| Design simple screens | Figma Starter |
| Save code | GitHub |
| Edit code | VS Code Desktop or vscode.dev |
| Run code in browser | GitHub Codespaces |
| AI coding help | GitHub Copilot Free, Cursor Hobby, or Windsurf Free |
| Fast AI prototype | Google AI Studio |
| Simple app builder | Replit or Bolt |
| Frontend deploy | Vercel or Netlify |
| Database | Supabase or Neon |
| API testing | Postman Free |
| Error tracking | Sentry Developer |
| Uptime check | UptimeRobot Free |

### What to avoid at first

Avoid these until you are more comfortable or have a developer helping you:

| Avoid first | Why |
|---|---|
| Kubernetes | Too much setup for beginner apps. |
| Full AWS setup | Powerful, but easy to misconfigure. |
| Microservices | Too many moving parts. |
| Complex Docker setup | Useful later, not needed for every small app. |
| Five AI coding tools at once | Causes confusion. |
| Paid services too early | Free tiers are enough for learning. |

---

## 3. Tool map by job

### 3.1 Planning and learning

| Tool | Free or free with limits? | Use it for | Beginner note |
|---|---:|---|---|
| ChatGPT / UNGASIS | Depends on your plan | Planning, prompt review, app review, debugging help | Treat it like your senior dev coach. |
| Google AI Studio | Free tier / paid tiers | AI app drafts, Gemini tests, prompt-to-app work | Good for AI app prototypes. |
| Figma Starter | Free limited access | UI design, wireframes, mockups | Use before coding screens. |
| Firebase Studio | Preview, sunsetting 2027-03-22 | Legacy / migration only | Prefer Google AI Studio for new work. |

**Important update:** Firebase Studio documentation says it is being sunset on **2027-03-22**. Apps already deployed to Firebase continue to run, but for new building you should prefer Google AI Studio or another active tool.

---

### 3.2 Editing code

| Tool | Free or free with limits? | Use it for | Beginner note |
|---|---:|---|---|
| VS Code Desktop | Free | Main code editor on your computer | Best if you can install apps. |
| vscode.dev | Free | Quick browser edits | Good for small file changes. |
| GitHub Codespaces | Free monthly quota | Run your project in a cloud computer | Good when setup is hard on your laptop. |
| CodeSandbox | Free limited | Browser app experiments | Good for learning and testing ideas. |
| StackBlitz | Free options | Frontend experiments | Good for fast browser demos. |

---

### 3.3 AI coding helpers

| Tool | Free or free with limits? | Use it for | Beginner note |
|---|---:|---|---|
| GitHub Copilot Free | Free limited | Code suggestions and chat | Best inside GitHub / VS Code. |
| Cursor Hobby | Free limited | AI-first coding editor | Powerful, but still check all changes. |
| Windsurf Free | Free limited | AI coding/editor workflow | Useful for app edits and generation. |
| Replit Starter | Free limited | Build and publish simple apps | Good for beginner full-stack tests. |
| Bolt Free | Free limited | Prompt-to-app prototypes | Good for quick first drafts. |

**Safety rule:** AI coding tools are helpers, not final judges.

Always check:

```text
Does the app run?
Do tests pass?
Are secrets safe?
Can I undo changes?
```

---

### 3.4 Version control and automatic checks

| Tool | Free or free with limits? | Use it for | Beginner note |
|---|---:|---|---|
| GitHub | Free tier | Store code and history | This is your project safe box. |
| GitHub Actions | Free monthly quota | Automatic tests | A robot checker before deploy. |
| GitHub Pages | Free for simple static sites | Host simple pages | Good for docs and small sites. |

---

### 3.5 Deployment and hosting

| Tool | Free or free with limits? | Best for | Beginner note |
|---|---:|---|---|
| Vercel Hobby | Free for personal projects | React, Next.js, frontend apps | My first choice for many web apps. |
| Netlify Free | Free limited | Static sites and frontend apps | Very beginner-friendly. |
| Cloudflare Pages | Free limited | Fast static sites | Good for simple sites. |
| Render | Free/paid options vary | Backend services and APIs | Check pricing before relying on it. |
| Firebase Hosting | No-cost limits | Firebase apps and static hosting | Good if using Firebase tools. |

---

### 3.6 Database, login, and storage

| Tool | Free or free with limits? | Best for | Beginner note |
|---|---:|---|---|
| Supabase | Free limited | Postgres database, auth, storage | Good all-in-one backend. |
| Neon | Free limited | Serverless Postgres | Good if you only need a database. |
| Firebase | No-cost limits | Auth, Firestore, realtime apps | Good for Google/Firebase apps. |
| Turso | Free limited | SQLite-style database | Good for lightweight apps. |
| Cloudflare D1 / KV / R2 | Free limited | Edge apps and simple storage | Good with Cloudflare Workers. |

---

### 3.7 API testing and debugging

| Tool | Free or free with limits? | Use it for | Beginner note |
|---|---:|---|---|
| Postman Free | Free limited | Test APIs | Helps you check if your backend works. |
| Sentry Developer | Free limited | Catch errors in live apps | Shows bugs users hit. |
| UptimeRobot Free | Free limited | Check if your site is online | Tells you when your app is down. |
| Checkly Hobby | Free limited | Synthetic checks | More advanced uptime/API checks. |

---

## 4. Best workflows by project type

### 4.1 Simple landing page or portfolio

Use this:

```text
Figma
→ GitHub
→ vscode.dev
→ Netlify or Cloudflare Pages
→ UptimeRobot
```

Best for:

- one-page site
- portfolio
- project showcase
- simple business page
- no login
- no database

---

### 4.2 Beginner web app with saved data

Use this:

```text
ChatGPT / UNGASIS
→ GitHub
→ Codespaces or VS Code Desktop
→ Supabase or Neon
→ Vercel
→ Sentry
→ UptimeRobot
```

Best for:

- dashboard
- task tracker
- form app
- habit tracker
- simple internal tool
- small AI app

---

### 4.3 AI prototype

Use this:

```text
ChatGPT / UNGASIS
→ Google AI Studio
→ export to GitHub or ZIP
→ Codespaces or VS Code
→ Vercel, Cloud Run, or another host
```

Best for:

- AI chatbot
- AI dashboard
- AI content tool
- Gemini prototype
- fast app idea test

Safety rule:

```text
Never put API keys in frontend code.
Keep API keys server-side.
```

---

### 4.4 No-code-ish beginner prototype

Use this:

```text
Replit or Bolt
→ GitHub
→ Vercel or Netlify
```

Best for:

- describing the app in words
- first draft apps
- learning by editing generated code
- simple demos

---

## 5. Decision tree: which tool should I use?

```text
Need to edit text only?
→ Use vscode.dev

Need to run the app?
→ Use VS Code Desktop or GitHub Codespaces

Need a fast AI app draft?
→ Use Google AI Studio, Replit, or Bolt

Need a public link?
→ Use Vercel, Netlify, or Cloudflare Pages

Need saved user data?
→ Use Supabase, Neon, Firebase, or Turso

Need login?
→ Use Supabase Auth or Firebase Auth

Need to test an API?
→ Use Postman

Need to catch errors after launch?
→ Use Sentry

Need to know if the site is down?
→ Use UptimeRobot
```

---

## 6. Beginner learning path

### Week 1: Learn the workflow

Create accounts for:

```text
GitHub
Vercel
Supabase or Neon
Figma
Sentry
UptimeRobot
Postman
```

Learn these actions:

```text
Create GitHub repo
Open repo in vscode.dev
Open repo in Codespaces
Deploy to Vercel
Create one database table
```

---

### Week 2: Build one tiny app

Build a simple task tracker.

Must have:

```text
Add task
Mark task done
Delete task
Save tasks
Deploy public link
```

Do not add:

```text
payments
teams
admin panel
complex analytics
mobile app version
```

---

### Week 3: Add quality

Add:

```text
README.md
basic tests
Sentry
UptimeRobot
GitHub Actions check
```

---

## 7. Simple workflow for every project

Create a file named:

```text
PROJECT_WORKFLOW.md
```

Put this inside:

```text
# Project Workflow

Project name:
Goal:
Main user:
Current stage:
Tools used:
GitHub repo:
Live app link:
Database:
How to run:
How to deploy:
Known bugs:
Next 3 tasks:
```

This one file saves time because it keeps your project clear.

---

## 8. Simple safety rules

Follow these for every project:

```text
1. Save your work in GitHub.
2. Do not paste API keys into public code.
3. Do not share private client data with free AI tools.
4. Use test data while learning.
5. Keep apps private until basic checks pass.
6. Add Sentry before sharing with real users.
7. Add UptimeRobot when the app has a public link.
8. Keep a rollback plan.
```

### Rollback plan

Rollback means going back to the last working version.

Simple rollback plan:

```text
Before big change:
- save current code to GitHub
- write what you changed
- test the app

If it breaks:
- go back to the last good commit
- redeploy
- write what failed
```

---

## 9. My recommended default project folder

Use this folder structure for most beginner apps:

```text
my-app/
  README.md
  PROJECT_WORKFLOW.md
  .env.example
  docs/
    DECISIONS.md
    TEST_PLAN.md
    DEPLOYMENT.md
  src/
  tests/
  .github/
    workflows/
      ci.yml
```

### What each file means

| File | Simple meaning |
|---|---|
| README.md | Main instruction page. |
| PROJECT_WORKFLOW.md | Your project control page. |
| .env.example | Shows needed secret names without real secrets. |
| DECISIONS.md | Why you chose tools and features. |
| TEST_PLAN.md | What to check before sharing. |
| DEPLOYMENT.md | How to put the app online. |
| ci.yml | Automatic checker rules. |

---

## 10. Tool recommendations by stage

### Personal learning stage

Use:

```text
ChatGPT / UNGASIS
GitHub
vscode.dev
Vercel or Netlify
```

Do not use complex backend yet.

---

### Prototype stage

Use:

```text
ChatGPT / UNGASIS
GitHub
Codespaces
Google AI Studio or Replit
Supabase or Neon
Vercel
```

Add simple tests.

---

### Private beta stage

Use:

```text
GitHub Actions
Sentry
UptimeRobot
Postman
basic user feedback form
```

Add privacy and error checks.

---

### Public or commercial stage

Add developer/security review.

You need:

```text
real auth
secret storage
backup and restore
logs
monitoring
terms/privacy review
payment safety if paid app
rollback plan
security review
```

Do not launch to real users just because the app works once.

---

## 11. Technical jargon glossary with Feynman and layman analogies

### 11.1 Tech stack

**Simple meaning:** The set of tools used to build an app.

**Feynman explanation:** If you build a house, you choose wood, nails, tools, and paint. For an app, you choose the editor, code language, database, and hosting.

**Layman analogy:** A cooking setup: stove, pan, knife, ingredients.

---

### 11.2 Repository / repo

**Simple meaning:** A project folder saved online, usually in GitHub.

**Feynman explanation:** A repo stores your files and remembers changes over time.

**Layman analogy:** A folder with a time machine.

---

### 11.3 GitHub

**Simple meaning:** A place to save code and track changes.

**Feynman explanation:** GitHub keeps your project safe and lets you go back if you break something.

**Layman analogy:** Google Drive for code, but with history.

---

### 11.4 Commit

**Simple meaning:** A saved checkpoint of your code.

**Feynman explanation:** After a useful change, you save it as a named point in history.

**Layman analogy:** Saving a game before a boss fight.

---

### 11.5 Branch

**Simple meaning:** A separate copy of your project for testing changes.

**Feynman explanation:** You make a safe side path so you can try changes without breaking the main app.

**Layman analogy:** Trying a recipe variation before changing the family recipe.

---

### 11.6 VS Code

**Simple meaning:** A code editor.

**Feynman explanation:** It is where you read, write, search, and fix app files.

**Layman analogy:** Microsoft Word for code.

---

### 11.7 vscode.dev

**Simple meaning:** VS Code in your browser.

**Feynman explanation:** You can edit files without installing VS Code.

**Layman analogy:** Opening your toolbox through a web browser.

---

### 11.8 Codespace

**Simple meaning:** A cloud computer for your project.

**Feynman explanation:** Instead of installing tools on your laptop, GitHub gives you a ready coding machine in the browser.

**Layman analogy:** Renting a clean kitchen that already has the stove and pans.

---

### 11.9 AI coding agent

**Simple meaning:** An AI helper that can suggest or edit code.

**Feynman explanation:** You describe the change, and the AI helps write it. You still review the work.

**Layman analogy:** An apprentice. Useful, but you check before shipping.

---

### 11.10 Frontend

**Simple meaning:** The part of the app users see.

**Feynman explanation:** Buttons, pages, forms, colors, and screens are frontend.

**Layman analogy:** The dining area of a restaurant.

---

### 11.11 Backend

**Simple meaning:** The behind-the-scenes part of the app.

**Feynman explanation:** It handles data, rules, login, payments, APIs, and server work.

**Layman analogy:** The kitchen of a restaurant.

---

### 11.12 Database

**Simple meaning:** A place where the app saves data.

**Feynman explanation:** If the app needs to remember users, tasks, notes, orders, or settings, it needs a database.

**Layman analogy:** A filing cabinet.

---

### 11.13 Auth

**Simple meaning:** Login and identity.

**Feynman explanation:** Auth checks who the user is and what they can access.

**Layman analogy:** Showing an ID card before entering a building.

---

### 11.14 API

**Simple meaning:** A way for apps to talk to each other.

**Feynman explanation:** The frontend asks the backend for data through an API.

**Layman analogy:** A waiter carrying your order to the kitchen.

---

### 11.15 Environment variable

**Simple meaning:** A safe setting used by the app.

**Feynman explanation:** It stores values like secret keys without putting them directly in code.

**Layman analogy:** A locked drawer where you keep spare keys.

---

### 11.16 Secret

**Simple meaning:** Private information like an API key or password.

**Feynman explanation:** A secret opens access to services. It must not be public.

**Layman analogy:** Your house key. Do not tape it to the front door.

---

### 11.17 API key

**Simple meaning:** A special key that lets your app use another service.

**Feynman explanation:** The service checks the key to know who is using it and who should be billed.

**Layman analogy:** A membership card for a private club.

---

### 11.18 Deploy

**Simple meaning:** Put your app online.

**Feynman explanation:** Your app moves from your private workspace to a link people can open.

**Layman analogy:** Moving food from the kitchen to the dining table.

---

### 11.19 Hosting

**Simple meaning:** The place where your app lives online.

**Feynman explanation:** A host keeps your app available so browsers can open it.

**Layman analogy:** Renting a shop for your business.

---

### 11.20 CI

**Simple meaning:** Automatic checking.

**Feynman explanation:** Every time you change your project, a robot checks if important things still work.

**Layman analogy:** A guard checking your bag before boarding a plane.

---

### 11.21 Test

**Simple meaning:** A check that proves something works.

**Feynman explanation:** A test asks the app to do something and checks if the answer is correct.

**Layman analogy:** Pressing the brake before driving.

---

### 11.22 Debugging

**Simple meaning:** Finding and fixing errors.

**Feynman explanation:** When something breaks, you look for the cause and repair it.

**Layman analogy:** Finding why a lamp will not turn on.

---

### 11.23 Monitoring

**Simple meaning:** Watching the app after it is online.

**Feynman explanation:** Monitoring tells you if the app is slow, broken, or down.

**Layman analogy:** A smoke alarm and security camera.

---

### 11.24 Error tracking

**Simple meaning:** Collecting app errors.

**Feynman explanation:** When users hit bugs, error tracking records what happened so you can fix it.

**Layman analogy:** A black box recorder on an airplane.

---

### 11.25 Uptime

**Simple meaning:** How often your app is online.

**Feynman explanation:** If your site works 99% of the time, its uptime is 99%.

**Layman analogy:** A shop being open when customers arrive.

---

### 11.26 Rollback

**Simple meaning:** Go back to the last working version.

**Feynman explanation:** If a new update breaks the app, rollback restores the previous safe version.

**Layman analogy:** Undo button for your app.

---

### 11.27 Wireframe

**Simple meaning:** A rough screen sketch.

**Feynman explanation:** Before building the app, draw where the buttons, text, and pages go.

**Layman analogy:** A house floor plan.

---

### 11.28 MVP

**Simple meaning:** The smallest useful version of your app.

**Feynman explanation:** Build only what is needed to prove the idea works.

**Layman analogy:** A simple sandwich before opening a full restaurant.

---

### 11.29 Local-first

**Simple meaning:** Your app can work with your own files or local data first.

**Feynman explanation:** The app should not depend on too many paid/cloud services too early.

**Layman analogy:** Keeping a copy of your notes in your own notebook.

---

### 11.30 Provider-agnostic

**Simple meaning:** Not locked into one company.

**Feynman explanation:** You design the app so you can switch tools later.

**Layman analogy:** Using a phone charger standard that works with many brands.

---

### 11.31 Full-stack

**Simple meaning:** Frontend plus backend.

**Feynman explanation:** A full-stack app has user screens and behind-the-scenes server/data logic.

**Layman analogy:** Restaurant dining area plus kitchen.

---

### 11.32 Server-side

**Simple meaning:** Runs on the server, not in the browser.

**Feynman explanation:** Secret and sensitive work should happen on the server.

**Layman analogy:** Counting cash in the back office, not in front of customers.

---

### 11.33 Client-side

**Simple meaning:** Runs in the user’s browser.

**Feynman explanation:** The browser shows the app and handles safe user interactions.

**Layman analogy:** The menu and table in a restaurant.

---

### 11.34 Prompt-to-app

**Simple meaning:** Describe an app in words and let AI create a first draft.

**Feynman explanation:** You tell the AI what you want, and it generates code. Then you test and improve it.

**Layman analogy:** Asking a builder to make a rough model from your description.

---

### 11.35 Token

**Simple meaning:** A small piece of text used by AI.

**Feynman explanation:** AI tools count text in pieces. More text means more token use.

**Layman analogy:** Paying by word chunks instead of pages.

---

### 11.36 Rate limit

**Simple meaning:** A limit on how often you can use a tool.

**Feynman explanation:** Services limit requests so systems do not get overloaded.

**Layman analogy:** A buffet that says “one plate at a time.”

---

### 11.37 Free tier

**Simple meaning:** Free use with limits.

**Feynman explanation:** A company lets you use a small amount for free. More use may need payment.

**Layman analogy:** A free sample at a store.

---

### 11.38 Cloud

**Simple meaning:** Someone else’s computer on the internet.

**Feynman explanation:** Instead of running everything on your laptop, you use servers online.

**Layman analogy:** Renting storage instead of building your own warehouse.

---

### 11.39 Static site

**Simple meaning:** A simple website without server logic.

**Feynman explanation:** The same files are sent to every visitor.

**Layman analogy:** A printed brochure.

---

### 11.40 Dynamic app

**Simple meaning:** An app that changes based on users or data.

**Feynman explanation:** It can log in users, save data, and show different information.

**Layman analogy:** A restaurant that cooks each order differently.

---

## 12. The cleanest “default stack” for you

Use this when you are unsure:

```text
Planning: ChatGPT / UNGASIS
Design: Figma Starter
Code home: GitHub
Editor: VS Code Desktop or vscode.dev
Cloud coding: GitHub Codespaces
AI coding help: GitHub Copilot Free or Cursor Hobby
AI prototype: Google AI Studio
Frontend deploy: Vercel
Database: Supabase or Neon
API testing: Postman Free
Error tracking: Sentry Developer
Uptime check: UptimeRobot Free
```

### Why this stack is good

It is:

- beginner-friendly
- mostly free or free with limits
- common in real projects
- easy to hand off to a developer
- not too heavy
- good for fast prototypes
- good enough for private MVPs

---

## 13. What to do when starting a new project

Follow these steps every time:

```text
1. Write the app idea in one sentence.
2. Ask ChatGPT / UNGASIS to make a simple app plan.
3. Make a GitHub repo.
4. Add README.md and PROJECT_WORKFLOW.md.
5. Build the smallest version.
6. Test it locally or in Codespaces.
7. Deploy to Vercel or Netlify.
8. Add Sentry and UptimeRobot.
9. Write the next 3 tasks.
10. Stop adding features until the first version works.
```

---

## 14. Copy-paste prompt for your next project

Use this prompt:

```text
Act as a patient senior app developer and beginner teacher.

I want to build a small app.

My app idea:
[write your idea here]

My skill level:
Beginner. I need simple English and step-by-step help.

My preferred workflow:
ChatGPT / UNGASIS → GitHub → VS Code or Codespaces → Vercel → Supabase or Neon → Sentry → UptimeRobot.

Please give me:
1. the smallest useful MVP
2. tools I should use
3. what not to build yet
4. simple file structure
5. first 10 steps
6. safety checks
7. how to test
8. how to deploy
9. glossary for hard words

Use simple English.
Do not overbuild.
Assume I am learning.
```

---

## 15. Source links checked

Tool limits and pricing change. Always check these links before spending money or launching a real product.

### Editors and cloud development

- VS Code for the Web: https://code.visualstudio.com/docs/setup/vscode-web
- GitHub Codespaces billing: https://docs.github.com/en/billing/concepts/product-billing/github-codespaces
- GitHub Actions billing: https://docs.github.com/en/billing/concepts/product-billing/github-actions
- CodeSandbox pricing: https://codesandbox.io/pricing
- StackBlitz pricing: https://stackblitz.com/pricing

### AI coding and app builders

- Google AI Studio Build mode: https://ai.google.dev/gemini-api/docs/aistudio-build-mode
- Gemini API pricing: https://ai.google.dev/gemini-api/docs/pricing
- Firebase Studio: https://firebase.google.com/docs/studio
- GitHub Copilot plans: https://github.com/features/copilot/plans
- Cursor pricing: https://cursor.com/pricing
- Windsurf pricing: https://windsurf.com/pricing
- Replit pricing: https://replit.com/pricing
- Bolt pricing: https://bolt.new/pricing

### Hosting and deployment

- Vercel pricing: https://vercel.com/pricing
- Netlify pricing: https://www.netlify.com/pricing/
- Cloudflare Pages limits: https://developers.cloudflare.com/pages/platform/limits/
- Cloudflare Workers pricing: https://developers.cloudflare.com/workers/platform/pricing/
- Firebase pricing: https://firebase.google.com/pricing

### Databases

- Supabase pricing: https://supabase.com/pricing
- Neon pricing: https://neon.com/pricing
- Turso pricing: https://turso.tech/pricing
- Cloudflare D1 pricing: https://developers.cloudflare.com/workers/platform/pricing/#d1

### Testing, debugging, and monitoring

- Postman pricing: https://www.postman.com/pricing/
- Sentry pricing: https://sentry.io/pricing/
- UptimeRobot pricing: https://uptimerobot.com/pricing/
- Checkly pricing: https://www.checklyhq.com/pricing/

---

## 16. Final simple rule

Use this stack first:

```text
GitHub + VS Code + Codespaces + Vercel + Supabase/Neon + Sentry + UptimeRobot
```

Use AI builders like this:

```text
Google AI Studio / Replit / Bolt
```

Use them to create the first version, but keep **GitHub as your main source of truth**.

That way you can switch tools later without losing your work.

---

## 17. Quick mini-check

Before starting your next app, answer these:

```text
1. What is the smallest useful version?
2. Where is the GitHub repo?
3. Where will I deploy it?
4. Where will data be saved?
5. How will I know if it breaks?
6. How can I undo a bad change?
```

If you can answer these, you are ready to start.

