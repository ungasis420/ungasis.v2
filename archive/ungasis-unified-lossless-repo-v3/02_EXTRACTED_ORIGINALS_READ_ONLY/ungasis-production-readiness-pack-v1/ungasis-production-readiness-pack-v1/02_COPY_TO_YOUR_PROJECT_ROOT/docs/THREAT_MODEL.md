# Threat Model

## Purpose

A threat model helps you think about what could go wrong.

## Simple threat table

| What could go wrong | Who/what causes it | Damage | Prevention | Test |
|---|---|---|---|---|
| Secret leaks | Human mistake | Account risk | Keep secrets out of files | Secret scan |
| Agent sends message | Agent mistake | Reputation harm | Human approval | Red-team test |
| Bad connector access | Wrong permission | Data risk | Least privilege | Permission review |
| Bad output | AI mistake | Wrong decision | Human review | Golden tests |

## Beginner questions

1. What data matters?
2. Who can access it?
3. What can the AI change?
4. What happens if it is wrong?
5. How do we stop it?
6. How do we undo it?

## Feynman explanation

A threat model is a list of ways the project can be harmed and how to reduce that harm.

## Layman analogy

Before leaving home, you check doors, windows, stove, and valuables.
