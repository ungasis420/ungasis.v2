# AI Agent Runtime Governance

## Rule

AI agents should start in read-only mode.

## Runtime requirements before real production

- run ID for every run
- permission check before tool use
- human approval before risky action
- logs for every action
- rollback plan
- error handling
- cost or token estimate
- red-team prompt tests

## Feynman

Runtime governance means the AI helper has rules while it works, not just before it starts.

## Analogy

Like a driving instructor with a second brake pedal.
