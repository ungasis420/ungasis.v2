# Permission Matrix

This tells what each AI helper may do.

## Simple idea

AI should not get full power by default.

## Matrix

| Mode | Can read | Can suggest | Can edit | Can run commands | Needs human approval |
|---|---:|---:|---:|---:|---:|
| Read-only | Yes | No | No | No | No |
| Draft | Yes | Yes | No | No | No |
| Patch limited | Yes | Yes | Limited | No | Yes |
| Test safe | Yes | Yes | No | Safe tests only | Yes |
| Release | Yes | Yes | No | No | Yes |
| Dangerous disabled | No | No | No | No | Always blocked |

## Feynman

Permissions are rules about what a helper is allowed to touch.

## Analogy

A visitor can sit in your living room. They should not open your safe.


## MCP Tool Permission Add-on

| Work type | Allowed MCP tools | Human approval needed |
|-----------|-------------------|-----------------------|
| Coding | filesystem | Before deleting or moving files. |
| Bug fix | filesystem, GitHub | Before GitHub writes or pull requests. |
| Research | fetch, memory | Before using private or sensitive data. |
| Architecture | filesystem, memory, sequential-thinking | Before writing final decisions. |

Simple rule: give the AI the smallest tool set needed for the current job.
