import '../styles/globals.css';
import '../styles/cobalt2.prism.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import { Footer } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <main className="bg-background text-text font-body scroll-smooth flex flex-col gap-24 md:gap-48 pb-24 md:pb-48">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
