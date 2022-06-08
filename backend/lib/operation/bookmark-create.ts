import { Ok, Err } from 'ts-results';
import { OperationFn } from './operation';

const bookmarkCreate: OperationFn<
  { name: string; description: string; url: string; favorite: boolean },
  'invalid arguments'
> = async ({ repository, variables }) => {
  if (!variables.name || !variables.url) return Err('invalid arguments');

  const { description, name, url, favorite = false } = variables!;

  // const res = await db
  //   .put({
  //     TableName: process.env.tableName!,
  //     Item: {
  //       pk: `user:${accountId}`,
  //       sk: `bookmark:${crypto.randomUUID()}`,
  //       name,
  //       description,
  //       url,
  //       favorite,
  //     },
  //   })
  //   .promise()
  //   .then((e) => {
  //     console.log(e);
  //     return e;
  //   });

  return Ok({});
};

export default bookmarkCreate;
