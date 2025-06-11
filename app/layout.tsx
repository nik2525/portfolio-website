import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { asset, url } from '@/lib/path-utils'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'Niko Angelo Lubao | Portfolio',
  description: 'Personal portfolio of Niko Angelo Lubao - Web Developer & Designer',
  generator: 'Next.js',
  metadataBase: new URL(url()),
  icons: {
    icon: [
      { url: asset('/favicon.svg'), type: 'image/svg+xml' },
      { url: asset('/favicon.ico'), sizes: 'any' },
    ],
    apple: [
      { url: asset('/favicon.svg'), type: 'image/svg+xml' },
    ],
  },
  manifest: asset('/site.webmanifest'),
  openGraph: {
    title: 'Niko Angelo Lubao | Portfolio',
    description: 'Personal portfolio of Niko Angelo Lubao - Web Developer & Designer',
    url: 'https://nik2525.github.io/portfolio-website',
    siteName: 'Niko Angelo Lubao',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: asset('/images/og-image.jpg'),
        width: 1200,
        height: 630,
        alt: 'Niko Angelo Lubao Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Niko Angelo Lubao | Portfolio',
    description: 'Personal portfolio of Niko Angelo Lubao - Web Developer & Designer',
    images: [asset('/images/og-image.jpg')],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
