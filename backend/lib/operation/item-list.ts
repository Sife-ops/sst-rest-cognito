import { Ok, Err } from "ts-results";
import { OperationFn } from "./operation";
import { db } from "../service";

const itemList: OperationFn<undefined, "items undefined"> = async (args) => {
  const res = await db
    .query({
      // todo: remove the bang
      TableName: process.env.tableName!,
      KeyConditionExpression: "pk = :user",
      ExpressionAttributeValues: {
        ":user": `user:${args.accountId}`,
      },
    })
    .promise()
    .then((e) => {
      console.log(e);
      return e;
    });

  if (!res.Items) {
    return Err("items undefined");
  }

  return Ok(res.Items);
};

export default itemList;
