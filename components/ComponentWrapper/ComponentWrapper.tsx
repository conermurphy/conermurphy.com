import React, { ReactNode } from 'react';
import { HeaderBackground } from '../Header/components';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  data: {
    title: string;
    subTitle: string;
    pageHeader?: boolean;
  };
}

export default function ComponentWrapper({
  data: { title, subTitle, pageHeader = false },
  children,
  ...props
}: IProps): JSX.Element {
  const bg = pageHeader ? 'bg-primaryBg' : 'bg-secondaryBg';
  const contentMargin = pageHeader ? 'mb-12 md:mb-72' : 'mb-8';
  const paddingBottom = pageHeader ? 'pb-10 md:pb-72' : 'pb-72';
  const negativeMargin = pageHeader ? '-mt-16' : '';
  const subTitleMaxWidth = pageHeader ? 'max-w-3xl' : '';

  return (
    <div
      id={props?.id}
      className={`flex flex-col items-center justify-center ${bg} pt-0 md:pt-72 ${paddingBottom} ${negativeMargin} ${
        props?.className || ''
      }`}
    >
      <HeaderBackground bg={bg} />
      <section className="max-w-[272px] md:max-w-[1372px] md:px-20 lg:px-106 w-full text-primaryText">
        {pageHeader ? (
          <h1 className="text-32 md:text-40">{title}</h1>
        ) : (
          <h2 className="text-3xl font-normal md:text-4xl">{title}</h2>
        )}
        <p
          className={`text-base md:text-xl mt-2.5 lg:mt-1 text-primaryText ${subTitleMaxWidth} ${contentMargin}`}
        >
          {subTitle}
        </p>
        {children}
      </section>
    </div>
  );
}
