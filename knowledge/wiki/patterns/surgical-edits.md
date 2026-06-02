# Surgical File Edits

## What
A pattern of using simple, localized Node.js scripts to read, replace targeted text segments, and write changes back to large HTML files, avoiding full file rewrites.

## Code (if applicable)
```javascript
// tools/edit-nav.js
const fs = require('fs');
const filePath = './index.html';

let html = fs.readFileSync(filePath, 'utf8');
const target = '<nav class="old">';
const replacement = '<nav class="new-glass-nav">';

if (html.includes(target)) {
  html = html.replace(target, replacement);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Surgical update succeeded!');
} else {
  console.error('Target not found!');
}
```

## When to Use
Use when updating index.html files that exceed 50KB to prevent AI code loss or context window overflow.

## Gotchas
- The search pattern string must match exactly, including leading spaces. If a single character differs, the replacement will fail.

## Source
Learned in: Newmont Dashboard v4.0 (May 2026)
Verified in: None

## Tags
workflow, js

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
