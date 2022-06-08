export type Require<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export type CreateUpdateFn<T, K extends keyof T> = (
  entity: Require<T, K>
) => Promise<T>;
export type GetFn<T> = (id: string) => Promise<T>;
export type ListFn<T> = () => Promise<Array<T>>;
export type DeleteFn = (id: string) => Promise<void>;

export abstract class Repo {
  accountId: string;

  constructor(accountId: string) {
    this.accountId = accountId;
  }
}
