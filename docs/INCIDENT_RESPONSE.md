# Incident Response Log Template

## 1. Fire Department Analogy
Whenever a fire crew is called out to an emergency, they write down a report in their logbook. They record: what time they got the call, how they put out the fire, what started the fire (root cause), and what can be done to prevent that kind of fire from starting again. This document is our logbook for software emergencies.

---

## 2. Incident Log Template

Copy and fill out this template for every incident of severity **S1** or **S2**:

| Field | Detail |
|---|---|
| **Incident ID** | INC-2026-MM-DD-001 |
| **Date & Time** | 2026-06-02 18:00 (Asia/Manila) |
| **Severity Level** | S1 (Critical) / S2 (Major) |
| **What Happened** | *Describe the symptom (e.g., checkout page crashed on click)* |
| **Root Cause** | *Describe why it broke (e.g., missing API key in config)* |
| **Fix Applied** | *Describe how it was fixed (e.g., rollback to v4.0.1)* |
| **Time to Detect** | *Minutes from start to detection (e.g., 5 minutes)* |
| **Time to Fix** | *Minutes from detection to fix deployment (e.g., 10 minutes)* |
| **Lessons Learned** | *What we learned (e.g., always run config validation schema checks)* |
| **Prevention Steps**| *Action items to stop it from happening again (e.g., add CI check)* |

---

## 3. Incident History Archive

This log tracks historical incidents:

| Incident ID | Date | Severity | Impact | Resolution | Status |
|---|---|---|---|---|---|
| **INC-2026-06-02-01** | 2026-06-02 | S2 | Token budget cap triggered early. | Adjusted warning thresholds in `token-budget.yml`. | Closed |

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
