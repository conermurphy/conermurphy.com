import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';

const url = process.env.APPSYNC_API_URL;
const region = process.env.AWS_API_REGION;

const auth = {
  type: process.env.APPSYNC_API_AUTH_TYPE,
  apiKey: process.env.APPSYNC_API_KEY,
};

const httpLink = new HttpLink({ uri: url });

const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export { client };
