import crypto from 'crypto';
import { EntityClass } from '../../../model/entity';
import { ModelType } from 'dynamoose/dist/General';

type CreateUpdateFn<T> = (entity: Partial<T>) => Promise<T>;
type GetFn<T> = (sk: string) => Promise<T>;
type ListFn<T> = () => Promise<Array<T>>;
type DeleteFn = (sk: string) => Promise<void>;

export class Repo<T extends EntityClass> {
  private modelName: string;
  private accountId: string;
  private model: ModelType<T>;

  constructor(modelName: string, accountId: string, model: ModelType<T>) {
    this.modelName = modelName;
    this.accountId = accountId;
    this.model = model;
  }

  create: CreateUpdateFn<T> = async (entity) => {
    return await this.model.create({
      ...entity,
      pk: `User:${this.accountId}`,
      sk: `${this.modelName}:${crypto.randomUUID()}`,
    });
  };

  get: GetFn<T> = async (sk) => {
    return await this.model.get({
      pk: `User:${this.accountId}`,
      sk,
    });
  };

  list: ListFn<T> = async () => {
    return await this.model
      .query('pk')
      .eq(`User:${this.accountId}`)
      .where('sk')
      .beginsWith(this.modelName)
      .exec();
  };

  update: CreateUpdateFn<T> = async (entity) => {
    return await this.model.update({
      ...entity,
      pk: `User:${this.accountId}`,
    });
  };

  delete: DeleteFn = async (sk) => {
    return await this.model.delete({
      pk: `User:${this.accountId}`,
      sk,
    });
  };
}
