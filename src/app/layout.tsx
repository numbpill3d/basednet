import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import './globals.css'
import './win98.css'
import Providers from '../components/Providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
  title: 'Basednet - The Next-Gen Indie Web Platform',
  description: 'Create, customize, and host your personal website with P2P hosting, webrings, and AI-powered discovery on Basednet.',
  keywords: ['indie web', 'personal website', 'webring', 'P2P hosting', 'IPFS', 'web3'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="win98-desktop">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
