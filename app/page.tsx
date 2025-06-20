import { QuestionCard } from '@/components/QuestionCard'

export default function Home() {
  return (
    <div className="grid grid-rows-[40px_1fr_20px] items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      {/* Navigation */}
      <nav className="row-start-1 w-full text-sm">
        <div className="max-w-screen-lg mx-auto px-4 flex gap-8">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/about" className="hover:underline">
            About
          </a>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl">PubGPT</h1>
        <QuestionCard />
      </main>
    </div>
  )
}
