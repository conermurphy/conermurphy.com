import React, { useEffect, useState } from 'react';

const NavThemeContext = React.createContext();

export function NavThemeProvider({ children }) {
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [componentMounted, setComponentMounted] = useState(false);

  const toggleThemeDark = () => {
    if (isThemeDark) {
      window.localStorage.setItem('theme', 'light');
      setIsThemeDark(false);
    } else {
      window.localStorage.setItem('theme', 'dark');
      setIsThemeDark(true);
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');

    if (localTheme) {
      if (localTheme === 'light') {
        setIsThemeDark(false);
      }
      if (localTheme === 'dark') {
        setIsThemeDark(true);
      }
    } else {
      setIsThemeDark(false);
      window.localStorage.setItem('theme', 'light');
    }
    setComponentMounted(true);
  }, []);

  return <NavThemeContext.Provider value={[isThemeDark, toggleThemeDark, componentMounted]}>{children}</NavThemeContext.Provider>;
}

export default NavThemeContext;
