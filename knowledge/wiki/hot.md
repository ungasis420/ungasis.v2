# Hot Cache — Top Knowledge
> Auto-generated summary of the 10 most recent wiki entries.
> Max 500 words. Updated on every ingest.
Last updated: 2026-06-13T03:53:03+00:00

- **Gotcha: PowerShell Heredoc Injection** (gotchas): ## Gotcha: PowerShell Heredoc Injection The old CLAUDE.md had accidental PowerShell code at the top. Claude was reading script code as instructions, causing confusion. Always check CLAUDE.md for accid
- **Decision: Slim CLAUDE.md** (decisions): ## Decision: Slim CLAUDE.md We reduced CLAUDE.md from 12.8KB to 3.1KB (76% reduction). Detailed rules moved to .claude/rules/ folder. This saves approximately 2,450 tokens per session.
- **Metric: Token Savings Baseline** (metrics): ## Metric: Token Savings Baseline First session logged: 12,000 estimated tokens for 90-minute session. Target: reduce to 8,000 tokens for same work with wiki context. Measurement tool: scripts/token-l
- **Pattern: One-Shot Claude Code Builds** (metrics): ## Pattern: One-Shot Claude Code Builds Claude Code v2.1.177 built token-logger.py + token-report.py in 1 minute, 1 turn, 7,800 tokens. Key success factor: detailed /goal prompt with exact specs, file
- **Lessons from UNGASIS v5.1 MEASURE Sprint** (patterns): # Lessons from UNGASIS v5.1 MEASURE Sprint
- **AI Rationale Hallucinations** (gotchas): # AI Rationale Hallucinations ## What A bug where AI models hallucinate or invent component statistics and build details that do not exist in the source code files. ## Code (if applicable) ```typescri
- **Cline Rewriting Large Files Directly** (gotchas): # Cline Rewriting Large Files Directly ## What A gotcha where letting AI agents rewrite full files causes truncation or data loss in files exceeding 50KB. ## Code (if applicable) ```javascript // Avoi
- **Local Devstral Model Timeouts** (gotchas): # Local Devstral Model Timeouts ## What A performance issue where local Ollama models (like devstral) time out during coding tasks because of VRAM limitations. ## Code (if applicable) ```json /* Confi
- **Graphify OpenAI Base URL Handling** (gotchas): # Graphify OpenAI Base URL Handling ## What A bug where the `graphify-smart.ps1` script ignores the configured `OPENAI_BASE_URL` when attempting to query OpenAI-compatible local/custom backends. ## Co
- **Groq API Keys Expiring Silently** (gotchas): # Groq API Keys Expiring Silently ## What A bug where Groq API keys expire without any notification, breaking agent tasks mid-execution. ## Code (if applicable) ```bash # Verify API connection command
