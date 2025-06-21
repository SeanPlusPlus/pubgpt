// components/SiteFooter.tsx

export function SiteFooter() {
  return (
    <footer className="text-xs text-muted-foreground pb-4 text-center">
      Built with ❤️ by{' '}
      <a
        href="https://seanplusplus.com/"
        className="underline hover:text-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        @SeanPlusPlus
      </a>
    </footer>
  )
}
