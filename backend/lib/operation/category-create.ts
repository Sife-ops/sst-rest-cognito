import { Ok, Err } from 'ts-results';
import { OperationFn } from './lib/operation';
import { CategoryIface } from '../model/category';

const bookmarkCreate: OperationFn<CategoryIface> = async ({
  repository,
  variables: { description = '', name },
}) => {
  if (!name) return Err('invalid arguments');

  const response = await repository.categoryRepo.create({
    name,
    description,
  });

  console.log(response);

  return Ok(response);
};

export default bookmarkCreate;
