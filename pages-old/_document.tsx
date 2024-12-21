import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-GB">
        <Head>
          <link rel="shortcut icon" href="/favicon.png" sizes="any" />
          <link rel="apple-touch-icon" href="/favicon.png" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS blog feed for conermurphy.com"
            href="/rss/blog.xml"
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="Coner Murphy" />
          <meta name="apple-mobile-web-app-title" content="Coner Murphy" />
          <meta name="msapplication-starturl" content="/" />
          <meta name="theme-color" content="#222225" />
        </Head>
        <body className="bg-background">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
