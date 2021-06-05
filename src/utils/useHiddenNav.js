import { useViewportScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

export function useHiddenNav() {
  const [navHidden, setNavHidden] = useState(true);

  const { scrollY } = useViewportScroll();

  useEffect(
    () =>
      scrollY.onChange(() => {
        if (scrollY?.current < scrollY?.prev) {
          setNavHidden(false);
        } else {
          setNavHidden(true);
        }
      }),
    [scrollY]
  );

  return [navHidden];
}
