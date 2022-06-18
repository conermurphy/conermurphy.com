import React from 'react';
import NavBar from '../../NavBar/NavBar';
import NoScrollLink from '../../NoScrollLink/NoScrollLink';
import Socials from '../../Socials/Socials';
import { ThemeToggle } from '../components';

export default function DesktopHeader(): JSX.Element {
  return (
    <div className="sticky top-0 z-20 hidden lg:block">
      <header className="max-w-[1372px] flex flex-row items-center justify-between h-16 md:px-20 bg-transparent m-auto">
        <div className="flex flex-row items-center gap-12">
          <NoScrollLink href="/" passHref>
            <a className="text-2xl font-bold opacity-100">Coner Murphy</a>
          </NoScrollLink>
          <NavBar />
        </div>
        <div className="flex gap-8">
          <ThemeToggle />
          <Socials compact />
        </div>
      </header>
    </div>
  );
}
