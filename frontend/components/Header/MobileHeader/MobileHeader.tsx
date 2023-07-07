import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ICONS } from '../../../constants';
import { getIcon, useOutsideClick } from '../../../utils';
import { MobileNavMenu } from './components';
import Logo from '../../Logo/Logo';
import { processPathname } from '../DesktopHeader/DesktopHeader';

export default function MobileHeader(): JSX.Element {
  const { asPath, events } = useRouter();
  const pathname = usePathname();
  const headerRef = useRef(null);

  const splitPathname = pathname.split('/');
  splitPathname.shift();

  const isWhiteBg = processPathname(splitPathname);

  const [isOpen, setIsOpen] = useState(false);

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
      className={`relatove block lg:hidden text-text w-full z-30 duration-300 transition-all ease-in-out overflow-hidden ${
        isWhiteBg || isOpen ? 'bg-background' : 'bg-brand/40'
      }`}
    >
      <header className="relative m-auto z-30" ref={headerRef}>
        <div className="flex flex-row items-center justify-between h-20  p-6 sm:px-12 z-30">
          <Link href="/" passHref className="font-bold opacity-100 text-xl">
            <div className="w-8 h-8">
              <Logo />
            </div>
          </Link>
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
      {!isWhiteBg && !isOpen ? (
        <Image src="/grain.png" alt="" fill priority className="!h-auto" />
      ) : null}
    </div>
  );
}
