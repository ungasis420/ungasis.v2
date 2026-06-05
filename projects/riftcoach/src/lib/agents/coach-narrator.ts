// src/lib/agents/coach-narrator.ts
// Coach Narrator Agent — Wild Rift MOBILE head coach synthesis

import { generateText, type LanguageModel } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { AgentResponse, AgentRole } from './types';
import { agentConfigs } from './agent-config';

export interface CoachNarratorOutput {
  summary: string;
  key_takeaways: string[];
  action_items: string[];
  agent_agreements: string[];
  agent_disagreements: string[];
  confidence_overview: {
    highest: { agent: string; confidence: number };
    lowest: { agent: string; confidence: number };
    average: number;
  };
  encouragement: string;
}

function getProviderSdk(providerName: string): (modelId: string) => LanguageModel {
  if (providerName === 'openrouter') {
    return createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY_1 || process.env.OPENROUTER_API_KEY || '' });
  }
  if (providerName === 'google') {
    return createOpenAI({
      baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
      apiKey: process.env.GOOGLE_API_KEY || ''
    });
  }
  return createOpenAI({
    baseURL: providerName === 'together' ? 'https://api.together.xyz/v1' : undefined,
    apiKey: (providerName === 'together' ? process.env.TOGETHER_API_KEY : process.env.OPENAI_API_KEY) || ''
  });
}

export async function getCoachNarratorResult(
  agentResults: AgentResponse[],
  originalQuery: string,
  userRank?: string,
  championPool?: string[]
): Promise<{ content: string; structured: CoachNarratorOutput }> {
  // 1. Calculate deterministic confidence metrics
  const confidences = agentResults.map(r => ({ agent: r.role, confidence: r.confidence ?? 0 }));
  let highest = { agent: 'None', confidence: 0 };
  let lowest = { agent: 'None', confidence: 1 };
  let totalConfidence = 0;

  if (confidences.length > 0) {
    highest = confidences.reduce((max, cur) => cur.confidence > max.confidence ? cur : max, confidences[0]);
    lowest = confidences.reduce((min, cur) => cur.confidence < min.confidence ? cur : min, confidences[0]);
    totalConfidence = confidences.reduce((sum, cur) => sum + cur.confidence, 0);
  }

  const average = confidences.length > 0 ? totalConfidence / confidences.length : 0;
  const confidenceOverview = {
    highest: { agent: highest.agent, confidence: highest.confidence },
    lowest: { agent: lowest.agent, confidence: lowest.confidence },
    average
  };

  // 2. Build AI instructions and inputs
  const systemPrompt = `You are a Wild Rift MOBILE Head Coach. Never reference PC League of Legends.
Synthesize the outputs of 5 specialized agents into a unified, supportive coaching plan.

CRITICAL RULES:
1. Synthesize ONLY. Do not perform new analysis or invent new items/runes/spells.
2. Flag agreements (e.g. same core items to rush) + disagreements (e.g. conflicting build advice).
3. Flag any low confidence scores or agent errors.
4. Keep the tone supportive and practical. Focus on MOBILE Wild Rift level spikes (level 5 ult, max 15) and flow.
5. Return ONLY a valid JSON object matching the schema exactly. No markdown code blocks.

SCHEMA:
{
  "summary": "1-2 sentence synthesis",
  "key_takeaways": ["takeaway 1", "takeaway 2"],
  "action_items": ["action 1", "action 2"],
  "agent_agreements": ["agreement 1"],
  "agent_disagreements": ["disagreement/conflict 1"],
  "encouragement": "Supportive closing note"
}`;

  const promptText = `
Original Query: ${originalQuery}
User Rank: ${userRank || 'unknown'}
Champion Pool: ${championPool?.join(', ') || 'none specified'}

Specialized Coach Responses:
${agentResults.map(r => `[${r.role}] (Confidence: ${r.confidence}, Error: ${r.error || 'None'})
Content: ${r.content}
Structured Data: ${JSON.stringify(r.structured || {})}
`).join('\n---\n')}`;

  const config = agentConfigs[AgentRole.COACH_NARRATOR];
  let structured: CoachNarratorOutput | null = null;
  let content = '';

  // 3. Call AI provider
  try {
    const sdk = getProviderSdk(config.provider);
    const model = sdk(config.model);
    const result = await generateText({
      model,
      system: systemPrompt,
      prompt: promptText,
      maxOutputTokens: config.maxTokens,
      temperature: config.temperature,
    });

    const text = result.text.trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      structured = {
        summary: parsed.summary || '',
        key_takeaways: Array.isArray(parsed.key_takeaways) ? parsed.key_takeaways : [],
        action_items: Array.isArray(parsed.action_items) ? parsed.action_items : [],
        agent_agreements: Array.isArray(parsed.agent_agreements) ? parsed.agent_agreements : [],
        agent_disagreements: Array.isArray(parsed.agent_disagreements) ? parsed.agent_disagreements : [],
        confidence_overview: confidenceOverview,
        encouragement: parsed.encouragement || ''
      };
    }
  } catch (err) {
    console.warn('[CoachNarrator] AI call failed or timed out. Falling back to local synthesis.', err);
  }

  // 4. Fallback if AI synthesis fails
  if (!structured) {
    const lowConfAgents = agentResults.filter(r => r.confidence < 0.6).map(r => r.role);
    const errorAgents = agentResults.filter(r => r.error).map(r => r.role);

    structured = {
      summary: `Coaching synthesis compiled for query: "${originalQuery}".`,
      key_takeaways: agentResults.map(r => `Incorporated analysis from ${r.role}.`).slice(0, 3),
      action_items: [
        'Review the recommended build optimizer items and rune choices.',
        'Check the matchup analyst danger zones and tips.'
      ],
      agent_agreements: ['Active agents processed and synthesized successfully.'],
      agent_disagreements: [
        lowConfAgents.length > 0 ? `Low confidence flagged: ${lowConfAgents.join(', ')}` : '',
        errorAgents.length > 0 ? `Errors detected: ${errorAgents.join(', ')}` : ''
      ].filter(Boolean),
      confidence_overview: confidenceOverview,
      encouragement: 'Focus on CS, map awareness, and coordinate with your team. Good luck on the Rift!'
    };
  }

  // 5. Generate human-readable content
  content = `## Wild Rift Coaching Plan
${structured.summary}

### Key Takeaways
${structured.key_takeaways.map(t => `• ${t}`).join('\n')}

### Action Items
${structured.action_items.map(a => `• ${a}`).join('\n')}

### Agent Alignment
• **Agreements:** ${structured.agent_agreements.join(', ') || 'None identified.'}
• **Disagreements/Warnings:** ${structured.agent_disagreements.join(', ') || 'No conflicts found.'}

### Confidence Overview
• **Average:** ${Math.round(confidenceOverview.average * 100)}%
• **Highest:** ${confidenceOverview.highest.agent} (${Math.round(confidenceOverview.highest.confidence * 100)}%)
• **Lowest:** ${confidenceOverview.lowest.agent} (${Math.round(confidenceOverview.lowest.confidence * 100)}%)

${structured.encouragement}`;

  return { content, structured };
}
