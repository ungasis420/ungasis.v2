// src/lib/cache.ts

import { redis, isRedisConfigured } from "./redis";
import { OrchestratorResult } from "./agents/types";

export function createQueryHash(query: string): string {
  let hash = 5381;
  for (let i = 0; i < query.length; i++) {
    hash = (hash * 33) ^ query.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}

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
