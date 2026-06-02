# Cross-Device Workflow — Work From Anywhere

This module documents how to work across 4 devices seamlessly.

---

## 1. The Kitchen Analogy
Working across different devices is like cooking in different kitchens:
* **Work Laptop (Hotel Kitchen):** Highly regulated, lots of rules and IT restrictions. You can only use the tools provided by the hotel (web browser).
* **Android Phone (Camping Stove):** Tiny and portable. You can't cook a 5-course feast, but you can boil water, make coffee, or do a quick fry-up on the go.
* **Android Tablet (Food Truck):** Mobile and decent size. Perfect with a Bluetooth keyboard. You can do serious cooking, but you are still a bit space-limited.
* **Personal PC (Home Kitchen):** Your ultimate cooking space. Full electricity, no restrictions, all major appliances (Ollama, local GPUs, desktop IDEs) installed.

---

## 2. Device Capability Matrix

| Tool Name | Work Laptop | Phone | Tablet | PC |
|---|---|---|---|---|
| **M365 Copilot** | ✅ Browser | ✅ App | ✅ App / Web | ✅ Web |
| **ChatGPT Enterprise** | ✅ Browser | ✅ App | ✅ App / Web | ✅ Web |
| **Google AI Studio** | ✅ Browser | ✅ Browser | ✅ Browser | ✅ Browser |
| **Antigravity CLI (`agy`)** | ❌ Restricted | ✅ Termux | ✅ Termux | ✅ Native |
| **Antigravity Desktop** | ❌ Restricted | ❌ No | ❌ No | ✅ Native |
| **Cline (VS Code)** | ✅ Codespaces | ❌ Browser-only | ✅ Web Codespaces | ✅ Native/Codespaces |
| **VS Code Copilot** | ✅ Codespaces | ❌ No | ✅ Web Codespaces | ✅ Native |
| **Google Jules** | ✅ GitHub | ✅ GitHub | ✅ GitHub | ✅ GitHub |
| **GitHub Codespaces** | ✅ Browser | ✅ Browser | ✅ Browser | ✅ Native / Web |
| **Termux** | ❌ No | ✅ Installed | ✅ Installed | ❌ No (Linux/Windows) |
| **Acode** | ❌ No | ✅ App | ✅ App | ❌ No |
| **Spck Editor** | ❌ No | ✅ App | ✅ App | ❌ No |
| **GitHub Mobile** | ❌ No | ✅ App | ✅ App | ❌ No |
| **Replit** | ✅ Browser | ✅ Mobile App | ✅ Web / App | ✅ Browser |
| **Termius** | ❌ Restricted | ✅ App | ✅ App | ✅ App |
| **Ollama** | ❌ Restricted | ❌ No | ❌ No | ✅ Installed |

---

## 3. Daily Workflow Pattern

```
[Morning Commute]   -->   [Office Hours]   -->   [Lunch Break]   -->   [Evening / Home]   -->   [Bedtime]
   Phone App                 Work Laptop            Phone App              Personal PC            Phone App
  Review Jules             Codespaces Build       Quick Fixes /          Full Power Build        Assign 30 Jules
    PRs & Plan              (Plan & Code)          Inspect Live App       with Desktop / IDE      Tasks Overnight
```

* **Morning (Phone):** Check GitHub Mobile app. Review and merge Jules overnight PRs. Open M365 Copilot to outline the day's tasks.
* **Office (Work Laptop):** Log into GitHub Codespaces via browser. Use M365 Copilot for planning, and Cline for building code.
* **Lunch (Phone):** Quick mobile web testing. Use Acode or Spck Editor for quick file tweaks.
* **Home (Personal PC):** Open VS Code/Antigravity Desktop locally. Run heavy builds and use local Ollama models.
* **Bedtime (Phone):** Assign 30 tasks to Jules via GitHub Issues/PRs to run automated checks and documentation updates overnight.

---

## 4. Emergency Fix Scenarios

* **Bug in Production (Phone + Spck Editor):**
  1. Open Spck Editor on your phone.
  2. Git pull the repository, locate the bug, and apply the fix.
  3. Git commit & push. Cloudflare auto-deploys the fix instantly.
* **Need Full IDE Urgently (Phone + Termux + code-server):**
  1. Open Termux on your phone.
  2. Start `code-server` pointing to your local repository.
  3. Open your mobile browser at `localhost:8080` to access a full VS Code IDE.
* **PR Needs Review NOW (Phone + GitHub Mobile):**
  1. Open GitHub Mobile.
  2. Scroll through files tab, review diffs, write feedback, and merge the branch.

---

## 5. Context Sync Rules

> [!WARNING]
> To prevent code conflicts and lost progress, always follow these rules when switching devices:
> 1. **Update CONTEXT.md:** Always update `CONTEXT.md` with your current task status before closing your session.
> 2. **Git Push:** Always git push your active branch when leaving a device.
> 3. **Git Pull:** Always git pull the latest changes before starting to type on a new device.

---

## 6. Per-Device Quick Start Guide

* **Personal PC:**
  1. Open Command Prompt/Terminal.
  2. Run `git pull`.
  3. Launch Antigravity Desktop or CLI.
  4. Type `/context-pack` to load state and begin.
* **Work Laptop:**
  1. Launch browser and go to your GitHub repository.
  2. Open Codespace.
  3. Run `git pull` in the integrated terminal.
  4. Run Cline or type `agy` to begin.
* **Android Phone / Tablet:**
  1. Open GitHub Mobile or Termux.
  2. Run `git pull` inside Termux or Spck Editor.
  3. Review status, run local preview in Termux, or edit files.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
