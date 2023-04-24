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
    <div className="flex flex-col items-center justify-center" {...props}>
      <section
        className={`flex ${
          direction === 'column' ? 'flex-col' : 'flex-row justify-between'
        } gap-16 md:max-w-7xl w-full`}
      >
        <div className="flex flex-col items-start gap-4">
          <p className="text-xl text-brand font-heading font-extrabold">
            {tag}
          </p>
          <div className="flex flex-col items-start gap-1">
            <h2 className="font-heading font-extrabold text-3xl text-text/90">
              {title}
            </h2>
            <p className="text-lg max-w-md">{description}</p>
          </div>
          {link}
        </div>
        {children}
      </section>
    </div>
  );
}
