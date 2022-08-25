import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Footer from '../Footer/Footer';
import { pageTransition } from '../../constants';

interface IProps {
  children?: ReactNode;
}

export default function Layout({ children }: IProps): JSX.Element {
  // This is needed to trigger the theme switch animation.
  useTheme();

  return (
    <div className="bg-primaryBg dark:bg-primaryBgDark">
      <AnimatePresence exitBeforeEnter initial={false}>
        <motion.div
          key={Math.random()}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
          transition={{ type: 'ease', duration: 0.2 }}
        >
          <main className="text-primaryText dark:text-primaryTextDark">
            {children}
            <Footer />
          </main>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
