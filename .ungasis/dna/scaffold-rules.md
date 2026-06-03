# scaffold-rules.md — Scaffolding Combination Rules

This file explains how to blend different genomes to spin up a new project instantly.

## COMBINATION RULES
1. **Always Base Genome First:** You must always load and copy the `base-genome.md` contents first.
2. **Add One Project Genome:** Add exactly one specialized genome (Next.js, HTML, or Power BI) depending on the build type.
3. **Never Mix Project Genomes:** Never mix React/Next.js files with static HTML guidelines. Also avoid Power BI DAX code in a Next.js environment. Keep genomes isolated.

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
4. **Step 4:** Fill out the placeholders in `QUEST_CONTEXT.md`. Include project name, stack, and revenue model.
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
- If you use the same stack or patterns 3+ times across projects, extract them. Save them in a new specialized genome (e.g. `react-native-genome.md`).

## Additional Context

### When to Use
Use scaffold rules when initializing new project folders and importing DNA genomes.

### Example
```markdown
- [ ] Initialize `projects/riftcoach` folder.
- [ ] Load `base-genome.md` and `nextjs-genome.md`.
- [ ] Complete `QUEST_CONTEXT.md` parameters.
```

### Tags
scaffold, dna, genomes, boilerplate

### See also
- [dna/base-genome.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/dna/base-genome.md)
- [dna/nextjs-genome.md](file:///c:/Users/63905/Downloads/ungasis/.ungasis/dna/nextjs-genome.md)

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
