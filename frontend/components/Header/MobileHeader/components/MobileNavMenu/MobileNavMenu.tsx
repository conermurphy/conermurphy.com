import React from 'react';
import NavBar from '../../../../NavBar/NavBar';
import Socials from '../../../../Socials/Socials';
import { ThemeToggle } from '../../../components';

interface IProps {
  isOpen: boolean;
}

export default function MobileNavMenu({ isOpen }: IProps): JSX.Element | null {
  return (
    <div
      className={`fixed w-full h-full bg-primaryBg dark:bg-primaryBgDark transition-all duration-300 ease-in-out top-20 ${
        isOpen ? 'opacity-100 left-0' : 'opacity-0 -left-full'
      }`}
    >
      <div className="p-6 sm:px-12 bg-primaryBg dark:bg-primaryBgDark text-2xl lg:text-base">
        <NavBar isMobile />
      </div>
      <div className="p-6 sm:px-12 bg-primaryBg dark:bg-primaryBgDark">
        <div className="flex gap-8 my-6">
          <ThemeToggle />
          <Socials />
        </div>
      </div>
    </div>
  );
}
