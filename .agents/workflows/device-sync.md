# Device Sync Workflow

## Purpose
A checklist and set of rules to sync progress seamlessly across devices (Laptop, Phone, Tablet, PC).

## Git Commands
Use these commands to sync changes with the remote repository:

| Operation | Command | Purpose |
|---|---|---|
| **Pull latest** | `git pull origin main` | Get updates before starting work |
| **Stage changes** | `git add .` | Stage all modified and new files |
| **Commit** | `git commit -m "Quest progress update"` | Commit with descriptive message |
| **Push** | `git push origin main` | Upload changes to git remote |

---

## CONTEXT.md Update Template
Every time a device sync is prepared, update the context file with this template:

```markdown
# Session State

- **Current Device**: [Laptop | Phone | Tablet | PC]
- **Last Sync Time**: [YYYY-MM-DD HH:MM]
- **Completed in Last Session**:
  - [ ] Task 1
- **Current Blockers**: None
- **Next Actions**:
  - [ ] Task 2
```

---

## Session Start Checklist per Device
Before beginning a quest session on any device, go through this checklist:
- [ ] Run `git pull origin main` to ensure your local repository is up to date.
- [ ] Verify you have the correct API keys loaded in your environment.
- [ ] Read the current state in [CONTEXT.md](file:///c:/Users/63905/Downloads/ungasis/context/README.md).
- [ ] Initialize the agent using the `context-pack` skill.

---

## Conflict Resolution Rules
If a git merge conflict occurs between devices, follow these steps:
1. **Identify**: Run `git status` to find files with conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).
2. **Prioritize**: Keep changes that contain the most complete information.
3. **Manual Merge**: Open the conflicted file, clean up the markers, and select the correct content.
4. **Test**: Ensure the files still adhere to style guides and have valid footers.
5. **Commit**: Save and commit the resolved files with `git commit -m "Resolved sync conflict between devices"`.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
