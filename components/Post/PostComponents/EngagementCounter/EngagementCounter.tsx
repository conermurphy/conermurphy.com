import React from 'react';
import { EngagementCountData } from '../../../../types';

export default function EngagementCounter({
  viewCount,
}: EngagementCountData): JSX.Element {
  return (
    <p className="mt-6 text-xl">
      <strong>👥 {viewCount}</strong>
    </p>
  );
}
