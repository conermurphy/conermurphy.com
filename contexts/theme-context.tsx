import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { THEMES } from '../constants';

const ThemeContext = createContext<
  | {
      theme: string | undefined;
      setColourTheme: (colourTheme: 'dark' | 'light') => void;
    }
  | undefined
>(undefined);

function getInitialColorMode() {
  if (typeof window !== 'undefined') {
    const persistedColorPreference = window.localStorage.getItem('color-theme');
    const hasPersistedPreference = typeof persistedColorPreference === 'string';

    // If the user has explicitly chosen light or dark, let's use it. Otherwise, this value will be null.
    if (hasPersistedPreference) {
      return persistedColorPreference;
    }
    // If they haven't been explicit, let's check the media query
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';

    if (hasMediaQueryPreference) {
      return mql.matches ? 'dark' : 'light';
    }
    // If they are using a browser/OS that doesn't support color themes, let's default to 'light'.
    return 'light';
  }
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(getInitialColorMode);

  const setColourTheme = useCallback((colourTheme: 'dark' | 'light') => {
    setTheme(colourTheme);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('color-theme', colourTheme);

      const root = document.documentElement;

      const values = Object.entries(THEMES[colourTheme]);

      values.forEach(([key, val]) => {
        root.style.setProperty(key, val);
      });

      root.style.setProperty('--initial-color-mode', colourTheme);
    }
  }, []);

  const value = useMemo(() => {
    return {
      theme,
      setColourTheme,
    };
  }, [theme, setColourTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

export { ThemeProvider, useTheme };
