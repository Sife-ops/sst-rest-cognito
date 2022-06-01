import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamodb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // todo: validate
  if (!event.body) {
    throw new Error("no body");
  }
  const body = JSON.parse(event.body) as {
    operation: string;
    variables?: Record<string, any>;
  };

  // const accountId = event.requestContext.accountId;
  const accountId = "01";

  const response = (body: any) => {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
  };

  switch (body.operation) {
    case "item-list":
      const res = await dynamodb
        .query({
          // todo: remove bang
          TableName: process.env.tableName!,
          KeyConditionExpression: "pk = :user",
          ExpressionAttributeValues: {
            ":user": `user:${accountId}`,
          },
        })
        .promise();
      return response(res.Items);

    default:
      throw new Error("unknown operation");
  }
};
