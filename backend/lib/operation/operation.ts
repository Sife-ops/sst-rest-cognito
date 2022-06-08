import Repository from '../../lib/repository';
import { Result } from 'ts-results';

export type OperationFn<T = {}, E = undefined> = (args: {
  repository: Repository;
  variables: T;
}) => Promise<Result<unknown, E>>;
