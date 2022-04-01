import React from 'react';
import NavBar from '../NavBar/NavBar';
import Newsletter from '../Newsletter/Newsleter';
import Socials from '../Socials/Socials';

export default function Footer(): JSX.Element {
  return (
    <div className="flex flex-col items-center py-10 md:pt-72 md:pb-11 bg-offWhite">
      <footer className="max-w-[272px] md:max-w-[1372px] w-full md:px-20 lg:px-106">
        <section className="flex flex-col gap-y-20 justify-between mb-8 md:mb-72 md:flex-row">
          <div className="max-w-[300px] lg:max-w-[420px]">
            <h2 className="text-2xl lg:text-32 mb-3">Coner Murphy</h2>
            <p className="lg:text-lg mb-4">
              Some random text that I need to write that will talk about me and
              my work etc etc.
            </p>
            <NavBar />
          </div>
          <Newsletter breakpoint="lg" />
        </section>
        <section className="flex flex-col gap-y-3 justify-between border-t pt-9 md:flex-row">
          <p className="text-sm lg:text-base">
            © 2022 Coner Murphy. All rights reserved.
          </p>
          <Socials />
        </section>
      </footer>
    </div>
  );
}
