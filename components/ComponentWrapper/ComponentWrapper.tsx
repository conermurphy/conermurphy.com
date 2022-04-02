import React, { ReactNode } from 'react';
import { HeaderBackground } from '../Header/components';

interface IProps {
  children: ReactNode;
  data: {
    title: string;
    subTitle: string;
  };
}

export default function ComponentWrapper({
  data: { title, subTitle },
  children,
}: IProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center bg-secondaryBg pt-0 md:pt-72 pb-72 md:pb-36">
      <HeaderBackground bg="bg-secondaryBg" />
      <section className="max-w-[272px] md:max-w-[1372px] md:px-20 lg:px-106 w-full">
        <h2 className="text-3xl text-primaryText font-normal max-w-max md:text-4xl">
          {title}
        </h2>
        <p className="text-xl mb-12 mt-2.5 lg:mt-1 md:text-2xl text-primaryText max-w-max">
          {subTitle}
        </p>
        {children}
      </section>
    </div>
  );
}
