param (
    [string]$ScratchDir = "C:\Users\My PC\.gemini\antigravity-cli\scratch\ungasis",
    [string]$ProjectRoot = "D:\.projects\ungasis"
)

if (-not (Test-Path $ScratchDir)) {
    Write-Host "Scratch directory not found: $ScratchDir"
    exit 1
}

$files = Get-ChildItem -Path $ScratchDir -File -Recurse
$merged = 0
$skipped = 0

foreach ($file in $files) {
    $relPath = $file.FullName.Substring($ScratchDir.Length).TrimStart('\/')
    $targetPath = Join-Path $ProjectRoot $relPath
    $targetDir = Split-Path $targetPath -Parent

    if (-not (Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    }

    if (Test-Path $targetPath) {
        $sourceHash = (Get-FileHash $file.FullName -Algorithm MD5).Hash
        $targetHash = (Get-FileHash $targetPath -Algorithm MD5).Hash
        
        if ($sourceHash -eq $targetHash) {
            $skipped++
            continue
        }
    }

    Copy-Item -Path $file.FullName -Destination $targetPath -Force
    Write-Host "Merged: $relPath"
    $merged++
}

Write-Host ""
Write-Host "--- Merge Summary ---"
Write-Host "Merged Files : $merged"
Write-Host "Skipped Files: $skipped (unchanged)"

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
