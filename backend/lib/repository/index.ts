import model from '../../../model';
import { BookmarkClass } from '../../../model/bookmark';
import { CategoryClass } from '../../../model/category';
import { Repo } from './repo';

export default class {
  bookmarkRepo: Repo<BookmarkClass>;
  categoryRepo: Repo<CategoryClass>;

  constructor(accountId: string) {
    this.categoryRepo = new Repo<CategoryClass>(
      'Category',
      accountId,
      model.category
    );

    this.bookmarkRepo = new Repo<BookmarkClass>(
      'Bookmark',
      accountId,
      model.bookmark
    );
  }
}
