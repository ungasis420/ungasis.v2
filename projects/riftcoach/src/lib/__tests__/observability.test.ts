import { describe, it, expect } from 'vitest';
import { traceOrchestration, traceAgentCall, getTraceConfig } from '../observability';
import { AgentRole, OrchestratorResult } from '../agents/types';

describe('observability.ts', () => {
  describe('traceOrchestration', () => {
    it('should be a stub that does not throw', () => {
      const mockResult: OrchestratorResult = {
        agents: [],
        mergedContent: '',
        totalLatencyMs: 0,
        successCount: 0,
        failureCount: 0,
      };
      expect(() => traceOrchestration(mockResult, true)).not.toThrow();
    });
  });

  describe('traceAgentCall', () => {
    it('should be a stub that does not throw', () => {
      expect(() => traceAgentCall({ some: 'data' })).not.toThrow();
    });
  });

  describe('getTraceConfig', () => {
    it('should return correct config for a given role', () => {
      const config = getTraceConfig(AgentRole.BUILD_OPTIMIZER);
      expect(config).toEqual({
        isEnabled: true,
        functionId: 'agent-BUILD_OPTIMIZER',
        metadata: {
          role: AgentRole.BUILD_OPTIMIZER,
        },
      });
    });
  });
});
