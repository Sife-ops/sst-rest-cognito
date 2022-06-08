import model from '../model';
import { Repo } from './repo';
import { BookmarkClass } from '../model/bookmark';
import { CategoryClass } from '../model/category';

export default class {
  categoryRepo: Repo<CategoryClass, 'name'>;
  bookmarkRepo: Repo<BookmarkClass, 'name' | 'url'>;

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
