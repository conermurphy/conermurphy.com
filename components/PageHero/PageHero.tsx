import React from 'react';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import Newsletter from '../Newsletter/Newsleter';

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
      {showNewsletter ? <Newsletter breakpoint="md" /> : null}
    </ComponentWrapper>
  );
}
