import jsonBodyParser from "@middy/http-json-body-parser";
import middy from "@middy/core";
import operations from "../lib/operation";

import type { APIGatewayProxyEvent, Handler } from "aws-lambda";

const lambdaHandler: Handler<
  Omit<APIGatewayProxyEvent, "body"> & {
    body: {
      operation:
        | "bookmarkList"
        | "itemList"
        | "categoryCreate"
        | "bookmarkCreate";
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
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          data: result.val,
        }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: result.val,
        }),
      };
    }
  } catch (error) {
    const e = error as { message: string };
    console.log(e.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: e.message,
        error: e,
      }),
    };
  }
};

export const handler = middy(lambdaHandler).use(jsonBodyParser());
