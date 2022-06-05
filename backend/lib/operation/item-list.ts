import { OperationFn } from "./operation";
import { formatJSONResponse } from "../api-gateway";

const itemList: OperationFn = async (p) => {
  return formatJSONResponse({
    success: true,
    data: {
      // accountId: body.accountId,
    },
  });
};

export default itemList;
