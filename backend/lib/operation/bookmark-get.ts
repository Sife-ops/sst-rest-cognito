import { bookmarkCategories } from './lib/function';
import { Ok, Err } from 'ts-results';
import { OperationFn } from './lib/operation';

const bookmarkCreate: OperationFn<{ sk: string }> = async ({
  repository,
  variables: { sk },
}) => {
  const bookmark = await repository.bookmarkRepo.get(sk);
  const categories = await repository.categoryRepo.list();

  return Ok({
    ...bookmark,
    categories: bookmarkCategories(categories, bookmark.sk),
  });
};

export default bookmarkCreate;
