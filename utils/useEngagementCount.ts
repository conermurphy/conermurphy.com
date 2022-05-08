import { ApolloError } from '@apollo/client';
import { useEffect, useState } from 'react';
import { server } from '../config';
import {
  EngagementCountData,
  EngagementCount,
  EngagementCounterProps,
} from '../types';

export default function useEngagementCount({
  UUID,
  postType,
  slug,
}: EngagementCounterProps) {
  const [returnData, setReturnData] = useState<EngagementCountData | null>(
    null
  );
  const [returnLoading, setReturnLoading] = useState<boolean>(false);
  const [returnError, setReturnError] = useState<ApolloError | undefined>();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${server}/api/engagementCount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UUID, postType, slug }),
      });

      const resonseText: string = await res.text();

      // Waiting for the output of the serverless function and storing into the serverlessBaseoutput var.
      const { data, loading, error } = (await JSON.parse(
        resonseText
      )) as EngagementCount;

      setReturnData(data);
      setReturnLoading(loading);
      setReturnError(error);
    }

    /*  eslint-disable-next-line */
    fetchData();
  }, [UUID, postType, slug]);

  return {
    data: returnData,
    loading: returnLoading,
    error: returnError,
  };
}
