# Event Rules

## Purpose
Define the operational logic for publishing, queuing, consuming, and clearing events within the system.

## Rules
1. **FIFO Ordering**: Events are processed sequentially in a First-In, First-Out (FIFO) queue order.
2. **Exactly-Once Delivery**: Each logged event must be consumed exactly once. Mark the event as consumed (`[x]` or `Yes`) in the ledger after successful consumer execution.
3. **Queue Fallback**: If a consumer is unavailable or fails to run, the event remains unconsumed and is queued for processing at the start of the next session.
4. **Priority Interrupts**: Critical events like `warning-found` or `audit-fail` take absolute priority and must interrupt normal processing to trigger immediate remediation.
5. **Session Synthesis**: The daily pulse script parses `event-log.md` at session start to generate a summary of unconsumed events.

## Connections
- **Engine Interconnect Bus**: Events travel across the bus channels documented in `bus-manifest.md`.
- **Warnings Subsystem**: Warning events are logged to the warnings database.
- **Quality Subsystem**: Quality score events feed the continuous audit tracker logs.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
