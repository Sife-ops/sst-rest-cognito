import type { APIGatewayProxyResult } from "aws-lambda";
import { OperationInput } from "../input";

export type OperationFn = (p: OperationInput) => Promise<APIGatewayProxyResult>;
