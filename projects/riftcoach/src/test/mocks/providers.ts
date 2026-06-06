// src/test/mocks/providers.ts
import { vi } from 'vitest';

export const ALL_PROVIDERS = [
  'cerebras',
  'groq',
  'google',
  'openrouter',
  'mistral',
  'together',
];

export function createMockProvider(name: string) {
  if (!ALL_PROVIDERS.includes(name)) {
    throw new Error(`Unsupported mock provider: ${name}`);
  }
  return {
    generateText: vi.fn().mockResolvedValue({
      text: 'mock-response',
      usage: { totalTokens: 100 },
    }),
  };
}

export function createMockStreamResponse(): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('mock-stream-chunk'));
      controller.close();
    },
  });
}

// Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
