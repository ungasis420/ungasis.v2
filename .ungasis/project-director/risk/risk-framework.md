# Risk Framework

## Purpose
This document outlines the standard 4-step process used to identify, assess, mitigate, and monitor risks across all projects.

## How It Works
The risk lifecycle is executed continuously to detect and mitigate potential failures before they block delivery.

```
Identify Risk ──> Assess Score ──> Mitigate Risk ──> Monitor Status
```

## The 4-Step Process
1. **Identify**: Detect potential failures or blocks across five categories: Technical, Resource, Schedule, Quality, and External.
2. **Assess**: Evaluate probability and impact using the 3x3 risk scoring grid.
3. **Mitigate**: Develop and execute structured mitigation plans for any risk scored high or critical.
4. **Monitor**: Track status continuously and escalate if score thresholds are exceeded.

## Risk Categories

| Category | Definition | Example |
|---|---|---|
| **Technical** | Failures in models, configurations, or code paths | Context window overflow, model output drift |
| **Resource** | Limits on APIs, tokens, budget, or hardware | API rate limits reached, key expiry |
| **Schedule** | Delays in delivering sprints or milestones | Underestimating task sizes |
| **Quality** | Failures in meeting code standards or audit loop | Repetitive audit failures, test failures |
| **External** | Factors outside repository boundaries | Provider outages, local environment changes |

## Rules
1. **Continuous Identification**: Every new project card must document at least 2 potential risks.
2. **Mitigation Requirement**: Active mitigation plans must exist for all risks with a score >= 6.

## Inputs/Outputs
- **Inputs**: Codebase scans, API metrics, project logs.
- **Outputs**: Active risk mitigation tasks.

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
