import crypto from 'crypto';

export function createSession() {
  return {
    sessionId: crypto.randomUUID(),
  };
}

export function getSession(sessionId: string) {
  return {
    sessionId,
  };
}

export async function updateSession(sessionId: string, data: any): Promise<void> {
  // Stub
}

export function trackAgentPerf(role: string, latencyMs: number, success: boolean): void {
  // Stub
}
