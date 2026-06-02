# graphify-smart.ps1 — Smart Routing for Graphify
# Tries 7 backends in order. Progress is cached between runs.
# Usage: .\scripts\graphify-smart.ps1

$projectPath = "C:\Users\63905\Downloads\ungasis"

# Load .env
Get-Content "$projectPath\.env" | ForEach-Object {
    if ($_ -match '^([^#][^=]+)=(.+)$') {
        [Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim(), "Process")
    }
}

# Backend chain — order: fastest free limits → best quality
$backends = @(
    @{ Name = "Groq"; Backend = "openai"; Key = $env:GROQ_API_KEY; Base = $env:GROQ_BASE_URL; Model = "llama-3.3-70b-versatile" }
    @{ Name = "Cerebras"; Backend = "openai"; Key = $env:CEREBRAS_API_KEY; Base = $env:CEREBRAS_BASE_URL; Model = "llama3.1-8b" }
    @{ Name = "Together"; Backend = "openai"; Key = $env:TOGETHER_API_KEY; Base = $env:TOGETHER_BASE_URL; Model = "meta-llama/Llama-3.3-70B-Instruct-Turbo" }
    @{ Name = "Gemini"; Backend = "gemini"; Key = $env:GEMINI_API_KEY; Base = $null; Model = $null }
    @{ Name = "Mistral"; Backend = "openai"; Key = $env:MISTRAL_API_KEY; Base = $env:MISTRAL_BASE_URL; Model = "mistral-small-latest" }
    @{ Name = "DeepSeek"; Backend = "deepseek"; Key = $env:DEEPSEEK_API_KEY; Base = $null; Model = $null }
    @{ Name = "OpenRouter"; Backend = "openai"; Key = $env:OPENROUTER_API_KEY; Base = $env:OPENROUTER_BASE_URL; Model = "meta-llama/llama-3.3-70b-instruct:free" }
)

Write-Host "`n=== Graphify Smart Router ===" -ForegroundColor Cyan
Write-Host "Project: $projectPath"
Write-Host "Backends: $($backends.Count) configured`n"

foreach ($b in $backends) {
    # Skip if no key
    if (-not $b.Key) {
        Write-Host "SKIP: $($b.Name) — no API key set" -ForegroundColor DarkGray
        continue
    }

    Write-Host "--- Trying: $($b.Name) ---" -ForegroundColor Yellow

    # Clear previous OpenAI vars
    [Environment]::SetEnvironmentVariable("OPENAI_API_KEY", $null, "Process")
    [Environment]::SetEnvironmentVariable("OPENAI_BASE_URL", $null, "Process")

    # Set backend-specific vars
    if ($b.Backend -eq "openai") {
        [Environment]::SetEnvironmentVariable("OPENAI_API_KEY", $b.Key, "Process")
        [Environment]::SetEnvironmentVariable("OPENAI_BASE_URL", $b.Base, "Process")
    }
    elseif ($b.Backend -eq "gemini") {
        [Environment]::SetEnvironmentVariable("GEMINI_API_KEY", $b.Key, "Process")
    }
    elseif ($b.Backend -eq "deepseek") {
        [Environment]::SetEnvironmentVariable("DEEPSEEK_API_KEY", $b.Key, "Process")
    }

    # Build command
    $args = "extract `"$projectPath`" --backend $($b.Backend)"
    if ($b.Model) { $args += " --model $($b.Model)" }

    Write-Host "Command: graphify $args" -ForegroundColor Gray

    # Run and capture output
    $output = & graphify extract $projectPath --backend $($b.Backend) $(if($b.Model){"--model"; $b.Model}) 2>&1 | Tee-Object -Variable rawOutput
    $outputText = $rawOutput -join "`n"

    # Count results
    $doneChunks = ([regex]::Matches($outputText, "chunk \d+/\d+ done")).Count
    $failChunks = ([regex]::Matches($outputText, "chunk \d+/\d+ failed")).Count
    $totalChunks = $doneChunks + $failChunks

    # Check cache hits
    $cacheMatch = [regex]::Match($outputText, "semantic cache: (\d+) hit / (\d+) miss")
    $cacheHits = if ($cacheMatch.Success) { $cacheMatch.Groups[1].Value } else { "?" }
    $cacheMiss = if ($cacheMatch.Success) { $cacheMatch.Groups[2].Value } else { "?" }

    Write-Host "Results: $doneChunks done, $failChunks failed (cache: $cacheHits hit / $cacheMiss miss)" -ForegroundColor Gray

    if ($doneChunks -gt 0 -and $failChunks -eq 0) {
        Write-Host "`nALL CHUNKS DONE with $($b.Name)!" -ForegroundColor Green
        Write-Host "Generating report..." -ForegroundColor Cyan
        & graphify cluster-only $projectPath
        Write-Host "`n=== COMPLETE! ===" -ForegroundColor Green
        Write-Host "Check: graphify-out\GRAPH_REPORT.md"
        Write-Host "Check: graphify-out\graph.html"
        exit 0
    }
    elseif ($doneChunks -gt 0) {
        Write-Host "Partial: $doneChunks chunks cached. Rotating to next backend...`n" -ForegroundColor DarkYellow
        Start-Sleep -Seconds 3
        continue
    }
    else {
        Write-Host "No chunks completed. Rotating...`n" -ForegroundColor Red
        Start-Sleep -Seconds 2
        continue
    }
}

# After all backends
Write-Host "`n=== All backends attempted ===" -ForegroundColor Yellow
Write-Host "Progress is cached. Run this script again to continue."
Write-Host "To generate report from current data: graphify cluster-only $projectPath"