import { Redis } from "@upstash/redis";

/**
 * Checks if Redis is configured by verifying the presence of necessary environment variables.
 * @returns {boolean} True if UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set, false otherwise.
 */
export const isRedisConfigured = () => {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
};

export const redis = isRedisConfigured()
  ? Redis.fromEnv()
  : (() => {
      console.warn("Warning: UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN is missing.");
      return null as unknown as Redis;
    })();
