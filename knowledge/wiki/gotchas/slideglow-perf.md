# slideGlow Animation Mobile Performance

## What
A bug where applying complex CSS keyframe glow animations (like `slideGlow`) degrades mobile rendering performance and drains device batteries.

## Code (if applicable)
```css
/* Reduce animation complexity on mobile */
@media (max-width: 768px) {
  .glow-container {
    animation: none; /* Disable expensive animations on small devices */
    background: rgba(255, 255, 255, 0.04);
  }
}
```

## When to Use
Use inside CSS style sheets to optimize performance for users on small or resource-constrained devices.

## Gotchas
- Overuse of CSS box-shadow animations paired with backdrop blur filters can freeze mobile browser windows.

## Source
Learned in: QIM Dashboard v5 (May 2026)
Verified in: None

## Tags
css, performance

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
