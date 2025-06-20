'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function QuestionCard() {
  const [selectedOption, setSelectedOption] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const options = [
    { value: 'A', label: 'A. Paris' },
    { value: 'B', label: 'B. Rome' },
    { value: 'C', label: 'C. Berlin' },
    { value: 'D', label: 'D. Madrid' },
  ]

  const handleSelect = (value: string) => {
    setSelectedOption(value)
    setIsOpen(true)
  }

  return (
    <>
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">What is the capital of France?</h2>
          <RadioGroup value={selectedOption} onValueChange={handleSelect} className="space-y-2">
            {options.map(({ value, label }) => (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem value={value} id={`option-${value}`} />
                <Label htmlFor={`option-${value}`} className="cursor-pointer">
                  {label}
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
          <p className="text-muted-foreground">{selectedOption}</p>
          <Button
            onClick={() => {
              setSelectedOption('')
              setIsOpen(false)
            }}
          >
            Next Question
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
