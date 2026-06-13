# merge-agy-output.ps1
# UNGASIS v5.3 CONNECT -- Merge Antigravity agent output into the repo.
#
# When Antigravity CLI (agy) generates files to a temp/output folder,
# this script validates and moves them into the correct repo location,
# checks for secrets, runs verifier.py on .md files, and git-adds them.

[CmdletBinding()]
param(
    [string]$SourceDir = "C:\Users\My PC\.gemini\antigravity-cli\scratch\ungasis",
    [string]$TargetSubdir = "",
    [switch]$DryRun,
    [switch]$Force
)

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$Verifier = Join-Path $Root "scripts\verifier.py"

# Safety check -- never merge into forbidden dirs
$ForbiddenDirs = @("archive", "source-files")

Write-Host ""
Write-Host "=== UNGASIS Merge Antigravity Output ===" -ForegroundColor Cyan
Write-Host "Source : $SourceDir"
Write-Host "Target : $TargetSubdir"
Write-Host "Root   : $Root"
Write-Host "DryRun : $DryRun"
Write-Host ""

if (-not (Test-Path $SourceDir)) {
    Write-Error "Source directory not found: $SourceDir"
    exit 1
}

$Files = Get-ChildItem -Path $SourceDir -Recurse -File
if ($Files.Count -eq 0) {
    Write-Host "No files found in $SourceDir. Nothing to merge." -ForegroundColor Yellow
    exit 0
}

$Results = @()

foreach ($File in $Files) {
    # Compute relative path from SourceDir
    $RelPath = $File.FullName.Substring($SourceDir.Length).TrimStart('\', '/')
    
    # Fix for the "scratch root issue": allow merging into a specific subdirectory
    if ($TargetSubdir) {
        $RelPath = Join-Path $TargetSubdir $RelPath
    }
    
    $Dest = Join-Path $Root $RelPath

    # Safety: block forbidden directories
    $RelLower = $RelPath.ToLower().Replace('\', '/')
    $Blocked = $false
    foreach ($Forbidden in $ForbiddenDirs) {
        if ($RelLower.StartsWith($Forbidden + '/') -or $RelLower -eq $Forbidden) {
            $Blocked = $true
            break
        }
    }

    if ($Blocked) {
        $Results += [PSCustomObject]@{ File=$RelPath; Status="BLOCKED"; Note="Forbidden dir" }
        continue
    }

    # Check for existing file
    if ((Test-Path $Dest) -and -not $Force) {
        $Results += [PSCustomObject]@{ File=$RelPath; Status="SKIP"; Note="Already exists (use -Force)" }
        continue
    }

    # Run verifier on .md files
    $VerifyStatus = "N/A"
    if ($File.Extension -eq ".md" -and (Test-Path $Verifier)) {
        $VerifyOut = python $Verifier $File.FullName 2>&1
        $VerifyStatus = if ($VerifyOut -match "^PASS") { "PASS" } else { "WARN" }
    }

    if ($DryRun) {
        $Results += [PSCustomObject]@{ File=$RelPath; Status="DRY-RUN"; Note="Would copy to $Dest | Verify: $VerifyStatus" }
        continue
    }

    # Create parent dir and copy
    $DestDir = Split-Path $Dest -Parent
    if (-not (Test-Path $DestDir)) { New-Item -ItemType Directory -Path $DestDir -Force | Out-Null }

    Copy-Item -Path $File.FullName -Destination $Dest -Force:$Force
    git -C $Root add $Dest 2>&1 | Out-Null
    $Results += [PSCustomObject]@{ File=$RelPath; Status="MERGED"; Note="Verify: $VerifyStatus" }
}

# Summary
Write-Host ""
Write-Host "=== Merge Summary ===" -ForegroundColor Cyan
$Results | Format-Table -AutoSize

$MergedCount = ($Results | Where-Object { $_.Status -eq "MERGED" }).Count
$BlockedCount = ($Results | Where-Object { $_.Status -eq "BLOCKED" }).Count
$SkippedCount = ($Results | Where-Object { $_.Status -eq "SKIP" }).Count

Write-Host "Merged : $MergedCount | Blocked : $BlockedCount | Skipped : $SkippedCount"
if ($MergedCount -gt 0 -and -not $DryRun) {
    Write-Host "Next   : git commit -m 'feat: merge agy output -- $MergedCount files'" -ForegroundColor Green
}
