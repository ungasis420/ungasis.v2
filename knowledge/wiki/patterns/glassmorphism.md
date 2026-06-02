# Glassmorphism Styling

## What
A sleek, transparent visual container styling utilizing background opacity, border lines, and backdrop blur filters.

## Code (if applicable)
```css
/* CSS Standard style */
.glass-card {
  background-color: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}
```
In Tailwind CSS:
`bg-white/[0.04] backdrop-blur-xl border-white/10 rounded-2xl`

## When to Use
Use for visual cards, layouts, dialog blocks, and side navigation menus in dark-themed dashboards to establish visual depth.

## Gotchas
- Backdrop filter blur requires high rendering resources; too many overlapping glass containers will degrade mobile device performance.
- Ensure the background underneath contains enough contrast to make text legible.

## Source
Learned in: Unckiel's Tour Guide v10.2 (May 2026)
Verified in: QIM v5, Newmont v4.0

## Tags
design, css

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
