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

/**
 * handler
 */
const lambdaHandler: PrivateHandler<PrivateHandlerInput> = async (event) => {
  const {
    body,
    body: { operation },
    requestContext: { accountId },
  } = event;

  return await operations[operation]({ accountId, body });
};

export const handler = middy(lambdaHandler).use(jsonBodyParser());