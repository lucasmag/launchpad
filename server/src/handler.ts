import { app } from '@src/index';
import serverless from 'serverless-http';

// Base AWS Lambda function entrypoint handler
export const handler = serverless(app);
