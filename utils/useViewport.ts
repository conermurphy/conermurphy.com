import { useState, useEffect } from 'react';

function useMediaCreator({ size }: { size: string }) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia(
      `(min-width: ${size})`
    );

    if (matches !== mediaQuery.matches) {
      setMatches(mediaQuery.matches);
    }

    const listener = () => {
      setMatches(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', listener, { once: true });

    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, [matches, size]);

  return matches;
}

export default function useViewport() {
  return {
    sm: useMediaCreator({ size: '640px' }),
    md: useMediaCreator({ size: '768px' }),
    lg: useMediaCreator({ size: '1024px' }),
    xl: useMediaCreator({ size: '1280px' }),
    xxl: useMediaCreator({ size: '1536px' }),
  };
}
