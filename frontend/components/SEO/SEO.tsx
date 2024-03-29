import React from 'react';
import Head from 'next/head';
import { server } from '../../config';

interface IProps {
  metaTitle: string;
  metaDescription: string;
  metaImage?: {
    title: string;
    description: string;
    date?: string;
    ttr?: string;
  };
  url?: string;
  article?: boolean;
  authorTwitterHandle?: string;
  canonicalUrl?: string;
  date?: string;
  addNoIndex?: boolean;
}

export default function SEO({
  metaTitle,
  metaDescription,
  metaImage = {
    title: '',
    description: '',
    date: '',
    ttr: '',
  },
  url = '',
  article = false,
  authorTwitterHandle = '@MrConerMurphy',
  canonicalUrl = '',
  date = '',
  addNoIndex = false,
}: IProps) {
  const ogImageParams = new URLSearchParams();

  ogImageParams.append('title', metaImage.title);
  ogImageParams.append('description', metaImage.description);
  if (metaImage.date) ogImageParams.append('date', metaImage.date);
  if (metaImage.ttr) ogImageParams.append('ttr', metaImage.ttr);

  const absoluteUrl = `${server}/${url}`;
  const image = `${server}/api/og?${ogImageParams.toString()}`;
  const title = metaTitle ? `${metaTitle} | Coner Murphy` : 'Coner Murphy';

  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={canonicalUrl || absoluteUrl} />

      <meta name="image" content={image} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={metaDescription} />

      <meta name="og:title" content={title} />
      <meta name="og:description" content={metaDescription} />
      <meta name="generator" content="Coner Murphy" />
      <meta name="og:type" content={article ? 'article' : 'website'} />
      <meta name="og:image" content={image} />
      <meta name="og:image:alt" content={metaTitle} />
      <meta name="og:url" content={absoluteUrl} />
      <meta property="og:site_name" content="Coner Murphy" />
      {date ? (
        <meta
          property="article:published_time"
          content={new Date(date).toISOString()}
        />
      ) : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={authorTwitterHandle} />
      <meta name="twitter:site" content={authorTwitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={metaTitle} />

      {addNoIndex ? <meta name="robots" content="noindex" /> : null}
    </Head>
  );
}
