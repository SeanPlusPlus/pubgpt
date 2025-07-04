// app/api/openai/route.ts

import { NextResponse } from 'next/server'
import { mockQuestions } from './mock'
import { triviaTopics } from './triviaTopics'
import { generateTriviaJSONPrompt } from './generateTriviaJSONPrompt'

// Tell Next.js this route is fully dynamic
export const dynamic = 'force-dynamic'
// Disable any caching for this route
export const revalidate = 0

// Define a simple error type to safely access error messages
interface ErrorWithMessage {
  message: string
}

export async function GET(request: Request) {
  // Parse the incoming request URL
  const url = new URL(request.url)

  // Check if the caller requested mock data (?mock=true)
  const isMock = url.searchParams.get('mock') === 'true'

  if (isMock) {
    // Randomly select one mock question from the mockQuestions array
    const randomMockQuestion = mockQuestions[Math.floor(Math.random() * mockQuestions.length)]

    // Return the mock question immediately without calling OpenAI
    return NextResponse.json(randomMockQuestion, {
      headers: {
        'Cache-Control': 'no-store', // Prevent caching
      },
    })
  }

  // Randomly pick one trivia topic to generate a question about
  const randomTriviaTopic = triviaTopics[Math.floor(Math.random() * triviaTopics.length)]

  // Build a text prompt asking for trivia data in JSON format
  const prompt = generateTriviaJSONPrompt(randomTriviaTopic)

  try {
    // Call the OpenAI Chat Completions endpoint
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        // Use your API key from environment variables
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8, // Add some creativity to the response
      }),
    })

    // Handle API errors (e.g. bad auth, model errors, etc.)
    if (!openaiRes.ok) {
      const errorText = await openaiRes.text()
      return NextResponse.json(
        {
          error: 'OpenAI API request failed',
          details: errorText,
        },
        { status: 500 }
      )
    }

    // Parse the JSON returned by the OpenAI API
    const data = await openaiRes.json()

    // The LLM might wrap JSON inside markdown code fences. Extract raw JSON string safely:
    let raw = data.choices?.[0]?.message?.content || '{}'

    raw = raw
      .trim()
      // Remove possible opening code fence
      .replace(/^```json/, '')
      .replace(/^```/, '')
      // Remove possible closing code fence
      .replace(/```$/, '')
      .trim()

    let parsed
    try {
      // Attempt to parse the JSON string
      parsed = JSON.parse(raw)
    } catch (err) {
      // If parsing fails, send back the raw text so the caller can debug
      return NextResponse.json(
        {
          error: 'Failed to parse JSON from OpenAI',
          raw,
        },
        { status: 500 }
      )
    }

    // Success — return the parsed JSON trivia question
    return NextResponse.json(parsed, {
      headers: {
        'Cache-Control': 'no-store', // Disable caching
      },
    })
  } catch (error: unknown) {
    // Catch any unexpected runtime errors (e.g. network issues)
    const err = error as ErrorWithMessage
    return NextResponse.json(
      {
        error: 'Server error',
        details: err.message,
      },
      { status: 500 }
    )
  }
}
