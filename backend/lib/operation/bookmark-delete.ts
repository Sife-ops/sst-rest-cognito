import { Ok, Err } from 'ts-results';
import { OperationFn } from './lib/operation';

const bookmarkDelete: OperationFn<{ sk: string }> = async ({
  repository,
  variables: { sk },
}) => {
  await repository.bookmarkRepo.delete(sk);

  console.log(`deleted ${sk}`);

  return Ok(undefined);
};

export default bookmarkDelete;
