// src/test/mocks/redis.ts
import { vi } from 'vitest';

const store = new Map<string, string>();
export const resetMockRedis = () => store.clear();

export function createMockRedis() {
  return {
    get: vi.fn(async (k: string) => {
      const v = store.get(k);
      if (v === undefined) return null;
      try { return JSON.parse(v); } catch { return v; }
    }),
    set: vi.fn(async (k: string, v: unknown) => {
      store.set(k, typeof v === 'string' ? v : JSON.stringify(v));
      return 'OK';
    }),
    del: vi.fn(async (...keys: string[]) => keys.reduce((acc, k) => acc + (store.delete(k) ? 1 : 0), 0)),
    hset: vi.fn(async (k: string, f: string | Record<string, unknown>, v?: unknown) => {
      const data = store.has(k) ? JSON.parse(store.get(k)!) : {};
      if (typeof f === 'string') data[f] = v; else Object.assign(data, f);
      store.set(k, JSON.stringify(data));
      return 1;
    }),
    hget: vi.fn(async (k: string, f: string) => store.has(k) ? JSON.parse(store.get(k)!)[f] ?? null : null),
    hgetall: vi.fn(async (k: string) => store.has(k) ? JSON.parse(store.get(k)!) : null),
    expire: vi.fn(async (_key: string, _seconds: number) => 1),
    pipeline: vi.fn(() => ({ exec: vi.fn(async () => []) })),
  };
}

// Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
