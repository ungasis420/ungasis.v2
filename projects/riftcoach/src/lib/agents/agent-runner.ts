import { generateText, type LanguageModel } from 'ai';
import { AgentRole, AgentRequest, AgentResponse } from './types';
import { agentConfigs } from './agent-config';
import { getTraceConfig } from "../observability";

async function getProviderSDK(providerName: string): Promise<(modelId: string) => LanguageModel> {
  if (providerName === 'groq') {
    const { createGroq } = await import('@ai-sdk/groq');
    return createGroq({ apiKey: process.env.GROQ_API_KEY_1 || process.env.GROQ_API_KEY });
  }
  
  if (providerName === 'openrouter') {
    const { createOpenRouter } = await import('@openrouter/ai-sdk-provider');
    return createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY_1 || process.env.OPENROUTER_API_KEY });
  }

  const { createOpenAI } = await import('@ai-sdk/openai');
  
  switch (providerName) {
    case 'cerebras':
      return createOpenAI({ 
        baseURL: 'https://api.cerebras.ai/v1',
        apiKey: process.env.CEREBRAS_API_KEY_1 || process.env.CEREBRAS_API_KEY 
      });
    case 'mistral':
      return createOpenAI({ 
        baseURL: 'https://api.mistral.ai/v1',
        apiKey: process.env.MISTRAL_API_KEY 
      });
    case 'together':
      return createOpenAI({ 
        baseURL: 'https://api.together.xyz/v1',
        apiKey: process.env.TOGETHER_API_KEY 
      });
    case 'google':
      return createOpenAI({ 
        baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
        apiKey: process.env.GOOGLE_API_KEY 
      });
    default:
      throw new Error(`Unsupported provider: ${providerName}`);
  }
}

function tryParseJSON(text: string): Record<string, unknown> | undefined {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

async function executeCall(role: AgentRole, request: AgentRequest): Promise<AgentResponse> {
  const config = agentConfigs[role];
  if (!config) throw new Error(`Missing config for role: ${role}`);

  const startTime = performance.now();
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => abortController.abort(), config.timeoutMs);

  try {
    const providerSdk = await getProviderSDK(config.provider);
    const model = providerSdk(config.model);

    const contextLines = [
      request.champion ? `Champion: ${request.champion}` : '',
      request.matchup ? `Matchup: ${request.matchup}` : '',
      request.teamComp && request.teamComp.length > 0 ? `Team Comp: ${request.teamComp.join(', ')}` : '',
      request.userRank ? `User Rank: ${request.userRank}` : '',
      `User Query: ${request.query}`
    ].filter(Boolean).join('\n');

    const result = await generateText({
      model,
      system: config.systemPrompt,
      prompt: contextLines,
      maxOutputTokens: config.maxTokens,
      temperature: config.temperature,
      abortSignal: abortController.signal,
      experimental_telemetry: getTraceConfig(role),
    });

    clearTimeout(timeoutId);

    const confidence = result.text.length > 200 ? 0.9 : 0.6;

    return {
      role,
      content: result.text,
      structured: tryParseJSON(result.text),
      confidence,
      latencyMs: performance.now() - startTime,
      provider: config.provider,
      model: config.model
    };
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function runAgent(role: AgentRole, request: AgentRequest): Promise<AgentResponse> {
  const config = agentConfigs[role];
  const startTime = performance.now();
  try {
    return await executeCall(role, request);
  } catch (err1) {
    console.warn(`[Agent ${role}] First attempt failed: ${err1 instanceof Error ? err1.message : err1}`);
    try {
      return await executeCall(role, request);
    } catch (err2) {
      console.error(`[Agent ${role}] Retry failed: ${err2 instanceof Error ? err2.message : err2}`);
      return {
        role,
        content: '',
        confidence: 0,
        latencyMs: performance.now() - startTime,
        provider: config.provider,
        model: config.model,
        error: err2 instanceof Error ? err2.message : 'Unknown error occurred'
      };
    }
  }
}
