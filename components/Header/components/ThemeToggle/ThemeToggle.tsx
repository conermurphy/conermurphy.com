import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ICONS } from '../../../../constants';
import { getIcon } from '../../../../utils';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-row items-center border-primaryBorder dark:border-primaryBorderDark border-r-2">
      <motion.button
        onClick={() => {
          if (theme === 'light') {
            return setTheme('dark');
          }
          return setTheme('light');
        }}
        type="button"
        whileTap={{ rotate: 360, scale: 0.8 }}
        className="opacity-75 px-6"
      >
        {theme === 'light'
          ? getIcon({ icon: ICONS.MOON.name, size: '20px' })
          : getIcon({ icon: ICONS.SUN.name, size: '20px' })}
      </motion.button>
    </div>
  );
}
