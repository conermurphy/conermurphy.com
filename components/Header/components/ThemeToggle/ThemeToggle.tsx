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
    return (
      <div className="h-5 pr-11 border-r-2 border-primaryBorder dark:border-primaryBorderDark" />
    );
  }

  return (
    <div className="flex flex-row items-center border-primaryBorder dark:border-primaryBorderDark border-r-2">
      <button
        onClick={() => {
          if (theme === 'light') {
            return setTheme('dark');
          }
          return setTheme('light');
        }}
        type="button"
        className="opacity-75 pr-6"
      >
        {theme === 'light'
          ? getIcon({ icon: ICONS.MOON.name, size: '20px' })
          : getIcon({ icon: ICONS.SUN.name, size: '20px' })}
      </button>
    </div>
  );
}
