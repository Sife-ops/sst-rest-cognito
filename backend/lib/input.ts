export interface PrivateHandlerInput {
  operation: "bookmarkList" | "itemList";
  variables?: any;
}

export interface OperationInput2<T> {
  accountId: string;
  body: Omit<PrivateHandlerInput, "variables"> & {
    variables?: T;
  };
}
