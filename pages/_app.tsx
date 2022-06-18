import '../styles/globals.css';
import '../styles/cobalt2.prism.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';
import { ThemeProvider } from 'next-themes';
import { Layout } from '../components';
import { DesktopHeader, MobileHeader } from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    Fathom.load('FBDCDFEY', {
      includedDomains: ['conermurphy.com, www.conermurphy.com'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

  return (
    <ThemeProvider attribute="class">
      <DesktopHeader />
      <MobileHeader />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
