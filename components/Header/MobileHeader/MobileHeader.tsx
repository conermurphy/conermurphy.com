import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ICONS } from '../../../constants';
import { getIcon, useOutsideClick } from '../../../utils';
import NoScrollLink from '../../NoScrollLink/NoScrollLink';
import { MobileNavMenu } from './components';

export default function MobileHeader(): JSX.Element {
  const { asPath } = useRouter();
  const headerRef = useRef(null);
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

  useOutsideClick({ ref: headerRef, callback: handleIsOpen });

  return (
    <div className="sticky top-0 z-20 block lg:hidden">
      <header className="m-auto" ref={headerRef}>
        <div className="flex flex-row items-center justify-between h-16 bg-transparent px-6 sm:px-20">
          <NoScrollLink href="/" passHref>
            <a className="font-bold opacity-100">Coner Murphy</a>
          </NoScrollLink>
          <button
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={() => {
              return setIsOpen(!isOpen);
            }}
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
