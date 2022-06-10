import { Ok } from 'ts-results';
import { OperationFn } from './lib/operation';
import { CategoryCreateInput } from '../../../query/test';
import { CategoryClass } from '../../../model/category';

const categoryCreate: OperationFn<CategoryCreateInput, CategoryClass> = async ({
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
