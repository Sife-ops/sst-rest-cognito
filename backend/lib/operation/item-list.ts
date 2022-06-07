// todo: delete file
import { Ok } from 'ts-results';
import { OperationFn } from './operation';

const itemList: OperationFn = async ({ accountId }) => {
  // const items = await model.query('pk').eq(`user:${accountId}`).exec();
  return Ok({});
};

export default itemList;
