import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Raleway, Karla, Inconsolata } from 'next/font/google';
import Footer from '../Footer/Footer';
import { pageTransition } from '../../constants';

interface IProps {
  children?: ReactNode;
}

const raleway = Raleway({ subsets: ['latin'], variable: '--raleway-font' });
const karla = Karla({ subsets: ['latin'], variable: '--karla-font' });
const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--inconsolata-font',
});

export default function Layout({ children }: IProps): JSX.Element {
  // This is needed to trigger the theme switch animation.
  useTheme();

  return (
    <div className="bg-background">
      <main
        className={`text-text font-body  ${raleway.variable} ${karla.variable} ${inconsolata.variable} scroll-smooth flex flex-col gap-24 pb-24 md:gap-64 md:pb-64`}
      >
        {children}
        <Footer />
      </main>
    </div>
  );
}
