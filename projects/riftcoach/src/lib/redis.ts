// src/lib/redis.ts

import { Redis } from '@upstash/redis';

/**
 * Checks if Redis is configured by verifying the presence of necessary environment variables.
 * @returns {boolean} True if UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set, false otherwise.
 */
export function isRedisConfigured(): boolean {
  return (
    typeof process !== 'undefined' &&
    !!process.env.UPSTASH_REDIS_REST_URL &&
    !!process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

export const redis = isRedisConfigured()
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL || '',
      token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    })
  : null;
