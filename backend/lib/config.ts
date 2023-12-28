import * as dotenv from 'dotenv';
import * as path from 'path';
import { StackConfig } from './types';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const resolveConfig = (): StackConfig => ({
  STACK_REGION: process.env.STACK_REGION || 'eu-west-2',
  EMAIL_ADDRESS: process.env.EMAIL_ADDRESS || '',
});
