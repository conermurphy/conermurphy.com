import 'isomorphic-fetch';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloQueryResult, FetchResult, gql } from '@apollo/client';
import { client } from '../../apollo-client';
import { EngagementCountData, EngagementCounterProps } from '../../types';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: EngagementCounterProps;
}

type EngagementCountReturnData = {
  incrementPostView?: EngagementCountData;
  addPost?: EngagementCountData;
  getPost?: EngagementCountData;
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
    return;
  }

  // 2: Check if UUID exists in DB.
  const { data: getData }: ApolloQueryResult<EngagementCountReturnData> =
    await client.query({
      query: gql`
        query getPost($UUID: String!) {
          getPost(UUID: $UUID) {
            UUID
          }
        }
      `,
      variables: { UUID },
    });

  if (getData.getPost?.UUID) {
    // 2a: If UUID exists in DB already, increment viewCount by 1
    const { data }: FetchResult<EngagementCountReturnData> =
      await client.mutate({
        mutation: gql`
          mutation IncrementViewCount($UUID: String!) {
            incrementPostView(UUID: $UUID) {
              UUID
              viewCount
            }
          }
        `,
        variables: { UUID },
      });

    return res.status(200).json({
      data: {
        viewCount: data?.incrementPostView?.viewCount,
        UUID,
      },
    });
  }

  // 2b: If UUID doesn't exist, create a new post with a viewCount of 1.
  const { data }: FetchResult<EngagementCountReturnData> = await client.mutate({
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
