import model from '../model';
import { BookmarkClass } from '../model/bookmark';
import { CategoryClass } from '../model/category';
import { Repo } from './repo';

export default class {
  bookmarkRepo: Repo<BookmarkClass, 'name' | 'url'>;
  categoryRepo: Repo<CategoryClass, 'name'>;

  constructor(accountId: string) {
    this.categoryRepo = new Repo<CategoryClass, 'name'>(
      'Category',
      accountId,
      model.category
    );

    this.bookmarkRepo = new Repo<BookmarkClass, 'name' | 'url'>(
      'Bookmark',
      accountId,
      model.bookmark
    );
  }
}
