import { Ok } from 'ts-results';
import { OperationFn } from './lib/operation';

const categoryUpdate: OperationFn<{
  description?: string;
  name?: string;
  sk: string;
}> = async ({ repository, variables: { description, name, sk } }) => {
  const response = await repository.categoryRepo.update({
    sk,
    name,
    description,
  });

  console.log(response);

  return Ok(response);
};

export default categoryUpdate;
