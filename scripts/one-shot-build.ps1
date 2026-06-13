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

$ProjectRoot = (Get-Item $PSScriptRoot).Parent.FullName
Set-Location $ProjectRoot

Write-Host "=== UNGASIS One-Shot Build ===" -ForegroundColor Magenta
Write-Host "Task : $Task"
Write-Host "Agent: $Agent"
Write-Host ""

# Step 1: Task router — agent + model recommendation
Write-Host "[1/11] Running task-router.py..." -ForegroundColor Cyan
$routerOutput = python (Join-Path $ProjectRoot "scripts\task-router.py") $Task
Write-Host $routerOutput
Write-Host ""

# Step 2: Hot context from wiki
Write-Host "[2/11] Running wiki-inject.py..." -ForegroundColor Cyan
$hotContext = python (Join-Path $ProjectRoot "scripts\wiki-inject.py") $Task
$HotContextPath = Join-Path $ProjectRoot ".ungasis\context\hot-context.md"
Set-Content -Path $HotContextPath -Value $hotContext -Encoding UTF8
Write-Host "Wrote hot context to $HotContextPath"
Write-Host ""

# Step 3: Display plan
Write-Host "[3/11] Plan:" -ForegroundColor Cyan
Write-Host "  - Agent route: see table above"
Write-Host "  - Hot context: $HotContextPath"
Write-Host "  - Pipeline will pause for agent work, then verify + commit"

if ($DryRun) {
    Write-Host ""
    Write-Host "DRY RUN — stopping before any side effects." -ForegroundColor Yellow
    exit 0
}

# Step 4: claude-hooks before phase (only for claude agent)
if ($Agent -eq "claude") {
    Write-Host "[4/11] Running claude-hooks.ps1 -Phase before..." -ForegroundColor Cyan
    & (Join-Path $ProjectRoot "scripts\claude-hooks.ps1") -Phase "before" -Task $Task
}
else {
    Write-Host "[4/11] Skipping claude-hooks (agent=agy)" -ForegroundColor DarkGray
}
Write-Host ""

# Step 5: Print ready-to-paste prompt
Write-Host "[5/11] Ready-to-paste prompt for $Agent" -ForegroundColor Cyan
Write-Host "----------------------------------------"
Write-Host "TASK: $Task"
Write-Host ""
Write-Host "READ first: CLAUDE.md, $HotContextPath"
Write-Host "----------------------------------------"
Write-Host ""

# Step 6: Wait for agent to finish
Write-Host "[6/11] Run the prompt above in $Agent now." -ForegroundColor Yellow
Read-Host "Press Enter when $Agent is done"

# Step 7: Merge agy scratch output if agent=agy
if ($Agent -eq "agy") {
    Write-Host "[7/11] Running merge-agy-output.ps1..." -ForegroundColor Cyan
    & (Join-Path $ProjectRoot "scripts\merge-agy-output.ps1")
}
else {
    Write-Host "[7/11] Skipping merge-agy-output (agent=claude)" -ForegroundColor DarkGray
}
Write-Host ""

# Step 8: Verify changed files
Write-Host "[8/11] Running verifier.py on changed files..." -ForegroundColor Cyan
$changedFiles = git diff --name-only HEAD
$changedFiles += git ls-files --others --exclude-standard
$changedFiles = $changedFiles | Where-Object { $_ -and (Test-Path $_) }

$verifyFailed = @()
foreach ($file in $changedFiles) {
    Write-Host "  Verifying $file"
    python (Join-Path $ProjectRoot "scripts\verifier.py") $file
    if ($LASTEXITCODE -ne 0) {
        $verifyFailed += $file
    }
}
Write-Host ""

# Step 9: Self-heal failed files
if ($verifyFailed.Count -gt 0) {
    Write-Host "[9/11] Verifier failed for $($verifyFailed.Count) file(s) — running self-heal.py..." -ForegroundColor Cyan
    foreach ($file in $verifyFailed) {
        python (Join-Path $ProjectRoot "scripts\self-heal.py") $file "verifier check failed"
    }
}
else {
    Write-Host "[9/11] All files passed verification — skipping self-heal" -ForegroundColor DarkGray
}
Write-Host ""

# Step 10: claude-hooks after phase
Write-Host "[10/11] Running claude-hooks.ps1 -Phase after..." -ForegroundColor Cyan
& (Join-Path $ProjectRoot "scripts\claude-hooks.ps1") -Phase "after"
Write-Host ""

# Step 11: Git add + commit
Write-Host "[11/11] Committing changes..." -ForegroundColor Cyan
git add -A
$commitMsg = "feat: one-shot build — $Task"
git commit -m $commitMsg
Write-Host ""

Write-Host "=== Pipeline complete ===" -ForegroundColor Magenta

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
