import * as cdk from 'aws-cdk-lib';
import {
  BillingMode,
  StreamViewType,
  AttributeType,
  Table,
} from 'aws-cdk-lib/aws-dynamodb';
import { EmailIdentity, Identity } from 'aws-cdk-lib/aws-ses';
import { StackConfig } from './types';

type ExtendedStackProps = cdk.StackProps & {
  config: Readonly<StackConfig>;
};

export class ConermurphyWebsiteCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: ExtendedStackProps) {
    super(scope, id, props);

    const verifiedEmail = props?.config.EMAIL_ADDRESS || '';
    const identity = Identity.email(verifiedEmail);
    new EmailIdentity(this, 'SESIdentity', {
      identity,
    });

    // === DynamoDB Code ===
    const tableName = 'posts';

    new Table(this, 'PostsTable', {
      tableName,
      partitionKey: {
        name: 'UUID',
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      stream: StreamViewType.NEW_IMAGE,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}
