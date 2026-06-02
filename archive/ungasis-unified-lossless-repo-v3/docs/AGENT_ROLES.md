# Agent Roles

Use these roles when several AI helpers work on one project.

| Role | Job | Can edit? | Needs approval? |
|------|-----|-----------|-----------------|
| Planner | Breaks work into steps | No | No |
| Builder | Makes limited changes | Yes, limited | Yes for important files |
| Tester | Runs safe checks | No or limited | Yes for risky commands |
| Reviewer | Checks quality and safety | No | No |
| Docs | Updates guides and notes | Yes, docs only | Yes for public docs |

## Rule

No helper should be Planner, Builder, and Reviewer for the same risky change.

## Layman analogy

One person cooks, another tastes, and another checks the bill.
