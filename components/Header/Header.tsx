import Link from 'next/link';
import React from 'react';
import NavBar from '../NavBar/NavBar';

export default function Header(): JSX.Element {
  return (
    <div className="sticky top-0 z-20">
      <header className="flex flex-row items-center justify-between h-16 px-106 bg-transparent">
        <div className="flex flex-row items-center gap-12">
          <Link href="/" passHref>
            <a className="text-2xl font-bold opacity-100">Coner Murphy</a>
          </Link>
          <NavBar />
        </div>
      </header>
    </div>
  );
}
