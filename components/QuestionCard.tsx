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

export function QuestionCard() {
  const [selectedOption, setSelectedOption] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<QuestionData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchQuestion = async () => {
    setLoading(true)
    setSelectedOption('')
    const res = await fetch('/api/openai')
    const json = await res.json()
    setData(json)
    setLoading(false)
  }

  useEffect(() => {
    fetchQuestion()
  }, [])

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

  return (
    <>
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">{data.question}</h2>
          <RadioGroup value={selectedOption} onValueChange={handleSelect} className="space-y-2">
            {Object.entries(data.choices).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-2">
                <RadioGroupItem value={key} id={`option-${key}`} />
                <Label htmlFor={`option-${key}`} className="cursor-pointer">
                  {key}. {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You selected:</DialogTitle>
          </DialogHeader>

          <p className="text-muted-foreground">
            {selectedOption}. {data.choices[selectedOption]}
          </p>

          <p className={selectedOption === data.answer ? 'text-green-600' : 'text-red-600'}>
            {selectedOption === data.answer
              ? '✅ Correct!'
              : `❌ Incorrect. Correct answer is ${data.answer}. ${data.choices[data.answer]}`}
          </p>

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
