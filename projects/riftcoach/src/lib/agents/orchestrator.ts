import { AgentRole, AgentRequest, OrchestratorResult, AgentResponse } from './types';
import { runAgent } from './agent-runner';

export async function orchestrate(request: AgentRequest): Promise<OrchestratorResult> {
  const startTime = performance.now();
  
  const parallelRoles = [
    AgentRole.BUILD_OPTIMIZER,
    AgentRole.META_ANALYST,
    AgentRole.DRAFT_ADVISOR,
    AgentRole.MATCHUP_ANALYST,
    AgentRole.SYNERGY_ENGINE
  ];

  const settledPromises = await Promise.allSettled(
    parallelRoles.map(role => runAgent(role, request))
  );

  const responses: AgentResponse[] = [];
  let successCount = 0;
  let failureCount = 0;

  for (const result of settledPromises) {
    if (result.status === 'fulfilled') {
      responses.push(result.value);
      if (result.value.error) {
        failureCount++;
      } else {
        successCount++;
      }
    } else {
      failureCount++;
    }
  }

  const coachInput = responses
    .map(r => `--- ${r.role} ---\n${r.content || r.error || 'No content provided.'}`)
    .join('\n\n');

  const { query, ...restRequest } = request;

  const coachRequest: AgentRequest = {
    ...restRequest,
    query: `
Synthesize the following agent outputs into a coaching plan.

=== RAW ANALYSIS ===
${coachInput}

=== STRUCTURED DATA ===
${JSON.stringify(
  responses.map((r) => ({
    role: r.role,
    structured: r.structured,
    confidence: r.confidence,
    error: r.error,
  })),
  null,
  2
)}

Original Query:
${query}
`,
  };

  const coachResponse = await runAgent(AgentRole.COACH_NARRATOR, coachRequest);
  
  if (coachResponse.error) {
    failureCount++;
  } else {
    successCount++;
  }
  
  responses.push(coachResponse);

  const totalLatencyMs = performance.now() - startTime;
  const mergedContent = coachResponse.content;

  return {
    agents: responses,
    mergedContent,
    totalLatencyMs,
    successCount,
    failureCount
  };
}
