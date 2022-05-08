import React from 'react';
import { EngagementCounterProps } from '../../../../types';
import { useEngagementCount } from '../../../../utils';

export default function EngagementCounter({
  UUID,
  postType,
  slug,
}: EngagementCounterProps): JSX.Element {
  const { data } = useEngagementCount({ UUID, postType, slug });

  return (
    <p className="mt-6 text-xl">
      <strong>👥 {data?.viewCount}</strong>
    </p>
  );
}
