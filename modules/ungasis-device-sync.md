# Device Sync Protocol — Never Lose Your Place

This module defines the protocol for syncing context between devices.

---

## 1. The Relay Race Analogy
Working across multiple devices is like running a **relay race**:
* **The Baton:** Your `CONTEXT.md` file is the baton. It contains all the context and information about the current state of your project.
* **The Handover:** If you drop the baton or forget to pass it, the runner behind you cannot run. When switching from your Work Laptop to your Personal PC, you must hand over the baton (`git push` and update `CONTEXT.md`) so the next device has the context ready.

---

## 2. The 3 Golden Rules

> [!IMPORTANT]
> Always follow these three rules whenever you switch devices:
> 1. **Rule 1 — Update `CONTEXT.md`:** Always update your project context file with your latest progress before finishing.
> 2. **Rule 2 — Git Push:** Always push your code changes to GitHub before leaving a device.
> 3. **Rule 3 — Git Pull:** Always pull the latest changes when starting on a new device.

---

## 3. Session Handoff Template
Use this markdown template to summarize your session when you stop work:

```markdown
# Session Handoff — [Quest Name]

* **Device:** [💻 Laptop / 📱 Phone / 📁 Tablet / 🖥️ PC]
* **Duration:** [X minutes / hours]
* **Timestamp:** [YYYY-MM-DD HH:MM]

### 1. What Got Done
* [x] Completed task 1...
* [x] Completed task 2...

### 2. Files Changed
* [MODIFY] `path/to/file.tsx` (Status: Tested & Passes)
* [NEW] `path/to/newfile.ts` (Status: Initial Scaffold)

### 3. Blockers
* None / [Describe block if any]

### 4. Next 3 Tasks
1. [Next Task 1]
2. [Next Task 2]
3. [Next Task 3]
```

---

## 4. Session Start Checklist per Device

| Device | Session Start Steps |
|---|---|
| **Personal PC** | 1. Open Terminal.<br>2. Run `git pull`.<br>3. Open Antigravity Desktop or CLI (`agy`).<br>4. Type `/context-pack` to load state.<br>5. Start building. |
| **Work Laptop** | 1. Open Browser.<br>2. Load Codespace.<br>3. Open Terminal and run `git pull`.<br>4. Run Cline or type `agy`.<br>5. Type `/context-pack` to load state.<br>6. Start building. |
| **Android Phone** | 1. Open GitHub Mobile App.<br>2. Review current PRs or issues.<br>3. Open Spck Editor for quick files/edits.<br>4. Commit and push. |
| **Android Tablet** | 1. Open Termux.<br>2. Start `code-server` or load browser Codespace.<br>3. Run `git pull`.<br>4. Start editing. |

---

## 5. Conflict Resolution Rules

If running `git pull` fails due to a merge conflict:
* **For `CONTEXT.md`:** Always keep the **NEWER** version of `CONTEXT.md` (the one with the latest timestamp). You can overwrite the older one.
* **For Code Files:**
  1. Run `git stash` to temporarily save your local changes.
  2. Run `git pull` to fetch the remote code.
  3. Run `git stash pop` to apply your changes on top.
  4. Resolve conflicts manually in the editor if files clash.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
