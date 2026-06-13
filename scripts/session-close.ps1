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

function Run-Step($Name, $Command) {
    Write-Host "`n--- $Name ---" -ForegroundColor Cyan
    try {
        Invoke-Expression $Command
        Write-Host "  OK" -ForegroundColor Green
    } catch {
        Write-Host "  WARNING: $_" -ForegroundColor Yellow
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
Run-Step "Git Add" "git add -A"

$status = git status --short
if ($status) {
    Write-Host "`n--- Git Commit ---" -ForegroundColor Cyan
    git commit -m $Message
    Write-Host "  OK" -ForegroundColor Green
    if (-not $NoPush) {
        Write-Host "`n--- Git Push ---" -ForegroundColor Cyan
        git push
        Write-Host "  OK" -ForegroundColor Green
    } else {
        Write-Host "`n  Skipped push (-NoPush flag)" -ForegroundColor Yellow
    }
} else {
    Write-Host "`n  Nothing to commit (working tree clean)" -ForegroundColor Yellow
}

Write-Host "`n========================================" -ForegroundColor White
Write-Host "  SESSION CLOSED" -ForegroundColor White
Write-Host "========================================`n" -ForegroundColor White
