# Component Length Limit (200 Lines)

## What
A modular architecture rule enforcing a strict limit of 200 lines per React component file. Once a file exceeds 200 lines, it must be split.

## Code (if applicable)
```typescript
// Example of splitting a large component
// INSTEAD of placing DashboardStats and DashboardChart in the same file:
// Import them as modular sub-components:
import DashboardStats from './DashboardStats';
import DashboardChart from './DashboardChart';

export default function DashboardContainer() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardStats />
      <DashboardChart />
    </div>
  );
}
```

## When to Use
Apply to all React/Next.js components to ensure the code remains readable and easily parsed by AI coding agents.

## Gotchas
- Inline SVG icons and massive configuration objects can quickly inflate line counts. Always extract them into separate folders or utility files.

## Source
Learned in: RiftCoach Phase 5 (May 2026)
Verified in: None

## Tags
react, architecture

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
