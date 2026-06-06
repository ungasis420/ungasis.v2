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

export function traceAgentCall(trace: AgentTrace): void {
  if (process.env.NODE_ENV !== 'production') {
    console.log(JSON.stringify(trace));
  }
}

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

export function getTraceConfig(agentRole: string): { isEnabled: true; functionId: string } {
  return {
    isEnabled: true,
    functionId: `riftcoach-${agentRole}`,
  };
}
