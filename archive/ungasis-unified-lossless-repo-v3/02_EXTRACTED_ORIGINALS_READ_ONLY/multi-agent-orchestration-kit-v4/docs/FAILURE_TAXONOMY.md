# Failures

| # | Type | Freq | Fix |
|---|---|---|---|
| 1 | Transient | 60% | Retry+backoff |
| 2 | Context | 15% | Compress |
| 3 | Hallucination | 12% | Validate+fallback |
| 4 | Cascading | 8% | Isolate+rollback |
| 5 | Corruption | 5% | Checkpoint |
