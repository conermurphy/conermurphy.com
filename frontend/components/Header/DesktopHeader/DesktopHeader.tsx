import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavBar from '../../NavBar/NavBar';
import NoScrollLink from '../../NoScrollLink/NoScrollLink';
import Logo from '../../Logo/Logo';

export default function DesktopHeader(): JSX.Element {
  const [showNav, setShowNav] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    const valueToDivide = ['/blog', '/newsletter', '/contact'].includes(
      pathname
    )
      ? 6
      : 2;

    const onScroll = () => {
      if (window.scrollY > window.innerHeight / valueToDivide) {
        setShowNav(true);
        return;
      }
      setShowNav(false);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 hidden lg:block bg-background text-text w-full z-30 duration-300 transition-all ease-in-out ${
        showNav ? 'translate-y-0' : '-translate-y-40'
      }`}
    >
      <div className="w-full flex items-center justify-center">
        <header className="flex flex-row items-center justify-between p-8 w-full max-w-7xl">
          <NoScrollLink href="/" className="h-12 w-12">
            <Logo />
          </NoScrollLink>
          <NavBar />
        </header>
      </div>
    </div>
  );
}
