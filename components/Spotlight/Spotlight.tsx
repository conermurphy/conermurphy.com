import React from 'react';
import { ICONS } from '../../types';
import { getIcon } from '../../utils';

interface IProps {
  type: 'latestTechnologies' | 'companies';
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
        Using the latest technologies and more...
      </h2>
      <ul className="flex flex-row flex-wrap justify-center gap-x-24 gap-y-8 w-full max-w-3xl lg:justify-between mt-10 lg:flex-nowrap">
        {type === 'latestTechnologies'
          ? techs.map((tech) => {
              return (
                <div key={`type-${tech}`}>
                  {getIcon({
                    icon: tech,
                    size: '64px',
                  })}
                </div>
              );
            })
          : null}
      </ul>
    </section>
  );
}
