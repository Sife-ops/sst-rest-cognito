import { OperationFn } from "./operation";
import { formatJSONResponse } from "../response";

const itemList: OperationFn<{
  lol: string;
  sup: string;
}> = async (args) => {
  return formatJSONResponse({
    data: {
      accountId: args.accountId,
      input: args.body,
    },
  });
};

export default itemList;
