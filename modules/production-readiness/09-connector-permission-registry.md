# Connector & Permission Registry — Who Has Keys to What?

## 1. Kitchen Analogy
In a restaurant, not everyone has the keys to everything. The dishwasher does not need the key to the office safe. The delivery driver does not need access to the secret spice cabinet. Each worker is only given the keys they need to perform their specific job. This registry keeps track of which tools have access to what parts of our project.

---

## 2. Principle of Least Privilege
**The Least Privilege Rule:** Give each tool only the minimum access it absolutely needs to do its job, and nothing more. This prevents accidents, such as a code assistant deleting the production database.

---

## 3. Tool Permission Matrix

This registry tracks the active permission status for all tools in our environment:

| Tool Name | Read Access | Write Access | Delete Access | Admin Access | Notes |
|---|---|---|---|---|---|
| **Antigravity CLI** | Read-Write | Read-Write | Blocked | None | Primary development tool, needs file access. |
| **Cline** | Read-Write | Read-Write | Blocked | None | Secondary development agent. |
| **Jules** | Read-Only | Blocked | Blocked | None | Code reading and search helper. |
| **GitHub Copilot** | Read-Only | Blocked | Blocked | None | Inline code completions, local reading only. |
| **Google AI Studio** | Read-Only | Blocked | Blocked | None | Prototyping prompts and model tests. |
| **Ollama** | Read-Only | Blocked | Blocked | None | Local LLM host for testing. |
| **Firebase** | Read-Write | Read-Write | Blocked | None | Deploys web hosting files. |
| **Cloudflare** | Read-Write | Blocked | Blocked | None | Routing and static content caching. |

---

## 4. Permission Levels Explanation

| Level | Access Scope | Risk Level | Safety Guideline |
|---|---|---|---|
| **None** | No access allowed. | Zero | Blocked by default. |
| **Read-Only** | Can look at code/data but cannot change it. | Low | Safe for general use. |
| **Read-Write** | Can edit and add files. | Medium | Requires automated test runs before saving. |
| **Full Access** | Can edit, add, delete, and configure. | High | Requires human owner gate approval. |

---

## 5. Cross-References
- [PERMISSION_MATRIX.md](file:///c:/Users/63905/Downloads/ungasis/docs/PERMISSION_MATRIX.md) — Quick-reference document showing detailed tool capabilities.
- [orchestration-policy.yml](file:///c:/Users/63905/Downloads/ungasis/config/orchestration-policy.yml) — Defines policies for tools delegating tasks to other sub-tools.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
