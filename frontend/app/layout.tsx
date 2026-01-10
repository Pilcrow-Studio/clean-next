import './styles/globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Viewport} from 'next'
import localFont from 'next/font/local'
import {draftMode} from 'next/headers'
import {Suspense} from 'react'
import {VisualEditing} from 'next-sanity/visual-editing'
import {SanityLive} from '@/sanity/lib/live'
import {handleError} from '@/app/client-utils'
import Header from '@/app/components/global/Header'
import Footer from '@/app/components/global/Footer'
import ClientToaster from './components/utils/ClientToaster'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const lars = localFont({
  src: [
    {
      path: './fonts/Lars-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Lars-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/Lars-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Lars-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
})

const ivar = localFont({
  src: [
    {
      path: './fonts/IvarText-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/IvarText-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-serif',
  display: 'swap',
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <html lang="en" className={`${lars.variable} ${ivar.variable}`}>
      <body suppressHydrationWarning>
        <Suspense>
        <Header />
          <div className="min-h-screen flex flex-col">
            {isDraftMode && (
              <>
                <VisualEditing />
              </>
            )}
            <SanityLive onError={handleError} />
            <ClientToaster />
            <main className="pt-24 page-wrapper">{children}</main>
          </div>
          <Footer />
        </Suspense>
        <SpeedInsights />
      </body>
    </html>
  )
}
