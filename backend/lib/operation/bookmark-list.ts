import { OperationFn } from "./operation";
import { db } from "../service";
import { formatJSONResponse } from "../response";

const bookmarkList: OperationFn = async (p) => {
  const bookmarksRes = await db
    .query({
      TableName: process.env.tableName!,
      KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
      ExpressionAttributeValues: {
        ":pk": `user:${p.accountId}`,
        ":sk": `bookmark:`,
      },
    })
    .promise()
    .then((e) => {
      console.log(e);
      return e;
    });

  const categoriesRes = await db
    .query({
      TableName: process.env.tableName!,
      KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
      ExpressionAttributeValues: {
        ":pk": `user:${p.accountId}`,
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

  return formatJSONResponse(bookmarks);
};

export default bookmarkList;
