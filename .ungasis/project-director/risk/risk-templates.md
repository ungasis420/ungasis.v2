# Risk Templates

## Purpose
Provides pre-written descriptions and mitigation strategies for the 10 most common risks encountered in the UNGASIS OS workspace.

## Templates Table

| Risk Name | Description | Default Category | Standard Mitigation Strategy |
|---|---|---|---|
| **API limit hit** | Free tier API limits exceeded, preventing model execution. | Resource | Rotate across multiple API keys; implement request throttling. |
| **Context overflow** | Session context grows too large, leading to dropped messages. | Technical | Trigger context decay; prune irrelevant files from active context. |
| **Model regression** | Model performance drops or model begins hallucinating edits. | Technical | Swap model routing to a higher-capability model (e.g. Pro/Opus). |
| **Stale content** | Knowledge or SOP files are outdated, leading to wrong instructions. | Quality | Run Auto-Tagger scan periodically to detect old footers. |
| **Dependency break** | Editing file A breaks dependent file B or crashes execution. | Technical | Perform impact check and update downstream files in queue. |
| **Key expiry** | Stored API credentials expire or are revoked. | Resource | Implement key monitoring; store backup keys in masters inventory. |
| **Audit loop** | Builder repeatedly fails quality checks, blocking git commit. | Quality | Roll back changes to previous commit; escalate decision to Mel. |
| **Scope creep** | Sprints expand beyond initial spec with too many tasks. | Schedule | Enforce maximum file limit per task; split XL tasks. |
| **Energy burnout** | Mel's energy level drops, leading to mistakes in manually merged files. | Resource | Enforce rest breaks; schedule simple tasks during low-energy hours. |
| **Data loss** | Accidental file deletions or overwrites. | Technical | Utilize Git checkout or revert procedures; verify tree state. |

## Rules
1. **Reuse Templates**: Copy and adapt these pre-written blocks when adding new items to the `risk-register.md`.
2. **Category Mapping**: Ensure categories match the five standard types defined in the risk framework.

## Inputs/Outputs
- **Inputs**: Risk register requests.
- **Outputs**: Instantiated risk template entries.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
