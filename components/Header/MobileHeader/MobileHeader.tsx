import Link from 'next/link';
import React, { useState } from 'react';
import { ICONS } from '../../../constants';
import { getIcon } from '../../../utils';
import { MobileNavMenu } from './components';

export default function MobileHeader(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="sticky top-0 z-20 block md:hidden">
      <header className="m-auto">
        <div className="flex flex-row items-center justify-between h-16 bg-transparent px-6">
          <Link href="/" passHref>
            <a className="font-bold opacity-100">Coner Murphy</a>
          </Link>
          <button
            type="button"
            onClick={() => {
              return setIsOpen(!isOpen);
            }}
          >
            {!isOpen
              ? getIcon({ icon: ICONS.JUSTIFY.name, size: '20px' })
              : getIcon({ icon: ICONS.CLOSE.name, size: '20px' })}
          </button>
        </div>
        <MobileNavMenu isOpen={isOpen} />
      </header>
    </div>
  );
}
