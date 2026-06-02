# Chain Templates

## Purpose
Provide pre-defined, standardized skill chains for common development and maintenance workflows.

## How It Works
Templates map specific trigger contexts to sequence pipelines. They execute sequentially using the circuit breaker rule.

## Pre-Built Chains
| Name | Skill Sequence | Trigger Command | Target Agent |
|---|---|---|---|
| **Build Chain** | decompose → plan → build → audit → graphify | `/build` | Builder |
| **Debug Chain** | reproduce → isolate → fix → test → commit | `/debug` | Debugger |
| **Research Chain** | scout → evaluate → decide → document | `/research` | Scout |
| **Review Chain** | audit → score → fix → re-audit | `/review` | Auditor |
| **Deploy Chain** | build → test → deploy → monitor | `/deploy` | Deployer |

## Rules
1. **Immutable Flows**: Pre-built chains cannot be modified at runtime.
2. **Execution Context**: The active workspace context must be passed to each step.
3. **Step Validation**: Each transition must verify that the output of the preceding step matches the input of the next.

## Inputs/Outputs
| Component | Input Type | Output Type |
|---|---|---|
| Build Chain | Task Description | Graph Update Log |
| Debug Chain | Bug Report | Commit Hash |
| Research Chain | Research Topic | Codex Article |
| Review Chain | File Folder | Audit Scorecard |
| Deploy Chain | Branch Name | Performance Log |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
