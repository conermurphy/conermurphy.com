import React from 'react';
import { Service } from '../../types';
import { getIcon } from '../../utils';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';

interface IProps {
  services: Service[];
}

export default function Services({ services }: IProps): JSX.Element {
  return (
    <ComponentWrapper
      data={{
        title: 'My Crafts...',
        subTitle: 'Let me help you, here’s how.',
      }}
    >
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-start gap-6 md:items-start">
        {services.map(({ title, copy, icon }) => {
          const iconSVG = getIcon({ icon, size: '22px' });
          return (
            <article
              key={title}
              className="flex flex-col gap-6 h-full justify-between max-w-[272px] sm:max-w-[360px] bg-primaryBg rounded-lg px-8 py-6"
            >
              <div className="flex flex-row items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-primaryText text-primaryBg rounded-lg">
                  {iconSVG}
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>
              <p className="text-sm md:text-base">{copy}</p>
            </article>
          );
        })}
      </ul>
    </ComponentWrapper>
  );
}
