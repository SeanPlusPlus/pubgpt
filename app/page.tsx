'use client'

import { useState } from 'react'
import { SiteNav } from '@/components/SiteNav'
import { SiteFooter } from '@/components/SiteFooter'
import { QuestionCard } from '@/components/QuestionCard'
import { Button } from '@/components/ui/button'

// === Toggle this flag for testing ===
const USE_MOCK = process.env.NODE_ENV === 'development'

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false)

  return (
    <div className="grid grid-rows-[40px_1fr_auto] justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)] bg-muted">
      <SiteNav />

      <main className="row-start-2 w-full max-w-xl px-4">
        <div className="bg-white border border-border rounded-xl shadow-sm p-8">
          {!hasStarted ? (
            <div className="space-y-6 text-center">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold">PubGPT</h1>
                <p className="text-muted-foreground text-sm">An LLM-powered pub quiz game</p>
              </div>
              <Button onClick={() => setHasStarted(true)} size="lg" className="cursor-pointer">
                Play Now
              </Button>
            </div>
          ) : (
            <QuestionCard mock={USE_MOCK} />
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
