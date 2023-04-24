import React from 'react';
import Socials from '../Socials/Socials';
import Logo from '../Logo/Logo';
import NavBar from '../NavBar/NavBar';

export default function Footer(): JSX.Element {
  return (
    <footer className="flex flex-col items-center gap-12">
      <div className="h-12 w-12">
        <Logo />
      </div>
      <NavBar />
      <Socials />
      <p className="text-sm lg:text-lg">
        © {new Date().getFullYear()} - Created by Coner Murphy. All Rights
        Reserved.
      </p>
    </footer>
  );
}
