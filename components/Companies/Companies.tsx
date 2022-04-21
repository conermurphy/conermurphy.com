import React from 'react';
import Image from 'next/image';
import { companiesData } from '../../content';
import { HeaderBackground } from '../Header/components';

export default function Companies(): JSX.Element {
  return (
    <section className="flex flex-col items-center bg-primaryBg px-6 lg:px-0 pt-0 pb-10 md:pb-16">
      <HeaderBackground bg="bg-primaryBg" />
      <h2 className="text-lg text-center md:text-2xl opacity-75 font-normal">
        Trusted by companies around the globe.
      </h2>
      <ul className="flex flex-row flex-wrap items-center justify-center gap-x-24 gap-y-8 w-full max-w-3xl mt-6 xl:justify-between lg:flex-nowrap">
        {companiesData.map(({ icon, alt }) => {
          return (
            <li
              className="relative h-11 lg:h-20 w-full md:w-3/12 lg:w-full"
              key={alt.replace(' ', '-')}
            >
              <Image src={icon} alt={alt} layout="fill" />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
