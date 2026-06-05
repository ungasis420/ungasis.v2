// middleware.ts
// Minimal middleware required by Next.js 15 to generate middleware-manifest.json
// when edge runtime API routes are present.
// This file intentionally does nothing — it exists only to satisfy Next.js build tooling.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // Only match API routes that use edge runtime — keeps this a no-op for all other pages.
  matcher: [],
};
