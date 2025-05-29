// app/api/hello/route.ts
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic' // Disable static caching (no ISR)
export const revalidate = 0 // Prevent revalidation

export async function GET() {
  return NextResponse.json(
    { message: 'Hello, world!' },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    }
  )
}
