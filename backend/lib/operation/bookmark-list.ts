import { bookmarkCategories } from './lib/function';
import { Ok } from 'ts-results';
import { OperationFn } from './lib/operation';

// todo: return type
const bookmarkList: OperationFn = async ({ repository }) => {
  const bookmarks = await repository.bookmarkRepo.list();
  const categories = await repository.categoryRepo.list();

  const response = bookmarks.map((bookmark) => {
    return {
      ...bookmark,
      categories: bookmarkCategories(categories, bookmark.sk),
    };
  });

  console.log(response);

  return Ok(response);
};

export default bookmarkList;
