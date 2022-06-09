import { Ok, Err } from 'ts-results';
import { OperationFn } from './lib/operation';

// todo: move errors
const categoryGet: OperationFn<{ sk: string }> = async ({
  repository,
  variables: { sk },
}) => {
  if (!sk) return Err('invalid arguments');

  const category = await repository.categoryRepo.get(sk);

  console.log(category);

  return Ok(category);
};

export default categoryGet;
