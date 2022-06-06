export interface PrivateHandlerInput {
  operation: "bookmarkList" | "itemList" | "categoryCreate" | "bookmarkCreate";
  variables: any;
}

export interface OperationInput<T> {
  accountId: string;
  body: Omit<PrivateHandlerInput, "variables"> & {
    variables?: T;
  };
}
