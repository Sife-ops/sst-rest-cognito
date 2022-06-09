import Repository from '../../repository';
import { Result } from 'ts-results';

type Errors = 'invalid arguments';

export type OperationFn<V = {}, R = unknown> = (args: {
  repository: Repository;
  variables: V;
}) => Promise<Result<R, Errors>>;
