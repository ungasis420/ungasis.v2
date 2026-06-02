# Tool Permission Matrix

## 1. Kitchen Analogy
Think of this matrix like a restaurant staff badge system. The manager has a gold badge that opens every door, including the office and safe. The chef has a silver badge for the kitchen and walk-in freezer. The delivery driver only has access to the pickup counter. This document defines which "doors" our AI and developer tools are allowed to open.

---

## 2. Permissions Matrix Table

| Tool Name | Reads Files | Writes Files | Runs Commands | Internet Access | API Keys |
|---|---|---|---|---|---|
| **Antigravity CLI** | Yes | Yes | Yes (Restricted) | Yes | No (Uses local config) |
| **Cline** | Yes | Yes | Yes (Restricted) | Yes | No (Uses local config) |
| **Jules** | Yes | No | No | No | No |
| **GitHub Copilot** | Yes | No | No | Yes (To copilot API) | No |
| **Google AI Studio** | No (Upload only) | No | No | Yes | Yes (Stored in browser) |
| **Ollama** | No | No | No | No (Localhost only) | No |
| **Firebase** | Yes | Yes (Build files) | Yes | Yes | Yes (In deployment env) |
| **Cloudflare** | Yes | No | No | Yes | Yes (API Token) |

---

## 3. Security Guidelines
- **No Secrets in Logs:** Never log active API keys or user passwords.
- **Principle of Least Privilege:** Keep write permissions restricted to only the tools actively creating or modifying code.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
