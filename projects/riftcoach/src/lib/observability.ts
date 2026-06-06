import { OrchestratorResult, AgentRole } from "./agents/types";

export function traceOrchestration(result: OrchestratorResult, cacheHit: boolean): void {
  // Stub
}

export function traceAgentCall(data: any): void {
  // Stub
}

export function getTraceConfig(role: AgentRole) {
  return {
    isEnabled: true,
    functionId: `agent-${role}`,
    metadata: {
      role,
    },
  };
}
