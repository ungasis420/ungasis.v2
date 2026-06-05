export enum AgentRole {
  BUILD_OPTIMIZER = 'BUILD_OPTIMIZER',
  META_ANALYST = 'META_ANALYST',
  DRAFT_ADVISOR = 'DRAFT_ADVISOR',
  MATCHUP_ANALYST = 'MATCHUP_ANALYST',
  SYNERGY_ENGINE = 'SYNERGY_ENGINE',
  COACH_NARRATOR = 'COACH_NARRATOR'
}

export interface AgentRequest {
  champion?: string;
  matchup?: string;
  teamComp?: string[];
  query: string;
  userRank?: string;
  championPool?: string[];
}

export interface AgentResponse {
  role: AgentRole;
  content: string;
  structured?: Record<string, unknown>;
  confidence: number;
  latencyMs: number;
  provider: string;
  model: string;
  error?: string;
}

export interface AgentConfig {
  role: AgentRole;
  provider: string;
  model: string;
  systemPrompt: string;
  maxTokens: number;
  temperature: number;
  timeoutMs: number;
}

export interface OrchestratorResult {
  agents: AgentResponse[];
  mergedContent: string;
  totalLatencyMs: number;
  successCount: number;
  failureCount: number;
}
