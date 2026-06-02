# Energy Rules Engine

## Purpose
Track operator energy levels and enforce task assignment constraints to maximize focus and prevent burnout.

## How It Works
```
Check Time/Fatigue ──> Determine Energy level (🔴🟡🟢) ──> Enforce Task Assignment Rules
```

## Rules
1. Assign task sizes based on current energy level:
   - 🟢 High energy: S, M, L, and XL tasks are permitted.
   - 🟡 Medium energy: Only S and M tasks are permitted; defer L tasks.
   - 🔴 Low energy: Only S tasks are permitted, or suggest a break.
2. Under no circumstances should an XL task be assigned or worked on when the operator's energy is 🔴 Low.
3. If coding activity is continuous for 2 hours, trigger an automatic suggestion to take a break.

## Energy Task Assignment Matrix

| Energy Level | Description | Permitted Task Sizes | Action Triggered |
|---|---|---|---|
| 🟢 High | Full focus, peak alertness | S, M, L, XL | Process priority tasks |
| 🟡 Medium | Standard focus, minor fatigue | S, M | Defer complex files |
| 🔴 Low | Fatigued, late night dip | S only | Suggest physical break |

## Inputs/Outputs

| Input | Source | Description |
|---|---|---|
| `session_duration` | Conductor | Time active in the current session |
| `current_time` | Local Time | Current hour of the day |
| `historical_patterns` | Energy Patterns | Mapped energy levels per hour |

| Output | Destination | Description |
|---|---|---|
| `active_energy_state` | Session Planner | Allowed task parameters and sizing |

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
