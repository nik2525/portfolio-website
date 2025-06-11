import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? '/portfolio-website' : '';

  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href={`${basePath}/favicon.ico`} />
        <link rel="icon" type="image/svg+xml" href={`${basePath}/favicon.svg`} />
        <meta name="theme-color" content="#000000" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
