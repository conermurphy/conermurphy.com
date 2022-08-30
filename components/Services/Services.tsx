import React from 'react';
import { Service } from '../../types';
import { getIcon } from '../../utils';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import NoScrollLink from '../NoScrollLink/NoScrollLink';

interface IProps {
  services: Service[];
}

export default function Services({ services }: IProps): JSX.Element {
  return (
    <ComponentWrapper
      data={{
        title: 'My Services',
      }}
    >
      <ul className="grid grid-cols-3 gap-6 w-full items-start justify-between">
        {services.map(({ title, copy, icon }) => {
          const iconSVG = getIcon({
            icon,
            size: '28px',
          });
          return (
            <li key={title}>
              <article className="flex flex-col gap-6 rounded-md overflow-hidden bg-secondaryBg dark:bg-secondaryBgDark p-6">
                {iconSVG}
                <div className="flex flex-row items-center gap-3">
                  <h3 className="text-xl font-bold border-b-4 pb-2 border-accent w-max">
                    {title}
                  </h3>
                </div>
                <p>{copy}</p>
              </article>
            </li>
          );
        })}
      </ul>
      <div className="flex gap-1 mt-10 text-lg flex-row lg:text-xl justify-center xl:justify-start flex-wrap">
        <p>Want to work with me on a project?</p>
        <span className="font-semibold border-b-2 border-transparent hover:border-accent pb-1">
          <NoScrollLink href="/#contact">Get in touch here</NoScrollLink>
        </span>
      </div>
    </ComponentWrapper>
  );
}
