// src/lib/smart-router.ts
// Slim version — exports model info for Settings page display.
// All actual routing logic lives in route.ts (tryGroqStream + tryOpenRouterStream).

// ─── Types ──────────────────────────────────────────────────────────────────

export type ModelTier = 'premium' | 'standard' | 'fast'

export interface FreeModel {
  id: string
  name: string
  provider: 'groq' | 'openrouter'
  tier: ModelTier
  speedTps: number
  tpmLimit: number
}

// ─── Model Registry ─────────────────────────────────────────────────────────
// Single source of truth for all available models.
// Settings page uses FREE_MODELS to display the model list.

export const FREE_MODELS: FreeModel[] = [
  // Fast tier — Groq LPU (3-5 second responses)
  {
    id: 'meta-llama/llama-4-scout-17b-16e-instruct',
    name: 'Llama 4 Scout 17B',
    provider: 'groq',
    tier: 'fast',
    speedTps: 750,
    tpmLimit: 30000,
  },
  {
    id: 'llama-3.3-70b-versatile',
    name: 'Llama 3.3 70B',
    provider: 'groq',
    tier: 'fast',
    speedTps: 280,
    tpmLimit: 12000,
  },
  {
    id: 'llama-3.1-8b-instant',
    name: 'Llama 3.1 8B',
    provider: 'groq',
    tier: 'fast',
    speedTps: 560,
    tpmLimit: 6000,
  },

  // Standard tier — OpenRouter free models (30-50 second responses)
  {
    id: 'openrouter/auto',
    name: 'OpenRouter Auto',
    provider: 'openrouter',
    tier: 'standard',
    speedTps: 40,
    tpmLimit: 0,
  },
  {
    id: 'google/gemma-3-27b-it:free',
    name: 'Gemma 3 27B',
    provider: 'openrouter',
    tier: 'standard',
    speedTps: 70,
    tpmLimit: 0,
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct:free',
    name: 'Llama 3.3 70B (OR)',
    provider: 'openrouter',
    tier: 'standard',
    speedTps: 80,
    tpmLimit: 0,
  },
  {
    id: 'qwen/qwen3-30b-a3b:free',
    name: 'Qwen3 30B',
    provider: 'openrouter',
    tier: 'standard',
    speedTps: 60,
    tpmLimit: 0,
  },
]

// ─── Provider Availability ──────────────────────────────────────────────────

export function isProviderAvailable(provider: 'groq' | 'openrouter'): boolean {
  if (provider === 'groq') {
    return !!(
      process.env.GROQ_API_KEY_1 ||
      process.env.GROQ_API_KEY_2 ||
      process.env.GROQ_API_KEY_3 ||
      process.env.GROQ_API_KEY_4
    )
  }
  if (provider === 'openrouter') {
    return !!(
      process.env.OPENROUTER_API_KEY_1 ||
      process.env.OPENROUTER_API_KEY_2 ||
      process.env.OPENROUTER_API_KEY_3 ||
      process.env.OPENROUTER_API_KEY_4 ||
      process.env.OPENROUTER_API_KEY
    )
  }
  return false
}