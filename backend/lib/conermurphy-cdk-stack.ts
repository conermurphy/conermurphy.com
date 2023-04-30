import * as cdk from 'aws-cdk-lib';
import {
  BillingMode,
  StreamViewType,
  AttributeType,
  Table,
} from 'aws-cdk-lib/aws-dynamodb';

export class ConermurphyWebsiteCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

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
