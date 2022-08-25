import React from 'react';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import Newsletter from '../Newsletter/Newsletter';

interface IProps {
  title: string;
  showNewsletter?: boolean;
}

export default function PageHero({
  title,
  showNewsletter = true,
}: IProps): JSX.Element {
  return (
    <ComponentWrapper
      data={{
        title,
        pageHeader: true,
      }}
    >
      <div className="flex flex-row justify-between">
        <p className="text-2xl">
          Get all my posts and exclusive weekly content in your inbox
        </p>
        {showNewsletter ? <Newsletter breakpoint="md" /> : null}
      </div>
    </ComponentWrapper>
  );
}
