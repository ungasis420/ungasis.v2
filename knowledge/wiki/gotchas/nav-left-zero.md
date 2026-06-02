# Nav Left Zero stretching dot-nav

## What
A bug where setting a general `nav { left: 0 }` rule stretches floating dot navigation containers across the entire width of the page.

## Code (if applicable)
```css
/* Avoid general settings like this */
nav {
  left: 0;
}

/* Explicitly fix inside dot-nav classes */
.dot-nav {
  left: auto; /* Corrects layout behavior */
}
```

## When to Use
Apply this fix whenever designing floating vertical nav containers, especially side dots, to keep them aligned to the edge.

## Gotchas
- Stretched nav blocks block pointer clicks on underlying content, making links unclickable.

## Source
Learned in: Unckiel's Tour Guide v10.2 (May 2026)
Verified in: None

## Tags
css, design

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
