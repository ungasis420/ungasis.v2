// src/lib/observability.ts

import { OrchestratorResult } from './agents/types';

export interface AgentTrace {
  agentId: string;
  champion: string;
  role: string;
  provider: string;
  model: string;
  latencyMs: number;
  tokensIn?: number;
  tokensOut?: number;
  status: string;
  cacheHit: boolean;
}

/**
 * Traces a call to an agent.
 * @param {AgentTrace} trace The data related to the agent call.
 */
export function traceAgentCall(trace: AgentTrace): void {
  if (process.env.NODE_ENV !== 'production') {
    console.log(JSON.stringify(trace));
  }
}

/**
 * Traces the orchestration of agents.
 * @param {OrchestratorResult} result The result of the orchestration.
 * @param {boolean} cacheHit Whether the result was a cache hit.
 */
export function traceOrchestration(result: OrchestratorResult, cacheHit: boolean): void {
  if (process.env.NODE_ENV !== 'production') {
    const summary = {
      agentsCount: result.agents.length,
      totalLatencyMs: result.totalLatencyMs,
      successCount: result.successCount,
      failureCount: result.failureCount,
      cacheHit,
    };
    console.log(JSON.stringify(summary));
  }
}

/**
 * Retrieves the trace configuration for a specific agent role.
 * @param {string} agentRole The role of the agent.
 * @returns {Object} The trace configuration object.
 */
export function getTraceConfig(agentRole: string): { isEnabled: true; functionId: string } {
  return {
    isEnabled: true,
    functionId: `riftcoach-${agentRole}`,
  };
}
