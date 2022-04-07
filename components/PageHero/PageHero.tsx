import React from 'react';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import Newsletter from '../Newsletter/Newsleter';

interface IProps {
  title: string;
  body: string;
  showNewsletter?: boolean;
}

export default function PageHero({
  title,
  body,
  showNewsletter = true,
}: IProps): JSX.Element {
  return (
    <ComponentWrapper
      data={{
        title,
        subTitle: body,
        pageHeader: true,
      }}
    >
      {showNewsletter ? <Newsletter breakpoint="md" /> : null}
    </ComponentWrapper>
  );
}
