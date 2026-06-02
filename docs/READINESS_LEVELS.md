# Project Readiness Levels Quick-Reference

## 1. Cooking Analogy
Developing software is like introducing a new signature dish to a restaurant:
- **L0 (Idea):** You write down a recipe idea in your notebook.
- **L1 (Local Prototype):** You cook a single test plate for yourself to see if the flavors work.
- **L2 (Testable Build):** You make a batch and let the kitchen crew taste it and suggest adjustments.
- **L3 (Private Beta):** You serve it as a daily special to a few trusted regular customers.
- **L4 (Production Ready):** You add it permanently to the main menu for anyone to order.

---

## 2. Readiness Levels Requirements

Use this quick-reference table to determine the readiness level of your project:

| Level | Name | Target Environment | Key Requirements | Verification Needed |
|---|---|---|---|---|
| **L0** | Idea Only | Mind/Notes | Concept explanation, target features list. | Read and understand the goal. |
| **L1** | Local Prototype | Local Computer | Running code, basic setup files, single-user tests. | Manual code execution. |
| **L2** | Testable Build | Developer Branch | Unit tests, documentation, clean style check. | Pull request review, tests pass. |
| **L3** | Private Beta | Staging Server | Deployed environment, error monitoring, limited testers. | Smoke tests, log verification. |
| **L4** | Production Ready | Live Server | Scale tests, active alerts, rollback commands, owner sign-off. | Automated CI/CD, live verification. |

---

## 3. Level Upgrade Gatekeeper
Before promoting a project to a higher level, make sure all checks for that level are 100% complete. Do not skip levels—safety first!

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
