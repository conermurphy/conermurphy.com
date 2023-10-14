import React, { ReactElement, ReactNode } from 'react';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: 'column' | 'row';
  data?: {
    title?: string;
    tag?: string;
    description?: string;
    link?: ReactElement;
    level?: number;
  };
}

export default function ComponentWrapper({
  data: { title = '', tag = '', description = '', link, level = 2 } = {},
  children,
  direction = 'column',
  ...props
}: IProps): JSX.Element {
  const HeaderTag = `h${level}` as keyof JSX.IntrinsicElements;

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
          <HeaderTag
            className="text-3xl font-bold tracking-tight text-text/90 sm:text-4xl"
            id={title.replaceAll(' ', '-').toLowerCase()}
          >
            {title}
          </HeaderTag>

          <p className="md:text-lg max-w-md text-text/75">{description}</p>
          {link}
        </div>
        {children}
      </section>
    </div>
  );
}
