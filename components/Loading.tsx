'use client'

import ScoreBoard from './ScoreBoard'

type LoadingProps = {
  loadingMessage: string
  scores: (null | 'success' | 'error')[]
}

export default function Loading({ loadingMessage, scores }: LoadingProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center p-8 space-y-6">
      <div className="flex flex-col justify-center items-center space-y-4">
        <p className="text-sm text-gray-600">{loadingMessage}</p>
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

      <ScoreBoard scores={scores} />
    </div>
  )
}
