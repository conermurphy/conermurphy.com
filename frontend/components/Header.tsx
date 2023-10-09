import React, { useState } from 'react';
import Link from 'next/link';
import { Dialog } from '@headlessui/react';
import Logo from './Logo/Logo';
import { getIcon } from '../utils';
import { ICONS, NAVIGATION } from '../constants';
import Socials from './Socials/Socials';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background font-heading">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <Link href="/" className="w-12 h-12 flex items-center p-1.5">
          <span className="sr-only">Coner Murphy</span>
          <Logo />
        </Link>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-text/90"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            {getIcon({ icon: ICONS.JUSTIFY.name, size: '24px' })}
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {NAVIGATION.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-lg font-bold leading-6 text-text/90 border-b-2 border-transparent hover:border-brand border-solid w-max"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-60" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 drop-shadow-md">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="w-12 h-12 p-1.5 flex items-center"
            >
              <span className="sr-only">Coner Murphy</span>
              <Logo />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-text/90"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              {getIcon({ icon: ICONS.CLOSE.name, size: '24px' })}
            </button>
          </div>
          <div className="mt-6 flex flex-col gap-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6 px-3">
                {NAVIGATION.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block py-2 text-base font-semibold leading-7 text-text/90 border-transparent border-b-2 hover:border-brand border-solid w-max"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            <Socials />
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
