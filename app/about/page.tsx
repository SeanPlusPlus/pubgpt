import { SiteNav } from '@/components/SiteNav'
import { SiteFooter } from '@/components/SiteFooter'

export default function AboutPage() {
  return (
    <div className="grid grid-rows-[40px_1fr_auto] items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)] bg-muted">
      <SiteNav />

      <main className="row-start-2 w-full max-w-xl px-4">
        <div className="bg-white border border-border rounded-xl shadow-sm p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center">About PubGPT</h1>
          <p className="text-muted-foreground text-sm text-center">
            PubGPT is an AI-powered pub quiz game that generates new trivia questions on demand.
          </p>
          <div className="text-sm leading-relaxed text-gray-700 space-y-4">
            <p>
              I use the <strong>OpenAI API</strong> to dynamically generate unique pub-style quiz
              questions based on a carefully crafted prompt. Each question includes four plausible
              multiple-choice answers and is written in the fun, competitive tone you&apos;d find in
              a traditional trivia night.
            </p>
            <p>
              By leveraging the latest LLM models, PubGPT ensures each quiz session is fresh,
              unpredictable, and just a little bit cheeky.
            </p>
            <p>
              Under the hood, the trivia engine randomly selects from a pool of themed categories
              like classic cinema, world geography, or “weird but true” facts. It sends a structured
              prompt to the LLM requesting a strict JSON response containing a question, four
              labeled choices, and the correct answer’s letter.
            </p>
            <p>
              After receiving the response, the backend strips any extra Markdown formatting, parses
              the raw JSON safely, and serves it directly to the client for rendering. This makes
              the game feel fast, seamless, and robust—even when the LLM tries to get fancy.
            </p>
            <p>
              Got feedback? Found a funny question? Just wanna say hi?{' '}
              <a
                href="https://twitter.com/seanplusplus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Ping me on Twitter
              </a>{' '}
              — I’d love to hear what you think!
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
