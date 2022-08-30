import React from 'react';
import Link from 'next/link';
import NavBar from '../../NavBar/NavBar';
import NoScrollLink from '../../NoScrollLink/NoScrollLink';
import Socials from '../../Socials/Socials';
import { ThemeToggle } from '../components';
import Logo from '../../Logo/Logo';

export default function DesktopHeader(): JSX.Element {
  return (
    <div className="sticky top-0 z-20 hidden lg:block bg-primaryBg dark:bg-primaryBgDark px-4 sm:px-6 lg:px-9 2xl:px-0 drop-shadow-lg">
      <header className="max-w-[1440px] flex flex-row items-center justify-between h-20 md:px-0 m-auto">
        <div className="flex flex-row items-center gap-12">
          <NoScrollLink href="/" passHref>
            <a className="flex flex-row gap-4 items-center text-xl font-bold font-heading">
              <Logo classes="w-10 h-10" />
              <span>Coner Murphy</span>
            </a>
          </NoScrollLink>
          <NavBar />
          <Link href="/#contact" passHref>
            <a className="font-semibold bg-accent text-primaryTextDark px-4 py-2 rounded-sm">
              Hire Me
            </a>
          </Link>
        </div>
        <div className="flex gap-8">
          <ThemeToggle />
          <Socials compact />
        </div>
      </header>
    </div>
  );
}
