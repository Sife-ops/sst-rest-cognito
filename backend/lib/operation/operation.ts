import type { APIGatewayProxyResult } from "aws-lambda";
import { OperationInput2 } from "../input";

export type OperationFn<T> = (
  p: OperationInput2<T>
) => Promise<APIGatewayProxyResult>;
