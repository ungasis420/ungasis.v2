# Floating Dot Navigation

## What
A floating sidebar navigation indicator designed as stacked dots. Requires setting `left: auto` to prevent stretching.

## Code (if applicable)
```css
/* CSS configuration */
.dot-nav {
  position: fixed;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  left: auto; /* MUST BE AUTO to prevent full-viewport stretching */
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
```

## When to Use
Use when building multi-section scrolling single-page applications that need minimal navigational overlays.

## Gotchas
- If `left: 0` is set globally on general navigation elements (e.g. `nav`), the dot navigation container will stretch across the viewport, blocking underlying buttons from being clickable.

## Source
Learned in: Unckiel's Tour Guide v10.2 (May 2026)
Verified in: None

## Tags
design, css, js

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
