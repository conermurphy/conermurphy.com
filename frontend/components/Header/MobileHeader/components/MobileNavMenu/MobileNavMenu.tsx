import React from 'react';
import NavBar from '../../../../NavBar/NavBar';
import Socials from '../../../../Socials/Socials';

interface IProps {
  isOpen: boolean;
}

export default function MobileNavMenu({ isOpen }: IProps): JSX.Element | null {
  return (
    <div
      className={`fixed w-full h-full transition-all duration-300 ease-in-out top-20 drop-shadow-lg ${
        isOpen ? 'opacity-100 left-0' : 'opacity-0 -left-full'
      }`}
    >
      <div className="p-6 sm:px-12 bg-background text-2xl lg:text-base">
        <NavBar isMobile />
      </div>
      <div className="p-6 sm:px-12 bg-background">
        <div className="flex gap-8 my-6">
          <Socials />
        </div>
      </div>
    </div>
  );
}
