'use client'

export default function ScoreBoard({
  scores,
  hideTitle = false,
}: {
  scores: (null | 'success' | 'error')[]
  hideTitle?: boolean
}) {
  const getEmoji = (status: string | null) => {
    if (status === 'success') return '✅'
    if (status === 'error') return '❌'
    return '⬜️'
  }

  return (
    <div className="mt-8">
      {!hideTitle && <h2 className="text-center text-lg font-semibold mb-4">Scoreboard</h2>}

      <div className="flex justify-center">
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="inline-grid grid-cols-5 grid-rows-2 gap-px bg-gray-200">
            {scores.map((status, index) => (
              <div
                key={index}
                className="flex items-center justify-center aspect-square bg-white p-2"
              >
                <span className={status == null ? 'text-gray-500 opacity-30 text-2xl' : 'text-2xl'}>
                  {getEmoji(status)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
