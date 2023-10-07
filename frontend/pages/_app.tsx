import '../styles/globals.css';
import '../styles/cobalt2.prism.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';
import { Raleway, Karla, Inconsolata } from 'next/font/google';
import Header from '../components/Header';
import { Footer } from '../components';

const raleway = Raleway({ subsets: ['latin'], variable: '--raleway-font' });
const karla = Karla({ subsets: ['latin'], variable: '--karla-font' });
const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--inconsolata-font',
});

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
    <div
      className={`${raleway.variable} ${karla.variable} ${inconsolata.variable}`}
    >
      <Header />
      <div className="bg-background">
        <main className="text-text font-body scroll-smooth flex flex-col gap-24 pb-24 md:gap-64 md:pb-64">
          <Component {...pageProps} />
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default MyApp;
