# Claude Code Prompt: Update CommandsPage with Feynman Glossary

## Launch Command
```powershell
cc -turns 7
```

## /goal Prompt (paste after launch)

```
/effort low
/goal Add Feynman glossary + analogies to CommandsPage

READ FIRST: CLAUDE.md, dashboard/src/pages/commands-data.ts, dashboard/src/pages/CommandsPage.tsx

PATH: D:\.projects\ungasis

PROBLEM:
- commands-data.ts has 49 commands with basic descriptions
- No Feynman/layman analogies for technical jargon
- Users (ESL speakers) need simple explanations of WHY each command matters
- commands-data.ts is >200 lines (pre-flight flags it) — needs splitting

TASKS (in order):

1. READ dashboard/src/pages/commands-data.ts — understand current data structure

2. SPLIT commands-data.ts into 2 files (to fix >200 line issue):
   - dashboard/src/data/commands.ts — command entries (sections, commands, descriptions)
   - dashboard/src/data/glossary.ts — Feynman glossary entries
   - Update CommandsPage.tsx imports accordingly

3. ADD a "feynman" field to each command entry containing a 1-sentence kitchen/sports analogy:
   Example entries:
   - startup-sequence.py: "Like checking your kitchen is clean before you start cooking"
   - session-close.ps1: "Like locking up the restaurant at the end of the night — one checklist covers everything"
   - context-inject.py: "Like a librarian who picks only the 3 books you need instead of giving you the whole library"
   - battle-test.ps1: "Like a fire drill — you practice to make sure everything works when it matters"
   - wiki-lint.py: "Like spell-check for your recipe book — catches missing pages and formatting issues"
   - task-router.py: "Like a restaurant host who seats you at the right table — big party gets big table"
   - one-shot-build.ps1: "Like a dishwasher — dirty dishes in, clean dishes out, one button"
   - pre-flight.py: "Like a pilot checking instruments before takeoff"
   - post-flight.py: "Like a QA inspector checking the finished car before it leaves the factory"
   - self-heal.py: "Like a cut that scabs over — the system tries to fix itself before asking for help"
   - jarvis-score.py: "Like a report card — one number that tells you your overall grade"
   - token-budget.py: "Like checking your wallet before shopping — know how much you can spend today"
   - wiki-query.py: "Like searching your recipe book for 'chicken' — finds all recipes with that ingredient"
   - graph-search.py: "Like Google Maps for your project — finds connections between files"
   - cross-project.py: "Like sharing cooking tips between your Italian and Mexican kitchens"
   - wrap-up.py: "Like a quick cleanup — wipe counters, not a full deep clean"
   - graph-relabel.py: "Like renaming folders from 'Folder1' to 'Kitchen Recipes' — now you know what's inside"
   - auto-trigger.py: "Like a motion-sensor light — turns on automatically, no switch needed"
   - session-recovery.py: "Like the 'resume' button on a paused movie — picks up right where you left off"
   - verifier.py: "Like a food safety inspector — checks 5 rules, gives PASS or FAIL"
   - Generate analogies for ALL remaining commands following the same pattern

4. CREATE dashboard/src/data/glossary.ts with 50 technical terms:
   Structure: { term: string, definition: string, analogy: string }
   Include ALL terms from the UNGASIS Feynman Glossary (token, context window, graphify, etc.)

5. UPDATE CommandsPage.tsx:
   - Add a "📖 Glossary" toggle section at the top (collapsed by default)
   - When expanded: shows glossary as a searchable card grid
   - Each card: term (bold), definition (small text), analogy (italic, with 🍳 emoji)
   - Glassmorphism styling: bg-white/[0.04], backdrop-blur-xl, border-white/10
   - For each command card: show the Feynman analogy below the description in italic
   - ALL colors as inline hex (NEVER Tailwind color classes)

6. VERIFY: npm run build (from dashboard/ directory)

CONSTRAINTS:
- Path: D:\.projects\ungasis
- Max 200 lines per file — split if needed
- Glassmorphism design DNA: #0a0a1a base, #00d4ff accent, #a78bfa secondary
- ALL chart/UI colors as inline hex — NEVER Tailwind color classes
- Text ≥12px, contrast ≥4.5:1
- TypeScript strict mode, no `any`
- Staleness footer not needed for .ts/.tsx files

DO NOT TOUCH: CLAUDE.md, .env, archive/, source-files/, App.tsx (unless import path change needed)

Git: feat: CommandsPage Feynman glossary + command analogies + data file split
```

## Expected Outcome

| Before | After |
|--------|-------|
| commands-data.ts: 1 file, >200 lines | 2 files: commands.ts + glossary.ts (each <200 lines) |
| No Feynman analogies | Every command has a 1-sentence kitchen/sports analogy |
| No glossary | 50-term searchable glossary with toggle |
| Technical jargon unexplained | Every term has "What it is" + "Kitchen analogy" |

## Token Budget Estimate

| Step | Est. Tokens |
|------|-------------|
| Read existing files | ~2K |
| Split + add analogies | ~4K |
| Create glossary.ts | ~3K |
| Update CommandsPage.tsx | ~3K |
| Build verify | ~1K |
| **Total** | **~13K** |

## Pre-Flight Reminder

Before running this prompt:
1. Make sure you're in `D:\.projects\ungasis`
2. Run `git status` — commit any pending changes first
3. The `cc` wrapper will remind you about /effort low
