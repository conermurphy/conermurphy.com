import 'isomorphic-fetch';
import type { NextApiRequest } from 'next';
import { UpdateCommand, UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';
import { NextResponse } from 'next/server';
import { dbClient } from '../../../config';

export default async function PUT(req: NextApiRequest) {
  // 0: If in development, then return and don't query API.
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.json(
      { message: 'Error, not running in production' },
      { status: 400 }
    );
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

    return NextResponse.json(
      { viewCount: Attributes?.viewCount },
      { status: 200 }
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);

    return NextResponse.json(
      { message: 'Error, could not increment viewCount' },
      { status: 500 }
    );
  }
}
