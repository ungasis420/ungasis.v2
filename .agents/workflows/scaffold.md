---
name: scaffold
description: Scaffold a new project using UNGASIS DNA genomes in 60 seconds.
---
Follow the 60-second scaffold SOP from .ungasis/dna/scaffold-rules.md:
1. Ask: project name + type (nextjs/html/powerbi)
2. Create project folder
3. Copy base-genome files
4. Copy project-type genome files
5. Fill in QUEST_CONTEXT.md with project details
6. git init + first commit "Quest initialized from UNGASIS DNA"
7. graphify .
8. Generate SESSION_STARTER.md

## Output Location
All scaffolded projects MUST be created inside projects/ folder:
- projects/[project-name]/
- NOT in the workspace root
- NOT inside .ungasis/ or any engine folder

Example:
/scaffold riftcoach → creates projects/riftcoach/
/scaffold my-saas-app → creates projects/my-saas-app/

The scaffold copies DNA genome templates and adapts them to the
project name, then creates the standard folder structure:
projects/[name]/
├── package.json (from genome)
├── tsconfig.json (from genome)
├── src/
│   ├── app/ (Next.js pages)
│   └── lib/ (utilities)
├── public/
└── README.md (project-specific)

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
