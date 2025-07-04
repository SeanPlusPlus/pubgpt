import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// === Constants to avoid repetition ===
const SITE_TITLE = 'PubGPT'
const SITE_DESCRIPTION = 'An LLM-powered pub quiz trivia game.'
const SITE_URL = 'https://pubgpt.vercel.app'
const OG_IMAGE_URL = 'https://pubgpt.vercel.app/logo.png'
const OG_IMAGE_ALT = 'PubGPT Logo'
const OG_IMAGE_WIDTH = 512
const OG_IMAGE_HEIGHT = 512

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    images: [
      {
        url: OG_IMAGE_URL,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: OG_IMAGE_ALT,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-muted min-h-screen font-[family-name:var(--font-geist-sans)]`}
      >
        {children}
      </body>
    </html>
  )
}
