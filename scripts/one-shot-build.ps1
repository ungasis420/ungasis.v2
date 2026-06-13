# one-shot-build.ps1 — Full UNGASIS build pipeline in one command
# Pipeline: route -> hot context -> plan -> hooks(before) -> prompt -> wait
#           -> merge(agy) -> verify -> self-heal -> hooks(after) -> commit
#
# Usage:
#   .\scripts\one-shot-build.ps1 -Task "description" [-Agent "claude"|"agy"] [-DryRun]

param (
    [Parameter(Mandatory = $true)]
    [string]$Task,

    [ValidateSet("claude", "agy")]
    [string]$Agent = "claude",

    [switch]$DryRun
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
Write-Host "✅ Path verified: $expectedRoot" -ForegroundColor Green

$ProjectRoot = (Get-Item $PSScriptRoot).Parent.FullName
Set-Location $ProjectRoot

Write-Host "=== UNGASIS One-Shot Build ===" -ForegroundColor Magenta
Write-Host "Task : $Task"
Write-Host "Agent: $Agent"
Write-Host ""

# STEP A: Call task-router.py
Write-Host "[STEP A] Running task-router.py..." -ForegroundColor Cyan
$routing = python (Join-Path $ProjectRoot "scripts\task-router.py") --task $Task --json | ConvertFrom-Json
$agent = $routing.agent
$model = $routing.model
$effort = $routing.effort
Write-Host " Router: agent=$agent, model=$model, effort=$effort"
Write-Host ""

# STEP B: Call pre-flight.py
Write-Host "[STEP B] Running pre-flight.py..." -ForegroundColor Cyan
$preFlight = python (Join-Path $ProjectRoot "scripts\pre-flight.py") --project ungasis --json
if ($LASTEXITCODE -ne 0) {
    Write-Host " Pre-flight FAILED. Fix issues before building." -ForegroundColor Red
    exit 1
}
Write-Host " Pre-flight passed"
Write-Host ""

# STEP C: Generate prompt
Write-Host "[STEP C] Generating prompt..." -ForegroundColor Cyan
$prompt = python (Join-Path $ProjectRoot "scripts\generate-agent-prompt.py") --agent $agent --goal $Task --effort $effort
Write-Host " Prompt generated ($($prompt.Length) chars)"
Write-Host ""

# STEP D: DryRun
if ($DryRun) {
    Write-Host "=== DRY RUN PROMPT ===" -ForegroundColor Yellow
    Write-Host $prompt
    Write-Host ""
    Write-Host "DRY RUN — stopping before any side effects." -ForegroundColor Yellow
    exit 0
}

Write-Host "=== READY-TO-PASTE PROMPT ===" -ForegroundColor Cyan
Write-Host $prompt
Write-Host "============================="
Write-Host ""
Write-Host "Run the prompt above in $agent now." -ForegroundColor Yellow
Read-Host "Press Enter when $agent is done"

# STEP E: Call post-flight.py
Write-Host "[STEP E] Running post-flight.py..." -ForegroundColor Cyan
python (Join-Path $ProjectRoot "scripts\post-flight.py") --project ungasis --json
if ($LASTEXITCODE -ne 0) {
    Write-Host " Post-flight FAILED. Running self-heal..." -ForegroundColor Yellow
    python (Join-Path $ProjectRoot "scripts\self-heal.py") --project ungasis
}
Write-Host ""

# STEP F: Auto-commit
Write-Host "[STEP F] Committing changes..." -ForegroundColor Cyan
git add -A
git commit -m "feat: $Task"
Write-Host ""

# STEP G: Auto-trigger post-commit hooks
Write-Host "[STEP G] Running post-commit hooks..." -ForegroundColor Cyan
python (Join-Path $ProjectRoot "scripts\auto-trigger.py") --action post-commit
Write-Host ""

python (Join-Path $ProjectRoot "scripts\token-logger.py") --unattended --agent $Agent --task $Task --exchanges 1 --tokens 2000

Write-Host "=== Pipeline complete ===" -ForegroundColor Magenta

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
