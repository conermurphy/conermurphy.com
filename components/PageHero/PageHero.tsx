import React from 'react';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import Newsletter from '../Newsletter/Newsletter';

interface IProps {
  title: string;
  showNewsletter?: boolean;
  is404Page?: boolean;
}

export default function PageHero({
  title,
  showNewsletter = true,
  is404Page = false,
}: IProps): JSX.Element {
  return (
    <ComponentWrapper
      data={{
        title,
        pageHeader: true,
      }}
    >
      {showNewsletter ? (
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <p className="text-lg md:text-2xl">
            Get all my posts and exclusive weekly content in your inbox.
          </p>
          <Newsletter />
        </div>
      ) : null}
      {is404Page ? (
        <p className="text-2xl">
          Oops, that isn&apos;t a page. If you think this is a mistake, please
          contact me below.
        </p>
      ) : null}
    </ComponentWrapper>
  );
}
