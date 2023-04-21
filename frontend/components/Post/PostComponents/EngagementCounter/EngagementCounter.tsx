import React from 'react';
import useSWR, { Fetcher, Key } from 'swr';
import { EngagementCounterProps, EngagementCountData } from '../../../../types';

const fetcher: Fetcher<EngagementCountData> = (url: string, queryParams = '') =>
  fetch(`${url}${queryParams}`).then((res) => res.json());

export default function EngagementCounter({
  UUID,
  postType,
  slug,
}: EngagementCounterProps): JSX.Element {
  const endpoint: Key = `/api/engagementCount`;
  const { data } = useSWR<EngagementCountData>(
    [endpoint, `?UUID=${UUID}&postType=${postType}&slug=${slug}`],
    fetcher,
    { revalidateOnFocus: false }
  );

  return (
    <p className="mt-6 text-xl">
      <strong>👥 {data?.viewCount}</strong>
    </p>
  );
}
