# ============================================================
# Newmont v6.3 Autonomous Build Pipeline
# Run once, walk away. Come back to a working build.
#
# Usage:
#   .\docs\NEWMONT-AUTONOMOUS-BUILD.ps1              # Full run
#   .\docs\NEWMONT-AUTONOMOUS-BUILD.ps1 -DryRun      # Preview only
#   .\docs\NEWMONT-AUTONOMOUS-BUILD.ps1 -SkipAgy     # Claude only
#   .\docs\NEWMONT-AUTONOMOUS-BUILD.ps1 -SkipClaude  # agy only
# ============================================================

param(
    [switch]$DryRun,
    [switch]$SkipAgy,
    [switch]$SkipClaude
)

$ErrorActionPreference = "Continue"
$PROJECT = "D:\.projects\ungasis\projects\newmont"
$JUNCTION = "D:\nmwork"
$SCRATCH = "C:\Users\My PC\.gemini\antigravity-cli\scratch"
$TS = Get-Date -Format "yyyyMMdd-HHmmss"

# Log setup
$logDir = "$PROJECT\build-logs"
New-Item $logDir -ItemType Directory -Force -EA SilentlyContinue | Out-Null
$LOG = "$logDir\build-$TS.log"

function Log {
    param([string]$M, [string]$C = "White")
    $e = "[$(Get-Date -Format 'HH:mm:ss')] $M"
    Write-Host $e -ForegroundColor $C
    $e | Add-Content $LOG -EA SilentlyContinue
}

Log "=== Newmont v6.3 Autonomous Build ===" "Cyan"
Log "Time: $TS"
Log ""

# ============================================================
# WAVE 1: agy Builders (Gemini Flash - FREE)
# Pipe prompt = non-interactive. No Enter needed.
# ============================================================

# --- Prompt 1: SLA Reportability ---
$SLA_PROMPT = @"
Read docs/NEWMONT-CONTEXT-PACK.md. Create src/components/modules/SLAReportability.tsx.

SLA Reportability Scorecard with three card columns:

CALCULABLE (green #22c55e, 6 items):
Time to Fill (Approved->Offer Accept, target 50d), Fill Rate (Filled/Total),
Cancel Rate (Cancelled/Total), Hold Duration (Freeze->UnFreeze),
Pipeline Stage Times (workflow dates), Req Aging (Created->Today, 60d trigger).

BLOCKED (red #ef4444, 9 items, show missing field):
Time to Assign (no Intake Meeting Date), Time to Advertise (no KF Assigned Date),
Time to Brief (no Intake Meeting Date), Assign to Intake (both missing),
Intake to RA (both missing), Time to Shortlist (no Req Shortlist Date),
Time to Interview (no KF Assigned flag), Close Req 1BD (no Fill Date),
Time to Screen BGC (no BGC dates).

PENDING (yellow #f59e0b, 2 items):
Time to Offer (Offer Created Date workaround), Offer Acceptance Rate (same).

Top summary: "6 of 17 SLAs Calculable" with Recharts PieChart donut ring.
Bottom: "Blocked SLAs require fields from Newmont CORE. Contact Manuel Kassis."

Design: bg #0a0a1a, cards rgba(255,255,255,0.04) backdrop-blur-xl border
rgba(255,255,255,0.10) rounded-2xl. Section header: SLA INTELLIGENCE in #00d4ff.
ALL hex colors. Default export. React 19 + TS + Recharts. No git. One file only.
"@

# --- Prompt 2: Candidate Pipeline ---
$PIPELINE_PROMPT = @"
Read docs/NEWMONT-CONTEXT-PACK.md. Create src/components/modules/CandidatePipeline.tsx.

Candidate Pipeline Funnel using 12 workflow stages from CORE report 5.

Mock data (realistic funnel):
Applied(2847) > Review(2103) > Screen(1456) > Assessment(1201) >
Selected(834) > Scheduled(756) > Interview(689) > Additional(412) >
Offer Extended(287) > Offer Accepted(241) > Ready for Hire(228).
Withdraw/Rejected: 891 cumulative across stages.

Each stage: count, conversion% from previous, avg days (mock 2-8d).
Colors: #00d4ff(start) > #a78bfa(mid) > #22c55e(end), #ef4444(withdraw).
Top KPIs: Total Candidates, Overall Conversion, Avg Duration, Top Drop-off.
Recharts BarChart horizontal bars for funnel.

Section header: CANDIDATE INTELLIGENCE in #00d4ff.
Footer: "Source: Applicants_Workflow_Dates_KF. Sample data shown."

Design: same glassmorphism as above. ALL hex colors. Default export.
React 19 + TS + Recharts. No git. One file only.
"@

if (-not $SkipAgy) {
    Log "=== WAVE 1: agy Builders (Gemini Flash) ===" "Yellow"
    Log ""

    $prompts = [ordered]@{
        "SLA-Reportability" = $SLA_PROMPT
        "Candidate-Pipeline" = $PIPELINE_PROMPT
    }

    foreach ($name in $prompts.Keys) {
        Log "  Building: $name..." "Green"
        if ($DryRun) {
            Log "  [DRY RUN] Would pipe prompt to agy" "DarkGray"
        } else {
            try {
                $prompts[$name] | agy --add-dir $JUNCTION 2>&1 |
                    ForEach-Object { Log "    $_" "DarkGray" }
                Log "  Done: $name" "Green"
            } catch {
                Log "  FAILED: $name - $_" "Red"
            }
        }
        Log ""
    }

    # Copy any scratch files back to real project
    Log "  Checking scratch for files..." "Cyan"
    $copied = 0
    Get-ChildItem $SCRATCH -Directory -EA SilentlyContinue | ForEach-Object {
        Get-ChildItem $_.FullName -Recurse -Include "*.tsx","*.ts" -EA SilentlyContinue | ForEach-Object {
            # Try to find relative path from src/
            if ($_.FullName -match "\\src\\") {
                $rel = $_.FullName.Substring($_.FullName.IndexOf("\src\"))
                $dest = Join-Path $PROJECT $rel
                $dir = Split-Path $dest -Parent
                if (-not (Test-Path $dir)) { New-Item $dir -ItemType Directory -Force | Out-Null }
                Copy-Item $_.FullName $dest -Force
                Log "    Copied: $rel" "DarkGray"
                $script:copied++
            }
        }
    }
    if ($copied -eq 0) {
        Log "  No scratch files found (agy may have written directly)" "Yellow"
    }
    Log ""
}

# ============================================================
# WAVE 2: Claude Code Foreman (Sonnet 4.6)
# --yes = auto-approve. --print = non-interactive.
# Reads CLAUDE.md automatically for project rules.
# ============================================================

$CLAUDE_PROMPT = @"
Read docs/NEWMONT-CONTEXT-PACK.md.

TASKS (do all, in order):

1. CHECK src/components/modules/SLAReportability.tsx exists.
   If missing: create a minimal version with the 3-column layout
   (6 calculable, 9 blocked, 2 pending SLAs) from context pack section 6.

2. CHECK src/components/modules/CandidatePipeline.tsx exists.
   If missing: create a minimal version with 12-stage funnel
   from context pack section 5 workflow dates.

3. Open src/components/Views.tsx. Find where FieldGapCommand is imported or rendered.
   Replace it with CandidatePipeline (import from ./modules/CandidatePipeline).

4. In the same Views.tsx or Dashboard.tsx or AppShell.tsx:
   Add SLAReportability as a new view section.
   Add navigation entries for SLA Scorecard and Candidate Pipeline.

5. Fix ALL TypeScript errors in modified files.

6. Run: cd D:\.projects\ungasis\projects\newmont && npm run build
   If errors: fix and retry (max 3 attempts).

7. git add -A && git commit -m "feat(v6.3): SLA reportability + candidate pipeline"

RULES: Surgical edits only. Do NOT rewrite entire files.
Do NOT modify data-engine.ts or dashboard.ts unless absolutely necessary.
"@

if (-not $SkipClaude) {
    Log "=== WAVE 2: Claude Code Foreman (Sonnet 4.6) ===" "Magenta"
    Log ""

    if ($DryRun) {
        Log "  [DRY RUN] Would run: claude --yes --print ..." "DarkGray"
    } else {
        try {
            Set-Location $PROJECT
            claude --yes --allowedTools "Bash,Read,Write,Glob,Grep" --print $CLAUDE_PROMPT 2>&1 |
                ForEach-Object {
                    if ($_ -match "error|Error|ERROR") { Log "  $_" "Red" }
                    elseif ($_ -match "commit|built|PASS|success|Done") { Log "  $_" "Green" }
                    else { Log "  $_" "DarkGray" }
                }
        } catch {
            Log "  Claude Code failed: $_" "Red"
        }
    }
    Log ""
}

# ============================================================
# WAVE 3: Automated Verification
# ============================================================

Log "=== WAVE 3: Verification ===" "Blue"
Log ""

# Check dist/index.html
$dist = Get-Item "$PROJECT\dist\index.html" -EA SilentlyContinue
if ($dist) {
    $kb = [math]::Round($dist.Length / 1KB)
    if ($kb -gt 400) {
        Log "  dist/index.html: $kb KB — PASS" "Green"
    } else {
        Log "  dist/index.html: $kb KB — small, may be incomplete" "Yellow"
    }
} else {
    Log "  dist/index.html NOT FOUND — build may have failed" "Red"
}

# Check new components exist
$checks = @(
    "src\components\modules\SLAReportability.tsx",
    "src\components\modules\CandidatePipeline.tsx"
)
foreach ($c in $checks) {
    $p = Join-Path $PROJECT $c
    if (Test-Path $p) {
        $sz = [math]::Round((Get-Item $p).Length / 1KB, 1)
        Log "  $c — EXISTS ($sz KB)" "Green"
    } else {
        Log "  $c — MISSING" "Red"
    }
}

# Git log
Log ""
Log "  Recent commits:" "Cyan"
Set-Location $PROJECT
git log --oneline -5 2>&1 | ForEach-Object { Log "    $_" "DarkGray" }

Log ""
Log "Pipeline complete!" "Green"
$url = "file:///$($PROJECT -replace '\\','/')/dist/index.html"
Log "Open in browser: $url" "Cyan"
Log "Log: $LOG" "DarkGray"
