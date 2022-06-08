import * as t from './type';
import crypto from 'crypto';
import { EntityClass } from '../model/entity';
import { ModelType } from 'dynamoose/dist/General';

export class Repo<T extends EntityClass, K extends keyof T> {
  private modelName: string;
  private accountId: string;
  private model: ModelType<T>;

  constructor(modelName: string, accountId: string, model: ModelType<T>) {
    this.modelName = modelName;
    this.accountId = accountId;
    this.model = model;
  }

  create: t.CreateUpdateFn<T, K> = async (entity) => {
    return await this.model.create({
      ...entity,
      pk: `User:${this.accountId}`,
      sk: `${this.modelName}:${crypto.randomUUID()}`,
    });
  };

  get: t.GetFn<T> = async (sk) => {
    return await this.model.get({
      pk: `User:${this.accountId}`,
      sk,
    });
  };

  list: t.ListFn<T> = async () => {
    return await this.model
      .query('pk')
      .eq(`User:${this.accountId}`)
      .where('sk')
      .beginsWith(this.modelName)
      .exec();
  };

  update: t.CreateUpdateFn<T, 'pk' | 'sk'> = async (category) => {
    return await this.model.update(category);
  };

  delete: t.DeleteFn = async (sk) => {
    return await this.model.delete({
      pk: `User:${this.accountId}`,
      sk,
    });
  };
}
