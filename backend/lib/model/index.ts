import dynamoose from 'dynamoose';

import Bookmark from './bookmark';
import Category from './category';

if (!process.env.tableName) throw new Error('table name undefined');

export default dynamoose.model(process.env.tableName, [
  //
  Bookmark,
  Category,
]);

// export {
//   //
//   Bookmark,
//   Category,
// };
