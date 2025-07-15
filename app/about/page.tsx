import { SiteNav } from '@/components/SiteNav'
import { SiteFooter } from '@/components/SiteFooter'

export default function AboutPage() {
  return (
    <div className="grid grid-rows-[40px_1fr_auto] justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)] bg-muted">
      <SiteNav />

      <main className="row-start-2 w-full max-w-xl px-4">
        <div className="bg-white border border-border rounded-xl shadow-sm p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center">About PubGPT</h1>
          <p className="text-muted-foreground text-sm text-center">
            PubGPT is an AI-powered pub quiz game that generates new trivia questions on demand.
            It’s played as a <strong>10-question game</strong> — a completely arbitrary number I
            picked, just for fun!
          </p>
          <div className="text-sm leading-relaxed text-gray-700 space-y-4">
            <p>
              Hey there! I’m Sean 👋 — a software engineer who’s always loved building little games
              and experiments to explore cool tech. Whether it’s quirky side projects or tools to
              learn something new, I’m all about having fun while coding. 🎲✨
            </p>
            <p>
              That’s what inspired me to create <strong>PubGPT</strong>: an AI-driven pub quiz
              experience that whips up fresh trivia questions on the fly.
            </p>
            <p>
              I use the <strong>OpenAI API</strong> (specifically the GPT-4 model) to dynamically
              generate unique pub-style quiz questions based on a carefully crafted prompt. Each
              question includes four plausible multiple-choice answers, written in the fun,
              competitive tone you’d expect at a traditional trivia night. 🧠
            </p>
            <p>
              By leveraging GPT-4, PubGPT ensures each quiz session is fresh, unpredictable, and
              just a little bit cheeky.
            </p>
            <p>
              Under the hood, the trivia engine randomly selects from a huge pool of themed
              categories spanning movies, TV, sports, science, culture, and tons more. Here’s a peek
              at how the categories and prompts look behind the scenes:
            </p>
            <pre className="bg-gray-100 text-xs p-4 rounded whitespace-pre-wrap overflow-x-auto">
              {`// EXAMPLES OF TRIVIA CATEGORIES
// (just a sampling — there are over 100!)

MOVIES
  - Classic Cinema
  - Superhero Films
  - Movie Soundtracks

MUSIC
  - Pop Music Through the Decades
  - Hip-Hop & Rap
  - Music Festivals

GEOGRAPHY & TRAVEL
  - World Geography
  - Cities of the World
  - Flags of the World

SPORTS & GAMES
  - NFL Trivia
  - Olympic History
  - Esports & Video Games

FUN & RANDOM
  - Mythology & Legends
  - Weird But True
  - Pop Culture Moments

// PROMPT USED TO GENERATE A QUESTION

export const generateTriviaJSONPrompt = (topic) => \`
You are an expert pub quiz master. Your task is to generate one fun and challenging multiple-choice trivia question about the topic: "\${topic}".

Requirements:

- Make the question engaging and well-phrased—not too dry.
- Avoid repeating common trivia questions; aim for unique angles or surprising facts.
- Vary question styles: facts, identification, or “which of these is true?”
- Ensure all four choices are diverse and plausible.
- The correct answer must be accurate and verifiable.
- Keep the question concise (max 2-3 sentences).
- Return ONLY the JSON object. No extra commentary.

Schema:

{
  "question": "string (the trivia question)",
  "choices": {
    "A": "string",
    "B": "string",
    "C": "string",
    "D": "string"
  },
  "answer": "A" | "B" | "C" | "D"
}
\`;
`}
            </pre>
            <p>
              After receiving GPT-4’s answer, PubGPT strips any extra formatting, safely parses the
              JSON, and serves up your next question. The result? A seamless, ever-changing quiz
              experience that feels like you’re right at the pub. 🍻
            </p>
            <p>
              Want to peek under the hood or contribute? Check out the code on{' '}
              <a
                href="https://github.com/SeanPlusPlus/pubgpt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
              .
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
            <p>
              Enjoying PubGPT and wanna buy me a pint? 🍺 You can send a virtual round my way on{' '}
              <a
                href="https://venmo.com/SeanPlusPlus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Venmo
              </a>
              . Cheers!
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
