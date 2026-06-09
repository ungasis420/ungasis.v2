$exclude = @("node_modules", ".git", "dist")

$all = Get-ChildItem -Path . -Recurse -Force -ErrorAction SilentlyContinue | Where-Object {
    $skip = $false
    foreach ($ex in $exclude) {
        if ($_.FullName -match "\\$ex(\\|$)") {
            $skip = $true
            break
        }
    }
    -not $skip
}

$files = @($all | Where-Object { -not $_.PSIsContainer }).Count
$folders = @($all | Where-Object { $_.PSIsContainer }).Count

Write-Output "Total Files: $files"
Write-Output "Total Folders: $folders"

Write-Output "---"
Write-Output "Directory Tree (Depth 3):"

# Function to print tree
function Print-Tree($Path, $Depth, $MaxDepth, $Prefix) {
    if ($Depth -gt $MaxDepth) { return }
    $items = Get-ChildItem -Path $Path -Force -ErrorAction SilentlyContinue | Where-Object {
        $skip = $false
        foreach ($ex in $exclude) {
            if ($_.Name -eq $ex) { $skip = $true; break }
        }
        -not $skip
    }
    
    $dirs = @($items | Where-Object { $_.PSIsContainer })
    for ($i = 0; $i -lt $dirs.Count; $i++) {
        $dir = $dirs[$i]
        $isLast = ($i -eq $dirs.Count - 1)
        $marker = if ($isLast) { "\--- " } else { "+--- " }
        Write-Output "$Prefix$marker$($dir.Name)"
        $nextPrefix = $Prefix + (if ($isLast) { "     " } else { "|    " })
        Print-Tree $dir.FullName ($Depth + 1) $MaxDepth $nextPrefix
    }
}

Print-Tree (Get-Item .).FullName 1 3 ""
