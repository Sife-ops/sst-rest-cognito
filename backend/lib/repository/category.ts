import crypto from 'crypto';
import model from '../model';
import { CategoryClass } from '../model/category';

type Require<T, K extends keyof T> = Partial<T> & Pick<T, K>;

type CreateUpdateFn<T, K extends keyof T> = (
  entity: Require<T, K>
) => Promise<T>;
type GetFn<T> = (id: string) => Promise<T>;
type ListFn<T> = () => Promise<Array<T>>;
type DeleteFn = (id: string) => Promise<void>;

abstract class Repo {
  accountId: string;

  constructor(accountId: string) {
    this.accountId = accountId;
  }
}

class CategoryRepo extends Repo {
  constructor(accountId: string) {
    super(accountId);
  }

  create: CreateUpdateFn<CategoryClass, 'name'> = async (category) => {
    return await model.category.create({
      ...category,
      pk: `user:${this.accountId}`,
      sk: `category:${crypto.randomUUID()}`,
    });
  };

  get: GetFn<CategoryClass> = async (categoryId) => {
    return await model.category.get({
      pk: `user:${this.accountId}`,
      sk: `category:${categoryId}`,
    });
  };

  list: ListFn<CategoryClass> = async () => {
    return await model.category
      .query('pk')
      .eq(`user:${this.accountId}`)
      .where('sk')
      .beginsWith('category')
      .exec();
  };

  update: CreateUpdateFn<CategoryClass, 'pk' | 'sk'> = async (category) => {
    return await model.category.update(category);
  };

  delete: DeleteFn = async (categoryId) => {
    return await model.category.delete({
      pk: `user:${this.accountId}`,
      sk: `category:${categoryId}`,
    });
  };
}
