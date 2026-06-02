# Supply Chain Security — Know Where Your Ingredients Come From

## 1. Kitchen Analogy
A reliable restaurant does not buy its ingredients from a random truck in an alley. It buys from licensed, trusted suppliers who provide health certificates. If a supplier sells contaminated food, it can ruin all your dishes and make your customers sick. In software, "ingredients" are outside libraries, tools, and packages. If an outside dependency is compromised, it can put your entire project at risk.

---

## 2. Dependency Audit Checklist
To keep outside code and packages safe, follow this checklist before updates:

- [ ] **Check for Vulnerabilities:** Run automated auditing tools (e.g., `npm audit` or `pip-audit`) to check for known security bugs.
- [ ] **Pin Dependency Versions:** Lock packages to exact version numbers (e.g., use `package-lock.json` or `requirements.txt` with `==`) to avoid auto-updating to compromised versions.
- [ ] **Review Before Updating:** Inspect changes in outside code before upgrading packages.
- [ ] **Use Lockfiles:** Keep dependency tree structures locked so every dev environment installs the exact same packages.

---

## 3. Tool Trust Registry

We evaluate and list the trust ratings of development tools used in our workspace:

| Tool Name | Trusted Source | Update Frequency | Risk Level | Safety Guideline |
|---|---|---|---|---|
| **Antigravity CLI** | Google Official | On Demand / Stable | Low | Download only from Google's official install paths. |
| **Cline** | VS Code Marketplace | Automatic | Medium | Limit file-writing permissions in config. |
| **Jules** | Internal / Official | Weekly | Low | Read-only access to workspace code. |
| **Google AI Studio** | Google Web App | Managed by Google | Low | Never paste raw user API keys or client passwords. |
| **Firebase CLI** | Google Official | Monthly | Low | Authenticate only via secure command-line flow. |

---

## 4. MCP Server Trust Guidelines
Model Context Protocol (MCP) servers extend our AI capability. Follow these rules to keep them secure:
- **Verified Sources Only:** Only install MCP servers built by official organizations (like Google) or highly-starred, verified open-source authors.
- **Inspect Configuration:** Check MCP configuration files to ensure no environment variables containing secrets are passed to untrusted servers.
- **Access Limits:** Block MCP servers from accessing files or directories outside the designated workspace path.

---

## 5. Cross-References
- [.env.example](file:///c:/Users/63905/Downloads/ungasis/.env.example) — Demonstrates secure environment key management.
- [kill-switch.yml](file:///c:/Users/63905/Downloads/ungasis/config/kill-switch.yml) — Governs automatic shutdown behaviors if a leaked key is detected.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
