'use client'

export function SiteNav() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur border-b border-border h-16">
      <div className="max-w-screen-lg mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="PubGPT logo" className="h-12 w-auto" />
        </a>
        <div className="flex gap-6">
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
