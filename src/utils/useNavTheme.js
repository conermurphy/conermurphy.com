import { useContext, useEffect } from 'react';
import NavThemeContext from '../context/NavThemeContext';

export default function useNavTheme(newTheme) {
  const [theme, setTheme] = useContext(NavThemeContext);
  useEffect(() => {
    setTheme(newTheme);
  }, []);
}
