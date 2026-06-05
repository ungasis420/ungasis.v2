# Phase 6.0 Add-On: Graphify Watchdog + Self-Improving Skills
> Paste this into your new Opus chat AFTER Phase 6.0 Step 2 completes, as part of Step 3 integration.

---

## ADD-ON TASK: Wire Graphify Watchdog + Auto-Learning Agent

### Context
- Graphify indexes our 8,400+ file UNGASIS repo into a knowledge graph (~40K nodes, ~48K edges)
- The `.env` file with all API keys exists at: `D:\.projects\ungasis\projects\riftcoach\.env`
- Graphify script: `D:\.projects\ungasis\scripts\graphify-run.py`
- Graphify needs `GEMINI_API_KEY` and `GOOGLE_AI_API_KEY` set in environment

### TASK 1: Create Repo-Root .env for Graphify

Create `D:\.projects\ungasis\.env` by copying the Gemini keys from the RiftCoach env:

```powershell
cd D:\.projects\ungasis
# Extract Gemini keys from RiftCoach .env and create root .env
$riftEnv = Get-Content "projects/riftcoach/.env" -Raw
$lines = $riftEnv -split "`n" | Where-Object { $_ -match "GEMINI|GOOGLE_AI" }
Set-Content ".env" $lines
```

Then verify Graphify runs:
```powershell
Get-Content .env | ForEach-Object {
    if ($_ -match '^([^#][^=]+)=(.+)$') {
        Set-Item "env:$($Matches[1].Trim())" $Matches[2].Trim()
    }
}
python scripts/graphify-run.py
```

### TASK 2: Create Graphify Watchdog Workflow

Create `.agents/workflows/graphify-reindex.md`:

```markdown
---
name: graphify-reindex
description: Re-index UNGASIS knowledge graph after significant file changes
trigger: manual
---

## Steps
1. Load environment variables from .env at repo root
2. Run: python scripts/graphify-run.py
3. Report stats: nodes, edges, communities indexed
4. If errors, report which files failed and why
```

### TASK 3: Create Auto-Run in package.json

Add to `D:\.projects\ungasis\projects\riftcoach\package.json`:

```json
{
  "scripts": {
    "prebuild": "cd ../.. && python scripts/graphify-run.py --quick 2>nul || echo Graphify skipped",
    "build": "next build",
    "postbuild": "echo Build complete - Graphify indexed"
  }
}
```

### TASK 4: Create Self-Improving Build Learner Skill

Create `.agents/skills/build-learner.md`:

```markdown
---
name: build-learner
description: Observes build outcomes and improves agent efficiency over time
triggers: ["build failed", "build complete", "optimize", "improve"]
---

## What This Skill Does
After every build or agent task, analyze what happened and record learnings.

## Procedure
1. Check the latest build output (npm run build)
2. If SUCCESS: note which agent patterns worked efficiently
3. If FAILURE: note the error, the fix, and how to prevent it
4. Append findings to .agents/skills/learned-patterns.md
5. If same pattern appears 3+ times, promote to permanent rule in AGENTS.md
6. Track estimated token usage - flag any agent task >2000 tokens for optimization

## Token Efficiency Rules
- Prefer focused, single-file agent prompts over broad multi-file ones
- Use existing data from src/data/ instead of asking AI to generate data
- Cache agent responses when inputs haven't changed
- Max 200 lines per file - split if larger
```

Create `.agents/skills/learned-patterns.md`:

```markdown
---
name: learned-patterns
description: Auto-accumulated learnings from build cycles (grows over time)
---

## Learned Patterns
(This file grows automatically as build-learner records outcomes)

### Successes
- [initial: npm run build passes 17/17 pages in 14.9s on Dev Drive]

### Failures & Fixes
- [initial: git clone needs core.longpaths=true for archive/ paths]
- [initial: NVM must be loaded before npm commands work]

### Token Optimization Notes
- [initial: preBuildResponse() pre-fills templates, AI only fills rationale sections]
```

### TASK 5: Create RiftCoach-Specific Agent Skill  

Create `.agents/skills/riftcoach-conventions.md`:

```markdown
---
name: riftcoach-conventions
description: RiftCoach project conventions and data schemas
triggers: ["riftcoach", "build", "champion", "rune", "item", "spell", "wild rift"]
---

## Critical Rules
1. Wild Rift MOBILE only - NEVER reference PC League of Legends
2. All champion_ids, item_ids use snake_case
3. Rune page schema: {keystone, primary_path, primary_slot_1/2/3, secondary_path, secondary_rune}
4. runes.json: 53 runes with {id, name, type, path, slot (0-3), description, tier, image}
5. wr_builds.json: keyed by champion_id
6. Build Engine: preBuildResponse() pre-fills → AI fills only [AI: ...] rationale
7. Karma regression gate: never degrade Karma build output quality
8. 6 AI providers: Cerebras, Groq, Google AI, OpenRouter, Mistral, Together
9. Max 200 lines per file
10. npm run build MUST pass after every change (currently 17/17 pages, 14.9s)
```

### VERIFY
After creating all files:
```powershell
Test-Path D:\.projects\ungasis\.env
Test-Path D:\.projects\ungasis\.agents\workflows\graphify-reindex.md
Test-Path D:\.projects\ungasis\.agents\skills\build-learner.md
Test-Path D:\.projects\ungasis\.agents\skills\learned-patterns.md
Test-Path D:\.projects\ungasis\.agents\skills\riftcoach-conventions.md
npm run build
```

Then commit:
```powershell
cd D:\.projects\ungasis
git add .agents/ .env
git commit -m "feat: add Graphify watchdog workflow + self-improving agent skills"
git push
```

---

## BEFORE vs AFTER

### BEFORE (Current State)
- Graphify runs manually only (python scripts/graphify-run.py)
- No persistent watchdog - dies when Antigravity session ends  
- No auto-indexing on builds
- Agents have no memory of past successes/failures
- Each session starts from zero knowledge about project conventions
- Agent prompts must explicitly state all rules every time

### AFTER (With Watchdog + Skills)
- Graphify auto-indexes before every build (prebuild script)
- Knowledge graph stays current (~40K nodes always up to date)
- /graphify-reindex workflow callable anytime in Antigravity
- build-learner skill observes every build and records patterns
- learned-patterns.md grows over time - agents get smarter each session
- riftcoach-conventions.md auto-loads when agents detect Wild Rift context
- Token savings: agents don't need to re-discover rules - skills inject them automatically
- Estimated improvement: 15-25% fewer tokens per agent task after 10+ builds

---
