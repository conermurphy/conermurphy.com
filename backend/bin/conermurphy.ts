#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ConerMurphyStack } from '../lib/conermurphy-stack';
import { resolveConfig } from '../lib/config';

const app = new cdk.App();
const config = resolveConfig();

new ConerMurphyStack(app, 'ConerMurphyStack', {
  env: {
    region: config.STACK_REGION,
  },
});
