import React from 'react';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import Newsletter from '../Newsletter/Newsletter';

interface IProps {
  title: string;
  description?: string;
  showNewsletter?: boolean;
  is404Page?: boolean;
}

export default function PageHero({
  title,
  description,
  showNewsletter = true,
  is404Page = false,
}: IProps): JSX.Element {
  const pageDescription =
    description ||
    'Thoughts, stories, and actionable advice for creators, builders, entrepreneurs, and more straight to your inbox weekly.';

  return (
    <ComponentWrapper
      data={{
        title,
        pageHeader: true,
      }}
    >
      <div className="flex flex-col sm:flex-row justify-between gap-6">
        <p className="text-lg md:text-2xl max-w-2xl">{pageDescription}</p>
        {showNewsletter ? (
          <div className="flex flex-col gap-2">
            <p className="font-bold">Subscribe to my newsletter 👇</p>
            <Newsletter />
          </div>
        ) : null}
      </div>
      {is404Page ? (
        <p className="text-2xl">
          Oops, that isn&apos;t a page. If you think this is a mistake, please
          contact me below.
        </p>
      ) : null}
    </ComponentWrapper>
  );
}
