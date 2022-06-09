import { Ok } from 'ts-results';
import { OperationFn } from './lib/operation';

const itemList: OperationFn = async ({ repository }) => {
  const bookmarks = await repository.bookmarkRepo.list();
  const categories = await repository.categoryRepo.list();

  return Ok([...bookmarks, ...categories]);
};

export default itemList;
