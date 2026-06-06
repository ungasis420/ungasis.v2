// src/lib/cache.ts

import { redis, isRedisConfigured } from "./redis";
import { OrchestratorResult } from "./agents/types";

/**
 * Creates a simple hash from a given query string.
 * @param {string} query The query string to hash.
 * @returns {string} The resulting hash string.
 */
export function createQueryHash(query: string): string {
  let hash = 5381;
  for (let i = 0; i < query.length; i++) {
    hash = (hash * 33) ^ query.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}

/**
 * Retrieves cached orchestration results.
 * @param {string} champion The champion name to use as part of the cache key.
 * @param {string} queryHash The query hash to use as part of the cache key.
 * @returns {Promise<OrchestratorResult | null>} The cached data or null if not found/error.
 */
export async function getCache(
  champion: string,
  queryHash: string
): Promise<OrchestratorResult | null> {
  if (!isRedisConfigured() || !redis) return null;
  try {
    const key = `cache:coach:${champion}:${queryHash}`;
    const data = await redis.get<OrchestratorResult>(key);
    return data || null;
  } catch (error) {
    console.error("Cache read error:", error);
    return null;
  }
}

/**
 * Sets orchestration results in the cache.
 * @param {string} champion The champion name to use as part of the cache key.
 * @param {string} queryHash The query hash to use as part of the cache key.
 * @param {OrchestratorResult} data The data to be cached.
 * @returns {Promise<void>} A promise that resolves when the cache is set.
 */
export async function setCache(
  champion: string,
  queryHash: string,
  data: OrchestratorResult
): Promise<void> {
  if (!isRedisConfigured() || !redis) return;
  try {
    const key = `cache:coach:${champion}:${queryHash}`;
    await redis.set(key, data, { ex: 3600 });
  } catch (error) {
    console.error("Cache write error:", error);
  }
}

/**
 * Invalidates cache entries for a specific champion.
 * @param {string} champion The champion name whose cache entries should be invalidated.
 * @returns {Promise<void>} A promise that resolves when the cache is invalidated.
 */
export async function invalidateCache(champion: string): Promise<void> {
  if (!isRedisConfigured() || !redis) return;
  try {
    const pattern = `cache:coach:${champion}:*`;
    const keys = await redis.keys(pattern);
    if (keys && keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error("Cache invalidate error:", error);
  }
}
