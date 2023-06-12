import React, { ReactElement, ReactNode } from 'react';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: 'column' | 'row';
  data?: {
    title?: string;
    tag?: string;
    description?: string;
    link?: ReactElement;
  };
}

export default function ComponentWrapper({
  data: { title = '', tag = '', description = '', link } = {},
  children,
  direction = 'column',
  ...props
}: IProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center p-6" {...props}>
      <section
        className={`flex ${
          direction === 'column'
            ? 'flex-col'
            : 'flex-col lg:flex-row justify-between items-center'
        } gap-16 max-w-md lg:max-w-7xl w-full first:pt-12 first:md:pt-24`}
      >
        <div className="flex flex-col items-start gap-4">
          <p className="text-lg md:text-xl text-brand font-heading font-extrabold">
            {tag}
          </p>
          <div className="flex flex-col items-start gap-1">
            <h2
              className="font-heading font-extrabold text-2xl md:text-3xl text-text/90"
              id={title.replaceAll(' ', '-').toLowerCase()}
            >
              {title}
            </h2>
            <p className="md:text-lg max-w-md">{description}</p>
          </div>
          {link}
        </div>
        {children}
      </section>
    </div>
  );
}
