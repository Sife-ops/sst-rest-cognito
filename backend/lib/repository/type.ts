export type Require<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export type CreateUpdateFn<T, K extends keyof T> = (
  entity: Require<T, K>
) => Promise<T>;
export type GetFn<T> = (sk: string) => Promise<T>;
export type ListFn<T> = () => Promise<Array<T>>;
export type DeleteFn = (sk: string) => Promise<void>;
