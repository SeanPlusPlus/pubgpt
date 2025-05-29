// app/api/openai/route.ts
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface ErrorWithMessage {
  message: string
}

const triviaTopics = [
  'Classic Cinema – Think pre-2000s movies, iconic directors, and Oscar-winning performances.',
  'World Geography – Capital cities, landmarks, borders, and natural wonders.',
  'Pop Music Through the Decades – From Elvis to Beyoncé, hits, lyrics, and legendary albums.',
  'Science & Nature – Chemistry, biology, physics, animals, and the natural world.',
  'Literature & Books – Famous authors, opening lines, banned books, and literary awards.',
  'Food & Drink – Cuisine, cocktails, ingredients, and famous chefs.',
  'History & Politics – Major wars, leaders, revolutions, and historical oddities.',
  'Sports & Games – Olympics, chess, soccer, Super Bowl MVPs, and more.',
  'TV Shows of the 2000s – Think Lost, Breaking Bad, The Office, etc.',
  'Weird But True – Bizarre facts, Guinness records, odd inventions, and strange laws.',
]

const generateTriviaPrompt = (topic: string) => `
You are a pub quiz master creating a single trivia question for a live audience. The topic is: "${topic}"

Your job is to write:
- One fun and challenging trivia question based on the topic
- Four answer choices labeled A, B, C, and D
- The correct answer clearly marked in a separate line

Format it like this:

Question: <the question>

A. <answer choice>
B. <answer choice>
C. <answer choice>
D. <answer choice>

Correct Answer: <A, B, C, or D>

Make the tone lively but clear, and avoid being too obscure or too easy. Do not include any explanation—just the formatted question and correct answer.
`

export async function GET() {
  const randomTriviaTopic = triviaTopics[Math.floor(Math.random() * triviaTopics.length)]
  const prompt = generateTriviaPrompt(randomTriviaTopic)

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
      }),
    })

    if (!openaiRes.ok) {
      const errorText = await openaiRes.text()
      return NextResponse.json(
        { error: 'OpenAI API request failed', details: errorText },
        { status: 500 }
      )
    }

    const data = await openaiRes.json()
    const response = data.choices?.[0]?.message?.content || 'No response.'

    return NextResponse.json(
      { prompt, response },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    )
  } catch (error: unknown) {
    const err = error as ErrorWithMessage
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 })
  }
}
