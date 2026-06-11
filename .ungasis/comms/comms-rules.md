# Comms Rules
 
## Purpose
Define the events and conditions that trigger notifications, including delivery channels and
recipient routing.
 
## How It Works
```
System Event ──> Check Notification Mapping ──> Format Message ──> Dispatch to Channel
```
 
## Rules
1. Every notification must be classified by its severity tier (L0-L4).
2. Low-severity notifications (L0-L1) are logged silently to disk and do not interrupt the user.
3.
Mid-to-high severity alerts (L2-L4) must be delivered immediately to Mel's active console or
message inbox.
4. Batch notifications that occur within 5 minutes of each other to prevent alert fatigue.
 
## Notification Routing Table
 
| Event Source | Severity | Trigger Condition | Delivery Channel | Recipient |
|---|---|---|---|---|
| Quality Auditor | L2 | Sprint audit FAIL | CLI Console Alert | Builder Agent / Mel |
| Resource Manager | L3 | API (Application Programming Interface) limit at 80%+ | UI Header Banner | Mel |
| Scout Engine | L1 | New tech discovered | Daily Summary Log | Scout inbox |
| System Monitor | L4 | Complete API (Application Programming Interface) fail | Pop-up Dialog / Email | Mel |
| Conductor | L2 | Task queue blocked | CLI Console Alert | Mel |
 
## Inputs/Outputs
 
| Input | Source | Description |
|---|---|---|
| Event payload | Event Bus | Incident or log event data |
 
| Output | Destination | Description |
|---|---|---|
| Formatted notification | Delivery Channel | User-facing message or email |

## Additional Context

### When to Use:
Use notification rules to format and deliver system warnings and status updates to Mel's
delivery channels.

### Example
```markdown
- [ ] Receive Sprint audit FAIL event.
- [ ] Format CLI Console Alert message.
- [ ] Deliver immediately to Builder Agent console.
```

### Tags:
notifications, alert-fatigue, status-updates, comms

### See also:
-
[warnings/warning-rules.md](./.ungasis/warnings/warning-rules.md)
-
[comms/escalation-matrix.md](./.ungasis/comms/escalation-matrix.md)
 
---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
