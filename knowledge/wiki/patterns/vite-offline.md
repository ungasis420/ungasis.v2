# Vite Offline Base Path

## What
Configuring Vite base path to relative routing (`'./'`) so that built assets can be loaded offline via `file://` protocols directly from local file storage.

## Code (if applicable)
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Configures relative paths for asset loading
});
```

## When to Use
Use when compiling standalone frontends that need to run completely offline on mobile phone web views or local storage drives.

## Gotchas
- Utilizing absolute slash paths (e.g. `/assets/`) will cause asset loading failures under local `file://` routing.

## Source
Learned in: Contemporario Arts v9.0 (May 2026)
Verified in: None

## Tags
architecture, vite

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
