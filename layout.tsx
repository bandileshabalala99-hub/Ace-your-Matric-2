import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope, Sora } from 'next/font/google'
import { AppShell } from '@/components/app-shell'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })

export const metadata: Metadata = {
  title: 'Ace Your Matric — NSC Past Papers 2016-2024 + Explain Like I’m 5',
  description:
    'Matric High Flyers: official DBE NSC past papers and memos for 19 subjects (2016-2024). View online once, download to your phone and study offline with no data.',
  generator: 'v0.app',
  icons: {
    icon: '/icon.jpg',
    apple: '/icon.jpg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b1633',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-ZA" className={`${manrope.variable} ${sora.variable} bg-background`}>
      <body className="antialiased">
        <AppShell>{children}</AppShell>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
