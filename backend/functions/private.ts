import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // todo: validate
  if (!event.body) {
    throw new Error("no body");
  }
  const body = JSON.parse(event.body) as {
    operation: string;
    variables?: Record<string, any>;
  };

  const accountId = event.requestContext.accountId;

  const response = (body: any) => {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
  };

  switch (body.operation) {
    case "bookmark-list":
      return response({ test: "lol" });
      break;

    default:
      throw new Error("unknown operation");
      break;
  }
};
