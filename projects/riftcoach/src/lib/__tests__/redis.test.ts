import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('@upstash/redis', () => {
  return {
    Redis: {
      fromEnv: vi.fn(() => ({ mockInstance: true })),
    },
  };
});

describe('redis.ts', () => {
  let consoleWarnMock: any;

  beforeEach(() => {
    vi.resetModules();
    consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    consoleWarnMock.mockRestore();
  });

  it('should configure redis when env vars are present', async () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://mock.url');
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'mock-token');

    const { isRedisConfigured, redis } = await import('../redis');
    const { Redis } = await import('@upstash/redis');

    expect(isRedisConfigured()).toBe(true);
    expect(Redis.fromEnv).toHaveBeenCalled();
    expect(redis).toEqual({ mockInstance: true });
  });

  it('should gracefully fallback when env vars are missing', async () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '');
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '');

    const { isRedisConfigured, redis } = await import('../redis');

    expect(isRedisConfigured()).toBe(false);
    expect(redis).toBeNull();
    expect(consoleWarnMock).toHaveBeenCalledWith('Warning: UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN is missing.');
  });
});
