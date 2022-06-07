import { Result } from 'ts-results';

export type OperationFn<T = {}, E = undefined> = (args: {
  accountId: string;
  variables: T;
}) => Promise<Result<unknown, E>>;
