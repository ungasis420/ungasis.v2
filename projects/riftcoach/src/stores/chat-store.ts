// src/stores/chat-store.ts
// QF-5: Chat history store with Zustand + persist middleware
// Persists conversations to localStorage so chat survives page refresh
// Pattern matches existing settings-store.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ─── Types ──────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface Conversation {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

interface ChatState {
  // ─── State ──────────────────────────────────────────────────────────────────
  conversations: Conversation[]
  activeConversationId: string | null

  // ─── Actions ────────────────────────────────────────────────────────────────

  /** Create a new empty conversation and set it as active. Returns the new ID. */
  createConversation: () => string

  /** Switch to a different conversation by ID. */
  switchConversation: (id: string) => void

  /** Delete a conversation. If it was active, switches to the most recent one. */
  deleteConversation: (id: string) => void

  /** Add a message to the active conversation. Auto-creates a conversation if
   *  none is active. Returns the generated message ID. */
  addMessage: (role: 'user' | 'assistant', content: string) => string

  /** Update the content of a specific message (used during streaming). */
  updateMessageContent: (messageId: string, content: string) => void

  /** Auto-title the active conversation from the first user message. */
  autoTitleActiveConversation: () => void

  /** Clear all conversations and reset state. */
  clearAll: () => void
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function generateTitle(message: string): string {
  const cleaned = message.trim()
  if (cleaned.length <= 50) return cleaned
  return cleaned.slice(0, 47) + '...'
}

// ─── Store ──────────────────────────────────────────────────────────────────────

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      // ─── Initial State ────────────────────────────────────────────────────
      conversations: [],
      activeConversationId: null,

      // ─── Actions ──────────────────────────────────────────────────────────

      createConversation: () => {
        const id = generateId('conv')
        const newConversation: Conversation = {
          id,
          title: 'New Chat',
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }

        set((state) => ({
          // Newest first
          conversations: [newConversation, ...state.conversations],
          activeConversationId: id,
        }))

        return id
      },

      switchConversation: (id: string) => {
        const exists = get().conversations.some((c) => c.id === id)
        if (exists) {
          set({ activeConversationId: id })
        }
      },

      deleteConversation: (id: string) => {
        const state = get()
        const remaining = state.conversations.filter((c) => c.id !== id)

        let newActiveId = state.activeConversationId
        if (state.activeConversationId === id) {
          // Switch to the most recent remaining, or null
          newActiveId = remaining.length > 0 ? remaining[0].id : null
        }

        set({
          conversations: remaining,
          activeConversationId: newActiveId,
        })
      },

      addMessage: (role, content) => {
        let conversationId = get().activeConversationId

        // If no active conversation, create one automatically
        if (!conversationId) {
          conversationId = get().createConversation()
        }

        const messageId = generateId(role === 'user' ? 'user' : 'asst')
        const message: ChatMessage = {
          id: messageId,
          role,
          content,
          timestamp: Date.now(),
        }

        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, message],
                  updatedAt: Date.now(),
                }
              : conv
          ),
        }))

        return messageId
      },

      updateMessageContent: (messageId, content) => {
        const conversationId = get().activeConversationId
        if (!conversationId) return

        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: conv.messages.map((msg) =>
                    msg.id === messageId ? { ...msg, content } : msg
                  ),
                  updatedAt: Date.now(),
                }
              : conv
          ),
        }))
      },

      autoTitleActiveConversation: () => {
        const conv = get().conversations.find(
          (c) => c.id === get().activeConversationId
        )
        if (!conv || conv.title !== 'New Chat') return

        const firstUserMsg = conv.messages.find((m) => m.role === 'user')
        if (!firstUserMsg) return

        const title = generateTitle(firstUserMsg.content)

        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conv.id ? { ...c, title } : c
          ),
        }))
      },

      clearAll: () => {
        set({ conversations: [], activeConversationId: null })
      },
    }),
    {
      name: 'riftcoach-chat-history',
      // Only persist these fields (skip function references)
      partialize: (state) => ({
        conversations: state.conversations,
        activeConversationId: state.activeConversationId,
      }),
    }
  )
)