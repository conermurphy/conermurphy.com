import React from 'react';
import { HeaderBackground } from '../Header/components';
import Newsletter from '../Newsletter/Newsleter';

interface IProps {
  title: string;
  body: string;
  showNewsletter?: boolean;
}

export default function PageHero({
  title,
  body,
  showNewsletter = true,
}: IProps): JSX.Element {
  return (
    <div className="flex flex-col items-center bg-primaryBg -mt-16">
      <HeaderBackground bg="bg-primaryBg" />
      <section className="flex flex-col gap-y-20 md:gap-y-10 max-w-[272px] md:max-w-[1372px] w-full md:px-20 lg:px-106 py-10 md:py-72">
        <div className="max-w-xl">
          <h1 className="text-32 md:text-40">{title}</h1>
          <p className="text-base md:text-xl">{body}</p>
        </div>
        {showNewsletter ? <Newsletter breakpoint="md" /> : null}
      </section>
    </div>
  );
}
