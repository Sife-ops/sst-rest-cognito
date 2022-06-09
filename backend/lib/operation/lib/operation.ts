import Repository from '../../repository';
import { Result } from 'ts-results';

export type OperationFn<A = {}, E = undefined> = (args: {
  repository: Repository;
  variables: A;
}) => Promise<Result<unknown, E>>;
