import { Ok, Err } from 'ts-results';
import { OperationFn } from './lib/operation';

const categoryGet: OperationFn<{ sk: string }> = async ({
  repository,
  variables: { sk },
}) => {
  const response = await repository.categoryRepo.get(sk);

  console.log(response);

  return Ok(response);
};

export default categoryGet;
