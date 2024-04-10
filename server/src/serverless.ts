import { app } from './index';
import serverless from 'serverless-http';
import { APIGatewayEvent, Context } from 'aws-lambda';


// Base AWS Lambda function entrypoint handler
export const handler = (event: APIGatewayEvent, context: Context): serverless.Handler => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);

  return serverless(app);
};
