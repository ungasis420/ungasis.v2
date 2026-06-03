# Security and Safety Rules

- Never put secrets in frontend/public code.
- Never commit `.env`, tokens, private keys, credentials, or connection strings.
- Ask before destructive commands, deploys, production changes, external messages, or permission/auth changes.
- Validate inputs at service boundaries.
- Treat AI-generated outputs as untrusted until checked.
- For production or user data, require backups, rollback, logging, and human approval gates.
