import { CategoryClass, CategoryIface } from '../../../model/category';
import { Ok } from 'ts-results';
import { OperationFn } from './lib/operation';

const categoryCreate: OperationFn<CategoryIface, CategoryClass> = async ({
  repository,
  variables: { description = '', name },
}) => {
  const response = await repository.categoryRepo.create({
    name,
    description,
  });

  console.log(response);

  return Ok(response);
};

export default categoryCreate;
