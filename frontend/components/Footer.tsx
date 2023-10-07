import React from 'react';
import Socials from './Socials/Socials';
import Logo from './Logo/Logo';
import { NAVIGATION } from '../constants';

export default function Footer(): JSX.Element {
  return (
    <footer className="flex flex-col items-center gap-12 text-text/75 w-full">
      <div className="h-12 w-12">
        <Logo />
      </div>
      <nav
        className="grid grid-cols-2 justify-items-center sm:flex sm:justify-center sm:space-x-12 w-full"
        aria-label="Footer"
      >
        {NAVIGATION.map((item) => (
          <div key={item.name} className="pb-6">
            <a
              href={item.href}
              className="leading-6 border-transparent border-b-2 hover:border-brand border-solid w-max font-semibold"
            >
              {item.name}
            </a>
          </div>
        ))}
      </nav>
      <Socials />
      <p className="max-w-xs md:max-w-lg text-center">
        © {new Date().getFullYear()} - Created by Coner Murphy. All Rights
        Reserved.
      </p>
    </footer>
  );
}
