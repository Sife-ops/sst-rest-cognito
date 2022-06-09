import model from '../model';
import { Ok, Err } from 'ts-results';
import { OperationFn } from './lib/operation';

const categoryDelete: OperationFn<{ sk: string }> = async ({
  repository,
  variables: { sk },
}) => {
  if (!sk) return Err('invalid arguments');

  const categories = await repository.categoryRepo.list();
  const filtered = categories
    .filter((e) => e.sk.includes(sk))
    .map(({ pk, sk }) => ({
      pk,
      sk,
    }));

  const response = await model.category.batchDelete(filtered);

  console.log(response);

  return Ok(response);
};

export default categoryDelete;
