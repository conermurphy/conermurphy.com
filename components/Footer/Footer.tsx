import React from 'react';
import NavBar from '../NavBar/NavBar';
import Newsletter from '../Newsletter/Newsleter';
import Socials from '../Socials/Socials';

export default function Footer(): JSX.Element {
  return (
    <div className="flex flex-col items-center py-10 md:pt-72 md:pb-11 bg-primaryBg dark:bg-primaryBgDark">
      <footer className="lg:max-w-[1372px] w-full px-6 md:px-20">
        <section className="flex gap-y-10 justify-start mb-8 md:mb-72 flex-row flex-wrap sm:justify-between">
          <div className="w-full sm:max-w-[300px] lg:max-w-[420px]">
            <h2 className="text-2xl lg:text-32 mb-3">Coner Murphy</h2>
            <p className="lg:text-lg mb-4">
              TypeScript Developer | Technical Writer | Content Creator
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
