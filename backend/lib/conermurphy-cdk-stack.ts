import * as cdk from 'aws-cdk-lib';
import {
  CfnApiKey,
  CfnDataSource,
  CfnGraphQLApi,
  CfnGraphQLSchema,
  CfnResolver,
} from 'aws-cdk-lib/aws-appsync';
import {
  BillingMode,
  StreamViewType,
  AttributeType,
  Table,
} from 'aws-cdk-lib/aws-dynamodb';
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';

export class ConermurphyWebsiteCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const tableName = 'posts';

    // === AppSync Setup Code ===

    const postsGraphQLApi = new CfnGraphQLApi(this, 'PostsApi', {
      name: 'posts-api',
      authenticationType: 'API_KEY',
    });

    const postsApiKey = new CfnApiKey(this, 'PostsApiKey', {
      apiId: postsGraphQLApi.attrApiId,
    });

    const apiSchema = new CfnGraphQLSchema(this, 'PostsSchema', {
      apiId: postsGraphQLApi.attrApiId,
      definition: `type ${tableName} {
        UUID: String!
        viewCount: Int!
        postType: String!
        slug: String!
      }
      type Query {
        getAllPosts: [${tableName}]!
        getPost(UUID: String!): ${tableName}
      }
      type Mutation {
        incrementPostView(UUID: String!, postType: String!, slug: String!): ${tableName}
        addPost(UUID: String!, viewCount: Int!, postType: String!, slug: String!): ${tableName}
        deletePost(UUID: String!): ${tableName}
      }
      type Schema {
        query: Query
        mutation: Mutation
      }`,
    });

    // === DynamoDB Code ===

    const postsTable = new Table(this, 'PostsTable', {
      tableName,
      partitionKey: {
        name: 'UUID',
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      stream: StreamViewType.NEW_IMAGE,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // === IAM Roles Code ===

    const postsTableRole = new Role(this, 'PostsDynamoDBRole', {
      assumedBy: new ServicePrincipal('appsync.amazonaws.com'),
    });

    postsTableRole.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess')
    );

    // === AppSync Resolvers Code ===

    const dataSource = new CfnDataSource(this, 'PostsDataSource', {
      apiId: postsGraphQLApi.attrApiId,
      name: 'PostsDynamoDataSource',
      type: 'AMAZON_DYNAMODB',
      dynamoDbConfig: {
        tableName: postsTable.tableName,
        awsRegion: this.region,
      },
      serviceRoleArn: postsTableRole.roleArn,
    });

    const getPostResolver = new CfnResolver(this, 'GetPostResolver', {
      apiId: postsGraphQLApi.attrApiId,
      typeName: 'Query',
      fieldName: 'getPost',
      dataSourceName: dataSource.name,
      requestMappingTemplate: `{
        "version": "2017-02-28",
        "operation": "GetItem",
        "key": {
          "UUID": $util.dynamodb.toDynamoDBJson($ctx.args.UUID),
        }
      }`,
      responseMappingTemplate: '$util.toJson($ctx.result)',
    });
    getPostResolver.addDependsOn(apiSchema);

    const getAllPostsResolver = new CfnResolver(this, 'GetAllPostsResolver', {
      apiId: postsGraphQLApi.attrApiId,
      typeName: 'Query',
      fieldName: 'getAllPosts',
      dataSourceName: dataSource.name,
      requestMappingTemplate: `{
        "version": "2017-02-28",
        "operation" : "Scan"
      }`,
      responseMappingTemplate: '$util.toJson($ctx.result.items)',
    });
    getAllPostsResolver.addDependsOn(apiSchema);

    const addPostResolver = new CfnResolver(this, 'AddPostMutationResolver', {
      apiId: postsGraphQLApi.attrApiId,
      typeName: 'Mutation',
      fieldName: 'addPost',
      dataSourceName: dataSource.name,
      requestMappingTemplate: `{
        "version": "2017-02-28",
        "operation": "PutItem",
        "key": {
          "UUID": $util.dynamodb.toDynamoDBJson($ctx.args.UUID),
        },
        "attributeValues": {
          "viewCount": $util.dynamodb.toDynamoDBJson($ctx.args.viewCount),
          "postType": $util.dynamodb.toDynamoDBJson($ctx.args.postType),
          "slug": $util.dynamodb.toDynamoDBJson($ctx.args.slug)
        }
      }`,
      responseMappingTemplate: '$util.toJson($ctx.result)',
    });
    addPostResolver.addDependsOn(apiSchema);

    const incrementPostViewResolver = new CfnResolver(
      this,
      'IncrementPostViewMutationResolver',
      {
        apiId: postsGraphQLApi.attrApiId,
        typeName: 'Mutation',
        fieldName: 'incrementPostView',
        dataSourceName: dataSource.name,
        requestMappingTemplate: `{
        "version": "2017-02-28",
        "operation": "UpdateItem",
        "key": {
          "UUID": $util.dynamodb.toDynamoDBJson($ctx.args.UUID),
        },
        "update" : {
          "expression" : "SET viewCount=viewCount+:plusOne, postType=:postType, slug=:slug",
          "expressionValues" : {
              ":plusOne" : { "N" : 1 },
              ":postType": $util.dynamodb.toDynamoDBJson($ctx.args.postType),
              ":slug": $util.dynamodb.toDynamoDBJson($ctx.args.slug),
          }
        }
      }`,
        responseMappingTemplate: '$util.toJson($ctx.result)',
      }
    );
    incrementPostViewResolver.addDependsOn(apiSchema);

    const deletePostResolver = new CfnResolver(
      this,
      'DeletePostMutationResolver',
      {
        apiId: postsGraphQLApi.attrApiId,
        typeName: 'Mutation',
        fieldName: 'deletePost',
        dataSourceName: dataSource.name,
        requestMappingTemplate: `{
        "version": "2017-02-28",
        "operation": "DeleteItem",
        "key": {
          "UUID": $util.dynamodb.toDynamoDBJson($ctx.args.UUID),
        }
      }`,
        responseMappingTemplate: '$util.toJson($ctx.result)',
      }
    );
    deletePostResolver.addDependsOn(apiSchema);
  }
}
