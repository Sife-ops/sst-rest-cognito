// import { Ok, Err } from 'ts-results';
// import { OperationFn } from './lib/operation';

// const categoryCreate: OperationFn<
//   { name: string; description: string },
//   'invalid arguments'
// > = async ({ repository, variables }) => {
//   if (!variables || !variables.name) return Err('invalid arguments');

//   const { description, name } = variables;

//   // const res = await db
//   //   .put({
//   //     TableName: process.env.tableName!,
//   //     Item: {
//   //       pk: `user:${accountId}`,
//   //       sk: `category:${crypto.randomUUID()}`,
//   //       name,
//   //       description,
//   //     },
//   //   })
//   //   .promise()
//   //   .then((e) => {
//   //     // console.log(e);
//   //     return e;
//   //   });

//   return Ok({});
// };

// export default categoryCreate;

import { Ok, Err } from 'ts-results';
import { OperationFn } from './lib/operation';

// todo: interfaces for entities
const bookmarkCreate: OperationFn<{
  name: string;
  description?: string;
}> = async ({ repository, variables: { description = '', name } }) => {
  if (!name) return Err('invalid arguments');

  const response = await repository.categoryRepo.create({
    name,
    description,
  });

  console.log(response);

  return Ok(response);
};

export default bookmarkCreate;
