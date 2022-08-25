import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useScrollToTop() {
  const { asPath } = useRouter();

  return useEffect(() => {
    if (asPath !== '/#contact') {
      window?.scrollTo(0, 0);
    } else {
      document.getElementById('contact')?.scrollIntoView();
    }
  }, [asPath]);
}
