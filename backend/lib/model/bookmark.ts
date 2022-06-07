import dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import { wrapper } from './wrapper';

class BookmarkClass extends Document {
  pk: string;
  sk: string;
  name: string;
  description: string;
  url: string;
  favorite: string;
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
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

export default wrapper<BookmarkClass>(bookmarkSchema);
