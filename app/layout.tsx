import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const basePath = process.env.NODE_ENV === 'production' ? '/portfolio-website' : '';

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
  metadataBase: new URL(process.env.NODE_ENV === 'production' 
    ? 'https://nik2525.github.io/portfolio-website' 
    : 'http://localhost:3000'),
  icons: {
    icon: [
      { url: `${basePath}/favicon.svg`, type: 'image/svg+xml' },
      { url: `${basePath}/favicon.ico`, sizes: 'any' },
    ],
    apple: [
      { url: `${basePath}/favicon.svg`, type: 'image/svg+xml' },
    ],
  },
  manifest: `${basePath}/site.webmanifest`,
  openGraph: {
    title: 'Niko Angelo Lubao | Portfolio',
    description: 'Personal portfolio of Niko Angelo Lubao - Web Developer & Designer',
    url: 'https://nik2525.github.io/portfolio-website',
    siteName: 'Niko Angelo Lubao',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Niko Angelo Lubao | Portfolio',
    description: 'Personal portfolio of Niko Angelo Lubao - Web Developer & Designer',
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
