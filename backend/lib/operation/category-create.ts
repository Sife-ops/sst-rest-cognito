import crypto from 'crypto';
import model from '../model';
import { Ok, Err } from 'ts-results';
import { OperationFn } from './operation';

const categoryCreate: OperationFn<
  { name: string; description: string },
  'invalid arguments'
> = async ({ accountId, variables }) => {
  if (!variables || !variables.name) return Err('invalid arguments');

  const { description, name } = variables;

  // const res = await db
  //   .put({
  //     TableName: process.env.tableName!,
  //     Item: {
  //       pk: `user:${accountId}`,
  //       sk: `category:${crypto.randomUUID()}`,
  //       name,
  //       description,
  //     },
  //   })
  //   .promise()
  //   .then((e) => {
  //     // console.log(e);
  //     return e;
  //   });

  return Ok({});
};

export default categoryCreate;
