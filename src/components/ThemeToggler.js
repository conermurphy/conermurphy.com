import React, { useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import ThemeContext from '../context/ThemeContext';

export function ThemeToggler() {
  const [isThemeDark, toggleThemeDark] = useContext(ThemeContext);

  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {isThemeDark ? (
        <motion.button
          type="button"
          onClick={() => toggleThemeDark()}
          className="buttonToggle"
          key="toggleLightMode"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          aria-label="Toggle Light Mode"
        >
          <FaSun />
        </motion.button>
      ) : (
        <motion.button
          type="button"
          onClick={() => toggleThemeDark()}
          className="buttonToggle"
          key="toggleDarkMode"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          aria-label="Toggle Dark Mode"
        >
          <FaMoon />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
