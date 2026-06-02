# Antigravity Ecosystem — Setup, Usage & Reference

This module documents the Google Antigravity ecosystem for UNGASIS OS.

---

## 1. The Kitchen Analogy
Imagine your development workspace is a restaurant kitchen. The different tools in the Antigravity ecosystem are different chef roles and spaces:
* **Antigravity Desktop / IDE (Full Factory Kitchen):** The massive, fully equipped main kitchen where you prepare complex dishes, look at the visual presentation, and have all high-end tools in front of you.
* **Antigravity CLI `agy` (Speed Chef):** The fast line chef working with a single knife and fire in the terminal. No visual clutter, just raw speed for immediate tasks.
* **Antigravity SDK (Custom Tool Maker):** The engineer who builds custom grills, blenders, and stoves to automate cooking patterns.

---

## 2. Product Comparison

| Surface | What It Is | Interface | Best For | Install Method | Device Access | Cost |
|---|---|---|---|---|---|---|
| **Antigravity 2.0 Desktop** | Standalone GUI App | Visual Window | Visual development & workspace management | Native Installer | Personal PC | Free |
| **Antigravity CLI (`agy`)** | Terminal Client | TUI (Text Interface) | Speed, automation, keyboard-only builds | curl command | Work Laptop, Phone, Tablet, Personal PC | Free |
| **Antigravity IDE** | Custom VS Code Fork | Full Visual Code Editor | Direct coding & workspace management | Native Installer | Personal PC | Free |
| **Antigravity SDK** | Python Library | Code API | Building custom agents and workflows | `pip install` | Work Laptop, Personal PC | Free |

---

## 3. Rate Limits & Subscription Tiers

| Metric | Free Tier | AI Pro Tier ($19.99/mo) |
|---|---|---|
| **Daily Compute Limits** | Baseline usage | **4x Free limits** |
| **Backlash Boost** | 1x | **9x Post-Backlash boost** |
| **Refresh Cycle** | 24 Hours | **5-Hour Refresh Cycle** |
| **Traffic Priority** | Standard | **Priority Traffic** (No queues) |

---

## 4. Model Selection Guide

| Model Name | Tier / Profile | Best For | Speed |
|---|---|---|---|
| **Gemini 3.5 Flash Medium** | Baseline | Daily tasks, simple edits, quick answers | Extremely Fast |
| **Gemini 3.5 Flash High** | Mid-tier | Complex multi-file tasks, code refactoring | Fast |
| **Gemini 3.1 Pro Low / High** | Advanced | Deep reasoning, system architecture design | Moderate |
| **Claude Sonnet 4.6** | Advanced | Highest code quality, clean syntax | Moderate |
| **Claude Opus 4.6** | Expert | Hardest algorithmic problems, debugging complex logic | Slow |
| **GPT-OSS 120B** | Alternative | Variety, general task execution | Moderate |

---

## 5. Key Configuration Files

* **`GEMINI.md`** (Project Root): Workspace-specific instructions that tell Antigravity who you are and what to do in this project.
* **`~/.gemini/GEMINI.md`** (Global Home): Global instructions shared across all your projects on this computer.
* **`.agents/rules/`** (Workspace Rules): Active rule files that guide agent behavior.
* **`.agents/skills/`** (Slash Commands): Folder containing custom commands you can run inside the chat interface.
* **`.agents/workflows/`** (Repeatable Processes): Step-by-step automation playbooks.

---

## 6. Key Slash Commands & Shortcuts

* **`/goal`**: Run the agent continuously until the entire objective is fully achieved (useful for long-running builds).
* **`/context`**: Show the current context window size and remaining token budget.
* **`Ctrl+R`**: Review generated artifacts and changes.
* **`y`**: Accept and approve a proposed code change or file edit.
* **`Ctrl+D` or `/exit`**: Quit the current Antigravity session.

---

## 7. Setup Guide for Personal PC

1. **Install command:** Open PowerShell and run:
   ```powershell
   curl -fsSL https://antigravity.google/cli/install.sh | bash
   ```
2. **Authenticate:** Run the login command and follow the browser instructions:
   ```powershell
   agy auth login
   ```
3. **First run:** Start the interactive interface in your project folder:
   ```powershell
   agy
   ```

---

## 8. Setup Guide for GitHub Codespaces

1. **Auto-Install:** Set up in `.devcontainer/devcontainer.json` to install automatically.
2. **Manual Terminal Run:** If needed, run the install script inside the Codespace terminal:
   ```bash
   curl -fsSL https://antigravity.google/cli/install.sh | bash
   ```
3. **Start Client:** Simply type:
   ```bash
   agy
   ```

---

## 9. Tool Coexistence & Integration

* **Antigravity and Cline:** Both read `AGENTS.md` in the project root to share basic constraints. However, they keep their detailed configuration files separate (Cline reads `.clinerules/` and `CLAUDE.md`, Antigravity reads `.agents/` and `GEMINI.md`).
* **Jules with Antigravity:** Use Antigravity for active local building. Once complete, git push your changes. Assign Jules to run automated checks or write unit tests overnight by creating a GitHub issue.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
