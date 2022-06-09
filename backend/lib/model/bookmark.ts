import dynamoose from 'dynamoose';
import { EntityClass, entity } from './lib/entity';

export interface BookmarkIface {
  name: string;
  description?: string;
  url: string;
  favorite?: boolean;
}

// todo: remove export
export class BookmarkClass extends EntityClass implements BookmarkIface {
  name: string;
  description?: string;
  url: string;
  favorite?: boolean;
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
});

export default entity<BookmarkClass>(bookmarkSchema);
