import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ICONS } from '../../../constants';
import { getIcon, useOutsideClick } from '../../../utils';
import NoScrollLink from '../../NoScrollLink/NoScrollLink';
import { MobileNavMenu } from './components';
import Logo from '../../Logo/Logo';

export default function MobileHeader(): JSX.Element {
  const { asPath, events, pathname } = useRouter();
  const headerRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const valueToDivide = ['/blog', '/newsletter', '/contact'].includes(
      pathname
    )
      ? 6
      : 2;

    const onScroll = () => {
      if (window.scrollY > window.innerHeight / valueToDivide) {
        setShowNav(true);
        return;
      }
      setShowNav(false);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleIsOpen = useCallback(() => {
    setIsOpen((i) => {
      if (i) {
        return !i;
      }
      return i;
    });
  }, []);

  useEffect(() => {
    handleIsOpen();
  }, [asPath, handleIsOpen]);

  // This is used to close the menu on a route change, including if you goto the same page.
  useEffect(() => {
    events.on('routeChangeStart', handleIsOpen);
  }, []);

  useOutsideClick({ ref: headerRef, callback: handleIsOpen });

  return (
    <div
      className={`fixed top-0 block lg:hidden bg-background text-text w-full z-30 duration-300 transition-all ease-in-out  ${
        !isOpen ? 'drop-shadow-lg' : ''
      } ${showNav ? 'translate-y-0' : '-translate-y-40'}`}
    >
      <header className="m-auto" ref={headerRef}>
        <div className="flex flex-row items-center justify-between h-20 bg-background p-6 sm:px-12">
          <NoScrollLink
            href="/"
            passHref
            className="font-bold opacity-100 text-xl"
          >
            <div className="w-8 h-8">
              <Logo />
            </div>
          </NoScrollLink>
          <button
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsOpen(!isOpen)}
            className="text-text"
          >
            {!isOpen
              ? getIcon({ icon: ICONS.JUSTIFY.name, size: '20px' })
              : getIcon({ icon: ICONS.CLOSE.name, size: '24px' })}
          </button>
        </div>
        <MobileNavMenu isOpen={isOpen} />
      </header>
    </div>
  );
}
