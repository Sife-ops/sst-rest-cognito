export interface PrivateHandlerInput {
  operation: "bookmarkList" | "itemList";
  variables?: any;
}

export interface OperationInput {
  accountId: string;
  body: PrivateHandlerInput;
}
