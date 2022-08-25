import React from 'react';
import NavBar from '../NavBar/NavBar';
import Socials from '../Socials/Socials';

export default function Footer(): JSX.Element {
  return (
    <div className="flex flex-col items-center py-10 md:pt-16 md:pb-11">
      <footer className="lg:max-w-7xl w-full px-6 md:px-0 border-t-4 pt-5 md:pt-16 border-primaryBorder dark:border-primaryBorderDark">
        <h2 className="text-xl lg:text-2xl mb-3">Coner Murphy</h2>
        <NavBar />
        <div className="flex flex-col gap-y-3 justify-between pt-9 md:flex-row">
          <p className="text-sm lg:text-base opacity-75">
            © {new Date().getFullYear()} - Designed and developed by Coner
            Murphy. All Rights Reserved.
          </p>
          <Socials />
        </div>
      </footer>
    </div>
  );
}
