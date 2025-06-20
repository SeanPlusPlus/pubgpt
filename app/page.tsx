import { SiteNav } from '@/components/SiteNav'
import { SiteFooter } from '@/components/SiteFooter'
import { QuestionCard } from '@/components/QuestionCard'

export default function Home() {
  return (
    <div className="grid grid-rows-[40px_1fr_auto] items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)] bg-muted">
      <SiteNav />

      <main className="row-start-2 w-full max-w-xl px-4">
        <div className="bg-white border border-border rounded-xl shadow-sm p-8">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">PubGPT</h1>
            <p className="text-muted-foreground text-sm">An LLM-powered pub quiz game</p>
          </div>
          <QuestionCard />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
