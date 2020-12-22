import React, { useState } from 'react';

const NavThemeContext = React.createContext();

export function NavThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  return <NavThemeContext.Provider value={[theme, setTheme]}>{children}</NavThemeContext.Provider>;
}

export default NavThemeContext;
