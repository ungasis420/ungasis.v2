// src/test/mocks/redis.test.ts
// @vitest-environment node

import { describe, it, expect, beforeEach } from 'vitest';
import { createMockRedis, resetMockRedis } from './redis';

describe('Mock Redis', () => {
  beforeEach(() => {
    resetMockRedis();
  });

  it('should get, set, and delete string keys', async () => {
    const redis = createMockRedis();
    expect(await redis.get('key')).toBeNull();
    expect(await redis.set('key', 'value')).toBe('OK');
    expect(await redis.get('key')).toBe('value');
    expect(await redis.del('key')).toBe(1);
    expect(await redis.get('key')).toBeNull();
  });

  it('should support hash operations', async () => {
    const redis = createMockRedis();
    expect(await redis.hget('myhash', 'field')).toBeNull();
    expect(await redis.hset('myhash', 'field', 'val')).toBe(1);
    expect(await redis.hget('myhash', 'field')).toBe('val');
    expect(await redis.hgetall('myhash')).toEqual({ field: 'val' });

    // Object signature
    expect(await redis.hset('myhash', { other: 123 })).toBe(1);
    expect(await redis.hgetall('myhash')).toEqual({ field: 'val', other: 123 });
  });

  it('should support pipeline and expire', async () => {
    const redis = createMockRedis();
    expect(await redis.expire('key', 60)).toBe(1);
    const pipe = redis.pipeline();
    expect(await pipe.exec()).toEqual([]);
  });
});

// Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
