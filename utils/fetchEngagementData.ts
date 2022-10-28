import { server } from '../config';
import { EngagementCount, POSTTYPES } from '../types';

interface IProps {
  UUID: string;
  slug: string;
  postType: POSTTYPES;
}

export default async function fetchData({ UUID, slug, postType }: IProps) {
  const res = await fetch(`${server}/api/engagementCount`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ UUID, postType, slug }),
  });

  const resonseText: string = await res.text();

  // Waiting for the output of the serverless function and storing into the serverlessBaseoutput var.
  const { data } = (await JSON.parse(resonseText)) as EngagementCount;

  return { data };
}
