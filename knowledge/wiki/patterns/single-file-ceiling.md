# Single File Size Ceiling

## What
A performance rule that enforces a maximum size of 115KB for any single HTML file. Beyond this limit, the file must be split into modular components or sheets.

## Code (if applicable)
```powershell
# PowerShell script to check file sizes in project
Get-ChildItem -Filter *.html | Where-Object { $_.Length -gt 115KB } | ForEach-Object {
  Write-Warning "File $($_.Name) exceeds the 115KB ceiling ($($_.Length) bytes) and must be split!"
}
```

## When to Use
Apply to all static HTML projects to maintain fast page load times and keep the codebase easy for AI tools to parse.

## Gotchas
- Large CSS blocks or embedded base64 images inside HTML files will quickly push them past the 115KB ceiling. Keep styles and assets external.

## Source
Learned in: Unckiel's Tour Guide v10.2 (May 2026)
Verified in: None

## Tags
architecture, performance

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
