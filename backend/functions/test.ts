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
    const res = await operations[operation]({ accountId, body });
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: res,
      }),
    };
  } catch (e) {
    return {
      // todo: incorrect code
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        // todo: extract message
        message: e,
      }),
    };
  }
};

export const handler = middy(lambdaHandler).use(jsonBodyParser());
