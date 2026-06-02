# Session Metrics

## Purpose
Define the storage format, structure, and retention policy for daily session metrics.

## How It Works
1. Daily metrics are logged continuously into JSONL files at the end of each task execution.
2. At the end of the day or session, metrics are analyzed by checking for cost and error trends.

## Rules
1. Metrics must be stored in JSONL format, one file per day (e.g. `2026-06-02.jsonl`).
2. Keep daily files for exactly 90 days, then compile them into monthly rollup summaries.

## Entry Format
```json
{"timestamp": "2026-06-02T22:30:00", "task": "build component", "model": "gemini-flash", "tokens_in": 2400, "tokens_out": 1800, "success": true, "retries": 0, "time_seconds": 45, "human_correction": false}
```

## Inputs/Outputs

| Input | Description |
|---|---|
| Active Session Metrics | Logged from agent loop |

| Output | Description |
|---|---|
| `YYYY-MM-DD.jsonl` | Stored daily metrics file |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
