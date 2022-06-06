import crypto from "crypto";
import { Ok, Err } from "ts-results";
import { OperationFn } from "./operation";
import { db } from "../service";

const bookmarkCreate: OperationFn<
  { name: string; description: string; url: string; favorite: boolean },
  "invalid arguments"
> = async (args) => {
  if (!args.body.variables) return Err("invalid arguments");

  const { description, name, url, favorite = false } = args.body.variables;

  if (!name || !url) return Err("invalid arguments");

  const res = await db
    .put({
      TableName: process.env.tableName!,
      Item: {
        pk: `user:${args.accountId}`,
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
