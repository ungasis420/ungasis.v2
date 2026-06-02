# Permission Matrix

## Purpose

This file decides what people, tools, and AI agents may do.

## Default beginner rule

Allow reading and drafting.
Block changing, deleting, sending, paying, or publishing until a human approves.

## Permission table

| Actor | Can read | Can draft | Can write | Can delete | Can send | Approval needed | Notes |
|---|---:|---:|---:|---:|---:|---:|---|
| Human owner | Yes | Yes | Yes | Yes | Yes | No | Still be careful |
| AI agent | Yes, limited | Yes | No by default | No | No | Yes | Keep safe |
| Guest tester | Limited | No | No | No | No | Yes | Use fake data |
| Automation | Limited | Limited | No by default | No | No | Yes | Log all runs |

## Risk levels

| Action | Risk | Rule |
|---|---|---|
| Read public docs | Low | Usually okay |
| Read private docs | Medium | Need permission |
| Draft message | Low | Human checks |
| Send message | High | Approval required |
| Delete data | High | Avoid early |
| Change permissions | High | Approval required |
| Spend money | High | Do not automate early |

## Feynman explanation

Permissions are rules that say who can look, change, send, or delete.

## Layman analogy

A shop worker may see the shelf. Only the manager can open the safe.
