import React from 'react';
import NavBar from '../../NavBar/NavBar';
import NoScrollLink from '../../NoScrollLink/NoScrollLink';
import Logo from '../../Logo/Logo';

export default function DesktopHeader(): JSX.Element {
  return (
    <div className="fixed top-0 z-20 hidden lg:block bg-background text-text w-full">
      <div className="w-full flex items-center justify-center">
        <header className="flex flex-row items-center justify-between py-8 w-full max-w-7xl">
          <NoScrollLink href="/" className="h-12 w-12">
            <Logo />
          </NoScrollLink>
          <NavBar />
        </header>
      </div>
    </div>
  );
}
