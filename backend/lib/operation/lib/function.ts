import { CategoryClass } from '../../model/category';

export const bookmarkCategories = (a: CategoryClass[], b: string) => {
  return a.reduce((acc: CategoryClass[], cur, _, arr) => {
    if (cur.bookmark === b) {
      const found = arr.find((e) => e.sk === cur.sk.split('#')[0]);
      if (found) return [...acc, found];
    }
    return acc;
  }, []);
};
