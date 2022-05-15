import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
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
    <button
      onClick={() => {
        if (theme === 'light') {
          return setTheme('dark');
        }
        return setTheme('light');
      }}
      type="button"
      className="opacity-75 border-primaryBorder dark:border-primaryBorderDark border-r-2 px-6"
    >
      {theme === 'light'
        ? getIcon({ icon: ICONS.MOON.name, size: '20px' })
        : getIcon({ icon: ICONS.SUN.name, size: '20px' })}
    </button>
  );
}
