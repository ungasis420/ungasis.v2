import { AgentRole, AgentRequest, OrchestratorResult, AgentResponse } from './types';
import { runAgent } from './agent-runner';
import { agentConfigs } from './agent-config';
import { getBuildOptimizerResult } from './build-optimizer';
import { getMetaAnalystResult } from './meta-analyst';
import { getDraftAdvisorResult } from './draft-advisor';
import { getMatchupAnalystResult } from './matchup-analyst';
import { getSynergyEngineResult } from './synergy-engine';
import { getCoachNarratorResult } from './coach-narrator';

async function runBuildOptimizer(request: AgentRequest): Promise<AgentResponse> {
  const role = AgentRole.BUILD_OPTIMIZER;
  const config = agentConfigs[role];
  const startTime = performance.now();
  try {
    const res = await getBuildOptimizerResult(request);
    return {
      role,
      content: res.content,
      structured: res.structured as unknown as Record<string, unknown>,
      confidence: res.structured.confidence ?? 0.85,
      latencyMs: performance.now() - startTime,
      provider: config.provider,
      model: config.model
    };
  } catch (error) {
    console.warn(`[Orchestrator] Specialist BUILD_OPTIMIZER failed:`, error);
    return await runAgent(role, request);
  }
}

async function runMetaAnalyst(request: AgentRequest): Promise<AgentResponse> {
  const role = AgentRole.META_ANALYST;
  const config = agentConfigs[role];
  const startTime = performance.now();
  try {
    const res = await getMetaAnalystResult(request);
    return {
      role,
      content: res.content,
      structured: res.structured as unknown as Record<string, unknown>,
      confidence: res.structured.confidence ?? 0.8,
      latencyMs: performance.now() - startTime,
      provider: config.provider,
      model: config.model
    };
  } catch (error) {
    console.warn(`[Orchestrator] Specialist META_ANALYST failed:`, error);
    return await runAgent(role, request);
  }
}

async function runDraftAdvisor(request: AgentRequest): Promise<AgentResponse> {
  const role = AgentRole.DRAFT_ADVISOR;
  const config = agentConfigs[role];
  const startTime = performance.now();
  try {
    const res = await getDraftAdvisorResult(request);
    return {
      role,
      content: res.content,
      structured: res.structured as unknown as Record<string, unknown>,
      confidence: res.structured.confidence ?? 0.6,
      latencyMs: performance.now() - startTime,
      provider: config.provider,
      model: config.model
    };
  } catch (error) {
    console.warn(`[Orchestrator] Specialist DRAFT_ADVISOR failed:`, error);
    return await runAgent(role, request);
  }
}

async function runMatchupAnalyst(request: AgentRequest): Promise<AgentResponse> {
  const role = AgentRole.MATCHUP_ANALYST;
  const config = agentConfigs[role];
  const startTime = performance.now();
  try {
    const res = await getMatchupAnalystResult(request);
    return {
      role,
      content: res.content,
      structured: res.structured as unknown as Record<string, unknown>,
      confidence: res.structured.confidence ?? 0.8,
      latencyMs: performance.now() - startTime,
      provider: config.provider,
      model: config.model
    };
  } catch (error) {
    console.warn(`[Orchestrator] Specialist MATCHUP_ANALYST failed:`, error);
    return await runAgent(role, request);
  }
}

async function runSynergyEngine(request: AgentRequest): Promise<AgentResponse> {
  const role = AgentRole.SYNERGY_ENGINE;
  const config = agentConfigs[role];
  const startTime = performance.now();
  try {
    const res = await getSynergyEngineResult(request);
    return {
      role,
      content: res.content,
      structured: res.structured as unknown as Record<string, unknown>,
      confidence: res.structured.confidence ?? 0.7,
      latencyMs: performance.now() - startTime,
      provider: config.provider,
      model: config.model
    };
  } catch (error) {
    console.warn(`[Orchestrator] Specialist SYNERGY_ENGINE failed:`, error);
    return await runAgent(role, request);
  }
}

export async function orchestrate(request: AgentRequest): Promise<OrchestratorResult> {
  const startTime = performance.now();

  const settledPromises = await Promise.allSettled([
    runBuildOptimizer(request),
    runMetaAnalyst(request),
    runDraftAdvisor(request),
    runMatchupAnalyst(request),
    runSynergyEngine(request)
  ]);

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

  let coachResponse: AgentResponse;
  const coachStartTime = performance.now();
  const coachConfig = agentConfigs[AgentRole.COACH_NARRATOR];

  try {
    const coachRes = await getCoachNarratorResult(
      responses,
      request.query,
      request.userRank,
      request.championPool
    );
    coachResponse = {
      role: AgentRole.COACH_NARRATOR,
      content: coachRes.content,
      structured: coachRes.structured as unknown as Record<string, unknown>,
      confidence: coachRes.structured.confidence_overview?.average ?? 0.8,
      latencyMs: performance.now() - coachStartTime,
      provider: coachConfig.provider,
      model: coachConfig.model
    };
  } catch (error) {
    console.warn(`[Orchestrator] Specialist COACH_NARRATOR failed, falling back to runAgent:`, error);
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
    coachResponse = await runAgent(AgentRole.COACH_NARRATOR, coachRequest);
  }

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

