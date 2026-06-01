# 09 Connector Permission Registry

## Purpose

This file tracks outside tools your app or agent may connect to.

## Simple idea

A connector is a door to another tool.
Every door needs a lock and a rule.

## Connector table

| Connector | What it connects to | Read allowed? | Write allowed? | Approval needed? | Owner | Risk |
|---|---|---:|---:|---:|---|---|
| Example: GitHub | Code repository | Yes | No for now | Yes for changes | Project owner | Medium |
| Example: Email | Inbox/outbox | Yes | No for now | Yes before sending | Project owner | High |
| Example: Calendar | Events | Yes | No for now | Yes before changes | Project owner | Medium |

## Permission levels

| Level | Meaning | Beginner rule |
|---|---|---|
| Read | Can look only | Usually safest |
| Draft | Can prepare changes | Good for learning |
| Suggest | Can recommend action | Good default |
| Write | Can change records | Needs approval |
| Delete | Can remove data | Avoid unless expert-reviewed |
| Send | Can contact people | Always approve first |
| Pay | Can spend money | Do not automate early |

## Safe default

Use this default:

```text
Read: allowed only when needed.
Draft: allowed.
Write/send/delete/pay: blocked until human approval.
```

## Feynman explanation

Connector permissions decide which doors the AI may open and whether it can only look inside or also move things.

## Layman analogy

You may let a helper look at your grocery list. You may not let them use your credit card without asking.

## Hard words in this file

See `SIMPLE_WORDS_GLOSSARY.md` for:

- connector
- permission
- read
- write
- delete
- API
- token
- least privilege
