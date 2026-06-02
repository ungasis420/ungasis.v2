# Stack Context

## Current stack

- Frontend: {{FRONTEND_STACK}}
- Backend: {{BACKEND_STACK}}
- Database/storage: {{DATA_STACK}}
- AI/provider layer: {{AI_STACK}}
- Deployment: {{DEPLOYMENT_STACK}}
- Testing: {{TEST_STACK}}

## Commands

```bash
{{INSTALL_COMMAND}}
{{DEV_COMMAND}}
{{TEST_COMMAND}}
{{CHECK_COMMAND}}
{{BUILD_COMMAND}}
```

## Stack principles

- Choose best fit for stage, not trendiest stack.
- Keep provider-specific logic behind adapters.
- Do not expose secrets in frontend/public code.
- Prefer local-first and exportable data for personal/prototype projects.

## Upgrade path

Describe what would trigger moving from prototype tooling to production tooling.
