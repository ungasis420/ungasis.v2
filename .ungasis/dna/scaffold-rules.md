# scaffold-rules.md — Scaffolding Combination Rules

This file explains how to blend different genomes to spin up a new project instantly.

## COMBINATION RULES
1. **Always Base Genome First:** You must always load and copy the `base-genome.md` contents first.
2. **Add One Project Genome:** Add exactly one specialized genome (Next.js, HTML, or Power BI) depending on the build type.
3. **Never Mix Project Genomes:** Never mix React/Next.js files with static HTML guidelines, or Power BI DAX code in a Next.js environment. Keep genomes isolated.

## GENOME MATRIX TABLE

| Project Type | Base Genome Loaded? | Specialized Genome Loaded? | Key Output Files |
|---|---|---|---|
| Next.js App | Yes | `nextjs-genome.md` | Next.js boilerplate config, TS config |
| Static HTML | Yes | `html-genome.md` | index.html, CSS tokens, tools/ scripts |
| Power BI | Yes | `powerbi-genome.md` | theme JSON, DAX pattern references |
| Future | Yes | Add custom type | custom configs |

## 60-SECOND SCAFFOLD SOP

Follow these 7 steps to create a new project folder and launch development in under a minute:

1. **Step 1:** Open PowerShell and create a new directory for the project inside the projects folder.
   ```powershell
   mkdir c:\Users\63905\Downloads\ungasis\projects\my-awesome-app
   cd c:\Users\63905\Downloads\ungasis\projects\my-awesome-app
   ```
2. **Step 2:** Copy the base genome configs:
   ```powershell
   copy c:\Users\63905\Downloads\ungasis\.ungasis\dna\base-genome.md .
   ```
3. **Step 3:** Copy the matching specialized genome (e.g., HTML):
   ```powershell
   copy c:\Users\63905\Downloads\ungasis\.ungasis\dna\html-genome.md .
   ```
4. **Step 4:** Fill out the placeholders in `QUEST_CONTEXT.md` (project name, description, target user, revenue model, stack).
5. **Step 5:** Initialize the git repository and make your first commit.
   ```powershell
   git init
   git add .
   git commit -m "Quest initialized from UNGASIS DNA"
   ```
6. **Step 6:** Update the AST code representation graph.
   ```powershell
   graphify .
   ```
7. **Step 7:** Open your AI chat interface, paste the updated `SESSION_STARTER.md` file, and begin your coding quest.

## WHEN TO CREATE A NEW GENOME
- If you notice you are using the same custom stack or configuration patterns 3 or more times across different projects, extract those files into a new specialized genome (e.g., `react-native-genome.md`).

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
