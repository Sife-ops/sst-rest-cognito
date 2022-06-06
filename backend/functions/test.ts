import jsonBodyParser from "@middy/http-json-body-parser";
import middy from "@middy/core";
import operations from "../lib/operation";
import { PrivateHandlerInput } from "../lib/input";

import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";

type PrivateHandler<S> = Handler<
  Omit<APIGatewayProxyEvent, "body"> & {
    body: S;
  },
  APIGatewayProxyResult
>;

const lambdaHandler: PrivateHandler<PrivateHandlerInput> = async (event) => {
  const {
    body,
    body: { operation },
    requestContext: { accountId },
  } = event;

  try {
    const result = await operations[operation]({ accountId, body });

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
        // todo: incorrect code
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: result.val,
        }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "unknown error",
        error,
      }),
    };
  }
};

export const handler = middy(lambdaHandler).use(jsonBodyParser());
