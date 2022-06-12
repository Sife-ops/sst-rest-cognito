import Repository from '../lib/repository';
import jsonBodyParser from '@middy/http-json-body-parser';
import middy from '@middy/core';
import operations, { OperationName } from '../lib/operation';
import type { APIGatewayProxyEvent, Handler } from 'aws-lambda';
import { formatResponse } from '../lib/response';

const lambdaHandler: Handler<
  Omit<APIGatewayProxyEvent, 'body'> & {
    body: {
      operation: OperationName;
      variables: any;
    };
  }
> = async ({
  requestContext: { accountId },
  body: { operation, variables },
}) => {
  const repository = new Repository(accountId);

  try {
    const result = await operations[operation]({ repository, variables });

    if (result.ok) {
      return formatResponse(200, {
        success: true,
        data: result.val,
      });
    } else {
      return formatResponse(400, {
        success: false,
        error: result.val,
      });
    }
  } catch (error: any) {
    console.log(error.message);
    return formatResponse(500, {
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const handler = middy(lambdaHandler).use(jsonBodyParser());
