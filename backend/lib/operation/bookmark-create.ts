import crypto from "crypto";
import { Ok, Err } from "ts-results";
import { OperationFn } from "./operation";
import { db } from "../service";

const bookmarkCreate: OperationFn<
  { name: string; description: string; url: string; favorite: boolean },
  "invalid arguments"
> = async ({ accountId, variables }) => {
  const { description, name, url, favorite = false } = variables!;

  if (!name || !url) return Err("invalid arguments");

  const res = await db
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

  return Ok(res);
};

export default bookmarkCreate;
