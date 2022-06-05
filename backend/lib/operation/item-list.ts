import { OperationFn } from "./operation";
import { formatJSONResponse } from "../response";

const itemList: OperationFn = async (p) => {
  return formatJSONResponse({
    success: true,
    data: {
      // accountId: body.accountId,
    },
  });
};

export default itemList;
