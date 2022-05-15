import React from 'react';
import NavBar from '../../../../NavBar/NavBar';
import Newsletter from '../../../../Newsletter/Newsleter';
import Socials from '../../../../Socials/Socials';
import { ThemeToggle } from '../../../components';

interface IProps {
  isOpen: boolean;
}

export default function MobileNavMenu({ isOpen }: IProps): JSX.Element | null {
  return isOpen ? (
    <div className="fixed top-16 w-full border-b border-primaryBorder dark:border-primaryBorderDark">
      <div className="p-6 sm:px-20 bg-secondaryBg dark:bg-secondaryBgDark">
        <NavBar isMobile />
      </div>
      <div className="p-6 sm:px-20 bg-primaryBg dark:bg-primaryBgDark">
        <Newsletter />
        <div className="flex gap-8 my-6">
          <ThemeToggle />
          <Socials compact />
        </div>
      </div>
    </div>
  ) : null;
}
