import 'isomorphic-fetch';
import type { NextApiRequest, NextApiResponse } from 'next';
import { FetchResult, gql } from '@apollo/client';
import { client } from '../../apollo-client';
import { EngagementCountData, EngagementCounterProps } from '../../types';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: EngagementCounterProps;
}

type EngagementCountReturnData = {
  incrementPostView?: EngagementCountData;
  addPost?: EngagementCountData;
};

export default async function EngagementCount(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  // 0: Get UUID from request
  const {
    body: { UUID, postType, slug },
  } = req;

  // 1: If in development, then return and don't query API.
  if (process.env.NODE_ENV !== 'production') {
    return res
      .status(400)
      .json({ message: 'Error, not running in production' });
  }

  try {
    // 2a: Try to increment the viewCount by 1
    const { data }: FetchResult<EngagementCountReturnData> =
      await client.mutate({
        mutation: gql`
          mutation IncrementViewCount(
            $UUID: String!
            $postType: String!
            $slug: String!
          ) {
            incrementPostView(UUID: $UUID, postType: $postType, slug: $slug) {
              UUID
              viewCount
            }
          }
        `,
        variables: { UUID, postType, slug },
      });

    return res.status(200).json({
      data: {
        viewCount: data?.incrementPostView?.viewCount,
        UUID,
      },
    });
  } catch (e) {
    // 2b: If errors, then create a new entry with 1 as viewCount
    const { data }: FetchResult<EngagementCountReturnData> =
      await client.mutate({
        mutation: gql`
          mutation AddPost(
            $UUID: String!
            $viewCount: Int!
            $postType: String!
            $slug: String!
          ) {
            addPost(
              UUID: $UUID
              viewCount: $viewCount
              postType: $postType
              slug: $slug
            ) {
              UUID
              viewCount
            }
          }
        `,
        variables: { UUID, viewCount: 1, postType, slug },
      });

    return res.status(200).json({
      data: {
        viewCount: data?.addPost?.viewCount,
        UUID,
      },
    });
  }
}
