import Repository from '../lib/repository';
import jsonBodyParser from '@middy/http-json-body-parser';
import middy from '@middy/core';
import operations from '../lib/operation';
import type { APIGatewayProxyEvent, Handler } from 'aws-lambda';
import { formatResponse } from '../lib/response';

import model from '../lib/model';

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
    requestContext: { accountId },
    body: { operation },
    body: { variables },
  } = event;

  // const a = await model.category.query('pk').eq('User:054661142656').exec();
  const a = await model.category
    .query('bookmark')
    .eq('Bookmark:9961c24d-4075-46ea-8d1b-fafd2181bbcd')
    .using('categoryBookmarkIndex')
    .exec();
  // Bookmark:9961c24d-4075-46ea-8d1b-fafd2181bbcd
  console.log(a);

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
