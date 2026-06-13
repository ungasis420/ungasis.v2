# one-shot-build.ps1 — 3-layer orchestration pipeline
# Pipeline: task-router -> pre-flight -> build -> post-flight
#           -> (self-heal -> retry -> post-flight) on fail -> commit -> auto-trigger
#
# Usage:
#   .\scripts\one-shot-build.ps1 -TaskDescription "description" [-unattended]

param (
    [Parameter(Mandatory = $true)]
    [string]$TaskDescription,

    [switch]$unattended
)

$expectedRoot = "D:\.projects\ungasis"
if ((Get-Location).Path -ne $expectedRoot) {
    Write-Host "❌ WRONG DIRECTORY: $(Get-Location). Expected: $expectedRoot" -ForegroundColor Red
    Write-Host "Run: cd $expectedRoot" -ForegroundColor Yellow
    exit 1
}
if (-not (Test-Path "CLAUDE.md")) {
    Write-Host "❌ CLAUDE.md not found. Are you in the right project?" -ForegroundColor Red
    exit 1
}

$ProjectRoot = $expectedRoot
$logDir = Join-Path $ProjectRoot ".ungasis\logs"
New-Item -ItemType Directory -Force -Path $logDir | Out-Null
$logFile = Join-Path $logDir "build-$(Get-Date -Format 'yyyyMMdd').log"

function Write-Step {
    param([string]$Step, [string]$Status, [string]$Detail)
    $line = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') | $Step | $Status | $Detail"
    Add-Content -Path $logFile -Value $line
    $color = switch ($Status) {
        "PASS" { "Green" }
        "FAIL" { "Red" }
        default { "Cyan" }
    }
    Write-Host $line -ForegroundColor $color
}

function Invoke-BuildStep {
    # BUILD STEP: run npm build for each project that has a package.json
    $projects = @("projects\newmont", "projects\riftcoach", "dashboard")
    $ok = $true
    foreach ($proj in $projects) {
        $projPath = Join-Path $ProjectRoot $proj
        $pkgJson = Join-Path $projPath "package.json"
        if (Test-Path $pkgJson) {
            Write-Host " Building $proj ..."
            Push-Location $projPath
            npm run build 2>&1 | Out-Null
            $exit = $LASTEXITCODE
            Pop-Location
            if ($exit -ne 0) {
                Write-Step "build" "FAIL" "$proj build failed (exit $exit)"
                $ok = $false
            }
        }
    }
    return $ok
}

Write-Host "=== UNGASIS One-Shot Build (3-layer orchestration) ===" -ForegroundColor Magenta
Write-Host "Task       : $TaskDescription"
Write-Host "Unattended : $unattended"
Write-Host ""

# STEP 1: task-router.py -> build plan
Write-Step "task-router" "START" $TaskDescription
$routingRaw = python (Join-Path $ProjectRoot "scripts\task-router.py") --task $TaskDescription --json
$routing = $routingRaw | ConvertFrom-Json
Write-Step "task-router" "OK" "agent=$($routing.agent) model=$($routing.model) effort=$($routing.effort)"

# STEP 1.5: context-inject (build hot-context from graph)
Write-Step "context-inject" "START" "Querying knowledge graph"
python (Join-Path $ProjectRoot "scripts/context-inject.py") --task $TaskDescription | Out-Null
Write-Step "context-inject" "PASS" "Hot context injected"

# STEP 2: pre-flight.py (7 checks)
Write-Step "pre-flight" "START" "Running pre-flight checks"
python (Join-Path $ProjectRoot "scripts\pre-flight.py") --project ungasis --json | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Step "pre-flight" "FAIL" "Pre-flight checks failed"
    Write-Host "❌ BUILD FAILED — manual intervention needed" -ForegroundColor Red
    exit 1
}
Write-Step "pre-flight" "PASS" "All pre-flight checks passed"

# STEP 3: BUILD STEP (preserved)
Write-Step "build" "START" "Running build"
$buildOk = Invoke-BuildStep
if ($buildOk) {
    Write-Step "build" "PASS" "Build completed"
} else {
    Write-Step "build" "FAIL" "Build reported failures"
}

# STEP 4: post-flight.py (7 checks)
Write-Step "post-flight" "START" "Running post-flight checks"
python (Join-Path $ProjectRoot "scripts\post-flight.py") --project ungasis --json | Out-Null
$postFlightOk = ($LASTEXITCODE -eq 0)

# STEP 5: self-heal -> retry build once -> post-flight again
if (-not $postFlightOk) {
    Write-Step "post-flight" "FAIL" "Post-flight checks failed, running self-heal"
    python (Join-Path $ProjectRoot "scripts\self-heal.py") "CLAUDE.md" "post-flight checks failed" | Out-Null

    Write-Step "build" "RETRY" "Retrying build after self-heal"
    Invoke-BuildStep | Out-Null

    Write-Step "post-flight" "RETRY" "Re-running post-flight checks"
    python (Join-Path $ProjectRoot "scripts\post-flight.py") --project ungasis --json | Out-Null
    $postFlightOk = ($LASTEXITCODE -eq 0)

    if (-not $postFlightOk) {
        Write-Step "post-flight" "FAIL" "Post-flight still failing after self-heal retry"
        Write-Host "❌ BUILD FAILED — manual intervention needed" -ForegroundColor Red
        exit 1
    }
}
Write-Step "post-flight" "PASS" "Post-flight checks passed"

# STEP 6: commit
Write-Step "commit" "START" "Committing changes"
git add -A
$commitMsg = "chore: auto-build $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git commit -m $commitMsg | Out-Null
Write-Step "commit" "PASS" $commitMsg

# STEP 7: auto-trigger.py post-commit hooks
Write-Step "auto-trigger" "START" "Running post-commit hooks"
python (Join-Path $ProjectRoot "scripts\auto-trigger.py") --action post-commit | Out-Null
Write-Step "auto-trigger" "PASS" "Post-commit hooks complete"

Write-Host ""
Write-Host "=== Pipeline complete ===" -ForegroundColor Magenta

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
