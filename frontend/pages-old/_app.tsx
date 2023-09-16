import '../styles/globals.css';
import '../styles/cobalt2.prism.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';
import { MotionConfig } from 'framer-motion';
import { Layout } from '../components';
import { DesktopHeader, MobileHeader } from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <MotionConfig reducedMotion="user">
      <DesktopHeader />
      <MobileHeader />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MotionConfig>
  );
}

export default MyApp;
