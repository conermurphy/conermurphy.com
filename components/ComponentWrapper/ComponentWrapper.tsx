import React, { ReactNode } from 'react';
import { HeaderBackground } from '../Header/components';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  data: {
    title: string;
    subTitle: string;
    pageHeader?: boolean;
  };
  textClasses?: string;
}

export default function ComponentWrapper({
  data: { title, subTitle, pageHeader = false },
  children,
  ...props
}: IProps): JSX.Element {
  const bg = pageHeader
    ? 'bg-primaryBg dark:bg-primaryBgDark'
    : 'bg-secondaryBg dark:bg-secondaryBgDark';
  const contentMargin = pageHeader ? 'mb-12 md:mb-72' : 'mb-8';
  const padding = pageHeader ? 'pb-10 md:pb-72 pt-8' : 'pb-72 pt-0';
  const negativeMargin = pageHeader ? '-mt-16' : '';
  const subTitleMaxWidth = pageHeader ? 'max-w-3xl' : '';
  const textStyles = pageHeader ? '' : 'text-center xl:text-left';

  return (
    <div
      id={props?.id}
      className={`flex flex-col items-center justify-center ${bg} ${padding} ${negativeMargin} ${
        props?.className || ''
      }`}
    >
      <HeaderBackground bg={bg} />
      <section className="md:max-w-[1372px] px-6 md:px-20 w-full text-primaryText dark:text-primaryTextDark">
        {pageHeader ? (
          <h1 className="text-32 md:text-40">{title}</h1>
        ) : (
          <h2
            className={`text-3xl font-normal md:text-4xl ${textStyles} ${
              props?.textClasses || ''
            }`}
          >
            {title}
          </h2>
        )}
        <p
          className={`text-base md:text-xl mt-2.5 lg:mt-1 text-primaryText dark:text-primaryTextDark ${subTitleMaxWidth} ${contentMargin} ${textStyles} ${
            props?.textClasses || ''
          }`}
        >
          {subTitle}
        </p>
        {children}
      </section>
    </div>
  );
}
