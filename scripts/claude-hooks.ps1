# claude-hooks.ps1 — Before/After wrapper for Claude Code sessions
# BEFORE: builds hot context from the wiki for the given task
# AFTER:  logs a quick session entry and appends a summary to CONTEXT.md
#
# Usage:
#   .\scripts\claude-hooks.ps1 -Phase "before" -Task "description"
#   .\scripts\claude-hooks.ps1 -Phase "after"

param (
    [Parameter(Mandatory = $true)]
    [ValidateSet("before", "after")]
    [string]$Phase,

    [string]$Task = ""
)

$ProjectRoot = (Get-Item $PSScriptRoot).Parent.FullName
$HotContext = Join-Path $ProjectRoot ".ungasis\context\hot-context.md"
$ContextMd = Join-Path $ProjectRoot "CONTEXT.md"

if ($Phase -eq "before") {
    if (-not $Task) {
        Write-Host "ERROR: -Task is required for -Phase before"
        exit 1
    }

    Write-Host "Building hot context for: $Task" -ForegroundColor Cyan
    $output = python (Join-Path $ProjectRoot "scripts\wiki-inject.py") $Task

    Set-Content -Path $HotContext -Value $output -Encoding UTF8
    Write-Host "Wrote hot context to $HotContext"
    Write-Host ""
    Write-Host $output
}
else {
    Write-Host "Logging session (quick mode)..." -ForegroundColor Cyan
    python (Join-Path $ProjectRoot "scripts\token-logger.py") --quick

    $stamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    $entry = @"

---

## Session Auto-Log — $stamp
- Logged via claude-hooks.ps1 -Phase after
- See .ungasis\tracking\sessions.jsonl for token/exchange details
"@

    Add-Content -Path $ContextMd -Value $entry -Encoding UTF8
    Write-Host "Appended session summary to $ContextMd"
}

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
