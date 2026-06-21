# scripts/session-close-light.ps1
# LIGHT session close: warn-only mode. No commit, no push, no backup.
# Use 80% of the time. For milestones/releases use scripts/session-close.ps1
# Usage: .\scripts\session-close-light.ps1
# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel

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
            $script:StepResults += [PSCustomObject]@{ Step = $Name; Status = "FAIL" }
        } else {
            Write-Host "[PASS] $Name" -ForegroundColor Green
            $script:StepResults += [PSCustomObject]@{ Step = $Name; Status = "PASS" }
        }
    } catch {
        Write-Host "[FAIL] $Name" -ForegroundColor Red
        $script:StepResults += [PSCustomObject]@{ Step = $Name; Status = "FAIL" }
    }
}

Write-Host "`n========================================" -ForegroundColor White
Write-Host "  UNGASIS LIGHT SESSION CLOSE" -ForegroundColor White
Write-Host "  (warn-only - no commit/push)" -ForegroundColor Gray
Write-Host "========================================" -ForegroundColor White

Run-Step "Session Capture" "python scripts/session-capture.py"
Run-Step "Token Report" "python scripts/token-report.py"

Write-Host "`n--- Git Status ---" -ForegroundColor Cyan
$status = git status --short
if ($status) {
    Write-Host $status
    Write-Host "`n  Changes detected. Commit manually or run full session-close.ps1" -ForegroundColor Yellow
} else {
    Write-Host "  Working tree clean" -ForegroundColor Green
}

Write-Host "`n--- Step Summary ---" -ForegroundColor Cyan
$script:StepResults | Format-Table -AutoSize | Out-String | Write-Host

Write-Host "`n========================================" -ForegroundColor White
Write-Host "  LIGHT CLOSE DONE" -ForegroundColor White
Write-Host "  Full close: .\scripts\session-close.ps1 (for milestones)" -ForegroundColor Gray
Write-Host "========================================`n" -ForegroundColor White
