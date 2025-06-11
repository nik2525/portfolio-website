import { Html, Head, Main, NextScript } from 'next/document';
import { asset, url } from '@/lib/path-utils'

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/portfolio-website' : '';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <base href={isProd ? `${basePath}/` : '/'} />
        <link rel="icon" href={asset('/favicon.ico')} />
        <link rel="icon" type="image/svg+xml" href={asset('/favicon.svg')} />
        <meta name="theme-color" content="#000000" />
        {/* Preload critical CSS */}
        <link rel="preload" href={asset('/_next/static/css/app/layout.css')} as="style" />
        <link rel="stylesheet" href={asset('/_next/static/css/app/layout.css')} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
