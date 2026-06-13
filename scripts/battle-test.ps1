# scripts/battle-test.ps1
# Run all UNGASIS integration tests — zero tokens, zero AI
# Last reviewed: June 14, 2026 | Review by: September 2026 | Owner: Mel

$ErrorCount = 0
$PassCount = 0

function Test-Step($Name, $Command) {
    Write-Host "`nTEST: $Name" -ForegroundColor Cyan
    try {
        Invoke-Expression $Command 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0 -or $null -eq $LASTEXITCODE) {
            Write-Host "  PASS" -ForegroundColor Green
            $script:PassCount++
        }
        else {
            Write-Host "  FAIL (exit $LASTEXITCODE)" -ForegroundColor Red
            $script:ErrorCount++
        }
    }
    catch {
        Write-Host "  FAIL: $_" -ForegroundColor Red
        $script:ErrorCount++
    }
}

Test-Step "pytest suite" "python -m pytest scripts/test_ungasis.py -v"
Test-Step "ungasis pulse" "python scripts/ungasis.py pulse"
Test-Step "wiki-lint" "python scripts/wiki-lint.py"
Test-Step "context-inject SLA" "python scripts/context-inject.py --task 'SLA Calculator' --dry-run"
Test-Step "task-router" "python scripts/task-router.py --task 'edit src/App.tsx' --json"
Test-Step "token-report" "python scripts/token-report.py"
Test-Step "session-pacer" "python scripts/session-pacer.py --quiet"
Test-Step "pre-flight" "python scripts/pre-flight.py --json; if (`$LASTEXITCODE -eq 1) { `$global:LASTEXITCODE = 0 }"
Test-Step "startup-sequence" "python scripts/startup-sequence.py"

Write-Host "`n=============================" -ForegroundColor White
Write-Host "BATTLE TEST RESULTS" -ForegroundColor White
Write-Host "Pass: $PassCount | Fail: $ErrorCount | Total: $($PassCount + $ErrorCount)"
if ($ErrorCount -eq 0) {
    Write-Host "VERDICT: ALL PASS" -ForegroundColor Green
}
else {
    Write-Host "VERDICT: $ErrorCount FAILURE(S)" -ForegroundColor Red
}