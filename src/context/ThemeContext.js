import React, { useEffect, useState } from 'react';

const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [componentMounted, setComponentMounted] = useState(false);

  function setIsDarkMode(isDark) {
    window.localStorage.setItem('theme', isDark);
    setIsThemeDark(isDark);
  }

  const toggleThemeDark = () => {
    setIsDarkMode(!isThemeDark);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') === 'true';

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && localTheme === null) {
      setIsDarkMode(true);
    } else if (localTheme !== null) {
      setIsDarkMode(localTheme);
    } else {
      setIsDarkMode(false);
    }

    setComponentMounted(true);
  }, []);

  return <ThemeContext.Provider value={[isThemeDark, toggleThemeDark, componentMounted]}>{children}</ThemeContext.Provider>;
}

export default ThemeContext;
