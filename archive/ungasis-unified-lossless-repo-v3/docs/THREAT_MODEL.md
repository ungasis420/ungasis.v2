# Threat Model

A threat model asks: what can go wrong?

## Assets to protect

- secrets
- user data
- project files
- prompts
- logs
- release process

## Main risks

| Risk | Control |
|---|---|
| Secret leak | `.env.example`, secret scan, no real keys in repo |
| AI edits too much | permission profiles, approval gates |
| Bad prompt tricks AI | red-team prompt tests |
| Bad workflow action | pinned actions later, least privilege now |
| No rollback | release and rollback guide |
| No trace | observability log format |

## Feynman

A threat model is thinking about danger before it happens.

## Analogy

Like checking windows before leaving home.
