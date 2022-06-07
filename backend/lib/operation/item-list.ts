import model from "../model";
import { Ok } from "ts-results";
import { OperationFn } from "./operation";

const itemList: OperationFn = async ({ accountId }) => {
  const res = await model.query("pk").eq(`user:${accountId}`).exec();
  return Ok(res.toJSON());
};

export default itemList;
