import Link from 'next/link';
import React from 'react';
import NavBar from '../../NavBar/NavBar';
import Socials from '../../Socials/Socials';

export default function DesktopHeader(): JSX.Element {
  return (
    <div className="sticky top-0 z-20 hidden lg:block">
      <header className="max-w-[1372px] flex flex-row items-center justify-between h-16 md:px-20 lg:px-106 bg-transparent m-auto">
        <div className="flex flex-row items-center gap-12">
          <Link href="/" passHref>
            <a className="text-2xl font-bold opacity-100">Coner Murphy</a>
          </Link>
          <NavBar />
        </div>
        <div className="hidden lg:block">
          <Socials compact />
        </div>
      </header>
    </div>
  );
}
