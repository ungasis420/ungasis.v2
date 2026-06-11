# Remove Yourself as the Bottleneck
> **The Autonomous Pipeline — Commander Mode**
> **Goal:** You do 3 things. Machines do everything else.

---

## YOUR ONLY 3 JOBS

| # | Job | Time | Everything Else |
|---|-----|------|-----------------|
| 1 | **DECIDE** what to build | 15 min | Machines plan the execution |
| 2 | **APPROVE** or reject PRs | 10 min | Machines wrote, tested, committed the code |
| 3 | **HUMAN-ONLY** tasks | As needed | Payments, app store accounts, phone testing, user interviews |

**Everything else is a bottleneck you can eliminate.**

---

## WHERE YOU'RE THE BOTTLENECK TODAY

| Bottleneck | What You Do Now | Time Wasted | Fix |
|-----------|----------------|-------------|-----|
| Copy-paste prompts | Copy from Opus chat → paste into terminal | 5 min/task | Auto-pipe: Opus saves .md → Claude Code reads it |
| Run commands manually | `npm install`, `npm run build`, `git add`, `git push` | 10 min/sprint | Git hooks + npm scripts auto-chain |
| Monitor agents | Watch terminal, wait for output, check for errors | 20 min/sprint | Claude Code `/automode on` + hooks report results |
| Create handoff docs | Manually write state + next steps for next session | 15 min/session | Claude Code auto-generates handoff on `/done` |
| Load context each session | Re-explain project rules, conventions, file structure | 10 min/session | CLAUDE.md auto-loads (0 min) |
| Sequential execution | Build one thing → wait → build next | 30 min wasted | Parallel: Claude Code + Jules + Antigravity simultaneously |
| Context-switch tools | Jump between Opus, terminal, VS Code, Antigravity, browser | 15 min/session | One-prompt cascade: everything flows from single input |
| Fix build errors | Read error → think → ask AI → paste fix → rebuild → repeat | 20 min/sprint | Claude Code autonomous fix loop: `claude "fix until green"` |
| Git operations | Stage, commit message, push, create branch | 5 min/commit | Claude Code does all git operations natively |
| **TOTAL WASTED** | | **~130 min/sprint** | **Recoverable** |

---

## THE AUTONOMOUS PIPELINE

### Current Flow (You = Every Step)

```
YOU think of feature
  → YOU write prompt in Opus
    → YOU copy prompt
      → YOU paste into terminal
        → YOU run claude
          → YOU watch output
            → YOU read errors
              → YOU ask to fix
                → YOU verify fix
                  → YOU run build
                    → YOU git add
                      → YOU git commit
                        → YOU git push
                          → YOU update handoff
                            → YOU plan next task
13 STEPS. YOU are in every single one.
```

### New Flow (You = 2 Steps)

```
YOU describe goal in Opus (1 prompt)
  → Opus generates sprint.md (saved to docs/)
    → YOU paste ONE trigger into Claude Code
      ════════════════════════════════════════
      EVERYTHING BELOW IS AUTOMATIC:
      ════════════════════════════════════════
      → Claude Code reads CLAUDE.md (auto-context)
      → Claude Code reads sprint.md (auto-plan)
      → Claude Code /batch → 5 subagents spawn
      → Jules assigned 2 background tasks (async)
      → Subagents build in parallel
      → Each subagent: code → test → fix → test → pass
      → Auto-commit with smart messages
      → Auto-push to branch
      → Graphify re-indexes (post-commit hook)
      → build-learner records outcomes
      → Claude generates summary PR
      → YOU get notification: "Sprint complete. 3 PRs ready."
      ════════════════════════════════════════
      → YOU review PRs → approve or request changes
      → Machines merge + deploy if approved
2 STEPS. You DECIDE and APPROVE. That's it.
```

---

## THREE AUTOMATION LEVELS

### Level 1: FREE (Now — Git Hooks + npm Scripts)

No subscription needed. Set this up today.

#### Git Pre-Commit Hook
Create `.git/hooks/pre-commit`:
```bash
#!/bin/bash
# Auto-lint + auto-format before every commit
echo "🔍 Pre-commit: linting..."
npx eslint src/ --fix --quiet 2>/dev/null
npx prettier --write src/ --log-level error 2>/dev/null

# Block commits with API keys
if grep -r "sk-" src/ --include="*.ts" --include="*.tsx" -l; then
  echo "❌ BLOCKED: API key found in source code!"
  exit 1
fi
echo "✅ Pre-commit passed"
```

#### Git Post-Commit Hook
Create `.git/hooks/post-commit`:
```bash
#!/bin/bash
# Auto-push + auto-index after every commit
echo "📤 Auto-pushing to origin..."
git push origin $(git branch --show-current) 2>/dev/null &

echo "📊 Re-indexing Graphify..."
cd ../.. && python scripts/graphify-run.py --quick 2>/dev/null &
echo "✅ Post-commit complete"
```

#### npm Scripts (package.json)
```json
{
  "scripts": {
    "prebuild": "echo '🔨 Pre-build checks...' && tsc --noEmit",
    "build": "next build",
    "postbuild": "echo '✅ Build passed' && node scripts/record-build.js",
    "sprint": "npm run build && git add -A && git commit -m 'sprint: auto-commit' && git push",
    "fix": "npx eslint src/ --fix && npx prettier --write src/",
    "qa": "npm run build && echo '✅ QA passed'"
  }
}
```

#### PowerShell Profile Aliases
Add to `~\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`:
```powershell
# One-command sprint execution
function Sprint {
    param([string]$msg = "sprint: auto-commit")
    Set-Location "D:\.projects\ungasis\projects\riftcoach"
    npm run build
    if ($LASTEXITCODE -eq 0) {
        git add -A
        git commit -m $msg
        git push
        Write-Host "✅ Sprint committed and pushed" -ForegroundColor Green
    } else {
        Write-Host "❌ Build failed — fix before committing" -ForegroundColor Red
    }
}

# Quick nav
function rift { Set-Location "D:\.projects\ungasis\projects\riftcoach" }
function ung { Set-Location "D:\.projects\ungasis" }
```

**Time saved: ~30 min/sprint. Cost: $0.**

---

### Level 2: Claude Pro ($20/mo — Autonomous Coding)

#### CLAUDE.md (Auto-Context — Put in Project Root)
```markdown
# RiftCoach — Claude Code Context

## Project
Wild Rift coaching app with AI-powered builds. Next.js 15, React 19, TypeScript, Tailwind 4.

## Critical Rules
- Wild Rift MOBILE only — NEVER reference PC League
- All IDs = snake_case
- Max 200 lines per file — split if larger
- npm run build MUST pass after every change
- Karma regression gate: never degrade Karma builds

## Architecture
- 6 AI providers: Cerebras, Groq, Google AI, OpenRouter, Mistral, Together
- Build Engine: preBuildResponse() pre-fills → AI fills [AI: ...] rationale only
- Data: src/data/ (wr_builds.json, runes.json, items.json)

## On Every Task
1. Read this file first
2. Run npm run build before committing
3. If build fails, fix autonomously until it passes
4. Commit with descriptive message
5. Record what worked in .agents/skills/learned-patterns.md

## File Map
- src/app/ → Next.js App Router pages
- src/components/ → React components
- src/lib/ → Utilities, types, agent logic
- src/data/ → JSON data files
- public/ → Static assets
```

#### The One-Prompt Sprint
Instead of 13 manual steps, you paste ONE prompt:
```
Read sprint.md in docs/. Execute all tasks in order.
For each task:
1. Implement the changes
2. Run npm run build
3. If it fails, fix until it passes
4. Commit with a descriptive message
After all tasks, generate a summary of what changed and push to a new branch.
```

Claude Code then:
- Reads CLAUDE.md automatically (context loaded)
- Reads sprint.md (plan loaded)
- Executes each task sequentially or via /batch in parallel
- Auto-fixes build errors
- Auto-commits after each task
- Pushes to branch
- Reports summary

**You did nothing except paste one prompt.**

#### Autonomous Fix Loop
```
claude "fix all build errors until npm run build passes. Do not ask me anything. Just fix."
```
Claude Code enters a loop:
```
Build → Error → Read error → Fix → Build → Error → Fix → Build → ✅ Pass
(All automatic. You can go make coffee.)
```

**Time saved: ~60 min/sprint. Cost: $20/mo.**

---

### Level 3: Full Autonomy ($40/mo — The Commander Stack)

#### Parallel Execution Matrix

```
6:00 PM  YOU: Paste one prompt into Claude Code
         ┌──────────────────────────────────────────────┐
         │ CLAUDE CODE reads sprint.md                   │
         │   → Spawns /batch with 4 subagents            │
         │   → Agent 1: build-optimizer.ts               │
         │   → Agent 2: meta-analyst.ts                  │
         │   → Agent 3: draft-advisor.ts                 │
         │   → Agent 4: matchup-analyst.ts               │
         └──────────────┬───────────────────────────────┘
                        │ (simultaneously)
         ┌──────────────▼───────────────────────────────┐
         │ JULES (background, no terminal needed)        │
         │   → Task 1: "Add error boundaries to routes"  │
         │   → Task 2: "Write unit tests for lib/"       │
         │   → Returns PRs when done                     │
         └──────────────┬───────────────────────────────┘
                        │ (simultaneously)
         ┌──────────────▼───────────────────────────────┐
         │ ANTIGRAVITY (scheduled)                       │
         │   → Agent Manager: 2 Gemini agents on UI      │
         │   → Graphify: auto-reindex                    │
         └──────────────┬───────────────────────────────┘
                        │
         ┌──────────────▼───────────────────────────────┐
         │ 7:00 PM  ALL COMPLETE                         │
         │   Claude Code: "4 agents done. Build passes." │
         │   Jules: "2 PRs ready for review."            │
         │   Antigravity: "UI components built."         │
         └──────────────┬───────────────────────────────┘
                        │
7:00 PM  YOU: Review PRs. Approve. Done.
         Total active YOU time: ~25 minutes
         Total machine time: ~60 minutes of parallel work
```

#### Claude Cowork — Scheduled Tasks
```
"Every day at 5:00 PM:
  1. Run npm run build on riftcoach
  2. If it fails, create a GitHub issue with the error
  3. Run Graphify re-index
  4. Summarize changes since last check
  5. Send summary to my desktop"
```

You wake up to a status report. No manual checking.

#### Jules — Fire and Forget
From your phone during lunch:
```
Jules: "Add PostHog analytics to all pages in src/app/. 
Track page views, button clicks, and build selections.
Run the test suite. Open a PR when done."
```
Jules does it on Google's servers → PR appears on GitHub → you review after work.

**Time saved: ~100 min/sprint. Cost: $40/mo.**

---

## COMMANDER MODE — Your New Daily Routine

### Morning (10 min — from phone)
```
7:00 AM  [PHONE] Check GitHub notifications
         → Jules completed 2 PRs overnight
         → Review diffs on phone
         → Approve good ones, comment on bad ones
         → Done. Go to work.
```

### Evening (80 min total, ~25 min active YOU time)
```
6:00 PM  [OPUS] 15 min
         "Here's what I want to build tonight: [describe goals]"
         → Opus generates sprint.md with tasks + Claude Code prompts

6:15 PM  [TERMINAL] 2 min (paste ONE prompt)
         cd D:\.projects\ungasis\projects\riftcoach
         claude
         → Paste the one-prompt sprint trigger
         → Claude Code reads CLAUDE.md + sprint.md
         → /batch spawns subagents
         → YOU WALK AWAY

6:17 PM  [PHONE] Send Jules 1-2 background tasks
         "Add PWA manifest" / "Write tests for /api/build"

6:20 PM  [FREE TIME] 40 min
         Play Wild Rift. Eat dinner. Touch grass.
         Machines are building.

7:00 PM  [TERMINAL] 8 min
         Claude: "All tasks complete. Build passes."
         Review changes → approve → Claude commits + pushes
         Jules: "PR ready" → review → approve

7:08 PM  Done. 6 features shipped. You actively worked ~25 min.
```

---

## BEFORE vs AFTER

| Metric | Before (Manual) | After (Commander Mode) |
|--------|-----------------|----------------------|
| Steps per sprint | 13 manual steps | 2 (decide + approve) |
| Your active time | 3-4 hours | **25 minutes** |
| Context loading | 10 min copy-paste | 0 min (CLAUDE.md) |
| Build error fixing | 20 min manual | 0 min (auto-loop) |
| Git operations | 5 min per commit | 0 min (auto) |
| Handoff creation | 15 min | 0 min (auto-generated) |
| Parallel work | 1 thing at a time | 4+ things simultaneously |
| Features per evening | 1-2 | **4-6** |
| Time to revenue | 8 weeks | **3-4 weeks** |
| Monthly cost | $20 (Google AI) | $40 (+ Claude Pro) |

### The Math
- You save ~100 min per sprint
- You do ~5 sprints/week = **500 min/week saved** = **8.3 hours/week**
- That's an extra **full workday** every week
- At $40/mo cost, if your time is worth $20/hr, ROI = **$660/mo returned on $40 invested = 1,650%**

---

## THE ONE-PROMPT SPRINT (Copy-Paste Template)

Save this. Customize for each sprint. Paste into Claude Code:

```
Read CLAUDE.md for project context.
Read docs/sprint-current.md for tonight's tasks.

Execute ALL tasks using /batch for parallelizable work.
For each task:
1. Implement changes following project conventions
2. Keep files under 200 lines
3. Run npm run build after each change
4. If build fails, fix autonomously (max 5 attempts, then report)
5. Commit with format: "feat: [description]"

After all tasks:
- Run full build verification
- Generate docs/sprint-summary.md with: what changed, files modified, decisions made
- Update .agents/skills/learned-patterns.md with any new learnings
- Create a new branch "sprint/[date]" and push all commits
- Report: tasks completed, tasks failed, build status, total files changed
```

---

## QUICK-START CHECKLIST

### Today (Level 1 — Free)
- [ ] Create `.git/hooks/pre-commit` (auto-lint, block API keys)
- [ ] Create `.git/hooks/post-commit` (auto-push, Graphify)
- [ ] Add npm scripts (`prebuild`, `postbuild`, `sprint`, `fix`, `qa`)
- [ ] Add PowerShell aliases (`Sprint`, `rift`, `ung`)
- [ ] Make hooks executable: `chmod +x .git/hooks/*`

### After Subscribing (Level 2 — $20/mo)
- [ ] Install Claude Code CLI: `irm https://claude.ai/install.ps1 | iex`
- [ ] Create CLAUDE.md in project root (copy from above)
- [ ] Install `claude-code-design` repo for terminal prototypes
- [ ] Test one-prompt sprint with a small task first
- [ ] Set `/automode on` for uninterrupted execution

### Full Commander Mode (Level 3 — $40/mo)
- [ ] Set up Jules with RiftCoach GitHub repo
- [ ] Configure Claude Cowork scheduled tasks
- [ ] Create sprint template for one-prompt execution
- [ ] Train yourself: resist the urge to intervene. Let machines work.

---

## THE HARDEST PART

> **The hardest part isn't the tooling. It's YOU letting go.**
>
> You'll want to watch the terminal. You'll want to manually fix that one error.
> You'll want to tweak that file yourself. **Don't.**
>
> Your job is COMMANDER, not SOLDIER.
> Describe the mission. Review the results. That's it.
> The machines are faster, cheaper, and don't need dinner.

---
> Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
