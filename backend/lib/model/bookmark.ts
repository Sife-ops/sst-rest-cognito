import dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import { entity } from './entity';

class BookmarkClass extends Document {
  pk: string;
  sk: string;
  name: string;
  description: string;
  url: string;
  favorite: boolean;
  category: string;
}

const bookmarkSchema = new dynamoose.Schema({
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
  url: {
    type: String,
  },
  favorite: {
    type: Boolean,
  },
  category: {
    type: String,
  },
});

export default entity<BookmarkClass>(bookmarkSchema);
