import bookmarkCreate from './bookmark-create';
import bookmarkDelete from './bookmark-delete';
import bookmarkGet from './bookmark-get';
import bookmarkList from './bookmark-list';
import categoryCreate from './category-create';
import categoryDelete from './category-delete';
import categoryGet from './category-get';
import categoryList from './category-list';
import itemList from './item-list';

export default {
  bookmarkCreate,
  bookmarkDelete,
  bookmarkGet,
  bookmarkList,
  categoryCreate,
  categoryDelete,
  categoryGet,
  categoryList,
  itemList,
};

export type OperationName =
  | 'bookmarkCreate'
  | 'bookmarkDelete'
  | 'bookmarkGet'
  | 'bookmarkList'
  | 'categoryCreate'
  | 'categoryGet'
  | 'categoryList'
  | 'itemList';
