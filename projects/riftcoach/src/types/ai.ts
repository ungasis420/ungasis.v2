// AI / Smart Router types

export type AITask = "draft" | "build" | "review" | "chat";

export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  contextWindow: number;
  isFree: boolean;
  strengths: AITask[];
  tier: "primary" | "secondary" | "fallback";
  speed: "fast" | "medium" | "slow";
}

export interface APIKeySlot {
  key: string;
  label: string;
  isActive: boolean;
}

export interface RouterState {
  keys: APIKeySlot[];
  modelAssignments: Record<AITask, string>;
  usage: Record<string, ModelUsage>;
  routerMode: "auto" | "manual";
}

export interface ModelUsage {
  modelId: string;
  keyIndex: number;
  requestsToday: number;
  requestsThisMinute: number;
  lastRequestAt: number;
  lastErrorAt: number;
  errorCount: number;
  avgResponseMs: number;
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: number;
  model?: string;
  task?: AITask;
}

export interface AIRequest {
  task: AITask;
  messages: ChatMessage[];
  context?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  content: string;
  model: string;
  keyUsed: number;
  latencyMs: number;
  fromCache: boolean;
}
