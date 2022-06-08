import { CategoryClass } from '../model/category';
import { Ok } from 'ts-results';
import { OperationFn } from './operation';

// todo: return type
const bookmarkList: OperationFn = async ({ repository }) => {
  const bookmarks = await repository.bookmarkRepo.list();
  const categories = await repository.categoryRepo.list();

  const response = bookmarks.map((bookmark) => {
    const bookmarkCategories = categories.reduce(
      (acc: CategoryClass[], cur) => {
        if (cur.bookmark === bookmark.sk) {
          return [...acc, cur];
        }
        return acc;
      },
      []
    );
    return {
      ...bookmark,
      categories: bookmarkCategories,
    };
  });

  console.log(response);

  return Ok(response);
};

export default bookmarkList;
