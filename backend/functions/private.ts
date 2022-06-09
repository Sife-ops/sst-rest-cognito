import Repository from '../lib/repository';
import jsonBodyParser from '@middy/http-json-body-parser';
import middy from '@middy/core';
import operations from '../lib/operation';
import type { APIGatewayProxyEvent, Handler } from 'aws-lambda';
import { formatResponse } from '../lib/response';

const lambdaHandler: Handler<
  Omit<APIGatewayProxyEvent, 'body'> & {
    body: {
      operation:
        | 'bookmarkCreate'
        | 'bookmarkGet'
        | 'bookmarkList'
        | 'categoryCreate'
        | 'itemList';
      variables: any;
    };
  }
> = async (event) => {
  const {
    requestContext: { accountId },
    body: { operation },
    body: { variables },
  } = event;

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
