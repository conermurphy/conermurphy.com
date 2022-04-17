import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ICONS } from '../../../constants';
import { getIcon } from '../../../utils';
import { MobileNavMenu } from './components';

export default function MobileHeader(): JSX.Element {
  const { asPath } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen((i) => {
      if (i) {
        return !i;
      }
      return i;
    });
  }, [asPath]);

  return (
    <div className="sticky top-0 z-20 block lg:hidden">
      <header className="m-auto">
        <div className="flex flex-row items-center justify-between h-16 bg-transparent px-6 sm:px-20">
          <Link href="/" passHref>
            <a className="font-bold opacity-100">Coner Murphy</a>
          </Link>
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
