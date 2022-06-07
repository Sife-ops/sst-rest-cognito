import jsonBodyParser from '@middy/http-json-body-parser';
import middy from '@middy/core';
import operations from '../lib/operation';
import { formatResponse } from '../lib/response';

import type { APIGatewayProxyEvent, Handler } from 'aws-lambda';

const lambdaHandler: Handler<
  Omit<APIGatewayProxyEvent, 'body'> & {
    body: {
      operation:
        | 'bookmarkList'
        | 'itemList'
        | 'categoryCreate'
        | 'bookmarkCreate';
      variables: any;
    };
  }
> = async (event) => {
  const {
    body: { variables },
    body: { operation },
    requestContext: { accountId },
  } = event;

  try {
    const result = await operations[operation]({ accountId, variables });

    if (result.ok) {
      return formatResponse(200, {
        success: true,
        data: result.val,
      });
    } else {
      return formatResponse(400, {
        success: false,
        message: result.val,
      });
    }
  } catch (error) {
    const e = error as { message: string };
    console.log(e.message);
    return formatResponse(500, {
      success: false,
      message: e.message,
      error: e,
    });
  }
};

export const handler = middy(lambdaHandler).use(jsonBodyParser());
