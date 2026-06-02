# Test Commands

Replace placeholders with real project commands.

| Check | Command | Required before ship? | Notes |
|---|---|---|---|
| Template integrity | `python scripts/verify_template.py` | Yes | Always available |
| Install | `{{INSTALL_COMMAND}}` | TBD | Fill after project setup |
| Unit tests | `{{TEST_COMMAND}}` | Yes for logic changes | Fill after project setup |
| Lint/typecheck | `{{CHECK_COMMAND}}` | Yes when available | Fill after project setup |
| Build | `{{BUILD_COMMAND}}` | Yes before deploy | Fill after project setup |
| Smoke test | `{{SMOKE_TEST_COMMAND}}` | Yes before release | Fill after project setup |

## Verification response format

```text
Command:
Result:
Evidence:
Remaining gaps:
```
