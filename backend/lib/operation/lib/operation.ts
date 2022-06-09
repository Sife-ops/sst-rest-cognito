import Repository from '../../repository';
import { Result } from 'ts-results';

type Errors = 'invalid arguments';

export type OperationFn<V = {}> = (args: {
  repository: Repository;
  variables: V;
}) => Promise<Result<unknown, Errors>>;
