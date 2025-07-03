'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

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

  const fetchQuestion = async () => {
    setLoading(true)
    setSelectedOption('')
    const url = mock ? '/api/openai?mock=true' : '/api/openai'
    const res = await fetch(url)
    const json = await res.json()
    setData(json)
    setLoading(false)
  }

  useEffect(() => {
    fetchQuestion()
  }, [mock])

  const handleSelect = (value: string) => {
    setSelectedOption(value)
    setIsOpen(true)
  }

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center p-8">
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
      </div>
    )
  }

  if (!data) return null

  const isCorrect = selectedOption === data.answer

  return (
    <>
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">{data.question}</h2>
          <RadioGroup value={selectedOption} onValueChange={handleSelect} className="space-y-4">
            {Object.entries(data.choices).map(([key, label]) => (
              <div
                key={key}
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent/40 transition-colors"
              >
                <RadioGroupItem value={key} id={`option-${key}`} />
                <Label htmlFor={`option-${key}`} className="cursor-pointer text-sm leading-snug">
                  <span className="font-medium">{key}.</span> {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            fetchQuestion()
          }
          setIsOpen(open)
        }}
      >
        <DialogContent className="space-y-2">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Results</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="font-medium">{data.question}</p>

            <div className="space-y-2">
              {Object.entries(data.choices).map(([key, label]) => {
                const isSelected = key === selectedOption
                const isAnswer = key === data.answer

                let bg = 'bg-gray-100'
                if (isAnswer && isSelected) {
                  bg = 'bg-green-100'
                } else if (isAnswer) {
                  bg = 'bg-green-50'
                } else if (isSelected) {
                  bg = 'bg-red-100'
                }

                return (
                  <div
                    key={key}
                    className={`p-3 rounded border border-border ${bg} flex justify-between`}
                  >
                    <span className="text-sm">
                      <span className="font-bold">{key}.</span> {label}
                    </span>
                    {isAnswer && <span className="text-green-700 font-semibold">Correct</span>}
                    {!isAnswer && isSelected && (
                      <span className="text-red-700 font-semibold">Your choice</span>
                    )}
                  </div>
                )
              })}
            </div>

            <p className={isCorrect ? 'text-green-600' : 'text-red-600'}>
              {isCorrect ? '✅ Correct!' : `❌ Incorrect.`}
            </p>
          </div>

          <Button
            onClick={() => {
              setIsOpen(false)
              fetchQuestion()
            }}
          >
            Next Question
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
