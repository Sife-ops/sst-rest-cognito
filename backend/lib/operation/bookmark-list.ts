import { Ok, Err } from "ts-results";
import { OperationFn } from "./operation";
import { db } from "../service";

const bookmarkList: OperationFn<{}, "bookmarks undefined"> = async ({
  accountId,
}) => {
  const bookmarksRes = await db
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

  const categoriesRes = await db
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

  if (!bookmarks) return Err("bookmarks undefined");

  return Ok(bookmarks);
};

export default bookmarkList;
