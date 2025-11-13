import type { Metadata } from 'next'
import React from 'react'
// Google Fonts removed for better performance and offline builds
// Using system fonts instead
import './globals.css'
import './nekoweb.css'
import Providers from '@/components/Providers'

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
    <html lang="en">
      <body className="win98-desktop">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
