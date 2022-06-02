import jsonBodyParser from "@middy/http-json-body-parser";
import middy from "@middy/core";
import type { ValidatedEventAPIGatewayProxyEvent } from "./api-gateway";
import { formatJSONResponse } from "./api-gateway";

/**
 * input schema
 */
const inputSchema = {
  type: "object",
  properties: {
    operation: { type: "string" },
    variables: { type: "object" },
  },
  required: ["operation"],
} as const;

/**
 * handler
 */
const lambdaHandler: ValidatedEventAPIGatewayProxyEvent<
  typeof inputSchema
> = async (event) => {
  const { operation, variables } = event.body;
  return formatJSONResponse({
    success: true,
    data: {
      operation,
      variables,
    },
  });
};

export const handler = middy(lambdaHandler).use(jsonBodyParser());
