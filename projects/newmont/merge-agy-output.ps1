# ============================================================
# merge-agy-output.ps1 — Copies Agy's finished work to real project
# ============================================================
#
# WHAT THIS DOES:
#   Agy works in a "scratch" folder (a copy of your project).
#   This script finds the 2 new files Agy created and copies
#   them to your REAL project folder.
#
#   Think of it like: the prep cook finished chopping vegetables
#   in the back room, and now you carry the bowl to the main kitchen.
#
# HOW TO USE:
#   cd "D:\.projects\ungasis\projects\newmont"
#   .\merge-agy-output.ps1
#
# ============================================================

$ErrorActionPreference = "Stop"

# Where Agy's scratch folder lives
$scratchBase = "C:\Users\My PC\.gemini\antigravity-cli\scratch"
$realProject = "D:\.projects\ungasis\projects\newmont"

# The 2 files we expect Agy to have created
$files = @(
    "src\components\modules\CandidatePipelineBlocker.tsx",
    "src\components\modules\DataDictionary.tsx"
)

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Merging Agy's output to real project" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Find the scratch folder
# Agy might name it "newmont" or "newmont-project" or something else
$scratchFolder = $null
$candidates = Get-ChildItem -Path $scratchBase -Directory -ErrorAction SilentlyContinue

foreach ($folder in $candidates) {
    # Check if this folder has our expected file structure
    $testPath = Join-Path $folder.FullName "src\components\modules\CandidatePipelineBlocker.tsx"
    if (Test-Path $testPath) {
        $scratchFolder = $folder.FullName
        break
    }
}

if (-not $scratchFolder) {
    # Try a broader search
    $found = Get-ChildItem -Path $scratchBase -Filter "CandidatePipelineBlocker.tsx" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) {
        # Walk up to find the project root (has package.json)
        $dir = $found.DirectoryName
        while ($dir -and !(Test-Path (Join-Path $dir "package.json"))) {
            $dir = Split-Path $dir -Parent
        }
        if ($dir) { $scratchFolder = $dir }
    }
}

if (-not $scratchFolder) {
    Write-Host "  ERROR: Could not find Agy's work in scratch folder." -ForegroundColor Red
    Write-Host "  Looked in: $scratchBase" -ForegroundColor Red
    Write-Host ""
    Write-Host "  Possible reasons:" -ForegroundColor Yellow
    Write-Host "    1. Agy hasn't finished yet" -ForegroundColor Yellow
    Write-Host "    2. Agy created the files with different names" -ForegroundColor Yellow
    Write-Host "    3. Agy worked in a different scratch path" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  Try running this to find the files manually:" -ForegroundColor DarkGray
    Write-Host "    Get-ChildItem -Path '$scratchBase' -Recurse -Filter '*.tsx' | Select Name, FullName" -ForegroundColor DarkGray
    exit 1
}

Write-Host "  Found Agy's work at:" -ForegroundColor Green
Write-Host "    $scratchFolder" -ForegroundColor DarkGray
Write-Host ""

# Step 2: Copy each file
$success = 0
foreach ($relPath in $files) {
    $source = Join-Path $scratchFolder $relPath
    $dest = Join-Path $realProject $relPath

    if (Test-Path $source) {
        $size = (Get-Item $source).Length
        if ($size -lt 100) {
            Write-Host "  WARNING: $relPath is very small ($size bytes) — might be empty" -ForegroundColor Yellow
        }

        # Make sure destination folder exists
        $destDir = Split-Path $dest -Parent
        if (!(Test-Path $destDir)) {
            New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        }

        Copy-Item -Path $source -Destination $dest -Force
        Write-Host "  COPIED: $relPath ($size bytes)" -ForegroundColor Green
        $success++
    } else {
        Write-Host "  MISSING: $relPath — not found in Agy's output" -ForegroundColor Red
    }
}

Write-Host ""

# Step 3: Verify
if ($success -eq $files.Count) {
    Write-Host "  All $success files copied successfully!" -ForegroundColor Green
    Write-Host ""

    # Step 4: Smoke test build
    Write-Host "  Running build check..." -ForegroundColor Yellow
    Push-Location $realProject
    try {
        $buildOutput = npm run build 2>&1 | Out-String
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  BUILD PASSED" -ForegroundColor Green
        } else {
            Write-Host "  BUILD FAILED — check output below:" -ForegroundColor Red
            Write-Host $buildOutput
        }
    } finally {
        Pop-Location
    }
} else {
    Write-Host "  WARNING: Only $success of $($files.Count) files were copied." -ForegroundColor Yellow
    Write-Host "  Check Agy's output for errors." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "  Done! Next step: git add -A && git commit" -ForegroundColor Cyan
Write-Host ""
