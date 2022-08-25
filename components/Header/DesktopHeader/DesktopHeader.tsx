import React from 'react';
import Img from 'next/image';
import NavBar from '../../NavBar/NavBar';
import NoScrollLink from '../../NoScrollLink/NoScrollLink';
import Socials from '../../Socials/Socials';
import { ThemeToggle } from '../components';

export default function DesktopHeader(): JSX.Element {
  return (
    <div className="sticky top-0 z-20 hidden lg:block bg-primaryBg dark:bg-primaryBgDark">
      <header className="max-w-7xl flex flex-row items-center justify-between h-16 md:px-0 m-auto">
        <div className="flex flex-row items-center gap-12">
          <NoScrollLink href="/" passHref>
            <a className="flex flex-row gap-4 items-center text-xl font-bold font-heading">
              <div className="relative w-12 h-12">
                <Img
                  src="/standalone-icon.svg"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <span>Coner Murphy</span>
            </a>
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
