import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import NavBar from '../../NavBar/NavBar';
import Logo from '../../Logo/Logo';

export function processPathname(pathnames: string[]) {
  const targetPaths = ['blog', 'newsletter', 'technical-writing', 'contact'];

  if (!pathnames[0]) {
    return false;
  }

  if (targetPaths.includes(pathnames[0]) && parseInt(pathnames[1]) > 0) {
    return false;
  }

  if (targetPaths.includes(pathnames[0]) && !pathnames[1]) {
    return false;
  }

  return true;
}

export default function DesktopHeader(): JSX.Element {
  const pathname = usePathname();

  const splitPathname = pathname.split('/');
  splitPathname.shift();

  const isWhiteBg = processPathname(splitPathname);

  return (
    <div
      className={`relative hidden lg:block text-text w-full z-30 duration-300 transition-all ease-in-out overflow-hidden ${
        isWhiteBg ? 'bg-background' : 'bg-brand/40'
      }`}
    >
      <div className="w-full flex items-center justify-center z-30 relative">
        <header className="flex flex-row items-center justify-between p-8 w-full max-w-7xl">
          <Link href="/" className="h-12 w-12">
            <Logo />
          </Link>
          <NavBar />
        </header>
      </div>
      {!isWhiteBg ? (
        <Image src="/grain.png" alt="" fill priority className="!h-auto" />
      ) : null}
    </div>
  );
}
