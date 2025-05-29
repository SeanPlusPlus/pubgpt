// app/api/openai/route.ts
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface ErrorWithMessage {
  message: string
}

const prompts = [
  'Write a bedtime story about a space giraffe.',
  'Explain quantum physics like I’m five.',
  'Invent a new sport played on the moon.',
  'Describe the taste of sunlight.',
  'What if cats could vote?',
]

export async function GET() {
  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: randomPrompt }],
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
      { prompt: randomPrompt, response },
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
