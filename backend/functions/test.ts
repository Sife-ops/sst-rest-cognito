import jsonBodyParser from "@middy/http-json-body-parser";
import middy from "@middy/core";
import operations from "../lib/operation";
import { PrivateHandlerInput } from "../lib/input";

import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, "body"> & {
  body: S;
};

type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

/**
 * handler
 */
const lambdaHandler: ValidatedEventAPIGatewayProxyEvent<
  PrivateHandlerInput
> = async (event) => {
  const {
    body,
    body: { operation },
    requestContext: { accountId },
  } = event;

  const res = await operations[operation]({ accountId, body });

  return {
    statusCode: 200,
    body: "aaa",
  };
};

export const handler = middy(lambdaHandler).use(jsonBodyParser());
