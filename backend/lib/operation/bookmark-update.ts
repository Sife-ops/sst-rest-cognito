import { Ok } from 'ts-results';
import { OperationFn } from './lib/operation';

import model from '../../../model';
import { CategoryClass } from '../../../model/category';

const bookmarkUpdate: OperationFn<{
  categories?: CategoryClass[];
  description?: string;
  favorite?: boolean;
  name?: string;
  sk: string;
  url?: string;
}> = async ({
  repository,
  variables: { categories, description, favorite, name, sk, url },
}) => {
  const bookmark = await repository.bookmarkRepo.update({
    description,
    favorite,
    name,
    sk,
    url,
  });

  const bookmarkCategories: CategoryClass[] = await model.category
    .query('bookmark')
    .eq(sk)
    .using('categoryBookmarkIndex')
    .exec();

  console.log('bookmark categories', bookmarkCategories);

  if (categories) {
    const toDelete = bookmarkCategories.filter(
      (bc) => !categories.find((c) => bc.sk.includes(c.sk))
    );

    const toCreate = categories.filter(
      (c) => !bookmarkCategories.find((bc) => bc.sk.includes(c.sk))
    );

    if (toDelete.length > 0) {
      // todo: repo batchDelete
      await model.category.batchDelete(
        toDelete.map((e) => ({ pk: e.pk, sk: e.sk }))
      );
    }

    if (toCreate.length > 0) {
      const accountId = repository.bookmarkRepo['accountId'];
      // todo: repo batchPut
      await model.category.batchPut(
        toCreate.map((e) => ({
          pk: `User:${accountId}`,
          sk: `${e.sk}#${sk}`,
          bookmark: sk,
        }))
      );
    }
  }

  const response = {
    ...bookmark,
    categories,
  };

  console.log(response);

  return Ok(response);
};

export default bookmarkUpdate;
