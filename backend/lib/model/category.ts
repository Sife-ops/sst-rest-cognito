import dynamoose from 'dynamoose';
import { EntityClass, entity } from './entity';

export class CategoryClass extends EntityClass {
  name: string;
  description?: string;
}

const categorySchema = new dynamoose.Schema({
  pk: {
    type: String,
    hashKey: true,
  },
  sk: {
    type: String,
    rangeKey: true,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
});

export default entity<CategoryClass>(categorySchema);
