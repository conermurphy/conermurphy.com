import React from 'react';
import Image from 'next/image';
import { ICONS, SPOTLIGHT } from '../../types';
import { getIcon } from '../../utils';
import { companies } from '../../content';

interface IProps {
  type: SPOTLIGHT;
}

export default function Spotlight({ type }: IProps): JSX.Element {
  const techs = [
    ICONS.GRAPHQL,
    ICONS.REACT,
    ICONS.NEXTJS,
    ICONS.TYPESCRIPT,
    ICONS.JAVASCRIPT,
  ];

  return (
    <section className="flex flex-col items-center bg-offWhite py-10 px-6 lg:px-0 md:py-72">
      <h2 className="text-lg text-center md:text-2xl opacity-75">
        {type === SPOTLIGHT.TECH
          ? 'Using the latest technologies and more...'
          : 'Trusted by companies around the globe'}
      </h2>
      <ul className="flex flex-row flex-wrap justify-center gap-x-24 gap-y-8 w-full max-w-3xl lg:justify-between mt-10 lg:flex-nowrap">
        {type === SPOTLIGHT.TECH
          ? techs.map((tech) => {
              return (
                <li key={`type-${tech}`}>
                  {getIcon({
                    icon: tech,
                    size: '64px',
                  })}
                </li>
              );
            })
          : companies.map(({ icon, alt }) => {
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
