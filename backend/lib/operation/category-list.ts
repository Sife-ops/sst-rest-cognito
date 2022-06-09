import { Ok } from 'ts-results';
import { OperationFn } from './lib/operation';

const categoryList: OperationFn = async ({ repository }) => {
  const categories = await repository.categoryRepo.list();

  const response = categories.filter((e) => !e.bookmark);

  console.log(response);

  return Ok(response);
};

export default categoryList;
