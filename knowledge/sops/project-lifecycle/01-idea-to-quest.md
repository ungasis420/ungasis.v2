# 01-idea-to-quest.md — Idea to Quest Scaffolding

## Trigger
A new coding idea or feature request needs to become an active project workspace.

## Steps
1. **Validate the Idea:** Answer the 5 core validation questions:
   - Who has this problem?
   - Who is the competition?
   - Is there a willingness to pay?
   - Can we build the MVP in <20 hours?
   - Can we reach 100 users in 30 days?
2. **Create Directories:**
   Create a new folder under `C:\Projects\<project-name>` and navigate into it.
3. **Copy DNA Genome:**
   Copy `base-genome.md` and the matching specialized genome (Next.js, HTML, or Power BI) from UNGASIS DNA to the project.
4. **Fill Quest Context:**
   Fill in the `QUEST_CONTEXT.md` placeholder fields (project name, description, stack, target user, revenue model).
5. **Git Initialization:**
   Initialize git repository:
   `git init && git add . && git commit -m "Quest initialized from UNGASIS DNA"`
6. **Build Code Graph:**
   Run the graphify tool:
   `graphify .`
7. **Launch Agent Session:**
   Open the AI tool, paste the complete `SESSION_STARTER.md` content, and start building.

## Time to Complete
~60 seconds (1 minute).

## Expected Output
A new project directory with git initialized, DNA files configured, and a generated graphify database.

## Gotchas
- Always make sure you do not mix Next.js files and static HTML genomes. Load one specialized genome only.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
