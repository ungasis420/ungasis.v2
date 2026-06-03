// src/app/api/chat/route.ts
// RiftCoach v3 — Two-Route Architecture
// Route A: Build Engine → JSON (zero hallucination for builds)
// Route B: Standard RAG → Streaming (for matchups, synergy, macro, etc.)
// Providers: Groq (primary, fast) + OpenRouter (fallback, slow)
import { streamText } from 'ai'
import { createGroq } from '@ai-sdk/groq'
import { createOpenAI } from '@ai-sdk/openai'
import { assembleContext } from '@/lib/context-assembler'
import { preBuildResponse } from '@/lib/build-engine'
import { modifyBuild, shouldModifyBuild } from '@/lib/build-modifier'
import { type BuildIntent } from '@/data/build-variants'
import { extractBuildIntent } from '@/lib/intent-extractor'

import {
  buildSystemPrompt,
  getPromptByMode,
  estimateTokens,
  trimDataToFit,
  type PromptMode,
} from '@/lib/prompts'

export const maxDuration = 60

// ─── Multi-Key Rotation ─────────────────────────────────────────────────────
const GROQ_KEYS = [
  process.env.GROQ_API_KEY_1,
  process.env.GROQ_API_KEY_2,
  process.env.GROQ_API_KEY_3,
  process.env.GROQ_API_KEY_4,
].filter((k): k is string => !!k && k.length > 5)

const OPENROUTER_KEYS = [
  process.env.OPENROUTER_API_KEY_1,
  process.env.OPENROUTER_API_KEY_2,
  process.env.OPENROUTER_API_KEY_3,
  process.env.OPENROUTER_API_KEY_4,
  process.env.OPENROUTER_API_KEY,
].filter((k): k is string => !!k && k.length > 5)

let groqKeyIndex = 0
let openrouterKeyIndex = 0

function getNextGroqKey(): string {
  if (GROQ_KEYS.length === 0) return ''
  const key = GROQ_KEYS[groqKeyIndex % GROQ_KEYS.length]
  groqKeyIndex++
  return key
}

function getNextOpenRouterKey(): string {
  if (OPENROUTER_KEYS.length === 0) return ''
  const key = OPENROUTER_KEYS[openrouterKeyIndex % OPENROUTER_KEYS.length]
  openrouterKeyIndex++
  return key
}

// ─── Groq Model Cascade ─────────────────────────────────────────────────────
interface GroqModel {
  id: string
  label: string
  tpmLimit: number
}

const GROQ_MODELS: GroqModel[] = [
  { id: 'meta-llama/llama-4-scout-17b-16e-instruct', label: 'Llama 4 Scout 17B', tpmLimit: 30000 },
  { id: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B', tpmLimit: 12000 },
  { id: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B', tpmLimit: 6000 },
]

const OPENROUTER_MODELS = [
  'openrouter/auto',
  'google/gemma-3-27b-it:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'qwen/qwen3-30b-a3b:free',
]

// ─── Types ──────────────────────────────────────────────────────────────────
interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

// ─── Map task type to PromptMode ────────────────────────────────────────────
function toPromptMode(taskType: string): PromptMode {
  switch (taskType) {
    case 'build':
    case 'items':
    case 'runes':
      return 'build'
    case 'matchup':
    case 'counter':
      return 'matchup'
    case 'synergy':
      return 'synergy'
    case 'macro':
      return 'macro'
    case 'learning':
      return 'learning'
    default:
      return 'general'
  }
}

// ─── Pretty name helper ─────────────────────────────────────────────────────
function prettyName(idOrName: string): string {
  return idOrName
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace("'S", "'s")
}

// When items/runes are swapped by the Build Modifier, the original template
// (from preBuildResponse) still references the OLD items.
// This function regenerates the template with the MODIFIED build data.
//
// ANALOGY: After the car shop swaps parts, they update the spec sheet
// to show the NEW parts — not the old ones.

function regenerateTemplate(
  build: any,
  champName: string,
  variant: { emoji: string; label: string; description: string } | null,
): string {
  const buildName = build.build?.build_name ?? 'Custom Build'
  const archetype = build.build?.archetype ?? ''
  const playstyle = build.build?.playstyle ?? ''

  const lines: string[] = []

  // ── Header ──
  lines.push(`# ${champName} — ${buildName}`)
  if (variant) {
    lines.push(
      `> ${variant.emoji} **${variant.label}** — ${variant.description}`,
    )
  }
  if (archetype) lines.push(`> Archetype: ${archetype}`)
  if (playstyle) lines.push(`> Playstyle: ${playstyle}`)
  lines.push('')

  // ── Core Build Table ──
  lines.push('## 🗡️ Core Build')
  lines.push('| Item | Cost | Stats | Passive | Why |')
  lines.push('|------|------|-------|---------|-----|')
  for (const item of build.coreItems ?? []) {
    const name = item.name ?? item.id ?? '?'
    const cost = item.cost ?? 0
    const stats = typeof item.stats === 'string' ? item.stats : '—'
    const passive = item.passive ?? '—'
    lines.push(
      `| **${name}** | ${cost}g | ${stats} | ${passive} | [AI: Explain why ${name} works for ${champName}] |`,
    )
  }
  lines.push('')

  // ── Situational Items Table ──
  if (build.situationalItems?.length > 0) {
    lines.push('## 🔄 Situational Items')
    lines.push('| Item | Cost | Stats | Passive | When & Why |')
    lines.push('|------|------|-------|---------|------------|')
    for (const item of build.situationalItems) {
      const name = item.name ?? item.id ?? '?'
      const cost = item.cost ?? 0
      const stats = typeof item.stats === 'string' ? item.stats : '—'
      const passive = item.passive ?? '—'
      lines.push(
        `| **${name}** | ${cost}g | ${stats} | ${passive} | [AI: When to build ${name}] |`,
      )
    }
    lines.push('')
  }

  // ── Rune Page Table ──
  lines.push('## 🔮 Rune Page')
  lines.push('| Slot | Rune | Effect | Why |')
  lines.push('|------|------|--------|-----|')
  for (const rune of build.runes ?? []) {
    const slot = rune.slot ?? '?'
    const name = rune.name ?? rune.id ?? '?'
    const desc = rune.description ?? '—'
    lines.push(
      `| ${slot} | **${name}** | ${desc} | [AI: Explain why ${name} for ${champName}] |`,
    )
  }
  lines.push('')

  // ── Summoner Spells ──
  lines.push('## ⚡ Summoner Spells')
  for (const spell of build.spells ?? []) {
    const name = spell.name ?? spell.id ?? '?'
    const cd = spell.cooldown ?? 0
    const effect = spell.effect ?? '—'
    lines.push(`- **${name}** (${cd}s) — ${effect}`)
    lines.push(`  [AI: Why ${name} for ${champName}]`)
  }
  lines.push('')

  // ── Build Order ──
  const itemOrder =
    build.build?.item_order ?? (build.coreItems ?? []).map((i: any) => i.name ?? i.id)
  if (itemOrder.length > 0) {
    lines.push('## 📖 Build Order')
    lines.push(
      itemOrder
        .map((id: string, i: number) => `${i + 1}. ${id}`)
        .join(' → '),
    )
    lines.push('')
  }

  // ── Power Curve ──
  const pc = build.build?.power_curve
  if (pc) {
    lines.push('## 📈 Power Curve')
    lines.push('| Phase | Rating |')
    lines.push('|-------|--------|')
    lines.push(`| Early (1-5) | ${Math.round((pc.early ?? 0) * 100)}% |`)
    lines.push(`| Mid (6-10) | ${Math.round((pc.mid ?? 0) * 100)}% |`)
    lines.push(`| Late (11-15) | ${Math.round((pc.late ?? 0) * 100)}% |`)
    lines.push('')
  }

  // ── Build Stats ──
  const math = build.build?.math
  if (math) {
    lines.push('## 📊 Build Stats')
    lines.push('| Stat | Value |')
    lines.push('|------|-------|')
    if (math.total_ap) lines.push(`| AP | ${math.total_ap} |`)
    if (math.total_hp) lines.push(`| HP | ${math.total_hp} |`)
    if (math.total_ad) lines.push(`| AD | ${math.total_ad} |`)
    if (math.total_armor) lines.push(`| Armor | ${math.total_armor} |`)
    if (math.total_mr) lines.push(`| MR | ${math.total_mr} |`)
    if (math.total_ah) lines.push(`| AH | ${math.total_ah} |`)
    if (math.ehp_physical) lines.push(`| EHP (Physical) | ${math.ehp_physical} |`)
    if (math.ehp_magic) lines.push(`| EHP (Magic) | ${math.ehp_magic} |`)
    lines.push('')
  }

  // ── Pros & Cons ──
  lines.push('## ✅ Pros')
  lines.push('[AI: List 3-5 pros for this build, referencing abilities]')
  lines.push('')
  lines.push('## ❌ Cons')
  lines.push('[AI: List 3-5 cons for this build, referencing abilities]')
  lines.push('')
  lines.push('## 🛡️ Cons Mitigation')
  lines.push('[AI: For each con, suggest how to mitigate it]')
  lines.push('')

  return lines.join('\n')
}

function buildModifiedRationalePrompt(
  build: any,
  champName: string,
  variant: { emoji: string; label: string; description: string } | null,
): string {
  const template = regenerateTemplate(build, champName, variant)

  // Champion ability reference (if available)
  const abilities = build.champion?.abilities
  let kitRef = ''
  if (abilities) {
    const p = abilities.passive?.name ?? 'Unknown'
    const q = abilities.skill_1?.name ?? 'Unknown'
    const w = abilities.skill_2?.name ?? 'Unknown'
    const e = abilities.skill_3?.name ?? 'Unknown'
    const r = abilities.ultimate?.name ?? 'Unknown'
    kitRef = `

CHAMPION KIT REFERENCE — ${champName}:
- Passive: ${p}
- Q (Skill 1): ${q}
- W (Skill 2): ${w}
- E (Skill 3): ${e}
- R (Ultimate): ${r}`
  }

  // Same 10 strict rules as build-engine.ts rationalePrompt
  return `You are the RiftCoach Build Advisor for Wild Rift (mobile).

RULES:
1. DO NOT change any item names, costs, stats, rune names, spell names, or data
2. ONLY fill in [AI: ...] placeholders
3. Every explanation MUST reference ${champName}'s specific abilities by name
4. Be specific (bad: "This item is good" — good: reference actual ability interactions)
5. Keep each explanation 1-2 sentences
6. For runes: explain interaction with champion's damage type and playstyle
7. This is Wild Rift mobile — levels 1-15, 15-20 min games
8. Output complete guide as clean markdown
9. Remove ALL [AI: ...] tags, replace with your text
10. Do NOT add items, runes, or spells not in the template${kitRef}

---

${template}`
}

// ─── Stream Validation Helper ───────────────────────────────────────────────
async function validateStream(
  response: Response,
  timeoutMs: number = 15000
): Promise<{ valid: boolean; firstChunk: string; stream: ReadableStream<Uint8Array> } | null> {
  if (!response.body) return null
  const [checkStream, returnStream] = response.body.tee()
  const reader = checkStream.getReader()
  const decoder = new TextDecoder()
  try {
    const result = await Promise.race([
      reader.read(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Stream timeout')), timeoutMs)
      ),
    ])
    reader.releaseLock()
    if (result.done && !result.value) {
      return null
    }
    const firstChunk = decoder.decode(result.value)
    const lower = firstChunk.toLowerCase()
    const errorPatterns = [
      'error', 'invalid api key', 'rate_limit', 'too large',
      'decommissioned', 'unauthorized', '401', '429', '503',
    ]
    for (const pattern of errorPatterns) {
      if (lower.includes(pattern)) {
        console.warn(`[Stream] Error in first chunk: "${firstChunk.slice(0, 100)}"`)
        return null
      }
    }
    return { valid: true, firstChunk, stream: returnStream }
  } catch (err) {
    reader.releaseLock()
    console.warn(`[Stream] Validation failed: ${err instanceof Error ? err.message : err}`)
    return null
  }
}

// ─── Try Groq Stream ────────────────────────────────────────────────────────
async function tryGroqStream(
  systemPrompt: string,
  messages: ChatMessage[],
  maxTokens: number = 4096
): Promise<Response | null> {
  const promptTokens = estimateTokens(systemPrompt)
  const messageTokens = estimateTokens(
    messages.map((m) => m.content).join(' ')
  )
  const totalEstimate = promptTokens + messageTokens + maxTokens

  for (const model of GROQ_MODELS) {
    if (totalEstimate > model.tpmLimit) {
      console.log(
        `[Groq] Skipping ${model.label} — needs ~${totalEstimate} tokens, limit is ${model.tpmLimit}`
      )
      continue
    }

    const keysToTry = Math.min(GROQ_KEYS.length, 3)
    for (let keyAttempt = 0; keyAttempt < keysToTry; keyAttempt++) {
      const apiKey = getNextGroqKey()
      const keyNum = ((groqKeyIndex - 1) % GROQ_KEYS.length) + 1

      try {
        console.log(`[Groq] Trying ${model.label} with key #${keyNum}`)
        const groq = createGroq({ apiKey })
        const result = streamText({
          model: groq(model.id),
          system: systemPrompt,
          messages: messages.filter((m) => m.role !== 'system'),
          temperature: 0.7,
          maxOutputTokens: maxTokens,
          maxRetries: 0,
        })
        const streamResponse = result.toTextStreamResponse()
        const validated = await validateStream(streamResponse)
        if (validated) {
          console.log(`[Groq] ✓ ${model.label} (key #${keyNum}) — streaming`)
          const encoder = new TextEncoder()
          const remainingReader = validated.stream.getReader()
          const fullStream = new ReadableStream<Uint8Array>({
            async start(controller) {
              try {
                controller.enqueue(encoder.encode(validated.firstChunk))
                while (true) {
                  const { done, value } = await remainingReader.read()
                  if (done) break
                  if (value) controller.enqueue(value)
                }
                controller.close()
              } catch (err) {
                console.error(`[Groq] Mid-stream error:`, err)
                controller.close()
              }
            },
          })
          return new Response(fullStream, {
            status: 200,
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'X-Model-Used': model.label,
              'X-Model-Provider': 'groq',
              'X-Groq-Key': String(keyNum),
            },
          })
        }
        console.warn(`[Groq] ${model.label} key #${keyNum} — stream validation failed`)
      } catch (err) {
        console.warn(
          `[Groq] ${model.label} key #${keyNum} — error:`,
          err instanceof Error ? err.message : err
        )
      }
    }
    console.warn(`[Groq] ${model.label} — all keys exhausted, trying next model`)
  }
  console.warn('[Groq] All models exhausted')
  return null
}

// ─── Try OpenRouter Stream ──────────────────────────────────────────────────
async function tryOpenRouterStream(
  systemPrompt: string,
  messages: ChatMessage[],
  maxTokens: number = 4096
): Promise<Response | null> {
  for (const modelId of OPENROUTER_MODELS) {
    const keysToTry = Math.min(OPENROUTER_KEYS.length, 2)
    for (let keyAttempt = 0; keyAttempt < keysToTry; keyAttempt++) {
      const apiKey = getNextOpenRouterKey()
      const keyNum = ((openrouterKeyIndex - 1) % OPENROUTER_KEYS.length) + 1

      try {
        console.log(`[OpenRouter] Trying ${modelId} with key #${keyNum}`)
        const openrouter = createOpenAI({
          baseURL: 'https://openrouter.ai/api/v1',
          apiKey,
        })
        const result = streamText({
          model: openrouter(modelId),
          system: systemPrompt,
          messages: messages.filter((m) => m.role !== 'system'),
          temperature: 0.7,
          maxOutputTokens: maxTokens,
          maxRetries: 0,
        })
        const streamResponse = result.toTextStreamResponse()
        console.log(`[OpenRouter] ✓ ${modelId} (key #${keyNum}) — streaming`)
        return new Response(streamResponse.body, {
          status: 200,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'X-Model-Used': modelId,
            'X-Model-Provider': 'openrouter',
          },
        })
      } catch (err) {
        console.warn(
          `[OpenRouter] ${modelId} key #${keyNum} — error:`,
          err instanceof Error ? err.message : err
        )
      }
    }
  }
  console.warn('[OpenRouter] All models exhausted')
  return null
}

// ─── POST Handler ───────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const messages: ChatMessage[] = body.messages || []

    if (messages.length === 0) {
      return new Response('No messages provided', { status: 400 })
    }

    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === 'user')

    if (!lastUserMessage) {
      return new Response('No user message found', { status: 400 })
    }

    // ─── Step 1: Classify + Retrieve via RAG ────────────────────────────
    let context: Record<string, any>
    try {
      context = assembleContext(lastUserMessage.content)
      console.log(
        `[RAG] Task: ${context.task?.type || 'unknown'} | ` +
        `Champions: ${context.task?.champions?.join(', ') || 'none'} | ` +
        `Role: ${context.task?.role || 'none'}`
      )
    } catch (ragError) {
      console.warn('[RAG] Context assembly failed (non-fatal):', ragError)
      context = {
        task: {
          type: 'general',
          confidence: 0,
          champions: [],
          role: null,
          keywords: [],
          rawMessage: lastUserMessage.content,
        },
        contextString: '',
        taskInstruction: '',
      }
    }

    const taskType = context.task?.type || 'general'
    const champions: string[] = context.task?.champions || []
    const role = context.task?.role || undefined

    // ─── Step 2: Route Decision ─────────────────────────────────────────
    const isBuildRoute =
      ['build', 'items', 'runes'].includes(taskType) &&
      champions.length > 0

    let systemPrompt: string = ''
    let chatMessages: ChatMessage[] = messages

    let variantInfo: { intent: string; label: string; emoji: string; color: string; description: string; swapCount: number } | null = null

    if (isBuildRoute) {
    // ─── ROUTE A: Build Engine + Build Modifier (Phase 5.8.1) ─────────
    const champion = champions[0]
    console.log(`[Route A] Build Engine for "${champion}" (role: ${role ?? 'auto'})`)

    try {
      const enriched = preBuildResponse(champion, role ?? 'support')

      if (enriched.found && enriched.template && enriched.rationalePrompt) {
        // Build Engine succeeded
        console.log(
          `[BuildEngine] ✓ ${champion}: ` +
          `${enriched.coreItems.length} core items, ` +
          `${enriched.runes.length} runes, ` +
          `${enriched.spells.length} spells`
        )

        // ── Phase 5.8.1: Dynamic Build Swapping ──────────────────────
        // 1. Detect intent from user message ("tank", "ap", "poke", etc.)
        // 2. If intent ≠ default AND variant pool exists → swap items/runes
        // 3. Regenerate template with modified items
        // 4. AI fills [AI: ...] placeholders on the MODIFIED build
        const detectedIntent = extractBuildIntent(lastUserMessage.content)
        const effectiveRole = role ?? 'support'

        if (shouldModifyBuild(detectedIntent, effectiveRole)) {
          // Swap items/runes based on intent
          const modified = modifyBuild(
            enriched as any, // EnrichedBuild shape matches ModifierInput
            detectedIntent,
            effectiveRole,
          )

          if (modified.isModified && modified.variant) {
            // Use modified build with regenerated template
            console.log(
              `[BuildModifier] ✅ ${modified.variant.emoji} ${modified.variant.label} | ` +
              `${modified.swapLog.length} swaps | ` +
              `Kept: [${modified.keptItems.join(', ')}]`
            )

            // Log individual swaps for debugging
            for (const swap of modified.swapLog) {
              console.log(
                `  [Swap] ${swap.type}: ${swap.original} → ${swap.replacement}`
              )
            }

            // Regenerate template + rationalePrompt with modified items
            const champName =
              modified.build.champion?.name ?? champion
            systemPrompt = buildModifiedRationalePrompt(
              modified.build,
              champName,
              modified.variant,
            )
            chatMessages = [
              {
                role: 'user',
                content:
                  `This is a ${modified.variant.label} build variant. ` +
                  'Please complete the build guide by filling in all [AI: ...] sections. ' +
                  `Focus on explaining why each item/rune fits the ${detectedIntent} playstyle.`,
              },
            ]

            // Log token budget for modified prompt
            const modPromptTokens = estimateTokens(systemPrompt)
            console.log(
              `[BuildModifier] Modified prompt: ~${modPromptTokens} tokens`
            )

          // Store variant info for response header
            variantInfo = {
              intent: modified.variant.intent,
              label: modified.variant.label,
              emoji: modified.variant.emoji,
              color: modified.variant.color,
              description: modified.variant.description,
              swapCount: modified.swapLog.length,
            }
            
          } else {
            // Modifier returned unchanged (e.g., DB items not found)
            console.log('[BuildModifier] No modifications applied — using default')
            systemPrompt = enriched.rationalePrompt
            chatMessages = [
              {
                role: 'user',
                content: 'Please complete the build guide by filling in all [AI: ...] sections.',
              },
            ]
          }
        } else {
          // ── Default build (no intent detected or no pool) ───────────
          console.log(
            `[Route A] Intent: "${detectedIntent}" — using default build`
          )
          systemPrompt = enriched.rationalePrompt
          chatMessages = [
            {
              role: 'user',
              content: 'Please complete the build guide by filling in all [AI: ...] sections.',
            },
          ]

          // Log token budget
          const promptTokens = estimateTokens(systemPrompt)
          console.log(`[BuildEngine] Prompt: ~${promptTokens} tokens`)
        }
      } else {
        // Build not found — fall through to Route B
        console.log(`[BuildEngine] No build found for "${champion}" — falling to Route B`)
        const result = buildRouteB(context, messages)
        systemPrompt = result.systemPrompt
        chatMessages = result.chatMessages
      }
    } catch (buildError) {
      console.warn('[BuildEngine] Error (non-fatal):', buildError)
      const result = buildRouteB(context, messages)
      systemPrompt = result.systemPrompt
      chatMessages = result.chatMessages
    }
    } else {
    // ─── ROUTE B: Standard RAG → Streaming ──────────────────────────────
    console.log(`[Route B] Standard RAG — task: ${taskType}`)
    const routeB = buildRouteB(context, messages)
    systemPrompt = routeB.systemPrompt
    chatMessages = routeB.chatMessages
    }

    // ─── Step 3: Provider Cascade ───────────────────────────────────────
    console.log(`[Provider] Trying Groq (${GROQ_KEYS.length} keys, ${GROQ_MODELS.length} models)`)
    const groqResponse = await tryGroqStream(systemPrompt, chatMessages)
    if (groqResponse) {
      if (variantInfo) {
        return new Response(groqResponse.body, {
          status: groqResponse.status,
          headers: {
            ...Object.fromEntries(groqResponse.headers.entries()),
            'X-Build-Variant': encodeURIComponent(JSON.stringify(variantInfo)),
          },
        })
      }
      return groqResponse
    }

    console.log('[Provider] Groq exhausted — trying OpenRouter fallback')
    const openrouterResponse = await tryOpenRouterStream(systemPrompt, chatMessages)
    if (openrouterResponse) {
      if (variantInfo) {
        return new Response(openrouterResponse.body, {
          status: openrouterResponse.status,
          headers: {
            ...Object.fromEntries(openrouterResponse.headers.entries()),
            'X-Build-Variant': encodeURIComponent(JSON.stringify(variantInfo)),
          },
        })
      }
      return openrouterResponse
    }

    // ─── All providers failed ───────────────────────────────────────────
    console.error('[Provider] All providers failed')
    return new Response(
      JSON.stringify({
        error: 'All AI models are currently unavailable. Please try again in a moment.',
      }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (outerError) {
    console.error('[API/chat] Unhandled error:', outerError)
    return new Response(
      JSON.stringify({
        error: 'An unexpected error occurred.',
        details: outerError instanceof Error ? outerError.message : 'Unknown',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

// ─── Route B Builder ────────────────────────────────────────────────────────
function buildRouteB(
  context: Record<string, any>,
  messages: ChatMessage[]
): { systemPrompt: string; chatMessages: ChatMessage[] } {
  const taskType = context.task?.type || 'general'
  const promptMode = toPromptMode(taskType)

  let systemPrompt = buildSystemPrompt()

  const subModule = getPromptByMode(promptMode)
  if (subModule) {
    systemPrompt += `\n\n--- TASK-SPECIFIC MODULE ---\n${subModule}`
  }

  const taskInstruction = context.taskInstruction || context.task_instruction || ''
  if (taskInstruction) {
    systemPrompt += `\n\n--- FORMATTING GUIDANCE ---\n${taskInstruction}`
  }

  const contextString = context.contextString || context.context_string || context.context || ''
  if (contextString) {
    const trimmedData = trimDataToFit(contextString, 12000)
    systemPrompt += `\n\n--- GAME DATA (from RiftCoach database) ---\n${trimmedData}`
  }

  const totalTokens = estimateTokens(systemPrompt)
  console.log(
    `[Route B] Prompt: ~${totalTokens} tokens (core + ${promptMode} module + RAG data)`
  )

  return {
    systemPrompt,
    chatMessages: messages,
  }
}

// ─── Item formatting helpers (for Route A JSON) ─────────────────────────────
function formatItemStats(item: any): string {
  const stats = item.stats
  if (!stats) return '—'

  if (Array.isArray(stats)) {
    return stats.length > 0 ? stats.join(', ') : '—'
  }

  if (typeof stats === 'object' && stats !== null) {
    const STAT_LABELS: Record<string, string> = {
      hp: 'HP', ad: 'AD', ap: 'AP', armor: 'Armor', mr: 'MR',
      ah: 'Ability Haste', as_percent: '% Attack Speed', crit_percent: '% Crit',
      ms: 'Move Speed', mana: 'Mana', mana_regen: 'Mana Regen',
      hp_regen: 'HP Regen', lethality: 'Lethality',
      armor_pen: 'Armor Pen', magic_pen: 'Magic Pen',
      omnivamp: '% Omnivamp', lifesteal: '% Lifesteal',
      attack_speed: '% Attack Speed', ability_haste: 'Ability Haste',
      move_speed: 'Move Speed', health: 'HP',
    }
    const parts: string[] = []
    for (const [key, val] of Object.entries(stats)) {
      if (val === null || val === undefined || val === 0 || val === '') continue
      const label = STAT_LABELS[key] || key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      const isPercent = key.includes('percent') || label.startsWith('%')
      const displayLabel = isPercent ? label.replace(/^% ?/, '') : label
      const displayVal = isPercent ? `+${val}%` : `+${val}`
      parts.push(`${displayVal} ${displayLabel}`)
    }
    return parts.length > 0 ? parts.join(', ') : '—'
  }

  if (typeof stats === 'string') return stats || '—'
  return '—'
}

function getItemPassive(item: any): string {
  if (item.passive_name && item.passive_brief) {
    return `${item.passive_name}: ${item.passive_brief}`
  }
  if (item.passive_brief) return item.passive_brief
  if (item.passive_full) return item.passive_full
  if (item.passive) return item.passive
  return '—'
}

// ─── GET Handler ────────────────────────────────────────────────────────────
export async function GET() {
  return new Response(
    JSON.stringify({
      providers: {
        groq: {
          available: GROQ_KEYS.length > 0,
          keyCount: GROQ_KEYS.length,
          models: GROQ_MODELS.map((m) => ({
            id: m.id,
            label: m.label,
            tpmLimit: m.tpmLimit,
          })),
        },
        openrouter: {
          available: OPENROUTER_KEYS.length > 0,
          keyCount: OPENROUTER_KEYS.length,
          models: OPENROUTER_MODELS,
        },
      },
      primary: GROQ_KEYS.length > 0 ? 'groq' : 'openrouter',
      updated: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}