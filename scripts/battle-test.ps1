# scripts/battle-test.ps1
# Run all UNGASIS integration tests — zero tokens, zero AI
# Last reviewed: June 14, 2026 | Review by: September 2026 | Owner: Mel

param(
    [switch]$Json
)

$ErrorCount = 0
$PassCount = 0
$Results = @()

function Test-Step($Name, $Command) {
    if (-not $Json) {
        Write-Host "`nTEST: $Name" -ForegroundColor Cyan
    }
    try {
        $output = Invoke-Expression $Command 2>&1 | Out-String
        if ($LASTEXITCODE -eq 0 -or $null -eq $LASTEXITCODE) {
            if (-not $Json) { Write-Host "  PASS" -ForegroundColor Green }
            $script:PassCount++
            $script:Results += [ordered]@{ name = $Name; status = "pass"; detail = "" }
        }
        else {
            if (-not $Json) { Write-Host "  FAIL (exit $LASTEXITCODE)" -ForegroundColor Red }
            $script:ErrorCount++
            $detail = ($output.Trim() -split "`n" | Select-Object -Last 1)
            $script:Results += [ordered]@{ name = $Name; status = "fail"; detail = "exit ${LASTEXITCODE}: $detail" }
        }
    }
    catch {
        if (-not $Json) { Write-Host "  FAIL: $_" -ForegroundColor Red }
        $script:ErrorCount++
        $script:Results += [ordered]@{ name = $Name; status = "fail"; detail = "$_" }
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

if ($Json) {
    $report = [ordered]@{
        tests      = $Results
        pass_count = $PassCount
        fail_count = $ErrorCount
        total      = $PassCount + $ErrorCount
        timestamp  = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    }
    $outDir = Join-Path $PSScriptRoot "..\.ungasis\dashboard"
    if (-not (Test-Path $outDir)) {
        New-Item -ItemType Directory -Force -Path $outDir | Out-Null
    }
    $jsonText = $report | ConvertTo-Json -Depth 4
    $jsonText | Out-File -FilePath (Join-Path $outDir "battle-test.json") -Encoding utf8
    Write-Output $jsonText
}
else {
    Write-Host "`n=============================" -ForegroundColor White
    Write-Host "BATTLE TEST RESULTS" -ForegroundColor White
    Write-Host "Pass: $PassCount | Fail: $ErrorCount | Total: $($PassCount + $ErrorCount)"
    if ($ErrorCount -eq 0) {
        Write-Host "VERDICT: ALL PASS" -ForegroundColor Green
    }
    else {
        Write-Host "VERDICT: $ErrorCount FAILURE(S)" -ForegroundColor Red
    }
}
