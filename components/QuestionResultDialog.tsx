'use client'

import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import ScoreBoard from './ScoreBoard'

type QuestionResultDialogProps = {
  isOpen: boolean
  isGameOver: boolean
  onOpenChange: (open: boolean) => void
  data: {
    question: string
    choices: Record<string, string>
    answer: string
  } | null
  selectedOption: string
  isCorrect: boolean
  correctCount: number
  scores: (null | 'success' | 'error')[]
  onNext: () => void
  onResetGame: () => void
  isLastQuestion: boolean
}

export default function QuestionResultDialog({
  isOpen,
  isGameOver,
  onOpenChange,
  data,
  selectedOption,
  isCorrect,
  correctCount,
  scores,
  onNext,
  onResetGame,
  isLastQuestion,
}: QuestionResultDialogProps) {
  return (
    <Dialog
      open={isOpen || isGameOver}
      onOpenChange={(open) => {
        if (!open && !isGameOver) {
          onNext()
        }
        onOpenChange(open)
      }}
    >
      <DialogContent className="space-y-2">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {isGameOver ? 'Game Over' : 'Results'}
          </DialogTitle>
        </DialogHeader>

        {!isGameOver && data && (
          <div className="space-y-4">
            <p className="text-base font-medium text-gray-900">{data.question}</p>

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
              {isCorrect ? '✅ Correct!' : '❌ Incorrect.'}
            </p>
          </div>
        )}

        {isGameOver && (
          <div className="space-y-4">
            <p className="text-base font-medium text-gray-900">
              You answered {correctCount} out of 10 questions correctly!
            </p>

            <ScoreBoard scores={scores} hideTitle={true} />

            <div className="pt-4 flex justify-center">
              <Image
                src="/logo.png"
                alt="PubGPT Logo"
                width={100}
                height={100}
                className="rounded"
              />
            </div>
          </div>
        )}

        <Button
          className="cursor-pointer"
          onClick={() => {
            if (isGameOver) {
              onResetGame()
            } else {
              onNext()
            }
          }}
        >
          {isGameOver ? 'Start a new game' : isLastQuestion ? 'View Final Score' : 'Next Question'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
