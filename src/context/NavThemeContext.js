import React, { useEffect, useState } from 'react';

const NavThemeContext = React.createContext();

export function NavThemeProvider({ children }) {
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

  return <NavThemeContext.Provider value={[isThemeDark, toggleThemeDark, componentMounted]}>{children}</NavThemeContext.Provider>;
}

export default NavThemeContext;
