import { Ok } from 'ts-results';
import { OperationFn } from './lib/operation';

import model from '../model';
import { CategoryClass } from '../model/category';

const bookmarkCreate: OperationFn<{
  categories: CategoryClass[];
  description?: string;
  favorite?: boolean;
  name: string;
  url: string;
}> = async ({
  repository,
  variables: { categories = [], description = '', favorite = false, name, url },
}) => {
  const bookmark = await repository.bookmarkRepo.create({
    name,
    url,
    description,
    favorite,
  });

  // category relationship
  const accountId = repository.bookmarkRepo['accountId'];

  const bookmarkCategories = categories.map((category) => ({
    pk: `User:${accountId}`,
    sk: `${category.sk}:${bookmark.sk}`,
    bookmark: bookmark.sk,
  }));

  await model.category.batchPut(bookmarkCategories);

  const response = {
    ...bookmark,
    categories,
  };

  return Ok(response);
};

export default bookmarkCreate;
