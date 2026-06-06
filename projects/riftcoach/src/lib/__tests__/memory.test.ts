import { describe, it, expect, vi } from 'vitest';
import { createSession, getSession, updateSession, trackAgentPerf } from '../memory';
import crypto from 'crypto';

vi.mock('crypto', () => {
  return {
    default: {
      randomUUID: vi.fn(() => 'test-uuid-1234'),
    },
  };
});

describe('memory.ts', () => {
  describe('createSession', () => {
    it('should return a new session with a random UUID', () => {
      const session = createSession();
      expect(crypto.randomUUID).toHaveBeenCalled();
      expect(session).toEqual({ sessionId: 'test-uuid-1234' });
    });
  });

  describe('getSession', () => {
    it('should return the session for the given ID', () => {
      const session = getSession('some-id');
      expect(session).toEqual({ sessionId: 'some-id' });
    });
  });

  describe('updateSession', () => {
    it('should be a stub that resolves', async () => {
      await expect(updateSession('id', { some: 'data' })).resolves.toBeUndefined();
    });
  });

  describe('trackAgentPerf', () => {
    it('should be a stub that does not throw', () => {
      expect(() => trackAgentPerf('role', 100, true)).not.toThrow();
    });
  });
});
