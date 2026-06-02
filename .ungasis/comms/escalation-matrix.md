# Escalation Matrix

## Purpose
Define the severity levels of system issues and establish the routing protocol to resolve them.

## How It Works
```
Issue Occurs ──> Identify Severity ──> Route to Level 1 Resolver ──> If Unresolved ──> Escalate to Level 2
```

## Rules
1. Automatically attempt self-healing for all L0-L1 issues before triggering escalation.
2. Route L2 issues (e.g. minor build warnings, single-source API drops) to the primary builder agent.
3. Stop execution and prompt Mel immediately for L3-L4 issues (e.g. security block, complete key exhaustion).
4. All escalation path transfers must log an audit trail showing timestamps and fail reasons.

## Escalation Path Table

| Severity | Description | Primary Resolver | Secondary Resolver | Timeout |
|---|---|---|---|---|
| L0 (Info) | Minor log errors, notice | Auto-Tagger | None | N/A |
| L1 (Low) | Non-blocking file format issue | Builder (Self-Healing) | None | 5 min |
| L2 (Medium) | Build compile failure, audit FAIL | Builder Agent | Quality Auditor | 10 min |
| L3 (High) | Paid API keys limit exceeded | Context Engine | Mel | Immediate |
| L4 (Critical) | Git conflict, disk full, security | Mel | None | Immediate |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| Unresolved failure | Active Session | An error state that cannot be solved at current stage |

| Output | Destination | Description |
|---|---|---|
| Escalation ticket | System Console | Alert detailing the issue and handoff target |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
