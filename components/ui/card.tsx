import * as React from 'react'
import { cn } from '@/lib/utils'

export const Card = React.forwardRef<React.ElementRef<'div'>, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => (
    <div
      ref={ref}
      className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', props.className)}
      {...props}
    />
  )
)
Card.displayName = 'Card'

export const CardContent = React.forwardRef<
  React.ElementRef<'div'>,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => <div ref={ref} className={cn('p-4', props.className)} {...props} />)
CardContent.displayName = 'CardContent'
