import { Metadata } from 'next';
import { server } from '../config';

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

export default function metadataGenerator({
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

  const metadata: Metadata = {
    title,
    description: metaDescription,
    viewport: 'initial-scale=1.0, width=device-width',
    generator: 'Coner Murphy',
    alternates: {
      canonical: canonicalUrl || absoluteUrl,
    },
    icons: [
      {
        url: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
        rel: 'shortcut icon',
      },
      {
        url: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
        rel: 'apple-touch-icon',
      },
    ],
    manifest: '/manifest.webmanifest',
    themeColor: '#222225',
    appleWebApp: {
      title: 'Coner Murphy',
      capable: true,
    },
    applicationName: 'Coner Murphy',
    other: {
      'Content-Type': 'text/html; charset=UTF-8',
      charSet: 'UTF-8',
      'mobile-web-app-capable': 'yes',
      'msapplication-starturl': '/',
    },
    openGraph: {
      locale: 'en_GB',
      title,
      description: metaDescription,
      type: article ? 'article' : 'website',
      url: absoluteUrl,
      images: {
        url: image,
        alt: metaTitle,
      },
      siteName: 'Coner Murphy',
      ...(date && {
        article: {
          publishedTime: new Date(date).toISOString(),
        },
      }),
    },
    twitter: {
      creator: authorTwitterHandle,
      site: authorTwitterHandle,
      card: 'summary_large_image',
      description: metaDescription,
      title,
      images: [
        {
          url: image,
          alt: metaTitle,
        },
      ],
    },
    ...(addNoIndex && {
      robots: 'noindex',
    }),
  };

  return metadata;
}
