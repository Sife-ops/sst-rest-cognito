import { Result } from "ts-results";
import { OperationInput } from "../input";

export type OperationFn<T, E> = (
  args: OperationInput<T>
) => Promise<Result<unknown, E>>;
