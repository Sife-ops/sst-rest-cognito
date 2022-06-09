import { bookmarkCategories } from './function';
import { Ok, Err } from 'ts-results';
import { OperationFn } from './operation';

const bookmarkCreate: OperationFn<
  { sk: string },
  'invalid arguments'
> = async ({ repository, variables }) => {
  if (!variables.sk) return Err('invalid arguments');

  // todo: add 'bookmark' property to bookmark entity
  const bookmark = await repository.bookmarkRepo.get(variables.sk);
  const categories = await repository.categoryRepo.list();

  return Ok({
    ...bookmark,
    categories: bookmarkCategories(categories, bookmark.sk),
  });
};

export default bookmarkCreate;
