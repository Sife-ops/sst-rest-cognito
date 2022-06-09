import { Ok, Err } from 'ts-results';
import { OperationFn } from './lib/operation';
import { BookmarkIface } from '../model/bookmark';

// todo: category relationship
const bookmarkCreate: OperationFn<
  BookmarkIface & {
    categories?: string[];
  }
> = async ({
  repository,
  variables: { description = '', name, url, favorite = false, categories = [] },
}) => {
  if (!name || !url) return Err('invalid arguments');

  const response = await repository.bookmarkRepo.create({
    name,
    url,
    description,
    favorite,
  });

  console.log(response);

  return Ok(response);
};

export default bookmarkCreate;
