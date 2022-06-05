import { OperationFn } from "./operation";
import { formatJSONResponse } from "../api-gateway";

const bookmarkList: OperationFn = async (p) => {
  return formatJSONResponse({
    // data: p.body
  });
};

export default bookmarkList;
