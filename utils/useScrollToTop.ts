import { useEffect } from 'react';

export default function useScrollToTop() {
  return useEffect(() => {
    window?.scrollTo(0, 0);
  }, []);
}
