function getInitialColorMode() {
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

function setTheme() {
  const THEMES = {
    light: {
      '--primaryBackground': 'rgba(248, 248, 250,1)',
      '--secondaryBackground': 'rgb(255,255,255,1)',
      '--primaryText': 'rgba(17,24,39,1)',
      '--accentBackground': 'rgba(249, 115, 22, .5)',
      '--accent': 'rgb(249, 115, 22)',
      '--primaryBorder': 'hsla(221, 39%, 11%, 0.25)',
    },
    dark: {
      '--primaryBackground': 'rgba(17, 24, 39,1)',
      '--secondaryBackground': 'rgb(12,18,29,1)',
      '--primaryText': 'rgba(248, 248, 250,1)',
      '--primaryTextDimmed': 'rgba(248, 248, 250,.75)',
      '--accentBackground': 'rgba(249, 115, 22, .5)',
      '--accent': 'rgb(249, 115, 22)',
      '--primaryBorder': 'hsla(221, 40%, 96%, 0.25)',
    },
  };
  
  const theme = getInitialColorMode();

  const root = document.documentElement;
  const values = Object.entries(THEMES[theme]);

  window.localStorage.setItem('color-theme', theme);

  values.forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });

  root.style.setProperty('--initial-color-mode', theme);
}

setTheme();
