# scripts/session-close.ps1
# One-button session close: generates all docs, commits, pushes.
# Usage: .\scripts\session-close.ps1
#        .\scripts\session-close.ps1 -NoPush
#        .\scripts\session-close.ps1 -Message "custom commit message"
# Last reviewed: June 14, 2026 | Review by: September 2026 | Owner: Mel

param(
    [switch]$NoPush,
    [string]$Message = "docs: session close - auto-generated context + handoff"
)

$ErrorActionPreference = "Continue"
Set-Location D:\.projects\ungasis

$script:StepResults = @()

function Run-Step($Name, $Command) {
    Write-Host "`n--- $Name ---" -ForegroundColor Cyan
    try {
        $global:LASTEXITCODE = 0
        Invoke-Expression $Command
        if ($global:LASTEXITCODE -ne 0) {
            Write-Host "[FAIL] $Name" -ForegroundColor Red
            $script:StepResults += [PSCustomObject]@{ Step = $Name; Status = "FAIL"; ExitCode = $global:LASTEXITCODE }
        } else {
            Write-Host "[PASS] $Name" -ForegroundColor Green
            $script:StepResults += [PSCustomObject]@{ Step = $Name; Status = "PASS"; ExitCode = 0 }
        }
    } catch {
        Write-Host "[FAIL] $Name" -ForegroundColor Red
        $script:StepResults += [PSCustomObject]@{ Step = $Name; Status = "FAIL"; ExitCode = "ERR" }
    }
}

Write-Host "`n========================================" -ForegroundColor White
Write-Host "  UNGASIS SESSION CLOSE" -ForegroundColor White
Write-Host "========================================" -ForegroundColor White

Run-Step "Handoff" "python scripts/generate-handoff.py --json"
Run-Step "LLM Context" "python scripts/generate_llm_context.py"
Run-Step "Wrap-up" "python scripts/wrap-up.py --skip-capture"
Run-Step "Copilot Instructions" "python scripts/generate-copilot-instructions.py --quiet"
Run-Step "Battle Test" "python -m pytest scripts/test_ungasis.py -v --tb=short"
Run-Step "Wiki Lint" "python scripts/wiki-lint.py"
Run-Step "Backup" "python scripts/ungasis.py backup"
Run-Step "Battle Test (JSON)" ".\scripts\battle-test.ps1 -Json"
Run-Step "JARVIS Score" "python scripts/jarvis-score.py"
Run-Step "Context Pack" "python scripts/generate-context-pack.py --project ungasis"
Run-Step "Git Add" "git add -A"

$status = git status --short
if ($status) {
    $safeMessage = $Message -replace '"', '\"'
    Run-Step "Git Commit" "git commit -m `"$safeMessage`""
    if (-not $NoPush) {
        Run-Step "Git Push" "git push"
    } else {
        Write-Host "`n  Skipped push (-NoPush flag)" -ForegroundColor Yellow
        $script:StepResults += [PSCustomObject]@{ Step = "Git Push"; Status = "SKIP"; ExitCode = 0 }
    }
} else {
    Write-Host "`n  Nothing to commit (working tree clean)" -ForegroundColor Yellow
    $script:StepResults += [PSCustomObject]@{ Step = "Git Commit"; Status = "SKIP"; ExitCode = 0 }
}

Write-Host "`n--- Step Summary ---" -ForegroundColor Cyan
$script:StepResults | Format-Table -AutoSize | Out-String | Write-Host

Write-Host "`n========================================" -ForegroundColor White
Write-Host "  SESSION CLOSED" -ForegroundColor White
Write-Host "========================================`n" -ForegroundColor White
