import { useState, useEffect } from 'react';

export default function UseMobileChecker() {
  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1200px)');

    function handleMobileChange(e) {
      if (e.matches) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    mediaQuery.addEventListener('change', handleMobileChange);

    handleMobileChange(mediaQuery);
  }, []);

  return [isMobile];
}
