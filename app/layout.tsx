import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { FacebookPixel } from '@/components/facebook-pixel'
import { Suspense } from 'react'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700", "800", "900"], variable: "--font-poppins" });

export const viewport: Viewport = {
  themeColor: '#4a7c2e',
}

export const metadata: Metadata = {
  title: 'Perez Landscaping | Expert Hardscape Design & Installation',
  description: 'Transform your outdoor living space with our expert hardscape design and installation services. Turf, pavers, patios, and full backyard remodels.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_inter.variable} ${_poppins.variable} font-sans antialiased`}>
        {children}
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
