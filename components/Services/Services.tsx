import React from 'react';
import { Service } from '../../types';
import { getIcon } from '../../utils';
import { HeaderBackground } from '../Header/components';

interface IProps {
  services: Service[];
}

export default function Services({ services }: IProps): JSX.Element {
  return (
    <div className="flex flex-col items-center my-10 md:my-72">
      <HeaderBackground bg="bg-white" />
      <section className="max-w-[272px] md:max-w-[1372px] w-full md:px-20 lg:px-106">
        <h2 className="text-32 md:text-40">My Crafts...</h2>
        <p className="text-lg mb-10 mt-2.5 lg:mt-1 md:text-2xl">
          Let me help you, here’s how.
        </p>
        <ul className="flex flex-col items-center justify-between flex-wrap gap-12 md:flex-row lg:flex-nowrap xl:gap-[78px]">
          {services.map(({ title, copy, icon }) => {
            const iconSVG = getIcon({ icon });
            return (
              <article key={title} className="max-w-xs">
                <div className="flex flex-row items-center gap-3 mb-5">
                  <div className="w-11 h-11 flex items-center justify-center bg-primary text-offWhite rounded-[10px]">
                    {iconSVG}
                  </div>
                  <h3 className="text-2xl font-semibold">{title}</h3>
                </div>
                <p className="max-w-[274px] lg:max-w-[320px]">{copy}</p>
              </article>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
