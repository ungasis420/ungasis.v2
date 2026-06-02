# Task Metrics Template

## Purpose
Provide a standardized, pipe-delimited template for logging performance, token costs, and duration metrics after every task.

## How It Works
```
Task Completes ──> Copy Template ──> Populate Fields ──> Save to .ungasis/evolution/metrics/
```

## Rules
1. Every completed task must generate a metrics log file matching this template.
2. Metrics logs must be saved under `.ungasis/evolution/metrics/` with the filename format `task-[timestamp].md`.
3. Never include API keys, credentials, or sensitive data in the metrics.
4. Use the predefined pipe-delimited formats to support automatic parser scripts.

## Metrics Fields Table

| Field Name | Type | Description / Valid Values |
|---|---|---|
| Task ID | String | The unique task identifier (e.g., F11c-01) |
| Sprint | String | The parent sprint name (e.g., F11c) |
| Duration | Number | Total task execution time in seconds |
| Status | String | Task outcome: `SUCCESS` or `FAILED` |
| Input Tokens | Number | Count of prompt input tokens |
| Output Tokens | Number | Count of completion output tokens |
| Errors Encountered | String | Semicolon-separated list of errors, or `None` |
| Self-Check | String | Verification result statement |

## Template Body
```markdown
# Task Metrics: [Insert Task ID]

| Parameter | Value |
|---|---|
| Task ID | [Task ID] |
| Sprint | [Sprint Name] |
| Duration (sec) | [Duration] |
| Status | [SUCCESS / FAILED] |
| Input Tokens | [Input Tokens] |
| Output Tokens | [Output Tokens] |
| Error Count | [Number of Retries/Fails] |
| Error Details | [None / Details] |
| Self-Check | [PASS / FAIL] |
```

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| Session execution data | Active Agent | Raw run times, token counts, and file changes |

| Output | Destination | Description |
|---|---|---|
| Metrics markdown file | Disk (`.ungasis/evolution/metrics/`) | Completed metrics file |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
