'use client'

export function SiteNav() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur border-b border-border">
      <div className="max-w-screen-lg mx-auto px-6 h-10 flex items-center justify-between">
        <a
          href="/"
          className="text-lg font-bold text-gray-800 hover:text-primary transition-colors"
        >
          PubGPT
        </a>
        <div className="flex gap-4">
          <a href="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Home
          </a>
          <a
            href="/about"
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            About
          </a>
        </div>
      </div>
    </nav>
  )
}
