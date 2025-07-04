// app/api/openai/route.ts
import { NextResponse } from 'next/server'
import { mockQuestions } from './mock'
import { triviaTopics } from './triviaTopics'
import { generateTriviaJSONPrompt } from './generateTriviaJSONPrompt'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface ErrorWithMessage {
  message: string
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const isMock = url.searchParams.get('mock') === 'true'

  if (isMock) {
    const randomMockQuestion = mockQuestions[Math.floor(Math.random() * mockQuestions.length)]
    return NextResponse.json(randomMockQuestion, {
      headers: {
        'Cache-Control': 'no-store',
      },
    })
  }

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
