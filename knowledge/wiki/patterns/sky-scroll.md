# Sky-Scroll Gradient Background

## What
An elegant background theme utilizing subtle HSL gradient values `[30, 50, 90]` (soft orange/peach hues) paired with smooth scroll transitions to create premium visual contrast.

## Code (if applicable)
```css
/* CSS custom rules */
body.sky-scroll {
  background: linear-gradient(
    135deg,
    hsl(30, 50%, 90%) 0%,
    hsl(50, 50%, 90%) 50%,
    hsl(90, 50%, 90%) 100%
  );
  background-attachment: fixed;
  min-height: 100vh;
}
```

## When to Use
Use as the default background for all web applications in the UNGASIS OS ecosystem to ensure readability and look visually premium.

## Gotchas
- Do not make the gradient colors too dark or too saturated, otherwise glassmorphism text readability will fail accessibility standards.

## Source
Learned in: Newmont Dashboard v4.0 (May 2026)
Verified in: None

## Tags
design, css

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
