# IndexedDB (Dexie.js) over Supabase

## What
Choosing client-side IndexedDB via Dexie.js instead of Supabase or remote databases to maintain a $0 server hosting cost and support offline-first operation.

## Code (if applicable)
```typescript
import Dexie, { type Table } from 'dexie';

interface Quest {
  id?: number;
  title: string;
  status: string;
}

class UngasisDatabase extends Dexie {
  quests!: Table<Quest>;
  constructor() {
    super('UngasisDB');
    this.version(1).stores({
      quests: '++id, title, status'
    });
  }
}
export const db = new UngasisDatabase();
```

## When to Use
Apply to applications where data privacy, zero-cost scaling, and complete offline usage are prioritized.

## Gotchas
- Since all data is stored on the client's browser, clearing browser caches or using incognito mode will delete local tables. Implement export/import backup options.

## Source
Learned in: Mel's Architecture Review (May 2026)
Verified in: None

## Tags
architecture, performance

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
