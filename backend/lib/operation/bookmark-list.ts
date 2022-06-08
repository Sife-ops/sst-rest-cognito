import { Ok } from 'ts-results';
import { OperationFn } from './operation';

const bookmarkList: OperationFn = async ({ repository }) => {
  // const bookmarksRes = await model.bookmark
  //   .query('pk')
  //   .eq(`user:${accountId}`)
  //   .where('sk')
  //   .beginsWith('bookmark')
  //   .exec();

  // const categoriesRes = await model.category
  //   .query('pk')
  //   .eq(`user:${accountId}`)
  //   .where('sk')
  //   .beginsWith('category')
  //   .exec();

  // const bookmarks = bookmarksRes.map((bookmark) => {
  //   const categories = categoriesRes.reduce(
  //     (acc: CategoryClass[], cur, _, arr) => {
  //       if (cur.sk.includes(bookmark.sk)) {
  //         const category = arr.find((category) => {
  //           return category.sk === cur.sk.split('#')[0];
  //         });
  //         if (category) {
  //           return [...acc, category];
  //         }
  //       }
  //       return acc;
  //     },
  //     []
  //   );
  //   return {
  //     ...bookmark,
  //     categories,
  //   };
  // });

  // console.log(bookmarks);

  return Ok({});
};

export default bookmarkList;
