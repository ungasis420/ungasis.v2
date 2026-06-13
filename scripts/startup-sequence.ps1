# UNGASIS OS v6.0 — Startup Sequence
# Runs the dashboard data-layer scripts and logs timing.

$start = Get-Date
Write-Host "=== UNGASIS Startup Sequence ===" -ForegroundColor Cyan
Write-Host "Start: $start"

$jobs = @(
    @{ Name = "Health (pulse)";     Cmd = "scripts/ungasis.py pulse --json" },
    @{ Name = "Session Recovery";   Cmd = "scripts/session-recovery.py --json" },
    @{ Name = "Wiki Health";        Cmd = "scripts/wiki-lint.py --json" },
    @{ Name = "Token Report";       Cmd = "scripts/token-report.py --json" },
    @{ Name = "Cross-Project";      Cmd = "scripts/cross-project.py --json" }
)

$results = @()
foreach ($job in $jobs) {
    Write-Host "`n-> Running: $($job.Name)" -ForegroundColor Yellow
    $cmdParts = $job.Cmd -split " "
    python $cmdParts | Out-Null
    if ($LASTEXITCODE -eq 0) {
        $results += "[OK]   $($job.Name)"
    } else {
        $results += "[FAIL] $($job.Name)"
    }
}

$end = Get-Date
$duration = ($end - $start).TotalSeconds

Write-Host "`n=== Summary ===" -ForegroundColor Cyan
$results | ForEach-Object { Write-Host $_ }
Write-Host "End: $end"
Write-Host "Duration: $([math]::Round($duration, 1))s"
