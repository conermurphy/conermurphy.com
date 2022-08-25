import React from 'react';
import NavBar from '../../../../NavBar/NavBar';
import Socials from '../../../../Socials/Socials';
import { ThemeToggle } from '../../../components';

interface IProps {
  isOpen: boolean;
}

export default function MobileNavMenu({ isOpen }: IProps): JSX.Element | null {
  return isOpen ? (
    <div className="fixed top-16 w-full border-b border-primaryBorder dark:border-primaryBorderDark">
      <div className="p-6 sm:px-20 bg-primaryBg dark:bg-primaryBgDark">
        <NavBar isMobile />
      </div>
      <div className="p-6 sm:px-20 bg-primaryBg dark:bg-primaryBgDark">
        <div className="flex gap-8 my-6">
          <ThemeToggle />
          <Socials compact />
        </div>
      </div>
    </div>
  ) : null;
}
