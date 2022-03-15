import React from 'react';
import NavBar from '../NavBar/NavBar';
import Socials from '../Socials/Socials';

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between h-[100px] px-106 border-b border-primaryBorder">
      <div className="flex flex-row items-center gap-12">
        <p className="text-32 font-bold">Coner Murphy</p>
        <NavBar />
      </div>
      <Socials isHeader />
    </header>
  );
}
