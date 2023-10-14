import React from 'react';

interface IProps {
  title: string;
  description?: string;
  tag?: string;
  is404Page?: boolean;
}

export default function PageHero({
  title,
  description,
  tag = '',
  is404Page = false,
}: IProps): JSX.Element {
  const pageDescription =
    description ||
    'Thoughts, stories, and actionable advice for creators, builders, entrepreneurs, and more straight to your inbox weekly.';

  return (
    <section className="bg-background px-6 py-12 lg:px-8 w-full flex justify-center text-center">
      <div className="flex flex-col items-center max-w-7xl">
        <p className="text-lg font-bold leading-7 text-brand">{tag}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-text/90 sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-text-90 max-w-lg">
          {is404Page
            ? `Oops, that isn&apos;t a page. If you think this is a mistake, please
          contact me below.`
            : pageDescription}
        </p>
      </div>
    </section>
  );
}
