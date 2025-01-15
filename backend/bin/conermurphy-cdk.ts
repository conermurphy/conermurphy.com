#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { ConermurphyWebsiteCdkStack } from '../lib/conermurphy-cdk-stack'
import { resolveConfig } from '../lib/config'

const app = new cdk.App()
const config = resolveConfig()

new ConermurphyWebsiteCdkStack(app, 'ConermurphyWebsiteCdkStack', {
  env: {
    region: config.STACK_REGION,
  },
  config,
})
