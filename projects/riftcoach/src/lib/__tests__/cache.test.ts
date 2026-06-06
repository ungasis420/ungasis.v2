import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mockRedis = {
  get: vi.fn(),
  set: vi.fn(),
};

vi.mock('../redis', () => ({
  redis: mockRedis,
}));

describe('cache.ts', () => {
  let consoleErrorMock: any;

  beforeEach(() => {
    vi.clearAllMocks();
    consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
    vi.resetModules();
  });

  describe('getCache', () => {
    it('should return parsed data on success', async () => {
      vi.doMock('../redis', () => ({ redis: mockRedis }));
      const { getCache } = await import('../cache');
      mockRedis.get.mockResolvedValueOnce({ hello: 'world' });

      const result = await getCache('test-key');

      expect(mockRedis.get).toHaveBeenCalledWith('test-key');
      expect(result).toEqual({ hello: 'world' });
    });

    it('should return null and log error if redis.get throws', async () => {
      vi.doMock('../redis', () => ({ redis: mockRedis }));
      const { getCache } = await import('../cache');
      const error = new Error('Redis error');
      mockRedis.get.mockRejectedValueOnce(error);

      const result = await getCache('test-key');

      expect(mockRedis.get).toHaveBeenCalledWith('test-key');
      expect(result).toBeNull();
      expect(consoleErrorMock).toHaveBeenCalledWith('Cache GET error for key test-key:', error);
    });

    it('should return null if redis is missing', async () => {
      vi.doMock('../redis', () => ({ redis: null }));
      const { getCache } = await import('../cache');

      const result = await getCache('test-key');
      expect(result).toBeNull();
    });
  });

  describe('setCache', () => {
    it('should call redis.set with correct args', async () => {
      vi.doMock('../redis', () => ({ redis: mockRedis }));
      const { setCache } = await import('../cache');
      mockRedis.set.mockResolvedValueOnce('OK');

      await setCache('test-key', { hello: 'world' }, 60);

      expect(mockRedis.set).toHaveBeenCalledWith('test-key', { hello: 'world' }, { ex: 60 });
    });

    it('should log error if redis.set throws', async () => {
      vi.doMock('../redis', () => ({ redis: mockRedis }));
      const { setCache } = await import('../cache');
      const error = new Error('Redis error');
      mockRedis.set.mockRejectedValueOnce(error);

      await setCache('test-key', { hello: 'world' });

      expect(mockRedis.set).toHaveBeenCalledWith('test-key', { hello: 'world' }, { ex: 3600 });
      expect(consoleErrorMock).toHaveBeenCalledWith('Cache SET error for key test-key:', error);
    });

    it('should do nothing if redis is missing', async () => {
      vi.doMock('../redis', () => ({ redis: null }));
      const { setCache } = await import('../cache');

      await setCache('test-key', { hello: 'world' });
      expect(mockRedis.set).not.toHaveBeenCalled();
    });
  });
});
