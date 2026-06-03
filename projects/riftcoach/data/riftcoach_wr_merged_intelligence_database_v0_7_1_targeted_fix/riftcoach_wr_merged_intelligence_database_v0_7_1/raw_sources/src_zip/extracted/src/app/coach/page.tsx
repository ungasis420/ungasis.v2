// src/app/coach/page.tsx
// QF-1: Rich markdown rendering (ReactMarkdown + remark-gfm)
// QF-5: Chat history with Zustand persist (conversations survive refresh)
// Phase 3: BuildView JSON rendering for Route A builds

'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { MarkdownMessage } from '@/components/app/markdown-message'
import { BuildView } from '@/components/build/BuildView'
import {
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  PlusCircle,
  MessageSquare,
  Trash2,
  ChevronDown,
} from 'lucide-react'
import { useChatStore } from '@/stores/chat-store'

// ─── Constant: empty array for stable reference when no messages ────────────
const EMPTY_MESSAGES: { id: string; role: 'user' | 'assistant'; content: string; timestamp: number }[] = []

// ─── Suggested questions for empty state ────────────────────────────────────
const SUGGESTIONS = [
  'What is the best build for Karma support?',
  'How do I counter Yasuo in mid lane?',
  'Which champions synergize with Jinx?',
  'How should I play the early game as a support?',
  'What runes should I take on Nautilus?',
  'Draft tips for ranked — what to ban?',
] as const

// ─── Stream Parser ──────────────────────────────────────────────────────────

function extractTextFromChunk(chunk: string): string {
  if (!chunk.trim()) return ''

  const lines = chunk.split('\n').filter((l) => l.trim())
  if (lines.length === 0) return ''

  const firstLine = lines[0].trim()

  // Format 1: SSE (Server-Sent Events) — "data: {...}"
  if (firstLine.startsWith('data: ')) {
    let text = ''
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith('data: ')) continue
      const payload = trimmed.slice(6)
      if (payload === '[DONE]') continue
      try {
        const parsed = JSON.parse(payload)
        if (parsed.type === 'text-delta' && parsed.delta) {
          text += parsed.delta
        } else if (parsed.choices?.[0]?.delta?.content) {
          text += parsed.choices[0].delta.content
        }
      } catch {
        // Not JSON, skip
      }
    }
    return text
  }

  // Format 2: DataStream — "0:"text""
  if (/^\d+:/.test(firstLine)) {
    let text = ''
    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed.startsWith('0:')) {
        try {
          text += JSON.parse(trimmed.slice(2))
        } catch {
          // Not valid JSON
        }
      }
    }
    return text
  }

  // Format 3: PlainText — return as-is
  return chunk
}

// ─── Time Formatter ─────────────────────────────────────────────────────────

function formatTime(ts: number): string {
  const diffMs = Date.now() - ts
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`

  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`

  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 7) return `${diffDays}d ago`

  return new Date(ts).toLocaleDateString()
}

// ─── Throttle interval for store updates during streaming (ms) ──────────────
const STREAM_UPDATE_MS = 100

// ─── Main Component ─────────────────────────────────────────────────────────

export default function CoachPage() {
  // ─── Zustand store ────────────────────────────────────────────────────
  const conversations = useChatStore((s) => s.conversations)
  const activeConversationId = useChatStore((s) => s.activeConversationId)

  const messages = useChatStore((s) => {
    if (!s.activeConversationId) return EMPTY_MESSAGES
    const conv = s.conversations.find((c) => c.id === s.activeConversationId)
    return conv?.messages ?? EMPTY_MESSAGES
  })

  const createConversation = useChatStore((s) => s.createConversation)
  const switchConversation = useChatStore((s) => s.switchConversation)
  const deleteConversation = useChatStore((s) => s.deleteConversation)
  const addMessage = useChatStore((s) => s.addMessage)
  const updateMessageContent = useChatStore((s) => s.updateMessageContent)
  const autoTitleActiveConversation = useChatStore((s) => s.autoTitleActiveConversation)

  // ─── Local state ──────────────────────────────────────────────────────
  const [input, setInput] = React.useState('')
  const [isStreaming, setIsStreaming] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [showHistory, setShowHistory] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [variantData, setVariantData] = React.useState<{
    intent: string
    label: string
    emoji: string
    color: string
    description?: string
    swapCount?: number
  } | null>(null)

  const scrollRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const historyRef = React.useRef<HTMLDivElement>(null)

  // ─── Effects ──────────────────────────────────────────────────────────
  React.useEffect(() => { setMounted(true) }, [])

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  React.useEffect(() => { inputRef.current?.focus() }, [])

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (historyRef.current && !historyRef.current.contains(e.target as Node)) {
        setShowHistory(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // ─── Send Message Handler ─────────────────────────────────────────────
  const sendMessage = React.useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isStreaming) return

      setError(null)
      setInput('')
      setVariantData(null)

      addMessage('user', trimmed)
      autoTitleActiveConversation()
      const assistantId = addMessage('assistant', '')

      setIsStreaming(true)

      try {
        const currentMessages = useChatStore.getState().conversations.find(
          (c) => c.id === useChatStore.getState().activeConversationId
        )?.messages ?? []

        const history = currentMessages
          .filter((m) => m.content.trim())
          .slice(-20)
          .map((m) => ({ role: m.role, content: m.content }))

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
        })

        // ✅ Read X-Build-Variant header (set when build variant is active)
        const variantHeader = response.headers.get('X-Build-Variant')
        const headerVariantData = variantHeader ? JSON.parse(decodeURIComponent(variantHeader)) : null
        setVariantData(headerVariantData)

        // ✅ Check if JSON (build response from Route A)
        const contentType = response.headers.get('content-type')

        if (contentType && contentType.includes('application/json')) {
          const data = await response.json()

          if (data.type === 'build') {
            // Route A returns all fields at top level (champion, role, coreItems, synergies, etc.)
            // We wrap it under "data" key for BuildView to consume
            updateMessageContent(assistantId, JSON.stringify({
              type: 'build',
              data: {
                champion: data.champion,
                role: data.role,
                coreItems: data.coreItems || [],
                situationalItems: data.situationalItems || [],
                runes: data.runes || [],
                spells: data.spells || [],
                buildOrder: data.buildOrder || [],
                powerCurve: data.powerCurve || { early: 0.5, mid: 0.5, late: 0.5 },
                stats: data.stats || {},
                pros: data.pros || [],
                cons: data.cons || [],
                // Phase 4.5: Relationship data
                synergies: data.synergies || [],
                antiSynergies: data.antiSynergies || [],
                strongAgainst: data.strongAgainst || [],
                weakAgainst: data.weakAgainst || [],
                counterStrategies: data.counterStrategies || [],
              }
            }))
            setIsStreaming(false)
            return
          }

          // Handle other JSON responses (errors, etc.)
          if (data.error) {
            updateMessageContent(assistantId, data.error)
            setIsStreaming(false)
            return
          }
        }

        // ✅ Otherwise handle streaming (Route B)
        if (!response.ok) {
          const errText = await response.text().catch(() => 'Unknown error')
          throw new Error(`Server error ${response.status}: ${errText}`)
        }

        if (!response.body) {
          throw new Error('No response body — streaming not supported')
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let accumulated = ''
        let lastStoreUpdate = 0

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const extracted = extractTextFromChunk(chunk)

          if (extracted) {
            accumulated += extracted

            const now = Date.now()
            if (now - lastStoreUpdate >= STREAM_UPDATE_MS) {
              updateMessageContent(assistantId, accumulated)
              lastStoreUpdate = now
            }
          }
        }

        if (accumulated.trim()) {
          updateMessageContent(assistantId, accumulated)
        } else {
          updateMessageContent(
            assistantId,
            "I couldn't generate a response. Try asking again — sometimes models need a second try. 🔄"
          )
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Something went wrong'
        setError(errorMessage)
        updateMessageContent(
          assistantId,
          `⚠️ **Error:** ${errorMessage}\n\nTry asking again — I'll use a different model.`
        )
      } finally {
        setIsStreaming(false)
      }
    },
    [isStreaming, addMessage, updateMessageContent, autoTitleActiveConversation]
  )
  // ─── Event Handlers ───────────────────────────────────────────────────

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion)
  }

  const handleNewChat = () => {
    createConversation()
    setShowHistory(false)
    setError(null)
    inputRef.current?.focus()
  }

  const handleSwitchConversation = (id: string) => {
    switchConversation(id)
    setShowHistory(false)
    setError(null)
  }

  const handleDeleteConversation = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    deleteConversation(id)
  }

  // ─── Render ───────────────────────────────────────────────────────────
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* ─── Header with Chat History Controls ─────────────────────────── */}
      <div className="flex-none px-6 pt-6 pb-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              <Sparkles className="mr-2 inline-block h-6 w-6 text-indigo-400" />
              Coach
            </h2>
            <p className="text-sm text-muted-foreground">
              Ask me anything about Wild Rift — builds, counters, drafting,
              macro, runes, items.
            </p>
          </div>

          {/* Chat History Controls */}
          {mounted && (
            <div className="flex flex-none items-center gap-2" ref={historyRef}>
              {/* New Chat Button */}
              <button
                onClick={handleNewChat}
                disabled={isStreaming}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5',
                  'px-3 py-1.5 text-xs font-medium text-muted-foreground',
                  'transition hover:bg-white/10 hover:text-foreground',
                  'disabled:cursor-not-allowed disabled:opacity-40'
                )}
              >
                <PlusCircle className="h-3.5 w-3.5" />
                New Chat
              </button>

              {/* History Dropdown */}
              {conversations.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className={cn(
                      'flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5',
                      'px-3 py-1.5 text-xs font-medium text-muted-foreground',
                      'transition hover:bg-white/10 hover:text-foreground',
                      showHistory && 'bg-white/10 text-foreground'
                    )}
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    History ({conversations.length})
                    <ChevronDown
                      className={cn(
                        'h-3 w-3 transition-transform',
                        showHistory && 'rotate-180'
                      )}
                    />
                  </button>

                  {/* Dropdown Panel */}
                  {showHistory && (
                    <div
                      className={cn(
                        'absolute right-0 top-full z-50 mt-1 w-72',
                        'max-h-80 overflow-y-auto rounded-xl',
                        'border border-white/10 bg-background/95 backdrop-blur-xl',
                        'shadow-xl'
                      )}
                    >
                      {conversations.map((conv) => (
                        <button
                          key={conv.id}
                          onClick={() => handleSwitchConversation(conv.id)}
                          className={cn(
                            'flex w-full items-center gap-2 px-3 py-2.5 text-left',
                            'border-b border-white/5 transition last:border-0',
                            'hover:bg-white/5',
                            conv.id === activeConversationId &&
                              'bg-indigo-500/10 text-indigo-400'
                          )}
                        >
                          <MessageSquare className="h-3.5 w-3.5 flex-none text-muted-foreground" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-medium">
                              {conv.title}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              {conv.messages.length} messages •{' '}
                              {formatTime(conv.updatedAt)}
                            </p>
                          </div>
                          <button
                            onClick={(e) => handleDeleteConversation(e, conv.id)}
                            className="flex-none rounded p-1 text-muted-foreground/50 transition hover:bg-red-500/10 hover:text-red-400"
                            title="Delete conversation"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ─── Messages Area ─────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
      >
        {messages.length === 0 ? (
          // Empty state with suggestions
          <div className="flex h-full flex-col items-center justify-center gap-6">
            <div className="text-center">
              <Bot className="mx-auto mb-3 h-12 w-12 text-indigo-400/60" />
              <h3 className="text-lg font-semibold text-foreground">
                RiftCoach AI
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your personal Wild Rift coaching assistant. Ask me anything.
              </p>
            </div>
            <div className="grid w-full max-w-lg grid-cols-1 gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  disabled={isStreaming}
                  className={cn(
                    'rounded-xl border border-white/10 bg-white/5 px-4 py-3',
                    'text-left text-sm text-muted-foreground',
                    'backdrop-blur transition hover:bg-white/10 hover:text-foreground',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60',
                    'disabled:cursor-not-allowed disabled:opacity-40'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Message list
          messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex gap-3',
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {/* Bot Avatar */}
              {msg.role === 'assistant' && (
                <div className="mt-1 flex-none">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
                    <Bot className="h-4 w-4" />
                  </div>
                </div>
              )}

              {/* Message Bubble */}
              <Card
                className={cn(
                  'max-w-[85%] sm:max-w-[75%]',
                  msg.role === 'user'
                    ? 'border-indigo-500/30 bg-indigo-500/20'
                    : 'glass border-white/10'
                )}
              >
                <CardContent className="p-3">
                  {msg.role === 'assistant' ? (
                    msg.content ? (
                      (() => {
                        try {
                          const parsed = JSON.parse(msg.content)
                          if (parsed?.type === 'build') {
                            return <BuildView data={parsed.data} variant={variantData} />
                          }
                        } catch {
                          // Not JSON — render as markdown
                        }
                        return (
                          <MarkdownMessage
                            content={msg.content}
                            className="text-sm text-foreground"
                          />
                        )
                      })()
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Thinking...</span>
                      </div>
                    )
                  ) : (
                    <p className="text-sm text-foreground">{msg.content}</p>
                  )}
                </CardContent>
              </Card>
              {/* User Avatar */}
              {msg.role === 'user' && (
                <div className="mt-1 flex-none">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-foreground">
                    <User className="h-4 w-4" />
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* ─── Error Banner ──────────────────────────────────────────────── */}
      {error && (
        <div className="mx-4 mb-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* ─── Input Area ────────────────────────────────────────────────── */}
      <div className="flex-none border-t border-white/10 px-4 py-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isStreaming ? 'Coach is responding...' : 'Ask your coach...'
            }
            disabled={isStreaming}
            className={cn(
              'flex-1 rounded-xl border-white/10 bg-white/5 backdrop-blur',
              'placeholder:text-muted-foreground/50',
              'focus-visible:ring-indigo-500/60'
            )}
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className={cn(
              'rounded-xl border border-white/10 bg-indigo-500/20 px-4',
              'text-indigo-400 transition',
              'hover:bg-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-40',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60'
            )}
          >
            {isStreaming ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  )
}