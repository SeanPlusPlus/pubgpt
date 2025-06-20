'use client'

export function SiteNav() {
  return (
    <nav className="row-start-1 w-full text-sm">
      <div className="max-w-screen-lg mx-auto px-4 flex gap-8">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/about" className="hover:underline">
          About
        </a>
      </div>
    </nav>
  )
}
