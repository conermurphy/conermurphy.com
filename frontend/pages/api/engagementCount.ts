import 'isomorphic-fetch';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UpdateCommand, UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';
import { dbClient } from '../../config';

export default async function EngagementCount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 0: If in development, then return and don't query API.
  if (process.env.NODE_ENV !== 'production') {
    return res.status(200).json({
      viewCount: 1,
    });
  }

  // 1: Get UUID from request
  const { UUID } = JSON.parse(req?.body as string) as { UUID: string };

  try {
    // 2a: Try to increment the viewCount by 1 for the post
    const { Attributes } = (await dbClient.send(
      new UpdateCommand({
        TableName: process.env.POST_DB_TABLE_NAME,
        Key: {
          UUID,
        },
        ExpressionAttributeValues: {
          ':inc': 1,
        },
        UpdateExpression: 'ADD viewCount :inc',
        ReturnValues: 'ALL_NEW',
      })
    )) as Omit<UpdateCommandOutput, 'Attributes'> & {
      Attributes?: {
        viewCount: number;
      };
    };

    return res.status(200).json({
      viewCount: Attributes?.viewCount,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);

    return res.status(500).json({
      message: 'Error, could not increment viewCount',
    });
  }
}
