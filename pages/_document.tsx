import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-GB">
        <Head>
          <link rel="shortcut icon" href="/favicon.png" sizes="any" />
          <link rel="apple-touch-icon" href="/favicon.png" />
          <link rel="manifest" href="/manifest.webmanifest" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="Coner Murphy" />
          <meta name="apple-mobile-web-app-title" content="Coner Murphy" />
          <meta name="msapplication-starturl" content="/" />
          <meta name="theme-color" content="#222225" />
          <meta charSet="UTF-8" />
          <meta name="Content-Type" content="text/html; charset=UTF-8" />
          <meta property="og:locale" content="en-GB" />
          <meta lang="en-GB" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&family=Inconsolata:wght@400;800&family=Nunito:ital,wght@0,400;0,700;1,400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
