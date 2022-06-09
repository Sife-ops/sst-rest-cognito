import { Ok, Err } from 'ts-results';
import { OperationFn } from './lib/operation';

// todo: interfaces for entities
const bookmarkCreate: OperationFn<
  { name: string; description?: string; url: string; favorite: boolean },
  'invalid arguments'
> = async ({
  repository,
  variables: { description = '', name, url, favorite = false },
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
