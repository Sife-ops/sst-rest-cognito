import crypto from "crypto";
import { Ok, Err } from "ts-results";
import { OperationFn } from "./operation";
import { db } from "../service";

const categoryCreate: OperationFn<
  { name: string; description: string },
  "invalid arguments"
> = async ({ accountId, body: { variables } }) => {
  if (!variables || !variables.name) return Err("invalid arguments");

  const { description, name } = variables;

  const res = await db
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

  return Ok(res);
};

export default categoryCreate;
