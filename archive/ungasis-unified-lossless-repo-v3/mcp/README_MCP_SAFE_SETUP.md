# MCP Safe Setup

MCP means **Model Context Protocol**. It lets an AI helper connect to tools like files, GitHub, memory, and web fetch.

## Very important

Do not put a real GitHub token inside a file you commit.

Use this file as the safe example:

```text
mcp/mcp-config.safe.example.json
```

Keep your real local file private:

```text
mcp/mcp-config.local.json
```

`mcp-config.local.json` is ignored by `.gitignore` in this repo.

## Feynman explanation

MCP gives the AI hands. Permissions decide what those hands can touch.

## Layman analogy

Do not give a house guest your master key. Give them the key for one room only.

## Safe default

| Work type | Tools allowed |
|-----------|---------------|
| Coding | filesystem only |
| Bug fix | filesystem, GitHub with approval |
| Research | fetch, memory |
| Architecture | filesystem, memory, sequential-thinking |

## Human approval required

Ask before:

- writing to GitHub
- deleting files
- changing permissions
- sending messages
- touching sensitive data
- using a token with broad access
