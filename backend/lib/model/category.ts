import dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import { entity } from './entity';

export class CategoryClass extends Document {
  pk: string;
  sk: string;
  name?: string;
  description?: string;
  bookmark?: string;
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
    required: true,
  },
  description: {
    type: String,
  },
  bookmark: {
    type: String,
  },
});

export default entity<CategoryClass>(categorySchema);
