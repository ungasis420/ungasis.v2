# Cline Rewriting Large Files Directly

## What
A gotcha where letting AI agents rewrite full files causes truncation or data loss in files exceeding 50KB.

## Code (if applicable)
```javascript
// Avoid full file rewrites. Instead, run localized scripts to replace text:
const data = fs.readFileSync('index.html', 'utf8');
const updated = data.replace('<!-- target -->', '<!-- replacement -->');
fs.writeFileSync('index.html', updated, 'utf8');
```

## When to Use
Follow this rule when using AI agents to modify large layout and HTML code structures.

## Gotchas
- Letting Cline edit index.html directly can lead to missing code blocks, broken structures, or lost assets.

## Source
Learned in: Newmont Dashboard v4.0 (May 2026)
Verified in: None

## Tags
workflow, agent

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
