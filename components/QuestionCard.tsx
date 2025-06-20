'use client'

import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export function QuestionCard() {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">What is the capital of France?</h2>
        <RadioGroup className="space-y-2">
          {[
            { value: 'A', label: 'A. Paris' },
            { value: 'B', label: 'B. Rome' },
            { value: 'C', label: 'C. Berlin' },
            { value: 'D', label: 'D. Madrid' },
          ].map(({ value, label }) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={`option-${value}`} />
              <Label htmlFor={`option-${value}`}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
