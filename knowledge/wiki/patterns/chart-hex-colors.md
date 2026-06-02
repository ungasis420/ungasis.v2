# Chart Colors Using Inline Hex Codes

## What
Always styling chart elements (e.g. Recharts Bar/Cell components) using direct inline `fill="#HEX"` values instead of relying on Tailwind CSS class utility names.

## Code (if applicable)
```jsx
// React Recharts component
import { BarChart, Bar, Cell } from 'recharts';

const data = [{ name: 'A', value: 100 }];

export default function StackedChart() {
  return (
    <BarChart width={150} height={40} data={data}>
      <Bar dataKey="value">
        {/* Fill must use raw hex color directly */}
        <Cell fill="#00d4ff" /> 
      </Bar>
    </BarChart>
  );
}
```

## When to Use
Use inside React charting dashboards (such as Recharts or Chart.js packages) where SVG path fills fail to resolve Tailwind CSS classes correctly.

## Gotchas
- Utilizing Tailwind utility styling (e.g. `className="fill-cyan-400"`) often leads to rendering black or uncolored shapes inside SVGs due to charting package styling pipelines.

## Source
Learned in: QIM Dashboard v5 (May 2026)
Verified in: None

## Tags
design, react, nextjs

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
