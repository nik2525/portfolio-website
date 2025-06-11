import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Niko Angelo Lubao | Portfolio',
  description: 'Personal portfolio of Niko Angelo Lubao - Web Developer & Designer',
  generator: 'Next.js',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '#ffffff',
  openGraph: {
    title: 'Niko Angelo Lubao | Portfolio',
    description: 'Personal portfolio of Niko Angelo Lubao - Web Developer & Designer',
    url: 'https://your-portfolio-url.com',
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
