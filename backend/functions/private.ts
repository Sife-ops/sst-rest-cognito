import crypto from "crypto";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamodb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const accountId = event.requestContext.accountId;
  console.log(accountId);

  if (!event.body) {
    throw new Error("no body");
  }

  const body = JSON.parse(event.body) as {
    operation: string;
  };

  switch (body.operation) {
    /**
     * item list
     */
    case "item-list": {
      const res = await dynamodb
        .query({
          // todo: remove the bang
          TableName: process.env.tableName!,
          KeyConditionExpression: "pk = :user",
          ExpressionAttributeValues: {
            ":user": `user:${accountId}`,
          },
        })
        .promise()
        .then((e) => {
          console.log(e);
          return e;
        });

      return jsonResponse(res.Items);
    }

    /**
     * bookmark list
     */
    case "bookmark-list": {
      const bookmarksRes = await dynamodb
        .query({
          TableName: process.env.tableName!,
          KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
          ExpressionAttributeValues: {
            ":pk": `user:${accountId}`,
            ":sk": `bookmark:`,
          },
        })
        .promise()
        .then((e) => {
          console.log(e);
          return e;
        });

      const categoriesRes = await dynamodb
        .query({
          TableName: process.env.tableName!,
          KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
          ExpressionAttributeValues: {
            ":pk": `user:${accountId}`,
            ":sk": `category:`,
          },
        })
        .promise()
        .then((e) => {
          console.log(e);
          return e;
        });

      const bookmarks = bookmarksRes.Items?.map((bookmark) => {
        const categories = categoriesRes.Items?.reduce(
          (acc: any[], cur, _, arr) => {
            //
            if (cur.sk.includes(bookmark.sk)) {
              const category = arr.find((category) => {
                return category.sk === cur.sk.split("#")[0];
              });
              return [...acc, category];
            }
            return acc;
          },
          []
        );

        return {
          ...bookmark,
          categories,
        };
      });

      return jsonResponse(bookmarks);
    }

    /**
     * category create
     */
    case "category-create": {
      const { description, name } = getVars<{
        name?: string;
        description?: string;
      }>(body);

      if (!name) {
        throw new Error("invalid arguments");
      }

      // todo: prevent duplicate

      const res = await dynamodb
        .put({
          TableName: process.env.tableName!,
          Item: {
            pk: `user:${accountId}`,
            sk: `category:${crypto.randomUUID()}`,
            name,
            description,
          },
        })
        .promise()
        .then((e) => {
          console.log(e);
          return e;
        });

      return jsonResponse(res);
    }

    /**
     * bookmark create
     */
    case "bookmark-create": {
      const { name, description, url, favorite } = getVars<{
        name?: string;
        description?: string;
        url?: string;
        favorite?: boolean;
      }>(body);

      if (!name) {
        throw new Error("invalid arguments");
      }

      const res = await dynamodb
        .put({
          TableName: process.env.tableName!,
          Item: {
            pk: `user:${accountId}`,
            sk: `bookmark:${crypto.randomUUID()}`,
            name,
            description,
            url,
            favorite,
          },
        })
        .promise()
        .then((e) => {
          console.log(e);
          return e;
        });

      return jsonResponse(res);
    }

    /**
     * default
     */
    default:
      throw new Error("unknown operation");
  }
};

const getVars = <T>(body: any): T => {
  return body.variables as T;
};

const jsonResponse = (body: any) => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
};
