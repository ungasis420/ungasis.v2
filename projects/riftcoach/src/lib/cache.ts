import { redis } from './redis';

export async function getCache<T>(key: string): Promise<T | null> {
  if (!redis) return null;
  try {
    return await redis.get<T>(key);
  } catch (error) {
    console.error(`Cache GET error for key ${key}:`, error);
    return null;
  }
}

export async function setCache<T>(key: string, data: T, ttlSeconds: number = 3600): Promise<void> {
  if (!redis) return;
  try {
    await redis.set(key, data, { ex: ttlSeconds });
  } catch (error) {
    console.error(`Cache SET error for key ${key}:`, error);
  }
}
