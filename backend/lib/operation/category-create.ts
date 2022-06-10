import { Ok } from 'ts-results';
import { OperationFn } from './lib/operation';

const bookmarkCreate: OperationFn<{
  description?: string;
  name: string;
}> = async ({ repository, variables: { description = '', name } }) => {
  const response = await repository.categoryRepo.create({
    name,
    description,
  });

  console.log(response);

  return Ok(response);
};

export default bookmarkCreate;
