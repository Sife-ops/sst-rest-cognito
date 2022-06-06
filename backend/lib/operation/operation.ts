import { OperationInput } from "../input";

export type OperationFn<T> = (p: OperationInput<T>) => Promise<unknown>;
