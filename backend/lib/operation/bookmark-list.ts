import { CategoryClass } from '../model/category';
import { Ok } from 'ts-results';
import { OperationFn } from './operation';

// todo: return type
const bookmarkList: OperationFn = async ({ repository }) => {
  const bookmarks = await repository.bookmarkRepo.list();
  const categories = await repository.categoryRepo.list();

  const response = bookmarks.map((bookmark) => {
    const bookmarkCategories = categories.reduce(
      (acc: CategoryClass[], cur, _, arr) => {
        if (cur.bookmark === bookmark.sk) {
          const found = arr.find((e) => e.sk === cur.sk.split('#')[0]);
          if (found) return [...acc, found];
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
