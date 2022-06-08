import { Ok } from 'ts-results';
import { OperationFn } from './operation';

const bookmarkList: OperationFn = async ({ repository }) => {
  const bookmarks = await repository.bookmarkRepo.list();
  const categories = await repository.categoryRepo.list();

  const response = bookmarks.reduce((acc: unknown[], cur, _, arr) => {
    if (cur.sk.includes('Category')) return acc;

    const bookmarkCategorySks = arr
      .filter((e) => e.sk.includes(`${cur.sk}#`))
      .map((e) => e.category);

    const bookmarkCategories = categories.filter((c) => {
      return !!bookmarkCategorySks.find((k) => k === c.sk);
    });

    return [
      ...acc,
      {
        ...cur,
        categories: bookmarkCategories,
      },
    ];
  }, []);

  console.log(response);

  return Ok(response);
};

export default bookmarkList;
