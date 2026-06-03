# Project State Machine

## Purpose
Enforce a formal lifecycle for all active and concept projects, ensuring no project changes state without verification.

## States Table
| State | Icon | Meaning | Next States |
|---|:---:|---|---|
| `IDEA` | 💡 | Not started, raw concept | `VALIDATED`, `ARCHIVED` |
| `VALIDATED` | ✅ | Revenue model verified | `ACTIVE` |
| `ACTIVE` | 🟢 | Development sprint work ongoing | `PAUSED`, `BLOCKED`, `COMPLETE` |
| `PAUSED` | ⏸️ | Execution temporarily on hold | `ACTIVE`, `ARCHIVED` |
| `BLOCKED` | 🔴 | Stopped by external blocker | `ACTIVE` (when unblocked) |
| `COMPLETE` | 🏆 | Shipped MVP or V1.0 released | `MAINTAINED`, `ARCHIVED` |
| `MAINTAINED` | 🔧 | Deployed, receiving maintenance | `ARCHIVED` |
| `ARCHIVED` | 📦 | Long-term cold storage | *(Terminal state)* |

## Transition Rules
1. **`IDEA` → `VALIDATED`**: Requires passing the standard Revenue Validation SOP (must clear the target revenue-to-effort threshold).
2. **`VALIDATED` → `ACTIVE`**: Requires a validated sprint plan on the task queue.
3. **`ACTIVE` → `PAUSED`**: Requires logging the specific postponement rationale in the portfolio index.
4. **`ACTIVE` → `BLOCKED`**: Requires documenting the exact external dependency and estimated resolution date.
5. **`ACTIVE` → `COMPLETE`**: Requires passing a final comprehensive QA audit with zero warnings.
6. **Any → `ARCHIVED`**: Requires updating `portfolio-overview.md` to flag the project status change.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
