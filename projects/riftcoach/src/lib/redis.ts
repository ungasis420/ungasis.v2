import { Redis } from "@upstash/redis";

export const isRedisConfigured = () => {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
};

export const redis = isRedisConfigured()
  ? Redis.fromEnv()
  : (() => {
      console.warn("Warning: UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN is missing.");
      return null as unknown as Redis;
    })();
