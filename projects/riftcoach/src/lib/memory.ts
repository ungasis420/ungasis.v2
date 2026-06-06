// src/lib/memory.ts

import { redis, isRedisConfigured } from "./redis";
import { AgentRole } from "./agents/types";

export interface SessionState {
  sessionId: string;
  createdAt: number;
  lastActive: number;
  turnCount: number;
  lastChampion?: string;
  lastQuery?: string;
  mode?: string;
}

export interface AgentPerfStats {
  totalCalls: number;
  successes: number;
  failures: number;
  avgLatencyMs: number;
  lastCall: number;
}

export function createSession(): { sessionId: string } {
  const sessionId = crypto.randomUUID();
  return { sessionId };
}

export async function getSession(sessionId: string): Promise<SessionState | null> {
  if (!isRedisConfigured() || !redis) return null;
  try {
    const key = `session:${sessionId}`;
    const data = await redis.hgetall<Record<string, string>>(key);
    if (!data || Object.keys(data).length === 0) return null;

    return {
      sessionId,
      createdAt: Number(data.createdAt || 0),
      lastActive: Number(data.lastActive || 0),
      turnCount: Number(data.turnCount || 0),
      lastChampion: data.lastChampion,
      lastQuery: data.lastQuery,
      mode: data.mode,
    };
  } catch (error) {
    console.error("Redis getSession error:", error);
    return null;
  }
}

export async function updateSession(
  sessionId: string,
  updates: Partial<SessionState>
): Promise<void> {
  if (!isRedisConfigured() || !redis) return;
  try {
    const key = `session:${sessionId}`;
    const cleanUpdates: Record<string, string | number> = {};

    if (updates.createdAt !== undefined) cleanUpdates.createdAt = updates.createdAt;
    if (updates.lastActive !== undefined) cleanUpdates.lastActive = updates.lastActive;
    if (updates.turnCount !== undefined) cleanUpdates.turnCount = updates.turnCount;
    if (updates.lastChampion !== undefined) cleanUpdates.lastChampion = updates.lastChampion;
    if (updates.lastQuery !== undefined) cleanUpdates.lastQuery = updates.lastQuery;
    if (updates.mode !== undefined) cleanUpdates.mode = updates.mode;

    if (Object.keys(cleanUpdates).length > 0) {
      await redis.hset(key, cleanUpdates);
    }
    await redis.expire(key, 7200);
  } catch (error) {
    console.error("Redis updateSession error:", error);
  }
}

export async function trackAgentPerf(
  role: AgentRole,
  latencyMs: number,
  success: boolean
): Promise<void> {
  if (!isRedisConfigured() || !redis) return;
  try {
    const key = `perf:agent:${role}`;
    await Promise.all([
      redis.hincrby(key, "totalCalls", 1),
      redis.hincrby(key, success ? "successes" : "failures", 1),
      redis.hincrby(key, "totalLatencyMs", latencyMs),
      redis.hset(key, { lastCall: Date.now() }),
      redis.expire(key, 86400),
    ]);
  } catch (error) {
    console.error("Redis trackAgentPerf error:", error);
  }
}

export async function getAgentPerf(role: AgentRole): Promise<AgentPerfStats | null> {
  if (!isRedisConfigured() || !redis) return null;
  try {
    const key = `perf:agent:${role}`;
    const data = await redis.hgetall<Record<string, string>>(key);
    if (!data || Object.keys(data).length === 0) return null;

    const totalCalls = Number(data.totalCalls || 0);
    const successes = Number(data.successes || 0);
    const failures = Number(data.failures || 0);
    const totalLatencyMs = Number(data.totalLatencyMs || 0);
    const lastCall = Number(data.lastCall || 0);

    const avgLatencyMs = totalCalls > 0 ? totalLatencyMs / totalCalls : 0;

    return {
      totalCalls,
      successes,
      failures,
      avgLatencyMs,
      lastCall,
    };
  } catch (error) {
    console.error("Redis getAgentPerf error:", error);
    return null;
  }
}
