import React, { ReactNode } from 'react';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  data?: {
    title?: string;
    pageHeader?: boolean;
  };
  textClasses?: string;
}

export default function ComponentWrapper({
  data: { title = '', pageHeader = false } = { title: '', pageHeader: false },
  children,
  ...props
}: IProps): JSX.Element {
  const headerStyles =
    'text-2xl md:text-3xl border-b-4 border-accent w-max mb-12 pb-4 font-bold';

  return (
    <div
      id={props?.id}
      className={`flex flex-col items-center justify-center py-16 lg:py-32 bg-primaryBg dark:bg-primaryBgDark px-4 sm:px-6 lg:px-12 2xl:px-0 ${
        props?.className || ''
      }`}
    >
      <section className="md:max-w-7xl w-full">
        {pageHeader ? (
          <h1 className={`${headerStyles} uppercase`}>{title}</h1>
        ) : (
          <h2 className={`${headerStyles} ${props?.textClasses || ''}`}>
            {title}
          </h2>
        )}
        {children}
      </section>
    </div>
  );
}
