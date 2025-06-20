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

const generateTriviaJSONPrompt = (topic: string) => `
You are a pub quiz master. Your task is to generate a fun and challenging trivia question on the topic: "${topic}".

Return your response as a JSON object that strictly follows this schema:

{
  "question": "string (the trivia question)",
  "choices": {
    "A": "string",
    "B": "string",
    "C": "string",
    "D": "string"
  },
  "answer": "A" | "B" | "C" | "D" (the letter of the correct answer)
}

Make the question clear, engaging, fun, and challenging. The choices should be diverse, and ensure the correct answer is accurate. Do not include any extra explanation or commentary—just the JSON.
`

export async function GET() {
  const randomTriviaTopic = triviaTopics[Math.floor(Math.random() * triviaTopics.length)]
  const prompt = generateTriviaJSONPrompt(randomTriviaTopic)

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
    let raw = data.choices?.[0]?.message?.content || '{}'

    // Strip Markdown-style code fences if present
    raw = raw
      .trim()
      .replace(/^```json/, '')
      .replace(/^```/, '')
      .replace(/```$/, '')
      .trim()

    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch (err) {
      return NextResponse.json({ error: 'Failed to parse JSON from OpenAI', raw }, { status: 500 })
    }

    return NextResponse.json(parsed, {
      headers: {
        'Cache-Control': 'no-store',
      },
    })
  } catch (error: unknown) {
    const err = error as ErrorWithMessage
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 })
  }
}
