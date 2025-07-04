'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { loadingMessages } from './loadingMessages'
import ScoreBoard from './ScoreBoard'
import QuestionResultDialog from './QuestionResultDialog'

type QuestionData = {
  question: string
  choices: Record<string, string>
  answer: string
}

type QuestionCardProps = {
  mock?: boolean
}

export function QuestionCard({ mock = false }: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<QuestionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [scores, setScores] = useState<(null | 'success' | 'error')[]>(Array(10).fill(null))
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [hasSeenFinalScore, setHasSeenFinalScore] = useState(false)

  const fetchQuestion = async () => {
    setLoading(true)
    setSelectedOption('')
    const url = mock ? '/api/openai?mock=true' : '/api/openai'
    const res = await fetch(url)
    const json = await res.json()
    setData(json)
    setLoading(false)
    setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])
  }

  useEffect(() => {
    setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])
    fetchQuestion()
  }, [mock])

  const handleSelect = (value: string) => {
    setSelectedOption(value)
    setIsOpen(true)
  }

  const handleNext = () => {
    setScores((prev) => {
      const newScores = [...prev]
      newScores[currentQuestionIndex] = selectedOption === data?.answer ? 'success' : 'error'
      return newScores
    })

    const nextIndex = currentQuestionIndex + 1

    if (nextIndex >= 10) {
      setHasSeenFinalScore(true)
      setIsOpen(false)
    } else {
      setCurrentQuestionIndex(nextIndex)
      setIsOpen(false)
      fetchQuestion()
    }
  }

  const handleResetGame = () => {
    setScores(Array(10).fill(null))
    setCurrentQuestionIndex(0)
    setSelectedOption('')
    setIsOpen(false)
    setHasSeenFinalScore(false)
    fetchQuestion()
  }

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center p-8 space-y-4">
        <svg
          className="animate-spin h-8 w-8 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <p className="text-sm text-gray-600">{loadingMessage}</p>
      </div>
    )
  }

  if (!data) return null

  const isCorrect = selectedOption === data.answer
  const isGameOver = hasSeenFinalScore
  const isLastQuestion = currentQuestionIndex === 9
  const correctCount = scores.filter((s) => s === 'success').length

  return (
    <>
      {!isGameOver && (
        <Card className="w-full max-w-md">
          <CardContent className="p-2 space-y-3">
            <h2 className="text-xl font-normal leading-snug text-gray-900">{data.question}</h2>

            <RadioGroup value={selectedOption} onValueChange={handleSelect} className="space-y-3">
              {Object.entries(data.choices).map(([key, label]) => (
                <div
                  key={key}
                  onClick={() => handleSelect(key)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSelect(key)
                    }
                  }}
                  className="
                    flex flex-nowrap items-center gap-3
                    w-full text-left
                    p-3 rounded-lg border border-border
                    hover:bg-accent/40 transition-colors
                    cursor-pointer
                  "
                >
                  <RadioGroupItem
                    value={key}
                    id={`option-${key}`}
                    className="flex-shrink-0 h-5 w-5 pointer-events-none"
                  />
                  <span className="text-sm leading-snug break-words">
                    <span className="font-medium">{key}.</span> {label}
                  </span>
                </div>
              ))}
            </RadioGroup>

            <ScoreBoard scores={scores} />
          </CardContent>
        </Card>
      )}

      <QuestionResultDialog
        isOpen={isOpen}
        isGameOver={isGameOver}
        onOpenChange={setIsOpen}
        data={data}
        selectedOption={selectedOption}
        isCorrect={isCorrect}
        correctCount={correctCount}
        scores={scores}
        onNext={handleNext}
        onResetGame={handleResetGame}
        isLastQuestion={isLastQuestion}
      />
    </>
  )
}
