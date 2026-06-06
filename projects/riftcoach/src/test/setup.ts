// src/test/setup.ts
import '@testing-library/jest-dom';
import { vi, afterEach } from 'vitest';

process.env.CEREBRAS_API_KEY = 'test-key-xxx';
process.env.GROQ_API_KEY = 'test-key-xxx';
process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'test-key-xxx';
process.env.OPENROUTER_API_KEY = 'test-key-xxx';
process.env.MISTRAL_API_KEY = 'test-key-xxx';
process.env.TOGETHER_AI_API_KEY = 'test-key-xxx';
process.env.UPSTASH_REDIS_REST_URL = 'test-key-xxx';
process.env.UPSTASH_REDIS_REST_TOKEN = 'test-key-xxx';
process.env.LANGFUSE_SECRET_KEY = 'test-key-xxx';
process.env.LANGFUSE_PUBLIC_KEY = 'test-key-xxx';
process.env.LANGFUSE_BASEURL = 'test-key-xxx';

afterEach(() => {
  vi.restoreAllMocks();
});

// Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
