import Repository from '../../repository';
import { Result } from 'ts-results';

type Errors = 'invalid arguments';

export type OperationFn<A = {}> = (args: {
  repository: Repository;
  variables: A;
}) => Promise<Result<unknown, Errors>>;
