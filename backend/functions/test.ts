import jsonBodyParser from "@middy/http-json-body-parser";
import middy from "@middy/core";
import operations from "../lib/operation";
import type { ValidatedEventAPIGatewayProxyEvent } from "../lib/api-gateway";
import { formatJSONResponse } from "../lib/api-gateway";

/**
 * input schema
 */
const inputSchema = {
  type: "object",
  properties: {
    operation: { enum: ["itemList", "bookmarkList"] },
    accountId: { type: "string" },
    variables: { type: "object" },
  },
  required: ["operation", "accountId"],
} as const;

/**
 * handler
 */
const lambdaHandler: ValidatedEventAPIGatewayProxyEvent<
  typeof inputSchema
> = async (event) => {
  const {
    body,
    body: { operation },
    requestContext: { accountId },
  } = event;

  const res = await operations[operation]({ accountId, body });
  return res;
};

export const handler = middy(lambdaHandler).use(jsonBodyParser());
